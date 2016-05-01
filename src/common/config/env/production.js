'use strict';

export default {
  	port: 4350,
  	db:{
		type:'mysql',
		adapter:{
			mysql:"localhost",
			port:"",
			name: 'onebox_query', // database name
			user: 'query',
			pwd: 'password',
			prefix: 'think_',
			encoding: 'utf8'
		}
	}
};