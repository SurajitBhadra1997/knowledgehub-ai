import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

// 8 → Too weak
// 10 → Good
// 12 → Recommended for production
// 15+ → More secure but slower

/**
 * Hash a plain text password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare plain password with hashed password
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};