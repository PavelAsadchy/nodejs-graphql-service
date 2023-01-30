import { FastifyInstance } from "fastify/types/instance";

export const getByIdResolver = {
  Query: {
    user: async (
      _root: unknown,
      { id }: { id: string },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.findOne({ key: 'id', equals: id });
      if (!user) throw fastify.httpErrors.notFound('User not found');

      return user;
    },
    post: async (
      _root: unknown,
      { id }: { id: string },
      fastify: FastifyInstance
    ) => {
      const post = await fastify.db.posts.findOne({ key: 'id', equals: id });
      if (!post) throw fastify.httpErrors.notFound('Post not found');

      return post;
    },
    profile: async (
      _root: unknown,
      { id }: { id: string },
      fastify: FastifyInstance
    ) => {
      const profile = await fastify.db.profiles.findOne({ key: 'id', equals: id });
      if (!profile) throw fastify.httpErrors.notFound('Profile not found');

      return profile;
    },
    memberType: async (
      _root: unknown,
      { id }: { id: string },
      fastify: FastifyInstance
    ) => {
      const memberType = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });
      if (!memberType) throw fastify.httpErrors.notFound('Member type not found');

      return memberType;
    }
  }
};
