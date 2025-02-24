import { FriendRequest } from '../models/friend-request.model';

/**
 * Interface for the Friend Request Repository.
 * Provides methods for managing friend request operations in the system.
 */
export default interface IFriendRequestRepository {
  /**
   * Retrieves friend requests for a specific user, optionally filtering by status.
   *
   * @param {string} userId - The ID of the user whose friend requests are being retrieved.
   * @param {string} [status] - Optional status to filter friend requests (e.g., "pending", "accepted", "rejected").
   * @returns {Promise<FriendRequest[]>} - A promise that resolves to an array of friend requests.
   */
  getForUser(userId: string, status?: string): Promise<FriendRequest[]>;

  /**
   * Creates a new friend request between two users.
   *
   * @param {string} senderId - The ID of the user sending the friend request.
   * @param {string} receiverId - The ID of the user receiving the friend request.
   * @param {string} [status] - Optional initial status of the friend request (default: "pending").
   * @returns {Promise<FriendRequest>} - A promise that resolves to the created friend request.
   */
  create(
    senderId: string,
    receiverId: string,
    status?: string,
  ): Promise<FriendRequest>;

  /**
   * Updates the status of an existing friend request.
   *
   * @param {string} requestId - The ID of the friend request to update.
   * @param {string} status - The new status of the friend request (e.g., "accepted", "rejected").
   * @returns {Promise<FriendRequest>} - A promise that resolves to the updated friend request.
   */
  update(requestId: string, status: string): Promise<FriendRequest>;

  /**
   * Retrieves a friend request by its unique ID.
   *
   * @param {string} requestId - The ID of the friend request to retrieve.
   * @returns {Promise<FriendRequest>} - A promise that resolves to the retrieved friend request.
   */
  findOneById(requestId: string): Promise<FriendRequest>;

  /**
   * Retrieves a friend request between two users with an optional status filter.
   *
   * @param {string} senderId - The ID of the user who sent the request.
   * @param {string} receiverId - The ID of the user who received the request.
   * @param {string} [status] - Optional status to filter the request (e.g., "pending", "accepted").
   * @returns {Promise<FriendRequest>} - A promise that resolves to the retrieved friend request.
   */
  findOne(
    senderId: string,
    receiverId: string,
    status?: string,
  ): Promise<FriendRequest>;
}
