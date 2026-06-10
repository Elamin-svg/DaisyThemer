import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { type ReactNode, Fragment } from 'react';

export interface DropdownProps {
  /** The element that triggers the dropdown. Often a <button>. */
  trigger: ReactNode;
  /** The items inside the dropdown. Use <DropdownItem> for these. */
  children: ReactNode;
  /** Additional classes for the container */
  className?: string;
  /** Additional classes for the dropdown menu panel */
  menuClassName?: string;
  /** Alignment of the dropdown */
  align?: 'bottom start' | 'bottom end' | 'top start' | 'top end';
}

export function Dropdown({ trigger, children, className = '', menuClassName = '', align = 'bottom end' }: DropdownProps) {
  return (
    <Menu as="div" className={`${className}`}>
      <MenuButton as={Fragment}>
        {trigger}
      </MenuButton>

      <MenuItems
        transition
        anchor={align}
        className={`dropdown-content menu bg-base-100 rounded-box z-[50] w-52 p-2 shadow-sm border border-base-200 outline-none transition duration-100 ease-out [--anchor-gap:8px] data-[closed]:scale-95 data-[closed]:opacity-0 ${menuClassName}`}
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

export interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

export function DropdownItem({ children, onClick, className = '', as: Component = "button", ...props }: DropdownItemProps) {
  return (
    <MenuItem as="li">
      <Component
        onClick={onClick}
        className={`w-full text-left data-[focus]:active ${className}`}
        {...props}
      >
        {children}
      </Component>
    </MenuItem>
  );
}

export function DropdownDivider() {
  return <div className="divider my-1 h-px" />;
}
