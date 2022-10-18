import {Component, OnInit} from '@angular/core';
import {StatusContratEtConventionService} from '../../../../../controller/service/StatusContratEtConvention.service';
import {StatusContratEtConventionVo} from '../../../../../controller/model/StatusContratEtConvention.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-status-contrat-et-convention-view-admin',
  templateUrl: './status-contrat-et-convention-view-admin.component.html',
  styleUrls: ['./status-contrat-et-convention-view-admin.component.css']
})
export class StatusContratEtConventionViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private statusContratEtConventionService: StatusContratEtConventionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewStatusContratEtConventionDialog  = false;
}

// getters and setters

get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
    return this.statusContratEtConventionService.statusContratEtConventions;
       }
set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
       }

 get selectedStatusContratEtConvention():StatusContratEtConventionVo {
           return this.statusContratEtConventionService.selectedStatusContratEtConvention;
       }
    set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
       }

   get viewStatusContratEtConventionDialog():boolean {
           return this.statusContratEtConventionService.viewStatusContratEtConventionDialog;

       }
    set viewStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.viewStatusContratEtConventionDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
