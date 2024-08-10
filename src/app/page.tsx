// export default Page;
import Header from './components/header'; // added
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/constants'; // added

export default function Home() {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <Header session={session} />
    </main>
  );
}

