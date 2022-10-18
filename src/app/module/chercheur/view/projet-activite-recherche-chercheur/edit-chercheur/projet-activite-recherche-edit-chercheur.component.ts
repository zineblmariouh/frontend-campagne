import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheService} from '../../../../../controller/service/ProjetActiviteRecherche.service';
import {ProjetActiviteRechercheVo} from '../../../../../controller/model/ProjetActiviteRecherche.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {RoleProjetVo} from '../../../../../controller/model/RoleProjet.model';
import {RoleProjetService} from '../../../../../controller/service/RoleProjet.service';
import {StatusProjetVo} from '../../../../../controller/model/StatusProjet.model';
import {StatusProjetService} from '../../../../../controller/service/StatusProjet.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-projet-activite-recherche-edit-chercheur',
  templateUrl: './projet-activite-recherche-edit-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-edit-chercheur.component.css']
})
export class ProjetActiviteRechercheEditChercheurComponent implements OnInit {

        selectedProjetActiviteRechercheDetails: ProjetActiviteRechercheDetailVo = new ProjetActiviteRechercheDetailVo();
        projetActiviteRechercheDetailsListe: Array<ProjetActiviteRechercheDetailVo> = [];

        myStatusProjets: Array<StatusProjetVo> = [];
        myRoleProjets: Array<RoleProjetVo> = [];
        myEtablissements: Array<EtablissementVo> = [];
        myPayss: Array<PaysVo> = [];
        myEtatEtapeCampagnes: Array<EtatEtapeCampagneVo> = [];


constructor(private datePipe: DatePipe, private projetActiviteRechercheService: ProjetActiviteRechercheService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private roleProjetService: RoleProjetService
 ,       private statusProjetService: StatusProjetService
 ,       private etablissementService: EtablissementService
 ,       private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
 ,       private campagneService: CampagneService
 ,       private paysService: PaysService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
                this.selectedProjetActiviteRechercheDetails.statusProjetVo = new StatusProjetVo();
                this.statusProjetService.findAll().subscribe((data) => this.statusProjets = data);
                this.selectedProjetActiviteRechercheDetails.roleProjetVo = new RoleProjetVo();
                this.roleProjetService.findAll().subscribe((data) => this.roleProjets = data);
                this.selectedProjetActiviteRechercheDetails.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedProjetActiviteRechercheDetails.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedProjetActiviteRechercheDetails.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
}
        addProjetActiviteRechercheDetails() {
        if( this.selectedProjetActiviteRecherche.projetActiviteRechercheDetailsVo == null ){
            this.selectedProjetActiviteRecherche.projetActiviteRechercheDetailsVo = new Array<ProjetActiviteRechercheDetailVo>();
        }
        this.selectedProjetActiviteRecherche.projetActiviteRechercheDetailsVo.push(this.selectedProjetActiviteRechercheDetails);
        this.selectedProjetActiviteRechercheDetails = new ProjetActiviteRechercheDetailVo();
        }

       deleteProjetActiviteRechercheDetails(p: ProjetActiviteRechercheDetailVo) {
        this.selectedProjetActiviteRecherche.projetActiviteRechercheDetailsVo.forEach((element, index) => {
            if (element === p) { this.selectedProjetActiviteRecherche.projetActiviteRechercheDetailsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.projetActiviteRechercheService.edit().subscribe(projetActiviteRecherche=>{
    const myIndex = this.projetActiviteRecherches.findIndex(e => e.id === this.selectedProjetActiviteRecherche.id);
    this.projetActiviteRecherches[myIndex] = this.selectedProjetActiviteRecherche;
    this.editProjetActiviteRechercheDialog = false;
    this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateroleProjet(roleProjet: string) {
                      const isPermistted = await this.roleService.isPermitted('RoleProjet', 'add');
                       if(isPermistted){
         this.selectedRoleProjet = new RoleProjetVo();
        this.createRoleProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestatusProjet(statusProjet: string) {
                      const isPermistted = await this.roleService.isPermitted('StatusProjet', 'add');
                       if(isPermistted){
         this.selectedStatusProjet = new StatusProjetVo();
        this.createStatusProjetDialog = true;
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

hideEditDialog(){
    this.editProjetActiviteRechercheDialog  = false;
}

// getters and setters

get projetActiviteRecherches(): Array<ProjetActiviteRechercheVo> {
    return this.projetActiviteRechercheService.projetActiviteRecherches;
       }
set projetActiviteRecherches(value: Array<ProjetActiviteRechercheVo>) {
        this.projetActiviteRechercheService.projetActiviteRecherches = value;
       }

 get selectedProjetActiviteRecherche(): ProjetActiviteRechercheVo {
           return this.projetActiviteRechercheService.selectedProjetActiviteRecherche;
       }
    set selectedProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this.projetActiviteRechercheService.selectedProjetActiviteRecherche = value;
       }

   get editProjetActiviteRechercheDialog(): boolean {
           return this.projetActiviteRechercheService.editProjetActiviteRechercheDialog;

       }
    set editProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.editProjetActiviteRechercheDialog = value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
       }
       get selectedRoleProjet(): RoleProjetVo {
           return this.roleProjetService.selectedRoleProjet;
       }
      set selectedRoleProjet(value: RoleProjetVo) {
        this.roleProjetService.selectedRoleProjet = value;
       }
       get roleProjets(): Array<RoleProjetVo> {
           return this.roleProjetService.roleProjets;
       }
       set roleProjets(value: Array<RoleProjetVo>) {
        this.roleProjetService.roleProjets = value;
       }
       get createRoleProjetDialog(): boolean {
           return this.roleProjetService.createRoleProjetDialog;
       }
      set createRoleProjetDialog(value: boolean) {
        this.roleProjetService.createRoleProjetDialog= value;
       }
       get selectedStatusProjet(): StatusProjetVo {
           return this.statusProjetService.selectedStatusProjet;
       }
      set selectedStatusProjet(value: StatusProjetVo) {
        this.statusProjetService.selectedStatusProjet = value;
       }
       get statusProjets(): Array<StatusProjetVo> {
           return this.statusProjetService.statusProjets;
       }
       set statusProjets(value: Array<StatusProjetVo>) {
        this.statusProjetService.statusProjets = value;
       }
       get createStatusProjetDialog(): boolean {
           return this.statusProjetService.createStatusProjetDialog;
       }
      set createStatusProjetDialog(value: boolean) {
        this.statusProjetService.createStatusProjetDialog= value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
