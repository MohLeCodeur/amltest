"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import trustwallet from "@public/trustwallet.png";
import { createThirdwebClient } from "thirdweb";
import { createWallet, type Wallet } from "thirdweb/wallets";
import { useConnection } from "@/context/ConnectionContext";

// Créer le client Thirdweb
const client = createThirdwebClient({
  clientId: "c98a5d48ad89f114ad6044933fced541",
});

// Spécifie uniquement Trust Wallet
const wallets = [
  createWallet("com.trustwallet.app"),
];

// Composant pour le bouton Historique
const HistoryButton = () => (
  <div style={{
    textAlign: 'center',
    paddingTop: '30px',
    paddingBottom: '30px',
  }}>
    <Link href="/History">
      <button style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease, transform 0.1s ease'
      }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1e3a8a')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1e40af')}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        See History
      </button>
    </Link>
  </div>
);

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { addConnection } = useConnection();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "aml" && password === "test") {
      setIsLoggedIn(true);
      router.push("/");
    } else {
      alert("Login error: incorrect username or password.");
    }
  };

  const handleWalletConnect = async (wallet: Wallet) => {
    try {
      const account = wallet.getAccount();
      if (account) {
        await addConnection({ 
          status: "Wallet connected successfully", 
          ethAddress: account.address 
        });
        console.log("Wallet connected:", account.address);
      } else {
        await addConnection({ 
          status: "Wallet connected (address pending)" 
        });
        console.log("Wallet connected but address pending");
      }
    } catch (error) {
      console.error("Error handling wallet connection:", error);
      await addConnection({ 
        status: "Wallet connection failed" 
      });
    }
  };

  const handleWalletDisconnect = async () => {
    try {
      await addConnection({ 
        status: "Wallet disconnected" 
      });
      console.log("Wallet disconnected");
    } catch (error) {
      console.error("Error handling wallet disconnection:", error);
    }
  };

  if (isLoggedIn) {
    return (
      <>
        <main className="flex flex-col sm:flex-row justify-between items-center p-5 sm:p-20">
          <div className="content max-w-lg">
            <div className="text-box-blur">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                All-in-one compliance solution for crypto businesses
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8">
                The AML Check platform automates AML/KYC procedures and reduces compliance-related expenses.
              </p>
            </div>

            <div className="buttons flex flex-col sm:flex-row gap-4 sm:gap-20">
              <ConnectButton
                client={client}
                wallets={wallets}
                connectModal={{ size: "compact" }}
                onConnect={handleWalletConnect}
                onDisconnect={handleWalletDisconnect}
              />
              <a href="#" className="secondary-button">Bot de chat →</a>
            </div>
          </div>

          <div className="image mt-10 sm:mt-0">
            <Image
              src={trustwallet}
              alt="Trust Wallet Icon"
              width={500}
              height={250}
              className="rounded-lg"
            />
          </div>
        </main>

        <section className="stats-section py-20 bg-gray-50 text-center">
          <div className="container mx-auto">
            <h2 className="text-4xl font-extrabold mb-8 text-blue-600">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="stat-item p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-3xl font-bold text-indigo-600">350,000+</h3>
                <p className="text-gray-600 mt-2">Active daily users on our platform.</p>
              </div>
              <div className="stat-item p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-3xl font-bold text-indigo-600">Binance Partnership</h3>
                <p className="text-gray-600 mt-2">
                  Proud partner of Binance for seamless crypto solutions.
                </p>
              </div>
              <div className="stat-item p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-3xl font-bold text-indigo-600">Trusted Globally</h3>
                <p className="text-gray-600 mt-2">
                  Thousands of businesses trust our platform for compliance and security.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bouton Historique pour la vue connectée */}
        <div className="bg-gray-50">
          <HistoryButton />
        </div>
      </>
    );
  }

  // Vue formulaire de connexion
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f4f8',
      fontFamily: 'Arial, sans-serif',
      paddingTop: '40px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <Image src="/trustwallet.png" alt="Logo" width={100} height={100} />
        </div>

        <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '30px' }}>Connexion</h1>

        <form onSubmit={handleLogin} style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: 'bold',
              color: '#555'
            }}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
                backgroundColor: '#f9f9f9'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: 'bold',
              color: '#555'
            }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
                backgroundColor: '#f9f9f9'
              }}
            />
          </div>

          <button type="submit" style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}>
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}
