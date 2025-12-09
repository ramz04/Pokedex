export async function commandExplore(state, location) {
    if (!location) {
        console.log("Usage: explore <location>");
        return;
    }
    try {
        const data = await state.PokeAPI.fetchLocation(location);
        for (const pokemon of data.pokemon_encounters) {
            console.log(pokemon.pokemon.name);
        }
    }
    catch (error) {
        console.error(error);
    }
}
