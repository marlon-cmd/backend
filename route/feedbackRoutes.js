const { feedback } = require ('../controllers/feedbackController');

router.post('/', feedback);

module.exports = router;