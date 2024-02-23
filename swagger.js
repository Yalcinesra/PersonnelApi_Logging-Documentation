"use strict"

const swaggerAutogen = require('swagger-autogen');
const packageJson = require('./package.json');
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
require('dotenv').config()
const PORT = process.env?.PORT || 8000
const HOST = process.env?.HOST || '127.0.0.1'
//npm i swagger-autogen
const document={
    // info: {
	// 	version: "1.0.0",
	// 	title: "Personnel API",
	// 	description: "Personnel Management API Service",
	// 	termsOfService: "http://www.clarusway.com",
	// 	contact: { name: "Clarusway", email: "qadir@clarusway.com" },
	// 	license: { name: "BSD License", },
	// },
    info: {
		version: packageJson.version,
		title: packageJson.title,
		description:packageJson.description,
		termsOfService: "http://www.clarusway.com",
		contact: { name: "Clarusway", email: "qadir@clarusway.com" },
		license: { name: "BSD License", },
	},
    host: `${HOST}:${PORT}`, //! arada bpşluk olmasın
    basePath: '/',
	schemes: ['http', 'https'],
	// JWT Settings:
    /*
	securityDefinitions: {
		JWT: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'Entry Your AccessToken (JWT) for Login. Example: <b>Bearer <i>...token...<i></b>'
		}
	},
	security: [{ "JWT": true }],
    */
   definition:{
        // "Department":{
        //     "name":"ObjectId",
        //     require: true

        // }
        "Department": require('./src/models/department.model').schema.obj,
		"Personnel": require('./src/models/personnel.model').schema.obj,


   }

};
const routes=['./index.js']
const outputfile='swagger.json'


// create json file 
swaggerAutogen(outputfile,routes,document)
// node swagger.js

