// TypeScript Version: 2.2

import { ServerResponse } from 'http';
import { Request } from 'express';

export const actions: {
  VIEW: string;
  EDIT: string;
  EDITNEW: string;
  CONVERT: string;
  GETINFO: string;
  INTERACTIVEPREVIEW: string;
  MOBILE_VIEW: string;
  EMBEDVIEW: string;
  IMAGEPREVIEW: string;
  FORMSUBMIT: string;
  FORMEDIT: string;
  REST: string;
  PRESENT: string;
  PRESENTSERVICE: string;
  ATTEND: string;
  ATTENDSERVICE: string;
  PRELOADEDIT: string;
  PRELOADVIEW: string;
  SYNDICATE: string;
  LEGACYWEBSERVICE: string;
  RTC: string;
  COLLAB: string;
  DOCUMENTCHAT: string;
};

export const urlPlaceholders: {
  BUSINESS_USER: string;
  DC_LLCC: string;
  DISABLE_ASYNC: string;
  DISABLE_BROADCAST: string;
  DISABLE_CHAT: string;
  EMBEDDED: string;
  FULLSCREEN: string;
  HOST_SESSION_ID: string;
  PERFSTATS: string;
  RECORDING: string;
  THEME_ID: string;
  UI_LLCC: string;
  VALIDATOR_TEST_CATEGORY: string;
};

export const wopiHeaders: {
  APP_ENDPOINT: string;
  CLIENT_VERSION: string;
  CORRELATION_ID: string;
  DEVICE_ID: string;
  SESSION_ID: string;
  MACHINE_NAME: string;
  PROOF: string;
  PROOF_OLD: string;
  TIMESTAMP: string;
  SESSION_CONTEXT: string;
  URL_TYPE: string;
  MAX_EXPECTED_SIZE: string;
  OLD_LOCK: string;
  OVERRIDE: string;
  HOST_ENDPOINT: string;
  SERVER_ERROR: string;
  SERVER_VERSION: string;
  ITEM_VERSION: string;
  LOCK: string;
  LOCK_FAILURE_REASON: string;
  REQUESTED_NAME: string;
  INVALID_FILE_NAME_ERROR: string;
  SUGGESTED_TARGET: string;
  RELATIVE_TARGET: string;
  OVERWRITE_RELATIVE_TARGET: string;
  SIZE: string;
  FILE_CONVERSION: string;
  VALID_RELATIVE_TARGET: string;
};

export const wopiMethods: {
  LOCK: string;
  GET_LOCK: string;
  REFRESH_LOCK: string;
  UNLOCK: string;
  PUT: string;
  RENAME_FILE: string;
  PUT_RELATIVE: string;
};

type Headers = {
  [header: string]: string | undefined
};

export const getHeaders: {
  fromExpressRequest: (req: Request) => Headers;
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
  FileExtension?: string;
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

export interface PutRelativeFileDto {
  Name: string;
  Url: string;
  HostViewUrl?: string;
  HostEditUrl?: string;
}