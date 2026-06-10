import "dotenv/config"
import { createClient } from '@supabase/supabase-js';
import { generateRandomTheme } from '../src/features/creator/utils/generateRandomTheme';
import { extractThemeColors } from '../src/shared/utils/extractMainColor';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const supabaseUrl = process.env.SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
  console.error("You can find it by running: npx supabase status -o env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedThemes(userId: string, count: number = 10) {
  console.log(`Generating ${count} random themes for user ${userId}...`);

  const themesToInsert = [];

  for (let i = 0; i < count; i++) {
    const rawTheme = generateRandomTheme();
    const isDarkMode = rawTheme['color-scheme'] === 'dark';
    const name = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: ' ',
      style: 'capital'
    });

    const colorsArr = extractThemeColors({
      primary: rawTheme.primary,
      secondary: rawTheme.secondary,
      accent: rawTheme.accent
    });

    themesToInsert.push({
      name,
      theme_code: rawTheme,
      is_public: true,
      user_id: userId,
      colors: colorsArr,
      isDarkMode
    });
  }

  const { data, error } = await supabase.from('themes').insert(themesToInsert).select();

  if (error) {
    console.error("Error inserting themes into Supabase:", error);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${data.length} themes!`);
}

const userIdArg = process.argv[2];
const countArg = parseInt(process.argv[3]) || 10;

if (!userIdArg) {
  console.error("Error: Missing user ID.");
  console.error("Usage: SUPABASE_SERVICE_ROLE_KEY=<key> npx tsx scripts/seedThemes.ts <user_id> [count]");
  process.exit(1);
}

seedThemes(userIdArg, countArg);
