// initializing Express Router

const Router =require ("express").Router();

// database models
const PublicationModel =require("../../database/publication");

/**Route         /publications
 description    get all publications
  acess       public
parameter      none
methods        get
 */

Router.get("/",(req,res)=>{
   const  getAllPublications =await PublicationModel.find()
    return res.json({getAllPublications});
});


/**Route         /publications/p
 description    to get specific publications based on id
  acess       public
parameter      id
methods        get
 */
Router.get("/p/:id", (req,res) => {
    const getSpecificPublication = database.publication.filter (
        (publication) => database.publication.id ===req.params.id
        );

    if (getSpecificPublication.length ===0){
        return res.json({
             error:`No publication found for the id of ${req.params.id}`,
    });
} 
    return res.json({author:getSpecificPublication});
});


/**Route         /publications/books
 description     to get list of publications based on books
  acess       public
parameter      isbn
methods        get
 */
Router.get(" /books/:isbn",(req,res)=>{ 
    const getSpecificPublication =database.publication.filter ((publication)=> 
    publication.books.includes(req.params.isbn)
    );
    
    if (getSpecificPublication.length ===0){
        return res.json({
             error:`No Publication found based on book of ${req.params.isbn}`,
    });
}
return res.json({author:getSpecificPublication});
});

/**Route         /publication/add
 description     add new publication
  acess       public
parameter      none
methods        post
 */
Router.post("/add",(req,res)=>{
    const {newPublication }=req.body;
    PublicationModel.create(newPublication);
    return res.json ({message:"publicaion was added"});
});

/**Route          /publication/update/name
 description     update publication name
  acess       public
parameter      id
methods        put
 */


Router.put("/update/name/:id",(req,res) =>{
    database.publications.forEach((publication) => {
        if(publication.id ===req.params.pubId){
        publication.name =req.body.newPublicationName;
            return;
        }
    });
    return res.json({publication:database.publication});
  });


/**Route          /publication/update/book
 description     update/add NEW book to publication
  acess       public
parameter      isbn
methods        put
 */

// update publication database
Router.delete("/update/book/:isbn",(req,res)=>{
    database.publications.forEach((publication) =>{
     if (publication.id===req.body.pubId){
         return publication.books.push(req.params.isbn);
     }
    });
    // update book databse
    database.books.forEach((book)=>{
        if(book.ISBN ===req.params.isbn){
            book.publication =req.body.pubId;
            return;
        }

    });
    return res.json({
        books:database.books,
    publications:database.publications,
message:"sucessfully updated publication",
});
});

/**Route          /publication/delete
 description     delete publication
  acess       public
parameter      id
methods        delete
 */
Router.delete("/publication/delete/:id",(req,res)=>{
    const updatedPublicationDatabase=await PublicationModel.findOneAndDelete({
        id:req.params.pubId,
    })
    // const updatedPublicationDatabase =database.publications.filter(
    //     (publication)=>publication.id !==req.params.pubId
    // );
    // database.publications = updatedPublicationDatabase;
    return res.json({publications:updatedPublicationDatabase});
});


/**Route          /publication/delete/book
 description     delete book from publication
  acess       public
parameter      isbn,publication id
methods        delete
 */
Router.delete("/delete/book/:isbn/:pubId", (req,res)=> {
// update the publication databse
database.publications.forEach((publication)=>{
    if (publication.id ===parseInt(req.params.pubId)){
        const newBooksList =publication.books.filter(
            (book)=>book !== req.params.isbn
        );
        publication.books=newBooksList;
        return;
    }
});
// update book databse
database.books.forEach((book)=>{
    if(book.ISBN ===req.params.isbn){
        book.publication=0;
        return;

    }
});
return res.json({
    books:database.books,
    publications:database.publications,

});
module.exports=Router;