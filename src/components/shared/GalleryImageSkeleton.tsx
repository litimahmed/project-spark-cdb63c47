interface GalleryImageSkeletonProps {
  className?: string;
}

const GalleryImageSkeleton = ({ className = '' }: GalleryImageSkeletonProps) => {
  return (
    <div className={`relative overflow-hidden bg-charcoal/10 animate-pulse ${className}`}>
      {/* Shimmer effect */}
      <div 
        className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        }}
      />
      
      {/* Placeholder icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-charcoal/5 flex items-center justify-center">
          <svg 
            className="w-6 h-6 text-charcoal/20" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GalleryImageSkeleton;
