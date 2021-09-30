import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, filter, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchInput') input: ElementRef;
  searchSub: Subscription;
  loadingIcon = false;
  searchResults = [];

  constructor(
    private http: HttpClient,
  ) { }



  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.searchSub = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        filter((text) => text.length > 0),
        tap(() => this.loadingIcon = true),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((search) => this.getWikiSearchResults(search)),

      ).subscribe(response => {
        console.log('search results: ', response)
        this.searchResults = response[1];
        this.loadingIcon = false;
      });
  }

  getWikiSearchResults(search: string) {

    const wikiUrl = 'http://en.wikipedia.org/w/api.php?';
    const params = new HttpParams()
      .set('action', 'opensearch')
      .set('format', 'json')
      .set('search', search)

    const searchUrl: string = wikiUrl + params.toString();

    return this.http.jsonp(searchUrl, 'callback');
  }

  onItemClick(option: string) {
    console.log('On Item click: ', option);
  }

  ngOnDestroy(): void {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

}
