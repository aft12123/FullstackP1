import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import RestaurantsByCity from "./RestaurantByCity";
import axios from "axios";

const Home = () => {
  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchCity && !selectedCity) {
      setError("Please select or enter a city");
      return;
    }

    setLoading(true);
    setError(null);
    const city = searchCity || selectedCity; // Use either the entered city or selected city

    try {
      const response = await axios.get(`http://localhost:5400/getRestaurantsByCity/${city}`);
      console.log("response-->>>>",response);
      setRestaurants(response.data); // Assuming the response contains the list of restaurants
      // Navigate to the results page with the city as a query parameter
      navigate(`/restaurants/city/${city}`);
    } catch (err) {
      setError("Failed to fetch restaurants.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="home-container">
      {/* Hero Section */}

      <div className="hero-section">
        <h1> Best Restaurants</h1>
        <form onSubmit={handleSearch} className="search-form">
        <RestaurantsByCity/>
          <input
            type="text"
            placeholder="Enter city name..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Explore Categories */}
      <div className="explore-section">
        <h2>Explore Restaurants by Category</h2>
        <div className="category-list">
          <Link to="/restaurants/category/Fast-Food"> Fast Food</Link>
          <Link to="/restaurants/category/Healthy-Food">Healthy Food</Link>
          <Link to="/restaurants/category/Asian-Cuisine"> Asian Cuisine</Link>
          <Link to="/restaurants/category/Burgers">Burgers & More</Link>
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="featured-section">
        <h2>Top Featured Restaurants</h2>
        <div className="featured-list">
          <div className="featured-item">
            <img src="https://media-cdn.tripadvisor.com/media/photo-s/0f/bc/d2/0f/taj-darbar-restaurant.jpg" alt="Restaurant 1" />
            <p>Taj Darbar</p>
          </div>
          <div className="featured-item">
            <img src="https://th.bing.com/th/id/OIP.ue91BtRuLfbMNFfYhpSRJgHaDk?rs=1&pid=ImgDetMain" alt="Restaurant 2" />
            <p>Niyaz restaurant</p>
          </div>
          <div className="featured-item">
            <img src="https://b.zmtcdn.com/data/pictures/5/18711365/d69e45f88d2c9152b4c8df5c3ed504fe.jpg" alt="Restaurant 3" />
            <p> The Saffron Tree Kolkata</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
