import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
}

interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  is_featured: boolean;
  display_order: number;
}

const MenuPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
  // Category dialog
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', is_active: true });

  // Item dialog
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    price: '',
    is_available: true,
    is_featured: false
  });

  const fetchData = async () => {
    setLoading(true);
    
    const [categoriesRes, itemsRes] = await Promise.all([
      supabase.from('menu_categories').select('*').order('display_order'),
      supabase.from('menu_items').select('*').order('display_order')
    ]);

    if (categoriesRes.error) {
      toast.error('Erreur lors du chargement des catégories');
    } else {
      setCategories(categoriesRes.data || []);
    }

    if (itemsRes.error) {
      toast.error('Erreur lors du chargement des plats');
    } else {
      setMenuItems(itemsRes.data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Category CRUD
  const openCategoryDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({
        name: category.name,
        description: category.description || '',
        is_active: category.is_active
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: '', description: '', is_active: true });
    }
    setCategoryDialogOpen(true);
  };

  const saveCategory = async () => {
    if (!categoryForm.name.trim()) {
      toast.error('Le nom est requis');
      return;
    }

    if (editingCategory) {
      const { error } = await supabase
        .from('menu_categories')
        .update({
          name: categoryForm.name,
          description: categoryForm.description || null,
          is_active: categoryForm.is_active
        })
        .eq('id', editingCategory.id);

      if (error) {
        toast.error('Erreur lors de la mise à jour');
      } else {
        toast.success('Catégorie mise à jour');
        setCategoryDialogOpen(false);
        fetchData();
      }
    } else {
      const maxOrder = Math.max(0, ...categories.map(c => c.display_order));
      const { error } = await supabase
        .from('menu_categories')
        .insert({
          name: categoryForm.name,
          description: categoryForm.description || null,
          is_active: categoryForm.is_active,
          display_order: maxOrder + 1
        });

      if (error) {
        toast.error('Erreur lors de la création');
      } else {
        toast.success('Catégorie créée');
        setCategoryDialogOpen(false);
        fetchData();
      }
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Supprimer cette catégorie et tous ses plats ?')) return;

    const { error } = await supabase
      .from('menu_categories')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erreur lors de la suppression');
    } else {
      toast.success('Catégorie supprimée');
      fetchData();
    }
  };

  // Item CRUD
  const openItemDialog = (categoryId: string, item?: MenuItem) => {
    setSelectedCategoryId(categoryId);
    if (item) {
      setEditingItem(item);
      setItemForm({
        name: item.name,
        description: item.description || '',
        price: item.price.toString(),
        is_available: item.is_available,
        is_featured: item.is_featured
      });
    } else {
      setEditingItem(null);
      setItemForm({
        name: '',
        description: '',
        price: '',
        is_available: true,
        is_featured: false
      });
    }
    setItemDialogOpen(true);
  };

  const saveItem = async () => {
    if (!itemForm.name.trim() || !itemForm.price) {
      toast.error('Le nom et le prix sont requis');
      return;
    }

    const price = parseFloat(itemForm.price);
    if (isNaN(price) || price < 0) {
      toast.error('Prix invalide');
      return;
    }

    if (editingItem) {
      const { error } = await supabase
        .from('menu_items')
        .update({
          name: itemForm.name,
          description: itemForm.description || null,
          price,
          is_available: itemForm.is_available,
          is_featured: itemForm.is_featured
        })
        .eq('id', editingItem.id);

      if (error) {
        toast.error('Erreur lors de la mise à jour');
      } else {
        toast.success('Plat mis à jour');
        setItemDialogOpen(false);
        fetchData();
      }
    } else {
      const categoryItems = menuItems.filter(i => i.category_id === selectedCategoryId);
      const maxOrder = Math.max(0, ...categoryItems.map(i => i.display_order));
      
      const { error } = await supabase
        .from('menu_items')
        .insert({
          category_id: selectedCategoryId,
          name: itemForm.name,
          description: itemForm.description || null,
          price,
          is_available: itemForm.is_available,
          is_featured: itemForm.is_featured,
          display_order: maxOrder + 1
        });

      if (error) {
        toast.error('Erreur lors de la création');
      } else {
        toast.success('Plat créé');
        setItemDialogOpen(false);
        fetchData();
      }
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Supprimer ce plat ?')) return;

    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erreur lors de la suppression');
    } else {
      toast.success('Plat supprimé');
      fetchData();
    }
  };

  const toggleItemAvailability = async (item: MenuItem) => {
    const { error } = await supabase
      .from('menu_items')
      .update({ is_available: !item.is_available })
      .eq('id', item.id);

    if (error) {
      toast.error('Erreur lors de la mise à jour');
    } else {
      fetchData();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Menu | Admin - Maison le Sept</title>
        <meta name="description" content="Gestion du menu Maison le Sept" />
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Menu</h1>
            <p className="text-muted-foreground text-sm">Gérez les catégories et les plats</p>
          </div>
        </div>
        <Button 
          onClick={() => openCategoryDialog()}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.length === 0 ? (
          <div className="bg-card rounded-xl border border-border shadow-sm p-12 text-center">
            <UtensilsCrossed className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Aucune catégorie de menu</p>
            <Button 
              onClick={() => openCategoryDialog()}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer une catégorie
            </Button>
          </div>
        ) : (
          categories.map((category) => {
            const categoryItems = menuItems.filter(i => i.category_id === category.id);
            const isExpanded = expandedCategories.has(category.id);

            return (
              <div key={category.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                {/* Category Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      isExpanded ? "bg-primary/10" : "bg-muted"
                    )}>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className={cn(
                        "font-medium text-foreground",
                        !category.is_active && "text-muted-foreground line-through"
                      )}>
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2 px-2 py-0.5 bg-muted rounded-full">
                      {categoryItems.length} plat{categoryItems.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={() => openCategoryDialog(category)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Category Items */}
                {isExpanded && (
                  <div className="border-t border-border">
                    {categoryItems.length === 0 ? (
                      <div className="p-8 text-center bg-muted/30">
                        <p className="text-muted-foreground mb-4">Aucun plat dans cette catégorie</p>
                        <Button 
                          variant="outline" 
                          onClick={() => openItemDialog(category.id)}
                          className="border-border"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter un plat
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="divide-y divide-border/50">
                          {categoryItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <div className={cn(!item.is_available && "opacity-50")}>
                                  <p className="font-medium text-foreground">{item.name}</p>
                                  {item.description && (
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-primary font-semibold">
                                  {item.price.toFixed(2)} €
                                </span>
                                <Switch
                                  checked={item.is_available}
                                  onCheckedChange={() => toggleItemAvailability(item)}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-muted-foreground hover:text-foreground hover:bg-muted"
                                  onClick={() => openItemDialog(category.id, item)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  onClick={() => deleteItem(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 border-t border-border bg-muted/30">
                          <Button 
                            variant="outline" 
                            onClick={() => openItemDialog(category.id)}
                            className="border-border"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Ajouter un plat
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category-name" className="text-foreground">Nom</Label>
              <Input
                id="category-name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                placeholder="Ex: Entrées"
                className="border-border focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="category-description" className="text-foreground">Description</Label>
              <Textarea
                id="category-description"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                placeholder="Description optionnelle"
                className="border-border focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="category-active" className="text-foreground">Active</Label>
              <Switch
                id="category-active"
                checked={categoryForm.is_active}
                onCheckedChange={(checked) => setCategoryForm({ ...categoryForm, is_active: checked })}
              />
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              onClick={saveCategory}
            >
              {editingCategory ? 'Enregistrer' : 'Créer'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Item Dialog */}
      <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingItem ? 'Modifier le plat' : 'Nouveau plat'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="item-name" className="text-foreground">Nom</Label>
              <Input
                id="item-name"
                value={itemForm.name}
                onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                placeholder="Ex: Salade César"
                className="border-border focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="item-description" className="text-foreground">Description</Label>
              <Textarea
                id="item-description"
                value={itemForm.description}
                onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                placeholder="Description du plat"
                className="border-border focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="item-price" className="text-foreground">Prix (€)</Label>
              <Input
                id="item-price"
                type="number"
                step="0.01"
                min="0"
                value={itemForm.price}
                onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                placeholder="12.50"
                className="border-border focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="item-available" className="text-foreground">Disponible</Label>
              <Switch
                id="item-available"
                checked={itemForm.is_available}
                onCheckedChange={(checked) => setItemForm({ ...itemForm, is_available: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="item-featured" className="text-foreground">Mis en avant</Label>
              <Switch
                id="item-featured"
                checked={itemForm.is_featured}
                onCheckedChange={(checked) => setItemForm({ ...itemForm, is_featured: checked })}
              />
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              onClick={saveItem}
            >
              {editingItem ? 'Enregistrer' : 'Créer'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuPage;
