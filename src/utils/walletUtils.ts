// src/utils/walletUtils.ts
import axios from 'axios';

// Fonction pour obtenir la localisation de l'utilisateur
export const getUserLocation = (): Promise<string> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve("Géolocalisation non supportée");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Utiliser un service de géocodage inverse gratuit
          const response = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`
          );
          
          const city = response.data.city || response.data.locality || "Ville inconnue";
          const country = response.data.countryName || "Pays inconnu";
          
          resolve(`${city}, ${country}`);
        } catch (error) {
          console.error("Erreur lors du géocodage inverse:", error);
          resolve(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
        }
      },
      (error) => {
        console.error("Erreur de géolocalisation:", error);
        resolve("Localisation non disponible");
      },
      {
        timeout: 10000,
        enableHighAccuracy: false
      }
    );
  });
};

// Fonction pour obtenir le solde ETH
export const getETHBalance = async (address: string): Promise<string> => {
  try {
    // Utiliser l'API publique d'Ethereum (vous pouvez aussi utiliser Infura, Alchemy, etc.)
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=YourApiKeyToken`
    );
    
    if (response.data.status === "1") {
      // Convertir de Wei en ETH
      const balanceInWei = response.data.result;
      const balanceInEth = (parseInt(balanceInWei) / Math.pow(10, 18)).toFixed(6);
      return `${balanceInEth} ETH`;
    } else {
      return "Erreur lors de la récupération du solde";
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du solde ETH:", error);
    return "Solde non disponible";
  }
};

// Alternative sans API key (utilise un provider public mais moins fiable)
export const getETHBalancePublic = async (address: string): Promise<string> => {
  try {
    const response = await axios.post('https://cloudflare-eth.com/', {
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [address, "latest"],
      id: 1
    });
    
    if (response.data.result) {
      const balanceInWei = parseInt(response.data.result, 16);
      const balanceInEth = (balanceInWei / Math.pow(10, 18)).toFixed(6);
      return `${balanceInEth} ETH`;
    } else {
      return "Erreur lors de la récupération du solde";
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du solde ETH:", error);
    return "Solde non disponible";
  }
};
