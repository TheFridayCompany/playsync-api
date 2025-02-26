import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../domain/models/user.model';
import { InvalidObjectIdError } from 'src/common/errors/invalid-object-id.error';
import IUsersRepository from '../../domain/interfaces/users-repository.interface';

@Injectable()
export class UserMongooseRepository implements IUsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: mongoose.Model<User>,
  ) {}

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

    // returns deleted document
    const response = await this.userModel.findByIdAndDelete(objectId).exec();

    // if there is no response, the document was not found hence return false
    if (!response) return false;

    return true;
  }

  findByUsername(usernameQuery: string): Promise<User[]> {
    return this.userModel.find({
      username: { $regex: `^${usernameQuery}`, $options: '' }, // case-sensitive
    });
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
