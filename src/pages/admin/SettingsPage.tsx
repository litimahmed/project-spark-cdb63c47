import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Save, Clock, Phone, MapPin, Info, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface Hours {
  [key: string]: {
    open?: string;
    close?: string;
    dinner_open?: string;
    dinner_close?: string;
    closed?: boolean;
  };
}

interface Contact {
  phone: string;
  email: string;
  address: string;
}

interface About {
  title: string;
  description: string;
}

const DAYS = [
  { key: 'monday', label: 'Lundi' },
  { key: 'tuesday', label: 'Mardi' },
  { key: 'wednesday', label: 'Mercredi' },
  { key: 'thursday', label: 'Jeudi' },
  { key: 'friday', label: 'Vendredi' },
  { key: 'saturday', label: 'Samedi' },
  { key: 'sunday', label: 'Dimanche' },
];

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [hours, setHours] = useState<Hours>({});
  const [contact, setContact] = useState<Contact>({ phone: '', email: '', address: '' });
  const [about, setAbout] = useState<About>({ title: '', description: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('restaurant_settings')
        .select('*');

      if (error) {
        toast.error('Erreur lors du chargement des paramètres');
      } else if (data) {
        data.forEach((setting) => {
          switch (setting.key) {
            case 'hours':
              setHours(setting.value as unknown as Hours);
              break;
            case 'contact':
              setContact(setting.value as unknown as Contact);
              break;
            case 'about':
              setAbout(setting.value as unknown as About);
              break;
          }
        });
      }

      setLoading(false);
    };

    fetchSettings();
  }, []);

  const saveSetting = async (key: string, value: unknown) => {
    setSaving(true);

    const { error } = await supabase
      .from('restaurant_settings')
      .update({ value: JSON.parse(JSON.stringify(value)) })
      .eq('key', key);

    if (error) {
      toast.error('Erreur lors de la sauvegarde');
    } else {
      toast.success('Paramètres sauvegardés');
    }

    setSaving(false);
  };

  const updateHour = (day: string, field: string, value: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const toggleDayClosed = (day: string, closed: boolean) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        closed
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Paramètres | Admin - Maison le Sept</title>
        <meta name="description" content="Paramètres du restaurant Maison le Sept" />
      </Helmet>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Paramètres</h1>
            <p className="text-gray-500 text-sm">Configurez les informations de votre restaurant</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="hours" className="space-y-6">
        <TabsList className="bg-white border border-gray-100 shadow-sm p-1 rounded-xl">
          <TabsTrigger 
            value="hours" 
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <Clock className="w-4 h-4" />
            Horaires
          </TabsTrigger>
          <TabsTrigger 
            value="contact" 
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <Phone className="w-4 h-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger 
            value="about" 
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <Info className="w-4 h-4" />
            À propos
          </TabsTrigger>
        </TabsList>

        {/* Hours Tab */}
        <TabsContent value="hours">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Horaires d'ouverture</h2>
            <div className="space-y-6">
              {DAYS.map((day) => {
                const dayHours = hours[day.key] || {};
                const isClosed = dayHours.closed;

                return (
                  <div key={day.key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{day.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Fermé</span>
                        <Switch
                          checked={isClosed}
                          onCheckedChange={(checked) => toggleDayClosed(day.key, checked)}
                        />
                      </div>
                    </div>
                    {!isClosed && (
                      <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-blue-200">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <Label className="text-xs text-gray-500">Déjeuner</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              type="time"
                              value={dayHours.open || '12:00'}
                              onChange={(e) => updateHour(day.key, 'open', e.target.value)}
                              className="w-full border-gray-200 bg-white"
                            />
                            <span className="text-gray-400">-</span>
                            <Input
                              type="time"
                              value={dayHours.close || '14:30'}
                              onChange={(e) => updateHour(day.key, 'close', e.target.value)}
                              className="w-full border-gray-200 bg-white"
                            />
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <Label className="text-xs text-gray-500">Dîner</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              type="time"
                              value={dayHours.dinner_open || '19:00'}
                              onChange={(e) => updateHour(day.key, 'dinner_open', e.target.value)}
                              className="w-full border-gray-200 bg-white"
                            />
                            <span className="text-gray-400">-</span>
                            <Input
                              type="time"
                              value={dayHours.dinner_close || '22:30'}
                              onChange={(e) => updateHour(day.key, 'dinner_close', e.target.value)}
                              className="w-full border-gray-200 bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button 
                onClick={() => saveSetting('hours', hours)} 
                disabled={saving}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder les horaires'}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Informations de contact</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <Label htmlFor="phone" className="text-gray-700">Téléphone</Label>
                <Input
                  id="phone"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="+33 1 23 45 67 89"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="contact@maisonlesept.fr"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-gray-700">Adresse</Label>
                <Textarea
                  id="address"
                  value={contact.address}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  placeholder="7 Rue de la Gastronomie, 75001 Paris"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button 
                onClick={() => saveSetting('contact', contact)} 
                disabled={saving}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder les contacts'}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">À propos du restaurant</h2>
            <div className="space-y-4 max-w-2xl">
              <div>
                <Label htmlFor="about-title" className="text-gray-700">Titre</Label>
                <Input
                  id="about-title"
                  value={about.title}
                  onChange={(e) => setAbout({ ...about, title: e.target.value })}
                  placeholder="Notre Histoire"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="about-description" className="text-gray-700">Description</Label>
                <Textarea
                  id="about-description"
                  value={about.description}
                  onChange={(e) => setAbout({ ...about, description: e.target.value })}
                  placeholder="Décrivez votre restaurant..."
                  rows={6}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button 
                onClick={() => saveSetting('about', about)} 
                disabled={saving}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SettingsPage;
