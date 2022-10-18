import {Component, OnInit} from '@angular/core';
import {TypeEtudeEnseignementService} from '../../../../../controller/service/TypeEtudeEnseignement.service';
import {TypeEtudeEnseignementVo} from '../../../../../controller/model/TypeEtudeEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeEtudeVo} from '../../../../../controller/model/TypeEtude.model';
import {TypeEtudeService} from '../../../../../controller/service/TypeEtude.service';
import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';

@Component({
  selector: 'app-type-etude-enseignement-view-admin',
  templateUrl: './type-etude-enseignement-view-admin.component.html',
  styleUrls: ['./type-etude-enseignement-view-admin.component.css']
})
export class TypeEtudeEnseignementViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEtudeEnseignementService: TypeEtudeEnseignementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeEtudeService :TypeEtudeService
    ,private enseignementService :EnseignementService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
    this.selectedTypeEtude = new TypeEtudeVo();
    this.typeEtudeService.findAll().subscribe((data) => this.typeEtudes = data);
}

hideViewDialog(){
    this.viewTypeEtudeEnseignementDialog  = false;
}

// getters and setters

get typeEtudeEnseignements(): Array<TypeEtudeEnseignementVo> {
    return this.typeEtudeEnseignementService.typeEtudeEnseignements;
       }
set typeEtudeEnseignements(value: Array<TypeEtudeEnseignementVo>) {
        this.typeEtudeEnseignementService.typeEtudeEnseignements = value;
       }

 get selectedTypeEtudeEnseignement():TypeEtudeEnseignementVo {
           return this.typeEtudeEnseignementService.selectedTypeEtudeEnseignement;
       }
    set selectedTypeEtudeEnseignement(value: TypeEtudeEnseignementVo) {
        this.typeEtudeEnseignementService.selectedTypeEtudeEnseignement = value;
       }

   get viewTypeEtudeEnseignementDialog():boolean {
           return this.typeEtudeEnseignementService.viewTypeEtudeEnseignementDialog;

       }
    set viewTypeEtudeEnseignementDialog(value: boolean) {
        this.typeEtudeEnseignementService.viewTypeEtudeEnseignementDialog= value;
       }

       get selectedEnseignement():EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements():Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get editEnseignementDialog():boolean {
           return this.enseignementService.editEnseignementDialog;
       }
      set editEnseignementDialog(value: boolean) {
        this.enseignementService.editEnseignementDialog= value;
       }
       get selectedTypeEtude():TypeEtudeVo {
           return this.typeEtudeService.selectedTypeEtude;
       }
      set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
       }
       get typeEtudes():Array<TypeEtudeVo> {
           return this.typeEtudeService.typeEtudes;
       }
       set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
       }
       get editTypeEtudeDialog():boolean {
           return this.typeEtudeService.editTypeEtudeDialog;
       }
      set editTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.editTypeEtudeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
