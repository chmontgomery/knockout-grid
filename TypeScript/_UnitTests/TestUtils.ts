/// <reference path="_testRefs.ts" />
module go {
	export class TestUtils {
		static minWait(expression: Function) {
			stop();
			setTimeout(function () {
				start();
				expression();
			}, 1);
		}
	}
}