import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders,} from '@angular/common/http';

import {catchError, map, of, retry, tap, throwError} from 'rxjs';

import {Donut} from '../model/donut.model';

@Injectable()
export class DonutService {
  private donuts: Donut[] = [];
  private baseUrl: string = `/api/donuts`;
  constructor(private http: HttpClient) {}

  read() {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    const headers = new HttpHeaders({
      'API-TOKEN': 'Hello',
    });

    const options = {
      headers,
    };
    return this.http.get<Donut[]>(this.baseUrl, options).pipe(
      tap((donuts) => {
        this.donuts = donuts;
      }),
      retry({ count: 2, delay: 10000, resetOnSuccess: true }),
      catchError(this.handleError)
    );
  }

  readOne(id: string | null) {
    return this.read().pipe(
      map((donuts) => {
        const donut = donuts.find((donut: Donut) => donut.id === id);
        if (donut) return donut;
        return {
          name: '',
          icon: '',
          price: 0,
          description: '',
        };
      }),

      catchError(this.handleError)
    );
  }

  create(payload: Donut) {
    return this.http.post<Donut>(this.baseUrl, payload).pipe(
      tap((donut) => {
        this.donuts = [...this.donuts, donut];
      }),
      catchError(this.handleError)
    );
  }

  update(payload: Donut) {
    return this.http.put<Donut>(`${this.baseUrl}/${payload.id}`, payload).pipe(
      tap((newDonut) => {
        this.donuts = this.donuts.map((item) => {
          if (item.id === newDonut.id) {
            return newDonut;
          }
          return item;
        });
      }),
      catchError(this.handleError)
    );
  }

  delete(payload: Donut) {
    return this.http.delete<Donut>(`${this.baseUrl}/${payload.id}`).pipe(
      tap(() => {
        this.donuts = this.donuts.filter((donut) => donut.id !== payload.id);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client Side
      console.log('Client', error.message);
    } else {
      // Server Side
      console.log('Server', error.status);
    }
    return throwError(() => new Error(error.message));
  }
}
