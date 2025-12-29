import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp,
  Plus,
  UtensilsCrossed,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Star,
  ArrowUpRight,
  Utensils,
  DollarSign,
  Activity
} from 'lucide-react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Hardcoded data
const todayStats = {
  reservations: 24,
  guests: 68,
  pendingConfirmations: 3,
  tables: 18
};

const weeklyData = {
  percentChange: 12,
  series: [18, 22, 20, 28, 24, 32, 24],
  guestsTrend: [45, 52, 48, 62, 58, 72, 68]
};

const pendingActions = [
  { id: 1, type: 'Confirmation requise', name: 'Martin L.', time: '19:00', guests: 4, urgent: true },
  { id: 2, type: 'Confirmation requise', name: 'Dubois M.', time: '20:30', guests: 2, urgent: true },
  { id: 3, type: 'Demande spéciale', name: 'Bernard P.', time: '19:30', guests: 6, urgent: false }
];

const upcomingReservations = [
  { id: 1, name: 'Sophie Martin', time: '12:00', guests: 2, status: 'confirmed' },
  { id: 2, name: 'Pierre Durand', time: '12:30', guests: 4, status: 'confirmed' },
  { id: 3, name: 'Marie Claire', time: '13:00', guests: 3, status: 'pending' },
  { id: 4, name: 'Jean Dupont', time: '13:30', guests: 2, status: 'confirmed' }
];

const performanceStats = {
  capacity: 78,
  avgCovers: 42,
  weeklyRevenue: 8450,
  satisfaction: 92
};

const galleryImages = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop'
];

const featuredDish = {
  name: 'Filet de Bœuf Wellington',
  description: 'Notre chef vous recommande',
  price: '€48',
  image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop'
};

// Mini sparkline component
const MiniSparkline = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 24;
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Guest dots component
const GuestDots = ({ count, max = 6 }: { count: number, max?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <div 
        key={i} 
        className={`w-1.5 h-1.5 rounded-full transition-all ${
          i < count ? 'bg-current' : 'bg-current/20'
        }`}
      />
    ))}
  </div>
);

