import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HistoricalEventsService {

	constructor(private http: HttpClient) { }

	getEvents(month: number, day: number) {
		if (month && day) {
			const url = environment.eventsUrl + `/${month}/${day}`;
			return this.http.get(url).pipe(
				map((response) => {
					if (response) {
						return response;
					} else {
						return this.handleError({ 'message': `[ERROR] - There was an error trying to get the data` });
					}
				})
			).pipe(catchError(error => {
				return this.handleError({ 'message': `[ERROR] - There was an error trying to get the data` });
			}));
		} else {
			return this.handleError({ message: '[ERROR] - Error,not valid month or day' });
		}
	}

	private handleError(error: any) {
		console.warn(error.message);
		return throwError({
			'message': error.message,
			'data': null,
			'error': true
		});
	}
}
