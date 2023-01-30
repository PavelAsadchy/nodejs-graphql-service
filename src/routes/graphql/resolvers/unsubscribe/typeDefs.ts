export const unsubscribeTypeDefs = `
  input UnsubscribeFromUserInput {
    userId: ID!
  }
  type Mutation {
    unsubscribeFromUser(id: ID!, input: UnsubscribeFromUserInput!): UserEntity
  }
`;
