import { startREPL } from "./repl.js";
import { initState } from "./state.js";

const state = initState();
startREPL(state);
