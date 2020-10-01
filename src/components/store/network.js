const express = require('express');
const router = express.Router();
//const { success, error } = require('../../responses');
const {getOrders} = require('./controller');

router.get('/', async (req, res, next) =>{
    const products = await getOrders().then( (fullMessage) => fullMessage );
    res.render('store.ejs', {
        products
    })
});


/* router.post('/', (req, res) => {
    const query = req.body;
    productSearch(query)
        .then( (fullMessage) =>  success(req, res, fullMessage, 201 , 'god') )
        .catch( err => error(req ,res , 'Unexpected Error', 400, err) )
}); */
module.exports = router;