const dotenv = require('dotenv');

dotenv.config();

const {
    PORT,
    SQL_USER,
    SQL_PASSWORD,
    SQL_DATABASE,
    SQL_SERVER,
    SQL_ENCRYPT
} = process.env;

const sqlEncrypt = SQL_ENCRYPT === "true";

module.exports = {
	port: PORT,
	sqlConfig: {
		server: SQL_SERVER,
		database: SQL_DATABASE,
		user: SQL_USER,
		password: SQL_PASSWORD,
		options: {
			encrypt: sqlEncrypt,
			enableArithAbort: true
		}
	}
};