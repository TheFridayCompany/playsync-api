export class Artist {
  id: string;
  name: string;
  uri: string;
  web_urls: string[];
  uris: string[];

  constructor(id: string, name: string,web_urls: string[],  uris: string[], ) {
    this.id = id;
    this.name = name;
    this.web_urls = web_urls;
    this.uris = uris;
  }
}
