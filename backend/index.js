import express from "express"
import mysql from "mysql"
import cors from "cors";

const app =  express()
// --------------------midileware to allow connect to back end----------------
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Singh#7878",
    database:"test",
    
})

//if any authentication problem use 
//  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Singh#7878';

app.use(express.json())

app.get("/", (req,res)=> {
    res.json("hello this is the backend")
})

app.get("/books", (req,res)=>{
    const q = "select * from books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books(`title`,`disc`,`price` ,`cover`) VALUES(?)"
   // const values = ["title from backend","disc from backend","cover from backend",];
    const values = [
        req.body.title,
        req.body.disc,
        req.body.price,
        req.body.cover
        ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Books has been created")
    });
});

app.delete("/books/:id", (req,res)=>{
    const booksId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[booksId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Books has been deleted...")
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `disc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.disc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
      //return res.json("book update successfully");
    });
  });
  

app.listen(8000, ()=>{
    console.log("conected to backend!1")
})