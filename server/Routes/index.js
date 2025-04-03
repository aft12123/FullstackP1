// create some routes which can recieve the incoming request

const express = require('express');
const router = express.Router();
// const { signup, login } = require("../controllers/authController");

const controller = require('../Controllers/index');

router.get('/restaurants', controller.getAllRestaurants);

router.get('/restaurants/:id', controller.getRestaurantById);

router.get('/getRestaurantsByCity/:city', controller.getRestaurantsByCity);
router.get("/getRestaurantsByCategory/:category", controller.getRestaurantsByCategory);

router.post("/signup", controller.signup);

router.post("/login", controller.login);

// router.get('/getMealTypes', controller.getAllMealTypes);

module.exports = router;





// router.post("/signup", signup);
// router.post("/login", login);


