"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
exports.close = close;
const amqplib_1 = __importDefault(require("amqplib"));
let connectionPool = [];
async function connect(url, socketOptions) {
    const foundConnection = connectionPool.find(connection => connection.url === url);
    if (foundConnection) {
        return foundConnection;
    }
    const connectionPromise = amqplib_1.default.connect(url, socketOptions);
    const connection = {
        url,
        amqpConnection: connectionPromise,
        channels: [],
        createChannel: async () => {
            const amqpConnection = await connectionPromise;
            return await amqpConnection.createChannel();
        }
    };
    connectionPool.push(connection);
    connectionPromise.catch(() => { connectionPool = connectionPool.filter(con => con.url !== url); });
    return connection;
}
async function close(url) {
    const foundConnection = connectionPool.find(connection => connection.url === url);
    if (!foundConnection)
        return;
    Promise.all(foundConnection.channels.map(channel => channel.close()));
    const amqpConnection = await foundConnection.amqpConnection;
    await amqpConnection.close();
    connectionPool = connectionPool.filter(con => con.url !== url);
}
