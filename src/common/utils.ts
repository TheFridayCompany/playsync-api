import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

export function convertStringIdToMongooseObjectId(
  id: string,
): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(id);
}

export function convertMongooseObjectIdToString(
  objectId: mongoose.Types.ObjectId,
) {
  return objectId.toString();
}

export function generateUniqueId() {
  return uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
}

export function generateJwtToken(payload: any, secretKey: string, expiry: number) {
  return jwt.sign(payload, secretKey, { expiresIn: expiry });
}
