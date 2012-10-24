var couch = require('./couch');
var CommentDB = new couch({'name': "comments"});


/**
 * Update db with comments.
 *
 * @method - POST
 * @param {str} comment
 * @param {str} parentID
 * @param {str} messageID

 * @api public
 */

exports.comment = function(req, res, next) {
    var param = req.body, comment, parentID, messageID;
    
    param.comment? comment = param.comment.trim() : false ;
    param.parentID? parentID = param.parentID.trim() : false ;
    param.messageID? messageID = param.parentID.trim() : false ;

    var messageID = "f401f4a29f9f2bdc8b43c20fc100134d";


    if(!comment || !parentID || !messageID) {
        res.json(404, { error: 'Parameters Required' });
        return;

    }

    
    var mDoc = {"type": "comment", "text": comment,
                "parentID": parentID, "messageID": messageID};
    
    // Update the couchdb with the comment.

    CommentDB.post({"doc": mDoc}, function(err, resp){
	if(err){
	    res.send(500, "Commenting Failed");
	    return;
	}

	res.send(200, "Update Successfully!");
    });
}


/**
 * Get hierarchical json representing threaded comments.
 *
 * Example: 
 *    {"c1":{"text":"My first comment","children":{"cc1":{"text":"Dude what do you mean first comment?"}}}}
 *
 *     -- Here cc1 is a reply comment to c1.
 *
 * @method - GET
 *
 * @api public
 */


exports.getComments = function(req, res, next) {

    CommentDB.view('_design/comment/_view/thread', null , function(err, resp){
        
	if(err){
	    res.send(500, "Error fetching from DB");
	    return;
	}

	var rows = resp.rows, threads = {}, comment, value;
	
	var rec = function(comment, threads) {
	    
	    for(var thread in threads){
		value = threads[thread];

		if(thread === comment.parentID){
		    value.children[comment._id] = comment;
		    return;
		}
		
		if(value.children){
		    rec(comment, value.children);
		}
		
	    }
	}

        
	for(var i = 0; i < rows.length; i++){
	    
	    comment = rows[i].value;
	    comment.children = {};

	    var parentID = comment.parentID;
	    
	    if(!parentID) {
		threads[comment._id] = comment;
		continue;
	    }
	    
            // recursively create hierarchical json
	    
	    rec(comment, threads);
	    
	}

	res.render("comments.jade", {'threads': threads});
        
    });
}
