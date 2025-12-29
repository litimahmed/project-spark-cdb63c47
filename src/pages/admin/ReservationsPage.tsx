import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format, isToday, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarDays,
  Clock,
  Users,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Check,
  X,
  Eye,
  Trash2,
  Phone,
  Mail,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  AlertCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  date: string;
  time: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  special_requests: string | null;
  occasion: string | null;
  notes: string | null;
  created_at: string;
}

const ITEMS_PER_PAGE = 10;

const ReservationsPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState<string | null>(null);

  // Stats
  const [todayCount, setTodayCount] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const fetchStats = async () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const weekStart = format(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd");

    const [todayRes, weekRes, pendingRes] = await Promise.all([
      supabase.from("reservations").select("id", { count: "exact" }).eq("date", today),
      supabase.from("reservations").select("id", { count: "exact" }).gte("date", weekStart),
      supabase.from("reservations").select("id", { count: "exact" }).eq("status", "pending"),
    ]);

    setTodayCount(todayRes.count || 0);
    setWeekCount(weekRes.count || 0);
    setPendingCount(pendingRes.count || 0);
  };

  const fetchReservations = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("reservations")
        .select("*", { count: "exact" })
        .order("date", { ascending: false })
        .order("time", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as "pending" | "confirmed" | "cancelled" | "completed");
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
      }

      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      setReservations(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error("Erreur lors du chargement des réservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [statusFilter, searchQuery, currentPage]);

  const updateStatus = async (id: string, status: "confirmed" | "cancelled" | "completed") => {
    try {
      const { error } = await supabase
        .from("reservations")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Réservation ${status === "confirmed" ? "confirmée" : status === "cancelled" ? "annulée" : "complétée"}`);
      fetchReservations();
      fetchStats();
      setSheetOpen(false);
    } catch (error) {
      console.error("Error updating reservation:", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const deleteReservation = async (id: string) => {
    try {
      const { error } = await supabase.from("reservations").delete().eq("id", id);

      if (error) throw error;

      toast.success("Réservation supprimée");
      fetchReservations();
      fetchStats();
      setDeleteDialogOpen(false);
      setSheetOpen(false);
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          label: "Confirmée",
          className: "bg-primary/10 text-primary border-primary/20",
          icon: Check,
        };
      case "pending":
        return {
          label: "En attente",
          className: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
          icon: Clock,
        };
      case "cancelled":
        return {
          label: "Annulée",
          className: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800",
          icon: X,
        };
      case "completed":
        return {
          label: "Terminée",
          className: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
          icon: CalendarCheck,
        };
      default:
        return {
          label: status,
          className: "bg-muted text-muted-foreground",
          icon: Clock,
        };
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const openReservationDetail = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setSheetOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Toutes les Réservations | Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header with Stats Strip */}
        <div className="grid grid-cols-12 gap-5">
          {/* Page Header */}
          <div className="col-span-12 lg:col-span-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Toutes les Réservations</h1>
                <p className="text-muted-foreground mt-1">
                  Gérez et suivez toutes vos réservations • {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-3 gap-3">
              {/* Today */}
              <Card className="rounded-2xl border border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Aujourd'hui</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{todayCount}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-primary/10">
                      <CalendarCheck className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* This Week */}
              <Card className="rounded-2xl border border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cette semaine</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{weekCount}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-500/10">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending */}
              <Card className={`rounded-2xl border bg-card ${pendingCount > 0 ? "border-amber-300 dark:border-amber-700" : "border-border"}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">En attente</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{pendingCount}</p>
                    </div>
                    <div className={`p-2 rounded-xl ${pendingCount > 0 ? "bg-amber-100 dark:bg-amber-900/50" : "bg-muted"}`}>
                      <AlertCircle className={`h-5 w-5 ${pendingCount > 0 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <Card className="rounded-2xl border border-border bg-card">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom ou email..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 rounded-xl border-border bg-background"
                  />
                </div>

                {/* Status Filter */}
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-border">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="confirmed">Confirmée</SelectItem>
                    <SelectItem value="cancelled">Annulée</SelectItem>
                    <SelectItem value="completed">Terminée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Add Button */}
              <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Plus className="h-4 w-4" />
                Nouvelle Réservation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Table */}
        <Card className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold text-foreground">Client</TableHead>
                  <TableHead className="font-semibold text-foreground">Réservation</TableHead>
                  <TableHead className="font-semibold text-foreground">Statut</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={4}>
                        <div className="h-16 bg-muted/30 rounded-lg animate-pulse" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : reservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-40">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="p-4 rounded-full bg-muted/50 mb-4">
                          <Sparkles className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">Aucune réservation</h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          {searchQuery || statusFilter !== "all"
                            ? "Aucune réservation ne correspond à vos critères de recherche."
                            : "Vous n'avez pas encore de réservations. Elles apparaîtront ici."}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  reservations.map((reservation) => {
                    const statusConfig = getStatusConfig(reservation.status);
                    const StatusIcon = statusConfig.icon;
                    const reservationDate = parseISO(reservation.date);
                    const isTodayReservation = isToday(reservationDate);

                    return (
                      <TableRow
                        key={reservation.id}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => openReservationDetail(reservation)}
                      >
                        {/* Client */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                              {getInitials(reservation.name)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{reservation.name}</p>
                              <p className="text-sm text-muted-foreground">{reservation.email}</p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Reservation Details */}
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5 text-foreground">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                <span className={`font-medium ${isTodayReservation ? "text-primary" : ""}`}>
                                  {isTodayReservation ? "Aujourd'hui" : format(reservationDate, "d MMM yyyy", { locale: fr })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-foreground">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold">{reservation.time.slice(0, 5)}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-foreground">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{reservation.guests} pers.</span>
                              </div>
                            </div>
                            {reservation.occasion && (
                              <Badge variant="outline" className="w-fit text-xs rounded-full">
                                {reservation.occasion}
                              </Badge>
                            )}
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Badge className={`${statusConfig.className} border rounded-full px-3 py-1 font-medium gap-1.5`}>
                            <StatusIcon className="h-3.5 w-3.5" />
                            {statusConfig.label}
                          </Badge>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right">
                          <TooltipProvider>
                            <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                              {reservation.status === "pending" && (
                                <>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-lg text-primary hover:bg-primary/10"
                                        onClick={() => updateStatus(reservation.id, "confirmed")}
                                      >
                                        <Check className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Confirmer</TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-lg text-red-500 hover:bg-red-500/10"
                                        onClick={() => updateStatus(reservation.id, "cancelled")}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Annuler</TooltipContent>
                                  </Tooltip>
                                </>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem onClick={() => openReservationDetail(reservation)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Voir détails
                                  </DropdownMenuItem>
                                  {reservation.status === "confirmed" && (
                                    <DropdownMenuItem onClick={() => updateStatus(reservation.id, "completed")}>
                                      <CalendarCheck className="h-4 w-4 mr-2" />
                                      Marquer terminée
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600"
                                    onClick={() => {
                                      setReservationToDelete(reservation.id);
                                      setDeleteDialogOpen(true);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Affichage de {(currentPage - 1) * ITEMS_PER_PAGE + 1} à{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} sur {totalCount} réservations
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-3">
                  Page {currentPage} sur {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedReservation && (
            <>
              <SheetHeader className="space-y-4 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {getInitials(selectedReservation.name)}
                  </div>
                  <div className="flex-1">
                    <SheetTitle className="text-xl">{selectedReservation.name}</SheetTitle>
                    <Badge className={`${getStatusConfig(selectedReservation.status).className} border rounded-full mt-2`}>
                      {getStatusConfig(selectedReservation.status).label}
                    </Badge>
                  </div>
                </div>
              </SheetHeader>

              <div className="py-6 space-y-6">
                {/* Contact Info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contact</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedReservation.email}</span>
                    </div>
                    {selectedReservation.phone && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedReservation.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Détails de la réservation</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <CalendarDays className="h-4 w-4" />
                        <span className="text-xs uppercase">Date</span>
                      </div>
                      <p className="font-semibold text-foreground">
                        {format(parseISO(selectedReservation.date), "d MMMM yyyy", { locale: fr })}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs uppercase">Heure</span>
                      </div>
                      <p className="font-semibold text-foreground">{selectedReservation.time.slice(0, 5)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-xs uppercase">Couverts</span>
                      </div>
                      <p className="font-semibold text-foreground">{selectedReservation.guests} personnes</p>
                    </div>
                    {selectedReservation.occasion && (
                      <div className="p-4 rounded-xl bg-muted/50">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-xs uppercase">Occasion</span>
                        </div>
                        <p className="font-semibold text-foreground">{selectedReservation.occasion}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Special Requests */}
                {selectedReservation.special_requests && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Demandes spéciales</h3>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm text-foreground">{selectedReservation.special_requests}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedReservation.notes && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notes internes</h3>
                    <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/50 dark:bg-amber-950/30 dark:border-amber-800/50">
                      <p className="text-sm text-foreground">{selectedReservation.notes}</p>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Historique</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <p className="text-sm text-muted-foreground">
                        Créée le {format(parseISO(selectedReservation.created_at), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-border space-y-3">
                {selectedReservation.status === "pending" && (
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="rounded-xl bg-primary hover:bg-primary/90"
                      onClick={() => updateStatus(selectedReservation.id, "confirmed")}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Confirmer
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
                      onClick={() => updateStatus(selectedReservation.id, "cancelled")}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                  </div>
                )}
                {selectedReservation.status === "confirmed" && (
                  <Button
                    className="w-full rounded-xl"
                    variant="outline"
                    onClick={() => updateStatus(selectedReservation.id, "completed")}
                  >
                    <CalendarCheck className="h-4 w-4 mr-2" />
                    Marquer comme terminée
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="w-full rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={() => {
                    setReservationToDelete(selectedReservation.id);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer cette réservation
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette réservation ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La réservation sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl bg-red-600 hover:bg-red-700"
              onClick={() => reservationToDelete && deleteReservation(reservationToDelete)}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ReservationsPage;
