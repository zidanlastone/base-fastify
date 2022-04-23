import { UserRepository, User } from "../repository/UserRepository";
import type {FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

type TParams<T> = {
  [x in keyof T]: keyof T;
} & {
  limit?: number;
  offset?: number;
  sortby?: keyof T;
  orderby: 'asc' | 'desc';
};

/**
 *  Controller untuk users
 *  berfungsi untuk menghandle request dari client
 */
export class UserController {
  
  private userRepo: UserRepository // user repo hanya bisa diakses oleh controller 

  constructor(
    public readonly fastify: FastifyInstance // instance yang di inject melalui router
  ){
    this.userRepo = new UserRepository(this.fastify.knex, 'users'); // inisialisasi repository untuk manipulasi data
  }

  async register(
    request: FastifyRequest<{Body: User, Params?: TParams<User>}>, 
    reply: FastifyReply
  ){
    const body = request.body;

    const response = await this.userRepo.create(<User>body)

    reply.status(200).send(response);
  }

  async getAll(
    request: FastifyRequest<{Body: User, Params?: TParams<User>}>,
    reply: FastifyReply
  ){
    
    const params = request.params
    
    const response = await this.userRepo.findWhere(
      {}, 
      params?.limit, 
      params?.offset, 
      params?.sortby
    )

    reply.status(200).send(response);
  }

  async test(request: FastifyRequest, reply: FastifyReply) {
    const users = await this.userRepo.find({})
    reply.status(200).send({message: "Test Success", users});
  }

}