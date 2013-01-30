/// <reference path="../_testRefs.ts" />
///<reference path='../../Go/ActiveManagement/ViewHandle.ts'/>

module go.ActiveManagement {

	QUnit.module("go.ActiveManagement");

    QUnit.test("ViewHandle.release (and subsequent calls)", () => {
        var callCount = 0;
        var handle = new ViewHandle(["property1"], ko.observableArray(), ko.observable(""), () => callCount++);
        handle.release();

        handle.release();

        QUnit.equal(callCount, 1, "calls passed in callback exactly once");
    });
}
