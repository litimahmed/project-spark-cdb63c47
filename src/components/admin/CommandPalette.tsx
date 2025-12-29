import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Calendar,
  Users,
  UtensilsCrossed,
  LayoutDashboard,
  Settings,
  Image,
  FileText,
  Clock,
  Star,
  BarChart3,
  UserCog,
  Plus,
} from 'lucide-react';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navigationItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, group: 'Navigation' },
  { label: 'Réservations', path: '/admin/reservations', icon: Calendar, group: 'Navigation' },
  { label: 'Calendrier', path: '/admin/reservations/calendar', icon: Clock, group: 'Navigation' },
  { label: 'Menu', path: '/admin/menu', icon: UtensilsCrossed, group: 'Navigation' },
  { label: 'Catégories', path: '/admin/menu/categories', icon: FileText, group: 'Navigation' },
  { label: 'Clients', path: '/admin/customers', icon: Users, group: 'Navigation' },
  { label: 'Avis', path: '/admin/customers/reviews', icon: Star, group: 'Navigation' },
  { label: 'Galerie', path: '/admin/gallery', icon: Image, group: 'Navigation' },
  { label: 'Rapports', path: '/admin/reports', icon: BarChart3, group: 'Navigation' },
  { label: 'Personnel', path: '/admin/staff', icon: UserCog, group: 'Navigation' },
  { label: 'Paramètres', path: '/admin/settings', icon: Settings, group: 'Navigation' },
];

const quickActions = [
  { label: 'Nouvelle réservation', path: '/admin/reservations', icon: Plus, group: 'Actions rapides' },
  { label: 'Ajouter un plat', path: '/admin/menu', icon: Plus, group: 'Actions rapides' },
  { label: 'Ajouter une image', path: '/admin/gallery', icon: Plus, group: 'Actions rapides' },
];

const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const navigate = useNavigate();

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Rechercher une page ou action..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        
        <CommandGroup heading="Actions rapides">
          {quickActions.map((item) => (
            <CommandItem
              key={item.label}
              onSelect={() => handleSelect(item.path)}
              className="cursor-pointer"
            >
              <item.icon className="mr-2 h-4 w-4 text-primary" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          {navigationItems.map((item) => (
            <CommandItem
              key={item.path}
              onSelect={() => handleSelect(item.path)}
              className="cursor-pointer"
            >
              <item.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
