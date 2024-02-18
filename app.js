const express = require('express');
const app = express();
const path = require('path');

const comments = [
    {
        username:'U1',
        comment:'LoL1'
    },
    {
        username:'U2',
        comment:'LoL2'
    },
    {
        username:'U3',
        comment:'LoL3'
    },
    {
        username:'U4',
        comment:'LoL4'
    },
    {
        username:'U5',
        comment:'LoL5'
    },
    {
        username:'U6',
        comment:'LoL6'
    },
]

app.get('/comments', (req,res) => {
    res.render('comments/index')
})


app.listen(3000 ,()=>{
    console.log('Listening on port 3000')
})