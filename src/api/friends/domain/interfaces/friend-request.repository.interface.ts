import { FriendRequest } from '../models/friend-request.model';

export default interface IFriendRequestRepository {
  getForUser(userId: string, status?: string): Promise<FriendRequest[]>;
  create(
    senderId: string,
    receiverId: string,
    status?: string,
  ): Promise<FriendRequest>;
  update(requestId: string, status: string): Promise<FriendRequest>;
  findOneById(requestId: string): Promise<FriendRequest>;
  findOne(
    senderId: string,
    receiverId: string,
    status?: string,
  ): Promise<FriendRequest>;
}
