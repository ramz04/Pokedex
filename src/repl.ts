import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State) {
    const { rl, commands } = state;

    rl.prompt();

    rl.on("line", async (input: string) => {
        //const commandName = input.trim().toLowerCase();
        const tokens = cleanInput(input);

        if (tokens.length === 0) {
            rl.prompt();
            return;
        }

        const [commandName, ...commandArgs] = tokens;
        const command = commands[commandName];

        if (!command) {
            console.log("Unknown command");
            rl.prompt();
            return;
        }

        try {
            await command.callback(state, ...commandArgs);
        } catch (err) {
            console.error("Command failed:", err);
        }

        rl.prompt();
    });

    // rl.on("line", (input: string) => {
    //     const commands = cleanInput(input);

    //     if (commands.length === 0) {
    //         rl.prompt();
    //     }

    //     console.log(`Your command was: ${commands[0]}`);

    //     rl.prompt();
    // });

    // rl.on("close", () => {
    //     console.log("Exiting REPL...");
    //     process.exit(0);
    // });
}
