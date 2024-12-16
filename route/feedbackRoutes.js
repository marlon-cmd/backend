const express = require ('express')
const { feedback } = require ('../controllers/feedbackController');

const router = express.Router();

router.post('/', feedback);

module.exports = router;