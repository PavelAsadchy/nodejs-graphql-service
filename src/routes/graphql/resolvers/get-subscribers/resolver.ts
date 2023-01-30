import { FastifyInstance } from "fastify/types/instance";

export const getSubscriberProfilesResolver = {
  Query: {
    usersSubscriberProfiles: async (
      _root: unknown,
      _: unknown,
      fastify: FastifyInstance
    ) => await fastify.db.users.findMany()
  }
};
