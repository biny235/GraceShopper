const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/categories', require('./categories'));
router.use('/orders', require('./orders'));
router.use('/lineItems', require('./lineItems'));
router.use('/users', require('./users'));
router.use('/addresses', require('./addresses'));
// router.use('/google', require('./google'))

module.exports = router;
