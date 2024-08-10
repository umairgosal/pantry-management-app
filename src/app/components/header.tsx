'use client';

import { useUserSession } from '@/hooks/use-user-session';
import { signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth';
import { createSession, removeSession } from '@/actions/auth-actions';
import { useRouter } from 'next/navigation';

export function Header({ session }: { session: string | null }) {
  const userSessionId = useUserSession(session);
  const router = useRouter();

  const handleSignIn = async () => {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid);
    }
  };

  const handleEmailSignUpNavigation = () => {
    router.push('/email-signup');
  };

  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };

  if (!userSessionId) {
    return (
      <div className="flex flex-col md:flex-row h-screen w-full bg-[#0a2540]">
        <div className="md:block md:w-1/2 h-full">
          <img 
            src="https://plus.unsplash.com/premium_vector-1682301961980-7c7c95e8a17d?q=80&w=1394&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Signup Image" 
            className="object-cover h-full w-full" 
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8">
          <div className="text-white mb-auto text-center font-sans">
            <span className="flex items-center justify-center mb-2">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png" 
                alt="Pantry Icon" 
                className="h-10 w-10 mr-3" 
              />
              <span className="text-3xl font-extrabold tracking-wide text-indigo-400">
                PantryPal
              </span>
            </span>
            <p className="text-xl mt-4 leading-relaxed max-w-md mx-auto text-indigo-200">
              Master your pantry with ease. Track what you have, plan what you need, and simplify your shopping with PantryPal!
            </p>
          </div>
          <div className="bg-[#123456] mb-auto border-[#0a2540] border-2 rounded-2xl p-8 shadow-md max-w-md w-full">
            <h1 className="text-white text-2xl lg:text-3xl mb-1 text-center font-bold font-sans">
              Sign up
            </h1>
            <p className="text-white mb-12 text-center">
              Choose a signup method
            </p>
            <button 
              onClick={handleSignIn} 
              className="flex items-center justify-center w-full px-6 py-2 mb-4 bg-white text-gray-700 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 font-sans"
            >
              <img 
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" 
                alt="Google Icon" 
                className="h-6 mr-2" 
              />
              Sign up with Google
            </button>
            <button 
              onClick={handleEmailSignUpNavigation} 
              className="flex items-center justify-center w-full px-6 py-2 bg-white text-gray-700 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 font-sans"
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/128/15889/15889542.png" 
                alt="Email Icon" 
                className="h-6 mr-2" 
              />
              Sign up with Email
            </button>
            <p className="text-white mt-4 text-center">
              Already a user? <a href="/login" className="text-blue-500">Log in</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
