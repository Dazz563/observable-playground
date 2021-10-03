import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, filter, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchService } from '../services/search.service';

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
    private searchSearvice: SearchService,
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
        switchMap((search) => this.searchSearvice._getWikiSearchResults(search)),

      ).subscribe(response => {
        console.log('search results: ', response)
        this.searchResults = response[1];
        this.loadingIcon = false;
      });
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
