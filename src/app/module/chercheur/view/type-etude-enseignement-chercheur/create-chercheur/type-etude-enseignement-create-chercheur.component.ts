import {Component, OnInit, Input} from '@angular/core';
import {TypeEtudeEnseignementService} from '../../../../../controller/service/TypeEtudeEnseignement.service';
import {TypeEtudeEnseignementVo} from '../../../../../controller/model/TypeEtudeEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {TypeEtudeVo} from '../../../../../controller/model/TypeEtude.model';
import {TypeEtudeService} from '../../../../../controller/service/TypeEtude.service';
@Component({
  selector: 'app-type-etude-enseignement-create-chercheur',
  templateUrl: './type-etude-enseignement-create-chercheur.component.html',
  styleUrls: ['./type-etude-enseignement-create-chercheur.component.css']
})
export class TypeEtudeEnseignementCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEnseignementIntitule = true;
    _validEnseignementNombreHeure = true;
    _validEnseignementModaliteEtude = true;
    _validEnseignementTypeEtudeEnseignements = true;
    _validEnseignementNiveauEtudeEnseignements = true;
    _validEnseignementEtablissementEnseignements = true;
    _validEnseignementEnseignementZoneGeographiques = true;
    _validEnseignementEnseignementEnjeuxIrds = true;
    _validTypeEtudeLibelle = true;
    _validTypeEtudeCode = true;



constructor(private datePipe: DatePipe, private typeEtudeEnseignementService: TypeEtudeEnseignementService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private enseignementService :EnseignementService
,       private typeEtudeService :TypeEtudeService
) {

}


// methods
ngOnInit(): void {

    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
    this.selectedTypeEtude = new TypeEtudeVo();
    this.typeEtudeService.findAll().subscribe((data) => this.typeEtudes = data);
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
     this.typeEtudeEnseignementService.save().subscribe(typeEtudeEnseignement=>{
       this.typeEtudeEnseignements.push({...typeEtudeEnseignement});
       this.createTypeEtudeEnseignementDialog = false;
       this.submitted = false;
       this.selectedTypeEtudeEnseignement = new TypeEtudeEnseignementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateenseignement(enseignement: string) {
                      const isPermistted = await this.roleService.isPermitted('Enseignement', 'add');
                       if(isPermistted){
         this.selectedEnseignement = new EnseignementVo();
        this.createEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeEtude(typeEtude: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeEtude', 'add');
                       if(isPermistted){
         this.selectedTypeEtude = new TypeEtudeVo();
        this.createTypeEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createTypeEtudeEnseignementDialog  = false;
    this.setValidation(true);
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

   get createTypeEtudeEnseignementDialog(): boolean {
           return this.typeEtudeEnseignementService.createTypeEtudeEnseignementDialog;

       }
    set createTypeEtudeEnseignementDialog(value: boolean) {
        this.typeEtudeEnseignementService.createTypeEtudeEnseignementDialog= value;
       }

       get selectedEnseignement(): EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements(): Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get createEnseignementDialog(): boolean {
           return this.enseignementService.createEnseignementDialog;
       }
      set createEnseignementDialog(value: boolean) {
        this.enseignementService.createEnseignementDialog= value;
       }
       get selectedTypeEtude(): TypeEtudeVo {
           return this.typeEtudeService.selectedTypeEtude;
       }
      set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
       }
       get typeEtudes(): Array<TypeEtudeVo> {
           return this.typeEtudeService.typeEtudes;
       }
       set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
       }
       get createTypeEtudeDialog(): boolean {
           return this.typeEtudeService.createTypeEtudeDialog;
       }
      set createTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.createTypeEtudeDialog= value;
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


    get validEnseignementIntitule(): boolean {
    return this._validEnseignementIntitule;
    }

    set validEnseignementIntitule(value: boolean) {
    this._validEnseignementIntitule = value;
    }
    get validEnseignementNombreHeure(): boolean {
    return this._validEnseignementNombreHeure;
    }

    set validEnseignementNombreHeure(value: boolean) {
    this._validEnseignementNombreHeure = value;
    }
    get validEnseignementModaliteEtude(): boolean {
    return this._validEnseignementModaliteEtude;
    }

    set validEnseignementModaliteEtude(value: boolean) {
    this._validEnseignementModaliteEtude = value;
    }
    get validEnseignementTypeEtudeEnseignements(): boolean {
    return this._validEnseignementTypeEtudeEnseignements;
    }

    set validEnseignementTypeEtudeEnseignements(value: boolean) {
    this._validEnseignementTypeEtudeEnseignements = value;
    }
    get validEnseignementNiveauEtudeEnseignements(): boolean {
    return this._validEnseignementNiveauEtudeEnseignements;
    }

    set validEnseignementNiveauEtudeEnseignements(value: boolean) {
    this._validEnseignementNiveauEtudeEnseignements = value;
    }
    get validEnseignementEtablissementEnseignements(): boolean {
    return this._validEnseignementEtablissementEnseignements;
    }

    set validEnseignementEtablissementEnseignements(value: boolean) {
    this._validEnseignementEtablissementEnseignements = value;
    }
    get validEnseignementEnseignementZoneGeographiques(): boolean {
    return this._validEnseignementEnseignementZoneGeographiques;
    }

    set validEnseignementEnseignementZoneGeographiques(value: boolean) {
    this._validEnseignementEnseignementZoneGeographiques = value;
    }
    get validEnseignementEnseignementEnjeuxIrds(): boolean {
    return this._validEnseignementEnseignementEnjeuxIrds;
    }

    set validEnseignementEnseignementEnjeuxIrds(value: boolean) {
    this._validEnseignementEnseignementEnjeuxIrds = value;
    }
    get validTypeEtudeLibelle(): boolean {
    return this._validTypeEtudeLibelle;
    }

    set validTypeEtudeLibelle(value: boolean) {
    this._validTypeEtudeLibelle = value;
    }
    get validTypeEtudeCode(): boolean {
    return this._validTypeEtudeCode;
    }

    set validTypeEtudeCode(value: boolean) {
    this._validTypeEtudeCode = value;
    }

}
