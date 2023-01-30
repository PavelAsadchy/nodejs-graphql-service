import { FastifyInstance } from "fastify/types/instance";

export const getEntitiesResolver = {
  Query: {
    users: async (
      _root: unknown, _: unknown, fastify: FastifyInstance
    ) => fastify.db.users.findMany(),

    posts: async (
      _root: unknown, _: unknown, fastify: FastifyInstance
    ) => fastify.db.posts.findMany(),

    profiles: async (
      _root: unknown, _: unknown, fastify: FastifyInstance
    ) => fastify.db.profiles.findMany(),

    memberTypes: async (
      _root: unknown, _: unknown, fastify: FastifyInstance
    ) => fastify.db.memberTypes.findMany()
  }
};
