// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/KidsBooksPage.css";

// const KidsBooksPage = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/books/kids"
//         );
//         console.log("Fetched books:", response.data);
//         setBooks(response.data);
//       } catch (error) {
//         console.error("Failed to fetch books:", error);
//       }
//     };
//     fetchBooks();
//   }, []);

//   return (
//     <div>
//       <h1>Kids Books</h1>
//       <ul>
//         {books.map((book) => (
//           <li key={book.id}>
//             <h3>{book.title}</h3>
//             <p>Author: {book.author}</p>
//             <p>Publication Year: {book.publicationYear}</p>
//             {book.pdf_path ? ( // Ensure pdf_path is checked
//               <a
//                 href={`http://localhost:3000/uploads/${book.pdf_path}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="read-book-button" // Add the CSS class here
//               >
//                 Read Book
//               </a>
//             ) : (
//               <p>PDF not available</p> // Fallback if the PDF path is not available
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default KidsBooksPage;
