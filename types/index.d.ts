// TypeScript Version: 2.2

import { ServerResponse } from 'http';

interface Constants {
  [key: string]: string;
}

export const actions: Constants;
export const placeholders: Constants;

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