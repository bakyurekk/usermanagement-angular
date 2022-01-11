import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertifyType } from '../models/enum/AlertifyType.enum';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor(private toastr: ToastrService) {}

  success( message: string,type: AlertifyType){
    this.toastr.success( message,type);
  }

  error(message: string,type: AlertifyType) {
    this.toastr.error( message, type);
  }

  info( message: string, type: AlertifyType) {
    this.toastr.info(message, type);
  }

  warning( message: string, type: AlertifyType) {
    this.toastr.warning(message, type);
  }
  show(message: string, type: AlertifyType){
    this.toastr.show(message, type)
  }
}
