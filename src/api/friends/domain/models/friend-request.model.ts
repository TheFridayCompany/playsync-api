export class FriendRequest {
  id: string;
  sender: string;
  receiver: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    sender: string,
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
