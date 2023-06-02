const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
}

// render travel list view
const renderTravelList = (req, res, responseBody) => {
  let message = null;
  let pageTitle = process.env.npm_package_description + ' - Travel';

  if (!(responseBody instanceof Array)) {
    message = ' API lookup error';     //single quote
    responseBody =[];
  }else {
    if (!responseBody.length) {
      message = 'No trips exist in database!';
    }
  }
  
  res.render('travel',{
    title: pageTitle,
    trips: responseBody,
    message
  });
};
// Get travel list view
const travelList = (req, res) => {
  const path = '/api/trips';
  const requestOptions = {
    url: `$[apiOptions.server]$[path]`,     // this is using back ticks
    method: 'get',      //this is using single quotes but might need to be back ticks
    json: {},
  };

  console.info('>> travelController.travelList calling ' + requestOptions.url);

  request(
    requestOptions,
    (err, {statusCode },body) =>{
      if (err) {
        console.err(err);
      }
      renderTravelList(req, res, body);
    }
  )
}

module.exports = {
  travelList
};