/// <reference path="../../_testRefs.ts" />
/// <reference path="../../../Go/Virtualization/VirtualMachine/OSFactory.ts" />
/// <reference path="../../../Go/Virtualization/VirtualMachine/OS.ts" />

module go.OSFactoryTest {

	var LinuxTooltip = "Linux";
	var MacOSTooltip = "Mac OS";
	var UnixTooltip = "Unix";

	QUnit.module("go.OS");	
		
	test("Windows", () =>
	{
		var cssWindows = "windows";

		var os1 = "Microsoft Windows 7 (32-bit)";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssWindows, osImage1.cssClass, "");

		var os2 = "Microsoft Windows Server 2003, Enterprise Edition (64-bit)";
		var osImage2 = go.OSFactory.get(os2);
		equal(cssWindows, osImage2.cssClass, "");

		var os3 = "Microsoft Windows XP Professional (64-bit)";
		var osImage3 = go.OSFactory.get(os3);
		equal(cssWindows, osImage3.cssClass, "");
	});

	test("Linux", () =>
	{
		var cssClass = "linux";

		var os1 = "Other 2.6x Linux (64-bit)";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");
	});
		
	test("RedHat", () =>
	{
		var cssClass = "redhat";

		var os1 = "Red Hat Enterprise Linux 3 (32-bit)";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");


		var os2 = "Red Hat Enterprise Linux 4 (64-bit)";
		var osImage2 = go.OSFactory.get(os2);
		equal(cssClass, osImage2.cssClass, "");

	});

	test("Debian", () =>
	{
		var cssClass = "debian";

		var os1 = "Debian GNU/Linux 5 (32-bit)";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");

		var os2 = "Debian 6.0.5";
		var osImage2 = go.OSFactory.get(os2);
		equal(cssClass, osImage2.cssClass, "");
	});

	test("CentOS", () =>
	{
		var cssClass = "centos";

		var os1 = "CentOS 4/5 (64-bit)";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");
	});

	test("FreeBSD", () =>
	{
		var cssClass = "freebsd";

		var os1 = "FreeBSD (32-bit)";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");

		var os2 = "FreeBSD (64-bit)";
		var osImage2 = go.OSFactory.get(os2);
		equal(cssClass, osImage2.cssClass, "");

		var os3 = "FreeBSD 8.0-RELEASE";
		var osImage3 = go.OSFactory.get(os3);
		equal(cssClass, osImage3.cssClass, "");
	});

	test("MacOs", () =>
	{
		var cssClass = "macos";

		var os1 = "Apple Mac OS X 10.5 - 10.6.3 (Leopard - Snow Leopard)";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");

		var os2 = "Apple Mac OS X 10.6 (64-bit)";
		var osImage2 = go.OSFactory.get(os2);
		equal(cssClass, osImage2.cssClass, "");

		var os3 = "Apple Mac OS X 10.4.10 (Tiger) (Darwin 8.10.0, PowerPC)";
		var osImage3 = go.OSFactory.get(os3);
		equal(cssClass, osImage3.cssClass, "");
	});

	test("OpenBSD", () =>
	{
		var cssClass = "openbsd";

		var os1 = "OpenBSD";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");
	});

	test("Solaris", () =>
	{
		var cssClass = "solaris";

		var os1 = "Sun Solaris 9";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");
	});

	test("Suse", () =>
	{
		var cssClass = "suse";

		var os1 = "Suse Linux Enterprise 10 (64-bit)";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");
	});

	test("Novell", () =>
	{
		var cssClass = "novell";

		var os1 = "Novell NetWare 6.x";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");

		var os2 = "Open Enterprise Server";
		var osImage2 = go.OSFactory.get(os2);
		equal(cssClass, osImage2.cssClass, "");
	});

	test("Ubuntu", () =>
	{
		var cssClass = "ubuntu";

		var os1 = "Ubuntu Linux (32-bit)";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");

		var os2 = "Ubuntu Linux (64-bit)";
		var osImage2 = go.OSFactory.get(os2);
		equal(cssClass, osImage2.cssClass, "");
	});

	test("Darwin", () =>
	{
		var cssClass = "darwin";

		var os1 = "Darwin (32-bit) (unsupported)";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");
	});

	test("Dos", () =>
	{
		var cssClass = "ms-dos";

		var os1 = "DOS";
		var osImage1 = go.OSFactory.get(os1);
		equal(cssClass, osImage1.cssClass, "");
	});

	test("Other", () =>
	{
		var cssDefault = "virtualmachine";

		var os3 = "my cool new os";
		var osImage3 = go.OSFactory.get(os3);
		equal(cssDefault, osImage3.cssClass, "");

		var os4 = "Other Operating System";
		var osImage4 = go.OSFactory.get(os4);
		equal(cssDefault, osImage4.cssClass, "");
	});
}