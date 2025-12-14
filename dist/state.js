import { PokeAPI } from "./pokeapi.js";
import { createInterface } from "node:readline";
import { getCommands } from "./command.js";
export function initState(cacheInterval) {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });
    return {
        readline: rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI(cacheInterval),
        nextLocationsURL: null,
        prevLocationsURL: null,
        user: {},
    };
}
