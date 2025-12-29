import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2, Eye, EyeOff, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface GalleryImage {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const GalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState({ title: '', description: '', is_active: true });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order');

    if (error) {
      toast.error('Erreur lors du chargement de la galerie');
    } else {
      setImages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 5 Mo');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const openDialog = (image?: GalleryImage) => {
    if (image) {
      setEditingImage(image);
      setForm({
        title: image.title || '',
        description: image.description || '',
        is_active: image.is_active
      });
      setPreviewUrl(image.image_url);
    } else {
      setEditingImage(null);
      setForm({ title: '', description: '', is_active: true });
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setDialogOpen(true);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `gallery/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('restaurant-images')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('restaurant-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const saveImage = async () => {
    if (!editingImage && !selectedFile) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    setUploading(true);

    try {
      let imageUrl = editingImage?.image_url;

      if (selectedFile) {
        const url = await uploadImage(selectedFile);
        if (!url) {
          toast.error('Erreur lors de l\'upload');
          setUploading(false);
          return;
        }
        imageUrl = url;
      }

      if (editingImage) {
        const { error } = await supabase
          .from('gallery_images')
          .update({
            title: form.title || null,
            description: form.description || null,
            is_active: form.is_active,
            ...(imageUrl !== editingImage.image_url && { image_url: imageUrl })
          })
          .eq('id', editingImage.id);

        if (error) throw error;
        toast.success('Image mise à jour');
      } else {
        const maxOrder = Math.max(0, ...images.map(i => i.display_order));
        const { error } = await supabase
          .from('gallery_images')
          .insert({
            title: form.title || null,
            description: form.description || null,
            image_url: imageUrl,
            is_active: form.is_active,
            display_order: maxOrder + 1
          });

        if (error) throw error;
        toast.success('Image ajoutée');
      }

      setDialogOpen(false);
      fetchImages();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Erreur lors de l\'enregistrement');
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (image: GalleryImage) => {
    if (!confirm('Supprimer cette image ?')) return;

    // Extract path from URL
    const urlParts = image.image_url.split('/');
    const path = urlParts.slice(-2).join('/');

    // Delete from storage
    await supabase.storage
      .from('restaurant-images')
      .remove([path]);

    // Delete from database
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', image.id);

    if (error) {
      toast.error('Erreur lors de la suppression');
    } else {
      toast.success('Image supprimée');
      fetchImages();
    }
  };

  const toggleVisibility = async (image: GalleryImage) => {
    const { error } = await supabase
      .from('gallery_images')
      .update({ is_active: !image.is_active })
      .eq('id', image.id);

    if (error) {
      toast.error('Erreur lors de la mise à jour');
    } else {
      fetchImages();
    }
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
        <title>Galerie | Admin - Maison le Sept</title>
        <meta name="description" content="Gestion de la galerie Maison le Sept" />
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Galerie</h1>
            <p className="text-gray-500 text-sm">Gérez les images de votre galerie</p>
          </div>
        </div>
        <Button 
          onClick={() => openDialog()}
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une image
        </Button>
      </div>

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Aucune image dans la galerie</p>
          <Button 
            onClick={() => openDialog()}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une image
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className={cn(
                "group relative aspect-square bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow",
                !image.is_active && "opacity-60"
              )}
            >
              <img
                src={image.image_url}
                alt={image.title || 'Gallery image'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {image.title && (
                    <p className="text-white font-medium text-sm truncate mb-2">{image.title}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-0"
                      onClick={() => openDialog(image)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={() => toggleVisibility(image)}
                    >
                      {image.is_active ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-red-500/50"
                      onClick={() => deleteImage(image)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              {!image.is_active && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 rounded-full text-xs text-white">
                  Masquée
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">
              {editingImage ? 'Modifier l\'image' : 'Ajouter une image'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Upload Zone */}
            <div
              className={cn(
                "relative border-2 border-dashed rounded-xl p-4 transition-colors",
                dragOver ? "border-pink-500 bg-pink-50" : "border-gray-200",
                previewUrl ? "aspect-video" : "aspect-square flex items-center justify-center"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 bg-white shadow-md"
                    onClick={() => {
                      setPreviewUrl(editingImage?.image_url || null);
                      setSelectedFile(null);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <div className="text-center">
                  <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm mb-2">
                    Glissez une image ou
                  </p>
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file);
                      }}
                    />
                    <Button variant="outline" size="sm" asChild className="border-gray-200">
                      <span>Parcourir</span>
                    </Button>
                  </label>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="image-title" className="text-gray-700">Titre (optionnel)</Label>
              <Input
                id="image-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Titre de l'image"
                className="border-gray-200 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
            <div>
              <Label htmlFor="image-description" className="text-gray-700">Description (optionnel)</Label>
              <Textarea
                id="image-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description de l'image"
                className="border-gray-200 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="image-active" className="text-gray-700">Visible</Label>
              <Switch
                id="image-active"
                checked={form.is_active}
                onCheckedChange={(checked) => setForm({ ...form, is_active: checked })}
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700" 
              onClick={saveImage} 
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Upload en cours...
                </>
              ) : editingImage ? (
                'Enregistrer'
              ) : (
                'Ajouter'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryPage;
