const mongoose = require('mongoose');

//setting up the mmodel
const Campground = require('../models/campground')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');



//connecting with mongoose server
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    //useCreateIndex has been removed from mongoDB
    //useCreateIndex: true,
    useUnifiedTopology: true
});



//Setting name for the connection
const db = mongoose.connection;



// For convenience
const sample = array => array[Math.floor(Math.random() * array.length)];



//Error control and connection for MongoDB
// To run this try - "node seeds/index.js" in shell
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log('Database connected');
});

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i = 0; i<50; i++){
        console.log(i)
        const random1000 = Math.floor(Math.random()*1000)
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save(); 
    }
    
}


seedDB().then(()=>{
    mongoose.connection.close();
})