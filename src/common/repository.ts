export default interface IRepository<T> {
  create(data: T): Promise<T>;
  findOne(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<void>;
}
