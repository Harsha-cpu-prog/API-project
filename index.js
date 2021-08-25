require ("dotenv").config();

// framework
const express = require ("express");
const mongoose =require ("mongoose");


//  database
const database = require("./database");

// models
const BookModels =require ("/database/book");
const AuthorModels =require ("/database/auhor");
const PublicationModels =require ("/database/publication");
// initialization
const booky =express();


//  CONFIGURATION
booky.use(express.json());

// establish database connection
mongoose.connect(
   process.env.MONGO_URL,
   {
       userNewUrlParser:true,
       useUndefinedTopology:true,
       uaerFindAndModify:false,
       useCreateIndex:true,
   }

)
.then(() =>console.log("connection established"));
   


/**Route         /
 description    get all books
  acess       public
parameter      none
methods        get
 */
booky.get("/",(req,res)=>{
    return res.json({books:database.books});
});


/**Route         /is
 description    get specific  books based on isbn
  acess       public
parameter      isbn
methods        get
 */
booky.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter (
        (book) => book.ISBN ===req.params.isbn 
        );

    if (getSpecificBook.length ===0){
        return res.json({
             error:`No book found for the ISBN of ${req.params.isbn}`,
    });
}
    return res.json({book:getSpecificBook});
});
    /**Route         /c
 description    get specific  books based on category
  acess       public
parameter      category
methods        get
 */
booky.get("/c/:category",(req,res)=>{ 
    const getSpecificBook =database.books.filter ((book)=> 
    book.category.includes(req.params.category)
    );
    
    if (getSpecificBook.length ===0){
        return res.json({
             error:`No book found for catgory of ${req.params.category}`,
    });
}
return res.json({book:getSpecificBook});
});


 /**Route         /l
 description    get specific  books based on language
  acess       public
parameter      language
methods        get
 */
booky.get("/l/:language",(req,res)=>{ 
    const getSpecificBook =database.books ((book)=> 
    book.category.includes(req.params.language)
    );
    
    if (getSpecificBook.length ===0){
        return res.json({
             error:`No book found for language of ${req.params.language}`,
    });
}
return res.json({book:getSpecificBook});
});

/**Route         /author
 description    get all authors
  acess       public
parameter      none
methods        get
 */
booky.get("/author",(req,res) =>{
    return res.json({authors:database.author});
});



/**Route        / author/d
 description    get specific author based on id
  acess       public
parameter      id
methods        get
 */
booky.get("/author/d/:id", (req,res) => {
    const getSpecificAuthor = database.author.filter (
        (author) => author.id ===req.params.id
        );

    if (getSpecificAuthor.length ===0){
        return res.json({
             error:`No author found for the id of ${req.params.id}`,
    });
} 
    return res.json({author:getSpecificAuthor});
});


/**Route         /author/book
 description    get all authors based on books
  acess       public
parameter      isbn
methods        get
 */
booky.get("/author/book/:isbn",(req,res)=>{ 
    const getSpecificAuthor =database.author.filter ((author)=> 
    author.books.includes(req.params.isbn)
    );
    
    if (getSpecificAuthor.length ===0){
        return res.json({
             error:`No Author found for book of ${req.params.isbn}`,
    });
}
return res.json({author:getSpecificAuthor});
});
/**Route         /publications
 description    get all publications
  acess       public
parameter      none
methods        get
 */

booky.get("/publications",(req,res)=>{
    return res.json({publications:database.publication});
});


/**Route         /publications/p
 description    to get specific publications based on id
  acess       public
parameter      id
methods        get
 */
