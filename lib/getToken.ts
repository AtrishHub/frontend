
import { getAccessToken } from "@auth0/nextjs-auth0";

export async function getToken() {
  try {
    const accessToken = await getAccessToken();
    return accessToken;
  } catch (err) {
    throw err;
  }
}