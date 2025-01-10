// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/AdultBookPage.css";

// const AdultBooksPage = () => {
//   const [books, setBooks] = useState([]);

//   // Fetch books categorized as 'adult' from the backend
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/books/adult"
//         );
//         console.log("Fetched books:", response.data); // Log the fetched books
//         setBooks(response.data);
//       } catch (error) {
//         console.error("Failed to fetch books:", error);
//       }
//     };
//     fetchBooks();
//   }, []);

//   return (
//     <div>
//       <h2>Adult Books</h2>
//       <ul>
//         {books.map((book) => (
//           <li key={book.id}>
//             <h3>{book.title}</h3>
//             <p>Author: {book.author}</p>
//             <p>Publication Year: {book.publicationYear}</p>
//             {book.pdf_path ? (
//               <a
//                 href={`http://localhost:3000/uploads/${book.pdf_path}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="read-book-button"
//               >
//                 Read Book
//               </a>
//             ) : (
//               <p>PDF not available</p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdultBooksPage;
