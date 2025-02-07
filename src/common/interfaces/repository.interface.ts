export default interface IRepository<T> {
  /**
   * Creates a new entity and returns the created object.
   * @param data The entity data to create.
   * @returns The newly created entity.
   * @throws {Error} If creation fails.
   */
  create(data: T): Promise<T>;

  /**
   * Finds one entity by ID.
   * @param id The ID of the entity.
   * @returns The entity if found, otherwise `null`.
   * @throws {InvalidObjectIdError} If the provided ID is not a valid ObjectId.
   * @throws {Error} If there is a database issue.
   */
  findOne(id: string): Promise<T | null>;

  /**
   * Retrieves all entities from the database.
   * @returns An array of entities (empty if none exist).
   * @throws {Error} If there is an issue accessing the database.
   */
  findAll(): Promise<T[]>;

  /**
   * Updates an existing entity by ID and returns the updated object.
   * @param id The ID of the entity to update.
   * @param data The updated entity data.
   * @returns The updated entity if found, otherwise `null`.
   * @throws {InvalidObjectIdError} If the provided ID is not a valid ObjectId.
   * @throws {Error} If there is a database issue.
   */
  update(id: string, data: T): Promise<T | null>;

  /**
   * Deletes an entity by ID.
   * @param id The ID of the entity to delete.
   * @returns `true` if deletion was successful, `false` if the entity was not found.
   * @throws {InvalidObjectIdError} If the provided ID is not a valid ObjectId.
   * @throws {Error} If there is a database issue.
   */
  delete(id: string): Promise<boolean>;
}
