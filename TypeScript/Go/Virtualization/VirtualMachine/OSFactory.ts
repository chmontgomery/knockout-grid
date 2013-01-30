/// <reference path="OS.ts" />
module go {
	export class OSFactory {
		static Map = [
			new go.OS("DOS", "ms-dos"),
			new go.OS("Windows", "windows"),
			new go.OS("Mac OS", "macos"),
			new go.OS("Red Hat", "redhat"),
			new go.OS("Solaris", "solaris"),
			new go.OS("FreeBSD", "freebsd"),
			new go.OS("CentOS", "centos"),
			new go.OS("Ubuntu", "ubuntu"),
			new go.OS("Debian", "debian"),
			new go.OS("OpenBSD", "openbsd"),
			new go.OS("Novell", "novell"),
			new go.OS("Open Enterprise Server", "novell"),
			new go.OS("Suse", "suse"), // needs to come after novell
			new go.OS("Darwin", "darwin"), // needs to come after Mac OS
			new go.OS("Linux", "linux"), // should be last of all linux
			new go.OS("", "virtualmachine") // should come last
		];

		static get(osString: string): go.OS {
		    osString = osString || "";
			for (var i = 0; i < go.OSFactory.Map.length; i++) {
				if (osString.toLowerCase().indexOf(go.OSFactory.Map[i].pattern.toLowerCase()) > -1) {
					return go.OSFactory.Map[i];
				}
			}
		}
	}
}