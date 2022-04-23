import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';

import knexconfig from '../knexfile';
import { Knex } from 'knex';

export type AppOptions = {
  knex: Knex
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

type env = keyof typeof knexconfig;

/**
 * Declaration merging
 *  untuk melakukan merging terhadap interface yang sudah ada
 *  dengan interface yang dibutuhkan
 */
declare module 'fastify' {
  interface FastifyInstance {
    knex: Knex
  }
}

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Place here your custom code!

  const environtment = process.env.MODE !== null ? 'development' : process.env.MODE as env
  // knexjs connections
  // later the knex connection can be accesed by using fastify.knex  
  void fastify.register(require('fastify-knexjs'), knexconfig[environtment]);

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

};

export default app;
export { app }
