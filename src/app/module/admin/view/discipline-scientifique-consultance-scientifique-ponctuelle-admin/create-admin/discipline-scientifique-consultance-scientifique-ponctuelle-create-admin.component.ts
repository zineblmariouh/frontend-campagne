import {Component, OnInit, Input} from '@angular/core';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/DisciplineScientifiqueConsultanceScientifiquePonctuelle.service';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/DisciplineScientifiqueConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
@Component({
  selector: 'app-discipline-scientifique-consultance-scientifique-ponctuelle-create-admin',
  templateUrl: './discipline-scientifique-consultance-scientifique-ponctuelle-create-admin.component.html',
  styleUrls: ['./discipline-scientifique-consultance-scientifique-ponctuelle-create-admin.component.css']
})
export class DisciplineScientifiqueConsultanceScientifiquePonctuelleCreateAdminComponent implements OnInit {

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
    _validDisciplineScientifiqueLibelleFr = true;
    _validDisciplineScientifiqueLibelleEng = true;
    _validDisciplineScientifiqueCode = true;



constructor(private datePipe: DatePipe, private disciplineScientifiqueConsultanceScientifiquePonctuelleService: DisciplineScientifiqueConsultanceScientifiquePonctuelleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
) {

}


// methods
ngOnInit(): void {

    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
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
     this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.save().subscribe(disciplineScientifiqueConsultanceScientifiquePonctuelle=>{
       this.disciplineScientifiqueConsultanceScientifiquePonctuelles.push({...disciplineScientifiqueConsultanceScientifiquePonctuelle});
       this.createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog = false;
       this.submitted = false;
       this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle = new DisciplineScientifiqueConsultanceScientifiquePonctuelleVo();


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
              public async openCreatedisciplineScientifique(disciplineScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
        this.createDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get disciplineScientifiqueConsultanceScientifiquePonctuelles(): Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> {
    return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.disciplineScientifiqueConsultanceScientifiquePonctuelles;
       }
set disciplineScientifiqueConsultanceScientifiquePonctuelles(value: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.disciplineScientifiqueConsultanceScientifiquePonctuelles = value;
       }

 get selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle():DisciplineScientifiqueConsultanceScientifiquePonctuelleVo {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle;
       }
    set selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle(value: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle = value;
       }

   get createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog;

       }
    set createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog= value;
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
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get createDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
      set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
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
    get validDisciplineScientifiqueLibelleFr(): boolean {
    return this._validDisciplineScientifiqueLibelleFr;
    }

    set validDisciplineScientifiqueLibelleFr(value: boolean) {
    this._validDisciplineScientifiqueLibelleFr = value;
    }
    get validDisciplineScientifiqueLibelleEng(): boolean {
    return this._validDisciplineScientifiqueLibelleEng;
    }

    set validDisciplineScientifiqueLibelleEng(value: boolean) {
    this._validDisciplineScientifiqueLibelleEng = value;
    }
    get validDisciplineScientifiqueCode(): boolean {
    return this._validDisciplineScientifiqueCode;
    }

    set validDisciplineScientifiqueCode(value: boolean) {
    this._validDisciplineScientifiqueCode = value;
    }

}
