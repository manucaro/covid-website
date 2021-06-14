import { DeleteDialogComponent } from './../../shared/components/delete-dialog/delete-dialog.component';
import { VaccinationModel } from 'src/app/models/vaccination.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DbService } from 'src/app/services/db.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})
export class VaccinationComponent implements OnInit {

  vaccinations: any = [];
  wait: boolean = true;
  vaccination: any = {};

  faDelete = faTrash;
  faEdit = faEdit;

  form: FormGroup;

  vaccinationDataSource = new MatTableDataSource<VaccinationModel>();
  displayedColumns: string[] = ['region', 'date', 'first_dose', 'second_dose', 'total', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private db: DbService, 
              private fb: FormBuilder, 
              private _snackBar: MatSnackBar, 
              public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getVaccinations();
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      region: ['', Validators.required],
      date: ['', Validators.required],
      first_dose: ['', Validators.required],
      second_dose: ['', Validators.required],
      total: ['', Validators.required]
    });
  }

  getVaccinations() {
    this.db.getAllVaccination().subscribe(
      data => { 
        this.vaccinations = data;
        this.vaccinationDataSource = new MatTableDataSource<VaccinationModel>(this.vaccinations);
        this.vaccinationDataSource.paginator = this.paginator;
        this.wait = false;
      });
  }

  submit(){
    if (this.form.invalid) { return; }
    this.db.addVaccination(this.vaccination).subscribe(data => {
      this._snackBar.open('Vacuna Añadida', "", {
        duration: 5000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar']
      }).afterDismissed().subscribe(()=>{
        window.location.reload();
      });
    });
  }

  delete(id){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data:{
        message: '¿Estás seguro?',
        buttonText: {
          ok: 'Eliminar',
          cancel: 'Cancelar'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.db.removeVaccination(id);
        this._snackBar.open('Vacuna eliminada', '', {
          duration: 5000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-delete']
        }).afterDismissed().subscribe(()=>{
          window.location.reload();
        });
      }
    });
  }
}
