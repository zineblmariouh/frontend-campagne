import {Component, OnInit, Input} from '@angular/core';
import {NiveauEtudeEnseignementService} from '../../../../../controller/service/NiveauEtudeEnseignement.service';
import {NiveauEtudeEnseignementVo} from '../../../../../controller/model/NiveauEtudeEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {NiveauEtudeVo} from '../../../../../controller/model/NiveauEtude.model';
import {NiveauEtudeService} from '../../../../../controller/service/NiveauEtude.service';
@Component({
  selector: 'app-niveau-etude-enseignement-create-chercheur',
  templateUrl: './niveau-etude-enseignement-create-chercheur.component.html',
  styleUrls: ['./niveau-etude-enseignement-create-chercheur.component.css']
})
export class NiveauEtudeEnseignementCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validNiveauEtudeLibelle = true;
    _validNiveauEtudeCode = true;
    _validEnseignementIntitule = true;
    _validEnseignementNombreHeure = true;
    _validEnseignementModaliteEtude = true;
    _validEnseignementTypeEtudeEnseignements = true;
    _validEnseignementNiveauEtudeEnseignements = true;
    _validEnseignementEtablissementEnseignements = true;
    _validEnseignementEnseignementZoneGeographiques = true;
    _validEnseignementEnseignementEnjeuxIrds = true;



constructor(private datePipe: DatePipe, private niveauEtudeEnseignementService: NiveauEtudeEnseignementService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private enseignementService :EnseignementService
,       private niveauEtudeService :NiveauEtudeService
) {

}


// methods
ngOnInit(): void {

    this.selectedNiveauEtude = new NiveauEtudeVo();
    this.niveauEtudeService.findAll().subscribe((data) => this.niveauEtudes = data);
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
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
     this.niveauEtudeEnseignementService.save().subscribe(niveauEtudeEnseignement=>{
       this.niveauEtudeEnseignements.push({...niveauEtudeEnseignement});
       this.createNiveauEtudeEnseignementDialog = false;
       this.submitted = false;
       this.selectedNiveauEtudeEnseignement = new NiveauEtudeEnseignementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateniveauEtude(niveauEtude: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauEtude', 'add');
                       if(isPermistted){
         this.selectedNiveauEtude = new NiveauEtudeVo();
        this.createNiveauEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
// methods

hideCreateDialog(){
    this.createNiveauEtudeEnseignementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get niveauEtudeEnseignements(): Array<NiveauEtudeEnseignementVo> {
    return this.niveauEtudeEnseignementService.niveauEtudeEnseignements;
       }
set niveauEtudeEnseignements(value: Array<NiveauEtudeEnseignementVo>) {
        this.niveauEtudeEnseignementService.niveauEtudeEnseignements = value;
       }

 get selectedNiveauEtudeEnseignement():NiveauEtudeEnseignementVo {
           return this.niveauEtudeEnseignementService.selectedNiveauEtudeEnseignement;
       }
    set selectedNiveauEtudeEnseignement(value: NiveauEtudeEnseignementVo) {
        this.niveauEtudeEnseignementService.selectedNiveauEtudeEnseignement = value;
       }

   get createNiveauEtudeEnseignementDialog(): boolean {
           return this.niveauEtudeEnseignementService.createNiveauEtudeEnseignementDialog;

       }
    set createNiveauEtudeEnseignementDialog(value: boolean) {
        this.niveauEtudeEnseignementService.createNiveauEtudeEnseignementDialog= value;
       }

       get selectedNiveauEtude(): NiveauEtudeVo {
           return this.niveauEtudeService.selectedNiveauEtude;
       }
      set selectedNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.selectedNiveauEtude = value;
       }
       get niveauEtudes(): Array<NiveauEtudeVo> {
           return this.niveauEtudeService.niveauEtudes;
       }
       set niveauEtudes(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudes = value;
       }
       get createNiveauEtudeDialog(): boolean {
           return this.niveauEtudeService.createNiveauEtudeDialog;
       }
      set createNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.createNiveauEtudeDialog= value;
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


    get validNiveauEtudeLibelle(): boolean {
    return this._validNiveauEtudeLibelle;
    }

    set validNiveauEtudeLibelle(value: boolean) {
    this._validNiveauEtudeLibelle = value;
    }
    get validNiveauEtudeCode(): boolean {
    return this._validNiveauEtudeCode;
    }

    set validNiveauEtudeCode(value: boolean) {
    this._validNiveauEtudeCode = value;
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

}
