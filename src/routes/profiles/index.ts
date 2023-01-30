import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createProfileBodySchema, changeProfileBodySchema } from './schema';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (_request, _reply): Promise<ProfileEntity[]> {
    const profiles = await this.db.profiles.findMany();

    return profiles;
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<ProfileEntity> {
      const { id } = request.params;
      const profile = await this.db.profiles.findOne({ key: 'id', equals: id });
      if (!profile) throw this.httpErrors.notFound('Profile not found');

      return profile;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createProfileBodySchema,
      },
    },
    async function (request, _reply): Promise<ProfileEntity> {
      const { memberTypeId, userId } = request.body;
      const memberType = await this.db.memberTypes.findOne({ key: 'id', equals: memberTypeId });
      if (!memberType) throw this.httpErrors.badRequest('Member type not found');

      const isAlreadyExists = await this.db.profiles.findOne({ key: 'userId', equals: userId });
      if (isAlreadyExists) throw this.httpErrors.badRequest('Profile already exists');

      const profile = await this.db.profiles.create(request.body);

      return profile;
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<ProfileEntity> {
      const { id } = request.params;
      const profile = await this.db.profiles.findOne({ key: 'id', equals: id });
      if (!profile) throw this.httpErrors.badRequest('Profile not found');

      const deletedProfile = await this.db.profiles.delete(id);

      return deletedProfile;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeProfileBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, _reply): Promise<ProfileEntity> {
      const { id } = request.params;
      const profile = await this.db.profiles.findOne({ key: 'id', equals: id });
      if (!profile) throw this.httpErrors.badRequest('Profile not found');

      const updatedProfile = await this.db.profiles.change(id, request.body);

      return updatedProfile;
    }
  );
};

export default plugin;
