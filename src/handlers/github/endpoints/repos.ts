import { Request } from 'itty-router';
import { corsConfig } from '../../../cors';

async function Repos(request: Request) {
  const user = request?.params?.user;
  const requestHeaders = new Headers({
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'doggodoge',
  });
  const { body } = await fetch(`https://api.github.com/users/${user}/repos`, {
    method: 'GET',
    headers: requestHeaders,
  });
  const headers = {
    ...corsConfig,
    'Content-Type': 'application/vnd.github.v3+json',
  };
  return new Response(body, { headers });
}

export default Repos;
