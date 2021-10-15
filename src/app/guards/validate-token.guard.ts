import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate {
 
  constructor(private storage:StorageService){

  }

  canActivate():  Observable<boolean> | Promise<boolean> | boolean {
    return this.storage.getValidateToken();
  }
  canLoad(): Observable<boolean> |  Promise<boolean> | boolean {
    return this.storage.getValidateToken();
  }


  
}
