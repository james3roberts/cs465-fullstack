const mongoose = require('mongoose');
const model = mongoose.model('trips');

//GET: /trips - lists all the trips
const tripsList = async (req,res) => {
    model
        .find({}) //empty filter for all
        .exec((err,trips)=> {
            if (!trips) {
                return res
                    .status (404)
                    .json ({"message": "trip not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status (200)
                    .json(trips);
            }
        });
};

//GET: /trips/:tripCode - returns a single trip
const tripsFindCode = async (req,res) => {
    console.log('tripsFindCode invoked with '+ req.params.tripsCode);
    Trip
        .find({'code': req.params.tripsCode})
        .exec((err, trip) => {
            if (!trip){
                return res
                    .status(404)
                    .json({"message": "trips not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                console.log('tripsFindCode returning:\n'+ trip);
                return res
                    .status(200)
                    .json(trip);
            }
        });
};


const tripAddTrip = async (req,res) => {
    Trip
    .create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    },
    (err,trip) => {
        if (err) {
            return res
                .status(400) //bad request,invalid contend
                .json(err);
        } else{
            return res
                .status(201)  //created
                .json(trips);
        }
    });
}

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip
};
 