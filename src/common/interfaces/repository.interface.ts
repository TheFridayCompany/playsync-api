export default interface IRepository<T> {
  /**
   * Creates a new entity.
   * @throws {Error} If creation fails.
   */
  create(data: T): Promise<T>;

  /**
   * Finds one entity by ID.
   * @param id The ID of the entity.
   * @throws {NotFoundError} If the entity is not found.
   */
  findOne(id: string): Promise<T>;

  /**
   * Finds all entities.
   * @throws {DatabaseError} If there is an issue accessing the database.
   */
  findAll(): Promise<T[]>;

  /**
   * Updates an existing entity by ID.
   * @throws {NotFoundError} If the entity to update does not exist.
   * @throws {ValidationError} If the provided data is invalid.
   */
  update(id: string, data: T): Promise<T>;

  /**
   * Deletes an entity by ID.
   * @throws {NotFoundError} If the entity to delete does not exist.
   */
  delete(id: string): Promise<void>;
}
