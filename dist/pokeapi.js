import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache;
    constructor(cacheInterval) {
        this.cache = new Cache(cacheInterval);
    }
    closeCache() {
        this.cache.stopReapLoop();
    }
    async fetchLocations(pageURL) {
        const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
        // ✅ Check cache FIRST
        const cached = this.cache.get(url);
        if (cached) {
            console.log("[CACHE HIT] locations:", url);
            return cached;
        }
        console.log("[FETCH] locations:", url);
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
        this.cache.add(url, data);
        return data;
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        // ✅ Cache lookup
        const cached = this.cache.get(url);
        if (cached) {
            console.log("[CACHE HIT] location:", locationName);
            return cached;
        }
        console.log("[FETCH] location:", locationName);
        const response = await fetch(url, {
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
        this.cache.add(url, data);
        return data;
    }
    async fetchPokemon(pokemon) {
        try {
            const url = `${PokeAPI.baseURL}/pokemon/${pokemon}/`;
            const cached = this.cache.get(url);
            if (cached) {
                console.log("[CACHE HIT] pokemon:", pokemon);
                return cached;
            }
            console.log("[FETCH] pokemon", pokemon);
            const response = await fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch pokemon: ${response.status}`);
            }
            const data = (await response.json());
            this.cache.add(url, data);
            return data;
        }
        catch (e) {
            throw new Error(`Error fetching pokemon '${pokemon}': ${e.message}`);
        }
    }
}
