import {Component, OnInit} from '@angular/core';
import {StatusCursusService} from '../../../../../controller/service/StatusCursus.service';
import {StatusCursusVo} from '../../../../../controller/model/StatusCursus.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-status-cursus-view-admin',
  templateUrl: './status-cursus-view-admin.component.html',
  styleUrls: ['./status-cursus-view-admin.component.css']
})
export class StatusCursusViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private statusCursusService: StatusCursusService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewStatusCursusDialog  = false;
}

// getters and setters

get statusCursuss(): Array<StatusCursusVo> {
    return this.statusCursusService.statusCursuss;
       }
set statusCursuss(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursuss = value;
       }

 get selectedStatusCursus():StatusCursusVo {
           return this.statusCursusService.selectedStatusCursus;
       }
    set selectedStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.selectedStatusCursus = value;
       }

   get viewStatusCursusDialog():boolean {
           return this.statusCursusService.viewStatusCursusDialog;

       }
    set viewStatusCursusDialog(value: boolean) {
        this.statusCursusService.viewStatusCursusDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
