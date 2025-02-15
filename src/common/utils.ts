import mongoose from 'mongoose';

export function convertStringIdToMongooseObjectId(
  id: string,
): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(id);
}

export function mongooseObjectIdToString(objectId: mongoose.Types.ObjectId) {
  return objectId.toString();
}
