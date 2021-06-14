import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DbService } from 'src/app/services/db.service';
import { faFemale, faMale, faVenusMars, faBirthdayCake, faSkull, faCalendar } from '@fortawesome/free-solid-svg-icons';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-deaths',
  templateUrl: './deaths.component.html',
  styleUrls: ['./deaths.component.scss']
})
export class DeathsComponent implements OnInit {

  deaths: any = [];
  pagedList: any = [];
  length;
  wait: boolean = true;
  countByGender: any = [];

  // ICONS USADOS 

  faFemale = faFemale;
  faMale = faMale;
  faBothGenders = faVenusMars;
  faBirthday = faBirthdayCake;
  faDeath = faSkull;
  faCalendar = faCalendar;

  // GRAPHICS 

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = [['Muertes', 'Mujeres'], ['Muertes', 'Hombres']];

  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [];

  constructor(private db: DbService) { }

  ngOnInit(): void {
    this.getAllDeaths();
    this.getDeathsCountByGender();
  }

  getAllDeaths() {
    this.db.getAllDeaths().subscribe(data => {
      this.deaths = data;
      this.pagedList = this.deaths.slice(0, 4);
      this.length = this.deaths.length;
      this.wait = false;
    });
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.deaths.length) {
      endIndex = this.deaths.length;
    }

    this.pagedList = this.deaths.slice(startIndex, endIndex);
  }

  getDeathsCountByGender() {
    this.db.getCountGender().subscribe(data => {
      this.countByGender = data;
      this.pieChartData = [data['Mujeres'].countMujeres, data['Hombres'].countHombres];
      monkeyPatchChartJsTooltip();
    });
  }

}
