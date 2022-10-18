import {Component, OnInit} from '@angular/core';
import {RoleDeveloppementDeSavoirService} from '../../../../../controller/service/RoleDeveloppementDeSavoir.service';
import {RoleDeveloppementDeSavoirVo} from '../../../../../controller/model/RoleDeveloppementDeSavoir.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-role-developpement-de-savoir-view-chercheur',
  templateUrl: './role-developpement-de-savoir-view-chercheur.component.html',
  styleUrls: ['./role-developpement-de-savoir-view-chercheur.component.css']
})
export class RoleDeveloppementDeSavoirViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewRoleDeveloppementDeSavoirDialog  = false;
}

// getters and setters

get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
    return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
       }
set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
       }

 get selectedRoleDeveloppementDeSavoir():RoleDeveloppementDeSavoirVo {
           return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
       }
    set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
       }

   get viewRoleDeveloppementDeSavoirDialog():boolean {
           return this.roleDeveloppementDeSavoirService.viewRoleDeveloppementDeSavoirDialog;

       }
    set viewRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.viewRoleDeveloppementDeSavoirDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
