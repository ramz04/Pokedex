import type { State } from "./state.js";

export async function commandHelp(state: State) {
    const { commands } = state;

    console.log("Welcome to the Pokedex!\n");
    console.log("Usage:");

    for (const command of Object.values(commands)) {
        console.log(`${command.name.padEnd(10)}: ${command.description}`);
    }
}
