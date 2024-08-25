import React, { useState, useEffect } from "react";
import axios from "axios";
import HyperText from "@/components/magicui/hyper-text";

interface BalanceProps {} // Empty interface for type safety (optional)

const Balance: React.FC<BalanceProps> = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          setIsLoading(false);
          return;
        }

        const response = await axios.get<BalanceData>("https://flashpayapp.vercel.app/api/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBalance(response.data.balance);
        setIsLoading(false);
      } catch (error) {
        setError("There was an error fetching the balance");
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="container mx-auto px-4 pt-8">
      <div className="bg-slate-800 p-6 sm:p-10 rounded-2xl shadow-lg">
        {isLoading ? (
          <p className="text-2xl sm:text-3xl font-medium text-white">
            Loading balance...
          </p>
        ) : error ? (
          <p className="text-lg sm:text-xl text-red-400">{error}</p> // Show error message
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-medium text-white">
              Balance:
            </h1>
            <HyperText
              className="text-4xl font-bold text-green-400 dark:text-white"
              text={balance?.toString() || "0"} // Convert balance to string
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Balance;

interface BalanceData {
  balance: number;
}
