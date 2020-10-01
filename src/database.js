const sql = require( "mssql" );
const {sqlConfig} = require('./config');

const config = {
    user: sqlConfig.user,
    password: sqlConfig.password,
    server:  sqlConfig.server, // You can use 'localhost\\instance' to connect to named instance
    database: sqlConfig.database,
}
module.exports = config;


function inset(){
    new sql.ConnectionPool(config).connect()
    .then( pool => {
        let id = "3";
        let name = "JERSSON";
        let apellido = "ALTAHONA";
        let sexo = "M";
        let state = "1";

        return pool.request().query(`insert into dbo.PERSONA (ID,NAME,APELLIDO,SEXO,ESTADO) VALUES('${id}','${name}','${apellido}','${sexo}','${state}')`)
    }).then( result => {
        let rows  = result;
        console.log( "resultad -->", rows);
        sql.close();
    }).catch( err => {
        console.log("errores --> ", err);
        sql.close();
    });
};

( async function () {
   // await conections();
   //inset();
    await sql.on('error', err => {
        console.log(err)
    })
})();


