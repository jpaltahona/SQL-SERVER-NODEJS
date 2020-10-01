const sql = require( "mssql" );
const config = require('../../database');

function numberTotalOrdes (){
    return new Promise( (resolve, reject) => {

        new sql.ConnectionPool(config).connect()
        .then( pool => {
            return pool.request().query(`
            SELECT COUNT(*)
                FROM PEDIDOS
            `)
        }).then( result => {
            let objs = result.recordset[0];
            let resultado = "";
            for (const key in objs ) {
                resultado = objs[key];
            }
            sql.close();
            return resolve(resultado);
        }).catch( err => {
            console.log("errores --> ", err);
            sql.close();
            return reject([]);
        });

    })
};
function numberOrdesStatusOne (){
    return new Promise( (resolve, reject) => {

        new sql.ConnectionPool(config).connect()
        .then( pool => {
            return pool.request().query(`
            SELECT COUNT(*)
                FROM PEDIDOS
                    WHERE ESTADO='1'
            `)
        }).then( result => {
            sql.close();
            let objs = result.recordset[0];
            let resultado = "";
            for (const key in objs ) {
                resultado = objs[key];
            }
            sql.close();
            return resolve(resultado);
        }).catch( err => {
            console.log("errores --> ", err);
            sql.close();
            return reject([]);
        });

    })
};
function numberOrdesStatusTwo (){
    return new Promise( (resolve, reject) => {

        new sql.ConnectionPool(config).connect()
        .then( pool => {
            return pool.request().query(`
            SELECT COUNT(*)
                FROM PEDIDOS
                    WHERE ESTADO='2'
            `)
        }).then( result => {
            let objs = result.recordset[0];
            let resultado = "";
            for (const key in objs ) {
                resultado = objs[key];
            }
            sql.close();
            return resolve(resultado);
        }).catch( err => {
            console.log("errores --> ", err);
            sql.close();
            return reject([]);
        });

    })
};
function getUsers(type) {
    return new Promise( (resolve, reject) => {

        new sql.ConnectionPool(config).connect()
        .then( pool => {
            return pool.request().query(`
            SELECT *
                FROM PERSONA
                    JOIN TIPO_PERSONA ON PERSONA.ID = TIPO_PERSONA.ID_PERSONA
                        WHERE TIPO_PERSONA.TIPO='${type}'
            `)
        }).then( result => {
            let objs = result.recordset;
            sql.close();
            return resolve(result.recordset);
        }).catch( err => {
            console.log("errores --> ", err);
            sql.close();
            return reject([]);
        });

    })
}
function createOrden(id, cliente, vendedor, fecha, estado) {
    return new Promise( (resolve, reject) => {

        new sql.ConnectionPool(config).connect()
        .then( pool => {
            return pool.request().query(`
                INSERT
                INTO PEDIDOS(ID,CLIENTE,VENDEDOR,FECHA_HORA,ESTADO)
                VALUES('${id}','${cliente}','${vendedor}','${fecha}', '${estado}')
            `)
        }).then( result => {
            let objs = result.recordset;
            sql.close();
            return resolve(result.recordset);
        }).catch( err => {
            console.log("errores --> ", err);
            sql.close();
            return reject([]);
        });

    })
};
function createOrdenDatail(id, numero, codArticulo, cantidad, valor) {
    return new Promise( (resolve, reject) => {

        new sql.ConnectionPool(config).connect()
        .then( pool => {
            return pool.request().query(`
                INSERT
                INTO DET_PEDIDOS(ID_PEDIDO,NUMERO,COD_ARTICULO,CANTIDAD,VALOR_UND)
                VALUES('${id}','${numero}','${codArticulo}','${cantidad}', '${valor}')
            `)
        }).then( result => {
            let objs = result.recordset;
            sql.close();
            return resolve(result.recordset);
        }).catch( err => {
            console.log("errores --> ", err);
            sql.close();
            return reject([]);
        });

    })
};
function gerOrdenForSeller(idUser) {
    return new Promise( (resolve, reject) => {

        new sql.ConnectionPool(config).connect()
        .then( pool => {
            return pool.request().query(`
            SELECT *
            FROM PERSONA
                JOIN TIPO_PERSONA ON PERSONA.ID = TIPO_PERSONA.ID_PERSONA
        
                WHERE TIPO_PERSONA.TIPO = '2'
            `)
        }).then( result => {
            let objs = result.recordset;
            console.log(objs);
            sql.close();
            return resolve(result.recordset);
        }).catch( err => {
            console.log("errores --> ", err);
            sql.close();
            return reject([]);
        });

    })
}


module.exports = {
    numberTotalOrdes,
    numberOrdesStatusOne,
    numberOrdesStatusTwo,
    getUsers,
    createOrden,
    createOrdenDatail,
    gerOrdenForSeller
}