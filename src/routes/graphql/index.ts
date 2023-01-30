import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

import { createPostTypeDefs } from './resolvers/create-post/typeDefs';
import { createProfileTypeDefs } from './resolvers/create-profile/typeDefs';
import { createUserTypeDefs } from './resolvers/create-user/typeDefs';
import { getByIdTypeDefs } from './resolvers/get-by-id/typeDefs';
import { getEntitiesTypeDefs } from './resolvers/get-entities/typeDefs';
import { getFollowersPostsTypeDefs } from './resolvers/get-followers/typeDefs';
import { getSubscriberProfilesTypeDefs } from './resolvers/get-subscribers/typeDefs';
import { getSubscriptionsTypeDefs } from './resolvers/get-subscribtions/typeDefs';
import { getUserTypeDefs } from './resolvers/get-user/typeDefs';
import { getUsersTypeDefs } from './resolvers/get-users/typeDefs';
import { subscribeTypeDefs } from './resolvers/subscribe/typeDefs';
import { unsubscribeTypeDefs } from './resolvers/unsubscribe/typeDefs';
import { updateMemberTypeTypeDefs } from './resolvers/update-member-type/typeDefs';
import { updatePostTypeDefs } from './resolvers/update-post/typeDefs';
import { updateProfileTypeDefs } from './resolvers/update-profile/typeDefs';
import { updateUserTypeDefs } from './resolvers/update-user/typeDefs';

import { createPostResolver } from './resolvers/create-post/resolver';
import { createProfileResolver } from './resolvers/create-profile/resolver';
import { createUserResolver } from './resolvers/create-user/resolver';
import { getByIdResolver } from './resolvers/get-by-id/resolver';
import { getEntitiesResolver } from './resolvers/get-entities/resolver';
import { getFollowersPostsResolver } from './resolvers/get-followers/resolver';
import { getSubscriberProfilesResolver } from './resolvers/get-subscribers/resolver';
import { getSubscriptionsResolver } from './resolvers/get-subscribtions/resolver';
import { getUserResolver } from './resolvers/get-user/resolver';
import { getUsersResolver } from './resolvers/get-users/resolver';
import { subscribeResolver } from './resolvers/subscribe/resolver';
import { unsubscribeResolver } from './resolvers/unsubscribe/resolver';
import { updateMemberTypeResolver } from './resolvers/update-member-type/resolver';
import { updatePostResolver } from './resolvers/update-post/resolver';
import { updateProfileResolver } from './resolvers/update-profile/resolver';
import { updateUserResolver } from './resolvers/update-user/resolver';

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([
    createPostTypeDefs,
    createUserTypeDefs,
    createProfileTypeDefs,
    getByIdTypeDefs,
    getEntitiesTypeDefs,
    getFollowersPostsTypeDefs,
    getSubscriberProfilesTypeDefs,
    getSubscriptionsTypeDefs,
    getUserTypeDefs,
    getUsersTypeDefs,
    subscribeTypeDefs,
    unsubscribeTypeDefs,
    updateMemberTypeTypeDefs,
    updatePostTypeDefs,
    updateProfileTypeDefs,
    updateUserTypeDefs,
  ]),
  resolvers: mergeResolvers([
    createPostResolver,
    createProfileResolver,
    createUserResolver,
    getByIdResolver,
    getEntitiesResolver,
    getFollowersPostsResolver,
    getSubscriberProfilesResolver,
    getSubscriptionsResolver,
    getUserResolver,
    getUsersResolver,
    subscribeResolver,
    unsubscribeResolver,
    updateMemberTypeResolver,
    updatePostResolver,
    updateProfileResolver,
    updateUserResolver,
  ]),
});