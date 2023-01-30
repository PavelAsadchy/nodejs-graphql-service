import { FastifyInstance } from "fastify/types/instance";
import { UserEntity } from "../../../../utils/DB/entities/DBUsers";

export const updateUserResolver = {
  Mutation: {
    updateUser: async (
      _root: unknown,
      { id, input }: { id: string; input: Partial<Omit<UserEntity, 'id'>> },
      fastify: FastifyInstance
    ) => {
      try {
        const updatedUser = await fastify.db.users.change(id, input);

        return updatedUser;
      } catch (error) {
        throw fastify.httpErrors.badRequest('User not found');
      }
    }
  }
};
