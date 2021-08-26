require ("dotenv").config();

// framework
const express = require ("express");
const mongoose =require ("mongoose");


//  database
const database = require("./database");

// models
const BookModel =require ("/database/book");
const AuthorModel =require ("/database/auhor");
const PublicationModel =require ("/database/publication");


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
booky.get("/",async (req,res)=>{
    const getAllBooks = await BookModel.find()
    return res.json({getAllBooks});
});


/**Route         /is
 description    get specific  books based on isbn
  acess       public
parameter      isbn
methods        get
 */
booky.get("/is/:isbn", async (req,res) => {

    const getSpecificBook =await BookModel.findOne({ISBN:req.params.isbn})
    // const getSpecificBook = database.books.filter (
    //     (book) => book.ISBN ===req.params.isbn 
    //     );

    if (!getSpecificBook){
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
booky.get("/c/:category",async (req,res)=>{ 
    const getSpecificBooks = await BookModel.findOne({
        category:req.params.category,
     });
  
    
    
    if (!getSpecificBooks){
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
booky.get("/l/:language",async(req,res)=>{ 
    const getSpecificBooks =await BookModel.findOne({
    language:req.params.language,
    });
    
    if (!getSpecificBooks){
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
booky.get("/author",async (req,res) =>{
    const getAllAuthors=await AuthorModel.find()
    return res.json({getAllAuthors});
});

/**Route        / author/d
 description    get specific author based on id
  acess       public
parameter      id
methods        get
 */
booky.get("/author/d/:id", async(req,res) => {
    const getSpecificAuthor = awaitAuthorModel.findOne ({
        id:req.params.id,
    });
        

    if (!getSpecificAuthor){
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
    BookModel.create(newBook);
    return res.json ({message:"new book added"});
});


/**Route         /author/add
 description     add new author
  acess       public
parameter      none
methods        post
 */
booky.post("/author/add",(req,res)=>{
    const {newAuthor }=req.body;
    AuthorModel.create(newAuthor);
    return res.json ({message:"author was added"});
});


/**Route         /publication/add
 description     add new publication
  acess       public
parameter      none
methods        post
 */
booky.post("/publication/add",(req,res)=>{
    const {newPublication }=req.body;
    PublicationModel.create(newPublication);
    return res.json ({message:"publicaion was added"});
});

/**Route         /book/update/title
 description     update book title
  acess       public
parameter      isbn
methods        put
 */
booky.put("/book/update/title/:isbn",async(req,res) =>{
    const updatedBook =await BookModel.findOneAndUpdate(
        {
            ISBN:req.psrsmd.isbn,
        },
        {
            title:req,body,bookTitle,
        },
        {
            new:true,
        }
    );
//   database.books.forEach((book) => {
//       if(book.ISBN ===req.params.isbn){
//           book.title =req.body.newBookTitle;
//           return;
    //   }});
  
  return res.json({books:updatedBook});
});

/**Route         /book/update/author
 description     update/add new author for a book
  acess       public
parameter      isbn
methods        put
 */
booky.put("  /book/update/author/:isbn/:authorId",(req,res) =>{
// update the book database
const updatedBook =await BookModel.findOneAndUpdate(
    {
        ISBN:req.params.isbn,
    },
    {
        $addToSet:{
            authors:req.body.newAuthor,
        },
    },
    {
        new:true,
    }
);


//     database.books.forEach((book)=>{

//     if (book.ISBN ===req.params.isbn) {
//         return book.author.push(parseInt (req.params.authorId));
//     }
// });

// // update author dtabase

const updatedAuthor =await AuthorModel.findOneAndUpdate(
    {
        id: req.body.newAuthor,
    },
    {
        $addToSet:{
            books :req.params.isbn,
        },
    },
    {
        new:true,
    }
);
//     database.author.forEach((author)=>{

//         if (author.id ===parseInt(req.params.authorId) )
//             return author.books.push(req.params.isbn);
// });
return res.json({books:updatedBook,
    author:updatedAuthor,
message:"new author added",
});
});

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
booky.delete("/book/delete/:isbn",async (req,res)=>{
const updatedBookDatabase =await BookModel.findOneAndDelete({
    isbn:req.params.isbn,
});


    // const updatedBookDatabase =database.books.filter(
    //     (book)=>book.ISBN !==req.params.isbn
    // );
    // database.books = updatedBookDatabase;
    return res.json({books:updatedBookDatabase });
});

/**Route          /book/delete/author
 description     delete author from book
  acess       public
parameter      isbn,author id
methods        delete
 */
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
// update book databse
const updatedBook =await BookModel.findOneAndUpdate(
    {
    ISBN :req.params.isbn,
    },
    {
        $pull :{
            authors:parseInt(req.params.authorId),
        },
    },
        { 
            new:true}
);


// database.books.forEach((book) =>{
//     if(book.ISBN === req.params.isbn){
//         const newAuthorList =book.authors.filter(
//             (author) => author !==parseInt(req.params.authorId)
//         );
//         book.authors =newAuthorList;
//         return;
//         }
        
//     });
// update the author databse

const updatedAuthor=await AuthorModel.findOneAndUpdate({
    id:parseInt(req.params.authorId),
},
{
$pull:{
    books:req.params.isbn,
},
},
{new:true}
);
// database.authors.forEach((author)=>{
//     if (author.id ===parseInt(req.params.authorId)){
//         const newBooksList =author.books.filter(
//             (book)=>book !== req.params.isbn
//         );
//         author.books=newBooksList;
//         return;
//     }
// });
return res.json({
    message:"author was deleted",
    book:updatedBook,
    author:updatedAuthor,
});
});


/**Route          /author/delete
 description     delete author
  acess       public
parameter      id
methods        delete
 */
booky.delete("/author/delete/:id",async (req,res)=>{
    const updatedAuthorDatabase=await AuthorModel.findOneAndDelete({
        id:req.params.id,
    })
    // const updatedAuthorDatabase =database.authors.filter(
    //     (author)=>author.id !==req.params.id
    // );
    // database.authors = updatedAuthorDatabase;
    return res.json({authors:updatedBookDatabase});
});

/**Route          /publication/delete
 description     delete publication
  acess       public
parameter      id
methods        delete
 */
booky.delete("/publication/delete/:id",(req,res)=>{
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
