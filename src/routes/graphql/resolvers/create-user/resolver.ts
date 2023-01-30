import { FastifyInstance } from "fastify/types/instance";
import { UserEntity } from "../../../../utils/DB/entities/DBUsers";

export const createUserResolver = {
  Mutation: {
    createUser: async (
      _root: unknown,
      { input }: { input: Omit<UserEntity, 'id' | 'subscribedToUserIds'> },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.create(input);
      if (!user) throw fastify.httpErrors.badRequest();

      return user;
    }
  }
};
