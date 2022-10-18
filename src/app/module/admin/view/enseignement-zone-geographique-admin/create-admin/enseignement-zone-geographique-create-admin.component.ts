import {Component, OnInit, Input} from '@angular/core';
import {EnseignementZoneGeographiqueService} from '../../../../../controller/service/EnseignementZoneGeographique.service';
import {EnseignementZoneGeographiqueVo} from '../../../../../controller/model/EnseignementZoneGeographique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-enseignement-zone-geographique-create-admin',
  templateUrl: './enseignement-zone-geographique-create-admin.component.html',
  styleUrls: ['./enseignement-zone-geographique-create-admin.component.css']
})
export class EnseignementZoneGeographiqueCreateAdminComponent implements OnInit {

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
    _validZoneGeographiqueLibelle = true;
    _validZoneGeographiqueCode = true;
    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private enseignementZoneGeographiqueService: EnseignementZoneGeographiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private enseignementService :EnseignementService
,       private zoneGeographiqueService :ZoneGeographiqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
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
     this.enseignementZoneGeographiqueService.save().subscribe(enseignementZoneGeographique=>{
       this.enseignementZoneGeographiques.push({...enseignementZoneGeographique});
       this.createEnseignementZoneGeographiqueDialog = false;
       this.submitted = false;
       this.selectedEnseignementZoneGeographique = new EnseignementZoneGeographiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }









//openPopup
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
    this.createEnseignementZoneGeographiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get enseignementZoneGeographiques(): Array<EnseignementZoneGeographiqueVo> {
    return this.enseignementZoneGeographiqueService.enseignementZoneGeographiques;
       }
set enseignementZoneGeographiques(value: Array<EnseignementZoneGeographiqueVo>) {
        this.enseignementZoneGeographiqueService.enseignementZoneGeographiques = value;
       }

 get selectedEnseignementZoneGeographique():EnseignementZoneGeographiqueVo {
           return this.enseignementZoneGeographiqueService.selectedEnseignementZoneGeographique;
       }
    set selectedEnseignementZoneGeographique(value: EnseignementZoneGeographiqueVo) {
        this.enseignementZoneGeographiqueService.selectedEnseignementZoneGeographique = value;
       }

   get createEnseignementZoneGeographiqueDialog(): boolean {
           return this.enseignementZoneGeographiqueService.createEnseignementZoneGeographiqueDialog;

       }
    set createEnseignementZoneGeographiqueDialog(value: boolean) {
        this.enseignementZoneGeographiqueService.createEnseignementZoneGeographiqueDialog= value;
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
