import { User } from 'src/api/users/domain/models/user.model';

/**
 * Represents a Friend Request in the system.
 */
export class FriendRequest {
  /** The unique identifier of the friend request. */
  id: string;

  /** The user who sent the friend request. */
  sender: User;

  /** The user who received the friend request. */
  receiver: string;

  /** The current status of the friend request (e.g., "pending", "accepted", "rejected"). */
  status: string;

  /** The timestamp when the friend request was created. */
  createdAt: Date;

  /** The timestamp when the friend request was last updated. */
  updatedAt: Date;

  /**
   * Creates a new instance of the FriendRequest class.
   *
   * @param {string} id - The unique identifier for the friend request.
   * @param {User} sender - The user sending the friend request.
   * @param {string} receiver - The ID of the user receiving the friend request.
   * @param {string} [status="pending"] - The current status of the friend request.
   * @param {Date} [createdAt=new Date()] - The timestamp when the friend request was created.
   * @param {Date} [updatedAt=new Date()] - The timestamp when the friend request was last updated.
   */
  constructor(
    id: string,
    sender: User,
    receiver: string,
    status: string = 'pending',
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.sender = sender;
    this.receiver = receiver;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
