import { auth0 } from '../lib/auth0';
import api from '@/lib/api';
import { Header } from '@/components/Header';

export default async function Home() {
  const session = await auth0.getSession();
  const accessToken = session?.tokenSet?.accessToken;
  console.log(accessToken);
  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">Sign up</a>
        <a href="/auth/login">Log in</a>
      </main>
    );
  }


  let protectedData = null;
  let error = null;
  try {
    const response = await api.get('/auth', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    protectedData = response.data;
  } catch (err) {
    error = err;
  }

  return (
    <main>
      <Header/>
      <h1>Welcome, {session.user.name}!</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error fetching protected data: {error.toString()}</p>
      ) : (
        <p>Protected API says: {protectedData ? protectedData.message: 'Loading...'}</p>
      )}
      <a href="/auth/logout">Logout</a>
    </main>
  );
}