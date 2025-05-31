"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Timestamp, QuerySnapshot, DocumentData, FirestoreError } from "firebase/firestore";
import {
  db,
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy
} from "@/lib/firebase";

// Type pour les données telles qu'elles sont dans Firestore
interface FirestoreConnectionData {
  timestamp: Timestamp;
  status: string;
  ethAddress?: string;
}

// Type pour les entrées dans l'historique affiché
type ConnectionEntry = {
  id: string; // Ajout d'un ID unique
  timestamp: string;
  status: string;
  ethAddress?: string;
  timestampValue: number; // Ajout pour le tri
};

type ConnectionContextType = {
  connectionHistory: ConnectionEntry[];
  addConnection: (entry: Omit<ConnectionEntry, "timestamp" | "id" | "timestampValue">) => Promise<void>;
  loading: boolean;
};

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  const [connectionHistory, setConnectionHistory] = useState<ConnectionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ajouter orderBy pour garantir l'ordre depuis Firestore
    const q = query(
      collection(db, "connections"),
      orderBy("timestamp", "desc") // Tri décroissant directement dans la requête
    );

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const entries: ConnectionEntry[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data() as FirestoreConnectionData;
        const timestampDate = data.timestamp ? data.timestamp.toDate() : new Date();
        
        entries.push({
          id: doc.id, // Utiliser l'ID du document
          timestamp: timestampDate.toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }),
          status: data.status,
          ethAddress: data.ethAddress,
          timestampValue: timestampDate.getTime() // Valeur numérique pour le tri
        });
      });

      // Tri supplémentaire côté client pour garantir l'ordre
      entries.sort((a, b) => b.timestampValue - a.timestampValue);

      setConnectionHistory(entries);
      setLoading(false);
    }, (err: FirestoreError) => {
      console.error("Erreur lors de l'écoute des modifications Firestore:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addConnection = async (entry: Omit<ConnectionEntry, "timestamp" | "id" | "timestampValue">) => {
    try {
      await addDoc(collection(db, "connections"), {
        ...entry,
        timestamp: serverTimestamp()
      });
    } catch (error: any) {
      console.error("Erreur d'ajout de connexion:", error);
    }
  };

  return (
    <ConnectionContext.Provider value={{ connectionHistory, addConnection, loading }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};
