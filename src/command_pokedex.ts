import type { State } from "./state";

export async function commandPokedex(state: State): Promise<void> {
    try {
        console.log("Your Pokedex:");
        for (let pokemonName of Object.keys(state.user)) {
            console.log(`- ${pokemonName}`);
        }
    } catch (error) {
        console.error(error);
    }
}
