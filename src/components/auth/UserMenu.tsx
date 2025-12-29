import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'À bientôt !',
      description: 'Vous avez été déconnecté.',
    });
    navigate('/');
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Utilisateur';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-offwhite/80 hover:text-offwhite transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
          <User className="w-4 h-4 text-gold" />
        </div>
        <span className="hidden md:block font-sans text-sm max-w-[120px] truncate">
          {displayName}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-charcoal border border-offwhite/10 shadow-xl z-50">
          <div className="p-3 border-b border-offwhite/10">
            <p className="text-offwhite text-sm font-medium truncate">{displayName}</p>
            <p className="text-offwhite/50 text-xs truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-offwhite/70 hover:text-offwhite hover:bg-offwhite/5 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
