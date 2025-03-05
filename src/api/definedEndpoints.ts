import {
  BaseQueryFn,
  EndpointBuilder,
  EndpointDefinitions,
  MutationDefinition,
  QueryDefinition,
} from '@reduxjs/toolkit/query';

/** Use `:variable` to define URL variables that need to be replaced */
const extractParamsFromUrl = <ArgsType>(
  url: string,
  args: ArgsType | null,
): {
  params: Partial<ArgsType> | null;
  updatedUrl: string;
} => {
  if (!args) {
    return {
      params: null,
      updatedUrl: url,
    };
  }
  if (url.match(/:(\w+)/) && (typeof args === 'string' || typeof args === 'number')) {
    return {
      params: null,
      updatedUrl: url.replace(/:(\w+)/, `${args}`),
    };
  }

  const params: Partial<ArgsType> = { ...args };
  const updatedUrl = url.replace(/:(\w+)/g, (_, key) => {
    const typeKey = key as keyof ArgsType;
    if (args[typeKey]) {
      delete params[typeKey];
      return `${args[typeKey]}`;
    }
    return _;
  });
  return {
    params: Object.keys(params).length > 0 ? params : null,
    updatedUrl,
  };
};

type OmitFromUnion<T, K extends keyof T> = T extends any ? Omit<T, K> : never;

const defineQueryBase =
  <BaseQuery extends BaseQueryFn, TagTypes extends string, ReducerPath extends string>(
    builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>,
    method: string,
  ) =>
  <ResultType, QueryParams = void>(
    url: string,
    builderConfig?: Partial<
      OmitFromUnion<QueryDefinition<QueryParams, BaseQuery, TagTypes, ResultType, ReducerPath>, 'type'>
    >,
  ) =>
    builder.query<ResultType, QueryParams>({
      query: (args: QueryParams) => {
        const { updatedUrl, params } = extractParamsFromUrl(url, args);
        return {
          method,
          url: updatedUrl,
          ...(method === 'GET' ? { params } : { body: params }),
        };
      },
      ...builderConfig,
    } as OmitFromUnion<QueryDefinition<QueryParams, BaseQuery, TagTypes, ResultType, ReducerPath>, 'type'>);

const defineMutationBase =
  <BaseQuery extends BaseQueryFn, TagTypes extends string, ReducerPath extends string>(
    builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>,
    method: string,
  ) =>
  <ResultType, QueryParams>(
    url: string,
    builderConfig?: Partial<
      OmitFromUnion<MutationDefinition<QueryParams, BaseQuery, TagTypes, ResultType, ReducerPath>, 'type'>
    >,
  ) =>
    builder.mutation<ResultType, QueryParams>({
      query: (args: QueryParams) => {
        const { updatedUrl, params } = extractParamsFromUrl(url, args);
        return {
          method,
          url: updatedUrl,
          body: params,
        };
      },
      ...builderConfig, // Spread any additional configuration
    } as OmitFromUnion<MutationDefinition<QueryParams, BaseQuery, TagTypes, ResultType, ReducerPath>, 'type'>);

type QueryMethods<BaseQuery extends BaseQueryFn, TagTypes extends string, ReducerPath extends string> = Record<
  'get' | 'post',
  ReturnType<typeof defineQueryBase<BaseQuery, TagTypes, ReducerPath>>
>;

type MutationMethods<BaseQuery extends BaseQueryFn, TagTypes extends string, ReducerPath extends string> = Record<
  'post' | 'put' | 'patch' | 'del',
  ReturnType<typeof defineMutationBase<BaseQuery, TagTypes, ReducerPath>>
>;

const defineEndpoints =
  <
    T extends EndpointDefinitions,
    BaseQuery extends BaseQueryFn,
    TagTypes extends string,
    ReducerPath extends string = 'api',
  >(
    endpoints: (methods: {
      query: QueryMethods<BaseQuery, TagTypes, ReducerPath>;
      mutation: MutationMethods<BaseQuery, TagTypes, ReducerPath>;
      builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>;
    }) => T,
  ) =>
  (builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>) => {
    const query = ['GET', 'POST'].reduce(
      (acc, method) => {
        const methodKey = method.toLowerCase();
        return { ...acc, [methodKey]: defineQueryBase<BaseQuery, TagTypes, ReducerPath>(builder, method) };
      },
      {} as QueryMethods<BaseQuery, TagTypes, ReducerPath>,
    );

    const mutation = ['POST', 'PUT', 'PATCH', 'DELETE'].reduce(
      (acc, method) => {
        const methodKey = method === 'DELETE' ? 'del' : method.toLowerCase();
        return { ...acc, [methodKey]: defineMutationBase<BaseQuery, TagTypes, ReducerPath>(builder, method) };
      },
      {} as MutationMethods<BaseQuery, TagTypes, ReducerPath>,
    );

    return endpoints({
      query,
      mutation,
      builder,
    });
  };

export default defineEndpoints;
