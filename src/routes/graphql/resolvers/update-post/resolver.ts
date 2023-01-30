import { FastifyInstance } from "fastify/types/instance";
import { PostEntity } from "../../../../utils/DB/entities/DBPosts";

export const updatePostResolver = {
  Mutation: {
    updatePost: async (
      _root: unknown,
      { id, input }: { id: string; input: Partial<Omit<PostEntity, 'id' | 'userId'>> },
      fastify: FastifyInstance
    ) => {
      const post = await fastify.db.posts.findOne({ key: 'id', equals: id });
      if (!post) throw fastify.httpErrors.badRequest('Post not found');

      const updatedPost = await fastify.db.posts.change(id, input);

      return updatedPost;
    }
  }
};
