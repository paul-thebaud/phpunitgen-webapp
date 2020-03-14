import { Theme } from "@/container/concerns/theme";
import { Dictionary } from "@/utils/types";

export const themes = {
    light: new Theme("light", "💡", "default", 0),
    dark: new Theme("dark", "🕶️", "darcula", 0),
    night: new Theme("night", "🌙", "erlang-dark", 2),
    forest: new Theme("forest", "🌳", "blackboard", 5),
    black: new Theme("black", "😎️", "darcula", 8),
    ocean: new Theme("ocean", "🌊", "tomorrow-night-eighties", 11),
    desert: new Theme("desert", "🏜️", "pastel-on-dark", 15),
    rainbow: new Theme("rainbow", "🌈", "default", 20),
    unicorn: new Theme("unicorn", "🦄", "darcula", 25),
    original: new Theme("original", "📟", "default", 30),
} as Dictionary<Theme>;
