import type { DatabaseTheme } from '#/shared/types/db';
import { createSupabaseServerClient } from '#/shared/api/supabase';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

export const getAllThemes = createServerFn({ method: 'GET' })
    .inputValidator(z.object({
        search: z.string().optional(),
        color: z.string().optional(),
        isDarkMode: z.boolean().optional(),
        sortBy: z.enum(['recent', 'likes']).default('recent'),
        pageParam: z.number().default(0)
    }).optional())
    .handler(async (ctx) => {
        const supabase = createSupabaseServerClient();
        const page = ctx.data?.pageParam || 0;
        const limit = 20;
        const from = page * limit;
        const to = from + limit - 1;

        let query = supabase.rpc('search_themes', {
            search_term: ctx.data?.search || '',
            filter_color: ctx.data?.color || ''
        }).select('*, user_id(name)');

        if (ctx.data?.isDarkMode !== undefined) {
            query = query.eq('isDarkMode', ctx.data.isDarkMode);
        }

        if (ctx.data?.sortBy === 'likes') {
            query = query.order('likes', { ascending: false });
        } else {
            query = query.order('created_at', { ascending: false });
        }

        query = query.range(from, to);


        const { data, error } = await query;

        if (error) {
            console.error("Error fetching themes:", error);
            throw new Error("Failed to fetch themes.");
        }

        return (data || []) as unknown as DatabaseTheme[];
    });
