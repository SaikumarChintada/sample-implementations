
//use dependencies

(function(tabUtils,dataFetcher){
	var displayTables = function(name,records){
		var formatted = tabUtils.formatJsonToArray(records);
		var html = tabUtils.createTable(name,formatted.cols,formatted.rows);
		$('#tables').append(html);
	}
	var displayTablesJoin = function(name,records){
		var formatted = tabUtils.formatJsonToJoinArray(records);
		var html = tabUtils.createTable(name,formatted.cols,formatted.rows);
		$('#tables').append(html);
	}
	dataFetcher.then(function(results){
		var flip = results.flip;
		var test = results.test;
		var testXflip = results.testXflip;
		
		displayTables('flip',flip);
		displayTables('test',test);
		displayTablesJoin('flip-test',testXflip);

	})


})(window.tableUtils,window.dataFetcher)