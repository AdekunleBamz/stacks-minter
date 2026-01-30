import React, { useState } from 'react';

/**
 * NFT Gallery component to display user's NFT collection
 */
export default function NFTGallery({ 
  nfts = [], 
  loading = false, 
  columns = 4,
  onNFTClick,
  emptyMessage = "You don't have any NFTs yet"
}) {
  const [selectedNFT, setSelectedNFT] = useState(null);

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  };

  if (loading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl" />
            <div className="mt-2 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  const handleNFTClick = (nft) => {
    setSelectedNFT(nft);
    onNFTClick?.(nft);
  };

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {nfts.map((nft, index) => (
          <div
            key={nft.token_id || index}
            className="group cursor-pointer"
            onClick={() => handleNFTClick(nft)}
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              {nft.image_uri || nft.image ? (
                <img
                  src={nft.image_uri || nft.image}
                  alt={nft.name || `NFT #${nft.token_id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white font-medium transition-opacity">
                  View Details
                </span>
              </div>
            </div>
            
            <div className="mt-2">
              <h4 className="font-medium text-gray-900 dark:text-white truncate">
                {nft.name || `NFT #${nft.token_id}`}
              </h4>
              {nft.token_id && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Token #{nft.token_id}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* NFT Detail Modal would go here */}
    </>
  );
}

/**
 * NFT Gallery with filters
 */
export function NFTGalleryWithFilters({ nfts, loading }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const sortedNFTs = [...nfts].sort((a, b) => {
    if (sortBy === 'newest') return (b.token_id || 0) - (a.token_id || 0);
    if (sortBy === 'oldest') return (a.token_id || 0) - (b.token_id || 0);
    return 0;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {nfts.length} NFTs
          </span>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <NFTGallery nfts={sortedNFTs} loading={loading} />
    </div>
  );
}
