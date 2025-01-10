import React from "react";
import "../styles/HomePage.css"; // Import the CSS

const HomePage = () => {
  return (
    <div className="home">
      <div className="header">
        <h1>Welcome to the Education Centre System</h1>
        <p>Your gateway to a world of knowledge.</p>
      </div>
      {/* Insert the image below the header */}
      <img
        src="https://www.edigitallibrary.com/img/library-img.jpg" // Direct image link
        alt="Library" // Descriptive alt text for accessibility
        className="home-image" // Class for styling
      />
      {/* <button className="explore-button">Explore Now</button> */}
    </div>
  );
};

export default HomePage;
