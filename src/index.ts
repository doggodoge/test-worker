import { handleRequest } from './handler';
import { Secrets } from './interfaces';

export default {
  async fetch(request: Request, env: Secrets): Promise<Response> {
    return handleRequest(request, env);
  },
};
