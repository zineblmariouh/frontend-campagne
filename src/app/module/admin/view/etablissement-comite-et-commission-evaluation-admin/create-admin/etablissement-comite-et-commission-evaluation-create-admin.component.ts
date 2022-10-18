import {Component, OnInit, Input} from '@angular/core';
import {EtablissementComiteEtCommissionEvaluationService} from '../../../../../controller/service/EtablissementComiteEtCommissionEvaluation.service';
import {EtablissementComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EtablissementComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
@Component({
  selector: 'app-etablissement-comite-et-commission-evaluation-create-admin',
  templateUrl: './etablissement-comite-et-commission-evaluation-create-admin.component.html',
  styleUrls: ['./etablissement-comite-et-commission-evaluation-create-admin.component.css']
})
export class EtablissementComiteEtCommissionEvaluationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEtablissementLibelle = true;
    _validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = true;
    _validComiteEtCommissionEvaluationNatureExpertise = true;
    _validComiteEtCommissionEvaluationNom = true;
    _validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = true;
    _validComiteEtCommissionEvaluationNomRevueOuEditeur = true;
    _validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = true;
    _validComiteEtCommissionEvaluationNombreJourDedie = true;
    _validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = true;
    _validComiteEtCommissionEvaluationRelieeInstrumentsIrd = true;
    _validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = true;



constructor(private datePipe: DatePipe, private etablissementComiteEtCommissionEvaluationService: EtablissementComiteEtCommissionEvaluationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private comiteEtCommissionEvaluationService :ComiteEtCommissionEvaluationService
,       private etablissementService :EtablissementService
) {

}


// methods
ngOnInit(): void {

    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
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
     this.etablissementComiteEtCommissionEvaluationService.save().subscribe(etablissementComiteEtCommissionEvaluation=>{
       this.etablissementComiteEtCommissionEvaluations.push({...etablissementComiteEtCommissionEvaluation});
       this.createEtablissementComiteEtCommissionEvaluationDialog = false;
       this.submitted = false;
       this.selectedEtablissementComiteEtCommissionEvaluation = new EtablissementComiteEtCommissionEvaluationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecomiteEtCommissionEvaluation(comiteEtCommissionEvaluation: string) {
                      const isPermistted = await this.roleService.isPermitted('ComiteEtCommissionEvaluation', 'add');
                       if(isPermistted){
         this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
        this.createComiteEtCommissionEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createEtablissementComiteEtCommissionEvaluationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etablissementComiteEtCommissionEvaluations(): Array<EtablissementComiteEtCommissionEvaluationVo> {
    return this.etablissementComiteEtCommissionEvaluationService.etablissementComiteEtCommissionEvaluations;
       }
set etablissementComiteEtCommissionEvaluations(value: Array<EtablissementComiteEtCommissionEvaluationVo>) {
        this.etablissementComiteEtCommissionEvaluationService.etablissementComiteEtCommissionEvaluations = value;
       }

 get selectedEtablissementComiteEtCommissionEvaluation():EtablissementComiteEtCommissionEvaluationVo {
           return this.etablissementComiteEtCommissionEvaluationService.selectedEtablissementComiteEtCommissionEvaluation;
       }
    set selectedEtablissementComiteEtCommissionEvaluation(value: EtablissementComiteEtCommissionEvaluationVo) {
        this.etablissementComiteEtCommissionEvaluationService.selectedEtablissementComiteEtCommissionEvaluation = value;
       }

   get createEtablissementComiteEtCommissionEvaluationDialog(): boolean {
           return this.etablissementComiteEtCommissionEvaluationService.createEtablissementComiteEtCommissionEvaluationDialog;

       }
    set createEtablissementComiteEtCommissionEvaluationDialog(value: boolean) {
        this.etablissementComiteEtCommissionEvaluationService.createEtablissementComiteEtCommissionEvaluationDialog= value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
       }
       get selectedComiteEtCommissionEvaluation(): ComiteEtCommissionEvaluationVo {
           return this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation;
       }
      set selectedComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation = value;
       }
       get comiteEtCommissionEvaluations(): Array<ComiteEtCommissionEvaluationVo> {
           return this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations;
       }
       set comiteEtCommissionEvaluations(value: Array<ComiteEtCommissionEvaluationVo>) {
        this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations = value;
       }
       get createComiteEtCommissionEvaluationDialog(): boolean {
           return this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog;
       }
      set createComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog= value;
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


    get validEtablissementLibelle(): boolean {
    return this._validEtablissementLibelle;
    }

    set validEtablissementLibelle(value: boolean) {
    this._validEtablissementLibelle = value;
    }
    get validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationNatureExpertise(): boolean {
    return this._validComiteEtCommissionEvaluationNatureExpertise;
    }

    set validComiteEtCommissionEvaluationNatureExpertise(value: boolean) {
    this._validComiteEtCommissionEvaluationNatureExpertise = value;
    }
    get validComiteEtCommissionEvaluationNom(): boolean {
    return this._validComiteEtCommissionEvaluationNom;
    }

    set validComiteEtCommissionEvaluationNom(value: boolean) {
    this._validComiteEtCommissionEvaluationNom = value;
    }
    get validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationNomRevueOuEditeur(): boolean {
    return this._validComiteEtCommissionEvaluationNomRevueOuEditeur;
    }

    set validComiteEtCommissionEvaluationNomRevueOuEditeur(value: boolean) {
    this._validComiteEtCommissionEvaluationNomRevueOuEditeur = value;
    }
    get validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationNombreJourDedie(): boolean {
    return this._validComiteEtCommissionEvaluationNombreJourDedie;
    }

    set validComiteEtCommissionEvaluationNombreJourDedie(value: boolean) {
    this._validComiteEtCommissionEvaluationNombreJourDedie = value;
    }
    get validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationRelieeInstrumentsIrd(): boolean {
    return this._validComiteEtCommissionEvaluationRelieeInstrumentsIrd;
    }

    set validComiteEtCommissionEvaluationRelieeInstrumentsIrd(value: boolean) {
    this._validComiteEtCommissionEvaluationRelieeInstrumentsIrd = value;
    }
    get validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = value;
    }

}
