import { FastifyInstance } from "fastify/types/instance";
import { ProfileEntity } from "../../../../utils/DB/entities/DBProfiles";

export const createProfileResolver = {
  Mutation: {
    createProfile: async (
      _root: unknown,
      { input }: { input: Omit<ProfileEntity, 'id'> },
      fastify: FastifyInstance
    ) => {
      const memberType = await fastify.db.memberTypes.findOne({ key: 'id', equals: input.memberTypeId });
      if (!memberType) throw fastify.httpErrors.badRequest('Member type not found');

      const isAlreadyExists = await fastify.db.profiles.findOne({ key: 'userId', equals: input.userId });
      if (isAlreadyExists) throw fastify.httpErrors.badRequest('Profile already exists');

      const profile = await fastify.db.profiles.create(input);

      return profile;
    }
  }
};
