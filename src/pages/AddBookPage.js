// AddBookPage.js
import React, { useState } from "react";
import axios from "axios";

const AddBookPage = () => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    category: "",
    publicationYear: "",
  });
  const [pdf, setPdf] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(bookDetails).forEach((key) =>
      formData.append(key, bookDetails[key])
    );
    formData.append("pdf", pdf);

    try {
      const response = await axios.post("/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error || "Failed to upload book");
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={bookDetails.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={bookDetails.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={bookDetails.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="publicationYear"
          placeholder="Publication Year"
          value={bookDetails.publicationYear}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Add Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddBookPage;
