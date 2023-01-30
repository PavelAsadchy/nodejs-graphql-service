import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (_request, _reply): Promise<UserEntity[]> {
    const users = await this.db.users.findMany();

    return users;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<UserEntity> {
      const { id } = request.params;
      const user = await this.db.users.findOne({ key: 'id', equals: id });
      if (!user) throw this.httpErrors.notFound('User not found');

      return user;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, _reply): Promise<UserEntity> {
      const user = await this.db.users.create(request.body);
      if (!user) throw this.httpErrors.badRequest();

      return user;
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<UserEntity> {
      const { id } = request.params;
      const user = await this.db.users.findOne({ key: 'id', equals: id });
      if (!user) throw this.httpErrors.badRequest('User not found');

      const userPosts = await this.db.posts.findMany({ key: 'userId', equals: id });
      await Promise.all(userPosts.map(async ({ id }) => {
        await this.db.posts.delete(id);
      }));

      const userProfile = await this.db.profiles.findOne({ key: 'userId', equals: id });
      if (userProfile) await this.db.profiles.delete(userProfile.id);

      const userFollowers = await this.db.users.findMany({ key: 'subscribedToUserIds', inArray: id });
      await Promise.all(userFollowers.map(async ({ id, subscribedToUserIds }) => {
        const followerIndex = subscribedToUserIds.indexOf(id);
        subscribedToUserIds.splice(followerIndex, 1);
        await this.db.users.change(id, { subscribedToUserIds });
      }));

      const deletedUser = await this.db.users.delete(id);

      return deletedUser;
    }
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<UserEntity> {
      const { id } = request.params;
      const { userId } = request.body;
      if (id === userId) throw this.httpErrors.badRequest(`You can't subscribe to yourself`);

      const user = await this.db.users.findOne({ key: 'id', equals: userId });
      const source = await this.db.users.findOne({ key: 'id', equals: id });
      if (!user || !source) throw this.httpErrors.badRequest('User not found');

      const isAlreadySubscribed = user.subscribedToUserIds.includes(id);
      if (isAlreadySubscribed) return user;

      const updatedUser = await this.db.users.change(userId, {
        subscribedToUserIds: [...user.subscribedToUserIds, id]
      });

      return updatedUser;
    }
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<UserEntity> {
      const { id } = request.params;
      const { userId } = request.body;
      if (id === userId) throw this.httpErrors.badRequest(`You can't unsubscribe from yourself`);

      const user = await this.db.users.findOne({ key: 'id', equals: userId });
      const source = await this.db.users.findOne({ key: 'id', equals: id });
      if (!user || !source) throw this.httpErrors.badRequest('User not found');

      const { subscribedToUserIds } = user;
      const isSubscribed = subscribedToUserIds.includes(id);
      if (!isSubscribed) throw this.httpErrors.badRequest(`You aren't subscribed to this user`);

      const subscriptionIndex = subscribedToUserIds.indexOf(id);
      subscribedToUserIds.splice(subscriptionIndex, 1);
      const updatedUser = await this.db.users.change(userId, { subscribedToUserIds });

      return updatedUser;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<UserEntity> {
      try {
        const { id } = request.params;
        const updatedUser = await this.db.users.change(id, request.body);

        return updatedUser;
      } catch (error) {
        throw this.httpErrors.badRequest();
      }
    }
  );
};

export default plugin;
