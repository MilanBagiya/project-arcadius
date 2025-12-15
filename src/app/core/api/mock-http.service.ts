import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MockHttpService {
  get<T>(data: T, delayMs = 300): Observable<T> {
    return of(data).pipe(delay(delayMs));
  }
}
