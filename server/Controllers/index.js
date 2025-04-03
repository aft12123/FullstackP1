const restaurantList = require("../Models/restaurants.json");
// const mealTypes = require("../Models/mealtypes.json");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.getAllRestaurants = (req, res) => {
    res.status(200).json(restaurantList);
}

exports.getRestaurantById = (req, res) => {
    const restaurantId = req.params.id;
    const restaurant = restaurantList.find(value =>  value.id == restaurantId);

    if (restaurant) {
        res.status(200).json({ restaurant: restaurant });
    } else {
        res.status(404).json({
            message: "Please provide valid restaurant ID"
        });
    }
}

exports.getRestaurantsByCity = (req, res) => {
    const city = req.params.city;

    // const filteredRestaurants = restaurantList.filter(rest => rest.city == city);
    const filteredRestaurants = restaurantList.filter(rest => rest.city.toLowerCase() === city.toLowerCase());


    if (filteredRestaurants.length > 0) {
        res.status(200).json({ restaurantList: filteredRestaurants });
    } else {
        res.status(404).json({
            message: "Please provide valid City Name"
        });
    } 
}

exports.getRestaurantsByCategory = (req, res) => {
  const category = req.params.category.toLowerCase();

  const filteredRestaurants = restaurantList.filter(rest => rest.category.toLowerCase() === category);

  if (filteredRestaurants.length > 0) {
      res.status(200).json({ restaurantList: filteredRestaurants });
  } else {
      res.status(404).json({
          message: "No restaurants found for this category"
      });
  }
};

// exports.getAllMealTypes((req, res) => {
//     // send back the mealtypes
// });

exports.signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
  
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid email or password" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
  
      const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
  
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  