import { auth0 } from '@/lib/auth0';

export default async function HomePage() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-semibold">Welcome to My App</h1>
        <div className="mt-4 space-x-4">
          <a
            href="/auth/login?screen_hint=signup"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign Up
          </a>
          <a
            href="/auth/login"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Log In
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
      <a
        href="/auth/logout"
        className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded"
      >
        Log Out
      </a>
    </main>
  );
}
