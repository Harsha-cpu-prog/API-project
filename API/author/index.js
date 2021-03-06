// initializing Express Router

const Router =require ("express").Router();

// database models
const AuthorModel =require("../../database/author");

/**Route         /author
 description    get all authors
  acess       public
parameter      none
methods        get
 */
Router.get("/",async (req,res) =>{
    try {
    const getAllAuthors=await AuthorModel.find()
    return res.json({getAllAuthors});

    }catch (error){
    return res.json ({error :error.message});
    }
});

/**Route        / author/d
 description    get specific author based on id
  acess       public
parameter      id
methods        get
 */
Router.get("/d/:id", async(req,res) => {
    try{
    const getSpecificAuthor = await AuthorModel.findOne ({
        id:req.params.id,
    });
        

    if (!getSpecificAuthor){
        return res.json({
             error:`No author found for the id of ${req.params.id}`,
    });
} 
    return res.json({author:getSpecificAuthor});
}catch (error){
    return res.json ({error :error.message});
}
});


/**Route         /author/book
 description    get all authors based on books
  acess       public
parameter      isbn
methods        get
 */
Router.get("/book/:isbn",async(req,res)=>{ 
    try{
    const getSpecificAuthors =await AuthorModel .find({ISBN:req.params.isbn})
    if (!getSpecificAuthor){
        return res.json({
             error:`No Author found for book of ${req.params.isbn}`,
    });
}
return res.json({author:getSpecificAuthors});
    }catch(error){
        return res.json({error:error.message});
    }
});


/**Route         /author/add
 description     add new author
  acess       public
parameter      none
methods        post
 */
Router.post("/add",(req,res)=>{
    try{
    const {newAuthor }=req.body;
   await  AuthorModel.create(newAuthor);
    return res.json ({message:"author was added"});
    }catch(error){
        return res.json({error:error.message});
    }
});

/**Route         /book/update/author
 description     update/add new author for a book
  acess       public
parameter      isbn
methods        put
 */
Router.put("  /book/update/author/:isbn/:authorId",(req,res) =>{
    try{
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
}catch(error){
    return res.json({error:error.message});
}
    
    });
    
    /**Route          /author/update/name
     description     update author name  
      acess       public
    parameter      id
    methods        put
     */
    Router.put("/update/name/:id",(req,res) =>{
        try{
        const updatedAuthor =await AuthorModel.findOneAndUpdate(
            {
                id:req.params.id,
            },
            {
                name:req,body,AuthorName,
            },
            {
                new:true,
            },
        );
        return res.json({author:updatedAuthor});
    }catch(error){
            return res.json({error:error.message});
        }
      });



      /**Route          /book/delete/author
 description     delete author from book
  acess       public
parameter      isbn,author id
methods        delete
 */
Router.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    try{
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
}catch(error){
    return res.json({error:error.message});
}
    });
    
    
    /**Route          /author/delete
     description     delete author
      acess       public
    parameter      id
    methods        delete
     */
    Router.delete("/delete/:id",async (req,res)=>{
        try{
        const updatedAuthorDatabase=await AuthorModel.findOneAndDelete({
            id:req.params.id,
        })
        // const updatedAuthorDatabase =database.authors.filter(
        //     (author)=>author.id !==req.params.id
        // );
        // database.authors = updatedAuthorDatabase;
        return res.json({authors:updatedBookDatabase});
    }catch(error){
        return res.json({error:error.message});
    }
    });
    module.exports=Router;