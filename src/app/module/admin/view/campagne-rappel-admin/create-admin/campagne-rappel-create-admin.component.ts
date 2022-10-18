import {Component, OnInit, Input} from '@angular/core';
import {CampagneRappelService} from '../../../../../controller/service/CampagneRappel.service';
import {CampagneRappelVo} from '../../../../../controller/model/CampagneRappel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {TemplateRappelVo} from '../../../../../controller/model/TemplateRappel.model';
import {TemplateRappelService} from '../../../../../controller/service/TemplateRappel.service';
import {CampagneRappelChercheurVo} from '../../../../../controller/model/CampagneRappelChercheur.model';
import {CampagneRappelChercheurService} from '../../../../../controller/service/CampagneRappelChercheur.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
@Component({
  selector: 'app-campagne-rappel-create-admin',
  templateUrl: './campagne-rappel-create-admin.component.html',
  styleUrls: ['./campagne-rappel-create-admin.component.css']
})
export class CampagneRappelCreateAdminComponent implements OnInit {

        selectedCampagneRappelChercheurs: CampagneRappelChercheurVo = new CampagneRappelChercheurVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCampagneLibelle = true;
    _validTemplateRappelCode = true;



constructor(private datePipe: DatePipe, private campagneRappelService: CampagneRappelService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private chercheurService :ChercheurService
,       private templateRappelService :TemplateRappelService
,       private campagneRappelChercheurService :CampagneRappelChercheurService
,       private campagneService :CampagneService
) {

}


// methods
ngOnInit(): void {


                this.selectedCampagneRappelChercheurs.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);


    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedTemplateRappel = new TemplateRappelVo();
    this.templateRappelService.findAll().subscribe((data) => this.templateRappels = data);
}


    validateCampagneRappelChercheurs(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    }

        addCampagneRappelChercheurs() {
        if( this.selectedCampagneRappel.campagneRappelChercheursVo == null ){
            this.selectedCampagneRappel.campagneRappelChercheursVo = new Array<CampagneRappelChercheurVo>();
        }
       this.validateCampagneRappelChercheurs();
       if (this.errorMessages.length === 0) {
              this.selectedCampagneRappel.campagneRappelChercheursVo.push(this.selectedCampagneRappelChercheurs);
              this.selectedCampagneRappelChercheurs = new CampagneRappelChercheurVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteCampagneRappelChercheurs(p: CampagneRappelChercheurVo) {
        this.selectedCampagneRappel.campagneRappelChercheursVo.forEach((element, index) => {
            if (element === p) { this.selectedCampagneRappel.campagneRappelChercheursVo.splice(index, 1); }
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
     this.campagneRappelService.save().subscribe(campagneRappel=>{
       this.campagneRappels.push({...campagneRappel});
       this.createCampagneRappelDialog = false;
       this.submitted = false;
       this.selectedCampagneRappel = new CampagneRappelVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }



















//openPopup
              public async openCreatetemplateRappel(templateRappel: string) {
                      const isPermistted = await this.roleService.isPermitted('TemplateRappel', 'add');
                       if(isPermistted){
         this.selectedTemplateRappel = new TemplateRappelVo();
        this.createTemplateRappelDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
    this.createCampagneRappelDialog  = false;
    this.setValidation(true);
}

// getters and setters

get campagneRappels(): Array<CampagneRappelVo> {
    return this.campagneRappelService.campagneRappels;
       }
set campagneRappels(value: Array<CampagneRappelVo>) {
        this.campagneRappelService.campagneRappels = value;
       }

 get selectedCampagneRappel():CampagneRappelVo {
           return this.campagneRappelService.selectedCampagneRappel;
       }
    set selectedCampagneRappel(value: CampagneRappelVo) {
        this.campagneRappelService.selectedCampagneRappel = value;
       }

   get createCampagneRappelDialog(): boolean {
           return this.campagneRappelService.createCampagneRappelDialog;

       }
    set createCampagneRappelDialog(value: boolean) {
        this.campagneRappelService.createCampagneRappelDialog= value;
       }

       get selectedTemplateRappel(): TemplateRappelVo {
           return this.templateRappelService.selectedTemplateRappel;
       }
      set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
       }
       get templateRappels(): Array<TemplateRappelVo> {
           return this.templateRappelService.templateRappels;
       }
       set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
       }
       get createTemplateRappelDialog(): boolean {
           return this.templateRappelService.createTemplateRappelDialog;
       }
      set createTemplateRappelDialog(value: boolean) {
        this.templateRappelService.createTemplateRappelDialog= value;
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
    get validTemplateRappelCode(): boolean {
    return this._validTemplateRappelCode;
    }

    set validTemplateRappelCode(value: boolean) {
    this._validTemplateRappelCode = value;
    }

}
