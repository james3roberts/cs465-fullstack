const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
});

const Trip = mongoose.model('Trip', tripSchema); // Register the "Trip" model with the schema


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
    console.log('tripsFindCode invoked with '+req.params.tripsCode);
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
                console.log('tripsFindCode returning:\n'+trip);
                return res
                    .status(200)
                    .json(trip);
            }
        });
};


const tripsAddTrip = async (req, res) => {
    Trip
        .create({
            code: req.body.code,
            name:req.body.name,
            length:req.body.length,
            start:req.body.start,
            resort:req.body.resort,
            perPerson: req.body.perPerson,
            image:req.body.image,
            description:req.body.description
        },
        (err, trip) =>{
            if (err) {
                return res
                    .status(400)
                    .json(err);
            }else {
                return res
                    .status(201)
                    .json(trip);
            }
        });
}

 const tripsUpdateTrip = async (req, res) => {
    console.log(req, body);
    Trip
        .findOneAndUpdate({'Code': req.params.tripsCode }, {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, {new: true})
        .then (trip => {
            if (!trip) {
                return res
                    .status(404)
                    .sent ({
                        message: "Trip not found with code " +req.params.tripsCode
                    });
            }
            res.send(trip);
        }).catch(err => {
            if (err.kind === 'ObjectId'){
                return res
                    .status(404)
                    .send({
                        message: "Trip not found with code " + req.params.tripsCode
                    });
            }
            return res
                .status(500) //server error
                .json(err);
        });
 }

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    Trip,
  };
