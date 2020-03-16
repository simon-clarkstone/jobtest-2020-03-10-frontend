import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface SearchResult {
  engine: string,
	href: string,
  text: string,
}

// List of results; false for uninitialised, "error" if there was an error while fetching from the server
export type SearchResults = SearchResult[] | false | "error";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(query: string): Observable<SearchResults> {
    if (!query.trim()) {
      return of(false);
    }
    return this.http.get<SearchResult[]>(`http://localhost:8080/blackdot_test/search?q=${encodeURIComponent(query)}`).pipe(
      catchError((error: any): Observable<SearchResults> => {
        console.error(error);
        return of("error");
      })
    );
  }
}
