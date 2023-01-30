import { FastifyInstance } from "fastify/types/instance";
import { ProfileEntity } from "../../../../utils/DB/entities/DBProfiles";

export const subscribeResolver = {
  Mutation: {
    subscribeToUser: async (
      _root: unknown,
      { id, input }: { id: string; input: Pick<ProfileEntity, 'userId'> },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.findOne({ key: 'id', equals: input.userId });
      const source = await fastify.db.users.findOne({ key: 'id', equals: id });
      if (!user || !source) throw fastify.httpErrors.badRequest('User not found');

      const isAlreadySubscribed = user.subscribedToUserIds.includes(id);
      if (isAlreadySubscribed) return user;

      const updatedUser = await fastify.db.users.change(input.userId, {
        subscribedToUserIds: [...user.subscribedToUserIds, id]
      });

      return updatedUser;
    }
  }
};
