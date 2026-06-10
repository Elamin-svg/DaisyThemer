import React from 'react';

export function LoginPreview() {
  return (
    <div className="flex min-h-[600px] py-16 bg-base-200/50 items-center justify-center text-base-content overflow-hidden transition-colors">
      <div className="w-full max-w-md p-8 md:p-10 card bg-base-100 card-border border-base-300 shadow-sm mx-4">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold text-2xl shadow-sm">
            L
          </div>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 tracking-tight">Welcome back</h2>
          <p className="text-base-content/60 text-sm font-medium">Please enter your details to sign in.</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-medium text-base-content/80">Email</span>
            </label>
            <input type="email" placeholder="Enter your email" className="input input-border w-full" />
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-medium text-base-content/80">Password</span>
            </label>
            <input type="password" placeholder="••••••••" className="input input-border w-full" />
          </div>

          <div className="flex items-center justify-between text-sm mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary rounded" />
              <span className="font-medium text-base-content/80">Remember for 30 days</span>
            </label>
            <a className="link link-primary font-medium text-primary no-underline hover:underline cursor-pointer">Forgot password?</a>
          </div>

          <div className='mt-2'>
            <button type="button" className="btn btn-primary w-full  font-bold text-base shadow-sm">Sign In</button>

            <button type="button" className="btn btn-outline mt-4 w-full gap-3 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.519-3.119-11.125-7.495l-6.645,5.137C9.505,39.63,16.216,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
              Sign in with Google
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-sm text-base-content/60 font-medium">
          Don't have an account? <a className="link link-primary font-bold no-underline hover:underline cursor-pointer">Sign up</a>
        </p>
      </div>
    </div>
  );
}
