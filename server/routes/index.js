const express    = require('express'),
      router     = express.Router();

/**
 * require controllers
 */
const scraperController = require('../controllers/scraperController.js'),
      highScoreController = require('../controllers/highScoreController.js');



/**
 * gets words from API
 */
router
  .route('/scraper')
  .get(scraperController.getWords);
/**
 * Idea handlers
 *  - Get all ideas
 *  - Create a new idea
 *  - Get all ideas for user
 */
router
  .route('/scores')
  .get(highScoreController.getScores)
  .post(highScoreController.createScore);

module.exports = router;
