/**
 * require modules
 */
const bodyParser  = require('body-parser'),
      express     = require('express'),
      routes      = require('./routes'),
      path        = require('path'),
      app         = express(),
      db          = require('./models/database.js');


/**
 * allowCrossDomain - Sets headers to allow for CORS
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
// Add allowCrossDomain as middleware
app.use(allowCrossDomain);


/**
 * Express middleware to serve all static files from client folder
 */
app.use(express.static(path.join(__dirname, 'client')));


/**
 * Body-parser middleware to automatically parse request body data and store in req.body
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * use the routes module for incoming requests to our api
 */
app.use('/api', routes);


/**
 * Establish db connection
 */
const port = 8080;
app.listen(port);
console.log(`Server running on port: ${port}`);
