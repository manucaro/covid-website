import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-edit-health-zone',
  templateUrl: './edit-health-zone.component.html',
  styleUrls: ['./edit-health-zone.component.scss']
})
export class EditHealthZoneComponent implements OnInit {

  healthZoneID = "";
  healthZone: any = [];
  date;
  title = "";
  form: FormGroup;

  constructor(private db: DbService, private fb: FormBuilder, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.healthZoneID = this.route.snapshot.paramMap.get('id');
    this.getHealthZone();
    this.createForm();
  }

  getHealthZone() {
    this.healthZone = this.db.getHealthZone(this.healthZoneID).subscribe(data => {
      this.healthZone = data;
      this.title = this.healthZone.zona_basica_salud;
    });
  }

  createForm() {
    this.form = this.fb.group({
      zona_basica_salud: [this.healthZone.zona_basica_salud],
      fecha_informe: [new Date(this.healthZone.fecha_informe)],
      casos_confirmados_totales: [this.healthZone.casos_confirmados_totales],
      tasa_incidencia_acumulada_total: [this.healthZone.tasa_incidencia_acumulada_total]
    });
  }

  submit(){
    console.log(this.healthZone);
    if (this.form.invalid) { return; }
    this.db.updateHealthZone(this.healthZoneID, this.healthZone).subscribe(data => {
      this._snackBar.open('Modificado correctamente', "", {
        duration: 5000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar']
      }).afterDismissed().subscribe(()=>{
        window.location.reload();
      });;
    });
  }

}
