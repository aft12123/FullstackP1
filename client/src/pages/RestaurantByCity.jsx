import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/App.css";


const RestaurantsByCity = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    // Fetch all restaurants to extract unique cities
    axios
      .get("http://localhost:5404/restaurants")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const uniqueCities = [
            ...new Set(response.data.map((r) => r.city)),
          ];
          setCities(uniqueCities);
        }
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5404/getRestaurantsByCity/${city}`)
      .then((response) => {
        if (response.data.restaurantList && Array.isArray(response.data.restaurantList)) {
          setRestaurants(response.data.restaurantList);
          navigate(`/restaurants/city/${city}`);
        } else {
          setRestaurants([]);
        }
      })
      .catch((error) => {
        setError("Failed to fetch restaurants.");
        setLoading(false);
      });
  };

  return (
    <div >

      {/* Dropdown to select a city */}
      <div>
        <label>Select a City: </label>
        <select onChange={handleCityChange} value={selectedCity}>
          <option value="">-- Select --</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default RestaurantsByCity;



