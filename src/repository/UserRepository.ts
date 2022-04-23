import {KnexRepository} from './BaseRepository';

export interface User {
  id: number;
  fullname: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

interface IUserRepository {
  findWhere(
    conditions: Partial<User>, 
    limit?: number, 
    offset?: number,
    sortby?: keyof User,
    orderBy?: string, 
  ): Promise<User[]>
}

export class UserRepository extends KnexRepository<User> implements IUserRepository {
  
  getPasswordHash(id: number): Promise<Partial<User>>{
    return this.qb.select('password').where({id}).first();
  }
}