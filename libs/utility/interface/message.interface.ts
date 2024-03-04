export interface RmqMessage<T = any> {
  messageId: string;
  data: T;
}
