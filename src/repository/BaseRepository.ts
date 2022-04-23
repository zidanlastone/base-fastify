
import type {Knex} from 'knex';

interface Writter<T> {
  create(item: Omit<T, 'id'>): Promise<T>
  createMany(item: Omit<T, 'id'>[]): Promise<T[]>
  update(id: number, item: Partial<T>): Promise<boolean>
  delete(id: number): Promise<boolean>
}

interface Reader<T> {
  find(item: Partial<T>): Promise<T[]>
  findWhere(
    conditions?: Partial<T>, 
    limit?: number, 
    offset?: number, 
    sortby?: keyof T, 
    orderby?: 'asc' | 'desc'
  ): Promise<T[]>
  findOne(id: number | Partial<T>): Promise<T> 
  exist(id: number): Promise<boolean>
}

type BaseRepository<T> = Reader<T> & Writter<T>;

export abstract class KnexRepository<T> implements BaseRepository<T> {

  constructor(
    public readonly knex: Knex,
    public readonly tableName: string,
  ){
    if(!knex) throw new Error("Please provide knex");
    if(!tableName) throw new Error("Please provide tableName");
  }

  public get qb(): Knex.QueryBuilder {
    return this.knex(this.tableName);
  }

  find(item: Partial<T>): Promise<T[]> {
      return this.qb.where(item).select();
  }

  async findWhere(
    conditions: Partial<T>, 
    limit?: number, 
    offset?: number, 
    sortby?: keyof T, 
    orderby?: 'asc' | 'desc'
    ): Promise<any> {
    try {
      const query = this.qb.where(conditions)
      const totalquery = query.clone().count('id', {as: 'id'}).first()
      
      if(offset) query.offset(offset)
      if(limit) query.limit(limit)
      if (sortby || orderby)
        query.orderBy(sortby || 'created_at', orderby || 'desc');
      
      const items: T[] = await query
      const total: number = ((await totalquery) as {id: number}).id

      const cursor = {
        current: offset || 0,
        next : offset && limit ? 
          offset + limit <= total 
            ? offset + limit : undefined 
          : undefined
      }

      return Promise.resolve({
        cursor,
        total,
        items,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  findOne(id: number | Partial<T>): Promise<T> {
    return this.qb.where({id}).first();
  }

  async exist(id: number | Partial<T>){
    const query = this.qb.select<[{count: number}]>(this.knex.raw('COUNT(*)'));
    
    query.where({id});

    const exist = await query.first();
    return exist!.count !== 0;
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const [output] = await this.qb.insert<T>(item).returning('*')

    return output as Promise<T>
  }
  
  createMany(items: T[]): Promise<T[]> {
    return this.qb.insert<T>(items) as Promise<T[]>
  }

  update(id: number, item: Partial<T>): Promise<boolean> {
    return this.qb.where({id}).update(item);
  }

  delete(id: number): Promise<boolean> {
    return this.qb.where({id}).del();
  }
}

