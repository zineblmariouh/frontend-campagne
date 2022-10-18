import {Component, OnInit, Input} from '@angular/core';
import {EnseignementEnjeuxIrdService} from '../../../../../controller/service/EnseignementEnjeuxIrd.service';
import {EnseignementEnjeuxIrdVo} from '../../../../../controller/model/EnseignementEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
@Component({
  selector: 'app-enseignement-enjeux-ird-create-chercheur',
  templateUrl: './enseignement-enjeux-ird-create-chercheur.component.html',
  styleUrls: ['./enseignement-enjeux-ird-create-chercheur.component.css']
})
export class EnseignementEnjeuxIrdCreateChercheurComponent implements OnInit {

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
    _validEnjeuxIrdLibelle = true;
    _validEnjeuxIrdCode = true;



constructor(private datePipe: DatePipe, private enseignementEnjeuxIrdService: EnseignementEnjeuxIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private enseignementService :EnseignementService
,       private enjeuxIrdService :EnjeuxIrdService
) {

}


// methods
ngOnInit(): void {

    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
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
     this.enseignementEnjeuxIrdService.save().subscribe(enseignementEnjeuxIrd=>{
       this.enseignementEnjeuxIrds.push({...enseignementEnjeuxIrd});
       this.createEnseignementEnjeuxIrdDialog = false;
       this.submitted = false;
       this.selectedEnseignementEnjeuxIrd = new EnseignementEnjeuxIrdVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
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
    this.createEnseignementEnjeuxIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get enseignementEnjeuxIrds(): Array<EnseignementEnjeuxIrdVo> {
    return this.enseignementEnjeuxIrdService.enseignementEnjeuxIrds;
       }
set enseignementEnjeuxIrds(value: Array<EnseignementEnjeuxIrdVo>) {
        this.enseignementEnjeuxIrdService.enseignementEnjeuxIrds = value;
       }

 get selectedEnseignementEnjeuxIrd():EnseignementEnjeuxIrdVo {
           return this.enseignementEnjeuxIrdService.selectedEnseignementEnjeuxIrd;
       }
    set selectedEnseignementEnjeuxIrd(value: EnseignementEnjeuxIrdVo) {
        this.enseignementEnjeuxIrdService.selectedEnseignementEnjeuxIrd = value;
       }

   get createEnseignementEnjeuxIrdDialog(): boolean {
           return this.enseignementEnjeuxIrdService.createEnseignementEnjeuxIrdDialog;

       }
    set createEnseignementEnjeuxIrdDialog(value: boolean) {
        this.enseignementEnjeuxIrdService.createEnseignementEnjeuxIrdDialog= value;
       }

       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
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
    get validEnjeuxIrdLibelle(): boolean {
    return this._validEnjeuxIrdLibelle;
    }

    set validEnjeuxIrdLibelle(value: boolean) {
    this._validEnjeuxIrdLibelle = value;
    }
    get validEnjeuxIrdCode(): boolean {
    return this._validEnjeuxIrdCode;
    }

    set validEnjeuxIrdCode(value: boolean) {
    this._validEnjeuxIrdCode = value;
    }

}
