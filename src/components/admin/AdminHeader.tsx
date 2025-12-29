import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from 'next-themes';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Search, 
  Bell, 
  ChevronRight, 
  LogOut, 
  User,
  ExternalLink,
  Moon,
  Sun,
  HelpCircle,
  Plus,
  Calendar,
  UtensilsCrossed,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CommandPalette from './CommandPalette';
import HelpModal from './HelpModal';

const breadcrumbLabels: Record<string, string> = {
  'admin': 'Dashboard',
  'reservations': 'Réservations',
  'calendar': 'Calendrier',
  'tables': 'Tables',
  'menu': 'Menu',
  'categories': 'Catégories',
  'specials': 'Spécialités',
  'orders': 'Commandes',
  'history': 'Historique',
  'customers': 'Clients',
  'reviews': 'Avis',
  'loyalty': 'Fidélité',
  'staff': 'Personnel',
  'schedules': 'Plannings',
  'roles': 'Rôles',
  'reports': 'Rapports',
  'sales': 'Ventes',
  'gallery': 'Galerie',
  'content': 'Contenu',
  'events': 'Événements',
  'promotions': 'Promotions',
  'settings': 'Paramètres',
  'users': 'Utilisateurs',
  'integrations': 'Intégrations',
};

const notifications = [
  { id: 1, title: 'Nouvelle réservation!', message: 'Martin pour 4 personnes', time: 'Il y a 5 min', unread: true, color: 'bg-primary' },
  { id: 2, title: 'Réservation confirmée', message: 'Table #7 à 20h00', time: 'Il y a 15 min', unread: true, color: 'bg-primary/80' },
  { id: 3, title: 'Nouvel avis reçu', message: '⭐⭐⭐⭐⭐ Client satisfait', time: 'Il y a 1h', unread: true, color: 'bg-accent' },
  { id: 4, title: 'Commande terminée', message: 'Table #3 prête à servir', time: 'Il y a 2h', unread: false, color: 'bg-muted-foreground' },
  { id: 5, title: 'Rappel réservation', message: 'Dupont arrive dans 1h', time: 'Il y a 3h', unread: false, color: 'bg-secondary' },
];

const AdminHeader = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [commandOpen, setCommandOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [currentDate] = useState(new Date());

  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    return {
      label: breadcrumbLabels[segment] || segment,
      path,
      isLast: index === pathSegments.length - 1,
    };
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
      // ? for help
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        const activeElement = document.activeElement;
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setHelpOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <TooltipProvider>
      <header className="bg-background/80 backdrop-blur-xl border-b border-border sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Breadcrumbs + Date */}
          <div className="flex items-center gap-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.path} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50 mx-1" />
                  )}
                  <button
                    onClick={() => !crumb.isLast && navigate(crumb.path)}
                    className={cn(
                      "transition-colors",
                      crumb.isLast 
                        ? "text-foreground font-semibold cursor-default" 
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {crumb.label}
                  </button>
                </div>
              ))}
            </nav>

            {/* Separator */}
            <div className="hidden md:block w-px h-5 bg-border" />

            {/* Date Display */}
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="capitalize">
                {format(currentDate, "EEEE d MMMM yyyy", { locale: fr })}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Search Bar (Command Palette Trigger) */}
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden md:flex items-center gap-2 w-64 px-3 py-2 bg-muted/50 hover:bg-muted border border-border rounded-xl text-sm transition-all"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground flex-1 text-left">Rechercher...</span>
              <kbd className="px-1.5 py-0.5 bg-background text-muted-foreground text-xs rounded border border-border font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Quick Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-medium">Actions rapides</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/admin/reservations')} className="cursor-pointer">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Nouvelle réservation</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/menu')} className="cursor-pointer">
                  <UtensilsCrossed className="w-4 h-4 mr-2 text-orange-500" />
                  <span>Ajouter un plat</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/customers')} className="cursor-pointer">
                  <Users className="w-4 h-4 mr-2 text-emerald-500" />
                  <span>Nouveau client</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2.5 bg-muted/50 hover:bg-muted rounded-xl transition-colors"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{theme === 'dark' ? 'Mode clair' : 'Mode sombre'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Help Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setHelpOpen(true)}
                  className="p-2.5 bg-muted/50 hover:bg-muted rounded-xl transition-colors"
                >
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Aide & Raccourcis</p>
              </TooltipContent>
            </Tooltip>

            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative p-2.5 bg-muted/50 hover:bg-primary/10 rounded-xl transition-colors group">
                  <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-primary text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 p-0 border-border shadow-xl rounded-xl overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-border bg-primary/5">
                  <span className="font-medium text-foreground text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[11px] font-medium rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className="px-4 py-3 hover:bg-primary/5 cursor-pointer transition-colors flex items-center gap-3 border-b border-border/50 last:border-0"
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground text-xs font-medium",
                        notif.color
                      )}>
                        {notif.title.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-[13px] leading-tight">{notif.title}</p>
                        <p className="text-muted-foreground text-[12px] leading-tight mt-0.5">{notif.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-border">
                  <button 
                    onClick={() => navigate('/admin/reservations')}
                    className="w-full py-2 text-center text-primary hover:text-primary/80 text-[13px] font-medium border border-primary/30 hover:border-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    Voir toutes les notifications
                  </button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 pr-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors border border-primary/20">
                  <div className="relative">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-medium text-xs">
                        {user?.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-primary border-[1.5px] border-background rounded-full" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-[13px] font-medium text-foreground leading-tight">Admin</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-64 p-0 border-primary/20 shadow-xl rounded-xl overflow-hidden"
              >
                {/* User Profile Header */}
                <div className="px-4 py-3 border-b border-border bg-primary/5">
                  <p className="text-[11px] font-medium text-primary uppercase tracking-wide mb-3">Profil utilisateur</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-medium text-sm">
                        {user?.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-[13px]">Administrateur</p>
                      <p className="text-muted-foreground text-[12px] truncate">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <DropdownMenuItem 
                    onClick={() => navigate('/admin/settings')}
                    className="px-4 py-2.5 cursor-pointer hover:bg-primary/5"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-[13px]">Mon Profil</p>
                      <p className="text-[11px] text-muted-foreground">Paramètres du compte</p>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem 
                    onClick={() => navigate('/admin/reservations')}
                    className="px-4 py-2.5 cursor-pointer hover:bg-primary/5"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Bell className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-[13px]">Réservations</p>
                      <p className="text-[11px] text-muted-foreground">Gérer les réservations</p>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem 
                    onClick={() => window.open('/', '_blank')}
                    className="px-4 py-2.5 cursor-pointer hover:bg-primary/5"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-[13px]">Voir le site</p>
                      <p className="text-[11px] text-muted-foreground">Ouvrir dans un nouvel onglet</p>
                    </div>
                  </DropdownMenuItem>
                </div>

                {/* Logout Button */}
                <div className="px-4 py-3 border-t border-border">
                  <button 
                    onClick={handleSignOut}
                    className="w-full py-2 text-center text-destructive hover:text-destructive/80 text-[13px] font-medium border border-destructive/30 hover:border-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

      {/* Help Modal */}
      <HelpModal open={helpOpen} onOpenChange={setHelpOpen} />
    </TooltipProvider>
  );
};

export default AdminHeader;
