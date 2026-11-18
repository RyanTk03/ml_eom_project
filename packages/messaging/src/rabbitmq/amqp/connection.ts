import amqp, { type ChannelModel, type Channel } from "amqplib";

export interface Connection {
  url: string;
  amqpConnection: Promise<ChannelModel>;
  channels: Channel[];
  createChannel: () => Promise<Channel> 
}

let connectionPool: Connection[] = [];
let lastConnection: Connection | undefined;

export async function connect(url: string, socketOptions?: Record<string, any>): Promise<Connection> {
  const foundConnection = connectionPool.find(connection => connection.url === url);
  if (foundConnection) {
    return foundConnection;
  }

  const connectionPromise = amqp.connect(url, socketOptions);
  lastConnection = {
    url,
    amqpConnection: connectionPromise,
    channels: [],
    createChannel: async () => {
      const amqpConnection = await connectionPromise;

      return await amqpConnection.createChannel();
    }
  };

  connectionPool.push(lastConnection);

  connectionPromise.catch(() => { connectionPool = connectionPool.filter(con => con.url !== url); });
  
  return lastConnection;
}

export async function close(url: string): Promise<void> {
  const foundConnection = connectionPool.find(connection => connection.url === url);
  if (!foundConnection) return;

  Promise.all(foundConnection.channels.map(channel => channel.close()));

  const amqpConnection = await foundConnection.amqpConnection;
  await amqpConnection.close();

  connectionPool = connectionPool.filter(con => con.url !== url);
}

export const getConnection = () => {
  return lastConnection;
}

export const getConnections = () => {
  return connectionPool;
}
