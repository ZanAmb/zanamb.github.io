import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com/users/ZanAmb/repos';

  private repos$: Observable<any[]> | undefined;

  constructor(private http: HttpClient) {}

  getRepos(): Observable<any[]> {
    if (!this.repos$) {
      this.repos$ = this.http.get<any[]>(this.apiUrl).pipe(shareReplay(1));
    }
    return this.repos$;
  }
  getRepoFolders(repo: string): Observable<any[]> {
  const url = `https://api.github.com/repos/ZanAmb/${repo}/contents/`;
  return this.http.get<any[]>(url).pipe(
    map(contents => contents.filter(item => item.type === 'dir'))
  );
}
getFolderContents(repo: string, path: string = ''): Observable<any[]> {
  const url = `https://api.github.com/repos/ZanAmb/${repo}/contents/${path}`;
  return this.http.get<any[]>(url).pipe(map(items => items.sort((a, b) => a.type.localeCompare(b.type))));
}
}