/**
 * @fileoverview gRPC-Web generated client stub for app.pokermonitor
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js')
const proto = {};
proto.app = {};
proto.app.pokermonitor = require('./Pokermonitor_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.app.pokermonitor.PokermonitorClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.app.pokermonitor.PokermonitorPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.app.pokermonitor.GameInfo>}
 */
const methodDescriptor_Pokermonitor_createGame = new grpc.web.MethodDescriptor(
  '/app.pokermonitor.Pokermonitor/createGame',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.app.pokermonitor.GameInfo,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.app.pokermonitor.GameInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.app.pokermonitor.GameInfo>}
 */
const methodInfo_Pokermonitor_createGame = new grpc.web.AbstractClientBase.MethodInfo(
  proto.app.pokermonitor.GameInfo,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.app.pokermonitor.GameInfo.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.app.pokermonitor.GameInfo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.app.pokermonitor.GameInfo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.app.pokermonitor.PokermonitorClient.prototype.createGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/app.pokermonitor.Pokermonitor/createGame',
      request,
      metadata || {},
      methodDescriptor_Pokermonitor_createGame,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.app.pokermonitor.GameInfo>}
 *     A native promise that resolves to the response
 */
proto.app.pokermonitor.PokermonitorPromiseClient.prototype.createGame =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/app.pokermonitor.Pokermonitor/createGame',
      request,
      metadata || {},
      methodDescriptor_Pokermonitor_createGame);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.app.pokermonitor.JoinGameRequest,
 *   !proto.google.protobuf.BoolValue>}
 */
const methodDescriptor_Pokermonitor_joinGame = new grpc.web.MethodDescriptor(
  '/app.pokermonitor.Pokermonitor/joinGame',
  grpc.web.MethodType.UNARY,
  proto.app.pokermonitor.JoinGameRequest,
  google_protobuf_wrappers_pb.BoolValue,
  /**
   * @param {!proto.app.pokermonitor.JoinGameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.BoolValue.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.app.pokermonitor.JoinGameRequest,
 *   !proto.google.protobuf.BoolValue>}
 */
const methodInfo_Pokermonitor_joinGame = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.BoolValue,
  /**
   * @param {!proto.app.pokermonitor.JoinGameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.BoolValue.deserializeBinary
);


/**
 * @param {!proto.app.pokermonitor.JoinGameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.BoolValue)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.BoolValue>|undefined}
 *     The XHR Node Readable Stream
 */
proto.app.pokermonitor.PokermonitorClient.prototype.joinGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/app.pokermonitor.Pokermonitor/joinGame',
      request,
      metadata || {},
      methodDescriptor_Pokermonitor_joinGame,
      callback);
};


/**
 * @param {!proto.app.pokermonitor.JoinGameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.BoolValue>}
 *     A native promise that resolves to the response
 */
proto.app.pokermonitor.PokermonitorPromiseClient.prototype.joinGame =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/app.pokermonitor.Pokermonitor/joinGame',
      request,
      metadata || {},
      methodDescriptor_Pokermonitor_joinGame);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.app.pokermonitor.GameInfo,
 *   !proto.google.protobuf.StringValue>}
 */
const methodDescriptor_Pokermonitor_listPlayers = new grpc.web.MethodDescriptor(
  '/app.pokermonitor.Pokermonitor/listPlayers',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.app.pokermonitor.GameInfo,
  google_protobuf_wrappers_pb.StringValue,
  /**
   * @param {!proto.app.pokermonitor.GameInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.StringValue.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.app.pokermonitor.GameInfo,
 *   !proto.google.protobuf.StringValue>}
 */
const methodInfo_Pokermonitor_listPlayers = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.StringValue,
  /**
   * @param {!proto.app.pokermonitor.GameInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.StringValue.deserializeBinary
);


/**
 * @param {!proto.app.pokermonitor.GameInfo} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.StringValue>}
 *     The XHR Node Readable Stream
 */
proto.app.pokermonitor.PokermonitorClient.prototype.listPlayers =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/app.pokermonitor.Pokermonitor/listPlayers',
      request,
      metadata || {},
      methodDescriptor_Pokermonitor_listPlayers);
};


/**
 * @param {!proto.app.pokermonitor.GameInfo} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.StringValue>}
 *     The XHR Node Readable Stream
 */
proto.app.pokermonitor.PokermonitorPromiseClient.prototype.listPlayers =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/app.pokermonitor.Pokermonitor/listPlayers',
      request,
      metadata || {},
      methodDescriptor_Pokermonitor_listPlayers);
};


module.exports = proto.app.pokermonitor;

