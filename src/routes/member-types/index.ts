import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { changeMemberTypeBodySchema } from './schema';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (_request, _reply): Promise<MemberTypeEntity[]> {
    const memberTypes = await this.db.memberTypes.findMany();

    return memberTypes;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<MemberTypeEntity> {
      const { id } = request.params;
      const memberType = await this.db.memberTypes.findOne({ key: 'id', equals: id });
      if (!memberType) throw this.httpErrors.notFound('Member type not found');

      return memberType;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeMemberTypeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<MemberTypeEntity> {
      const { id } = request.params;
      const memberType = await this.db.memberTypes.findOne({ key: 'id', equals: id });
      if (!memberType) throw this.httpErrors.badRequest('Member type not found');

      const updatedMemberType = await this.db.memberTypes.change(id, request.body);

      return updatedMemberType;
    }
  );
};

export default plugin;
