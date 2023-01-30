export const subscribeTypeDefs = `
  input SubscribeToUserInput {
    userId: ID!
  }
  type Mutation {
    subscribeToUser(id: ID!, input: SubscribeToUserInput!): UserEntity
  }
`;
