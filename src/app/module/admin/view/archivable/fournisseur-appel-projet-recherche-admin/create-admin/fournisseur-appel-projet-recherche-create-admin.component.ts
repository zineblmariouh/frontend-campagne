import {Component, OnInit, Input} from '@angular/core';
import {FournisseurAppelProjetRechercheService} from '../../../../../controller/service/FournisseurAppelProjetRecherche.service';
import {FournisseurAppelProjetRechercheVo} from '../../../../../controller/model/FournisseurAppelProjetRecherche.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-fournisseur-appel-projet-recherche-create-admin',
  templateUrl: './fournisseur-appel-projet-recherche-create-admin.component.html',
  styleUrls: ['./fournisseur-appel-projet-recherche-create-admin.component.css']
})
export class FournisseurAppelProjetRechercheCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validFournisseurAppelProjetRechercheLibelle = true;
   _validFournisseurAppelProjetRechercheCode = true;

    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private fournisseurAppelProjetRechercheService: FournisseurAppelProjetRechercheService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}




private setValidation(value : boolean){
    this.validFournisseurAppelProjetRechercheLibelle = value;
    this.validFournisseurAppelProjetRechercheCode = value;
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
     this.fournisseurAppelProjetRechercheService.save().subscribe(fournisseurAppelProjetRecherche=>{
       this.fournisseurAppelProjetRecherches.push({...fournisseurAppelProjetRecherche});
       this.createFournisseurAppelProjetRechercheDialog = false;
       this.submitted = false;
       this.selectedFournisseurAppelProjetRecherche = new FournisseurAppelProjetRechercheVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateFournisseurAppelProjetRechercheLibelle();
this.validateFournisseurAppelProjetRechercheCode();

    }

private validateFournisseurAppelProjetRechercheLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedFournisseurAppelProjetRecherche.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validFournisseurAppelProjetRechercheLibelle = false;
        } else {
            this.validFournisseurAppelProjetRechercheLibelle = true;
        }
    }
private validateFournisseurAppelProjetRechercheCode(){
        if (this.stringUtilService.isEmpty(this.selectedFournisseurAppelProjetRecherche.code)) {
            this.errorMessages.push('Code non valide');
            this.validFournisseurAppelProjetRechercheCode = false;
        } else {
            this.validFournisseurAppelProjetRechercheCode = true;
        }
    }














//openPopup
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
    this.createFournisseurAppelProjetRechercheDialog  = false;
    this.setValidation(true);
}

// getters and setters

get fournisseurAppelProjetRecherches(): Array<FournisseurAppelProjetRechercheVo> {
    return this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches;
       }
set fournisseurAppelProjetRecherches(value: Array<FournisseurAppelProjetRechercheVo>) {
        this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches = value;
       }

 get selectedFournisseurAppelProjetRecherche():FournisseurAppelProjetRechercheVo {
           return this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche;
       }
    set selectedFournisseurAppelProjetRecherche(value: FournisseurAppelProjetRechercheVo) {
        this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche = value;
       }

   get createFournisseurAppelProjetRechercheDialog(): boolean {
           return this.fournisseurAppelProjetRechercheService.createFournisseurAppelProjetRechercheDialog;

       }
    set createFournisseurAppelProjetRechercheDialog(value: boolean) {
        this.fournisseurAppelProjetRechercheService.createFournisseurAppelProjetRechercheDialog= value;
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

    get validFournisseurAppelProjetRechercheLibelle(): boolean {
    return this._validFournisseurAppelProjetRechercheLibelle;
    }

    set validFournisseurAppelProjetRechercheLibelle(value: boolean) {
    this._validFournisseurAppelProjetRechercheLibelle = value;
    }
    get validFournisseurAppelProjetRechercheCode(): boolean {
    return this._validFournisseurAppelProjetRechercheCode;
    }

    set validFournisseurAppelProjetRechercheCode(value: boolean) {
    this._validFournisseurAppelProjetRechercheCode = value;
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
