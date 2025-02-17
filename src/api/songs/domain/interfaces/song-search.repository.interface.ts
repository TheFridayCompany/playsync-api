export default interface ISongSearchRepository {
  find(query: string): Promise<any[]>;
}
