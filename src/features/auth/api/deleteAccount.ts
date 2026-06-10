import { createServerFn } from '@tanstack/react-start';
import { createSupabaseServerClient } from '#/shared/api/supabase';
import { getUser } from './auth';

export const deleteAccount = createServerFn({ method: 'POST' })
    .handler(async () => {
        const { user, error: authError } = await getUser();

        if (authError || !user) {
            throw new Error("You must be logged in to delete your account.");
        }

        const supabase = createSupabaseServerClient();

        // call rpc to delete user
        const { error } = await supabase.rpc('delete_user');

        if (error) {
            console.error("Error deleting user account:", error);
            throw new Error("Failed to delete account. Ensure the 'delete_user' RPC exists in Supabase.");
        }

        return { success: true };
    });
