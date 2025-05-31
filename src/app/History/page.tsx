"use client";

import { useConnection } from "@/context/ConnectionContext";
import Link from "next/link";

export default function HistoryPage() {
  const { connectionHistory, loading } = useConnection();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header avec bouton retour */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600">
            Connection History
          </h1>
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
              ← Back to Home
            </button>
          </Link>
        </div>

        {/* Affichage de l'historique */}
        <div className="max-w-4xl mx-auto">
          {connectionHistory.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No connection history found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {connectionHistory.map((entry) => (
                <div 
                  key={entry.id} 
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                        <span className="font-semibold text-gray-800 text-lg">
                          {entry.status}
                        </span>
                      </div>
                      
                      {entry.ethAddress && (
                        <div className="mb-2">
                          <span className="text-sm text-gray-600">Wallet Address:</span>
                          <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1 break-all">
                            {entry.ethAddress}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 sm:mt-0 sm:ml-6">
                      <span className="text-sm text-gray-500">
                        {entry.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer avec statistiques */}
        {connectionHistory.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Connection Statistics
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {connectionHistory.length}
              </p>
              <p className="text-sm text-gray-600">
                Total connections recorded
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