// Glowing gauge component for premium performance card
const GlowingGauge = ({ 
  value, 
  label,
  icon: Icon,
  color,
  glowColor,
  size = 100
}: { 
  value: number | string, 
  label: string,
  icon: React.ElementType,
  color: string,
  glowColor: string,
  size?: number
}) => {
  const numValue = typeof value === 'string' ? parseInt(value) : value;
  const radius = (size - 10) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (numValue / 100) * circumference;
  const outerRadius = (size - 4) / 2;

  return (
    <div className="flex flex-col items-center group">
      <div className="relative">
        {/* Outer glow ring */}
        <div 
          className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
        />
        
        <svg width={size} height={size} className="-rotate-90 relative z-10">
          {/* Outer decorative ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={outerRadius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          {/* Track ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="6"
          />
          {/* Progress ring with gradient effect */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{ 
              filter: `drop-shadow(0 0 8px ${glowColor})`,
            }}
          />
          {/* Inner subtle ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - 12}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <Icon className="h-4 w-4 text-white/60 mb-1" />
          <span className="text-xl font-bold text-white">{value}{typeof value === 'number' && '%'}</span>
        </div>
      </div>
      <p className="text-xs text-white/70 mt-3 font-medium">{label}</p>
    </div>
  );
};

// Revenue sparkline for performance card
const RevenueSparkline = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 40;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height * 0.8 - 4;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className="opacity-80">
      <defs>
        <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill="url(#revenueGradient)"
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const DashboardPage = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';
  const isOpen = currentHour >= 11 && currentHour < 23;
  const today = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  const areaChartOptions: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      sparkline: { enabled: false },
      parentHeightOffset: 0,
      animations: {
        enabled: true,
        speed: 800
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.05,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: 'hsl(46, 95%, 58%)', opacity: 0.4 },
          { offset: 50, color: 'hsl(46, 95%, 58%)', opacity: 0.2 },
          { offset: 100, color: 'hsl(46, 95%, 58%)', opacity: 0 }
        ]
      }
    },
    colors: ['hsl(46, 95%, 58%)'],
    xaxis: {
      categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      labels: { style: { colors: 'hsl(var(--muted-foreground))', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { show: false },
    grid: { 
      show: true,
      borderColor: 'hsl(var(--border))',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 0, right: 0, bottom: 0, left: 0 }
    },
    dataLabels: { enabled: false },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val) => `${val} réservations` }
    },
    markers: {
      size: 0,
      hover: { size: 6 }
    }
  };

  // Color configurations for stat cards
  const statConfigs = [
    { 
      label: 'Réservations', 
      value: todayStats.reservations, 
      icon: Calendar, 
      trend: '+12%',
      trendUp: true,
      iconBg: 'bg-white/20 backdrop-blur-sm',
      iconColor: 'text-white',
      sparkData: weeklyData.series,
      sparkColor: '#ffffff',
      bgImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
      overlayColor: 'from-amber-600/90 via-amber-500/85 to-orange-500/80'
    },
    { 
      label: 'Couverts prévus', 
      value: todayStats.guests, 
      icon: Users,
      trend: '+8%',
      trendUp: true,
      iconBg: 'bg-white/20 backdrop-blur-sm',
      iconColor: 'text-white',
      sparkData: weeklyData.guestsTrend,
      sparkColor: '#ffffff',
      bgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
      overlayColor: 'from-emerald-600/90 via-emerald-500/85 to-teal-500/80'
    },
    { 
      label: 'Tables actives', 
      value: todayStats.tables, 
      icon: Utensils,
      trend: '75%',
      trendUp: true,
      iconBg: 'bg-white/20 backdrop-blur-sm',
      iconColor: 'text-white',
      sparkData: [14, 16, 15, 18, 17, 19, 18],
      sparkColor: '#ffffff',
      bgImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&h=400&fit=crop',
      overlayColor: 'from-blue-600/90 via-blue-500/85 to-indigo-500/80'
    },
    { 
      label: 'En attente', 
      value: todayStats.pendingConfirmations, 
      icon: AlertCircle,
      trend: 'urgent',
      trendUp: false,
      iconBg: 'bg-white/20 backdrop-blur-sm',
      iconColor: 'text-white',
      sparkData: [2, 4, 3, 5, 2, 4, 3],
      sparkColor: '#ffffff',
      bgImage: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&h=400&fit=crop',
      overlayColor: 'from-rose-600/90 via-rose-500/85 to-pink-500/80'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tableau de bord | Le Jardin Enchanté</title>
        <meta name="description" content="Tableau de bord administrateur du restaurant Le Jardin Enchanté" />
      </Helmet>

      <div className="space-y-6">
        {/* Hero Banner - Full Width */}
        <div className="relative h-52 md:h-64 rounded-3xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=600&fit=crop"
            alt="Restaurant interior"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium capitalize">{today}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-1 font-serif">
                  {greeting}, Chef
                </h1>
                <p className="text-white/60 mt-2 text-sm md:text-base max-w-md">
                  Prêt pour une nouvelle journée exceptionnelle au restaurant
                </p>
              </div>
              <Badge 
                className={`${isOpen 
                  ? 'bg-emerald-500/90 hover:bg-emerald-500 text-white' 
                  : 'bg-white/20 text-white/80'
                } rounded-full px-4 py-1.5 text-sm font-medium border-0 shadow-lg`}
              >
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isOpen ? 'bg-white animate-pulse' : 'bg-white/50'}`} />
                {isOpen ? 'Ouvert' : 'Fermé'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats Row with Background Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statConfigs.map((stat, i) => (
            <Card 
              key={i} 
              className="relative p-5 rounded-2xl border-0 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer min-h-[140px]"
            >
              {/* Background image */}
              <img 
                src={stat.bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.overlayColor}`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className={`h-12 w-12 rounded-2xl ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.trendUp 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white/20 text-white'
                  }`}>
                    {stat.trend}
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white tracking-tight drop-shadow-md">{stat.value}</p>
                    <p className="text-xs text-white/80 mt-1">{stat.label}</p>
                  </div>
                  <MiniSparkline data={stat.sparkData} color={stat.sparkColor} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-12 gap-5">
          {/* Featured Dish Card - 5 cols, tall */}
          <Card className="col-span-12 md:col-span-5 row-span-2 relative overflow-hidden rounded-3xl border-0 group cursor-pointer min-h-[380px]">
            <img 
              src={featuredDish.image}
              alt={featuredDish.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground border-0 rounded-full px-3 py-1 shadow-lg">
                <Sparkles className="h-3 w-3 mr-1.5" />
                Plat du jour
              </Badge>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <div className="flex items-center gap-1 mb-2">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white font-serif">{featuredDish.name}</h3>
              <p className="text-white/70 text-sm mt-1">{featuredDish.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-primary">{featuredDish.price}</span>
                <Button size="sm" className="rounded-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                  Voir détails <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Premium Performance Card with Background Image */}
          <Card className="col-span-12 md:col-span-7 relative overflow-hidden rounded-3xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group min-h-[320px]">
            {/* Background image */}
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark violet gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-violet-900/90 to-fuchsia-900/85" />
            {/* Subtle mesh pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(217, 70, 239, 0.3) 0%, transparent 50%)'
            }} />
            
            <div className="relative z-10 p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                    <Activity className="h-5 w-5 text-violet-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Performance</h3>
                    <p className="text-xs text-white/50">Métriques en temps réel</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full px-3 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 inline-block" />
                  Live
                </Badge>
              </div>
              
              {/* Main content - Split layout */}
              <div className="flex-1 grid grid-cols-2 gap-6">
                {/* Revenue Hero Card - Left */}
                <div className="flex flex-col justify-center p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                      <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs text-white/60 font-medium">Revenu hebdomadaire</span>
                  </div>
                  
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-white tracking-tight">€{performanceStats.weeklyRevenue.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-0 rounded-full text-xs px-2 py-0.5">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15.2%
                    </Badge>
                    <span className="text-xs text-white/40">vs semaine dernière</span>
                  </div>
                  
                  <RevenueSparkline 
                    data={[6200, 7100, 6800, 7500, 8100, 7800, 8450]} 
                    color="#a78bfa" 
                  />
                </div>
                
                {/* Gauges - Right */}
                <div className="flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <GlowingGauge 
                      value={performanceStats.capacity}
                      label="Occupation"
                      icon={Users}
                      color="#a78bfa"
                      glowColor="rgba(167, 139, 250, 0.6)"
                      size={85}
                    />
                    <GlowingGauge 
                      value={performanceStats.avgCovers}
                      label="Couverts"
                      icon={Utensils}
                      color="#34d399"
                      glowColor="rgba(52, 211, 153, 0.6)"
                      size={85}
                    />
                    <GlowingGauge 
                      value={performanceStats.satisfaction}
                      label="Satisfaction"
                      icon={Star}
                      color="#fbbf24"
                      glowColor="rgba(251, 191, 36, 0.6)"
                      size={85}
                    />
                    <GlowingGauge 
                      value={85}
                      label="Efficacité"
                      icon={TrendingUp}
                      color="#f472b6"
                      glowColor="rgba(244, 114, 182, 0.6)"
                      size={85}
                    />
                  </div>
                </div>
              </div>
              
              {/* Bottom mini stats strip */}
              <div className="mt-5 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 px-3 border-r border-white/10">
                    <span className="text-lg font-bold text-white">€35</span>
                    <span className="text-xs text-white/50">Ticket moyen</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 border-r border-white/10">
                    <span className="text-lg font-bold text-white">20:00</span>
                    <span className="text-xs text-white/50">Heure de pointe</span>
                  </div>
                  <div className="flex items-center gap-2 px-3">
                    <span className="text-lg font-bold text-white">4.2</span>
                    <span className="text-xs text-white/50">Tables/heure</span>
                  </div>
                </div>
                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-full text-xs backdrop-blur-sm">
                  Voir rapport <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Actions en attente - Clean Professional Queue */}
          <Card className="col-span-12 md:col-span-7 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Actions en attente</h3>
                  <p className="text-xs text-muted-foreground">Nécessitent votre attention</p>
                </div>
              </div>
              {pendingActions.filter(a => a.urgent).length > 0 && (
                <Badge variant="destructive" className="rounded-full px-3 font-medium">
                  {pendingActions.filter(a => a.urgent).length} urgent{pendingActions.filter(a => a.urgent).length > 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            {/* Urgent Section */}
            {pendingActions.filter(a => a.urgent).length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-destructive uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                  Urgent
                </p>
                <div className="space-y-2">
                  {pendingActions.filter(a => a.urgent).map((action) => (
                    <div 
                      key={action.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-destructive/5 hover:bg-destructive/10 transition-colors cursor-pointer group border-l-2 border-destructive"
                    >
                      {/* Time */}
                      <div className="w-14 text-center">
                        <p className="text-sm font-bold text-foreground tabular-nums">{action.time}</p>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{action.name}</p>
                        <p className="text-xs text-muted-foreground">{action.type}</p>
                      </div>
                      
                      {/* Guests */}
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">{action.guests}</span>
                      </div>
                      
                      {/* CTA */}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Confirmer
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pending Section */}
            {pendingActions.filter(a => !a.urgent).length > 0 && (
              <div>
                <p className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  À traiter
                </p>
                <div className="space-y-2">
                  {pendingActions.filter(a => !a.urgent).map((action) => (
                    <div 
                      key={action.id}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group border-l-2 border-amber-400"
                    >
                      {/* Time */}
                      <div className="w-14 text-center">
                        <p className="text-sm font-bold text-foreground tabular-nums">{action.time}</p>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{action.name}</p>
                        <p className="text-xs text-muted-foreground">{action.type}</p>
                      </div>
                      
                      {/* Guests */}
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">{action.guests}</span>
                      </div>
                      
                      {/* CTA */}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Voir
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer summary */}
            <div className="mt-5 pt-4 border-t flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-destructive">{pendingActions.filter(a => a.urgent).length}</span> urgente{pendingActions.filter(a => a.urgent).length !== 1 ? 's' : ''} · <span className="font-medium text-amber-600">{pendingActions.filter(a => !a.urgent).length}</span> à traiter · <span className="font-medium text-foreground">8</span> aujourd'hui
              </p>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 rounded-full text-xs">
                Voir tout <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </Card>

          {/* Quick Actions - Enhanced with mesh gradients */}
          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4">
            <Card className="relative p-6 rounded-2xl border-0 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group">
              {/* Mesh gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-amber-400/10 to-orange-500/20 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent opacity-50" />
              
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-primary/30 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Plus className="h-7 w-7 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Nouvelle</h4>
                <p className="text-sm text-muted-foreground mt-0.5">Réservation</p>
                <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>

            <Card className="relative p-6 rounded-2xl border-0 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group">
              {/* Mesh gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-400/10 to-cyan-500/20 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/30 via-transparent to-transparent opacity-50" />
              
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/30 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-lg">
                  <UtensilsCrossed className="h-7 w-7 text-emerald-500" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Gérer</h4>
                <p className="text-sm text-muted-foreground mt-0.5">Le menu</p>
                <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          </div>
        </div>

        {/* Second Bento Row */}
        <div className="grid grid-cols-12 gap-5">
          {/* Upcoming Reservations - Visual time blocks */}
          <Card className="col-span-12 lg:col-span-7 p-6 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-amber-500/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Prochaines réservations</h3>
                  <p className="text-xs text-muted-foreground">Service du midi</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 rounded-full">
                Voir tout <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            {/* Time slot blocks */}
            <div className="space-y-3">
              {upcomingReservations.map((res) => (
                <div 
                  key={res.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-card/80 hover:bg-card transition-all duration-200 cursor-pointer group border border-transparent hover:border-primary/20"
                >
                  {/* Visual time block */}
                  <div className={`h-14 w-20 rounded-xl ${
                    res.status === 'confirmed' 
                      ? 'bg-gradient-to-br from-primary/20 to-amber-500/10' 
                      : 'bg-gradient-to-br from-amber-500/20 to-orange-500/10'
                  } flex flex-col items-center justify-center`}>
                    <Clock className={`h-3.5 w-3.5 mb-0.5 ${res.status === 'confirmed' ? 'text-primary' : 'text-amber-500'}`} />
                    <p className={`text-sm font-bold ${res.status === 'confirmed' ? 'text-primary' : 'text-amber-500'}`}>{res.time}</p>
                  </div>
                  
                  {/* Avatar stack placeholder */}
                  <div className="flex -space-x-2">
                    {Array.from({ length: Math.min(res.guests, 3) }).map((_, i) => (
                      <div 
                        key={i} 
                        className="h-8 w-8 rounded-full bg-gradient-to-br from-muted to-muted/50 border-2 border-card flex items-center justify-center text-[10px] font-medium text-muted-foreground"
                      >
                        {res.name.charAt(0)}
                      </div>
                    ))}
                    {res.guests > 3 && (
                      <div className="h-8 w-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                        +{res.guests - 3}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{res.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                      <GuestDots count={res.guests} />
                      <span className="text-xs">{res.guests} personnes</span>
                    </div>
                  </div>
                  
                  <Badge 
                    className={`text-xs border-0 rounded-full ${
                      res.status === 'confirmed' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-amber-500/10 text-amber-600'
                    }`}
                  >
                    {res.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                  </Badge>
                  
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Chart - Enhanced */}
          <Card className="col-span-12 lg:col-span-5 p-5 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-primary/5 via-transparent to-amber-400/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-amber-500/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Tendance hebdomadaire</h3>
              </div>
              <Badge className="bg-muted text-muted-foreground border-0 rounded-full text-xs">Cette semaine</Badge>
            </div>
            <Chart
              options={areaChartOptions}
              series={[{ name: 'Réservations', data: weeklyData.series }]}
              type="area"
              height={180}
            />
          </Card>
        </div>

        {/* Third Row: Gallery */}
        <div className="grid grid-cols-12 gap-5">
          {/* Gallery Preview - Bento Style */}
          <Card className="col-span-12 p-5 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-violet-500/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-fuchsia-500" />
                </div>
                <h3 className="font-semibold text-foreground">Galerie</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 rounded-full h-8 text-xs">
                Gérer <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden aspect-square group cursor-pointer">
                <img 
                  src={galleryImages[0]} 
                  alt="Gallery featured"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">Featured</Badge>
                </div>
              </div>
              {galleryImages.slice(1).map((img, i) => (
                <div 
                  key={i}
                  className="relative rounded-xl overflow-hidden aspect-square group cursor-pointer"
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${i + 2}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              ))}
              {/* Add more placeholder */}
              <div className="relative rounded-xl overflow-hidden aspect-square group cursor-pointer bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <Plus className="h-8 w-8 text-muted-foreground group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
