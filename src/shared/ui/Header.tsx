import { useAuthModalStore } from '#/features/auth/store/authModalStore';
import { BookmarkIcon as Bookmark, PlusCircleIcon as PlusCircle, MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/24/outline';
import { Link, useLoaderData, useLocation } from '@tanstack/react-router';
import { AuthModal } from "#/features/auth/components/AuthModal";
import UserDropdown from "#/features/auth/components/UserDropdown";

const LINKS = [{
  name: "Create",
  link: "/create",
  icon: PlusCircle
}, {
  name: "Browse",
  link: "/browse",
  icon: SearchIcon
}, {
  name: "My Themes",
  link: "/saved",
  icon: Bookmark
}]




function MobileNav({ isActive, user, dbUser, openModal }: { isActive: (path: string) => boolean, user: any, dbUser: any, openModal: (type: "login" | "register") => void }) {
  const closeDrawer = () => {
    const toggle = document.getElementById('nav-drawer') as HTMLInputElement | null;
    if (toggle) toggle.checked = false;
  };

  return (
    <div className="drawer lg:hidden w-auto ml-1 drawer-end">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="nav-drawer" className="btn btn-ghost btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-95" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-100 text-base-content min-h-full w-80 p-6 flex flex-col gap-1">
          <div className="mb-4">
            <Link to="/" className="tracking-tighter text-xl font-medium" onClick={closeDrawer}>
              Daisy<span className='text-primary'>Themer</span>
            </Link>
          </div>
          <ul className="gap-1 flex flex-col">
            {LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  to={`${link.link}`}
                  onClick={closeDrawer}
                  className={`rounded-lg text-base px-2.5 gap-2 ${isActive(link.link) ? "text-primary! bg-primary/10" : "hover:text-primary! hover:bg-primary/10"}`}
                >
                  <link.icon className='size-5' />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6 w-full">
            {!user ? (
              <div className="flex flex-col gap-2">
                <button className='btn btn-primary w-full' onClick={() => { closeDrawer(); openModal('register'); }}>Get Started</button>
                <button className='btn btn-outline border-base-300 w-full' onClick={() => { closeDrawer(); openModal('login'); }}>Log In</button>
              </div>
            ) : (
              <div className="flex justify-between items-center bg-base-200/50 p-3 rounded-xl border border-base-300">
                <div className="flex flex-col min-w-0">
                  <p className='text-sm font-medium truncate'>{dbUser?.name || "User"}</p>
                  <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                </div>
                <UserDropdown user={user as any} dbUser={dbUser} className="dropdown-top dropdown-end" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { isOpen, type, openModal, closeModal, setType } = useAuthModalStore();
  const location = useLocation()
  const { user, dbUser } = useLoaderData({ from: "__root__" }) as any;

  const isActive = (path: string) => {
    return location.pathname.includes(path)
  }

  return (
    <div className='fixed w-screen    bg-base-100/90 backdrop-blur-lg z-10 '>
      <header className="navbar px-3 sm:px-6 xl:px-0  max-w-[1440px]    mx-auto">
        <div className="navbar-start">
          <Link to="/" className="tracking-tighter text-xl font-medium">Daisy<span className='text-primary'>Themer</span></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal  px-1 gap-2">
            {LINKS.map((link) => (
              <li className='' key={link.name}>
                <Link to={`${link.link}`} className={`rounded-lg text-base px-2.5 gap-2 ${isActive(link.link) ? "text-primary! bg-primary/10  " : "hover:text-primary! hover:bg-primary/10  "}`}>
                  <link.icon className='size-3.5' />
                  {link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop End */}
        {!user ? <div className="navbar-end gap-2 hidden lg:flex">
          <button className='btn btn-sm btn-primary' onClick={() => openModal('register')}>Get Started</button>
          <button className='btn btn-sm btn-outline border-base-300' onClick={() => openModal('login')}>Log In</button>
        </div> : <div className="navbar-end gap-2 hidden lg:flex">
          <UserDropdown user={user as any} dbUser={dbUser} />
        </div>}

        {/* Mobile End */}
        <div className="navbar-end flex lg:hidden">
          <MobileNav isActive={isActive} user={user} dbUser={dbUser} openModal={openModal} />
        </div>
      </header>
      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        type={type}
        onChangeType={setType}
      />
    </div>
  )
}
