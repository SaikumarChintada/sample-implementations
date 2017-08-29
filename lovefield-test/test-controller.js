
//use dependencies

(function(tabUtils,dataFetcher){
	dataFetcher.then(function(results){
		var flip = results.flip;
		var test = results.test;
		
		var formatted = tabUtils.formatJsonToArray(flip);
		var html = tabUtils.createTable('flip',formatted.cols,formatted.rows);
		$('#tables').append(html);

		formatted = tabUtils.formatJsonToArray(test);
		html = tabUtils.createTable('test',formatted.cols,formatted.rows);
		$('#tables').append(html);
	})


})(window.tableUtils,window.dataFetcher)