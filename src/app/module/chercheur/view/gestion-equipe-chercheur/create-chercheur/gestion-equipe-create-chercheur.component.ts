import {Component, OnInit, Input} from '@angular/core';
import {GestionEquipeService} from '../../../../../controller/service/GestionEquipe.service';
import {GestionEquipeVo} from '../../../../../controller/model/GestionEquipe.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';

import { TokenService } from 'src/app/controller/service/Token.service';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {GestionEquipeDetailVo} from '../../../../../controller/model/GestionEquipeDetail.model';
import {GestionEquipeDetailService} from '../../../../../controller/service/GestionEquipeDetail.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
@Component({
  selector: 'app-gestion-equipe-create-chercheur',
  templateUrl: './gestion-equipe-create-chercheur.component.html',
  styleUrls: ['./gestion-equipe-create-chercheur.component.css']
})
export class GestionEquipeCreateChercheurComponent implements OnInit {

        selectedGestionEquipeDetails: GestionEquipeDetailVo = new GestionEquipeDetailVo();
    msgsContents: string;
    info: string;
    chercheurVo: ChercheurVo;
    isLoaded: boolean = false;
    isBlocked: boolean = true;
    campagneVo: CampagneVo;
    data: any;
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCampagneLibelle = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;



constructor(private datePipe: DatePipe, private gestionEquipeService: GestionEquipeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
  ,       private tokenService: TokenService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private chercheurService :ChercheurService
,       private gestionEquipeDetailService :GestionEquipeDetailService
,       private campagneService :CampagneService
) {

}


 public loadCampagne(username) {
    this.campagneService.findProgressCampagneByChercheurUsername(username).subscribe(data => {
     if (data != null && data.id != null) {
        let campagneVo = data;
        this.gestionEquipeService.findByChercheurUsernameAndCampagneId(this.tokenService.getUsername(), campagneVo['id']).subscribe(gestionEquipe => {
          this.isLoaded = false;
          if (gestionEquipe) {
            this.msgsContents = 'Vous avez saisi les données gestionEquipe de cette campagne';
            this.info = 'info'
            //this.selectedGestionEquipe={ ...gestionEquipe }['0']; TODO: in case non formulaire
            this.selectedGestionEquipe.campagneVo=campagneVo;
            this.isLoaded = true;
          }
          else {
            this.msgsContents =  "Il y a une campagne en cours, vous pouvez saisir les données"
            this.selectedGestionEquipe.campagneVo=campagneVo;
            this.info = "info"
            this.isLoaded = true;
          }
        });
      }
      else {
        this.msgsContents = "Actuellement, aucune campagne en cours"
        this.info = "warn"
        this.isLoaded = false;
 }
});
}
// methods
ngOnInit(): void {
        this.loadCampagne(this.tokenService.getUsername());




    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}


    validateGestionEquipeDetails(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    }

        addGestionEquipeDetails() {
        if( this.selectedGestionEquipe.gestionEquipeDetailsVo == null ){
            this.selectedGestionEquipe.gestionEquipeDetailsVo = new Array<GestionEquipeDetailVo>();
        }
       this.validateGestionEquipeDetails();
       if (this.errorMessages.length === 0) {
              this.selectedGestionEquipe.gestionEquipeDetailsVo.push(this.selectedGestionEquipeDetails);
              this.selectedGestionEquipeDetails = new GestionEquipeDetailVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteGestionEquipeDetails(p: GestionEquipeDetailVo) {
        this.selectedGestionEquipe.gestionEquipeDetailsVo.forEach((element, index) => {
            if (element === p) { this.selectedGestionEquipe.gestionEquipeDetailsVo.splice(index, 1); }
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
if(this.data) {
 this.selectedGestionEquipe=this.data;
 }
     this.gestionEquipeService.save().subscribe(gestionEquipe=>{
       this.gestionEquipes.push({...gestionEquipe});
       this.createGestionEquipeDialog = false;
       this.submitted = false;
       this.selectedGestionEquipe = new GestionEquipeVo();


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
              public async openCreateetatEtapeCampagne(etatEtapeCampagne: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
                       if(isPermistted){
         this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.createEtatEtapeCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createGestionEquipeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get gestionEquipes(): Array<GestionEquipeVo> {
    return this.gestionEquipeService.gestionEquipes;
       }
set gestionEquipes(value: Array<GestionEquipeVo>) {
        this.gestionEquipeService.gestionEquipes = value;
       }

 get selectedGestionEquipe():GestionEquipeVo {
           return this.gestionEquipeService.selectedGestionEquipe;
       }
    set selectedGestionEquipe(value: GestionEquipeVo) {
        this.gestionEquipeService.selectedGestionEquipe = value;
       }

   get createGestionEquipeDialog(): boolean {
           return this.gestionEquipeService.createGestionEquipeDialog;

       }
    set createGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.createGestionEquipeDialog= value;
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
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get createEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
       }
      set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
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
    get validEtatEtapeCampagneLibelle(): boolean {
    return this._validEtatEtapeCampagneLibelle;
    }

    set validEtatEtapeCampagneLibelle(value: boolean) {
    this._validEtatEtapeCampagneLibelle = value;
    }
    get validEtatEtapeCampagneCode(): boolean {
    return this._validEtatEtapeCampagneCode;
    }

    set validEtatEtapeCampagneCode(value: boolean) {
    this._validEtatEtapeCampagneCode = value;
    }

}
