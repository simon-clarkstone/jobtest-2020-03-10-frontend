import { SearchBoxComponent } from './search-box.component';
import { SearchResults, SearchService } from '../search.service';
import { of, Observable, Subject } from 'rxjs';
import { async, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { DomainNamePipe } from '../domain-name.pipe';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let searchService: SearchService | any;

  beforeEach(() => {
    searchService = jasmine.createSpyObj('SearchService', ['search']);
    component = new SearchBoxComponent(searchService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with no results', () => {
    expect(component.results).toEqual(false);
  });

  it('puts the returned result in its field', () => {
    let results: SearchResults = [
      { engine: "SE1", href: "asdf", text: "qwer" },
    ];
    searchService.search.and.returnValue(of(results));
    component.search("foo");
    expect(component.results).toEqual(results);
  });

  it('renders the results list', async () => {
    let results: Subject<SearchResults> = new Subject();
    let searchServiceStub = {
      search: function(query: string): Observable<SearchResults> {
        expect(query).toEqual("foo");
        return results;
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ SearchBoxComponent, DomainNamePipe ],
      providers: [
        { provide: SearchService, useValue: searchServiceStub },
      ],
    }).compileComponents();
    
    const fixture = TestBed.createComponent(SearchBoxComponent);
    // before search performed
    fixture.detectChanges();
    const ele: HTMLDivElement = fixture.nativeElement;
    expect(ele.getElementsByClassName("loading-message").length).toBe(0, "loading message before search performed");
    expect(ele.getElementsByClassName("empty-message").length).toBe(1, "empty-box message before search performed");

    // search in progress
    fixture.componentInstance.search("foo");
    fixture.detectChanges();
    expect(ele.getElementsByClassName("loading-message").length).toBe(1, "loading message while results loading");
    expect(ele.getElementsByClassName("empty-message").length).toBe(0, "empty-box message while results loading");

    // search results returned
    results.next([ { engine: "SE1", href: "http://x.org/asdf", text: "qwer" } ])
    fixture.detectChanges();
    expect(ele.getElementsByClassName("loading-message").length).toBe(0, "loading message after results loaded");
    expect(ele.getElementsByClassName("empty-message").length).toBe(0, "empty-box message after results loaded");
    let cells = ele.getElementsByTagName('tr')[0].getElementsByTagName('td');
    expect(cells[0].textContent).toEqual("SE1");
    expect(cells[1].textContent).toEqual("x.org");
    expect(cells[2].textContent).toEqual("qwer");
    expect(cells[2].getElementsByTagName('a')[0].getAttribute('href')).toEqual("http://x.org/asdf");
  })
});
