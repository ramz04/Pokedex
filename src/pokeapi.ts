import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache = new Cache(60_000);

    constructor() {}

    async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
        const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;

        // ✅ Check cache FIRST
        const cached = this.cache.get<ShallowLocations>(url);
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

        const data = (await response.json()) as ShallowLocations;

        this.cache.add(url, data);

        return data;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        // ✅ Cache lookup
        const cached = this.cache.get<Location>(url);
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

        const data = (await response.json()) as Location;

        this.cache.add(url, data);

        return data;
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: {
        encounter_method: { name: string; url: string };
        version_details: {
            rate: number;
            version: { name: string; url: string };
        }[];
    }[];
    location: { name: string; url: string };
    names: { name: string; language: { name: string; url: string } }[];
    pokemon_encounters: {
        pokemon: { name: string; url: string };
        version_details: {
            version: { name: string; url: string };
            max_chance: number;
            encounter_details: {
                min_level: number;
                max_level: number;
                condition_values: any[];
                chance: number;
                method: {
                    name: string;
                    url: string;
                };
            }[];
        }[];
    }[];
};
