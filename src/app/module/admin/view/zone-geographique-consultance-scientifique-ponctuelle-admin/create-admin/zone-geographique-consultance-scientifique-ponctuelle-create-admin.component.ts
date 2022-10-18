import {Component, OnInit, Input} from '@angular/core';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ZoneGeographiqueConsultanceScientifiquePonctuelle.service';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ZoneGeographiqueConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-zone-geographique-consultance-scientifique-ponctuelle-create-admin',
  templateUrl: './zone-geographique-consultance-scientifique-ponctuelle-create-admin.component.html',
  styleUrls: ['./zone-geographique-consultance-scientifique-ponctuelle-create-admin.component.css']
})
export class ZoneGeographiqueConsultanceScientifiquePonctuelleCreateAdminComponent implements OnInit {

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
    _validZoneGeographiqueLibelle = true;
    _validZoneGeographiqueCode = true;
    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private zoneGeographiqueConsultanceScientifiquePonctuelleService: ZoneGeographiqueConsultanceScientifiquePonctuelleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
,       private zoneGeographiqueService :ZoneGeographiqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedZoneGeographique = new ZoneGeographiqueVo();
    this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
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
     this.zoneGeographiqueConsultanceScientifiquePonctuelleService.save().subscribe(zoneGeographiqueConsultanceScientifiquePonctuelle=>{
       this.zoneGeographiqueConsultanceScientifiquePonctuelles.push({...zoneGeographiqueConsultanceScientifiquePonctuelle});
       this.createZoneGeographiqueConsultanceScientifiquePonctuelleDialog = false;
       this.submitted = false;
       this.selectedZoneGeographiqueConsultanceScientifiquePonctuelle = new ZoneGeographiqueConsultanceScientifiquePonctuelleVo();


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
              public async openCreatezoneGeographique(zoneGeographique: string) {
                      const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'add');
                       if(isPermistted){
         this.selectedZoneGeographique = new ZoneGeographiqueVo();
        this.createZoneGeographiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createZoneGeographiqueConsultanceScientifiquePonctuelleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get zoneGeographiqueConsultanceScientifiquePonctuelles(): Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo> {
    return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.zoneGeographiqueConsultanceScientifiquePonctuelles;
       }
set zoneGeographiqueConsultanceScientifiquePonctuelles(value: Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.zoneGeographiqueConsultanceScientifiquePonctuelles = value;
       }

 get selectedZoneGeographiqueConsultanceScientifiquePonctuelle():ZoneGeographiqueConsultanceScientifiquePonctuelleVo {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.selectedZoneGeographiqueConsultanceScientifiquePonctuelle;
       }
    set selectedZoneGeographiqueConsultanceScientifiquePonctuelle(value: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.selectedZoneGeographiqueConsultanceScientifiquePonctuelle = value;
       }

   get createZoneGeographiqueConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.createZoneGeographiqueConsultanceScientifiquePonctuelleDialog;

       }
    set createZoneGeographiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.createZoneGeographiqueConsultanceScientifiquePonctuelleDialog= value;
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
       get selectedZoneGeographique(): ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
      set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
       get zoneGeographiques(): Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
       set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }
       get createZoneGeographiqueDialog(): boolean {
           return this.zoneGeographiqueService.createZoneGeographiqueDialog;
       }
      set createZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.createZoneGeographiqueDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
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
    get validZoneGeographiqueLibelle(): boolean {
    return this._validZoneGeographiqueLibelle;
    }

    set validZoneGeographiqueLibelle(value: boolean) {
    this._validZoneGeographiqueLibelle = value;
    }
    get validZoneGeographiqueCode(): boolean {
    return this._validZoneGeographiqueCode;
    }

    set validZoneGeographiqueCode(value: boolean) {
    this._validZoneGeographiqueCode = value;
    }
    get validPaysLibelle(): boolean {
    return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
    this._validPaysLibelle = value;
    }
    get validPaysCode(): boolean {
    return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
    this._validPaysCode = value;
    }

}
