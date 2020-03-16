import { DomainNamePipe } from './domain-name.pipe';

describe('DomainNamePipe', () => {
  it('create an instance', () => {
    const pipe = new DomainNamePipe();
    expect(pipe).toBeTruthy();
  });
  it('works on a simple URL', () => {
    expect(new DomainNamePipe().transform("http://foo.com/bar/baz")).toEqual("foo.com");
    expect(new DomainNamePipe().transform("https://foo.com/bar/baz")).toEqual("foo.com");
  });
  it('trims www from the domain name', () => {
    expect(new DomainNamePipe().transform("http://www.x.org/qwer")).toEqual("x.org");
    expect(new DomainNamePipe().transform("http://asdf.www.x.org/qwer")).toEqual("asdf.www.x.org");
  });
  it('copes with the empty URL', () => {
    expect(new DomainNamePipe().transform("")).toEqual("???");
  });
  it('copes with a relative URL', () => {
    expect(new DomainNamePipe().transform("a.html")).toEqual("???");
  });
  it('copes with a file URL', () => {
    expect(new DomainNamePipe().transform("file:///a/b/c")).toEqual("???");
  });
  it('copes with a broken URL', () => {
    expect(new DomainNamePipe().transform("http://")).toEqual("???");
  });
});
