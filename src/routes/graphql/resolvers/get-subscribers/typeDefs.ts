export const getSubscriberProfilesTypeDefs = `
    type Query {
      usersSubscriberProfiles: [UsersSubscriberProfiles]     
    }   
    type UsersSubscriberProfiles {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      subscribedToUserIds: [String]!
      subscribedProfile: [ProfileEntity]
    }
`;
