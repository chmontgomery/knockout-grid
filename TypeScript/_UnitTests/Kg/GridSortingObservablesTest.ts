/// <reference path="../_testRefs.ts" />
/// <reference path="../../Go/Kg/Column.ts" />
/// <reference path="../../Go/Kg/ColumnBool.ts" />
/// <reference path="../../Go/Kg/NumberColumn.ts" />
/// <reference path="../../Go/Kg/DateColumn.ts" />
/// <reference path="../../Go/Kg/StringColumn.ts" />
/// <reference path="../../Go/Kg/Grid.ts" />

module kg.GridSortingObservablesTest {
	class SortableObjectWithObservables {

		aString: KnockoutObservableString;
		aNum: KnockoutObservableNumber;
		aBool: KnockoutObservableBool;
		aDate: KnockoutObservableDate;

		constructor (aString: string, aNum: number, aBool: bool, aDate: Date) {
			this.aString = ko.observable(aString);
			this.aNum = ko.observable(aNum);
			this.aBool = ko.observable(aBool);
			this.aDate = ko.observable(aDate);
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
				new SortableObjectWithObservables("goo", 171, false, new Date(2010, 0, 15)),
			new SortableObjectWithObservables("foo", 7, true, new Date(2012, 0, 14)),
			new SortableObjectWithObservables("bar", 8, false, new Date(2010, 1, 14)),
			new SortableObjectWithObservables("Fooa", 25, true, new Date(2011, 0, 14)),
			new SortableObjectWithObservables("Bara", 41, false, new Date(2010, 0, 14))
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
			"aString"
		);
	});

	QUnit.module("go.kg.Grid");

	test("basic string sorting using ko observables", function () {
		equal(aGrid.items().length, 5, "grid should have 5 items");
		var ascSortResult = ["bar", "Bara", "foo", "Fooa", "goo"];
		aGrid.sortASC(aGridColumns[0]);
		for (var i = 0; i < ascSortResult.length; i++) {
			equal(aGrid.items()[i].aString(), ascSortResult[i], "item in sorted array should be " + ascSortResult[i]);
		}
		equal(aGrid.lastSortOrder(), "asc", "items should be sorted asc");
		var descSortResult = ["goo", "Fooa", "foo", "Bara", "bar"];
		aGrid.sortDESC(aGridColumns[0]);
		for (var i = 0; i < descSortResult.length; i++) {
			equal(aGrid.items()[i].aString(), descSortResult[i], "item in sorted array should be " + descSortResult[i]);
		}
		equal(aGrid.lastSortOrder(), "desc", "items should be sorted asc");
	});

	test("basic number sorting using ko observables", function () {
		equal(aGrid.items().length, 5, "grid should have 5 items");
		var ascSortResult = ["foo", "bar", "Fooa", "Bara", "goo"];
		aGrid.sortASC(aGridColumns[1]);
		for (var i = 0; i < ascSortResult.length; i++) {
			equal(aGrid.items()[i].aString(), ascSortResult[i], "item in sorted array should be " + ascSortResult[i]);
		}
		equal(aGrid.lastSortOrder(), "asc", "items should be sorted asc");
		var descSortResult = ["goo", "Bara", "Fooa", "bar", "foo"];
		aGrid.sortDESC(aGridColumns[1]);
		for (var i = 0; i < descSortResult.length; i++) {
			equal(aGrid.items()[i].aString(), descSortResult[i], "item in sorted array should be " + descSortResult[i]);
		}
		equal(aGrid.lastSortOrder(), "desc", "items should be sorted asc");
	});

	test("basic bool sorting using ko observables", function () {
		equal(aGrid.items().length, 5, "grid should have 5 items");
		var ascSortResult = [true, true, false, false, false];
		aGrid.sortASC(aGridColumns[2]);
		for (var i = 0; i < ascSortResult.length; i++) {
			equal(aGrid.items()[i].aBool(), ascSortResult[i], "item in sorted array should be " + ascSortResult[i]);
		}
		equal(aGrid.lastSortOrder(), "asc", "items should be sorted asc");
		var descSortResult = [false, false, false, true, true];
		aGrid.sortDESC(aGridColumns[2]);
		for (var i = 0; i < descSortResult.length; i++) {
			equal(aGrid.items()[i].aBool(), descSortResult[i], "item in sorted array should be " + descSortResult[i]);
		}
		equal(aGrid.lastSortOrder(), "desc", "items should be sorted asc");
	});

	test("basic date sorting using ko observables", function () {
		equal(aGrid.items().length, 5, "grid should have 5 items");
		var ascSortResult = ["Bara", "goo", "bar", "Fooa", "foo"];
		aGrid.sortASC(aGridColumns[3]);
		for (var i = 0; i < ascSortResult.length; i++) {
			equal(aGrid.items()[i].aString(), ascSortResult[i], "item in sorted array should be " + ascSortResult[i]);
		}
		equal(aGrid.lastSortOrder(), "asc", "items should be sorted asc");
		var descSortResult = ["foo", "Fooa", "bar", "goo", "Bara"];
		aGrid.sortDESC(aGridColumns[3]);
		for (var i = 0; i < descSortResult.length; i++) {
			equal(aGrid.items()[i].aString(), descSortResult[i], "item in sorted array should be " + descSortResult[i]);
		}
		equal(aGrid.lastSortOrder(), "desc", "items should be sorted asc");
	});
}