const MenuItemSkeleton = () => {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white shadow-lg animate-pulse">
      {/* Image skeleton */}
      <div className="h-52 lg:h-64 bg-charcoal/10" />
      
      {/* Content skeleton */}
      <div className="p-6 lg:p-8 bg-charcoal">
        {/* Title */}
        <div className="h-6 w-3/4 bg-offwhite/10 rounded mb-3" />
        
        {/* Description line 1 */}
        <div className="h-4 w-full bg-offwhite/5 rounded mb-2" />
        
        {/* Description line 2 */}
        <div className="h-4 w-2/3 bg-offwhite/5 rounded" />
      </div>
      
      {/* Price badge skeleton */}
      <div className="absolute top-4 right-4">
        <div className="bg-charcoal/60 px-5 py-2.5 rounded-full">
          <div className="h-5 w-12 bg-gold/20 rounded" />
        </div>
      </div>
    </div>
  );
};

export default MenuItemSkeleton;
