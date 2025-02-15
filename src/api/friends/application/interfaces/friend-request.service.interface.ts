import { User } from 'src/api/users/domain/models/user.model';
import { FriendRequest } from '../../domain/models/friend-request.model';

export default interface IFriendRequestService {
  acceptRequest(requestId: string, userId: string): Promise<User>;
  rejectRequest(requestId: string, userId: string): Promise<User>;
  sendRequest(receiverId: string, senderId: string): Promise<FriendRequest>;
  getPendingFriendRequests(userId: string): Promise<FriendRequest[]>;
}
