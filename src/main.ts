import { startREPL } from "./repl.js";
import { initState } from "./state.js";

const state = initState(1000 * 60 * 5); // 5 minutes
startREPL(state);
