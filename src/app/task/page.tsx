'use client'
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import '../globals.css';

interface TodoItem {
  text: string
  selectedTime: number
  selectedColor: string
}

export default function Home() {
  const router = useRouter(); 
  const pathname = usePathname();

  return (

    <main className="flex min-h-screen flex-col bg-white ">
      <div className="py-[100px] mx-[200px] w-[360px] ">
        focusing !!!
      </div>
    </main>
  );
}
