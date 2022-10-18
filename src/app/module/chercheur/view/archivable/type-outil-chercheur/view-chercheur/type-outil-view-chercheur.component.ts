import {Component, OnInit} from '@angular/core';
import {TypeOutilService} from '../../../../../controller/service/TypeOutil.service';
import {TypeOutilVo} from '../../../../../controller/model/TypeOutil.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-outil-view-chercheur',
  templateUrl: './type-outil-view-chercheur.component.html',
  styleUrls: ['./type-outil-view-chercheur.component.css']
})
export class TypeOutilViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeOutilService: TypeOutilService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeOutilDialog  = false;
}

// getters and setters

get typeOutils(): Array<TypeOutilVo> {
    return this.typeOutilService.typeOutils;
       }
set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }

 get selectedTypeOutil():TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
    set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }

   get viewTypeOutilDialog():boolean {
           return this.typeOutilService.viewTypeOutilDialog;

       }
    set viewTypeOutilDialog(value: boolean) {
        this.typeOutilService.viewTypeOutilDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
