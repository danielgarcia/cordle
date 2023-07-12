import { HttpError } from './HttpError';
import { config } from './config';

/**
 * Json generic type.
 */
export type Json = string | number | boolean | null | { [property: string]: Json } | Json[];

function isBlob(o: Payload): o is Blob {
    return true;
}

function isString(o: Payload): o is string {
    return typeof o === 'string';
}

type Payload = XMLHttpRequestBodyInit | Json | object | undefined;
/**
 * Http header type.
 */
export type Headers = { [map: string]: string };

export enum RequestType {
    JSON = 1,
    Blob = 2,
    Text = 3,
}
export interface Options {
    url: string;
    payload?: Payload;
    throwNoService?: boolean;
    headers?: Headers;
    requestType?: RequestType,
    externalURL?: boolean;
}

/**
 * Returns updated options.
 * @param options request options.
 * @returns Headers http request headers.
 */
function normalizeOptions(options: Options): Options {
    const requestType = options.requestType || RequestType.JSON;
    const headers: Headers = {};

    if (options.headers) {
        for (const key in options.headers) {
            const headerKey = key.toLowerCase();
            headers[headerKey] = options.headers[key];
        }
    }

    switch (requestType) {
        case RequestType.JSON:
            headers['content-type'] = 'application/json';
            break;
        case RequestType.Text:
            headers['content-type'] = 'text/plain';
            break;
        case RequestType.Blob:
            headers['content-type'] = 'multipart/form-data';
            break;
    }

    return {
        ...options,
        headers,
        requestType,
    };
}

class Http {
    public baseUrl = config.baseUrl;

    /**
     * Performs an HTTP post.
     * @param {Options} options configuration options.
     * @param options post request options.
     * @returns {Promise<R>} post response.
    */
    public async post<R>(options: Options): Promise<R> {
        const opts = normalizeOptions(options);
        try {
            let body: XMLHttpRequestBodyInit | undefined;

            switch (opts.requestType) {
                case RequestType.JSON:
                    body = JSON.stringify(opts.payload);
                    break;
                case RequestType.Blob:
                    if (isBlob(opts.payload)) {
                        body = opts.payload;
                    }
                    break;
                case RequestType.Text:
                    if (isString(opts.payload)) {
                        body = opts.payload;
                    }
                    break;
            }

            const response = await window.fetch(`${opts.externalURL? '' : this.baseUrl}${opts.url}`, {
                method: 'POST', 
                body,
                headers: opts.headers,
            });

            if (response.ok) {
                const data = await response.json() as R;
                return data;
            } else {
                throw new HttpError(response.status);
            }
        } catch (e) {
            if (opts.throwNoService) {
                throw e;
            }
            
            return {
                errorCode: 503,
            } as unknown as R;
        }
    }

    /**
     * Performs an HTTP get.
     * @param {Options} options configuration options.
     * @param options get request options.
     * @returns {Promise<R>} get response.
    */
    public async get<R = Json>(options: Options): Promise<R> {
        const opts = normalizeOptions(options);
        try {
            const response = await window.fetch(`${opts.externalURL? '' : this.baseUrl}${opts.url}`, {
                method: 'GET',
                headers: opts.headers,
            });

            if (response.ok) {
                let data: R;
                switch (opts.requestType) {
                    case RequestType.JSON:
                        data = await response.json();
                        break;
                    case RequestType.Blob:
                        data = await response.blob() as unknown as R;
                        break;
                    case RequestType.Text:
                        data = await response.text() as unknown as R;
                        break;
                    default:
                        throw new HttpError(400);
                }

                return data;
            } else {
                throw new HttpError(response.status);
            }
        } catch (e) {
            if (opts.throwNoService) {
                throw e;
            }

            return {
                errorCode: 503,
            } as unknown as R;
        }
    }
}

export const http = new Http();
