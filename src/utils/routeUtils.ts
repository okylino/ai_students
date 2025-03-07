import { ROUTE_PATH } from '@/enums/routePath';

export const fillPathParams = (path: ROUTE_PATH, params: { [x: string]: string }): string =>
  Object.keys(params).reduce((updatedPath, key) => {
    const value = params[key];
    return updatedPath.replace(`:${key}`, value);
  }, path);
