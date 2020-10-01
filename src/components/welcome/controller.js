const sql = require( "mssql" );
const config = require('../../database');

function getOrders (){
    return new Promise( (resolve, reject) => {
        const limite = 10;
        new sql.ConnectionPool(config).connect()
        .then( pool => {
            return pool.request().query(`
            SELECT PEDIDOS.ID, PEDIDOS.FECHA_HORA, PEDIDOS.ESTADO, DET_PEDIDOS.VALOR_UND, PERSONA.NAME, PERSONA.APELLIDO
            FROM PEDIDOS
                JOIN PERSONA ON PERSONA.ID = PEDIDOS.CLIENTE
                JOIN DET_PEDIDOS ON DET_PEDIDOS.NUMERO = PEDIDOS.ID

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
