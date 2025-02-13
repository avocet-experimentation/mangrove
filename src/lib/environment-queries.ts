import { graphql } from '#/graphql';

export const CREATE_ENVIRONMENT = graphql(`
  mutation createEnvironment($newEntry: EnvironmentDraft!) {
    createEnvironment(newEntry: $newEntry) {
      id
      createdAt
      updatedAt
      name
      defaultEnabled
      pinToLists
    }
  }
`);

export const ALL_ENVIRONMENTS = graphql(`
  query allEnvironments($limit: Int, $offset: Int) {
    allEnvironments(limit: $limit, offset: $offset) {
      id
      name
      defaultEnabled
      createdAt
      updatedAt
      pinToLists
    }
  }
`);

export const FIND_ENVIRONMENTS = graphql(`
  query findMatchingEnvironments($partial: PartialEnvironment!, $limit: Int) {
    findMatchingEnvironments(partial: $partial, limit: $limit) {
      id
      name
      defaultEnabled
      createdAt
      updatedAt
      pinToLists
    }
  }
`);

export const UPDATE_ENVIRONMENT = graphql(`
  mutation updateEnvironment($partialEntry: PartialEnvironmentWithId!) {
    updateEnvironment(partialEntry: $partialEntry) {
      id
      createdAt
      updatedAt
      name
      defaultEnabled
      pinToLists
    }
  }
`);
