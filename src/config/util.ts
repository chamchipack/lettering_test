// utils.ts
export const toQueryString = (params: Record<string, string>) =>
  Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');

export const parseRouteParams = <T>(params: unknown, defaultParams: T): T => {
  try {
    if (typeof params === 'string') {
      return JSON.parse(params) as T;
    } else if (typeof params === 'object' && params !== null) {
      return params as T;
    }
  } catch (error) {
    console.error('🚨 params 파싱 오류:', error);
  }
  return defaultParams;
};
