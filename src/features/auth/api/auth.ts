import { createSupabaseServerClient } from '#/shared/api/supabase';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { z } from 'zod';

export const signInWithProvider = createServerFn({ method: 'GET' })
    .inputValidator(z.object({
        provider: z.enum(["google", "github"]),
        redirect_to: z.string().optional(),
    }))
    .handler(async (ctx) => {
        const rawHost = getRequestHeader('x-forwarded-host') ?? getRequestHeader('host') ?? 'localhost:3000';
        const host = rawHost.split(',')[0].trim();
        const rawProto = getRequestHeader('x-forwarded-proto');
        const protocol = (rawProto ? rawProto.split(',')[0].trim() : null) ?? (host.includes('localhost') ? 'http' : 'https');

        const supabase = createSupabaseServerClient();
        const redirectParam = ctx.data.redirect_to ? `?redirect_to=${encodeURIComponent(ctx.data.redirect_to)}` : '';

        const { error, data } = await supabase.auth.signInWithOAuth({
            provider: ctx.data.provider,
            options: {
                redirectTo: `${protocol}://${host}/auth/callback${redirectParam}`
            }
        });

        if (error) {
            return { url: null, error: error.message }
        }

        console.log(data)

        return { url: data.url, error: null }
    });

export const logout = createServerFn({ method: 'POST' })
    .handler(async () => {
        const supabase = createSupabaseServerClient();
        const { error } = await supabase.auth.signOut();
        return { error: error?.message || null };
    });
export const getUser = createServerFn({ method: 'GET' })
    .handler(async () => {

        const supabase = createSupabaseServerClient();

        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
            return { user: null, dbUser: null, error: error?.message || "Not authenticated" }
        }

        const { data: dbUser } = await supabase.from('user').select('name').eq('id', data.user.id).single();

        return { user: data.user, dbUser, error: null }
    });

export const updateUserName = createServerFn({ method: 'POST' })
    .inputValidator(z.object({ name: z.string().min(1).max(20, "Username must be 20 characters or less") }))
    .handler(async (ctx) => {
        const supabase = createSupabaseServerClient();
        const { data: authData } = await supabase.auth.getUser();
        if (!authData?.user) return { error: "Not authenticated" };

        const { error } = await supabase.from('user').update({ name: ctx.data.name }).eq('id', authData.user.id);
        if (error) {
            if (error.code === '23505') {
                return { error: "Username is already taken" };
            }
            return { error: error.message };
        }

        return { success: true };
    });


