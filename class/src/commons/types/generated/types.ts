export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type IBoardReturn = {
  __typename?: 'BoardReturn';
  contents?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  like?: Maybe<Scalars['Int']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  writer?: Maybe<Scalars['String']['output']>;
};

export enum ICacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ICreateProductInput = {
  detail?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
};

export type IMutation = {
  __typename?: 'Mutation';
  createBoard?: Maybe<IReturn>;
  createProduct?: Maybe<IReturn>;
  createProfile?: Maybe<IReturn>;
  deleteBoard?: Maybe<IReturn>;
  deleteProduct?: Maybe<IReturn>;
  deleteProfile?: Maybe<IReturn>;
  updateBoard?: Maybe<IReturn>;
  updateProduct?: Maybe<IReturn>;
  updateProfile?: Maybe<IReturn>;
};


export type IMutationCreateBoardArgs = {
  contents?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  writer?: InputMaybe<Scalars['String']['input']>;
};


export type IMutationCreateProductArgs = {
  createProductInput: ICreateProductInput;
  seller?: InputMaybe<Scalars['String']['input']>;
};


export type IMutationCreateProfileArgs = {
  age?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
};


export type IMutationDeleteBoardArgs = {
  number?: InputMaybe<Scalars['Int']['input']>;
};


export type IMutationDeleteProductArgs = {
  productId?: InputMaybe<Scalars['ID']['input']>;
};


export type IMutationDeleteProfileArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type IMutationUpdateBoardArgs = {
  contents?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  writer?: InputMaybe<Scalars['String']['input']>;
};


export type IMutationUpdateProductArgs = {
  productId?: InputMaybe<Scalars['ID']['input']>;
  updateProductInput: IUpdateProductInput;
};


export type IMutationUpdateProfileArgs = {
  age?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
};

export type IProductReturn = {
  __typename?: 'ProductReturn';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  detail?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  seller?: Maybe<Scalars['String']['output']>;
};

export type IProfileReturn = {
  __typename?: 'ProfileReturn';
  age?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  school?: Maybe<Scalars['String']['output']>;
};

export type IQuery = {
  __typename?: 'Query';
  fetchBoard?: Maybe<IBoardReturn>;
  fetchBoards?: Maybe<Array<IBoardReturn>>;
  fetchBoardsCount: Scalars['Int']['output'];
  fetchProduct?: Maybe<IProductReturn>;
  fetchProducts?: Maybe<Array<IProductReturn>>;
  fetchProductsCount: Scalars['Int']['output'];
  fetchProfile?: Maybe<IProfileReturn>;
  fetchProfiles?: Maybe<Array<IProfileReturn>>;
  fetchProfilesCount: Scalars['Int']['output'];
};


export type IQueryFetchBoardArgs = {
  number?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryFetchBoardsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryFetchProductArgs = {
  productId?: InputMaybe<Scalars['ID']['input']>;
};


export type IQueryFetchProductsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryFetchProfileArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type IQueryFetchProfilesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type IReturn = {
  __typename?: 'Return';
  _id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
};

export type IUpdateProductInput = {
  detail?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
};
