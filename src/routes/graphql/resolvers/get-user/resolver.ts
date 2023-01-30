import { FastifyInstance } from "fastify/types/instance";

export const getUserResolver = {
  Query: {
    userWithEntities: async (
      _root: unknown,
      { id }: { id: string },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.findOne({ key: 'id', equals: id });
      if (!user) throw fastify.httpErrors.notFound('User not found');

      return user;
    }
  }
};
