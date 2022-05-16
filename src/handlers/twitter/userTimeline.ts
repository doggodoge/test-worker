import { Request } from 'itty-router';
import { corsConfig } from '../../cors';
import { Secrets } from '../../interfaces';
import UserInfoResponse from './userInfoResponse.interface';
import { fetchUserInfo } from './userProfileInfo';

async function UserTimeline(request: Request, env: Secrets) {
  const username = request?.params?.username;
  if (!username) {
    return new Response('No username provided.', { status: 400 });
  }
  const userProfileInfoResponse = await fetchUserInfo(username, env);
  const userProfileInfoJson =
    await userProfileInfoResponse?.json<UserInfoResponse>();
  const userId = userProfileInfoJson?.data?.id;

  const { body } = await fetch(
    `https://api.twitter.com/2/users/${userId}/tweets`,
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

export default UserTimeline;
