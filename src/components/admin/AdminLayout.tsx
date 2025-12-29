import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from 'next-themes';
import { supabase } from '@/integrations/supabase/client';
import AdminHeader from './AdminHeader';
import SettingsPanel from './SettingsPanel';
import HorizontalNav from './HorizontalNav';
import { AdminSettingsProvider, useAdminSettings } from '@/contexts/AdminSettingsContext';
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
  ExternalLink
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  children?: { icon: React.ElementType; label: string; path: string }[];
}

const AdminLayoutContent = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const {
    themeColor,
    direction,
    layoutType,
    containerType,
    sidebarType,
    cardStyle,
  } = useAdminSettings();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Réservations', 'Menu', 'Commandes', 'Clients', 'Personnel', 'Rapports', 'Contenu', 'Paramètres']);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setCheckingRole(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
      setCheckingRole(false);
    };

    if (!loading) {
      checkAdminRole();
    }
  }, [user, loading]);

  useEffect(() => {
    if (!loading && !checkingRole) {
      if (!user) {
        navigate('/auth');
      } else if (isAdmin === false) {
        navigate('/');
      }
    }
  }, [user, loading, isAdmin, checkingRole, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) 
        ? prev.filter(m => m !== label)
        : [...prev, label]
    );
  };

  // Determine theme class based on color selection
  const themeColorClass = `admin-theme-${themeColor}`;

  if (loading || checkingRole || isAdmin === null) {
    return (
      <div className={cn(
        "min-h-screen bg-background flex items-center justify-center admin-theme",
        theme === 'dark' && 'dark',
        themeColorClass
      )}>
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isParentActive = (children?: { path: string }[]) => {
    if (!children) return false;
    return children.some(child => location.pathname === child.path);
  };

  const isMiniSidebar = sidebarType === 'mini';
  const isHorizontalLayout = layoutType === 'horizontal';

  // Horizontal Layout
  if (isHorizontalLayout) {
    return (
      <TooltipProvider>
        <div 
          dir={direction}
          className={cn(
            "min-h-screen bg-background flex flex-col admin-theme transition-all duration-300",
            theme === 'dark' && 'dark',
            themeColorClass,
            cardStyle === 'border' && 'admin-cards-border',
            cardStyle === 'shadow' && 'admin-cards-shadow'
          )}
        >
          {/* Horizontal Navigation */}
          <HorizontalNav />
          
          {/* Admin Header */}
          <AdminHeader />
          
          {/* Main Content */}
          <main className={cn(
            "flex-1 p-4 lg:p-8 pt-4 lg:pt-6 bg-muted/30",
            containerType === 'boxed' && "max-w-7xl mx-auto w-full"
          )}>
            <Outlet />
          </main>

          {/* Settings Panel */}
          <SettingsPanel />
        </div>
      </TooltipProvider>
    );
  }

  // Vertical Layout (default)
  return (
    <TooltipProvider>
      <div 
        dir={direction}
        className={cn(
          "h-screen bg-background flex overflow-hidden admin-theme transition-all duration-300",
          theme === 'dark' && 'dark',
          themeColorClass,
          cardStyle === 'border' && 'admin-cards-border',
          cardStyle === 'shadow' && 'admin-cards-shadow'
        )}
      >
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-primary/20 rounded-xl shadow-sm"
        >
          {sidebarOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
        </button>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={cn(
          "bg-sidebar border-r border-primary/10 fixed lg:static h-full z-40 transition-all duration-300 shadow-sm flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isMiniSidebar ? "w-20" : "w-72"
        )}>
          {/* Logo - Fixed at top */}
          <div className="p-5 border-b border-primary/10 flex-shrink-0">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              {!isMiniSidebar && (
                <div>
                  <h1 className="font-semibold text-sidebar-foreground text-lg">Maison le Sept</h1>
                  <p className="text-primary/60 text-xs">Administration</p>
                </div>
              )}
            </a>
          </div>

          {/* Navigation - Scrollable middle section */}
          <nav className="flex-1 min-h-0 overflow-y-auto scrollbar-modern p-3">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <div>
                      {isMiniSidebar ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => item.children && navigate(item.children[0].path)}
                              className={cn(
                                "w-full flex items-center justify-center p-2.5 transition-all rounded-lg",
                                isParentActive(item.children)
                                  ? "text-primary bg-primary/10"
                                  : "text-sidebar-foreground/70 hover:text-primary hover:bg-primary/5"
                              )}
                            >
                              <item.icon className="w-5 h-5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{item.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleMenu(item.label)}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-2.5 text-sm transition-all rounded-lg font-medium",
                              isParentActive(item.children)
                                ? "text-primary bg-primary/10"
                                : "text-sidebar-foreground/70 hover:text-primary hover:bg-primary/5"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="w-5 h-5" />
                              {item.label}
                            </div>
                            <ChevronDown className={cn(
                              "w-4 h-4 transition-transform",
                              expandedMenus.includes(item.label) ? "rotate-180" : ""
                            )} />
                          </button>
                          {expandedMenus.includes(item.label) && (
                            <ul className="mt-1 ml-4 pl-4 border-l border-primary/20 space-y-1">
                              {item.children.map((child) => (
                                <li key={child.path}>
                                  <button
                                    onClick={() => {
                                      navigate(child.path);
                                      setSidebarOpen(false);
                                    }}
                                    className={cn(
                                      "w-full flex items-center gap-3 px-3 py-2 text-sm transition-all rounded-lg",
                                      isActive(child.path)
                                        ? "bg-primary text-primary-foreground font-medium shadow-sm"
                                        : "text-sidebar-foreground/60 hover:text-primary hover:bg-primary/5"
                                    )}
                                  >
                                    <child.icon className="w-4 h-4" />
                                    {child.label}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    isMiniSidebar ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => {
                              navigate(item.path!);
                              setSidebarOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center justify-center p-2.5 transition-all rounded-lg",
                              isActive(item.path!)
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-sidebar-foreground/70 hover:text-primary hover:bg-primary/5"
                            )}
                          >
                            <item.icon className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <button
                        onClick={() => {
                          navigate(item.path!);
                          setSidebarOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all rounded-lg font-medium",
                          isActive(item.path!)
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-sidebar-foreground/70 hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    )
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* User Dropdown - Fixed at bottom */}
          <div className="p-3 border-t border-primary/10 bg-sidebar flex-shrink-0">
            {isMiniSidebar ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center justify-center p-2 bg-primary/10 hover:bg-primary/15 rounded-xl transition-colors border border-primary/20">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-primary-foreground font-medium text-sm">
                        {user?.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" side="right" className="w-64 bg-card border border-primary/20 shadow-lg rounded-xl p-1">
                  <DropdownMenuLabel className="px-3 py-2">
                    <p className="font-medium text-foreground">Mon compte</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-primary/10" />
                  <DropdownMenuItem 
                    onClick={() => navigate('/admin/settings')}
                    className="px-3 py-2 cursor-pointer rounded-lg hover:bg-primary/5"
                  >
                    <Settings className="w-4 h-4 mr-2 text-primary" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => window.open('/', '_blank')}
                    className="px-3 py-2 cursor-pointer rounded-lg hover:bg-primary/5"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 text-primary" />
                    <span>Voir le site</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary/10" />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="px-3 py-2 cursor-pointer rounded-lg text-destructive focus:text-destructive hover:bg-destructive/5"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center gap-3 p-3 bg-primary/10 hover:bg-primary/15 rounded-xl transition-colors border border-primary/20">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-primary-foreground font-medium text-sm">
                        {user?.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sidebar-foreground text-sm font-medium truncate">{user?.email}</p>
                      <p className="text-primary/60 text-xs">Administrateur</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-primary/50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-card border border-primary/20 shadow-lg rounded-xl p-1">
                  <DropdownMenuLabel className="px-3 py-2">
                    <p className="font-medium text-foreground">Mon compte</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-primary/10" />
                  <DropdownMenuItem 
                    onClick={() => navigate('/admin/settings')}
                    className="px-3 py-2 cursor-pointer rounded-lg hover:bg-primary/5"
                  >
                    <Settings className="w-4 h-4 mr-2 text-primary" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => window.open('/', '_blank')}
                    className="px-3 py-2 cursor-pointer rounded-lg hover:bg-primary/5"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 text-primary" />
                    <span>Voir le site</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary/10" />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="px-3 py-2 cursor-pointer rounded-lg text-destructive focus:text-destructive hover:bg-destructive/5"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <AdminHeader />
          <main className={cn(
            "flex-1 p-4 lg:p-8 pt-4 lg:pt-6 overflow-y-auto bg-muted/30",
            containerType === 'boxed' && "max-w-7xl mx-auto w-full"
          )}>
            <Outlet />
          </main>
        </div>

        {/* Settings Panel */}
        <SettingsPanel />
      </div>
    </TooltipProvider>
  );
};

const AdminLayout = () => {
  return (
    <AdminSettingsProvider>
      <AdminLayoutContent />
    </AdminSettingsProvider>
  );
};

export default AdminLayout;
