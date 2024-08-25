"use client";
import Navbar from "@/components/Navbar";
import Balance from "@/components/Balance";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Users from '@/components/User'
export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signin');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; 
  }

  const username = user.firstName || "Guest";
  return (
    <div>
      <Navbar username={username} />
      <h1 className="text-3xl sm:text-4xl text-teal-500 font-mono">What&apos;s up? {username}</h1>
      <Balance />
      <Users/>
    </div>
  );
}