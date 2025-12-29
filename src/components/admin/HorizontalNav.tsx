import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CalendarDays, 
  UtensilsCrossed, 
  Image, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  Calendar,
  Grid3X3,
  List,
  FolderOpen,
  Sparkles,
  ShoppingBag,
  History,
  Users,
  MessageSquare,
  Award,
  UserCog,
  CalendarClock,
  Shield,
  FileBarChart,
  TrendingUp,
  PartyPopper,
  Megaphone,
  UserPlus,
  Plug,
  ExternalLink,
  Bell,
  Search
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  children?: { icon: React.ElementType; label: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
  { 
    icon: CalendarDays, 
    label: 'Réservations',
    children: [
      { icon: List, label: 'Toutes les réservations', path: '/admin/reservations' },
      { icon: Calendar, label: 'Calendrier', path: '/admin/reservations/calendar' },
      { icon: Grid3X3, label: 'Tables', path: '/admin/reservations/tables' },
    ]
  },
  { 
    icon: UtensilsCrossed, 
    label: 'Menu',
    children: [
      { icon: List, label: 'Articles', path: '/admin/menu' },
      { icon: FolderOpen, label: 'Catégories', path: '/admin/menu/categories' },
      { icon: Sparkles, label: 'Spécialités', path: '/admin/menu/specials' },
    ]
  },
  { 
    icon: ShoppingBag, 
    label: 'Commandes',
    children: [
      { icon: ShoppingBag, label: 'En cours', path: '/admin/orders' },
      { icon: History, label: 'Historique', path: '/admin/orders/history' },
    ]
  },
  { 
    icon: Users, 
    label: 'Clients',
    children: [
      { icon: Users, label: 'Liste', path: '/admin/customers' },
      { icon: MessageSquare, label: 'Avis', path: '/admin/customers/reviews' },
      { icon: Award, label: 'Fidélité', path: '/admin/customers/loyalty' },
    ]
  },
  { 
    icon: UserCog, 
    label: 'Personnel',
    children: [
      { icon: UserCog, label: 'Employés', path: '/admin/staff' },
      { icon: CalendarClock, label: 'Plannings', path: '/admin/staff/schedules' },
      { icon: Shield, label: 'Rôles', path: '/admin/staff/roles' },
    ]
  },
  { 
    icon: FileBarChart, 
    label: 'Rapports',
    children: [
      { icon: FileBarChart, label: 'Vue d\'ensemble', path: '/admin/reports' },
      { icon: TrendingUp, label: 'Ventes', path: '/admin/reports/sales' },
    ]
  },
  { 
    icon: Image, 
    label: 'Contenu',
    children: [
      { icon: Image, label: 'Galerie', path: '/admin/gallery' },
      { icon: PartyPopper, label: 'Événements', path: '/admin/content/events' },
      { icon: Megaphone, label: 'Promotions', path: '/admin/content/promotions' },
    ]
  },
  { 
    icon: Settings, 
    label: 'Paramètres',
    children: [
      { icon: Settings, label: 'Général', path: '/admin/settings' },
      { icon: UserPlus, label: 'Utilisateurs', path: '/admin/settings/users' },
      { icon: Plug, label: 'Intégrations', path: '/admin/settings/integrations' },
    ]
  },
];

const HorizontalNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (children?: { path: string }[]) => {
    if (!children) return false;
    return children.some(child => location.pathname === child.path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-sidebar shadow-lg sticky top-0 z-30">
      {/* Top bar with logo and user actions */}
      <div className="border-b border-sidebar-border/50">
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-sidebar-foreground text-base tracking-tight">Maison le Sept</h1>
              <p className="text-primary text-[11px] font-medium">Administration</p>
            </div>
          </a>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-sidebar-accent/40 hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-sidebar-foreground rounded-lg transition-all text-sm">
              <Search className="w-4 h-4" />
              <span className="text-xs">Rechercher...</span>
              <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-sidebar-border bg-sidebar-accent px-1.5 font-mono text-[10px] text-sidebar-foreground/50">
                ⌘K
              </kbd>
            </button>

            {/* Notifications */}
            <button className="relative p-2.5 hover:bg-sidebar-accent rounded-lg transition-colors group">
              <Bell className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-sidebar-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-sidebar" />
            </button>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-sidebar-border/50 mx-1" />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-1.5 hover:bg-sidebar-accent rounded-xl transition-colors">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-primary-foreground font-semibold text-sm">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sidebar-foreground text-sm font-medium leading-tight">
                      {user?.email?.split('@')[0]}
                    </p>
                    <p className="text-primary/70 text-[11px]">Administrateur</p>
                  </div>
                  <ChevronDown className="hidden md:block w-4 h-4 text-sidebar-foreground/40" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 bg-card border border-border/50 shadow-xl rounded-xl p-1.5">
                <DropdownMenuLabel className="px-3 py-2.5">
                  <p className="font-semibold text-foreground text-sm">Mon compte</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50 my-1" />
                <DropdownMenuItem 
                  onClick={() => navigate('/admin/settings')}
                  className="px-3 py-2.5 cursor-pointer rounded-lg hover:bg-muted/50 gap-3"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => window.open('/', '_blank')}
                  className="px-3 py-2.5 cursor-pointer rounded-lg hover:bg-muted/50 gap-3"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  <span>Voir le site</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50 my-1" />
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="px-3 py-2.5 cursor-pointer rounded-lg text-destructive focus:text-destructive hover:bg-destructive/10 gap-3"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 hover:bg-sidebar-accent rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-sidebar-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-sidebar-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="hidden lg:block bg-sidebar-accent/30">
        <div className="px-6">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList className="gap-0.5">
              {menuItems.map((item) => (
                item.children ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger 
                      className={cn(
                        "h-11 px-4 text-xs font-medium bg-transparent hover:bg-sidebar-accent/60 data-[state=open]:bg-sidebar-accent/60 rounded-none border-b-2 border-transparent transition-all",
                        isParentActive(item.children)
                          ? "text-primary border-primary"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-64 p-2 bg-card border border-border/50 shadow-xl rounded-xl">
                        {item.children.map((child) => (
                          <button
                            key={child.path}
                            onClick={() => navigate(child.path)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                              isActive(child.path)
                                ? "bg-primary text-primary-foreground font-medium"
                                : "text-foreground hover:bg-muted"
                            )}
                          >
                            <child.icon className="w-4 h-4 flex-shrink-0" />
                            <span>{child.label}</span>
                          </button>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <button
                      onClick={() => navigate(item.path!)}
                      className={cn(
                        "h-11 px-4 text-xs font-medium rounded-none border-b-2 transition-all flex items-center",
                        isActive(item.path!)
                          ? "text-primary border-primary bg-sidebar-accent/40"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 border-transparent"
                      )}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </button>
                  </NavigationMenuItem>
                )
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-sidebar-accent/50 border-t border-sidebar-border/30">
          <div className="p-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-sidebar hover:bg-sidebar-accent text-sidebar-foreground/60 rounded-xl transition-all">
                <Search className="w-4 h-4" />
                <span className="text-sm">Rechercher...</span>
              </button>
            </div>
            
            {/* Mobile Menu Grid */}
            <div className="grid grid-cols-3 gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.path) {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    } else if (item.children) {
                      navigate(item.children[0].path);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl transition-all",
                    (item.path && isActive(item.path)) || isParentActive(item.children)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-sidebar hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium text-center leading-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HorizontalNav;
