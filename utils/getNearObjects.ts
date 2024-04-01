import { ConnectConfig, keyStores, connect, WalletConnection, Contract } from "near-api-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const contractName = process.env.NEXT_PUBLIC_NEAR_CONTRACT_ID || "";

export default function getNearObjects () {
    const [config, setConfig] = useState<ConnectConfig | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    async function loginWithNEAR() {
        if(!config) {
            return;
        } else {
            const nearConnection = await connect(config);
            const wallet = new WalletConnection(nearConnection, contractName);
            try {
                await wallet.requestSignIn({
                  contractId: contractName,
                  methodNames: ["registerVoter"],
                });
              } catch (error) {
                console.error(error);
              }
        }
    }

    async function logoutNEAR() {
        if (!config) {
            return;
        } else {
            const nearConnection = await connect(config);
            const wallet = new WalletConnection(nearConnection, contractName);
            try {
            wallet.signOut();
            localStorage.clear();
            router.push("/");
            setIsLoggedIn(false);
            } catch (error) {
            console.error(error);
            }
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
          const connectionConfig = {
            networkId: "testnet",
            keyStore: new keyStores.BrowserLocalStorageKeyStore(),
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://testnet.mynearwallet.com/",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
          };
          setConfig(connectionConfig);
        }
    }, []);

    useEffect(() => {
        const isSigned = async () => {
          if (config) {
            const nearConnection = await connect(config);
            const wallet = new WalletConnection(nearConnection, contractName);
            const nearSignedIn = await wallet.isSignedInAsync();
            setIsLoggedIn(nearSignedIn);
          }
        };
        isSigned();
    }, [config]);

    async function getLoggedInAccount() {
        if(!config) {
            return;
        } else {
            const nearConnection = await connect(config);
            const wallet = new WalletConnection(nearConnection, contractName);
            const walletAccountId = wallet.getAccountId();
            return walletAccountId;
        }
    }
    const registerVoter = async () => {
      try {
        if (!config) {
          return;
        } else {
          const nearConnection = await connect(config);
          const wallet = new WalletConnection(nearConnection, contractName);

          const methodOptions = {
            viewMethods: [],
            changeMethods: ["registerVoter"],
          };

          const contract = new Contract(
            wallet.account(),
            contractName,
            methodOptions
          );
          const response = await contract["registerVoter"]({}, "300000000000000");
          return response;
        }
      } catch (error) {
        console.error(error);
      }
    };

    return { loginWithNEAR, logoutNEAR, isLoggedIn, getLoggedInAccount, registerVoter };
}