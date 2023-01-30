import { FastifyInstance } from "fastify/types/instance";
import { ProfileEntity } from "../../../../utils/DB/entities/DBProfiles";

export const updateProfileResolver = {
  Mutation: {
    updateProfile: async (
      _root: unknown,
      { id, input }: { id: string; input: Partial<Omit<ProfileEntity, 'id' | 'userId'>> },
      fastify: FastifyInstance
    ) => {
      const profile = await fastify.db.profiles.findOne({ key: 'id', equals: id });
      if (!profile) throw fastify.httpErrors.badRequest('Profile not found');

      const updatedProfile = await fastify.db.profiles.change(id, input);

      return updatedProfile;
    }
  }
};
