import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    try {
        const data = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

        for (const location of data.results) {
            console.log(location.name);
        }

        // Store next page URL for the next `map` call
        state.nextLocationsURL = data.next;

    } catch (error) {
        console.error("Error fetching locations:", error);
    }
}
