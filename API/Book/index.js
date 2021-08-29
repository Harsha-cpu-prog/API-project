// Prefix:/book

7

/**Route         /
 description    get all books
  acess       public
parameter      none
methods        get
 */
Router.get("/",async (req,res)=>{
    try{
        
    const getAllBooks = await BookModel.find()
    return res.json({getAllBooks});

    }catch (error){
        return res.json ({error :error.message});
    }
});


/**Route         /is
 description    get specific  books based on isbn
  acess       public
parameter      isbn
methods        get
 */
Router.get("/is/:isbn", async (req,res) => {
    try{

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
}catch (error){
    return res.json ({error :error.message});
}
});
    /**Route         /c
 description    get specific  books based on category
  acess       public
parameter      category
methods        get
 */
Router.get("/c/:category",async (req,res)=>{ 
    try{
    const getSpecificBooks = await BookModel.findOne({
        category:req.params.category,
     });
  
    
    
    if (!getSpecificBooks){
        return res.json({
             error:`No book found for catgory of ${req.params.category}`,
    });
}
return res.json({book:getSpecificBook});
}catch (error){
    return res.json ({error :error.message});
}
});


 /**Route         /l
 description    get specific  books based on language
  acess       public
parameter      language
methods        get
 */
Router.get("/l/:language",async(req,res)=>{ 
    try{
    const getSpecificBooks =await BookModel.findOne({
    language:req.params.language,
    });
    
    if (!getSpecificBooks){
        return res.json({
             error:`No book found for language of ${req.params.language}`,
    });
}
return res.json({book:getSpecificBook});
}catch (error){
    return res.json ({error :error.message});
}
});




/**Route         /book/add
 description     add new book
  acess       public
parameter      none
methods        post
 */
Router.post ("/add", (req,res)=>{
    try{const {newBook }=req.body;

    await BookModel.create(newBook);

    return res.json ({message:"new book added"});
    }catch(error){
        return res.json({error: error.message});
    }
    
});


/**Route         /book/update/title
 description     update book title
  acess       public
parameter      isbn
methods        put
 */
Router.put("/update/title/:isbn",async(req,res) =>{
    try{
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
}catch (error){
    return res.json ({error :error.message});
}
});

      
/**Route          /book/delete
 description     delete book
  acess       public
parameter      isbn
methods        delete
 */
Router.delete("/delete/:isbn",async (req,res)=>{
    try{
    const updatedBookDatabase =await BookModel.findOneAndDelete({
        isbn:req.params.isbn,
    });
    
    
        // const updatedBookDatabase =database.books.filter(
        //     (book)=>book.ISBN !==req.params.isbn
        // );
        // database.books = updatedBookDatabase;
        return res.json({books:updatedBookDatabase });
    }catch (error){
        return res.json ({error :error.message});
    }
    });

    modules.exports =Router;