var couch = require('../comments/couch');
var CommentDB = new couch({'name': "comment"});

CommentDB.dbPut(function(err, res){
    if(err){
        console.log(err);
        throw err;
        return;
    }
    
    console.log(res)
    putViews();
    
});


var putViews = function(){
    CommentDB.putDesignDocs(['./dep/comment-thread.json'], function(err, res){
        if(err) throw err;
        console.log(res.body);
    })

}()




