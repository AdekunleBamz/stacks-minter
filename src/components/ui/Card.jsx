import React from 'react';

/**
 * Card component with variants
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.variant - Card style: 'default', 'bordered', 'elevated', 'interactive'
 * @param {string} props.padding - Padding size: 'none', 'sm', 'md', 'lg'
 * @param {string} props.className - Additional CSS classes
 */
export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) {
  const baseStyles = 'rounded-xl overflow-hidden';

  const variants = {
    default: 'bg-white dark:bg-gray-800',
    bordered: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg',
    interactive: `
      bg-white dark:bg-gray-800 shadow-md
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-200 cursor-pointer
    `,
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant] || variants.default}
        ${paddings[padding] || paddings.md}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card header component
 */
export function CardHeader({ children, className = '' }) {
  return (
    <div className={`pb-3 border-b border-gray-200 dark:border-gray-700 mb-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Card title component
 */
export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}>
      {children}
    </h3>
  );
}

/**
 * Card description component
 */
export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${className}`}>
      {children}
    </p>
  );
}

/**
 * Card body component
 */
export function CardBody({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

/**
 * Card footer component
 */
export function CardFooter({ children, className = '' }) {
  return (
    <div className={`pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

/**
 * NFT Card specific component
 */
export function NFTCard({ image, name, tokenId, price, onMint, minting = false }) {
  return (
    <Card variant="interactive" padding="none">
      <div className="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name || `NFT #${tokenId}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white truncate">
          {name || `NFT #${tokenId}`}
        </h4>
        {price && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {price} STX
          </p>
        )}
        {onMint && (
          <button
            onClick={onMint}
            disabled={minting}
            className="w-full mt-3 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {minting ? 'Minting...' : 'Mint NFT'}
          </button>
        )}
      </div>
    </Card>
  );
}
