import { FastifyInstance } from "fastify/types/instance";

export const getUsersResolver = {
  Query: {
    usersWithEntities: async (
      _root: unknown,
      _: unknown,
      fastify: FastifyInstance
    ) => await fastify.db.users.findMany()
  }
};
