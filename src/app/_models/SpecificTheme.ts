export class SpecificTheme {
  id: number;
  title: string;
  text: string;
  dateTime: Date;
  author: {id: number, username: string, messageCount: number};
  hashtags: string[];
}
