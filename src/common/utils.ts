import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

/**
 * Converts a string ID to a Mongoose ObjectId.
 *
 * This function is useful for situations where you need to work with MongoDB ObjectIds,
 * but the ID is passed as a string (e.g., from a client or an external API).
 *
 * @param {string} id - The string representation of the ID.
 * @returns {mongoose.Types.ObjectId} The corresponding Mongoose ObjectId.
 */
export function convertStringIdToMongooseObjectId(
  id: string,
): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(id);
}

/**
 * Converts a Mongoose ObjectId to its string representation.
 *
 * This function is useful when you need to return or store an ObjectId as a string,
 * particularly for use in APIs or serialization.
 *
 * @param {mongoose.Types.ObjectId} objectId - The Mongoose ObjectId to convert.
 * @returns {string} The string representation of the ObjectId.
 */
export function convertMongooseObjectIdToString(
  objectId: mongoose.Types.ObjectId,
): string {
  return objectId.toString();
}

/**
 * Generates a unique identifier using UUID v4.
 *
 * This function generates a globally unique identifier (GUID) based on random numbers.
 * It is useful for creating identifiers that need to be unique across systems.
 *
 * @returns {string} A UUID v4 string.
 */
export function generateUniqueId(): string {
  return uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
}

/**
 * Generates a JWT token with the given payload and secret key.
 *
 * This function is used to generate a JSON Web Token (JWT) for securely transmitting
 * information between parties. The token can be used for authentication and authorization.
 *
 * @param {any} payload - The payload (data) to encode in the token.
 * @param {string} secretKey - The secret key used to sign the token.
 * @param {number} expiry - The expiration time for the token in seconds.
 * @returns {string} The generated JWT token.
 */
export function generateJwtToken(
  payload: any,
  secretKey: string,
  expiry: number,
): string {
  return jwt.sign(payload, secretKey, { expiresIn: expiry });
}
