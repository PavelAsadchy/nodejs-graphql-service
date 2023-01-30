import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createPostBodySchema, changePostBodySchema } from './schema';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (_request, _reply): Promise<PostEntity[]> {
    const posts = await this.db.posts.findMany();

    return posts;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<PostEntity> {
      const { id } = request.params;
      const post = await this.db.posts.findOne({ key: 'id', equals: id });
      if (!post) throw this.httpErrors.notFound('Post not found');

      return post;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createPostBodySchema,
      },
    },
    async function (request, _reply): Promise<PostEntity> {
      const { userId } = request.body;
      const author = await this.db.users.findOne({ key: 'id', equals: userId });
      if (!author) throw this.httpErrors.badRequest('Author not found');

      const post = await this.db.posts.create(request.body);

      return post;
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<PostEntity> {
      const { id } = request.params;
      const post = await this.db.posts.findOne({ key: 'id', equals: id });
      if (!post) throw this.httpErrors.badRequest('Post not found');

      const deletedPost = await this.db.posts.delete(id);

      return deletedPost;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changePostBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<PostEntity> {
      const { id } = request.params;
      const post = await this.db.posts.findOne({ key: 'id', equals: id });
      if (!post) throw this.httpErrors.badRequest('Post not found');

      const updatedPost = await this.db.posts.change(id, request.body);

      return updatedPost;
    }
  );
};

export default plugin;
