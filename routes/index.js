var express = require('express');
var router = express.Router();
const Place = require('../models/places')
const { checkBody } = require('../modules/checkBody');


router.post('/places', (req, res) => {
    if (!checkBody(req.body, ['nickname', 'name'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
      }

    Place.findOne({nickname: req.body.nickname, name: req.body.name}).then(data => {
        if(data === null) {
            const newPlace = new Place({
                nickname: req.body.nickname,
                name: req.body.name, 
                latitude: req.body.latitude,
                longitude: req.body.longitude
            })

            newPlace.save().then(newDoc => {
                    res.json({result: true, place: newDoc})
            })
        } else {
            res.json({result: false, error: 'Place already exist with this username'})
        }
    })
})

router.get('/places/:nickname', (req, res) => {
    const nickname = req.params.nickname
    console.log(nickname)
    Place.find({nickname: nickname}).then(data => {
        if(data) {
            res.json({result: true, places: data})
        } else {
            res.json({result: false, error: 'Places not found with this nickname or something wrong bitch'})
        }
    })
})

router.delete('/places', (req, res) => {
    Place.deleteOne({nickname: req.body.nickname, name: req.body.name}).then(deletedDoc => {
        console.log(deletedDoc)
        if (deletedDoc.deletedCount > 0) {
            // document successfully deleted
            Place.find().then(data => {
              res.json({ result: true, places: data });
            });
          } else {
            res.json({ result: false, error: "Place not found" });
          }
    })
})

module.exports = router;
