const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Member = require('../model/member');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/memberDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

router.route('/api/member')
.get((req, res) => {
    try {
        Member.find((err, success) => {
            if(!err) {
                res.json({ result : success });
                console.log('Success');
            } else {
                res.json({ message: err });
            }
        });
    } catch (error) {
        res.json({ message : error });
    }
})
.post((req, res) => {
    try {
        var name = req.body.name;
        var hobby = req.body.hobby;
        var age = req.body.age;
        var address = req.body.address;

        if(res.statusCode == 200) {

            const newMember = new Member({
                name : name,
                hobby : hobby,
                age : age,
                address : address
            });
            newMember.save();

            res.json({ message: "Success Post Data" });
        } else {
            res.json({ message: "Cannot post data" });
        }
    } catch (error) {
        res.json({ message: error });
    }
})
.delete((req, res) => {
    var name = req.body.name;
    Member.deleteOne(
        {name : name},
        (err) => {
            if(!err) {
                res.json({ message: "Success Delete Data" });
            } else {
                res.json({ message : err });
            }
        }
    )
});

router.route('/api/member/?name')
.patch((req, res) => {
    Member.updateOne(
        {name: req.params.name},
        {$set: req.body},
        (err) => {
            if (!err) {
                res.json({ message: "Success Update Field" });
            } else {
                res.json({ message: err });
            }
        }
    );
})
.delete((req, res) => {
    Member.deleteOne(
        {name: req.params.name},
        (err) => {
            if (!err) {
                res.json({ message: "Success Delete Data" });
            } else {
                res.json({ message: err });
            }
        }
    )
});



module.exports = router;