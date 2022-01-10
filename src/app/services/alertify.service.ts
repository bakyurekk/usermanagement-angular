import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertifyType } from '../models/enum/AlertifyType.enum';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor(private toastr: ToastrService) {}

  success(type: AlertifyType, message: string) {
    this.toastr.success(type, message);
  }

  error(type: AlertifyType, message: string) {
    this.toastr.error(type, message);
  }

  info(type: AlertifyType, message: string) {
    this.toastr.info(type, message);
  }

  warning(type: AlertifyType, message: string) {
    this.toastr.warning(type, message);
  }
}
