const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://rohitharsh050:123@cluster0.wm0djtq.mongodb.net/FoodHubMern?retryWrites=true&w=majority';

module.exports = async function(callback) {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const foodCollection = mongoose.connection.db.collection("food_items");
        const foodData = await foodCollection.find({}).toArray();

        const categoryCollection = mongoose.connection.db.collection("food_cetegory");
        const categoryData = await categoryCollection.find({}).toArray();

        callback(null, foodData, categoryData);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        callback(err, null, null);
    }
};
