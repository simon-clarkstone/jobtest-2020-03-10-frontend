import { SearchService, SearchResults } from './search.service';
import { of, throwError } from 'rxjs';

describe('SearchService', () => {
  let service: SearchService;
  let http: any;

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SearchService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make the right request', () => {
    http.get.and.returnValue(of([]));
    service.search("foo");
    expect(http.get.calls.allArgs()).toEqual([["http://localhost:8080/blackdot_test/search?q=foo"]])
  });

  it('should encode the request parameter', () => {
    http.get.and.returnValue(of([]));
    service.search("foo%bar&baz#\xa3");
    expect(http.get.calls.allArgs()).toEqual([["http://localhost:8080/blackdot_test/search?q=foo%25bar%26baz%23%C2%A3"]])
  });

  it('should cope with error', () => {
    http.get.and.returnValue(throwError("Error 42"));
    let resultsList: SearchResults[] = [];
    service.search("foo").subscribe(results => resultsList.push(results));
    expect(resultsList).toEqual(["error"])
  });
});
