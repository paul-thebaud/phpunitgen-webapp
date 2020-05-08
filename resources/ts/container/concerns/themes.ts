import { Theme } from "@/container/concerns/theme";
import { Dictionary } from "@/utils/types";

export const themes = {
    light: new Theme("light", "💡", "default", 0, true),
    dark: new Theme("dark", "🕶️", "darcula", 0, false),
    night: new Theme("night", "🌙", "erlang-dark", 2, false),
    forest: new Theme("forest", "🌳", "blackboard", 5, false),
    black: new Theme("black", "😎️", "darcula", 8, true),
    ocean: new Theme("ocean", "🌊", "tomorrow-night-eighties", 11, true),
    desert: new Theme("desert", "🏜️", "pastel-on-dark", 15, false),
    rainbow: new Theme("rainbow", "🌈", "default", 20, true),
    unicorn: new Theme("unicorn", "🦄", "darcula", 25, false),
    original: new Theme("original", "📟", "default", 30, true),
} as Dictionary<Theme>;
