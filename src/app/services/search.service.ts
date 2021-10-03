import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
  ) { }

  _getWikiSearchResults(search: string): Observable<object> {

    const wikiUrl = 'http://en.wikipedia.org/w/api.php?';
    const params = new HttpParams()
      .set('action', 'opensearch')
      .set('format', 'json')
      .set('search', search)

    const searchUrl: string = wikiUrl + params.toString();

    return this.http.jsonp(searchUrl, 'callback');
  }
}
