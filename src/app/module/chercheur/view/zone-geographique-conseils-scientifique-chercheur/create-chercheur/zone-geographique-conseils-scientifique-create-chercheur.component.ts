import {Component, OnInit, Input} from '@angular/core';
import {ZoneGeographiqueConseilsScientifiqueService} from '../../../../../controller/service/ZoneGeographiqueConseilsScientifique.service';
import {ZoneGeographiqueConseilsScientifiqueVo} from '../../../../../controller/model/ZoneGeographiqueConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-zone-geographique-conseils-scientifique-create-chercheur',
  templateUrl: './zone-geographique-conseils-scientifique-create-chercheur.component.html',
  styleUrls: ['./zone-geographique-conseils-scientifique-create-chercheur.component.css']
})
export class ZoneGeographiqueConseilsScientifiqueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validConseilsScientifiqueNatureExpertise = true;
    _validConseilsScientifiqueIntitule = true;
    _validConseilsScientifiqueEtablissementConseilsScientifiques = true;
    _validConseilsScientifiqueTypeExpertise = true;
    _validConseilsScientifiqueNombreJoursConsacres = true;
    _validZoneGeographiqueLibelle = true;
    _validZoneGeographiqueCode = true;
    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private zoneGeographiqueConseilsScientifiqueService: ZoneGeographiqueConseilsScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private conseilsScientifiqueService :ConseilsScientifiqueService
,       private zoneGeographiqueService :ZoneGeographiqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
    this.conseilsScientifiqueService.findAll().subscribe((data) => this.conseilsScientifiques = data);
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
     this.zoneGeographiqueConseilsScientifiqueService.save().subscribe(zoneGeographiqueConseilsScientifique=>{
       this.zoneGeographiqueConseilsScientifiques.push({...zoneGeographiqueConseilsScientifique});
       this.createZoneGeographiqueConseilsScientifiqueDialog = false;
       this.submitted = false;
       this.selectedZoneGeographiqueConseilsScientifique = new ZoneGeographiqueConseilsScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }









//openPopup
              public async openCreateconseilsScientifique(conseilsScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'add');
                       if(isPermistted){
         this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
        this.createConseilsScientifiqueDialog = true;
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
    this.createZoneGeographiqueConseilsScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get zoneGeographiqueConseilsScientifiques(): Array<ZoneGeographiqueConseilsScientifiqueVo> {
    return this.zoneGeographiqueConseilsScientifiqueService.zoneGeographiqueConseilsScientifiques;
       }
set zoneGeographiqueConseilsScientifiques(value: Array<ZoneGeographiqueConseilsScientifiqueVo>) {
        this.zoneGeographiqueConseilsScientifiqueService.zoneGeographiqueConseilsScientifiques = value;
       }

 get selectedZoneGeographiqueConseilsScientifique():ZoneGeographiqueConseilsScientifiqueVo {
           return this.zoneGeographiqueConseilsScientifiqueService.selectedZoneGeographiqueConseilsScientifique;
       }
    set selectedZoneGeographiqueConseilsScientifique(value: ZoneGeographiqueConseilsScientifiqueVo) {
        this.zoneGeographiqueConseilsScientifiqueService.selectedZoneGeographiqueConseilsScientifique = value;
       }

   get createZoneGeographiqueConseilsScientifiqueDialog(): boolean {
           return this.zoneGeographiqueConseilsScientifiqueService.createZoneGeographiqueConseilsScientifiqueDialog;

       }
    set createZoneGeographiqueConseilsScientifiqueDialog(value: boolean) {
        this.zoneGeographiqueConseilsScientifiqueService.createZoneGeographiqueConseilsScientifiqueDialog= value;
       }

       get selectedConseilsScientifique(): ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
      set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }
       get conseilsScientifiques(): Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiques;
       }
       set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }
       get createConseilsScientifiqueDialog(): boolean {
           return this.conseilsScientifiqueService.createConseilsScientifiqueDialog;
       }
      set createConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.createConseilsScientifiqueDialog= value;
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


    get validConseilsScientifiqueNatureExpertise(): boolean {
    return this._validConseilsScientifiqueNatureExpertise;
    }

    set validConseilsScientifiqueNatureExpertise(value: boolean) {
    this._validConseilsScientifiqueNatureExpertise = value;
    }
    get validConseilsScientifiqueIntitule(): boolean {
    return this._validConseilsScientifiqueIntitule;
    }

    set validConseilsScientifiqueIntitule(value: boolean) {
    this._validConseilsScientifiqueIntitule = value;
    }
    get validConseilsScientifiqueEtablissementConseilsScientifiques(): boolean {
    return this._validConseilsScientifiqueEtablissementConseilsScientifiques;
    }

    set validConseilsScientifiqueEtablissementConseilsScientifiques(value: boolean) {
    this._validConseilsScientifiqueEtablissementConseilsScientifiques = value;
    }
    get validConseilsScientifiqueTypeExpertise(): boolean {
    return this._validConseilsScientifiqueTypeExpertise;
    }

    set validConseilsScientifiqueTypeExpertise(value: boolean) {
    this._validConseilsScientifiqueTypeExpertise = value;
    }
    get validConseilsScientifiqueNombreJoursConsacres(): boolean {
    return this._validConseilsScientifiqueNombreJoursConsacres;
    }

    set validConseilsScientifiqueNombreJoursConsacres(value: boolean) {
    this._validConseilsScientifiqueNombreJoursConsacres = value;
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
