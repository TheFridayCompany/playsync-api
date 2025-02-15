export default interface IFriendshipRepository {
  // TODO: fix the return type
  getForUser(userId: string): Promise<any[]>;

  remove(userId: string, friendId: string): Promise<void>;

  add(userId: string, friendId: string): Promise<void>;

  findOne(userId: string, friendId: string): Promise<any | null>;
}
