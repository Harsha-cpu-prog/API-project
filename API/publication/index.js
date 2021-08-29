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
    try{
   const  getAllPublications =await PublicationModel.find()
    return res.json({getAllPublications});

    }catch (error){
        return res.json ({error :error.message});
        }
});


/**Route         /publications/p
 description    to get specific publications based on id
  acess       public
parameter      id
methods        get
 */
Router.get("/p/:id",async (req,res) => {
    try{
    const getSpecificPublication = await PublicationModel.findOne({
    id:req.params.id,
});
    if (!getSpecificPublication){
        return res.json({
             error:`No publication found for the id of ${req.params.id}`,
    });
}
    return res.json({author:getSpecificPublication});

} catch (error){
    return res.json({error:error.message});
}
});


/**Route         /publications/books
 description     to get list of publications based on books
  acess       public
parameter      isbn
methods        get
 */
Router.get(" /books/:isbn",(req,res)=>{ 
    try{
    const getSpecificPublication =await PublicationModel.find({id:req.params.book})
    
    if (!getSpecificPublication){
        return res.json({
             error:`No Publication found based on book of ${req.params.isbn}`,
    });
}
return res.json({author:getSpecificPublication});

} catch (error){
    return res.json({error:error.message});
}
});

/**Route         /publication/add
 description     add new publication
  acess       public
parameter      none
methods        post
 */
Router.post("/add",(req,res)=>{
    try{
    const {newPublication }=req.body;
    PublicationModel.create(newPublication);
    return res.json ({message:"publicaion was added"});
} catch (error){
    return res.json({error:error.message});
}
});

/**Route          /publication/update/name
 description     update publication name
  acess       public
parameter      id
methods        put
 */


Router.put("/update/name/:id",(req,res) =>{
    try{
    const updatedpublication = await PublicationModel.findOneAndUpdate(
       {
           id:req.params.id,
       },
       {
           name:req,body,PublicationName,
       },
       {
           new:true,
       }
    );

    return res.json({publication:updatedpublication});
}catch (error){
    return res.json ({error :error.message});
}
});


/**Route          /publication/update/book
 description     update/add NEW book to publication
  acess       public
parameter      isbn
methods        put
 */

// update publication database
Router.put("/update/book/:isbn",(req,res)=>{
    try{
        const updatedPublication =await PublicationModel.findOneAndUpdate(
            {
               id:req.body.newPublication, 
            },
            {
                $addToSet:{
                    books:req.params.isbn,
                },
            },
            {
                new:true,
            }
        );
    
    
    // update book databse
   const updatedBook =await BookModel.findOneAndUpdate(
       {
           ISBN:req.params.isbn,
       },
       {
           $addToSet:{
               publications:req.body.newPublication,
           },
       },
       {
           new:true,
       }

   );

    return res.json({
        books:updatedBook,
    publications:updatedPublication,
message:"sucessfully updated publication",
});
}catch (error){
    return res.json ({error :error.message});
}
});

/**Route          /publication/delete
 description     delete publication
  acess       public
parameter      id
methods        delete
 */
Router.delete("/publication/delete/:id",(req,res)=>{
    try{
    const updatedPublicationDatabase=await PublicationModel.findOneAndDelete({
        id:req.params.pubId,
    })
    // const updatedPublicationDatabase =database.publications.filter(
    //     (publication)=>publication.id !==req.params.pubId
    // );
    // database.publications = updatedPublicationDatabase;
    return res.json({publications:updatedPublicationDatabase});
}catch (error){
    return res.json ({error :error.message});
}
});


/**Route          /publication/delete/book
//  *
 description     delete book from publication
  acess       public
parameter      isbn,publication id
methods        delete
 */
Router.delete("/delete/book/:isbn/:pubId", (req,res)=> {
    try{
// update the publication databse
const updatedPublication=await PublicationModel.findOneAndUpdate({
    id:parseInt(req.params.pubId),
},
{
$pull:{
    books:req.params.isbn,
},
},
{new:true}
);
    
    // update book databse
    const updatedBook =await BookModel.findOneAndUpdate(
        {
        ISBN :req.params.isbn,
        },
        {
            $pull :{
            publications:parseInt(req.params.pubId),
            },
        },
            { 
                new:true}
    );
return res.json({
    books:updatedBook,
    publications:updatedPublication,

});
}catch(error){
    return res.json({error:error.message});
}
    });

module.exports=Router;