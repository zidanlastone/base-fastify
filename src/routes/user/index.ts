import { FastifyInstance } from 'fastify';
import { FastifyPluginAsync } from 'fastify'

import {AppOptions} from '../../app'
import { UserController } from '../../controllers/UserController'
import * as UserBodySchema from '../../schemas/user/body.json'


const root: FastifyPluginAsync<AppOptions> = async (fastify: FastifyInstance, opts): Promise<void> => {

  const userController = new UserController(fastify);
  // const userRepo = new UserRepository(fastify.knex, 'users');
  
  /**
   *  function dari class perlu di bind untuk mendapatkan duplikasi 
   *  dari fungsi yang terdaftar di controller class
   */

  void fastify.post('/register', {
    schema: {
      body: UserBodySchema,
    },
  }, userController.register.bind(userController)); 

  void fastify.get('/test', {
    schema: {
      response:{
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            users: {
              type: 'array',
              items: UserBodySchema
            }
          }
        }
      }
    }
  }, userController.test.bind(userController))

  void fastify.get('/users', {}, userController.getAll.bind(userController)) 
}

export default root;
