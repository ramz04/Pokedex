import { createInterface, type Interface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { PokeAPI, PokemonType } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type PokemonName = {
    name: string;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    PokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    user: Record<string, PokemonName>;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const pokeAPI = new PokeAPI();

    const user: Record<string, PokemonName> = {};

    const commands: Record<string, CLICommand> = {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays help information",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays 20 map locations of the pokedex",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 locations",
            callback: commandMapB,
        },
        explore: {
            name: "explore",
            description: "Explore a new location",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Catch a pokemon",
            callback: commandCatch,
        },
    };

    return {
        rl,
        commands,
        PokeAPI: pokeAPI,
        nextLocationsURL: null,
        prevLocationsURL: null,
        user,
    };
}
