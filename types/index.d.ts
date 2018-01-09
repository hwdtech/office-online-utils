// TypeScript Version: 2.2

import { ServerResponse } from 'http';

export const actions: {
  [key: string]: string;
};

export const placeholders: {
  [key: string]: string | number;
};

export const headers: {
  request: {
    [key: string]: string;
  },
  response: {
    [key: string]: string;
  }
};

export interface OfficeUrlOptions {
  [key: string]: string
}

export interface OfficeUrl {
  readonly urlsrc: string,

  toString(wopiSrc: string, opts: OfficeUrlOptions): string;
}

export interface Action {
  readonly name: string;
  readonly ext: string;
  readonly requires: Array<string>;
  readonly url: OfficeUrl;
  readonly favicon?: string;

  getUrl(wopiSrc: string, opts: OfficeUrlOptions): string;
}

export class Discovery {
  static fromFile(file: string): Promise<Discovery>;

  static fromUrl(url: string): Promise<Discovery>;

  constructor(contents: string);

  action(protocol: string, actionName: string, extension: string): Action;
}

export interface DefaultHostPageOptions {
  officeUrl: string;
  accessToken: string;

  title?: string;
  accessTokenTtl?: number;
  favicon?: string
}

export class DefaultHostPage {
  constructor(opts: DefaultHostPageOptions);

  render(): string;

  sendResponse(res: ServerResponse): void
}

export type UrlType = 'ReadOnly' | 'ReadWrite';