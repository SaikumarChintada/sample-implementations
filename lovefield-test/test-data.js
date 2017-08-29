
//get tables data from indexedDb using lovefield
//try with async/await

//here a closure is formed but is this desired?
window.dataFetcher = ( function(lf){
	var testSchema = lf.schema.create('testdb', 2);
	var testDb;
	testSchema.createTable('test').
		addColumn('id', lf.Type.INTEGER).
		addColumn('f_id', lf.Type.INTEGER).
		addColumn('name', lf.Type.STRING).
		addColumn('added_on', lf.Type.DATE_TIME).
		addColumn('updated_on', lf.Type.DATE_TIME).
		addPrimaryKey(['id'],true).
		addIndex('idxName',['name'], false, lf.Order.DESC);

	testSchema.createTable('flip').
		addColumn('id', lf.Type.INTEGER).
		addColumn('name', lf.Type.STRING).
		addColumn('added_on', lf.Type.DATE_TIME).
		addColumn('updated_on', lf.Type.DATE_TIME).
		addPrimaryKey(['id'],true).
		addIndex('idxName',['name'], false, lf.Order.DESC);
	var testRows = [], flipRows = [];

	//returning a promise
	return  testSchema.connect().then(function(db) {
		testDb = db;
		var item = testDb.getSchema().table('test');
		return testDb.select().from(item).exec();
	}).then(function(results) {
		testRows = results;
		var item = testDb.getSchema().table('flip');
		return testDb.select().from(item).exec();
	}).then(function(results){
		flipRows = results;
		return new Promise(resolve => { resolve({flip : flipRows,test : testRows}) });
	});

})(lf);
