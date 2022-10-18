import {Component, OnInit, Input} from '@angular/core';
import {ContratEtConventionIrdService} from '../../../../../controller/service/ContratEtConventionIrd.service';
import {ContratEtConventionIrdVo} from '../../../../../controller/model/ContratEtConventionIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {StatusContratEtConventionVo} from '../../../../../controller/model/StatusContratEtConvention.model';
import {StatusContratEtConventionService} from '../../../../../controller/service/StatusContratEtConvention.service';
import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
@Component({
  selector: 'app-contrat-et-convention-ird-create-chercheur',
  templateUrl: './contrat-et-convention-ird-create-chercheur.component.html',
  styleUrls: ['./contrat-et-convention-ird-create-chercheur.component.css']
})
export class ContratEtConventionIrdCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validContratEtConventionIrdIntitule = true;

    _validStatusContratEtConventionLibelle = true;
    _validStatusContratEtConventionCode = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;



constructor(private datePipe: DatePipe, private contratEtConventionIrdService: ContratEtConventionIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private statusContratEtConventionService :StatusContratEtConventionService
,       private savoirEtInnovationService :SavoirEtInnovationService
) {

}


// methods
ngOnInit(): void {

    this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();
    this.statusContratEtConventionService.findAll().subscribe((data) => this.statusContratEtConventions = data);
    this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
    this.savoirEtInnovationService.findAll().subscribe((data) => this.savoirEtInnovations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}




private setValidation(value : boolean){
    this.validContratEtConventionIrdIntitule = value;
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
     this.contratEtConventionIrdService.save().subscribe(contratEtConventionIrd=>{
       this.contratEtConventionIrds.push({...contratEtConventionIrd});
       this.createContratEtConventionIrdDialog = false;
       this.submitted = false;
       this.selectedContratEtConventionIrd = new ContratEtConventionIrdVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateContratEtConventionIrdIntitule();

    }

private validateContratEtConventionIrdIntitule(){
        if (this.stringUtilService.isEmpty(this.selectedContratEtConventionIrd.intitule)) {
            this.errorMessages.push('Intitule non valide');
            this.validContratEtConventionIrdIntitule = false;
        } else {
            this.validContratEtConventionIrdIntitule = true;
        }
    }











//openPopup
              public async openCreatestatusContratEtConvention(statusContratEtConvention: string) {
                      const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'add');
                       if(isPermistted){
         this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();
        this.createStatusContratEtConventionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatesavoirEtInnovation(savoirEtInnovation: string) {
                      const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'add');
                       if(isPermistted){
         this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
        this.createSavoirEtInnovationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatEtapeCampagne(etatEtapeCampagne: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
                       if(isPermistted){
         this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.createEtatEtapeCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createContratEtConventionIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get contratEtConventionIrds(): Array<ContratEtConventionIrdVo> {
    return this.contratEtConventionIrdService.contratEtConventionIrds;
       }
set contratEtConventionIrds(value: Array<ContratEtConventionIrdVo>) {
        this.contratEtConventionIrdService.contratEtConventionIrds = value;
       }

 get selectedContratEtConventionIrd():ContratEtConventionIrdVo {
           return this.contratEtConventionIrdService.selectedContratEtConventionIrd;
       }
    set selectedContratEtConventionIrd(value: ContratEtConventionIrdVo) {
        this.contratEtConventionIrdService.selectedContratEtConventionIrd = value;
       }

   get createContratEtConventionIrdDialog(): boolean {
           return this.contratEtConventionIrdService.createContratEtConventionIrdDialog;

       }
    set createContratEtConventionIrdDialog(value: boolean) {
        this.contratEtConventionIrdService.createContratEtConventionIrdDialog= value;
       }

       get selectedStatusContratEtConvention(): StatusContratEtConventionVo {
           return this.statusContratEtConventionService.selectedStatusContratEtConvention;
       }
      set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
       }
       get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
           return this.statusContratEtConventionService.statusContratEtConventions;
       }
       set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
       }
       get createStatusContratEtConventionDialog(): boolean {
           return this.statusContratEtConventionService.createStatusContratEtConventionDialog;
       }
      set createStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.createStatusContratEtConventionDialog= value;
       }
       get selectedSavoirEtInnovation(): SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
      set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }
       get savoirEtInnovations(): Array<SavoirEtInnovationVo> {
           return this.savoirEtInnovationService.savoirEtInnovations;
       }
       set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }
       get createSavoirEtInnovationDialog(): boolean {
           return this.savoirEtInnovationService.createSavoirEtInnovationDialog;
       }
      set createSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.createSavoirEtInnovationDialog= value;
       }
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get createEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
       }
      set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
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

    get validContratEtConventionIrdIntitule(): boolean {
    return this._validContratEtConventionIrdIntitule;
    }

    set validContratEtConventionIrdIntitule(value: boolean) {
    this._validContratEtConventionIrdIntitule = value;
    }

    get validStatusContratEtConventionLibelle(): boolean {
    return this._validStatusContratEtConventionLibelle;
    }

    set validStatusContratEtConventionLibelle(value: boolean) {
    this._validStatusContratEtConventionLibelle = value;
    }
    get validStatusContratEtConventionCode(): boolean {
    return this._validStatusContratEtConventionCode;
    }

    set validStatusContratEtConventionCode(value: boolean) {
    this._validStatusContratEtConventionCode = value;
    }
    get validEtatEtapeCampagneLibelle(): boolean {
    return this._validEtatEtapeCampagneLibelle;
    }

    set validEtatEtapeCampagneLibelle(value: boolean) {
    this._validEtatEtapeCampagneLibelle = value;
    }
    get validEtatEtapeCampagneCode(): boolean {
    return this._validEtatEtapeCampagneCode;
    }

    set validEtatEtapeCampagneCode(value: boolean) {
    this._validEtatEtapeCampagneCode = value;
    }

}
