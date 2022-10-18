import {Component, OnInit, Input} from '@angular/core';
import {TypeUtilisateurSavoirConcuService} from '../../../../../controller/service/TypeUtilisateurSavoirConcu.service';
import {TypeUtilisateurSavoirConcuVo} from '../../../../../controller/model/TypeUtilisateurSavoirConcu.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {TypeUtilisateurVo} from '../../../../../controller/model/TypeUtilisateur.model';
import {TypeUtilisateurService} from '../../../../../controller/service/TypeUtilisateur.service';
@Component({
  selector: 'app-type-utilisateur-savoir-concu-create-chercheur',
  templateUrl: './type-utilisateur-savoir-concu-create-chercheur.component.html',
  styleUrls: ['./type-utilisateur-savoir-concu-create-chercheur.component.css']
})
export class TypeUtilisateurSavoirConcuCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validTypeUtilisateurLibelle = true;
    _validTypeUtilisateurCode = true;



constructor(private datePipe: DatePipe, private typeUtilisateurSavoirConcuService: TypeUtilisateurSavoirConcuService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
,       private typeUtilisateurService :TypeUtilisateurService
) {

}


// methods
ngOnInit(): void {

    this.selectedTypeUtilisateur = new TypeUtilisateurVo();
    this.typeUtilisateurService.findAll().subscribe((data) => this.typeUtilisateurs = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}




private setValidation(value : boolean){
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.typeUtilisateurSavoirConcuService.save().subscribe(typeUtilisateurSavoirConcu=>{
       this.typeUtilisateurSavoirConcus.push({...typeUtilisateurSavoirConcu});
       this.createTypeUtilisateurSavoirConcuDialog = false;
       this.submitted = false;
       this.selectedTypeUtilisateurSavoirConcu = new TypeUtilisateurSavoirConcuVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
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

hideCreateDialog(){
    this.createTypeUtilisateurSavoirConcuDialog  = false;
    this.setValidation(true);
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

   get createTypeUtilisateurSavoirConcuDialog(): boolean {
           return this.typeUtilisateurSavoirConcuService.createTypeUtilisateurSavoirConcuDialog;

       }
    set createTypeUtilisateurSavoirConcuDialog(value: boolean) {
        this.typeUtilisateurSavoirConcuService.createTypeUtilisateurSavoirConcuDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validTypeUtilisateurLibelle(): boolean {
    return this._validTypeUtilisateurLibelle;
    }

    set validTypeUtilisateurLibelle(value: boolean) {
    this._validTypeUtilisateurLibelle = value;
    }
    get validTypeUtilisateurCode(): boolean {
    return this._validTypeUtilisateurCode;
    }

    set validTypeUtilisateurCode(value: boolean) {
    this._validTypeUtilisateurCode = value;
    }

}
