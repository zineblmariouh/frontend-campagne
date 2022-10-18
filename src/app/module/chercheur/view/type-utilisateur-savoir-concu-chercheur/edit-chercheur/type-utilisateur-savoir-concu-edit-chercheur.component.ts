import {Component, OnInit} from '@angular/core';
import {TypeUtilisateurSavoirConcuService} from '../../../../../controller/service/TypeUtilisateurSavoirConcu.service';
import {TypeUtilisateurSavoirConcuVo} from '../../../../../controller/model/TypeUtilisateurSavoirConcu.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeUtilisateurVo} from '../../../../../controller/model/TypeUtilisateur.model';
import {TypeUtilisateurService} from '../../../../../controller/service/TypeUtilisateur.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

@Component({
  selector: 'app-type-utilisateur-savoir-concu-edit-chercheur',
  templateUrl: './type-utilisateur-savoir-concu-edit-chercheur.component.html',
  styleUrls: ['./type-utilisateur-savoir-concu-edit-chercheur.component.css']
})
export class TypeUtilisateurSavoirConcuEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeUtilisateurSavoirConcuService: TypeUtilisateurSavoirConcuService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeUtilisateurService: TypeUtilisateurService
 ,       private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeUtilisateur = new TypeUtilisateurVo();
    this.typeUtilisateurService.findAll().subscribe((data) => this.typeUtilisateurs = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.typeUtilisateurSavoirConcuService.edit().subscribe(typeUtilisateurSavoirConcu=>{
    const myIndex = this.typeUtilisateurSavoirConcus.findIndex(e => e.id === this.selectedTypeUtilisateurSavoirConcu.id);
    this.typeUtilisateurSavoirConcus[myIndex] = this.selectedTypeUtilisateurSavoirConcu;
    this.editTypeUtilisateurSavoirConcuDialog = false;
    this.selectedTypeUtilisateurSavoirConcu = new TypeUtilisateurSavoirConcuVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatedeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'add');
                       if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
        this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeUtilisateur(typeUtilisateur: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeUtilisateur', 'add');
                       if(isPermistted){
         this.selectedTypeUtilisateur = new TypeUtilisateurVo();
        this.createTypeUtilisateurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editTypeUtilisateurSavoirConcuDialog  = false;
}

// getters and setters

get typeUtilisateurSavoirConcus(): Array<TypeUtilisateurSavoirConcuVo> {
    return this.typeUtilisateurSavoirConcuService.typeUtilisateurSavoirConcus;
       }
set typeUtilisateurSavoirConcus(value: Array<TypeUtilisateurSavoirConcuVo>) {
        this.typeUtilisateurSavoirConcuService.typeUtilisateurSavoirConcus = value;
       }

 get selectedTypeUtilisateurSavoirConcu(): TypeUtilisateurSavoirConcuVo {
           return this.typeUtilisateurSavoirConcuService.selectedTypeUtilisateurSavoirConcu;
       }
    set selectedTypeUtilisateurSavoirConcu(value: TypeUtilisateurSavoirConcuVo) {
        this.typeUtilisateurSavoirConcuService.selectedTypeUtilisateurSavoirConcu = value;
       }

   get editTypeUtilisateurSavoirConcuDialog(): boolean {
           return this.typeUtilisateurSavoirConcuService.editTypeUtilisateurSavoirConcuDialog;

       }
    set editTypeUtilisateurSavoirConcuDialog(value: boolean) {
        this.typeUtilisateurSavoirConcuService.editTypeUtilisateurSavoirConcuDialog = value;
       }

       get selectedDeveloppementDeSavoirEtInnovationScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
      set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }
       get developpementDeSavoirEtInnovationScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
       set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }
       get createDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
      set createDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }
       get selectedTypeUtilisateur(): TypeUtilisateurVo {
           return this.typeUtilisateurService.selectedTypeUtilisateur;
       }
      set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
       }
       get typeUtilisateurs(): Array<TypeUtilisateurVo> {
           return this.typeUtilisateurService.typeUtilisateurs;
       }
       set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
       }
       get createTypeUtilisateurDialog(): boolean {
           return this.typeUtilisateurService.createTypeUtilisateurDialog;
       }
      set createTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.createTypeUtilisateurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
