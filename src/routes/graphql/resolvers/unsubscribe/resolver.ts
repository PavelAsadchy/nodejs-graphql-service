import { FastifyInstance } from "fastify/types/instance";
import { ProfileEntity } from "../../../../utils/DB/entities/DBProfiles";

export const unsubscribeResolver = {
  Mutation: {
    unsubscribeFromUser: async (
      _root: unknown,
      { id, input }: { id: string; input: Pick<ProfileEntity, 'userId'> },
      fastify: FastifyInstance
    ) => {
      const user = await fastify.db.users.findOne({ key: 'id', equals: input.userId });
      if (!user) throw fastify.httpErrors.badRequest('User not found');

      const isSubscribed = user.subscribedToUserIds.includes(id);
      if (!isSubscribed) throw fastify.httpErrors.badRequest(`You aren't subscribed to this user`);

      const updatedUser = await fastify.db.users.change(input.userId, {
        subscribedToUserIds: user.subscribedToUserIds.filter(_id => _id !== id)
      });

      return updatedUser;
    }
  }
};
