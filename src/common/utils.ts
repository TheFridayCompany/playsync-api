import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export function convertStringIdToMongooseObjectId(
  id: string,
): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(id);
}

export function mongooseObjectIdToString(objectId: mongoose.Types.ObjectId) {
  return objectId.toString();
}

export function generateUniqueId() {
  return uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
}
