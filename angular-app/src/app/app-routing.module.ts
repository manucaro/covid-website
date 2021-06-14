import { EditHealthZoneComponent } from './components/health-zones/edit-health-zone/edit-health-zone.component';
import { DeathsByIdComponent } from './components/deaths/deaths-by-id/deaths-by-id.component';
import { DeathsComponent } from './components/deaths/deaths.component';
import { HealthZonesComponent } from './components/health-zones/health-zones.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { VaccinationComponent } from './components/vaccination/vaccination.component';
import { DeathsByGenderComponent } from './components/deaths/deaths-by-gender/deaths-by-gender.component';
import { EditVaccinationComponent } from './components/vaccination/edit-vaccination/edit-vaccination.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'deaths',
    component: DeathsComponent
  },
  {
    path: 'deaths/:id',
    component: DeathsByIdComponent
  },
  {
    path: 'deaths/gender/:gender',
    component: DeathsByGenderComponent
  },
  {
    path: 'health-zones',
    component: HealthZonesComponent
  },
  {
    path: 'health-zones/:id',
    component: EditHealthZoneComponent
  },
  {
    path: 'vaccination',
    component: VaccinationComponent
  },
  {
    path: 'vaccination/:id',
    component: EditVaccinationComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
