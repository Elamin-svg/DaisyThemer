import { createServerFn } from '@tanstack/react-start';
import { createSupabaseServerClient } from '#/shared/api/supabase';
import { getUser } from "#/features/auth/api/auth";
import { z } from 'zod';

export const toggleLike = createServerFn({ method: 'POST' })
    .inputValidator(z.object({
        themeId: z.string()
    }))
    .handler(async (ctx) => {
        const { user, error: authError } = await getUser();

        if (authError || !user) {
            throw new Error("You must be logged in to like themes.");
        }

        const supabase = createSupabaseServerClient();


        const { data: theme, error: fetchError } = await supabase
            .from('themes')
            .select('liked_by')
            .eq('id', ctx.data.themeId)
            .single();

        if (fetchError) {
            console.error("Error fetching theme likes:", fetchError);
            throw new Error("Theme not found or error fetching.");
        }


        const currentLikes: string[] = theme.liked_by || [];
        const isLiked = currentLikes.includes(user.id);

        let newLikes: string[];
        if (isLiked) {
            newLikes = currentLikes.filter(id => id !== user.id);
        } else {
            newLikes = [...currentLikes, user.id];
        }


        const { error: updateError } = await supabase
            .from('themes')
            .update({ liked_by: newLikes, likes: newLikes.length })
            .eq('id', ctx.data.themeId);

        if (updateError) {
            console.error("Error updating theme likes:", updateError);
            throw new Error("Failed to update like status.");
        }

        return {
            likesCount: newLikes.length,
            isLiked: !isLiked
        };
    });
