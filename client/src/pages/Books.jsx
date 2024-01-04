import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
    //map function    // Book state
    const [books, setBooks] = useState([]);

  useEffect(() => {
        //create APi request async function
    //     const fecthAllBooks = async ()=>{
    //         try {
    //             const res = await axios.get("http://localhost:8000/books")
    //             setBooks(res.data);
    //            // console.log(res)
    //         } catch (err) {
    //             console.log(err)                
    //         }
    //     }
    //     fecthAllBooks()            
    // },[]);

    const fetchAllBooks = async () => {
        try {
          const res = await axios.get("http://localhost:8000/books");
          setBooks(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAllBooks();
    }, []);
  
    console.log(books);

    const handleDelete = async (id)=>{
        try {
            await axios.delete("http://localhost:8000/books/"+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
            
        }
    }


  return (
    <div>
      <h1>Abishek Book Shop</h1>
      <div className="books">
            {books.map((book) => (
                <div className="book" key={book.id}>
                     {book.cover &&<img src={book.cover} alt="" />}
                     <h2>{book.title}</h2>
                     <p>{book.disc}</p>
                     <span>${book.price}</span>
                     <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                     <button className="update">
                        <Link
                            to={`/update/${book.id}`}
                                style={{ color: "inherit", textDecoration: "none" }}
                                 >
                                Update
                        </Link>
                     </button>
                </div>
            ))}
      </div>
      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  )
}

export default Books
