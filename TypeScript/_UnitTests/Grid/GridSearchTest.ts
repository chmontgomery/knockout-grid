/// <reference path="../_testRefs.ts" />
/// <reference path="../../Go/Kg/Column.ts" />
/// <reference path="../../Go/Kg/ColumnBool.ts" />
/// <reference path="../../Go/Kg/NumberColumn.ts" />
/// <reference path="../../Go/Kg/DateColumn.ts" />
/// <reference path="../../Go/Kg/StringColumn.ts" />
/// <reference path="../../Go/Kg/Grid.ts" />

module kg.GridSearchTest {

	class SortableObject {
		constructor (public id: number,
			public aString: string,
			public aNum: number,
			public aBool: bool,
			public aDate: Date) { }
	}

	var aGrid;
	var aGridColumns = [
		<go.kg.Column>new go.kg.StringColumn("aString", ""),
		<go.kg.Column>new go.kg.NumberColumn("aNum", ""),
		<go.kg.Column>new go.kg.ColumnBool("aBool", ""),
		<go.kg.Column>new go.kg.DateColumn("aDate", "")
	];

	var itemCountMessageAll = "Showing <span class='results-count'>All</span> Items";
	var itemCountMessagePartial = "Showing <span class='results-count'>{0} of {1}</span> Items";
	var itemAddedToastTitle = "Item Added";
	var itemRemovedToastTitle = "Item Removed";
	var itemFieldForToastBody = "aString";

	QUnit.testStart(function () {
		var viewHandle = new go.ActiveManagement.ViewHandle(
			[],
			ko.observableArray([
				new SortableObject(0, "foo", 994, false, new Date(2012, 12, 12, 12, 12, 12, 12)),
				new SortableObject(1, "foo bar", 995, true, new Date(2012, 12, 12, 12, 12, 12, 12)),
				new SortableObject(2, "bar", 996, false, new Date(2012, 12, 12, 12, 12, 12, 12))
			]),
			ko.observable(1),
			function () { }
		);
		aGrid = new go.kg.Grid(
			"aGrid",
			aGridColumns,
			viewHandle,
			itemCountMessageAll,
			itemCountMessagePartial,
			itemAddedToastTitle,
			itemRemovedToastTitle,
			itemFieldForToastBody
		);
	});

	QUnit.module("go.kg.Grid");

	test("simple string search", function () {
		equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
		aGrid.filter("foo");
		go.TestUtils.minWait(function () {
			equal(aGrid.filteredItems().length, 2, "grid should only show 2 items");
			equal(aGrid.filteredItems()[0].id, 0, "item 0 should be first item in filtered list");
			equal(aGrid.filteredItems()[1].id, 1, "item 1 should be second item in filtered list");
			aGrid.filter("");
			go.TestUtils.minWait(function () {
				equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
			});
		});
	});

	test("search for a number data type", function () {
		equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
		aGrid.filter("995");
		go.TestUtils.minWait(function () {
			equal(aGrid.filteredItems().length, 1, "grid should only show 1 items");
			equal(aGrid.filteredItems()[0].id, 1, "item 1 should be first item in filtered list");
			aGrid.filter("");
			go.TestUtils.minWait(function () {
				equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
			});
		});
	});

	test("2 string combo search. only one row has both search terms", function () {
		equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
		aGrid.filter("foo bar"); // logical AND
		go.TestUtils.minWait(function () {
			equal(aGrid.filteredItems().length, 1, "grid should only show 1 items");
			equal(aGrid.filteredItems()[0].id, 1, "item 1 should be first item in filtered list");
			aGrid.filter("");
			go.TestUtils.minWait(function () {
				equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
			});
		});
	});

	test("2 string combo search across columns. only one row has both search terms", function () {
		equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
		aGrid.filter("foo 994"); // logical AND
		go.TestUtils.minWait(function () {
			equal(aGrid.filteredItems().length, 1, "grid should only show 1 items");
			equal(aGrid.filteredItems()[0].id, 0, "item 0 should be first item in filtered list");
			aGrid.filter("");
			go.TestUtils.minWait(function () {
				equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
			});
		});
	});

	test("2 string combo search across columns. no row has both.", function () {
		equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
		aGrid.filter("foo 996"); // logical AND
		go.TestUtils.minWait(function () {
			equal(aGrid.filteredItems().length, 0, "grid should show 0 items");
			aGrid.filter("");
			go.TestUtils.minWait(function () {
				equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
			});
		});
	});

	test("search is case insensitive", function () {
		equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
		aGrid.filter("FOO"); // case insensitive search
		go.TestUtils.minWait(function () {
			equal(aGrid.filteredItems().length, 2, "grid should show 2 items");
			aGrid.filter("");
			go.TestUtils.minWait(function () {
				equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
			});
		});
	});

	test("search is case insensitive. fields are lowercased for searching", function () {
		// all field values are lowercased for searching
		aGrid.items.push(new SortableObject(3, "FOO", 997, false, new Date(2012, 12, 12, 12, 12, 12, 12)));
		aGrid.items.push(new SortableObject(4, "FoO", 998, false, new Date(2012, 12, 12, 12, 12, 12, 12)));
		equal(aGrid.filteredItems().length, 5, "grid should start showing all 5 items");
		aGrid.filter("foo");
		go.TestUtils.minWait(function () {
			equal(aGrid.filteredItems().length, 4, "grid should show 4 items");
			aGrid.filter("");
			go.TestUtils.minWait(function () {
				equal(aGrid.filteredItems().length, 5, "grid should have all 5 items again");
			});
		});
	});

	test("show correct item count message", function () {
		equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
		equal(aGrid.countText(), itemCountMessageAll, "should be showing all count message");
		aGrid.filter("foo");
		go.TestUtils.minWait(function () {
			equal(aGrid.filteredItems().length, 2, "grid should only show 2 items");
			equal(aGrid.filteredItems()[0].id, 0, "item 0 should be first item in filtered list");
			equal(aGrid.filteredItems()[1].id, 1, "item 1 should be second item in filtered list");
			equal(aGrid.countText(), itemCountMessagePartial.format(2, 3), "should be showing partial count message");
			aGrid.filter("");
			go.TestUtils.minWait(function () {
				equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
				equal(aGrid.countText(), itemCountMessageAll, "should be showing all count message");
			});
		});

	});
}