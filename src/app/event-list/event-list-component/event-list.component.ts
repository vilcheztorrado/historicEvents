import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { EventData } from '../model/eventData';
import { HistoricalEventsService } from '../services/historical-events.service';

@Component({
	selector: 'app-event-list',
	templateUrl: './event-list.component.html',
	styleUrls: ['./event-list.component.sass']
})
export class EventListComponent implements OnInit, OnDestroy {

	public dataSource: MatTableDataSource<EventData> = new MatTableDataSource();
	public events: Observable<any>;
	private currentMergedEvents: Array<any> = [];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	public selectedDate = new FormControl(new Date());
	public form = new FormGroup({ 
		type: new FormControl('')
	});
	public loading: boolean = false;

	constructor(public dialog: MatDialog, private historicalEventsService: HistoricalEventsService) {}

	ngOnInit(): void {
		this.form.valueChanges.subscribe(this.filterEvents.bind(this));
		this.events = this.dataSource.connect();
		this.getEvents(new Date());
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	  }

	getEvents(date: Date) {
		if (date.toDateString() !== 'Invalid Date') {
			this.dataSource.data = [];
			this.loading = true;
			let month = date.getMonth() + 1;
			let day = date.getDate();
			this.historicalEventsService.getEvents(month, day).subscribe(
				this.mergeEvents.bind(this),
				error =>{
					console.error('There was an error trying to obtain the data');
				},
				() => {
					this.loading = false;
				});
		}
	}

	mergeEvents(eventItem: any) {
		let births = eventItem.data['Births'].map(item => {item.type = 'birth'; return item});
		let deaths = eventItem.data['Deaths'].map(item => {item.type = 'death'; return item});
		let events = eventItem.data['Events'].map(item => {item.type = 'event'; return item});
		this.currentMergedEvents = births.concat(deaths).concat(events);
		this.currentMergedEvents = this.currentMergedEvents.sort(function (a, b) {
			if (a.year < b.year) {
			  return 1;
			}
			if (a.year > b.year) {
			  return -1;
			}
			return 0;
		  });
		  console.log(this.currentMergedEvents);
		  this.dataSource.data = this.currentMergedEvents;
	}

	filterEvents(fields) {
		let itemsToFilter = [...this.currentMergedEvents];
		for (let key in fields) {
			itemsToFilter = itemsToFilter.filter(item => item[key] === fields[key]);
		}
		this.dataSource.data = itemsToFilter;
	}

	openDetail(links: Array<any>) {
		this.dialog.open(EventDetailComponent, {
            width: '25vw',
            data: links
        });
	}

	ngOnDestroy(): void {
		this.dataSource.disconnect();
	}

}
