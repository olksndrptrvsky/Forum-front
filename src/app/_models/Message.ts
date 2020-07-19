export class Message {
  id: number;
  text: string;
  themeId: number;
  dateTime: Date;
  author: {id: number, username: string, messageCount: number};
  hasReplies: boolean
  replyMessageId: number = null;
}
