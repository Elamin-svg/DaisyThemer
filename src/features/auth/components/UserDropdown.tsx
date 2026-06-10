import { logout } from '#/features/auth/api/auth';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { toast } from 'sonner';
import SettingsModal from './SettingsModal';
import { Dropdown, DropdownItem } from '#/shared/ui/Dropdown';
import { useRouter } from '@tanstack/react-router';

export default function UserDropdown({ user, dbUser, className = "dropdown-end" }: { user: { email: string }, dbUser: { name: string } | null, className?: string }) {
  const logoutFn = useServerFn(logout);
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutFn();
      await router.invalidate();
    } catch {
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <>
      <Dropdown
        className={className}
        align={className?.includes('dropdown-top') ? 'top end' : 'bottom end'}
        menuClassName="min-w-60 w-fit"
        trigger={
          <div className="btn btn-ghost btn-circle">
            <div className="size-9 rounded-full bg-base-300 flex items-center justify-center">
              <span className="text-sm">{user.email?.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        }
      >
        <div className='mb-2 border-b border-base-200 p-2'>
          <p className='text-xs font-medium'>{dbUser?.name || "User"}</p>
          <p className="text-xs text-base-content/60 truncate">{user.email}</p>
        </div>

        <DropdownItem onClick={() => setIsSettingsOpen(true)}>Settings</DropdownItem>
        <DropdownItem onClick={handleLogout} className="text-error font-medium">Log Out</DropdownItem>
      </Dropdown>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} user={user} dbUser={dbUser} />
    </>
  );
}

