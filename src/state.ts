import type { PokemonType } from "./pokeapi.js";

import { PokeAPI } from "./pokeapi.js";
import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./command.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    user: Record<string, PokemonType>;
};

export function initState(cacheInterval: number): State {
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
