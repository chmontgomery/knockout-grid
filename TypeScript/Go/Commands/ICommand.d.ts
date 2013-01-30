module go.Commands {
	export interface ICommand {
		execute: () => void;
		canExecute: () => bool;
		filterer: () => any[];
	}
}