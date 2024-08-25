"use client";
import Navbar from "@/components/Navbar";
import Balance from "@/components/Balance";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Users from '@/components/User'
import RetroGrid from "@/components/magicui/retro-grid";
import SpinnerParticles from '@/components/SpinnerParticles'
export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signin');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <SpinnerParticles/>;
  }

  if (!user) {
    return null; 
  }

  const username = user.firstName || "Guest";
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      <RetroGrid className="absolute inset-0 z-0" />

      <div className="relative z-10">
        <Navbar username={username} />
        <h1 className="text-4xl sm:text-6xl text-lime-400 font-sans font-bold container mx-auto px-4 pt-8">
          What&apos;s up? {username}
        </h1>
        <Balance />
        <Users/>
      </div>
    </div>
  );
}
