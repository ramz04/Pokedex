export async function commandMap(state) {
    try {
        const data = await state.PokeAPI.fetchLocations(state.nextLocationsURL);
        for (const location of data.results) {
            console.log(location.name);
        }
        // Store next page URL for the next `map` call
        state.nextLocationsURL = data.next;
    }
    catch (error) {
        console.error("Error fetching locations:", error);
    }
}
