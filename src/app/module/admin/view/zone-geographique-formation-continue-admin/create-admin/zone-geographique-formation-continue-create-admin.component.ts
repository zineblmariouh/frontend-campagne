import {Component, OnInit, Input} from '@angular/core';
import {ZoneGeographiqueFormationContinueService} from '../../../../../controller/service/ZoneGeographiqueFormationContinue.service';
import {ZoneGeographiqueFormationContinueVo} from '../../../../../controller/model/ZoneGeographiqueFormationContinue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
@Component({
  selector: 'app-zone-geographique-formation-continue-create-admin',
  templateUrl: './zone-geographique-formation-continue-create-admin.component.html',
  styleUrls: ['./zone-geographique-formation-continue-create-admin.component.css']
})
export class ZoneGeographiqueFormationContinueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validFormationContinueIntitule = true;
    _validFormationContinueFormationContinuePubliqueProfessionels = true;
    _validFormationContinueNombreHeuresDispenseesDansAnnee = true;
    _validFormationContinueModaliteFormationContinue = true;
    _validFormationContinueFormationContinueEnjeuxIrds = true;
    _validFormationContinuePaysFormationContinue = true;
    _validFormationContinueZoneGeographiqueFormationContinues = true;
    _validFormationContinueFormationContinueCommanditaires = true;
    _validZoneGeographiqueLibelle = true;
    _validZoneGeographiqueCode = true;
    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private zoneGeographiqueFormationContinueService: ZoneGeographiqueFormationContinueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private zoneGeographiqueService :ZoneGeographiqueService
,       private paysService :PaysService
,       private formationContinueService :FormationContinueService
) {

}


// methods
ngOnInit(): void {

    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
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
     this.zoneGeographiqueFormationContinueService.save().subscribe(zoneGeographiqueFormationContinue=>{
       this.zoneGeographiqueFormationContinues.push({...zoneGeographiqueFormationContinue});
       this.createZoneGeographiqueFormationContinueDialog = false;
       this.submitted = false;
       this.selectedZoneGeographiqueFormationContinue = new ZoneGeographiqueFormationContinueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }









//openPopup
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
              public async openCreateformationContinue(formationContinue: string) {
                      const isPermistted = await this.roleService.isPermitted('FormationContinue', 'add');
                       if(isPermistted){
         this.selectedFormationContinue = new FormationContinueVo();
        this.createFormationContinueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createZoneGeographiqueFormationContinueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get zoneGeographiqueFormationContinues(): Array<ZoneGeographiqueFormationContinueVo> {
    return this.zoneGeographiqueFormationContinueService.zoneGeographiqueFormationContinues;
       }
set zoneGeographiqueFormationContinues(value: Array<ZoneGeographiqueFormationContinueVo>) {
        this.zoneGeographiqueFormationContinueService.zoneGeographiqueFormationContinues = value;
       }

 get selectedZoneGeographiqueFormationContinue():ZoneGeographiqueFormationContinueVo {
           return this.zoneGeographiqueFormationContinueService.selectedZoneGeographiqueFormationContinue;
       }
    set selectedZoneGeographiqueFormationContinue(value: ZoneGeographiqueFormationContinueVo) {
        this.zoneGeographiqueFormationContinueService.selectedZoneGeographiqueFormationContinue = value;
       }

   get createZoneGeographiqueFormationContinueDialog(): boolean {
           return this.zoneGeographiqueFormationContinueService.createZoneGeographiqueFormationContinueDialog;

       }
    set createZoneGeographiqueFormationContinueDialog(value: boolean) {
        this.zoneGeographiqueFormationContinueService.createZoneGeographiqueFormationContinueDialog= value;
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
       get selectedFormationContinue(): FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
      set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }
       get formationContinues(): Array<FormationContinueVo> {
           return this.formationContinueService.formationContinues;
       }
       set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }
       get createFormationContinueDialog(): boolean {
           return this.formationContinueService.createFormationContinueDialog;
       }
      set createFormationContinueDialog(value: boolean) {
        this.formationContinueService.createFormationContinueDialog= value;
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


    get validFormationContinueIntitule(): boolean {
    return this._validFormationContinueIntitule;
    }

    set validFormationContinueIntitule(value: boolean) {
    this._validFormationContinueIntitule = value;
    }
    get validFormationContinueFormationContinuePubliqueProfessionels(): boolean {
    return this._validFormationContinueFormationContinuePubliqueProfessionels;
    }

    set validFormationContinueFormationContinuePubliqueProfessionels(value: boolean) {
    this._validFormationContinueFormationContinuePubliqueProfessionels = value;
    }
    get validFormationContinueNombreHeuresDispenseesDansAnnee(): boolean {
    return this._validFormationContinueNombreHeuresDispenseesDansAnnee;
    }

    set validFormationContinueNombreHeuresDispenseesDansAnnee(value: boolean) {
    this._validFormationContinueNombreHeuresDispenseesDansAnnee = value;
    }
    get validFormationContinueModaliteFormationContinue(): boolean {
    return this._validFormationContinueModaliteFormationContinue;
    }

    set validFormationContinueModaliteFormationContinue(value: boolean) {
    this._validFormationContinueModaliteFormationContinue = value;
    }
    get validFormationContinueFormationContinueEnjeuxIrds(): boolean {
    return this._validFormationContinueFormationContinueEnjeuxIrds;
    }

    set validFormationContinueFormationContinueEnjeuxIrds(value: boolean) {
    this._validFormationContinueFormationContinueEnjeuxIrds = value;
    }
    get validFormationContinuePaysFormationContinue(): boolean {
    return this._validFormationContinuePaysFormationContinue;
    }

    set validFormationContinuePaysFormationContinue(value: boolean) {
    this._validFormationContinuePaysFormationContinue = value;
    }
    get validFormationContinueZoneGeographiqueFormationContinues(): boolean {
    return this._validFormationContinueZoneGeographiqueFormationContinues;
    }

    set validFormationContinueZoneGeographiqueFormationContinues(value: boolean) {
    this._validFormationContinueZoneGeographiqueFormationContinues = value;
    }
    get validFormationContinueFormationContinueCommanditaires(): boolean {
    return this._validFormationContinueFormationContinueCommanditaires;
    }

    set validFormationContinueFormationContinueCommanditaires(value: boolean) {
    this._validFormationContinueFormationContinueCommanditaires = value;
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
