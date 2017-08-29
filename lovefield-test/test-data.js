
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
	var testRows = [], flipRows = [],testXflip = [];

	//returning a promise
	return  testSchema.connect().then(function(db) {
		testDb = db;
		var test = testDb.getSchema().table('test');
		var flip = testDb.getSchema().table('flip');
		return testDb.select().from(test).innerJoin(flip,flip.id.eq(test.f_id)).where(flip.id.gt(3)).exec();
	}).then(function(results){
		testXflip = results;
		var flip = testDb.getSchema().table('flip');
		return testDb.select().from(flip).where(flip.id.gt(3)).exec();
	}).then(function(results){
		flipRows = results;
		var test = testDb.getSchema().table('test');
		return testDb.select().from(test).where(test.id.gt(3)).exec();
	}).then(function(results){
		testRows = results;
		return new Promise(resolve => { resolve({flip : flipRows,test : testRows, testXflip : testXflip}) });
	});

})(lf);
