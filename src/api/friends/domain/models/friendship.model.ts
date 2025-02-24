/**
 * Represents a Friendship between two users in the system.
 */
export class Friendship {
  /** The unique identifier of the friendship. */
  id: string;

  /** The ID of the user who initiated the friendship. */
  userId: string;

  /** The ID of the friend in the friendship. */
  friendId: string;

  /** The current status of the friendship (e.g., "active", "pending", "blocked"). */
  status: string;

  /** The timestamp when the friendship was created. */
  createdAt: Date;

  /** The timestamp when the friendship was last updated. */
  updatedAt: Date;

  /**
   * Creates a new instance of the Friendship class.
   *
   * @param {string} id - The unique identifier for the friendship.
   * @param {string} userId - The ID of the user who initiated the friendship.
   * @param {string} friendId - The ID of the friend in the friendship.
   * @param {string} status - The current status of the friendship (e.g., "active", "pending", "blocked").
   * @param {Date} createdAt - The timestamp when the friendship was created.
   * @param {Date} updatedAt - The timestamp when the friendship was last updated.
   */
  constructor(
    id: string,
    userId: string,
    friendId: string,
    status: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.userId = userId;
    this.friendId = friendId;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
