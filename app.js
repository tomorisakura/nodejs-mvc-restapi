const express = require('express');
const memberController = require('./route/memberController');

const app = express();

const port = process.env.port || 3000;
const host = 'YOUR HOST';

app.use(memberController);

// if you not listen to me i will give you some mtfck pie 
// u can use a host with ip config for testing on a android browser 
// they replace a localhost to 192.168.99:3000

app.listen(port, host, () => {
    console.log("run without you on port " +port +" 😭");
});