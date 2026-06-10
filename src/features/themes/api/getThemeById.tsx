import { createServerFn } from '@tanstack/react-start';
import { createSupabaseServerClient } from '#/shared/api/supabase';
import type { DatabaseTheme } from '#/shared/types/db';
import { z } from 'zod';
export const getThemeById = createServerFn({ method: 'GET' })
    .inputValidator(z.object({
        id: z.string()
    }))
    .handler(async (ctx) => {

        const supabase = await createSupabaseServerClient();

        const { data: authData } = await supabase.auth.getUser();
        const userId = authData?.user?.id ?? null;

        const { data, error } = await supabase
            .from('themes')
            .select('*, user_id(name,id)')
            .eq('id', ctx.data.id)
            .single();

        if (error) {
            return null;
        }




        const likedBy: string[] = data.liked_by ?? [];
        const is_liked = userId ? likedBy.includes(userId) : false;
        const is_owner = data.user_id.id === userId;

        const { liked_by: _stripped, ...rest } = data as any;

        return { ...rest, is_liked, is_owner } as DatabaseTheme;
    });
