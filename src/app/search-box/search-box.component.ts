import { Component, OnInit } from '@angular/core';
import { SearchService, SearchResults } from '../search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  results: SearchResults = false;

  constructor(private searchService : SearchService) { }

  ngOnInit(): void {
  }

  search(query: string): void {
    this.searchService.search(query).subscribe((results: SearchResults) => {
      this.results = results;
    })
  }
}
