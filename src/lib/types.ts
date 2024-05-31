export type Source = {
  name: string;
  id: unknown;
};
export interface Headlines {
  title: string;
  source: Source;
  description: string;
  url: URL;
  urlToImage: URL;
  publishedAt: string;
  content: string;
}
