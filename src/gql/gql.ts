/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query issueQuery($number: Int!, $after: String) {\n    repository(owner: \"facebook\", name: \"react\") {\n      issue(number: $number) {\n        id\n        title\n        bodyHTML\n        createdAt\n        author {\n          avatarUrl(size: 50)\n          login\n        }\n        state\n        comments(first: 100, after: $after) {\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          edges {\n            cursor\n            node {\n              publishedAt\n              reactions(first: 100) {\n                totalCount\n                nodes {\n                  content\n                }\n              }\n              bodyHTML\n              author {\n                login\n                avatarUrl\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.IssueQueryDocument,
    "\n  query searchQuery($query: String!) {\n    search(query: $query, type: ISSUE, first: 100) {\n      nodes {\n        ... on Issue {\n          id\n          number\n          title\n          state\n          updatedAt\n          body\n          closed\n          author {\n            avatarUrl(size: 50)\n            login\n          }\n        }\n      }\n    }\n  }\n": types.SearchQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query issueQuery($number: Int!, $after: String) {\n    repository(owner: \"facebook\", name: \"react\") {\n      issue(number: $number) {\n        id\n        title\n        bodyHTML\n        createdAt\n        author {\n          avatarUrl(size: 50)\n          login\n        }\n        state\n        comments(first: 100, after: $after) {\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          edges {\n            cursor\n            node {\n              publishedAt\n              reactions(first: 100) {\n                totalCount\n                nodes {\n                  content\n                }\n              }\n              bodyHTML\n              author {\n                login\n                avatarUrl\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query issueQuery($number: Int!, $after: String) {\n    repository(owner: \"facebook\", name: \"react\") {\n      issue(number: $number) {\n        id\n        title\n        bodyHTML\n        createdAt\n        author {\n          avatarUrl(size: 50)\n          login\n        }\n        state\n        comments(first: 100, after: $after) {\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          edges {\n            cursor\n            node {\n              publishedAt\n              reactions(first: 100) {\n                totalCount\n                nodes {\n                  content\n                }\n              }\n              bodyHTML\n              author {\n                login\n                avatarUrl\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchQuery($query: String!) {\n    search(query: $query, type: ISSUE, first: 100) {\n      nodes {\n        ... on Issue {\n          id\n          number\n          title\n          state\n          updatedAt\n          body\n          closed\n          author {\n            avatarUrl(size: 50)\n            login\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchQuery($query: String!) {\n    search(query: $query, type: ISSUE, first: 100) {\n      nodes {\n        ... on Issue {\n          id\n          number\n          title\n          state\n          updatedAt\n          body\n          closed\n          author {\n            avatarUrl(size: 50)\n            login\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;