const request = {
  APP_ENDPOINT: 'X-WOPI-AppEndpoint',
  CLIENT_VERSION: 'X-WOPI-ClientVersion',
  CORRELATION_ID: 'X-WOPI-CorrelationId',
  DEVICE_ID: 'X-WOPI-DeviceId',
  SESSION_ID: 'X-WOPI-SessionId',
  MACHINE_NAME: 'X-WOPI-MachineName',
  PROOF: 'X-WOPI-Proof',
  PROOF_OLD: 'X-WOPI-ProofOld',
  TIMESTAMP: 'X-WOPI-TimeStamp',

  SESSION_CONTEXT: 'X-WOPI-SessionContext',
  URL_TYPE: 'X-WOPI-UrlType'
};

const response = {
  HOST_ENDPOINT: 'X-WOPI-HostEndpoint',
  MACHINE_NAME: 'X-WOPI-MachineName',
  SERVER_ERROR: 'X-WOPI-ServerError',
  SERVER_VERSION: 'X-WOPI-ServerVersion'
};

module.exports = {
  request,
  response
};
