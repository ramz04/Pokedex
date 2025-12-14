import { exit } from "node:process";
export async function commandExit(state) {
    console.log("Closing the Pokedex... Goodbye!");
    state.readline.close(); // close readline
    exit(0); // exit process
}
