import { User } from 'src/api/users/domain/models/user.model';

export default interface IFriendshipService {
  getFriends(userId: string): Promise<User[]>;
  removeFriend(userId: string, friendId: string): Promise<void>;
  addFriend(userId: string, friendId: string): Promise<void>;
  checkFriendshipStatus(userId: string, friendId: string): Promise<boolean>;
}
