import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const signInSchema = z.object({
  email: z.string().trim().email({ message: 'Adresse email invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

type SignInFormData = z.infer<typeof signInSchema>;

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);

    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Erreur de connexion',
            description: 'Email ou mot de passe incorrect.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Erreur',
            description: error.message,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Bienvenue !',
          description: 'Connexion réussie.',
        });
        navigate('/admin');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-3">
        <label className="block text-slate-400 text-xs tracking-[0.2em] uppercase font-sans">
          Email
        </label>
        <div className="relative group">
          <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gold transition-colors" />
          <input
            type="email"
            {...register('email')}
            className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-slate-600 text-offwhite text-lg placeholder:text-slate-600 focus:border-gold focus:outline-none transition-colors"
            placeholder="admin@maisonlesept.com"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-sm mt-2">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-slate-400 text-xs tracking-[0.2em] uppercase font-sans">
          Mot de passe
        </label>
        <div className="relative group">
          <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-gold transition-colors" />
          <input
            type="password"
            {...register('password')}
            className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-slate-600 text-offwhite text-lg placeholder:text-slate-600 focus:border-gold focus:outline-none transition-colors"
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>
        {errors.password && (
          <p className="text-red-400 text-sm mt-2">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 mt-4 bg-gold text-charcoal font-sans text-sm tracking-[0.2em] uppercase hover:bg-gold/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Se connecter
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default AuthForm;