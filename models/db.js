module.exports = require('mongojs')(
	require('../package.json').db, 
	['user', 'doc', 'revision', 'project', 'projectRecord', 'docRecord', 'issue']
);
