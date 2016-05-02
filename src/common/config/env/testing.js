'use strict';

export default {
  	port: 4350,
  	db:{
		type:'mysql',
		adapter:{
			mysql:"localhost",
			port:"",
			name: 'test', // database name
			user: 'root',
			pwd: 'ivan',
			prefix: 'think_',
			encoding: 'utf8'
		}
	}
};