/// <reference path="../_testRefs.ts" />
/// <reference path="../../Go/Kg/Column.ts" />
/// <reference path="../../Go/Shared/IllegalArgumentError.ts" />
/// <reference path="../../Go/Kg/Grid.ts" />

module kg.GridTest {

	QUnit.module("go.kg.Grid");

	test("creating instance of kg.Grid with no config throws error", function () {
		QUnit.throws(
			function () {
				var grid = new go.kg.Grid();
			},
			go.IllegalArgumentError,
			"creating instance of kg.Grid should throw a go.IllegalArgumentError"
		);
	});

	test("creating instance of kg.Grid with no id throws error", function () {
		QUnit.throws(
			function () {
				var grid = new go.kg.Grid("");
			},
			go.IllegalArgumentError,
			"creating instance of kg.Grid should throw a go.IllegalArgumentError"
		);
	});

	test("creating instance of kg.Grid with no columns throws error", function () {
		QUnit.throws(
			function () {
				var grid = new go.kg.Grid(null, []);
			},
			go.IllegalArgumentError,
			"creating instance of kg.Grid should throw a go.IllegalArgumentError"
		);
	});

	test("initializing grid should work", () => {
		var aGrid = new go.kg.Grid(
			"aGrid",
			[
				new go.kg.Column("name", "")
			],
			new go.ActiveManagement.ViewHandle(
				[],
				ko.observableArray([
				]),
				ko.observable(1),
				function () { }
			)
		);

		equal(aGrid.columns().length, 1, "grid should have 1 columns");
		equal(aGrid.items().length, 0, "grid should have 0 items");
		ok(!aGrid.selectable, "by default grid should not be selectable");
		ok(!aGrid.exportSettings.enabled, "by default grid should not be exportable");
		equal(go.kg.GridManager.get("aGrid"), aGrid, "grid should have been register in grid manager");
	});

	test("add new item to grid", () => {
		var a2Grid = new go.kg.Grid(
			"a2Grid",
			[
				new go.kg.Column("name", "")
			],
			new go.ActiveManagement.ViewHandle(
				[],
				ko.observableArray([
				]),
				ko.observable(1),
				function () { }
			)
		);

		equal(a2Grid.items().length, 0, "grid should have 0 items");
		equal(a2Grid.filteredItems().length, 0, "grid should have 0 filtered items");

		a2Grid.items.push({ id: "one" });

		equal(a2Grid.items().length, 1, "grid should have 1 items");
		equal(a2Grid.filteredItems().length, 1, "grid should have 1 filtered items");
	});
}