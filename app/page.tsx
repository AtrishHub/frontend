
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";


export default async function Home() {
  
  const session = await auth0.getSession();

  if (!session) {
    redirect("auth/login");
  }
  console.log('Session:', session);
  let protectedData;
  let error = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/proxy/protected-route`);
    if (res.status === 401) {
      redirect("auth/login");
    }
    protectedData = await res.json();
  } catch (err) {
    console.error("Proxy call error:", err);
    throw err;
  }

  if (error) {
    return (
      <main>
        <h1>Welcome, {session.user.name}!</h1>
        <p style={{ color: "red" }}>{error}</p>
        <a href="/auth/logout">Log Out</a>
      </main>
    );
  }

  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Protected API says: {protectedData.message}</p>
      <a href="/auth/logout">Log Out</a>
    </main>
  );
}