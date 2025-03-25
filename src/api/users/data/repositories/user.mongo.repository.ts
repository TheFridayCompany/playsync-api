import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { ClientSession } from 'mongoose';
import { User } from '../../domain/models/user.model';
import { InvalidObjectIdError } from 'src/common/errors/invalid-object-id.error';
import IUsersRepository from '../../domain/interfaces/users-repository.interface';

@Injectable()
export class UserMongooseRepository implements IUsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: mongoose.Model<User>,
  ) {}

  async findManyByIds(ids: string[]): Promise<User[]> {
    const response = await this.userModel.find({
      _id: { $in: ids.map((id) => this.convertToObjectId(id)) },
    });

    return response.map((user) => this.toUserObject(user));
  }

  async findByEmail(email: string): Promise<User> {
    const response = await this.userModel.findOne({
      email,
    });
    return this.toUserObject(response);
  }

  async create(data: User): Promise<User> {
    const user = new this.userModel(data);
    const response = await user.save();
    return this.toUserObject(response);
  }

  async findOne(id: string): Promise<User | null> {
    const objectId = this.convertToObjectId(id);

    const response = await this.userModel.findById(objectId).exec();

    if (!response) return null;

    return this.toUserObject(response);
  }

  async findAll(): Promise<User[]> {
    const response = await this.userModel.find().exec();
    return response.map((user) => this.toUserObject(user));
  }

  async update(id: string, data: User): Promise<User | null> {
    const objectId = this.convertToObjectId(id);

    // returns updated document
    const response = await this.userModel
      .findByIdAndUpdate(objectId, data, { new: true })
      .exec();

    // if there is no response, the document was not found hence return null
    if (!response) return null;

    return this.toUserObject(response);
  }

  async delete(id: string): Promise<boolean> {
    const objectId = this.convertToObjectId(id);
    const session: ClientSession = await this.userModel.db.startSession();

    session.startTransaction();
    try {
      // Step 1: Find and delete the user
      const user = await this.userModel
        .findByIdAndDelete(objectId, { session })
        .exec();
      if (!user) {
        await session.abortTransaction();
        session.endSession();
        return false;
      }

      console.log('deleting user ');
      console.log(JSON.stringify(user));

      // Step 2: Delete user-owned playlists, friendships, friend requests, and remove collaborations
      const playlistDeletionResult = await this.userModel.db
        .collection('playlists')
        .deleteMany({ ownerId: objectId }, { session });

      console.log('successfully deleted playlists');
      console.log(JSON.stringify(playlistDeletionResult));

      const friendshipDeletionResult = await this.userModel.db
        .collection('friendships')
        .deleteMany(
          { $or: [{ user1: objectId }, { user2: objectId }] },
          { session },
        );

      console.log('successfully deleted friendships');
      console.log(JSON.stringify(friendshipDeletionResult));

      const friendRequestDeletionResult = await this.userModel.db
        .collection('friendrequests')
        .deleteMany(
          { $or: [{ sender: objectId }, { receiver: objectId }] },
          { session },
        );

      console.log('successfully deleted friend requests');
      console.log(JSON.stringify(friendRequestDeletionResult));

      const removingUserAsCollaborator = await this.userModel.db
        .collection<{ collaboratorIds: mongoose.Types.ObjectId[] }>('playlists')
        .updateMany(
          { collaboratorIds: objectId },
          { $pull: { collaboratorIds: objectId } },
          { session },
        );

      console.log('successfully deleted user from collaborators');
      console.log(JSON.stringify(removingUserAsCollaborator));

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return true;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Error deleting user:', error);
      return false;
    }
  }

  // async delete(id: string): Promise<boolean> {
  //   const objectId = this.convertToObjectId(id);

  //   // returns deleted document
  //   const response = await this.userModel.findByIdAndDelete(objectId).exec();

  //   // if there is no response, the document was not found hence return false
  //   if (!response) return false;

  //   return true;
  // }

  async findByUsername(usernameQuery: string): Promise<User[]> {
    const response = await this.userModel.find({
      username: { $regex: `^${usernameQuery}`, $options: '' }, // case-sensitive
    });

    console.log('PRINTING RESPONSE');
    console.log(response);
    return response.map((user) => this.toUserObject(user));
  }

  private convertToObjectId(id: string) {
    this.throwErrorIfInvalidObjectId(id);
    return new mongoose.Types.ObjectId(id);
  }

  private throwErrorIfInvalidObjectId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidObjectIdError('Invalid User Id');
    }
  }

  private toUserObject(userDocument: mongoose.Document & User): User {
    if (!userDocument) return null;

    return new User(
      userDocument._id.toString(),
      userDocument.name,
      userDocument.username,
      userDocument.email,
    );
  }
}
