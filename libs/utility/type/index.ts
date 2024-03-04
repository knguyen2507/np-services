import { LogLevel } from '@prisma/client';
import { Readable } from 'stream';

export type FileUpload = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
};
export type LogType = {
  id: string;
  messageId: string;
  level: LogLevel;
  timeStamp: Date;
  eventName: string;
  message: string;
  data: any;
};
