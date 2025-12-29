import { Award, Leaf, Timer, Sparkles, Crown, Fish } from 'lucide-react';

export type BadgeType = 
  | 'chef-selection' 
  | 'seasonal' 
  | 'award' 
  | 'limited' 
  | 'plant-based' 
  | 'sustainable';

interface MenuBadgeProps {
  type: BadgeType;
  size?: 'sm' | 'md';
}

const badgeConfig: Record<BadgeType, { 
  label: string; 
  icon: typeof Award;
  className: string;
}> = {
  'chef-selection': {
    label: 'Sélection du Chef',
    icon: Crown,
    className: 'bg-black/70 border-gold/60 text-gold',
  },
  'seasonal': {
    label: 'De Saison',
    icon: Sparkles,
    className: 'bg-black/70 border-emerald-400/60 text-emerald-300',
  },
  'award': {
    label: 'Primé',
    icon: Award,
    className: 'bg-black/70 border-amber-400/60 text-amber-300',
  },
  'limited': {
    label: 'Édition Limitée',
    icon: Timer,
    className: 'bg-black/70 border-rose-400/60 text-rose-300',
  },
  'plant-based': {
    label: 'Végétal',
    icon: Leaf,
    className: 'bg-black/70 border-green-400/60 text-green-300',
  },
  'sustainable': {
    label: 'Pêche Durable',
    icon: Fish,
    className: 'bg-black/70 border-sky-400/60 text-sky-300',
  },
};

export const MenuBadge = ({ type, size = 'sm' }: MenuBadgeProps) => {
  const config = badgeConfig[type];
  const Icon = config.icon;
  
  const sizeClasses = size === 'sm' 
    ? 'px-3 py-1.5 text-[9px] gap-1.5'
    : 'px-4 py-2 text-[10px] gap-2';
  
  const iconSize = size === 'sm' ? 10 : 12;

  return (
    <div 
      className={`
        inline-flex items-center ${sizeClasses}
        border
        tracking-[0.2em] uppercase font-medium
        transition-all duration-300
        hover:scale-105
        ${config.className}
      `}
    >
      <Icon size={iconSize} className="opacity-80" />
      <span>{config.label}</span>
    </div>
  );
};

export const MenuBadges = ({ badges, size = 'sm' }: { badges?: BadgeType[]; size?: 'sm' | 'md' }) => {
  if (!badges || badges.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <MenuBadge key={badge} type={badge} size={size} />
      ))}
    </div>
  );
};

export default MenuBadge;
