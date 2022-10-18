import {Component, OnInit, Input} from '@angular/core';
import {CampagneRelanceService} from '../../../../../controller/service/CampagneRelance.service';
import {CampagneRelanceVo} from '../../../../../controller/model/CampagneRelance.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {TemplateRelanceVo} from '../../../../../controller/model/TemplateRelance.model';
import {TemplateRelanceService} from '../../../../../controller/service/TemplateRelance.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {CampagneRelanceChercheurVo} from '../../../../../controller/model/CampagneRelanceChercheur.model';
import {CampagneRelanceChercheurService} from '../../../../../controller/service/CampagneRelanceChercheur.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
@Component({
  selector: 'app-campagne-relance-create-admin',
  templateUrl: './campagne-relance-create-admin.component.html',
  styleUrls: ['./campagne-relance-create-admin.component.css']
})
export class CampagneRelanceCreateAdminComponent implements OnInit {

        selectedCampagneRelanceChercheurs: CampagneRelanceChercheurVo = new CampagneRelanceChercheurVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCampagneLibelle = true;
    _validTemplateRelanceCode = true;



constructor(private datePipe: DatePipe, private campagneRelanceService: CampagneRelanceService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private templateRelanceService :TemplateRelanceService
,       private chercheurService :ChercheurService
,       private campagneRelanceChercheurService :CampagneRelanceChercheurService
,       private campagneService :CampagneService
) {

}


// methods
ngOnInit(): void {


                this.selectedCampagneRelanceChercheurs.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);


    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedTemplateRelance = new TemplateRelanceVo();
    this.templateRelanceService.findAll().subscribe((data) => this.templateRelances = data);
}


    validateCampagneRelanceChercheurs(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    }

        addCampagneRelanceChercheurs() {
        if( this.selectedCampagneRelance.campagneRelanceChercheursVo == null ){
            this.selectedCampagneRelance.campagneRelanceChercheursVo = new Array<CampagneRelanceChercheurVo>();
        }
       this.validateCampagneRelanceChercheurs();
       if (this.errorMessages.length === 0) {
              this.selectedCampagneRelance.campagneRelanceChercheursVo.push(this.selectedCampagneRelanceChercheurs);
              this.selectedCampagneRelanceChercheurs = new CampagneRelanceChercheurVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteCampagneRelanceChercheurs(p: CampagneRelanceChercheurVo) {
        this.selectedCampagneRelance.campagneRelanceChercheursVo.forEach((element, index) => {
            if (element === p) { this.selectedCampagneRelance.campagneRelanceChercheursVo.splice(index, 1); }
        });
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
     this.campagneRelanceService.save().subscribe(campagneRelance=>{
       this.campagneRelances.push({...campagneRelance});
       this.createCampagneRelanceDialog = false;
       this.submitted = false;
       this.selectedCampagneRelance = new CampagneRelanceVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }



















//openPopup
              public async openCreatecampagne(campagne: string) {
                      const isPermistted = await this.roleService.isPermitted('Campagne', 'add');
                       if(isPermistted){
         this.selectedCampagne = new CampagneVo();
        this.createCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetemplateRelance(templateRelance: string) {
                      const isPermistted = await this.roleService.isPermitted('TemplateRelance', 'add');
                       if(isPermistted){
         this.selectedTemplateRelance = new TemplateRelanceVo();
        this.createTemplateRelanceDialog = true;
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
    this.createCampagneRelanceDialog  = false;
    this.setValidation(true);
}

// getters and setters

get campagneRelances(): Array<CampagneRelanceVo> {
    return this.campagneRelanceService.campagneRelances;
       }
set campagneRelances(value: Array<CampagneRelanceVo>) {
        this.campagneRelanceService.campagneRelances = value;
       }

 get selectedCampagneRelance():CampagneRelanceVo {
           return this.campagneRelanceService.selectedCampagneRelance;
       }
    set selectedCampagneRelance(value: CampagneRelanceVo) {
        this.campagneRelanceService.selectedCampagneRelance = value;
       }

   get createCampagneRelanceDialog(): boolean {
           return this.campagneRelanceService.createCampagneRelanceDialog;

       }
    set createCampagneRelanceDialog(value: boolean) {
        this.campagneRelanceService.createCampagneRelanceDialog= value;
       }

       get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes(): Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get createCampagneDialog(): boolean {
           return this.campagneService.createCampagneDialog;
       }
      set createCampagneDialog(value: boolean) {
        this.campagneService.createCampagneDialog= value;
       }
       get selectedTemplateRelance(): TemplateRelanceVo {
           return this.templateRelanceService.selectedTemplateRelance;
       }
      set selectedTemplateRelance(value: TemplateRelanceVo) {
        this.templateRelanceService.selectedTemplateRelance = value;
       }
       get templateRelances(): Array<TemplateRelanceVo> {
           return this.templateRelanceService.templateRelances;
       }
       set templateRelances(value: Array<TemplateRelanceVo>) {
        this.templateRelanceService.templateRelances = value;
       }
       get createTemplateRelanceDialog(): boolean {
           return this.templateRelanceService.createTemplateRelanceDialog;
       }
      set createTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.createTemplateRelanceDialog= value;
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


    get validCampagneLibelle(): boolean {
    return this._validCampagneLibelle;
    }

    set validCampagneLibelle(value: boolean) {
    this._validCampagneLibelle = value;
    }
    get validTemplateRelanceCode(): boolean {
    return this._validTemplateRelanceCode;
    }

    set validTemplateRelanceCode(value: boolean) {
    this._validTemplateRelanceCode = value;
    }

}
