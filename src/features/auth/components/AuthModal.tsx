import { Dialog } from '#/shared/ui/Dialog';
import { signInWithProvider } from '#/features/auth/api/auth';
import { useServerFn } from '@tanstack/react-start';
import { toast } from 'sonner';
import { useState } from 'react';
import { GitHub } from "#/shared/ui/icons/Github";
import { Google } from "#/shared/ui/icons/Google";

export type AuthType = 'login' | 'register';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: AuthType;
  onChangeType: (type: AuthType) => void;
}



export function AuthModal({ isOpen, onClose, type, onChangeType }: AuthModalProps) {
  const isLogin = type === 'login';
  const signIn = useServerFn(signInWithProvider);
  const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null);

  const handleSignIn = async (provider: "google" | "github") => {
    setLoadingProvider(provider);
    try {
      const data = await signIn({
        data: {
          provider,
          redirect_to: typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}${window.location.hash}` : '/'
        }
      });
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Could not start sign-in. Please try again.');
        setLoadingProvider(null);
      }
    } catch {
      toast.error('Sign-in failed. Please try again.');
      setLoadingProvider(null);
    }
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={isLogin ? "Log in to your account" : "Create an account"}
      className="max-w-md"
    >
      <div className='gap-3 pt-4 flex flex-col motion-preset-fade-lg'>
        <button type="button" disabled={loadingProvider !== null} onClick={() => handleSignIn('google')} className='btn w-full btn-outline border-base-300'>
          {loadingProvider === 'google' ? <span className="loading loading-spinner size-4 mr-1" /> : <Google className={`size-4 mr-1 ${loadingProvider !== null ? 'opacity-50' : ''}`} />} {isLogin ? 'Sign in' : 'Sign up'} with Google
        </button>
        <button type="button" disabled={loadingProvider !== null} onClick={() => handleSignIn('github')} className='btn w-full btn-outline border-base-300'>
          {loadingProvider === 'github' ? <span className="loading loading-spinner size-4 mr-1" /> : <GitHub className={`size-4 mr-1 ${loadingProvider !== null ? 'opacity-50' : ''}`} />} {isLogin ? 'Sign in' : 'Sign up'} with GitHub
        </button>
        <div className="divider text-sm">OR</div>
        <div className='text-center'>
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onChangeType('register')}
                className="link link-primary"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onChangeType('login')}
                className="link link-primary"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </Dialog>
  );
}
