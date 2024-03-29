import { Router, Request } from 'itty-router';
import { Repos } from './handlers/github/endpoints';
import { UserTimeline, UserProfileInfo } from './handlers/twitter/endpoints';
import { Secrets } from './interfaces';

const router = Router();

router
  .get('/api/github/:user/repos', Repos)
  .get('/api/twitter/timeline/:username', UserTimeline)
  .get('/api/twitter/userinfo/:username', UserProfileInfo)
  .get('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request: Request, env: Secrets) => {
  return router.handle(request, env);
};
