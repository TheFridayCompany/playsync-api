export default interface ISongSearchService {
  search(query: string): Promise<any[]>;
}
