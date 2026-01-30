import React, { useState, useRef, useEffect } from 'react';

/**
 * Dropdown menu component
 */
export function DropdownMenu({ 
  trigger, 
  children, 
  align = 'left',
  className = '' 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const alignmentClass = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div ref={menuRef} className={`relative inline-block ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div
          role="menu"
          onKeyDown={handleKeyDown}
          className={`
            absolute z-50 mt-2 min-w-[200px] rounded-lg shadow-lg
            bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            py-1 ${alignmentClass[align]}
          `}
        >
          {React.Children.map(children, child =>
            React.cloneElement(child, { 
              onClick: (e) => {
                child.props.onClick?.(e);
                if (!child.props.keepOpen) {
                  setIsOpen(false);
                }
              }
            })
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Dropdown menu item
 */
export function DropdownItem({ 
  children, 
  onClick, 
  icon,
  disabled = false,
  destructive = false,
  className = '',
}) {
  return (
    <button
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-2 text-sm text-left
        transition-colors
        ${disabled 
          ? 'text-gray-400 cursor-not-allowed' 
          : destructive
            ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
        }
        ${className}
      `}
    >
      {icon && <span className="w-5 h-5 flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

/**
 * Dropdown divider
 */
export function DropdownDivider() {
  return (
    <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
  );
}

/**
 * Dropdown header/label
 */
export function DropdownLabel({ children }) {
  return (
    <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
      {children}
    </div>
  );
}

/**
 * User account dropdown
 */
export function AccountDropdown({ address, onDisconnect, onCopyAddress }) {
  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : '';

  return (
    <DropdownMenu
      trigger={
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-medium">
            {address?.slice(2, 4)}
          </div>
          <span className="text-sm font-medium">{truncatedAddress}</span>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      }
      align="right"
    >
      <DropdownLabel>Account</DropdownLabel>
      <DropdownItem
        onClick={onCopyAddress}
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        }
      >
        Copy Address
      </DropdownItem>
      <DropdownItem
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        }
        onClick={() => window.open(`https://explorer.hiro.so/address/${address}`, '_blank')}
      >
        View on Explorer
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem
        onClick={onDisconnect}
        destructive
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        }
      >
        Disconnect
      </DropdownItem>
    </DropdownMenu>
  );
}

export default DropdownMenu;
