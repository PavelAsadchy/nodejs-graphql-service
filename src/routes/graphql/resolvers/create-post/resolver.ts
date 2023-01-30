import { FastifyInstance } from "fastify/types/instance";
import { PostEntity } from "../../../../utils/DB/entities/DBPosts";

export const createPostResolver = {
  Mutation: {
    createPost: async (
      _root: unknown,
      { input }: { input: Omit<PostEntity, 'id'> },
      fastify: FastifyInstance
    ) => {
      const author = await fastify.db.users.findOne({ key: 'id', equals: input.userId });
      if (!author) throw fastify.httpErrors.badRequest('Author not found');

      const post = await fastify.db.posts.create(input);

      return post;
    }
  }
};
