/// <reference path="../_testRefs.ts" />
/// <reference path="../../Go/Kg/GridItem.ts" />
/// <reference path="../../Go/Kg/DateColumn.ts" />
/// <reference path="../../Go/Kg/ColumnBool.ts" />
/// <reference path="../../Go/Kg/NumberColumn.ts" />
/// <reference path="../../Go/Kg/StringColumn.ts" />
/// <reference path="../../Go/Kg/Column.ts" />
/// <reference path="../../Go/Kg/Grid.ts" />

var currentTestExportFileType;
var Substitute = Substitute || {};
Substitute.ForJQueryAjax = function (config: any) {
	
	ok(config.data, "");
	equal(config.data.type, currentTestExportFileType, "export file type should be " + currentTestExportFileType);
	
	ok(config.data.items, "");
	ok(config.data.items.length > 0, "items json should contain something");
	ok(config.data.items.indexOf("aString") === -1, "items json should not contain aString");
	ok(config.data.items.indexOf("foo") === -1, "items json should not contain foo");
	ok(config.data.items.indexOf("aNum") === -1, "items json should not contain aNum");
	ok(config.data.items.indexOf("996") === -1, "items json should not contain 996");
	ok(config.data.items.indexOf("aBool") !== -1, "items json should contain aBool");
	ok(config.data.items.indexOf("true") !== -1, "items json should contain true");
	ok(config.data.items.indexOf("aDate") !== -1, "items json should contain aDate");
	ok(config.data.items.indexOf("2012") !== -1, "items json should contain 2012");

	ok(config.data.settings, "");
	ok(config.data.settings.length > 0, "settings json should contain something");
	ok(config.data.settings.indexOf("fileName") !== -1, "settings json should contain fileName");
	ok(config.data.settings.indexOf("enabled") === -1, "settings json should not contain enabled");
	ok(config.data.settings.indexOf("columns") !== -1, "settings json should contain columns");
	ok(config.data.settings.indexOf("aString") === -1, "settings json should not contain aString");
	ok(config.data.settings.indexOf("aNum") === -1, "settings json should not contain aNum");
	ok(config.data.settings.indexOf("aBool") !== -1, "settings json should contain aBool");
	ok(config.data.settings.indexOf("aDate") !== -1, "settings json should contain aDate");
};

module kg.GridExportTest {

	class ExportableObject extends go.kg.GridItem {
		constructor (public id: number,
			public aString: string,
			public aNum: number,
			public aBool: bool,
			public aDate: Date) {
			super();
		}

		toJSON(): any {
			delete this.aString;
			delete this.aNum;
			return this;
		}
	}
	
	$.ajax = Substitute.ForJQueryAjax;

	var aGrid;
	var aGridColumns = [
		<go.kg.Column>new go.kg.StringColumn("aString", "", "", true, false),
		<go.kg.Column>new go.kg.NumberColumn("aNum", "", "", true, false),
		<go.kg.Column>new go.kg.ColumnBool("aBool", "", "", true, true),
		<go.kg.Column>new go.kg.DateColumn("aDate", "", "", true, true)
	];

	QUnit.testStart(function () {
		var viewHandle = new go.ActiveManagement.ViewHandle(
			[],
			ko.observableArray([
				new ExportableObject(0, "foo", 994, false, new Date(2012, 11, 12)),
				new ExportableObject(1, "foo bar", 995, true, new Date(2012, 11, 12)),
				new ExportableObject(2, "bar", 996, false, new Date(2012, 11, 12))
			]),
			ko.observable(1),
			function () { }
		);
		aGrid = new go.kg.Grid(
			"aGrid",
			aGridColumns,
			viewHandle,
			"Showing <span class='results-count'>All</span> Items",
			"Showing <span class='results-count'>{0} of {1}</span> Items",
			"Item Added",
			"Item Removed",
			"aString"
		);
	});

	QUnit.module("go.kg.Grid");

	test("export stringifys columns and items correctly", () => {
		currentTestExportFileType = "pdf";
		aGrid.exportAsPDF();
	});

}