const express = require('express');
const router = express.Router();

const {numberTotalOrdes, numberOrdesStatusOne, numberOrdesStatusTwo, getUsers, createOrden, 
    createOrdenDatail,
    gerOrdenForSeller
} = require('./controller');

router.get('/order/number', async (req, res, next) =>{
    const total = await numberTotalOrdes().then( (fullMessage) => fullMessage );
    const statusOne = await numberOrdesStatusOne().then( (fullMessage) => fullMessage )
    const statusTwo = await numberOrdesStatusTwo().then( (fullMessage) => fullMessage )

    res.json({
        total: total,
        statusOne: statusOne,
        statusTwo, statusTwo
   })
});

router.get('/user/list', async (req, res, next) =>{
    const users = await getUsers("1").then( (fullMessage) => fullMessage );
    const sellers = await getUsers("2").then( (fullMessage) => fullMessage );
    res.json({
        users,
        sellers
    })
});


router.post('/order/create', async (req, res) => {
    const idRamdon = Math.random();
    const {user,seller,product, fecha, state} = req.body;
    const orden = await createOrden( idRamdon, user ,seller,fecha, state );
    const dateuk = await createOrdenDatail( '12',idRamdon, product.id, product.quantity, product.valor )

    res.json({
        data:  req.body
    })
});

router.get('/sellers/all', async (req, res, next) =>{
    const users = await gerOrdenForSeller("2").then( (fullMessage) => fullMessage );
    res.json({
        users,
    })
});
module.exports = router;