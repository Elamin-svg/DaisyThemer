import { createSupabaseServerClient } from '#/shared/api/supabase'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator'

export const Route = createFileRoute('/auth/callback')({
    server: {
        handlers: {
            GET: async (ctx) => {
                const url = new URL(ctx.request.url)
                const code = url.searchParams.get('code')
                const redirect_to = url.searchParams.get('redirect_to') || '/'

                if (!code) {
                    console.error("No code provided")
                    throw redirect({ href: "/" })
                }

                const supabase = await createSupabaseServerClient();
                const { error } = await supabase.auth.exchangeCodeForSession(code);

                if (error) {
                    console.error("Error exchanging code for session", error)
                    throw redirect({ href: "/" })
                }

                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: existingUser } = await supabase
                        .from('user')
                        .select('id')
                        .eq('id', user.id)
                        .maybeSingle();

                    if (!existingUser) {
                        const randomName = uniqueNamesGenerator({
                            dictionaries: [adjectives, animals],
                            separator: '',
                            style: 'capital',
                            length: 2,
                        }).slice(0, 20);

                        const { error: insertError } = await supabase.from('user').insert({
                            id: user.id,
                            name: randomName
                        });

                        if (insertError) {
                            console.error("Failed to insert new user:", insertError);
                        }
                    }
                }

                throw redirect({ href: redirect_to })
            }
        }
    }
})