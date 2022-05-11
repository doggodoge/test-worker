import { Request } from 'itty-router';
import { corsConfig } from '../../cors';
import { Secrets } from '../../interfaces';

async function UserTimeline(request: Request, env: Secrets) {
  const userId = request?.params?.userId;
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