booky.get("/publication/p/:id", (req,res) => {
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
booky.get(" /publications/books/:isbn",(req,res)=>{ 
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


/**Route         /book/add
 description     add new book
  acess       public
parameter      none
methods        post
 */
booky.post ("/book/add", (req,res)=>{
    const {newBook }=req.body;
    database.books.push(newBook);
    return res.json ({books:database.books});
});


/**Route         /author/add
 description     add new author
  acess       public
parameter      none
methods        post
 */
booky.post("/author/add",(req,res)=>{
    const {newAuthor }=req.body;
    database.author.push(newAuthor);
    return res.json ({books:database.author});
});


/**Route         /publication/add
 description     add new publication
  acess       public
parameter      none
methods        post
 */
booky.post("/publication/add",(req,res)=>{
    const {newPublication }=req.body;
    database.publication.push(newPublication);
    return res.json ({books:database.publication});
});

/**Route         /book/update/title
 description     update book title
  acess       public
parameter      isbn
methods        put
 */
booky.put("/book/update/title/:isbn",(req,res) =>{
  database.books.forEach((book) => {
      if(book.ISBN ===req.params.isbn){
          book.title =req.body.newBookTitle;
          return;
      }
  });
  return res.json({books:database.books});
});

/**Route         /book/update/author
 description     update/add new author for a book
  acess       public
parameter      isbn
methods        put
 */
booky.put("  /book/update/author/:isbn/:authorId",(req,res) =>{
// update the book database
    database.books.forEach((book)=>{

    if (book.ISBN ===req.params.isbn) {
        return book.author.push(parseInt (req.params.authorId));
    }
});

// update author dtabase
    database.author.forEach((author)=>{

        if (author.id ===parseInt(req.params.authorId) )
            return author.books.push(req.params.isbn);
        });
});
return res.json({books:database.books,
    author:database.author});

/**Route          /author/update/name
 description     update author name  
  acess       public
parameter      id
methods        put
 */
booky.put("/author/update/name/:id",(req,res) =>{
    database.authors.forEach((author) => {
        if(author.id ===req.params.id){
        author.name =req.body.newAuthorName;
            return;
        }
    });
    return res.json({author:database.author});
  });

/**Route          /publication/update/name
 description     update publication name
  acess       public
parameter      id
methods        put
 */


booky.put("/publication/update/name/:id",(req,res) =>{
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

booky.put("/publication/update/book/:isbn",(req,res) =>{
    // update publication database
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

      
/**Route          /book/delete
 description     delete book
  acess       public
parameter      isbn
methods        delete
 */
booky.delete("/book/delete/:isbn",(req,res)=>{
    const updatedBookDatabase =database.books.filter(
        (book)=>book.ISBN !==req.params.isbn
    );
    database.books = updatedBookDatabase;
    return res.json({books:database.books });
});

/**Route          /book/delete/author
 description     delete author from book
  acess       public
parameter      isbn,author id
methods        delete
 */
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
// update book databse
database.books.forEach((book) =>{
    if(book.ISBN === req.params.isbn){
        const newAuthorList =book.authors.filter(
            (author) => author !==parseInt(req.params.authorId)
        );
        book.authors =newAuthorList;
        return;
        }
        
    });
// update the author databse
database.authors.forEach((author)=>{
    if (author.id ===parseInt(req.params.authorId)){
        const newBooksList =author.books.filter(
            (book)=>book !== req.params.isbn
        );
        author.books=newBooksList;
        return;
    }
});
return res.json({
    message:"author was deleted",
    book:database.books,
    author:database.authors,
});
});


/**Route          /author/delete
 description     delete author
  acess       public
parameter      id
methods        delete
 */
booky.delete("/author/delete/:id",(req,res)=>{
    const updatedAuthorDatabase =database.authors.filter(
        (author)=>author.id !==req.params.id
    );
    database.authors = updatedAuthorDatabase;
    return res.json({authors:database.authors});
});

/**Route          /publication/delete
 description     delete publication
  acess       public
parameter      id
methods        delete
 */
booky.delete("/publication/delete/:id",(req,res)=>{
    const updatedPublicationDatabase =database.publications.filter(
        (publication)=>publication.id !==req.params.pubId
    );
    database.publications = updatedPublicationDatabase;
    return res.json({publications:database.publications});
});
/**Route          /publication/delete/book
 description     delete book from publication
  acess       public
parameter      isbn,publication id
methods        delete
 */
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


booky.listen (3000,()=> console.log("hey server is running"));
