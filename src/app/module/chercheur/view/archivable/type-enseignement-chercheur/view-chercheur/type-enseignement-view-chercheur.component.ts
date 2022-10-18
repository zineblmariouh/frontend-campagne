import {Component, OnInit} from '@angular/core';
import {TypeEnseignementService} from '../../../../../controller/service/TypeEnseignement.service';
import {TypeEnseignementVo} from '../../../../../controller/model/TypeEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-enseignement-view-chercheur',
  templateUrl: './type-enseignement-view-chercheur.component.html',
  styleUrls: ['./type-enseignement-view-chercheur.component.css']
})
export class TypeEnseignementViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEnseignementService: TypeEnseignementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeEnseignementDialog  = false;
}

// getters and setters

get typeEnseignements(): Array<TypeEnseignementVo> {
    return this.typeEnseignementService.typeEnseignements;
       }
set typeEnseignements(value: Array<TypeEnseignementVo>) {
        this.typeEnseignementService.typeEnseignements = value;
       }

 get selectedTypeEnseignement():TypeEnseignementVo {
           return this.typeEnseignementService.selectedTypeEnseignement;
       }
    set selectedTypeEnseignement(value: TypeEnseignementVo) {
        this.typeEnseignementService.selectedTypeEnseignement = value;
       }

   get viewTypeEnseignementDialog():boolean {
           return this.typeEnseignementService.viewTypeEnseignementDialog;

       }
    set viewTypeEnseignementDialog(value: boolean) {
        this.typeEnseignementService.viewTypeEnseignementDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
