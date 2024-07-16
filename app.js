//setting up express and mongoose
const express =  require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

//setting up the mmodel
const Campground = require('./models/campground')


//connecting with mongoose server
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    //useCreateIndex has been removed from mongoDB
    //useCreateIndex: true,
    useUnifiedTopology: true
});



//Setting name for the connection
const db = mongoose.connection;



//Error control and connection for MongoDB
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log('Database connected');
});



//setting up express as "app"
const app = express();



//Setting up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))



// Post a req to append data to body through ExpressJS
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));



//for homepage
app.get('/', (req, res) => {
    res.render('home')
});



// For indexing campground
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
})



// To create a new campground
app.get('/campgrounds/new', (req,res)=>{
    res.render('campgrounds/new')
})



// to append the newly added campground
app.post('/campgrounds', async(req, res)=>{
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})



// To show a campground
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground})
})



// To update a campground
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground})
})


app.put('/campgrounds/:id', async(req, res)=>{
    res.send("It works")
})





app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})
