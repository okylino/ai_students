function isObject(value: any) {
  return value && value instanceof Object && typeof value === 'object';
}

export const isEmptyObject = (value: any) => isObject(value) && Object.keys(value).length === 0;

function snakeToCamel(key: string) {
  return key.toLowerCase().replace(/(_\w)/g, (m) => m[1].toUpperCase());
}

export const formatSnakeObjToLowerCamel = (values: any): any => {
  if (Array.isArray(values)) {
    return values.map((childValue) => formatSnakeObjToLowerCamel(childValue));
  }
  if (isObject(values)) {
    return Object.keys(values).reduce<{ [x: string]: any }>((acc, crrKey) => {
      const camelKey = snakeToCamel(crrKey);
      acc[camelKey] = formatSnakeObjToLowerCamel(values[crrKey]);
      return acc;
    }, {});
  }
  return values;
};

export const parseState = (stateString: any) => {
  try {
    return JSON.parse(stateString ?? '{}');
  } catch (error) {
    return null;
  }
};
