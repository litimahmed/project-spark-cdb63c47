import { History } from 'lucide-react';

const HistoryPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl flex items-center justify-center">
          <History className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historique</h1>
          <p className="text-gray-500">Historique des commandes passées</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
        <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Historique des commandes</h3>
        <p className="text-gray-500">Cette page sera bientôt disponible</p>
      </div>
    </div>
  );
};

export default HistoryPage;
