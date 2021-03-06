import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    currentUser: User
    users: [User!]!
    logoutUser: User
    fetchAgentProperties(
      offset: Int!
      limit: Int!
      values: SearchProperty
    ): [Property!]!
    fetchAgentProperty(propertyId: ID!): Property
    filterProperties(
      filter: String
      offset: Int!
      limit: Int!
      values: SearchProperty
    ): [Property!]!
    filterPropertiesCount(filter: String, values: SearchProperty): Count!
    agentPropertiesCount(values: SearchProperty): Count!
    fetchPropertyDetails(_id: ID!): Property
    searchProperties(
      values: SearchProperty
      offset: Int!
      limit: Int!
    ): [Property!]!
    fetchExpiredListings(
      offset: Int!
      limit: Int!
      values: SearchProperty
    ): [Property!]!
    expiredListingsCount(values: SearchProperty): Count!
    fetchLeads(offset: Int!, limit: Int!): [Lead!]!
    fetchLeadsCount: Count!
    viewsAndLeadsCount: ViewsAndLeadsCount!
    propertyStatistics(_id: ID!): ViewsAndLeadsCount!
    propertyStatisticsMessages(_id: ID!, offset: Int!, limit: Int!): [Lead!]!
    propertyStatisticsMessagesCount(_id: ID!): Count!
    fetchFeaturedProperties: [Property!]!
  }
  type Mutation {
    registerUser(values: RegisterInput!): User!
    registerAgent(values: RegisterAgentInput!): Agent!
    loginUser(email: String!, password: String!): Token!
    editProfile(values: EditUserProfile!): User!
    editAgentProfile(values: EditAgentProfile!): Agent!
    addProperty(values: AddProperty!): Property!
    editProperty(values: EditProperty!): Property!
    updateExpiredListings(
      values: [ExpiredListingsID!]!
      expiryDate: Boolean
      mark: Boolean
      withdraw: Boolean
    ): [Property]
    createLead(values: CreateLead!): Lead!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }
  input RegisterAgentInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: Int!
    address: String!
  }
  input EditUserProfile {
    email: String!
    firstName: String!
    lastName: String!
    phoneNumber: Int
  }
  input EditAgentProfile {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: Int!
    address: String!
  }
  input SearchProperty {
    type: String
    category: String
    location: String
    minPrice: Int
    maxPrice: Int
    bedrooms: Int
    bathrooms: Int
    furnished: Boolean
  }
  input ExpiredListingsID {
    _id: ID!
    type: String!
  }
  type Token {
    token: String!
  }
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: Int
    isAgent: Boolean
  }
  type Agent {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    phoneNumber: Int!
    address: String!
    profilePhoto: String
    isAgent: Boolean!
  }
  type Property {
    _id: ID!
    reference: Int!
    location: String!
    streetAddress: String!
    category: String!
    price: Int!
    bedrooms: Int!
    bathrooms: Int!
    type: String!
    status: String!
    agent: Agent!
    heading: String!
    description: String!
    expiryDate: String!
    images: [String!]!
    parkingLots: Int
    plinthArea: Int
    lotArea: Int
    furnished: Boolean!
    petFriendly: Boolean!
    garden: Boolean!
    serviceCharge: Int
    repossessed: Boolean!
    onAuction: Boolean!
    auctionDate: String
    auctionVenue: String
    createdAt: String!
    updatedAt: String!
    visitor: String
  }
  type Lead {
    _id: ID!
    email: String!
    fullName: String!
    phoneNumber: Int!
    message: String!
    property: Property!
    createdAt: String!
  }
  input CreateLead {
    email: String!
    fullName: String!
    phoneNumber: Int!
    message: String!
    property: String!
    agent: String!
  }
  input AddProperty {
    reference: Int!
    location: String!
    streetAddress: String!
    category: String!
    price: Int!
    bedrooms: Int!
    bathrooms: Int!
    type: String!
    status: String!
    heading: String!
    description: String!
    expiryDate: String!
    images: [String!]!
    parkingLots: Int
    plinthArea: Int
    lotArea: Int
    furnished: Boolean
    petFriendly: Boolean
    garden: Boolean
    serviceCharge: Int
    repossessed: Boolean
    onAuction: Boolean
    auctionDate: String
    auctionVenue: String
  }
  input EditProperty {
    _id: ID!
    location: String
    streetAddress: String
    category: String
    price: Int
    bedrooms: Int
    bathrooms: Int
    heading: String
    description: String
    expiryDate: String
    images: [String!]
    parkingLots: Int
    plinthArea: Int
    lotArea: Int
    furnished: Boolean
    petFriendly: Boolean
    garden: Boolean
    serviceCharge: Int
    repossessed: Boolean
    onAuction: Boolean
    auctionDate: String
    auctionVenue: String
    status: String
  }
  type Count {
    count: Int!
  }
  type CountViews {
    month: String!
    count: Int!
  }
  type CountLeads {
    month: String!
    count: Int!
  }
  type ViewsAndLeadsCount {
    views: [CountViews!]!
    leads: [CountLeads!]!
  }
`;
