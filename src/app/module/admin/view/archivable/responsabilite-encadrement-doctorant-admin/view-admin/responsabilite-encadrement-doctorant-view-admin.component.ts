import {Component, OnInit} from '@angular/core';
import {ResponsabiliteEncadrementDoctorantService} from '../../../../../controller/service/ResponsabiliteEncadrementDoctorant.service';
import {ResponsabiliteEncadrementDoctorantVo} from '../../../../../controller/model/ResponsabiliteEncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-responsabilite-encadrement-doctorant-view-admin',
  templateUrl: './responsabilite-encadrement-doctorant-view-admin.component.html',
  styleUrls: ['./responsabilite-encadrement-doctorant-view-admin.component.css']
})
export class ResponsabiliteEncadrementDoctorantViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private responsabiliteEncadrementDoctorantService: ResponsabiliteEncadrementDoctorantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewResponsabiliteEncadrementDoctorantDialog  = false;
}

// getters and setters

get responsabiliteEncadrementDoctorants(): Array<ResponsabiliteEncadrementDoctorantVo> {
    return this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants;
       }
set responsabiliteEncadrementDoctorants(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants = value;
       }

 get selectedResponsabiliteEncadrementDoctorant():ResponsabiliteEncadrementDoctorantVo {
           return this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant;
       }
    set selectedResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant = value;
       }

   get viewResponsabiliteEncadrementDoctorantDialog():boolean {
           return this.responsabiliteEncadrementDoctorantService.viewResponsabiliteEncadrementDoctorantDialog;

       }
    set viewResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.viewResponsabiliteEncadrementDoctorantDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
