import { FastifyInstance } from "fastify/types/instance";
import { MemberTypeEntity } from "../../../../utils/DB/entities/DBMemberTypes";

export const updateMemberTypeResolver = {
  Mutation: {
    updateMemberType: async (
      _root: unknown,
      { id, input }: { id: string; input: Partial<Omit<MemberTypeEntity, 'id'>> },
      fastify: FastifyInstance
    ) => {
      const memberType = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });
      if (!memberType) throw fastify.httpErrors.badRequest('Member type not found');

      const updatedMemberType = await fastify.db.memberTypes.change(id, input);

      return updatedMemberType;
    }
  }
};
