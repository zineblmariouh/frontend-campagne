import {Component, OnInit, Input} from '@angular/core';
import {EtablissementProjetService} from '../../../../../controller/service/EtablissementProjet.service';
import {EtablissementProjetVo} from '../../../../../controller/model/EtablissementProjet.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {VilleVo} from '../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../controller/service/Ville.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-etablissement-projet-create-admin',
  templateUrl: './etablissement-projet-create-admin.component.html',
  styleUrls: ['./etablissement-projet-create-admin.component.css']
})
export class EtablissementProjetCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtablissementProjetLibelle = true;
   _validEtablissementProjetCode = true;

    _validVilleLibelle = true;
    _validVilleCode = true;
    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private etablissementProjetService: EtablissementProjetService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private villeService :VilleService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}




private setValidation(value : boolean){
    this.validEtablissementProjetLibelle = value;
    this.validEtablissementProjetCode = value;
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
     this.etablissementProjetService.save().subscribe(etablissementProjet=>{
       this.etablissementProjets.push({...etablissementProjet});
       this.createEtablissementProjetDialog = false;
       this.submitted = false;
       this.selectedEtablissementProjet = new EtablissementProjetVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtablissementProjetLibelle();
this.validateEtablissementProjetCode();

    }

private validateEtablissementProjetLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtablissementProjet.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtablissementProjetLibelle = false;
        } else {
            this.validEtablissementProjetLibelle = true;
        }
    }
private validateEtablissementProjetCode(){
        if (this.stringUtilService.isEmpty(this.selectedEtablissementProjet.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtablissementProjetCode = false;
        } else {
            this.validEtablissementProjetCode = true;
        }
    }





















//openPopup
              public async openCreateville(ville: string) {
                      const isPermistted = await this.roleService.isPermitted('Ville', 'add');
                       if(isPermistted){
         this.selectedVille = new VilleVo();
        this.createVilleDialog = true;
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
    this.createEtablissementProjetDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etablissementProjets(): Array<EtablissementProjetVo> {
    return this.etablissementProjetService.etablissementProjets;
       }
set etablissementProjets(value: Array<EtablissementProjetVo>) {
        this.etablissementProjetService.etablissementProjets = value;
       }

 get selectedEtablissementProjet():EtablissementProjetVo {
           return this.etablissementProjetService.selectedEtablissementProjet;
       }
    set selectedEtablissementProjet(value: EtablissementProjetVo) {
        this.etablissementProjetService.selectedEtablissementProjet = value;
       }

   get createEtablissementProjetDialog(): boolean {
           return this.etablissementProjetService.createEtablissementProjetDialog;

       }
    set createEtablissementProjetDialog(value: boolean) {
        this.etablissementProjetService.createEtablissementProjetDialog= value;
       }

       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes(): Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;
       }
      set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
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

    get validEtablissementProjetLibelle(): boolean {
    return this._validEtablissementProjetLibelle;
    }

    set validEtablissementProjetLibelle(value: boolean) {
    this._validEtablissementProjetLibelle = value;
    }
    get validEtablissementProjetCode(): boolean {
    return this._validEtablissementProjetCode;
    }

    set validEtablissementProjetCode(value: boolean) {
    this._validEtablissementProjetCode = value;
    }

    get validVilleLibelle(): boolean {
    return this._validVilleLibelle;
    }

    set validVilleLibelle(value: boolean) {
    this._validVilleLibelle = value;
    }
    get validVilleCode(): boolean {
    return this._validVilleCode;
    }

    set validVilleCode(value: boolean) {
    this._validVilleCode = value;
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
