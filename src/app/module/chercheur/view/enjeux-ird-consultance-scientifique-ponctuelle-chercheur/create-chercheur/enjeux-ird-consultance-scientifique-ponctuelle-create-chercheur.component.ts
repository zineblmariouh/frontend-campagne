import {Component, OnInit, Input} from '@angular/core';
import {EnjeuxIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EnjeuxIrdConsultanceScientifiquePonctuelle.service';
import {EnjeuxIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EnjeuxIrdConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
@Component({
  selector: 'app-enjeux-ird-consultance-scientifique-ponctuelle-create-chercheur',
  templateUrl: './enjeux-ird-consultance-scientifique-ponctuelle-create-chercheur.component.html',
  styleUrls: ['./enjeux-ird-consultance-scientifique-ponctuelle-create-chercheur.component.css']
})
export class EnjeuxIrdConsultanceScientifiquePonctuelleCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEnjeuxIrdLibelle = true;
    _validEnjeuxIrdCode = true;
    _validConsultanceScientifiquePonctuelleTypeExpertise = true;
    _validConsultanceScientifiquePonctuelleNatureExpertise = true;
    _validConsultanceScientifiquePonctuelleSujetExpertise = true;
    _validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles = true;
    _validConsultanceScientifiquePonctuellePaysCommanditaires = true;
    _validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles = true;
    _validConsultanceScientifiquePonctuelleNombreJourDedie = true;
    _validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles = true;
    _validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles = true;
    _validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd = true;
    _validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles = true;
    _validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles = true;



constructor(private datePipe: DatePipe, private enjeuxIrdConsultanceScientifiquePonctuelleService: EnjeuxIrdConsultanceScientifiquePonctuelleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private enjeuxIrdService :EnjeuxIrdService
,       private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
) {

}


// methods
ngOnInit(): void {

    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
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
     this.enjeuxIrdConsultanceScientifiquePonctuelleService.save().subscribe(enjeuxIrdConsultanceScientifiquePonctuelle=>{
       this.enjeuxIrdConsultanceScientifiquePonctuelles.push({...enjeuxIrdConsultanceScientifiquePonctuelle});
       this.createEnjeuxIrdConsultanceScientifiquePonctuelleDialog = false;
       this.submitted = false;
       this.selectedEnjeuxIrdConsultanceScientifiquePonctuelle = new EnjeuxIrdConsultanceScientifiquePonctuelleVo();


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
              public async openCreateconsultanceScientifiquePonctuelle(consultanceScientifiquePonctuelle: string) {
                      const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'add');
                       if(isPermistted){
         this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
        this.createConsultanceScientifiquePonctuelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createEnjeuxIrdConsultanceScientifiquePonctuelleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get enjeuxIrdConsultanceScientifiquePonctuelles(): Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> {
    return this.enjeuxIrdConsultanceScientifiquePonctuelleService.enjeuxIrdConsultanceScientifiquePonctuelles;
       }
set enjeuxIrdConsultanceScientifiquePonctuelles(value: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.enjeuxIrdConsultanceScientifiquePonctuelles = value;
       }

 get selectedEnjeuxIrdConsultanceScientifiquePonctuelle():EnjeuxIrdConsultanceScientifiquePonctuelleVo {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.selectedEnjeuxIrdConsultanceScientifiquePonctuelle;
       }
    set selectedEnjeuxIrdConsultanceScientifiquePonctuelle(value: EnjeuxIrdConsultanceScientifiquePonctuelleVo) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.selectedEnjeuxIrdConsultanceScientifiquePonctuelle = value;
       }

   get createEnjeuxIrdConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.createEnjeuxIrdConsultanceScientifiquePonctuelleDialog;

       }
    set createEnjeuxIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.createEnjeuxIrdConsultanceScientifiquePonctuelleDialog= value;
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
       get selectedConsultanceScientifiquePonctuelle(): ConsultanceScientifiquePonctuelleVo {
           return this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle;
       }
      set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle = value;
       }
       get consultanceScientifiquePonctuelles(): Array<ConsultanceScientifiquePonctuelleVo> {
           return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles;
       }
       set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles = value;
       }
       get createConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog;
       }
      set createConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog= value;
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
    get validConsultanceScientifiquePonctuelleTypeExpertise(): boolean {
    return this._validConsultanceScientifiquePonctuelleTypeExpertise;
    }

    set validConsultanceScientifiquePonctuelleTypeExpertise(value: boolean) {
    this._validConsultanceScientifiquePonctuelleTypeExpertise = value;
    }
    get validConsultanceScientifiquePonctuelleNatureExpertise(): boolean {
    return this._validConsultanceScientifiquePonctuelleNatureExpertise;
    }

    set validConsultanceScientifiquePonctuelleNatureExpertise(value: boolean) {
    this._validConsultanceScientifiquePonctuelleNatureExpertise = value;
    }
    get validConsultanceScientifiquePonctuelleSujetExpertise(): boolean {
    return this._validConsultanceScientifiquePonctuelleSujetExpertise;
    }

    set validConsultanceScientifiquePonctuelleSujetExpertise(value: boolean) {
    this._validConsultanceScientifiquePonctuelleSujetExpertise = value;
    }
    get validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles = value;
    }
    get validConsultanceScientifiquePonctuellePaysCommanditaires(): boolean {
    return this._validConsultanceScientifiquePonctuellePaysCommanditaires;
    }

    set validConsultanceScientifiquePonctuellePaysCommanditaires(value: boolean) {
    this._validConsultanceScientifiquePonctuellePaysCommanditaires = value;
    }
    get validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles = value;
    }
    get validConsultanceScientifiquePonctuelleNombreJourDedie(): boolean {
    return this._validConsultanceScientifiquePonctuelleNombreJourDedie;
    }

    set validConsultanceScientifiquePonctuelleNombreJourDedie(value: boolean) {
    this._validConsultanceScientifiquePonctuelleNombreJourDedie = value;
    }
    get validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles = value;
    }
    get validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles = value;
    }
    get validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd(): boolean {
    return this._validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd;
    }

    set validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd(value: boolean) {
    this._validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd = value;
    }
    get validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles = value;
    }
    get validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles = value;
    }

}
