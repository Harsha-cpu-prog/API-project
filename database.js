const books=[{
    ISBN:"12345Book",
    title:"Gettting started with MERN",
    pubDate:"2021-07-07",
    language:"en",
    numPage:250,
    author:[1,2],
    publication:[1],
    category:["tech","programming","education,thriller"],
},
];
const authors=[
    {
    id :1,
    name:"pavan",
    books:["12345Book"],
    },
{   id :1,
    name:"elonmusk",
    books:["12345Book"] 
},
];
const publication =[
    {
        id :1,
        name:"writex",
        books:["12345Book"],
},
];
module.exports = { books,authors,publication };
