# Thread comments
  
  Threaded comment is a nodejs applicaiton which uses nosql db(couchdb) to store threaded comments.

  
## Requirements

  - Express 3.x
  - couchdb 
  - mocha
  - Should
  - [Expressjs-boilerplate](http://github.com/munichlinux/expressjs-boilerplate)
  

## Instation
   
   clone this repo from git   

   $ npm install
   $ node tools/createdb.js


## About

   What is threaded comments? 
      
    You can find them in news.ycombinator.com comments.

   How do you store threaded comments? 
      
    Threaded comments are basically hierarchical data, 
    there are bunch of ways you can store a hierarchical data in relational/non-relational database.

  
  Solution
  
  ```

        The solution that i used here is Parent links, the structure look something like

        -> {'text': "parent", id: "parent"}
        -> {'text': "child1", parentid= "parent", id: "child1"} // reply to the parent
        -> {'text': "child1.1", parentid= "parent", id: "child2"} // reply to the parent
        -> {'text': "child2", parentid: "child1" id: "child3"} // reply to the child1

        I retereieve all the comment related to message and construct a hierarchical json.
  ```          

```        
{
    "parent": {
        'text': "parent",
        id: "parent",
        children: {
            child1: {
                text: "child1",
                parentid = "parent",
                id: "child1",
                children: {
                    child3: {
                        text: "child2",
                        parentid: "child1"
                        id: "child3"
                    }
                }
            },
            child2: {...}
        }
    }
}
```
 

## TO 

  while constructing the thread, i am iterating to add the child as part of parent. Ideally it should be parent id look up rather than iterating.


## References: 

  1. http://www.mongodb.org/display/DOCS/Trees+in+MongoDB
  2. http://wiki.apache.org/couchdb/EntityRelationship
  3. http://www.sitepoint.com/hierarchical-data-database/
  4. http://www.artfulsoftware.com/mysqlbook/sampler/mysqled1ch20.html
