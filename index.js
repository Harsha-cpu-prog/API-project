const express = require ("express");
//  database
const database = require("./database");
// initialization
const booky =express();
 

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


booky.listen (3000,()=> console.log("hey server is running"));
