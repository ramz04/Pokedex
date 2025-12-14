export async function commandPokedex(state) {
    try {
        console.log("Your Pokedex:");
        for (let pokemonName of Object.keys(state.user)) {
            console.log(`- ${pokemonName}`);
        }
    }
    catch (error) {
        console.error(error);
    }
}
