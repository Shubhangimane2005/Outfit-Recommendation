import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, XCircle, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { checkSupabaseConnection, dbHelpers } from '../lib/supabase';

const DatabaseStatus: React.FC = () => {
  const [status, setStatus] = useState<{
    connected: boolean;
    message: string;
    stats?: {
      users: number;
      conversations: number;
      fashionItems: number;
    };
  }>({ connected: false, message: 'Checking connection...' });
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const connectionResult = await checkSupabaseConnection();
      
      if (connectionResult.connected) {
        // Get database stats
        const [usersResult, conversationsResult, itemsResult] = await Promise.all([
          dbHelpers.getAllUsers(),
          dbHelpers.getAllConversations(),
          dbHelpers.getFashionItems()
        ]);

        setStatus({
          connected: true,
          message: 'Database connected and operational!',
          stats: {
            users: usersResult.data?.length || 0,
            conversations: conversationsResult.data?.length || 0,
            fashionItems: itemsResult.data?.length || 0
          }
        });
      } else {
        setStatus({
          connected: false,
          message: connectionResult.message
        });
      }
    } catch (error) {
      setStatus({
        connected: false,
        message: 'Failed to check database status'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
    // Auto-refresh every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div 
        className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
          status.connected ? 'border-green-200' : 'border-red-200'
        } ${expanded ? 'p-4 max-w-sm' : 'p-3 max-w-xs'}`}
      >
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            status.connected ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {loading ? (
              <RefreshCw className="animate-spin text-blue-600" size={20} />
            ) : status.connected ? (
              <CheckCircle className="text-green-600" size={20} />
            ) : (
              <XCircle className="text-red-600" size={20} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 flex items-center text-sm">
              <Database size={14} className="mr-2" />
              Database Status
            </h3>
            <p className={`text-xs truncate ${
              status.connected ? 'text-green-600' : 'text-red-600'
            }`}>
              {status.connected ? 'Connected' : 'Not Connected'}
            </p>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 space-y-3">
            <p className="text-xs text-gray-600">{status.message}</p>

            {status.connected && status.stats && (
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-blue-50 rounded-lg p-2">
                  <div className="text-lg font-bold text-blue-600">{status.stats.users}</div>
                  <div className="text-xs text-blue-500">Users</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-2">
                  <div className="text-lg font-bold text-purple-600">{status.stats.conversations}</div>
                  <div className="text-xs text-purple-500">Chats</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-2">
                  <div className="text-lg font-bold text-pink-600">{status.stats.fashionItems}</div>
                  <div className="text-xs text-pink-500">Items</div>
                </div>
              </div>
            )}

            {!status.connected && (
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2 text-yellow-800 mb-2">
                  <AlertCircle size={16} />
                  <span className="text-sm font-medium">Setup Required</span>
                </div>
                <p className="text-xs text-yellow-700 mb-3">
                  Click "Connect to Supabase" button to set up your database
                </p>
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink size={12} />
                  <span>Get Supabase Account</span>
                </a>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={checkStatus}
                disabled={loading}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Checking...' : 'Refresh'}
              </button>
              {status.connected && (
                <button
                  onClick={() => {
                    // Open admin dashboard
                    const adminButton = document.querySelector('[data-admin-dashboard]') as HTMLButtonElement;
                    if (adminButton) {
                      adminButton.click();
                    }
                  }}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                >
                  Admin
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseStatus;