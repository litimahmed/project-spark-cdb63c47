import { Users } from 'lucide-react';

const CustomersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500">Base de données clients</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Liste des clients</h3>
        <p className="text-gray-500">Cette page sera bientôt disponible</p>
      </div>
    </div>
  );
};

export default CustomersPage;
