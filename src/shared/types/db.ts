import type { Database } from "../../../database.types";
import type { CssTheme } from "./theme";

export type DatabaseTheme = Omit<Database["public"]["Tables"]["themes"]["Row"], "liked_by"> & {
    theme_code: CssTheme;
    user_id: {
        name: string
    },
    compiled_overrides?: string;
    //Server computed
    is_liked: boolean;
    // Server computed
    is_owner: boolean;
}
