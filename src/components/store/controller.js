const sql = require( "mssql" );
const config = require('../../database');

function getOrders (){
    return new Promise( (resolve, reject) => {
        const limite = 10;
        new sql.ConnectionPool(config).connect()
        .then( pool => {
            return pool.request().query(`
            SELECT *  FROM ARTICULOS
            `)
        }).then( result => {
            let rows  = result.recordset;
            console.log(rows);
            sql.close();
            return resolve(result.recordset);
        }).catch( err => {
            console.log("errores --> ", err);
            sql.close();
            return reject([]);
        });

    })
};

module.exports = {
    getOrders
}