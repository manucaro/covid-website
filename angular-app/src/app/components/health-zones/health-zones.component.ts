import { DbService } from './../../services/db.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-health-zones',
  templateUrl: './health-zones.component.html',
  styleUrls: ['./health-zones.component.scss']
})
export class HealthZonesComponent implements OnInit {

  healthZones: any = [];
  pagedList: any= [];
  length;
  wait: boolean = true;

  constructor(private db: DbService) { }

  ngOnInit(): void {
    this.getAllHealthZones();
  }

  getAllHealthZones() {
    this.db.getAllHealthZones().subscribe(data => {
      this.healthZones = data;
      this.pagedList = this.healthZones.slice(0, 11);
      this.length = this.healthZones.length;
      this.wait = false;
    });
  }

  onPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.healthZones.length){
      endIndex = this.healthZones.length;
    }

    this.pagedList = this.healthZones.slice(startIndex, endIndex);
  }

}
