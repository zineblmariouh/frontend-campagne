import {Component, OnInit} from '@angular/core';
import {TypeEntiteAdministrativeService} from '../../../../../controller/service/TypeEntiteAdministrative.service';
import {TypeEntiteAdministrativeVo} from '../../../../../controller/model/TypeEntiteAdministrative.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-entite-administrative-view-admin',
  templateUrl: './type-entite-administrative-view-admin.component.html',
  styleUrls: ['./type-entite-administrative-view-admin.component.css']
})
export class TypeEntiteAdministrativeViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEntiteAdministrativeService: TypeEntiteAdministrativeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeEntiteAdministrativeDialog  = false;
}

// getters and setters

get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
    return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }

 get selectedTypeEntiteAdministrative():TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
    set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }

   get viewTypeEntiteAdministrativeDialog():boolean {
           return this.typeEntiteAdministrativeService.viewTypeEntiteAdministrativeDialog;

       }
    set viewTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.viewTypeEntiteAdministrativeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
