/// <reference path="../_testRefs.ts" />
/// <reference path="../../Go/Kg/SelectableItem.ts" />
/// <reference path="../../Go/Kg/Grid.ts" />
/// <reference path="../../Go/Kg/DateColumn.ts" />
/// <reference path="../../Go/Kg/ColumnBool.ts" />
/// <reference path="../../Go/Kg/NumberColumn.ts" />
/// <reference path="../../Go/Kg/StringColumn.ts" />

module kg.GridSelectAndSearchTest {

	class SelectableObject extends go.kg.SelectableItem {
		constructor (public aString: string, public aNum: number, public aBool: bool, public aDate: Date) {
			// chutzpah bug: generates "_super.prototype();" instead of "_super.call(this);"
			super();
		}
	}

	var aGrid;
	var aGridColumns = [
		<go.kg.Column>new go.kg.StringColumn("aString", ""),
		<go.kg.Column>new go.kg.NumberColumn("aNum", ""),
		<go.kg.Column>new go.kg.ColumnBool("aBool", ""),
		<go.kg.Column>new go.kg.DateColumn("aDate", "")
	];

	QUnit.testStart(function () {
		var viewHandle = new go.ActiveManagement.ViewHandle(
			[],
			ko.observableArray([
				new SelectableObject("goo", 1, false, new Date(2010, 0, 15)),
				new SelectableObject("foo", 2, true, new Date(2012, 0, 14)),
				new SelectableObject("bar", 3, false, new Date(2010, 1, 14))
			]),
			ko.observable(1),
			function () { }
		);
		aGrid = new go.kg.Grid(
			"aGrid",
			aGridColumns,
			viewHandle,
			"Showing All {0}",
			"Showing {0} of {1} {2}",
			"Item Added",
			"Item Removed",
			"aString",
			true
		);
	});

	QUnit.module("go.kg.Grid");

	test("select some and then search", function () {
		equal(aGrid.items().length, 3, "grid should have 3 items");
		equal(aGrid.selectAllState(), go.kg.SelectableStates.UNSELECTED, "select all state on grid should start unselected");
		$.each(aGrid.items(), function (i, e: go.kg.SelectableItem) {
			equal(e.selectState(), go.kg.SelectableStates.UNSELECTED, "item #" + i + " should start unselected");
		});
		// check first item
		var firstItem = <go.kg.SelectableItem>aGrid.items()[0];
		firstItem.selectClick();
		equal(firstItem.selectState(), go.kg.SelectableStates.SELECTED, "item should be selected now");
		equal(aGrid.selectAllState(), go.kg.SelectableStates.PARTIAL, "select all state should be partial now");

		// do a search
		aGrid.filterChange();
		
		// searching should cause everything to be unchecked
		equal(firstItem.selectState(), go.kg.SelectableStates.UNSELECTED, "item should be selected now");
		equal(aGrid.selectAllState(), go.kg.SelectableStates.UNSELECTED, "select all state should be partial now");
	});
}