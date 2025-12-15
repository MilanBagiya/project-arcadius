import { TestBed } from '@angular/core/testing';
import { MockHttpService } from './mock-http.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('MockHttpService', () => {
  let service: MockHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockHttpService],
    });

    service = TestBed.inject(MockHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the provided data after the default delay', fakeAsync(() => {
    const mockData = { id: 1, name: 'Test' };
    let result: any;

    service.get(mockData).subscribe((data) => {
      result = data;
    });

    tick(299);
    expect(result).toBeUndefined();

    tick(1);
    expect(result).toEqual(mockData);
  }));

  it('should return the provided data after a custom delay', fakeAsync(() => {
    const mockData = ['a', 'b', 'c'];
    let result: string[] | undefined;

    service.get(mockData, 1000).subscribe((data) => {
      result = data;
    });

    tick(999);
    expect(result).toBeUndefined();

    tick(1);
    expect(result).toEqual(mockData);
  }));
});
