import {Component, OnInit} from '@angular/core';
import {TypeUtilisateurSavoirConcuService} from '../../../../../controller/service/TypeUtilisateurSavoirConcu.service';
import {TypeUtilisateurSavoirConcuVo} from '../../../../../controller/model/TypeUtilisateurSavoirConcu.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeUtilisateurVo} from '../../../../../controller/model/TypeUtilisateur.model';
import {TypeUtilisateurService} from '../../../../../controller/service/TypeUtilisateur.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

@Component({
  selector: 'app-type-utilisateur-savoir-concu-view-admin',
  templateUrl: './type-utilisateur-savoir-concu-view-admin.component.html',
  styleUrls: ['./type-utilisateur-savoir-concu-view-admin.component.css']
})
export class TypeUtilisateurSavoirConcuViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeUtilisateurSavoirConcuService: TypeUtilisateurSavoirConcuService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeUtilisateurService :TypeUtilisateurService
    ,private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeUtilisateur = new TypeUtilisateurVo();
    this.typeUtilisateurService.findAll().subscribe((data) => this.typeUtilisateurs = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

hideViewDialog(){
    this.viewTypeUtilisateurSavoirConcuDialog  = false;
}

// getters and setters

get typeUtilisateurSavoirConcus(): Array<TypeUtilisateurSavoirConcuVo> {
    return this.typeUtilisateurSavoirConcuService.typeUtilisateurSavoirConcus;
       }
set typeUtilisateurSavoirConcus(value: Array<TypeUtilisateurSavoirConcuVo>) {
        this.typeUtilisateurSavoirConcuService.typeUtilisateurSavoirConcus = value;
       }

 get selectedTypeUtilisateurSavoirConcu():TypeUtilisateurSavoirConcuVo {
           return this.typeUtilisateurSavoirConcuService.selectedTypeUtilisateurSavoirConcu;
       }
    set selectedTypeUtilisateurSavoirConcu(value: TypeUtilisateurSavoirConcuVo) {
        this.typeUtilisateurSavoirConcuService.selectedTypeUtilisateurSavoirConcu = value;
       }

   get viewTypeUtilisateurSavoirConcuDialog():boolean {
           return this.typeUtilisateurSavoirConcuService.viewTypeUtilisateurSavoirConcuDialog;

       }
    set viewTypeUtilisateurSavoirConcuDialog(value: boolean) {
        this.typeUtilisateurSavoirConcuService.viewTypeUtilisateurSavoirConcuDialog= value;
       }

       get selectedDeveloppementDeSavoirEtInnovationScientifique():DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
      set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }
       get developpementDeSavoirEtInnovationScientifiques():Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
       set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }
       get editDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
      set editDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }
       get selectedTypeUtilisateur():TypeUtilisateurVo {
           return this.typeUtilisateurService.selectedTypeUtilisateur;
       }
      set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
       }
       get typeUtilisateurs():Array<TypeUtilisateurVo> {
           return this.typeUtilisateurService.typeUtilisateurs;
       }
       set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
       }
       get editTypeUtilisateurDialog():boolean {
           return this.typeUtilisateurService.editTypeUtilisateurDialog;
       }
      set editTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.editTypeUtilisateurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
