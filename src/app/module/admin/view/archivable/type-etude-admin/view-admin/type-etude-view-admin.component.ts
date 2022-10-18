import {Component, OnInit} from '@angular/core';
import {TypeEtudeService} from '../../../../../controller/service/TypeEtude.service';
import {TypeEtudeVo} from '../../../../../controller/model/TypeEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-etude-view-admin',
  templateUrl: './type-etude-view-admin.component.html',
  styleUrls: ['./type-etude-view-admin.component.css']
})
export class TypeEtudeViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEtudeService: TypeEtudeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeEtudeDialog  = false;
}

// getters and setters

get typeEtudes(): Array<TypeEtudeVo> {
    return this.typeEtudeService.typeEtudes;
       }
set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
       }

 get selectedTypeEtude():TypeEtudeVo {
           return this.typeEtudeService.selectedTypeEtude;
       }
    set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
       }

   get viewTypeEtudeDialog():boolean {
           return this.typeEtudeService.viewTypeEtudeDialog;

       }
    set viewTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.viewTypeEtudeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
