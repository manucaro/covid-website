import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

import { faFemale, faMale } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-deaths-by-gender',
  templateUrl: './deaths-by-gender.component.html',
  styleUrls: ['../deaths.component.scss']
})
export class DeathsByGenderComponent implements OnInit {

  gender: any;
  deaths: any = [];
  pagedList: any = [];
  length;
  wait: boolean = true;

  faFemale = faFemale;
  faMale = faMale;

  constructor(private route: ActivatedRoute, private db: DbService) { }

  ngOnInit(): void {
    this.gender = this.route.snapshot.paramMap.get('gender');
    this.getDeathsByGender(this.gender);
  }
  
  getDeathsByGender(gender) {
    this.db.getDeathsByGender(gender).subscribe(
      data => {
        this.deaths = data;
        this.pagedList = this.deaths.slice(0, 3);
        this.length = this.deaths.length;
        this.wait = false;
      }
    );
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
}
