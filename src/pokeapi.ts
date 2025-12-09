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

    async fetchPokemon(pokemon: string): Promise<PokemonType> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemon}/`;

        const cached = this.cache.get<PokemonType>(url);
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

        const data = (await response.json()) as PokemonType;

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

export type PokemonType = {
  abilities: {
      ability: { name: string; url: string }
      is_hidden: boolean
      slot: number
    }[]
    base_experience: number
    cries: { latest: string; legacy: string }
    forms: { name: string; url: string }[]
    game_indices: {
      game_index: number
      version: { name: string; url: string }
    }[]
    height: number
    held_items: {
      item: { name: string; url: string }
      version_details: {
        rarity: number
        version: { name: string; url: string }
      }[]
    }[]
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: {
      move: { name: string; url: string }
      version_group_details: {
        level_learned_at: number
        move_learn_method: { name: string; url: string }
        order: any
        version_group: { name: string; url: string }
      }[]
    }[]
    name: string
    order: number
    past_abilities: {
      abilities: {
        ability: any
        is_hidden: boolean
        slot: number
      }[]
      generation: { name: string; url: string }
    }[]
    past_types: any[]
    species: { name: string; url: string }
  
    sprites: {
      back_default: string
      back_female: any
      back_shiny: string
      back_shiny_female: any
      front_default: string
      front_female: any
      front_shiny: string
      front_shiny_female: any
      other: {
        dream_world: { front_default: string; front_female: any }
        home: {
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
        "official-artwork": { front_default: string; front_shiny: string }
        showdown: {
          back_default: string
          back_female: any
          back_shiny: string
          back_shiny_female: any
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
      }
      versions: {
        "generation-i": {
          "red-blue": {
            back_default: string
            back_gray: string
            back_transparent: string
            front_default: string
            front_gray: string
            front_transparent: string
          }
          yellow: {
            back_default: string
            back_gray: string
            back_transparent: string
            front_default: string
            front_gray: string
            front_transparent: string
          }
        }
  
        "generation-ii": {
          crystal: {
            back_default: string
            back_shiny: string
            back_shiny_transparent: string
            back_transparent: string
            front_default: string
            front_shiny: string
            front_shiny_transparent: string
            front_transparent: string
          }
          gold: {
            back_default: string
            back_shiny: string
            front_default: string
            front_shiny: string
            front_transparent: string
          }
          silver: {
            back_default: string
            back_shiny: string
            front_default: string
            front_shiny: string
            front_transparent: string
          }
        }
  
        "generation-iii": {
          emerald: { front_default: string; front_shiny: string }
          "firered-leafgreen": {
            back_default: string
            back_shiny: string
            front_default: string
            front_shiny: string
          }
          "ruby-sapphire": {
            back_default: string
            back_shiny: string
            front_default: string
            front_shiny: string
          }
        }
  
        "generation-iv": {
          "diamond-pearl": {
            back_default: string
            back_female: any
            back_shiny: string
            back_shiny_female: any
            front_default: string
            front_female: any
            front_shiny: string
            front_shiny_female: any
          }
          "heartgold-soulsilver": {
            back_default: string
            back_female: any
            back_shiny: string
            back_shiny_female: any
            front_default: string
            front_female: any
            front_shiny: string
            front_shiny_female: any
          }
          platinum: {
            back_default: string
            back_female: any
            back_shiny: string
            back_shiny_female: any
            front_default: string
            front_female: any
            front_shiny: string
            front_shiny_female: any
          }
        }
  
        "generation-v": {
          "black-white": {
            animated: {
              back_default: string
              back_female: any
              back_shiny: string
              back_shiny_female: any
              front_default: string
              front_female: any
              front_shiny: string
              front_shiny_female: any
            }
            back_default: string
            back_female: any
            back_shiny: string
            back_shiny_female: any
            front_default: string
            front_female: any
            front_shiny: string
            front_shiny_female: any
          }
        }
  
        "generation-vi": {
          "omegaruby-alphasapphire": {
            front_default: string
            front_female: any
            front_shiny: string
            front_shiny_female: any
          }
          "x-y": {
            front_default: string
            front_female: any
            front_shiny: string
            front_shiny_female: any
          }
        }
  
        "generation-vii": {
          icons: { front_default: string; front_female: any }
          "ultra-sun-ultra-moon": {
            front_default: string
            front_female: any
            front_shiny: string
            front_shiny_female: any
          }
        }
  
        "generation-viii": {
          icons: { front_default: string; front_female: any }
        }
      }
    }
  
    stats: {
      base_stat: number
      effort: number
      stat: { name: string; url: string }
    }[]
  
    types: {
      slot: number
      type: { name: string; url: string }
    }[]
  
    weight: number
  }
