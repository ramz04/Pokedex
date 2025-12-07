import { exit } from "node:process";
import type { State } from "./state.js";

export async function commandExit(state: State) {
    console.log("Closing the Pokedex... Goodbye!");
    state.rl.close(); // close readline
    exit(0); // exit process
}
