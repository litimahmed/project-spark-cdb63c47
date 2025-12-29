import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import PageLoader from "@/components/shared/PageLoader";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import MenuCategoryPage from "./pages/MenuCategoryPage";
import MenuItemDetailPage from "./pages/MenuItemDetailPage";
import GalleryPage from "./pages/GalleryPage";
import ReservationsPage from "./pages/ReservationsPage";
import ReservationConfirmationPage from "./pages/ReservationConfirmationPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/DashboardPage";
import AdminReservationsPage from "./pages/admin/ReservationsPage";
import AdminMenuPage from "./pages/admin/MenuPage";
import AdminGalleryPage from "./pages/admin/GalleryPage";
import AdminSettingsPage from "./pages/admin/SettingsPage";

// Admin - Reservations
import AdminCalendarPage from "./pages/admin/reservations/CalendarPage";
import AdminTablesPage from "./pages/admin/reservations/TablesPage";

// Admin - Menu
import AdminCategoriesPage from "./pages/admin/menu/CategoriesPage";
import AdminSpecialsPage from "./pages/admin/menu/SpecialsPage";

// Admin - Orders
import AdminOrdersPage from "./pages/admin/orders/OrdersPage";
import AdminOrdersHistoryPage from "./pages/admin/orders/HistoryPage";

// Admin - Customers
import AdminCustomersPage from "./pages/admin/customers/CustomersPage";
import AdminReviewsPage from "./pages/admin/customers/ReviewsPage";
import AdminLoyaltyPage from "./pages/admin/customers/LoyaltyPage";

// Admin - Staff
import AdminStaffPage from "./pages/admin/staff/StaffPage";
import AdminSchedulesPage from "./pages/admin/staff/SchedulesPage";
import AdminRolesPage from "./pages/admin/staff/RolesPage";

// Admin - Reports
import AdminReportsPage from "./pages/admin/reports/ReportsPage";
import AdminSalesPage from "./pages/admin/reports/SalesPage";

// Admin - Content
import AdminEventsPage from "./pages/admin/content/EventsPage";
import AdminPromotionsPage from "./pages/admin/content/PromotionsPage";

// Admin - Settings
import AdminUsersPage from "./pages/admin/settings/UsersPage";
import AdminIntegrationsPage from "./pages/admin/settings/IntegrationsPage";

const queryClient = new QueryClient();

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <TooltipProvider>
              <PageLoader onLoadComplete={() => setIsLoaded(true)} />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/menu/:category" element={<MenuCategoryPage />} />
                  <Route path="/menu/:category/:slug" element={<MenuItemDetailPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/reservations" element={<ReservationsPage />} />
                  <Route path="/reservations/confirmation" element={<ReservationConfirmationPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboardPage />} />
                    
                    {/* Reservations */}
                    <Route path="reservations" element={<AdminReservationsPage />} />
                    <Route path="reservations/calendar" element={<AdminCalendarPage />} />
                    <Route path="reservations/tables" element={<AdminTablesPage />} />
                    
                    {/* Menu */}
                    <Route path="menu" element={<AdminMenuPage />} />
                    <Route path="menu/categories" element={<AdminCategoriesPage />} />
                    <Route path="menu/specials" element={<AdminSpecialsPage />} />
                    
                    {/* Orders */}
                    <Route path="orders" element={<AdminOrdersPage />} />
                    <Route path="orders/history" element={<AdminOrdersHistoryPage />} />
                    
                    {/* Customers */}
                    <Route path="customers" element={<AdminCustomersPage />} />
                    <Route path="customers/reviews" element={<AdminReviewsPage />} />
                    <Route path="customers/loyalty" element={<AdminLoyaltyPage />} />
                    
                    {/* Staff */}
                    <Route path="staff" element={<AdminStaffPage />} />
                    <Route path="staff/schedules" element={<AdminSchedulesPage />} />
                    <Route path="staff/roles" element={<AdminRolesPage />} />
                    
                    {/* Reports */}
                    <Route path="reports" element={<AdminReportsPage />} />
                    <Route path="reports/sales" element={<AdminSalesPage />} />
                    
                    {/* Content */}
                    <Route path="gallery" element={<AdminGalleryPage />} />
                    <Route path="content/events" element={<AdminEventsPage />} />
                    <Route path="content/promotions" element={<AdminPromotionsPage />} />
                    
                    {/* Settings */}
                    <Route path="settings" element={<AdminSettingsPage />} />
                    <Route path="settings/users" element={<AdminUsersPage />} />
                    <Route path="settings/integrations" element={<AdminIntegrationsPage />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
