import { FastifyInstance } from "fastify/types/instance";

export const getSubscriptionsResolver = {
  Query: {
    usersSubscriptions: async (
      _root: unknown,
      _: unknown,
      fastify: FastifyInstance
    ) => await fastify.db.users.findMany()
  }
};
