import { useState } from 'react';
import { Settings, Sun, Moon, Check, RotateCcw, Palette, Layout, Square, Columns, PanelLeft, CreditCard, Circle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  useAdminSettings,
  ThemeColor,
} from '@/contexts/AdminSettingsContext';

const themeColors: { id: ThemeColor; color: string; label: string }[] = [
  { id: 'gold', color: 'bg-[#D4AF37]', label: 'Or' },
  { id: 'burgundy', color: 'bg-[#722F37]', label: 'Bordeaux' },
  { id: 'champagne', color: 'bg-[#D4AF8C]', label: 'Champagne' },
];

const SettingsPanel = () => {
  const { theme, setTheme } = useTheme();
  const {
    themeColor,
    direction,
    layoutType,
    containerType,
    sidebarType,
    cardStyle,
    borderRadius,
    setThemeColor,
    setDirection,
    setLayoutType,
    setContainerType,
    setSidebarType,
    setCardStyle,
    setBorderRadius,
    resetSettings,
  } = useAdminSettings();

  const [open, setOpen] = useState(false);

  // Dynamic positioning based on direction
  const buttonPosition = direction === 'rtl' ? 'left-6' : 'right-6';

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Floating Settings Button */}
      <SheetTrigger asChild>
        <button
          className={cn(
            "fixed bottom-6 z-50 w-11 h-11 bg-sidebar text-sidebar-foreground rounded-xl shadow-lg border border-sidebar-border transition-all duration-300 flex items-center justify-center hover:shadow-xl hover:scale-105 group",
            buttonPosition
          )}
        >
          <Settings className="w-5 h-5 text-sidebar-foreground/70 group-hover:text-primary transition-all duration-300 group-hover:rotate-90" />
        </button>
      </SheetTrigger>

      <SheetContent 
        side={direction === 'rtl' ? 'left' : 'right'} 
        className="w-80 sm:w-[340px] overflow-y-auto bg-sidebar border-l border-sidebar-border p-0"
      >
        {/* Header */}
        <SheetHeader className="p-5 pb-4 border-b border-sidebar-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                <Settings className="w-4.5 h-4.5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-sm font-semibold text-sidebar-foreground">Paramètres</SheetTitle>
                <p className="text-[11px] text-sidebar-foreground/50">Personnalisation</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetSettings}
              className="text-[11px] text-sidebar-foreground/60 hover:text-primary hover:bg-primary/10 h-8 px-2.5"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset
            </Button>
          </div>
        </SheetHeader>

        <div className="p-5 space-y-5">
          {/* Theme Mode */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-widest">
              <Sun className="w-3 h-3" />
              Apparence
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                  theme === 'light'
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <Sun className="w-3.5 h-3.5" />
                Clair
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                  theme === 'dark'
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <Moon className="w-3.5 h-3.5" />
                Sombre
              </button>
            </div>
          </section>

          <div className="h-px bg-sidebar-border/40" />

          {/* Direction */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-widest">
              <Columns className="w-3 h-3" />
              Direction
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDirection('ltr')}
                className={cn(
                  "py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                  direction === 'ltr'
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                LTR
              </button>
              <button
                onClick={() => setDirection('rtl')}
                className={cn(
                  "py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                  direction === 'rtl'
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                RTL
              </button>
            </div>
          </section>

          <div className="h-px bg-sidebar-border/40" />

          {/* Theme Colors */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-widest">
              <Palette className="w-3 h-3" />
              Couleur
            </div>
            <div className="flex gap-4">
              {themeColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setThemeColor(color.id)}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full transition-all flex items-center justify-center ring-2 ring-offset-2 ring-offset-sidebar",
                      color.color,
                      themeColor === color.id
                        ? "ring-primary scale-110"
                        : "ring-transparent group-hover:ring-sidebar-foreground/20 group-hover:scale-105"
                    )}
                  >
                    {themeColor === color.id && (
                      <Check className="w-4 h-4 text-white drop-shadow" />
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium transition-colors",
                    themeColor === color.id ? "text-primary" : "text-sidebar-foreground/50"
                  )}>
                    {color.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="h-px bg-sidebar-border/40" />

          {/* Layout Type */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-widest">
              <Layout className="w-3 h-3" />
              Mise en page
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLayoutType('vertical')}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                  layoutType === 'vertical'
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <PanelLeft className="w-3.5 h-3.5" />
                Vertical
              </button>
              <button
                onClick={() => setLayoutType('horizontal')}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                  layoutType === 'horizontal'
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <Layout className="w-3.5 h-3.5" />
                Horizontal
              </button>
            </div>
          </section>

          <div className="h-px bg-sidebar-border/40" />

          {/* Container Type */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-widest">
              <Square className="w-3 h-3" />
              Conteneur
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setContainerType('boxed')}
                className={cn(
                  "py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                  containerType === 'boxed'
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                Encadré
              </button>
              <button
                onClick={() => setContainerType('full')}
                className={cn(
                  "py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                  containerType === 'full'
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                Pleine largeur
              </button>
            </div>
          </section>

          {/* Sidebar Type - Only show for vertical layout */}
          {layoutType === 'vertical' && (
            <>
              <div className="h-px bg-sidebar-border/40" />
              <section className="space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-widest">
                  <PanelLeft className="w-3 h-3" />
                  Barre latérale
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSidebarType('full')}
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                      sidebarType === 'full'
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    Complète
                  </button>
                  <button
                    onClick={() => setSidebarType('mini')}
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                      sidebarType === 'mini'
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    Mini
                  </button>
                </div>
              </section>
            </>
          )}

          <div className="h-px bg-sidebar-border/40" />

          {/* Card Style */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-widest">
              <CreditCard className="w-3 h-3" />
              Style cartes
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCardStyle('border')}
                className={cn(
                  "py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                  cardStyle === 'border'
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                Bordure
              </button>
              <button
                onClick={() => setCardStyle('shadow')}
                className={cn(
                  "py-2.5 px-3 rounded-lg text-xs font-medium transition-all",
                  cardStyle === 'shadow'
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                Ombre
              </button>
            </div>
          </section>

          <div className="h-px bg-sidebar-border/40" />

          {/* Border Radius */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-widest">
                <Circle className="w-3 h-3" />
                Bordures
              </div>
              <span className="text-[11px] font-semibold text-primary bg-primary/15 px-2 py-0.5 rounded">
                {borderRadius}px
              </span>
            </div>
            <Slider
              value={[borderRadius]}
              onValueChange={(value) => setBorderRadius(value[0])}
              min={0}
              max={24}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-sidebar-foreground/40">
              <span>Carré</span>
              <span>Arrondi</span>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsPanel;
