import type { State } from "./state.js";

export async function commandMapB(state: State): Promise<void> {
    try {
        const data = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

        for (const location of data.results) {
            console.log(location.name);
        }

        // Store next page URL for the next `map` call
        state.prevLocationsURL = data.previous;
    } catch (error) {
        console.error("Error fetching locations:", error);
    }
}
