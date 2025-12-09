export async function commandCatch(state, pokemon) {
    if (!pokemon) {
        console.log("Usage: catch <pokemon>");
    }
    try {
        const data = await state.PokeAPI.fetchPokemon(pokemon);
        console.log(`Throwing a Pokeball at ${data.name}...`);
        const probability = Math.exp(-data.base_experience / 250);
        if (Math.random() < probability) {
            console.log(`${data.name} was caught!`);
            state.user[data.name] = data;
            // console.log(state.user[data.name]);
        }
        else {
            console.log(`${data.name} escaped!`);
        }
    }
    catch (error) {
        console.error(error);
    }
}
