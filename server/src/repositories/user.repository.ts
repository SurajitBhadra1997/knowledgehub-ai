//only repository talks to prisma directly
import prisma from "../lib/prisma";
import { Prisma, User } from "@prisma/client";

export class UserRepository {
  /**
   * Create a new user
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  /**
   * Find user by email
   */

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  /**
   * Find user by id
   */

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  /**
   * Update user
   */
  async updateUser(id: string, data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Delete user
   */
  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
}


export const userRepository = new UserRepository();