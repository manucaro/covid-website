import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-edit-vaccination',
  templateUrl: './edit-vaccination.component.html',
  styleUrls: ['./edit-vaccination.component.scss']
})
export class EditVaccinationComponent implements OnInit {

  vaccinationID = "";
  vaccination: any = [];
  date;
  title = "";
  form: FormGroup;

  constructor(private db: DbService, private fb: FormBuilder, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.vaccinationID = this.route.snapshot.paramMap.get('id');
    this.getVaccination();
    this.createForm();
  }

  getVaccination() {
    this.vaccination = this.db.getVaccination(this.vaccinationID).subscribe(data => {
      this.vaccination = data;
      this.title = this.vaccination.comunidad_autonoma;
    });
  }

  createForm() {
    this.form = this.fb.group({
      comunidad_autonoma: [this.vaccination.comunidad_autonoma],
      fecha: [new Date(this.vaccination.fecha)],
      porcentaje_primera_dosis: [this.vaccination.porcentaje_primera_dosis],
      porcentaje_segunda_dosis: [this.vaccination.porcentaje_segunda_dosis],
      porcentaje_total: [this.vaccination.porcentaje_total]
    });
  }

  submit(){
    if (this.form.invalid) { return; }
    this.db.updateVaccination(this.vaccinationID, this.vaccination).subscribe(data => {
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
