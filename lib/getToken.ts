
import { auth0 } from './auth0';

export async function getToken() {
  const session = await auth0.getSession();
  const accessToken =session?.tokenSet.accessToken;

  if (!accessToken) {
    throw new Error('No access token found');
  }

  return accessToken;
}