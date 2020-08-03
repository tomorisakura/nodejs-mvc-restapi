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

        const findMember = new Promise((resolve, reject) => {
            Member.find((err, success) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(success);
                }
            });
        });

        findMember
        .then(datas => res.json({ result: datas }))
        .catch(datas => res.json({ result: datas }));

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

        const newMember = new Promise((resolve, reject) => {
            if(res.statusCode == 200) {
                const data = new Member({
                    name : name,
                    hobby : hobby,
                    age : age,
                    address : address
                });
                resolve(data.save());
            } else {
                reject("Cannot post data");
            }
        });

        newMember
        .then(datas => res.json({ message: "Success post data" + datas }))
        .catch(datas => res.json({ message: datas }));

    } catch (error) {
        res.json({ message: error });
    }
})
.patch((req, res) => {
    let name = req.body.name;
    const updateMember = new Promise((resolve, reject) => {
        let update = Member.updateOne({ name : name }, {$set: req.body})
        if(res.statusCode == 200) {
            resolve(update);
        }else {
            reject("Cannot update member, check your connection !")
        }
    });

    updateMember
    .then(datas => res.json({ message : "Success update data", updated : datas }))
    .catch(datas => res.json({ message : datas }));
})
.delete((req, res) => {
    let name = req.body.name;
    const deleteMember = new Promise((resolve, reject) => {
        let deleteOne = Member.deleteOne({name : name})
        setTimeout(() => {
            if (res.statusCode == 200) {
                resolve(deleteOne);
            } else {
                reject("Cannot Delete Member, Check Your Connection !");
            }
        }, 500);
    });

    deleteMember
    .then(datas => res.json({ message : "Success Delete Data", deleted : datas }))
    .catch(datas => res.json({ message : datas }));
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