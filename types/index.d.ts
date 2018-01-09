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
export type WorkflowType = 'Assign' | 'Submit';

export interface CheckFileInfoDto {
  // required props
  BaseFileName: string;
  OwnerId: string;
  UserId: string;
  Size: number;
  Version: string;

  // WOPI host capabilities props
  SupportedShareUrlTypes?: UrlType;
  SupportsCobalt?: boolean;
  SupportsContainers?: boolean;
  SupportsDeleteFile?: boolean;
  SupportsEcosystem?: boolean;
  SupportsExtendedLockLength?: boolean;
  SupportsFolders?: boolean;
  SupportsGetFileWopiSrc?: boolean;
  SupportsGetLock?: boolean;
  SupportsLocks?: boolean;
  SupportsRename?: boolean;
  SupportsUpdate?: boolean;
  SupportsUserInfo?: boolean;

  // metadata props
  IsAnonymousUser?: boolean;
  IsEduUser?: boolean;
  LicenseCheckForEditIsEnabled?: boolean;
  UserFriendlyName?: string;
  UserInfo?: string;

  // user permission props
  ReadOnly?: boolean;
  RestrictedWebViewOnly?: boolean;
  UserCanAttend?: boolean;
  UserCanNotWriteRelative?: boolean;
  UserCanPresent?: boolean;
  UserCanRename?: boolean;
  UserCanWrite?: boolean;

  // file URL props
  CloseUrl?: string;
  DownloadUrl?: string;
  FileSharingUrl?: string;
  FileUrl?: string;
  FileVersionUrl?: string;
  HostEditUrl?: string;
  HostEmbeddedViewUrl?: string;
  HostViewUrl?: string;
  SignoutUrl?: string;

  // breadcrumb props
  BreadcrumbBrandName?: string;
  BreadcrumbBrandUrl?: string;
  BreadcrumbDocName?: string;
  BreadcrumbFolderName?: string;
  BreadcrumbFolderUrl?: string;

  // misc props
  AllowAdditionalMicrosoftServices?: boolean;
  AllowErrorReportPrompt?: boolean;
  AllowExternalMarketplace?: boolean;
  CloseButtonClosesWindow?: boolean;
  DisablePrint?: boolean;
  DisableTranslation?: boolean;
  FileExtension?: number;
  FileNameMaxLength?: number;
  LastModifiedTime?: string;
  SHA256?: string;
  UniqueContentId?: string;

  // unused and future props
  ClientUrl?: string;
  DisableBrowserCachingOfUserContent?: boolean;
  HostAuthenticationId?: string;
  HostEmbeddedEditUrl?: string;
  HostNotes?: string;
  HostRestUrl?: string;
  IrmPolicyDescription?: string;
  IrmPolicyTitle?: string;
  PresenceProvider?: string;
  PresenceUserId?: string;
  ProtectInClient?: boolean;
  SignInUrl?: string;
  SupportsFileCreation?: boolean;
  SupportsScenarioLinks?: boolean;
  SupportsSecureStore?: boolean;
  TenantId?: string;
  TimeZone?: string;
  UserPrincipalName?: string;
  WebEditingDisabled?: boolean;
}