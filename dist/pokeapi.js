export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch locations: ${response.status}`);
        }
        const data = (await response.json());
        return data;
    }
    async fetchLocation(locationName) {
        const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch location: ${response.status}`);
        }
        const data = (await response.json());
        return data;
    }
}
