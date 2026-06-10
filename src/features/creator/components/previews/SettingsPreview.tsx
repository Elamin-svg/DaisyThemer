import React from 'react';

export function SettingsPreview() {
  return (
    <div className="flex bg-base-100 pb-16 text-base-content transition-colors">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row">

        {/* Settings Sidebar */}
        <aside className="w-full md:w-64 border-r border-base-200 bg-base-100 p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Settings</h2>
            <p className="text-sm text-base-content/60 mt-1">Manage your account and preferences.</p>
          </div>

          <ul className="menu menu-sm bg-base-100 rounded-box w-full p-0 gap-1">
            <li><a className="py-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 opacity-70"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg> Profile</a></li>
            <li><a className="py-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 opacity-70"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg> Security</a></li>
            <li><a className="py-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 opacity-70"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg> Notifications</a></li>
            <li><a className="py-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 opacity-70"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg> Billing</a></li>
          </ul>
        </aside>

        {/* Settings Content */}
        <main className="flex-1 p-6 md:p-10 bg-base-100">
          <div className="max-w-3xl">

            {/* Public Profile Section */}
            <section className="mb-12">
              <h3 className="text-lg font-bold mb-6 border-b border-base-200 pb-2">Public Profile</h3>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-5">
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-medium text-base-content/80">Name</span></label>
                    <input type="text" placeholder="Your name" defaultValue="Jane Doe" className="input input-border w-full" />
                  </div>

                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-medium text-base-content/80">Email</span></label>
                    <input type="email" placeholder="Your email" defaultValue="jane@example.com" className="input input-border w-full" />
                  </div>

                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-medium text-base-content/80">Bio</span></label>
                    <textarea className="textarea textarea-border w-full h-24 block" placeholder="Write a few sentences about yourself."></textarea>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="avatar">
                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src="https://i.pravatar.cc/150?img=12" alt="Avatar" />
                    </div>
                  </div>
                  <button className="btn btn-sm btn-outline font-medium">Change Avatar</button>
                </div>
              </div>
            </section>

            {/* Notifications Section */}
            <section className="mb-12">
              <h3 className="text-lg font-bold mb-6 border-b border-base-200 pb-2">Email Notifications</h3>

              <div className="flex flex-col gap-4">
                <div className="card ">
                  <div className='card-body  card-sm'>
                    <div>
                      <h4 className="font-semibold text-sm">Marketing emails</h4>
                      <p className="text-xs text-base-content/60 mt-1">Receive emails about new products, features, and more.</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                </div>

                <div className="card ">
                  <div className='card-body  card-sm'>
                    <div>
                      <h4 className="font-semibold text-sm">Security alerts</h4>
                      <p className="text-xs text-base-content/60 mt-1">Receive important security updates about your account.</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked disabled />
                  </div></div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="mb-12">
              <h3 className="text-lg font-bold mb-6 border-b border-base-200 pb-2 text-error">Danger Zone</h3>

              <div className="card bg-error/5 border border-error/20 card-sm">
                <div className="card-body p-5 md:flex-row items-center justify-between">
                  <div>
                    <h4 className="font-bold   text-sm text-error">Delete Account</h4>
                    <p className="text-sm text-error/85 mt-1">Once you delete your account, there is no going back.</p>
                  </div>
                  <button className="btn btn-error text-error-content mt-4 md:mt-0 font-bold shrink-0">Delete Account</button>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 border-t border-base-200 pt-6">
              <button className="btn btn-ghost">Cancel</button>
              <button className="btn btn-primary font-bold shadow-sm">Save Changes</button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
