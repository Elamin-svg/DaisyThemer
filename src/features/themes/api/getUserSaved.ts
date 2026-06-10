import { createSupabaseServerClient } from '#/shared/api/supabase';
import { createServerFn } from '@tanstack/react-start';
import type { DatabaseTheme } from '#/shared/types/db';
import { z } from 'zod';

export const getUserSaved = createServerFn({ method: 'GET' })
    .inputValidator(z.object({
        type: z.enum(['created', 'liked']),
        pageParam: z.number().default(0)
    }))
    .handler(async (ctx) => {
        const supabase = createSupabaseServerClient();
        const { data: authData } = await supabase.auth.getUser();

        if (!authData?.user) {
            return [];
        }

        const userId = authData.user.id;
        const page = ctx.data.pageParam || 0;
        const limit = 20;
        const from = page * limit;
        const to = from + limit - 1;

        let query = supabase.from('themes').select('*, user_id(name)');

        if (ctx.data.type === 'created') {
            query = query.eq('user_id', userId).order('created_at', { ascending: false });
        } else {
            query = query.contains('liked_by', [userId]).order('created_at', { ascending: false });
        }

        const { data, error } = await query.range(from, to);

        if (error) {
            console.error("Error fetching user saved themes:", error);
            throw new Error("Failed to fetch saved themes.");
        }

        return (data || []) as unknown as DatabaseTheme[];
    });
