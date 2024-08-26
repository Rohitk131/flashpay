'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';

function SendMoneyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
        setError(null);
    };

    const handleTransfer = async () => {
        if (amount <= 0) {
            setError("Please enter a valid amount greater than 0.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://flashpayapp.vercel.app/api/account/transfer', {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Transfer successful:', response.data);
            alert('Transfer successful!');
            router.push('/dashboard'); 
        } catch (error: any) {
            console.error('There was an error initiating the transfer:', error);
            setError(error.response?.data?.message || "An error occurred during the transfer.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return <div className="flex justify-center items-center h-screen">Please log in to continue.</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-3xl font-bold text-center mb-6">Send Money</h2>
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-2xl text-white">{name ? name[0].toUpperCase() : 'N/A'}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="amount">
                            Amount (in Rs)
                        </label>
                        <input
                            onChange={handleAmountChange}
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            id="amount"
                            placeholder="Enter amount"
                            min="0"
                            step="0.01"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        onClick={handleTransfer}
                        className="w-full bg-green-500 text-white py-2 px-4  hover:bg-green-600 transition duration-300 ease-in-out rounded-xl"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Initiate Transfer'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function SendMoney() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SendMoneyContent />
        </Suspense>
    );
}