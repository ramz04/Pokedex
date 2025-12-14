import type { State } from "./state.js";

export async function commandCatch(
    state: State,
    ...args: string[]
): Promise<void> {
    if (args.length === 0) {
        console.log("Usage: catch <pokemon>");
    }

    try {
        const name = args[0];
        const data = await state.pokeAPI.fetchPokemon(name);

        console.log(`Throwing a Pokeball at ${data.name}...`);

        const res = Math.floor(Math.random() * data.base_experience);
        if (res > 40) {
            console.log(`${data.name} escaped!`);
            return;
        }

        console.log(`${data.name} was caught!`);
        console.log("You may now inspect it with the inspect command.");
        state.user[data.name] = data;
    } catch (error) {
        console.error(error);
    }
}
