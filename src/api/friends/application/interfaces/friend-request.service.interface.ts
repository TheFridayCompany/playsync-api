import { User } from 'src/api/users/domain/models/user.model';
import { FriendRequest } from '../../domain/models/friend-request.model';

/**
 * Interface for FriendRequest Service that handles operations related to friend requests.
 */
export default interface IFriendRequestService {
  /**
   * Accepts a pending friend request, establishing a friendship between the users.
   *
   * @param {string} requestId - The ID of the friend request to be accepted.
   * @param {string} userId - The ID of the user who is accepting the request.
   * @returns {Promise<User>} - A promise that resolves to the updated User object after the request is accepted.
   */
  acceptRequest(requestId: string, userId: string): Promise<User>;

  /**
   * Rejects a pending friend request.
   *
   * @param {string} requestId - The ID of the friend request to be rejected.
   * @param {string} userId - The ID of the user who is rejecting the request.
   * @returns {Promise<User>} - A promise that resolves to the updated User object after the request is rejected.
   */
  rejectRequest(requestId: string, userId: string): Promise<User>;

  /**
   * Sends a friend request from one user to another.
   *
   * @param {string} receiverId - The ID of the user receiving the friend request.
   * @param {string} senderId - The ID of the user sending the friend request.
   * @returns {Promise<FriendRequest>} - A promise that resolves to the created FriendRequest object.
   */
  sendRequest(receiverId: string, senderId: string): Promise<FriendRequest>;

  /**
   * Retrieves all pending friend requests for a given user.
   *
   * @param {string} userId - The ID of the user whose pending friend requests are being fetched.
   * @returns {Promise<FriendRequest[]>} - A promise that resolves to an array of pending FriendRequest objects.
   */
  getPendingFriendRequests(userId: string): Promise<FriendRequest[]>;
}
