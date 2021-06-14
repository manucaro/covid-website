import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VaccinationModel } from 'src/app/models/vaccination.model';
import { HealthZoneModel } from '../models/health-zone.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private apiUrl = environment.api; 
  
  constructor(private http: HttpClient) { }

  getAllDeaths() {
    return this.http.get(`${this.apiUrl}/api/deaths`);
  }

  getDeath(id) {
    return this.http.get(`${this.apiUrl}/api/deaths/${id}`);
  }

  getDeathsByGender(gender: string) {
    return this.http.get(`${this.apiUrl}/api/deaths-gender/${gender}`);
  }

  getCountGender() {
    return this.http.get(`${this.apiUrl}/api/deaths-count-gender`);
  }

  getAllHealthZones() {
    return this.http.get(`${this.apiUrl}/api/health-zones`);
  }

  getHealthZone(id) {
    return this.http.get(`${this.apiUrl}/api/health-zones/${id}`);
  }

  updateHealthZone(id, healthZone: HealthZoneModel) {
    return this.http.patch(`${this.apiUrl}/api/health-zones/${id}`, healthZone);
  }

  getAllVaccination() {
    return this.http.get(`${this.apiUrl}/api/vaccination`);
  }

  getVaccination(id) {
    return this.http.get(`${this.apiUrl}/api/vaccination/${id}`);
  }

  updateVaccination(id, vaccination: VaccinationModel) {
    return this.http.put(`${this.apiUrl}/api/vaccination/${id}`, vaccination);
  }

  addVaccination(vaccination: VaccinationModel) {
    return this.http.post(`${this.apiUrl}/api/vaccination/`, vaccination);
  }

  removeVaccination(id) {
    return this.http.delete(`${this.apiUrl}/api/vaccination/${id}`).subscribe();
  }

}
