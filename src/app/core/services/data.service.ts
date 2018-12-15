import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppInformations } from '../interfaces/app-informations';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  public appInformations$: BehaviorSubject<AppInformations> = new BehaviorSubject(null);

  public update(): void {
    // should be httpClient and REST endpoint
  }
}
