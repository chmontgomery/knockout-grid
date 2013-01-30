/// <reference path="../_testRefs.ts" />
/// <reference path="../../Go/Kg/StringColumn.ts" />
/// <reference path="../../Go/Kg/SelectableItem.ts" />
/// <reference path="../../Go/Kg/Grid.ts" />

module kg.GridSelectionTest {

	class SelectableObject extends go.kg.SelectableItem {
		constructor (public aString: string, public aNum: number, public aBool: bool, public aDate: Date) {
			// chutzpah bug: generates "_super.prototype();" instead of "_super.call(this);"
			super();
		}
	}

	var aGrid;
	var aGridColumns = [
		new go.kg.StringColumn("aString", "")
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

	test("selection single items", function () {
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

		// check third item
		var thridItem = <go.kg.SelectableItem>aGrid.items()[2];
		thridItem.selectClick();
		equal(thridItem.selectState(), go.kg.SelectableStates.SELECTED, "item should be selected now");
		equal(aGrid.selectAllState(), go.kg.SelectableStates.PARTIAL, "select all state should be partial now");

		// check second item
		var secondItem = <go.kg.SelectableItem>aGrid.items()[1];
		secondItem.selectClick();
		equal(secondItem.selectState(), go.kg.SelectableStates.SELECTED, "item should be selected now");
		equal(aGrid.selectAllState(), go.kg.SelectableStates.SELECTED, "select all state should be selected now b/c all items are selected");

		// uncheck second item
		secondItem = <go.kg.SelectableItem>aGrid.items()[1];
		secondItem.selectClick();
		equal(secondItem.selectState(), go.kg.SelectableStates.UNSELECTED, "item should be unselected now");
		equal(aGrid.selectAllState(), go.kg.SelectableStates.PARTIAL, "select all state should be partial now b/c we unselected one");
	});

	test("select/unselect all", function () {
		equal(aGrid.items().length, 3, "grid should have 3 items");
		equal(aGrid.selectAllState(), go.kg.SelectableStates.UNSELECTED, "select all state on grid should start unselected");
		aGrid.selectAllClick();
		equal(aGrid.selectAllState(), go.kg.SelectableStates.SELECTED, "select all state on grid should now be selected");
		aGrid.selectAllClick();
		equal(aGrid.selectAllState(), go.kg.SelectableStates.UNSELECTED, "select all state on grid should now be unselected");
	});

	test("select single item and the click select all", function () {
		equal(aGrid.items().length, 3, "grid should have 3 items");
		equal(aGrid.selectAllState(), go.kg.SelectableStates.UNSELECTED, "select all state on grid should start unselected");
		// check first item
		var firstItem = <go.kg.SelectableItem>aGrid.items()[0];
		firstItem.selectClick();
		equal(firstItem.selectState(), go.kg.SelectableStates.SELECTED, "first item should be selected now");
		equal(aGrid.selectAllState(), go.kg.SelectableStates.PARTIAL, "select all state should be partial now");

		aGrid.selectAllClick();
		equal(firstItem.selectState(), go.kg.SelectableStates.SELECTED, "first item should still be selected");
		equal(aGrid.selectAllState(), go.kg.SelectableStates.SELECTED, "select all state on grid should now be selected");
	});
}