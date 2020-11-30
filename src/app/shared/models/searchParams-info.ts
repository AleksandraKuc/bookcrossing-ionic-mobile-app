export class SearchParamsInfo {
  title: string;
  category: string;
  username: string;
  filterUserResults: boolean;
  maxResults: number;
  page: number;

  constructor() {
  }

  setBookValues(title: string, category: string, maxResults?: number, page?: number, username?: string) {
    this.title = title;
    this.category = category;
    this.username = username;
    this.maxResults = maxResults;
    this.page = page;
  }

  setUserValues(filterResults: boolean, username: string, maxResults?: number, page?: number) {
    this.filterUserResults = filterResults;
    this.username = username;
    this.maxResults = maxResults;
    this.page = page;
  }
}
