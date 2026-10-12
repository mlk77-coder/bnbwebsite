import type { NextApiRequest } from 'next';

export interface FetcherSuccess<T> {
  status: number;
  ok: true;
  data: T;
  error: undefined;
}

/** Plain object / string only — must stay JSON-serializable for RSC → client boundaries. */
export type FetcherErrorDetail = string | { message: string; status?: number };

export interface FetcherError {
  status: number;
  ok: false;
  data: undefined;
  error: FetcherErrorDetail;
}

export type FetcherResponse<T> = FetcherSuccess<T> | FetcherError;

export function getFetcherErrorMessage(
  error: FetcherErrorDetail | undefined
): string | null {
  if (!error) return null;
  return typeof error === 'string' ? error : error.message;
}

export function getClientIP(req?: NextApiRequest | Request): string {
  if (!req) return '';

  // Handle NextApiRequest
  if ('headers' in req && !('url' in req)) {
    const headers = req.headers;
    const xForwardedFor = headers['x-forwarded-for'];
    const cfConnectingIP = headers['cf-connecting-ip'];
    const xRealIP = headers['x-real-ip'];

    if (xForwardedFor) {
      const ips = Array.isArray(xForwardedFor)
        ? xForwardedFor[0]
        : xForwardedFor.split(',')[0].trim();
      return ips;
    }

    return (
      (Array.isArray(cfConnectingIP) ? cfConnectingIP[0] : cfConnectingIP) ||
      (Array.isArray(xRealIP) ? xRealIP[0] : xRealIP) ||
      ''
    );
  }

  // Handle Request
  if (req instanceof Request) {
    const xForwardedFor = req.headers.get('x-forwarded-for');
    const cfConnectingIP = req.headers.get('cf-connecting-ip');
    const xRealIP = req.headers.get('x-real-ip');

    if (xForwardedFor) {
      return xForwardedFor.split(',')[0].trim();
    }

    return cfConnectingIP || xRealIP || '';
  }

  return '';
}

export async function fetcher<T>(
  url: string,
  lang: string = 'en',
  options: RequestInit = {},
  localServer: boolean = false,
  req?: NextApiRequest | Request
): Promise<FetcherResponse<T>> {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    lang,
  };

  // Get client IP from the original request
  const clientIP = getClientIP(req);

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
      // Only add X-Forwarded-For if we have a client IP
      ...(clientIP ? { 'X-Forwarded-For': clientIP } : {}),
    },
  };

  try {
    const baseUrl = localServer
      ? process.env.NEXT_PUBLIC_LOCAL_URL
      : process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error(
        'Base URL is not defined. Check your environment variables.'
      );
    }

    // const pathPrefix = localServer ? "api" : "user";
    // const fullUrl = constructFullUrl(baseUrl, pathPrefix, url);
    const fullUrl = constructFullUrl(baseUrl, url);

    const response = await fetch(fullUrl, config);
    const contentType = response.headers.get('content-type');

    if (
      response.ok &&
      contentType &&
      contentType.includes('application/json')
    ) {
      const data = (await response.json()) as T;
      return {
        status: response.status,
        ok: true,
        error: undefined,
        data,
      };
    } else {
      let message = response.statusText || 'Request failed';
      try {
        const text = await response.text();
        if (text) message = text.slice(0, 2000);
      } catch {
        /* ignore body read errors */
      }
      return {
        status: response.status,
        ok: false,
        error: { message, status: response.status },
        data: undefined,
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      status: 500,
      ok: false,
      error: { message },
      data: undefined,
    };
  }
}

function constructFullUrl(
  baseUrl: string,
  // pathPrefix: string,
  url: string
): string {
  // return `${baseUrl.replace(/\/$/, '')}/${pathPrefix}/${url.replace(/^\//, '')}`;
  return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}
