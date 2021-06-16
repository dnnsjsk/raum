import { customAlphabet } from "nanoid";

/**
 * Get a unique project code.
 */
export function getUnique() {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, 10);
  return nanoid();
}
