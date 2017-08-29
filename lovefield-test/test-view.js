
//table view generator
window.tableUtils = (function(){
	var createTableHeader = function(cols){
		var header = '<tr>';
		for (var i = 0; i < cols.length; i++) {
			header += '<td>' + cols[i] + '</td>';
		}
		header += '</tr>';
		return header;
	}
	var createTableBody = function(records){
		var body = '';
		for (var i = 0; i < records.length; i++) {
			body += '<tr>';
			var record = records[i];
			for (var j =0; j< record.length; j++) {
				body += '<td>' + record[j] + '</td>';
			}
			body += '</tr>';
		}
		return body;
	}
	var createTable = function(id,col,records){
		var headerStr = createTableHeader(col);
		var bodyStr = createTableBody(records);
		var table =  '<table id="'+id+'" class="table table-striped"> <thead>' + headerStr +'</thead> <tbody>'+ bodyStr + '</tbody></table>';
		return '<div class="'+id+'" class=""><h4>'+id+' table</h4>' + table + '</div>';
	};

	var formatJsonToArray = function(records){
		var record = records[0];
		var cols = [],rows = [];
		for(var col in record){
			cols.push(col);
		}
		for (var i = 0; i < records.length; i++) {
			var record = records[i];
			var eachRow = [];
			for(var col in record){
				eachRow.push(record[col]);
			}
			rows.push(eachRow);
		}
		return {
			rows : rows,
			cols : cols
		}
	};
	var formatJsonToJoinArray = function(records){
		var record = records[0];
		var cols = [],rows = [];

		for(var type in record){
			for(var col in record[type]){
				cols.push(type +'.'+ col);
			}
		}

		for (var i = 0; i < records.length; i++) {
			var record = records[i];
			var eachRow = [];
			for(var type in record){
				for(var col in record[type]){
					eachRow.push(record[type][col]);
				}
			}
			rows.push(eachRow);
		}
		return {
			rows : rows,
			cols : cols
		}
	};
	var formatJsonToArray = function(records){
		var record = records[0];
		var cols = [],rows = [];
		for(var col in record){
			cols.push(col);
		}
		for (var i = 0; i < records.length; i++) {
			var record = records[i];
			var eachRow = [];
			for(var col in record){
				eachRow.push(record[col]);
			}
			rows.push(eachRow);
		}
		return {
			rows : rows,
			cols : cols
		}
	};
	return {
		createTable : createTable,
		formatJsonToArray : formatJsonToArray,
		formatJsonToJoinArray : formatJsonToJoinArray
	}
})();

//test
// console.log(tableUtils);
// var records = [{id: 1,name: 'sai'},{id:2,name:'kumar'}];

// var formatedRecords = tableUtils.formatJsonToArray(records);
// console.log(formatedRecords);
// var tableHtml = tableUtils.createTable('myname',formatedRecords.cols,formatedRecords.rows);
// console.log(tableHtml);