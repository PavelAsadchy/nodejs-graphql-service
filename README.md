# Graphql

GraphQL-service using NodeJS(v18), Fastify, Mercurius, TypeScript

## Downloading

```bash
git clone {repository URL}
git checkout develop
npm i
```

## Running

- To test
```bash
npm run test
```
- To start
```bash
npm run start
```

## How to use:

- go to `http://127.0.0.1:3000/graphiql` (or use **postman**)

## Get gql requests:

- Get users, profiles, posts, memberTypes:
```
query {
  users {  
   id    
   firstName
   lastName
   email
   subscribedToUserIds
  }
  posts {
   id
   title
   content
   userId
  }
  profiles {
   id
   avatar
   sex
   birthday
   country
   street
   city
   memberTypeId
  }
  memberTypes {
   id
   discount
   monthPostsLimit
  }
}
```

- Get user, profile, post, memberType by id:
```
query {	
  user(id: "") {
   id
   firstName
   lastName
   email
   subscribedToUserIds
  }  
  post (id: "") {
   id
   title
   content
   userId
  }
  profile (id: "") {
   id
   avatar
   sex
   birthday
   country
   street
   city
   memberTypeId
  }
  memberTypes (id: "") {
   id
   discount
   monthPostsLimit
  }
}
```

- Get users with posts, profiles, memberTypes:
```
query usersWithEntities {
  usersWithEntities {
    id
    firstName
    lastName
    email
    subscribedToUserIds    
    posts{
      id
      title
      content
      userId
    }
    profile{
      id
      avatar
      sex
      birthday
      country
      street
      city
      memberTypeId
      userId
    }
    memberType{
      id
      discount
      monthPostsLimit
    }
  }
}
```

- Get user by id with posts, profile, memberType:
```
query userWithEntities($id: ID!) {
  userWithEntities(id: $id) {
    id
    firstName
    lastName
    email
    subscribedToUserIds    
    posts{
      id
      title
      content
      userId 
    }
    profile{
      id
      avatar
      sex
      birthday
      country
      street
      city
      memberTypeId
      userId
    }
    memberType{
      id
      discount
      monthPostsLimit
    }
  }
}
```

- Get users with userSubscribedTo, profile:
```
query usersSubscriberProfiles {
  usersSubscriberProfiles{
    id
    firstName
    lastName
    email
    subscribedToUserIds
    subscribedProfile{
      id
      avatar
      sex
      birthday
      country
      street
      city
      memberTypeId
      userId
    }
  }
}
```

- Get user by id with subscribedToUser, posts:
```
query userFollowersPosts($id: ID!) {
  userFollowersPosts(id: $id) {
	id
	firstName
	lastName
	email
	subscribedToUserIds
	subscriberPosts {
		id
		title
		content
		userId
    	}
  }
}
```

- Get users with userSubscribedTo, subscribedToUser:
```
query usersSubscriptions{
  usersSubscriptions{
    id
    firstName
    lastName
    email
    subscribedToUserIds
    userSubscribedTo{
      id
      firstName
      lastName
      email
      subscribedToUserIds
      userSubscribedTo{
        id
        firstName
        lastName
        email
        subscribedToUserIds
        userSubscribedTo{...}
        subscribedToUser{...}
      }
      subscribedToUser{
        id
        firstName
        lastName
        email
        subscribedToUserIds
        userSubscribedTo{...}
        subscribedToUser{...}
      }
    }
    subscribedToUser{
      id
      firstName
      lastName
      email
      subscribedToUserIds
      userSubscribedTo{
        id
        firstName
        lastName
        email
        subscribedToUserIds
        userSubscribedTo{...}
        subscribedToUser{...}
      }
      subscribedToUser{
        id
        firstName
        lastName
        email
        subscribedToUserIds
        userSubscribedTo{...}
        subscribedToUser{...}
      }
    }
  }
}
```

## Create gql requests:
- Create user:
```
mutation createUser($input: CreateUserInput!){
  createUser(input: $input) {
    id
    firstName
    email
  }
}
```

**variables**
```
{
  "input": {
    "firstName": "",
    "lastName": "",
    "email": ""
  }
}
```

- Create profile:
```
mutation createProfile($input: CreateProfileInput!) {
  createProfile(input: $input) {
    	id
    	avatar
    	sex
	birthday
	country
	street
	city
	memberTypeId
	userId    
  }    
}
```

**variables**
```
{
  "input": {
    "avatar": "",
    "sex": "",
    "birthday": 30,
    "country": "",
    "street": "",
    "city": "",
    "memberTypeId": "",
    "userId": ""
  }
}
```

- Create post:
```
mutation createPost($input: CreatePostInput!){
  createPost(input: $input) {
    	id
      	title
    	content
    	userId       
  }
}
```

**variables**
```
{
  "input": {
    "title": "",
    "content": "",
    "userId": ""
  }
}
```

## Update gql requests:
- Update user:
```
mutation updateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    firstName
    lastName
    email
    subscribedToUserIds
  }
}
```

**variables**
```
{
  "id": "",
  "input": {
    "firstName": "",
    "lastName": "",
    "email": ""
  }
}
```

- Update profile: 
```
mutation updateProfile($id: ID!, $input: UpdateProfileInput!) {
  updateProfile(id: $id, input: $input) {
    id
    avatar
    sex
    birthday
    country
    street
    city
    memberTypeId
    userId
  }
}
```

**variables**
```
{
  "id": "",
  "input": {
    "avatar": "",
    "sex": "",
    "birthday": "",    
    "country": "",
    "street": "",
    "city": "",
    "memberTypeId": ""
  }
}
```

- Update post: 
```
mutation updatePost ($id: ID!, $input: UpdatePostInput!) {
  updatePost(id: $id, input: $input) {
    id
    title
    content
    userId
  }
}
```

**variables**
```
{	
  "id": "",
  "input": {
    "title": "",
    "content": ""
  }
}
```

- Update memberType:
```
mutation updateMemberType($id: ID!, $input: UpdateMemberTypeInput!) {
  updateMemberType(id: $id, input: $input) {
    id
    discount
    monthPostsLimit
  }
}
```

**variables**
```
{
  "id": "",
  "input": {
    "discount": 5,
    "monthPostsLimit": 10
  }
}
```

- Subscribe:
```
mutation subscribeToUser($id: ID!, $input: SubscribeToUserInput!) {
	subscribeToUser(id: $id, input: $input) {
    		id
  		firstName
      		lastName
      		email
    		subscribedToUserIds
  	}
}
```

**variables**
```
{
  "id": "",
  "input": {
  	"userId": ""
  }
}
```

- Unsubscribe:
```
mutation unsubscribeFromUser($id: ID!, $input: UnsubscribeFromUserInput!) {
	unsubscribeFromUser(id: $id, input: $input) {
    		id
  		firstName
    		lastName
    		email
    		subscribedToUserIds
  	}
}
```

**variables**
```
{
  "id": "",
  "input": {
  	"userId": ""
  }
}
```
