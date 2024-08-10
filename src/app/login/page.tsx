'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmail } from '@/libs/firebase/auth';
import { createSession } from '@/actions/auth-actions';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const userUid = await signInWithEmail(email, password);
    if (userUid) {
      await createSession(userUid);
      router.push('/home'); 
    }
  };

  return (
    <main className="flex flex-col md:flex-row h-screen w-full bg-[#0a2540]">
      <div className="md:block md:w-1/2 h-full">
        <img 
          src="https://plus.unsplash.com/premium_vector-1682298803948-44b93a646ea1?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Login Image" 
          className="object-cover h-full w-full" 
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8">
        <div className="text-white mb-auto text-center">Welcome back! Let&apos;s get you logged in.</div>
        <div className="bg-[#123456] mb-auto border-[#0a2540] border-2 rounded-2xl p-8 shadow-md max-w-md w-full">
          <h1 className="text-white text-2xl lg:text-3xl mb-1 text-center font-bold">Log In</h1>
          <p className="text-white mb-12 text-center">Enter your email and password to log in</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mb-4 p-2 w-full rounded-lg text-black"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 p-2 w-full rounded-lg text-black"
          />
          <button 
            onClick={handleLogin}
            className="flex items-center justify-center w-full px-6 py-2 bg-[#0a2540] text-white rounded-lg shadow-md hover:bg-[#123456] transition duration-300"
          >
            <img src="https://cdn-icons-png.flaticon.com/128/15889/15889542.png" alt="Email Icon" className="h-6 mr-2" />
            Log In with Email
          </button>
          <p className="text-white mt-4 text-center">
            New user? <a href="/" className="text-blue-500">Sign Up</a>
          </p>
        </div>
      </div>
    </main>
  );
}
