import { Request } from 'itty-router';
import { corsConfig } from '../../cors';
import { Secrets } from '../../interfaces';

async function fetchUserInfo(
  username: string,
  env: Secrets
): Promise<Response> {
  const { body } = await fetch(
    `https://api.twitter.com/2/users/by/username/${username}`,
    {
      method: 'GET',
      headers: {
        'User-Agent': 'garypotatoes-api-test',
        Authorization: `Bearer ${env?.TWITTER_BEARER_TOKEN}`,
      },
    }
  );

  return new Response(body, {
    headers: {
      ...corsConfig,
      'Content-Type': 'application/json',
    },
  });
}

async function UserProfileInfo(
  request: Request,
  env: Secrets
): Promise<Response> {
  const username = request?.params?.username;
  if (!username) {
    return new Response('No username provided', { status: 400 });
  }
  const { body } = await fetchUserInfo(username, env);

  return new Response(body, {
    headers: {
      ...corsConfig,
      'Content-Type': 'application/json',
    },
  });
}

export default UserProfileInfo;
export { fetchUserInfo };
