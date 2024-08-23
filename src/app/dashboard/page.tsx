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
      <Balance />
      <Users/>
    </div>
  );
}