import { DbService } from 'src/app/services/db.service';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeathModel } from 'src/app/models/death.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HealthZoneModel } from 'src/app/models/health-zone.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  deathsDataSource = new MatTableDataSource<DeathModel>();
  healthZonesDataSource = new MatTableDataSource<HealthZoneModel>();
  deaths: any = [];
  healthZones: any = [];
  wait: boolean = true;
  waitD: boolean = true;
  waitH: boolean = true;

  deathsDisplayedColumns: string[] = ['sexo', 'edad', 'mes', 'total'];
  healthZonesDisplayedColumns: string[] = ['zona_basica_salud', 'fecha_informe', 'casos_confirmados_totales', 'tasa_incidencia_acumulada_total'];

  @ViewChild('healthPaginator') healthPaginator: MatPaginator;
  @ViewChild('deathPaginator') deathPaginator: MatPaginator;

  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  constructor(private db: DbService) { }

  ngOnInit(): void {
    this.getAllDeaths();
    this.getAllHealthZones();
  }

  getAllDeaths() {
    this.db.getAllDeaths().subscribe(data => {
      this.deaths = data;
      this.deathsDataSource = new MatTableDataSource<DeathModel>(this.deaths);
      this.deathsDataSource.sort = this.sort.toArray()[0];
      this.deathsDataSource.paginator = this.deathPaginator;
      this.waitD = false;
      if (this.waitH == false) {
        this.wait = false;
      } 
    });
  }

  getAllHealthZones() {
    this.db.getAllHealthZones().subscribe(data => {
      this.healthZones = data;
      this.healthZonesDataSource = new MatTableDataSource<HealthZoneModel>(this.healthZones);
      this.healthZonesDataSource.sort = this.sort.toArray()[1];
      this.healthZonesDataSource.paginator = this.healthPaginator;
      this.waitH = false;
      if (this.waitD == false) {
        this.wait = false;
      } 
    });
  }

  applyFilterD(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.deathsDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterH(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.healthZonesDataSource.filter = filterValue.trim().toLowerCase();
  }
}

