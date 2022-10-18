import {Component, OnInit, Input} from '@angular/core';
import {InstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/InstrumentIrdConsultanceScientifiquePonctuelle.service';
import {InstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/InstrumentIrdConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
@Component({
  selector: 'app-instrument-ird-consultance-scientifique-ponctuelle-create-admin',
  templateUrl: './instrument-ird-consultance-scientifique-ponctuelle-create-admin.component.html',
  styleUrls: ['./instrument-ird-consultance-scientifique-ponctuelle-create-admin.component.css']
})
export class InstrumentIrdConsultanceScientifiquePonctuelleCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


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
    _validInstrumentIrdCode = true;
    _validInstrumentIrdLibelle = true;



constructor(private datePipe: DatePipe, private instrumentIrdConsultanceScientifiquePonctuelleService: InstrumentIrdConsultanceScientifiquePonctuelleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private instrumentIrdService :InstrumentIrdService
,       private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
) {

}


// methods
ngOnInit(): void {

    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
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
     this.instrumentIrdConsultanceScientifiquePonctuelleService.save().subscribe(instrumentIrdConsultanceScientifiquePonctuelle=>{
       this.instrumentIrdConsultanceScientifiquePonctuelles.push({...instrumentIrdConsultanceScientifiquePonctuelle});
       this.createInstrumentIrdConsultanceScientifiquePonctuelleDialog = false;
       this.submitted = false;
       this.selectedInstrumentIrdConsultanceScientifiquePonctuelle = new InstrumentIrdConsultanceScientifiquePonctuelleVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }








//openPopup
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
              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createInstrumentIrdConsultanceScientifiquePonctuelleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get instrumentIrdConsultanceScientifiquePonctuelles(): Array<InstrumentIrdConsultanceScientifiquePonctuelleVo> {
    return this.instrumentIrdConsultanceScientifiquePonctuelleService.instrumentIrdConsultanceScientifiquePonctuelles;
       }
set instrumentIrdConsultanceScientifiquePonctuelles(value: Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.instrumentIrdConsultanceScientifiquePonctuelles = value;
       }

 get selectedInstrumentIrdConsultanceScientifiquePonctuelle():InstrumentIrdConsultanceScientifiquePonctuelleVo {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.selectedInstrumentIrdConsultanceScientifiquePonctuelle;
       }
    set selectedInstrumentIrdConsultanceScientifiquePonctuelle(value: InstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.selectedInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }

   get createInstrumentIrdConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.createInstrumentIrdConsultanceScientifiquePonctuelleDialog;

       }
    set createInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.createInstrumentIrdConsultanceScientifiquePonctuelleDialog= value;
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
       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
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
    get validInstrumentIrdCode(): boolean {
    return this._validInstrumentIrdCode;
    }

    set validInstrumentIrdCode(value: boolean) {
    this._validInstrumentIrdCode = value;
    }
    get validInstrumentIrdLibelle(): boolean {
    return this._validInstrumentIrdLibelle;
    }

    set validInstrumentIrdLibelle(value: boolean) {
    this._validInstrumentIrdLibelle = value;
    }

}
