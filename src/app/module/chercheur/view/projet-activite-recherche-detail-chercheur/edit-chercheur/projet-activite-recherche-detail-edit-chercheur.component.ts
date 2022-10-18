import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {RoleProjetVo} from '../../../../../controller/model/RoleProjet.model';
import {RoleProjetService} from '../../../../../controller/service/RoleProjet.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {ProjetActiviteRechercheDetailInstitutionCoContractantVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstitutionCoContractant.model';
import {ProjetActiviteRechercheDetailInstitutionCoContractantService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstitutionCoContractant.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {ProjetActiviteRechercheDetailPaysVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailPays.model';
import {ProjetActiviteRechercheDetailPaysService} from '../../../../../controller/service/ProjetActiviteRechercheDetailPays.service';
import {ProjetActiviteRechercheVo} from '../../../../../controller/model/ProjetActiviteRecherche.model';
import {ProjetActiviteRechercheService} from '../../../../../controller/service/ProjetActiviteRecherche.service';
import {ProjetActiviteRechercheDetailEtablissementLanceurVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEtablissementLanceur.model';
import {ProjetActiviteRechercheDetailEtablissementLanceurService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEtablissementLanceur.service';
import {StatusProjetVo} from '../../../../../controller/model/StatusProjet.model';
import {StatusProjetService} from '../../../../../controller/service/StatusProjet.service';
import {ProjetActiviteRechercheDetailEnjeuxIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEnjeuxIrd.model';
import {ProjetActiviteRechercheDetailEnjeuxIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEnjeuxIrd.service';
import {ProjetActiviteRechercheDetailInstrumentIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstrumentIrd.model';
import {ProjetActiviteRechercheDetailInstrumentIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstrumentIrd.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-edit-chercheur',
  templateUrl: './projet-activite-recherche-detail-edit-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-detail-edit-chercheur.component.css']
})
export class ProjetActiviteRechercheDetailEditChercheurComponent implements OnInit {

        selectedProjetActiviteRechercheDetailEnjeuxIrds: ProjetActiviteRechercheDetailEnjeuxIrdVo = new ProjetActiviteRechercheDetailEnjeuxIrdVo();
        projetActiviteRechercheDetailEnjeuxIrdsListe: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedProjetActiviteRechercheDetailInstrumentIrds: ProjetActiviteRechercheDetailInstrumentIrdVo = new ProjetActiviteRechercheDetailInstrumentIrdVo();
        projetActiviteRechercheDetailInstrumentIrdsListe: Array<ProjetActiviteRechercheDetailInstrumentIrdVo> = [];

        myInstrumentIrds: Array<InstrumentIrdVo> = [];

        selectedProjetActiviteRechercheDetailPayss: ProjetActiviteRechercheDetailPaysVo = new ProjetActiviteRechercheDetailPaysVo();
        projetActiviteRechercheDetailPayssListe: Array<ProjetActiviteRechercheDetailPaysVo> = [];

        myPayss: Array<PaysVo> = [];

        selectedProjetActiviteRechercheDetailInstitutionCoContractants: ProjetActiviteRechercheDetailInstitutionCoContractantVo = new ProjetActiviteRechercheDetailInstitutionCoContractantVo();
        projetActiviteRechercheDetailInstitutionCoContractantsListe: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo> = [];

        myEtablissements: Array<EtablissementVo> = [];

        selectedProjetActiviteRechercheDetailEtablissementLanceurs: ProjetActiviteRechercheDetailEtablissementLanceurVo = new ProjetActiviteRechercheDetailEtablissementLanceurVo();
        projetActiviteRechercheDetailEtablissementLanceursListe: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> = [];



constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private roleProjetService: RoleProjetService
 ,       private etablissementService: EtablissementService
 ,       private projetActiviteRechercheDetailInstitutionCoContractantService: ProjetActiviteRechercheDetailInstitutionCoContractantService
 ,       private instrumentIrdService: InstrumentIrdService
 ,       private paysService: PaysService
 ,       private projetActiviteRechercheDetailPaysService: ProjetActiviteRechercheDetailPaysService
 ,       private projetActiviteRechercheService: ProjetActiviteRechercheService
 ,       private projetActiviteRechercheDetailEtablissementLanceurService: ProjetActiviteRechercheDetailEtablissementLanceurService
 ,       private statusProjetService: StatusProjetService
 ,       private projetActiviteRechercheDetailEnjeuxIrdService: ProjetActiviteRechercheDetailEnjeuxIrdService
 ,       private projetActiviteRechercheDetailInstrumentIrdService: ProjetActiviteRechercheDetailInstrumentIrdService
) {
}

// methods
ngOnInit(): void {
                this.selectedProjetActiviteRechercheDetailEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedProjetActiviteRechercheDetailInstrumentIrds.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
                this.selectedProjetActiviteRechercheDetailPayss.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedProjetActiviteRechercheDetailInstitutionCoContractants.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedProjetActiviteRechercheDetailEtablissementLanceurs.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedStatusProjet = new StatusProjetVo();
    this.statusProjetService.findAll().subscribe((data) => this.statusProjets = data);
    this.selectedRoleProjet = new RoleProjetVo();
    this.roleProjetService.findAll().subscribe((data) => this.roleProjets = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();
    this.projetActiviteRechercheService.findAll().subscribe((data) => this.projetActiviteRecherches = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addProjetActiviteRechercheDetailEnjeuxIrds() {
        if( this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailEnjeuxIrdsVo == null ){
            this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailEnjeuxIrdsVo = new Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>();
        }
        this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailEnjeuxIrdsVo.push(this.selectedProjetActiviteRechercheDetailEnjeuxIrds);
        this.selectedProjetActiviteRechercheDetailEnjeuxIrds = new ProjetActiviteRechercheDetailEnjeuxIrdVo();
        }

       deleteProjetActiviteRechercheDetailEnjeuxIrds(p: ProjetActiviteRechercheDetailEnjeuxIrdVo) {
        this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailEnjeuxIrdsVo.splice(index, 1); }
        });
    }
        addProjetActiviteRechercheDetailInstrumentIrds() {
        if( this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailInstrumentIrdsVo == null ){
            this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailInstrumentIrdsVo = new Array<ProjetActiviteRechercheDetailInstrumentIrdVo>();
        }
        this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailInstrumentIrdsVo.push(this.selectedProjetActiviteRechercheDetailInstrumentIrds);
        this.selectedProjetActiviteRechercheDetailInstrumentIrds = new ProjetActiviteRechercheDetailInstrumentIrdVo();
        }

       deleteProjetActiviteRechercheDetailInstrumentIrds(p: ProjetActiviteRechercheDetailInstrumentIrdVo) {
        this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailInstrumentIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailInstrumentIrdsVo.splice(index, 1); }
        });
    }
        addProjetActiviteRechercheDetailPayss() {
        if( this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailPayssVo == null ){
            this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailPayssVo = new Array<ProjetActiviteRechercheDetailPaysVo>();
        }
        this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailPayssVo.push(this.selectedProjetActiviteRechercheDetailPayss);
        this.selectedProjetActiviteRechercheDetailPayss = new ProjetActiviteRechercheDetailPaysVo();
        }

       deleteProjetActiviteRechercheDetailPayss(p: ProjetActiviteRechercheDetailPaysVo) {
        this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailPayssVo.forEach((element, index) => {
            if (element === p) { this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailPayssVo.splice(index, 1); }
        });
    }
        addProjetActiviteRechercheDetailInstitutionCoContractants() {
        if( this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailInstitutionCoContractantsVo == null ){
            this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailInstitutionCoContractantsVo = new Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>();
        }
        this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailInstitutionCoContractantsVo.push(this.selectedProjetActiviteRechercheDetailInstitutionCoContractants);
        this.selectedProjetActiviteRechercheDetailInstitutionCoContractants = new ProjetActiviteRechercheDetailInstitutionCoContractantVo();
        }

       deleteProjetActiviteRechercheDetailInstitutionCoContractants(p: ProjetActiviteRechercheDetailInstitutionCoContractantVo) {
        this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailInstitutionCoContractantsVo.forEach((element, index) => {
            if (element === p) { this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailInstitutionCoContractantsVo.splice(index, 1); }
        });
    }
        addProjetActiviteRechercheDetailEtablissementLanceurs() {
        if( this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailEtablissementLanceursVo == null ){
            this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailEtablissementLanceursVo = new Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>();
        }
        this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailEtablissementLanceursVo.push(this.selectedProjetActiviteRechercheDetailEtablissementLanceurs);
        this.selectedProjetActiviteRechercheDetailEtablissementLanceurs = new ProjetActiviteRechercheDetailEtablissementLanceurVo();
        }

       deleteProjetActiviteRechercheDetailEtablissementLanceurs(p: ProjetActiviteRechercheDetailEtablissementLanceurVo) {
        this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailEtablissementLanceursVo.forEach((element, index) => {
            if (element === p) { this.selectedProjetActiviteRechercheDetail.projetActiviteRechercheDetailEtablissementLanceursVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.projetActiviteRechercheDetailService.edit().subscribe(projetActiviteRechercheDetail=>{
    const myIndex = this.projetActiviteRechercheDetails.findIndex(e => e.id === this.selectedProjetActiviteRechercheDetail.id);
    this.projetActiviteRechercheDetails[myIndex] = this.selectedProjetActiviteRechercheDetail;
    this.editProjetActiviteRechercheDetailDialog = false;
    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();


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
              public async openCreateprojetActiviteRecherche(projetActiviteRecherche: string) {
                      const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'add');
                       if(isPermistted){
         this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();
        this.createProjetActiviteRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
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
              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
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

hideEditDialog(){
    this.editProjetActiviteRechercheDetailDialog  = false;
}

// getters and setters

get projetActiviteRechercheDetails(): Array<ProjetActiviteRechercheDetailVo> {
    return this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails;
       }
set projetActiviteRechercheDetails(value: Array<ProjetActiviteRechercheDetailVo>) {
        this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails = value;
       }

 get selectedProjetActiviteRechercheDetail(): ProjetActiviteRechercheDetailVo {
           return this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail;
       }
    set selectedProjetActiviteRechercheDetail(value: ProjetActiviteRechercheDetailVo) {
        this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail = value;
       }

   get editProjetActiviteRechercheDetailDialog(): boolean {
           return this.projetActiviteRechercheDetailService.editProjetActiviteRechercheDetailDialog;

       }
    set editProjetActiviteRechercheDetailDialog(value: boolean) {
        this.projetActiviteRechercheDetailService.editProjetActiviteRechercheDetailDialog = value;
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
       get selectedProjetActiviteRecherche(): ProjetActiviteRechercheVo {
           return this.projetActiviteRechercheService.selectedProjetActiviteRecherche;
       }
      set selectedProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this.projetActiviteRechercheService.selectedProjetActiviteRecherche = value;
       }
       get projetActiviteRecherches(): Array<ProjetActiviteRechercheVo> {
           return this.projetActiviteRechercheService.projetActiviteRecherches;
       }
       set projetActiviteRecherches(value: Array<ProjetActiviteRechercheVo>) {
        this.projetActiviteRechercheService.projetActiviteRecherches = value;
       }
       get createProjetActiviteRechercheDialog(): boolean {
           return this.projetActiviteRechercheService.createProjetActiviteRechercheDialog;
       }
      set createProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.createProjetActiviteRechercheDialog= value;
       }
       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
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
       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
