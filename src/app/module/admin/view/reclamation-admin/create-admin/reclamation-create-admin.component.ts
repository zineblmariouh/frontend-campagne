import {Component, OnInit, Input} from '@angular/core';
import {ReclamationService} from '../../../../../controller/service/Reclamation.service';
import {ReclamationVo} from '../../../../../controller/model/Reclamation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {EtatReclamationVo} from '../../../../../controller/model/EtatReclamation.model';
import {EtatReclamationService} from '../../../../../controller/service/EtatReclamation.service';
import {TypeReclamationVo} from '../../../../../controller/model/TypeReclamation.model';
import {TypeReclamationService} from '../../../../../controller/service/TypeReclamation.service';
@Component({
  selector: 'app-reclamation-create-admin',
  templateUrl: './reclamation-create-admin.component.html',
  styleUrls: ['./reclamation-create-admin.component.css']
})
export class ReclamationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validReclamationObjet = true;

    _validEtatReclamationLibelle = true;
    _validEtatReclamationCode = true;
    _validTypeReclamationLibelle = true;
    _validTypeReclamationCode = true;



constructor(private datePipe: DatePipe, private reclamationService: ReclamationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private chercheurService :ChercheurService
,       private etatReclamationService :EtatReclamationService
,       private typeReclamationService :TypeReclamationService
) {

}


// methods
ngOnInit(): void {

    this.selectedEtatReclamation = new EtatReclamationVo();
    this.etatReclamationService.findAll().subscribe((data) => this.etatReclamations = data);
    this.selectedTypeReclamation = new TypeReclamationVo();
    this.typeReclamationService.findAll().subscribe((data) => this.typeReclamations = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}




private setValidation(value : boolean){
    this.validReclamationObjet = value;
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
     this.reclamationService.save().subscribe(reclamation=>{
       this.reclamations.push({...reclamation});
       this.createReclamationDialog = false;
       this.submitted = false;
       this.selectedReclamation = new ReclamationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateReclamationObjet();

    }

private validateReclamationObjet(){
        if (this.stringUtilService.isEmpty(this.selectedReclamation.objet)) {
            this.errorMessages.push('Objet non valide');
            this.validReclamationObjet = false;
        } else {
            this.validReclamationObjet = true;
        }
    }











//openPopup
              public async openCreatetypeReclamation(typeReclamation: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeReclamation', 'add');
                       if(isPermistted){
         this.selectedTypeReclamation = new TypeReclamationVo();
        this.createTypeReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatReclamation(etatReclamation: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'add');
                       if(isPermistted){
         this.selectedEtatReclamation = new EtatReclamationVo();
        this.createEtatReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createReclamationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get reclamations(): Array<ReclamationVo> {
    return this.reclamationService.reclamations;
       }
set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }

 get selectedReclamation():ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
    set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }

   get createReclamationDialog(): boolean {
           return this.reclamationService.createReclamationDialog;

       }
    set createReclamationDialog(value: boolean) {
        this.reclamationService.createReclamationDialog= value;
       }

       get selectedTypeReclamation(): TypeReclamationVo {
           return this.typeReclamationService.selectedTypeReclamation;
       }
      set selectedTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.selectedTypeReclamation = value;
       }
       get typeReclamations(): Array<TypeReclamationVo> {
           return this.typeReclamationService.typeReclamations;
       }
       set typeReclamations(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamations = value;
       }
       get createTypeReclamationDialog(): boolean {
           return this.typeReclamationService.createTypeReclamationDialog;
       }
      set createTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.createTypeReclamationDialog= value;
       }
       get selectedEtatReclamation(): EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
      set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }
       get etatReclamations(): Array<EtatReclamationVo> {
           return this.etatReclamationService.etatReclamations;
       }
       set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }
       get createEtatReclamationDialog(): boolean {
           return this.etatReclamationService.createEtatReclamationDialog;
       }
      set createEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.createEtatReclamationDialog= value;
       }
       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;
       }
      set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
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

    get validReclamationObjet(): boolean {
    return this._validReclamationObjet;
    }

    set validReclamationObjet(value: boolean) {
    this._validReclamationObjet = value;
    }

    get validEtatReclamationLibelle(): boolean {
    return this._validEtatReclamationLibelle;
    }

    set validEtatReclamationLibelle(value: boolean) {
    this._validEtatReclamationLibelle = value;
    }
    get validEtatReclamationCode(): boolean {
    return this._validEtatReclamationCode;
    }

    set validEtatReclamationCode(value: boolean) {
    this._validEtatReclamationCode = value;
    }
    get validTypeReclamationLibelle(): boolean {
    return this._validTypeReclamationLibelle;
    }

    set validTypeReclamationLibelle(value: boolean) {
    this._validTypeReclamationLibelle = value;
    }
    get validTypeReclamationCode(): boolean {
    return this._validTypeReclamationCode;
    }

    set validTypeReclamationCode(value: boolean) {
    this._validTypeReclamationCode = value;
    }

}
