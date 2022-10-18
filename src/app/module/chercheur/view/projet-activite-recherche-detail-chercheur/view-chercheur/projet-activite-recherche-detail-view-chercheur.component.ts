import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-projet-activite-recherche-detail-view-chercheur',
  templateUrl: './projet-activite-recherche-detail-view-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-detail-view-chercheur.component.css']
})
export class ProjetActiviteRechercheDetailViewChercheurComponent implements OnInit {

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
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private roleProjetService :RoleProjetService
    ,private etablissementService :EtablissementService
    ,private projetActiviteRechercheDetailInstitutionCoContractantService :ProjetActiviteRechercheDetailInstitutionCoContractantService
    ,private instrumentIrdService :InstrumentIrdService
    ,private paysService :PaysService
    ,private projetActiviteRechercheDetailPaysService :ProjetActiviteRechercheDetailPaysService
    ,private projetActiviteRechercheService :ProjetActiviteRechercheService
    ,private projetActiviteRechercheDetailEtablissementLanceurService :ProjetActiviteRechercheDetailEtablissementLanceurService
    ,private statusProjetService :StatusProjetService
    ,private projetActiviteRechercheDetailEnjeuxIrdService :ProjetActiviteRechercheDetailEnjeuxIrdService
    ,private projetActiviteRechercheDetailInstrumentIrdService :ProjetActiviteRechercheDetailInstrumentIrdService
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

hideViewDialog(){
    this.viewProjetActiviteRechercheDetailDialog  = false;
}

// getters and setters

get projetActiviteRechercheDetails(): Array<ProjetActiviteRechercheDetailVo> {
    return this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails;
       }
set projetActiviteRechercheDetails(value: Array<ProjetActiviteRechercheDetailVo>) {
        this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails = value;
       }

 get selectedProjetActiviteRechercheDetail():ProjetActiviteRechercheDetailVo {
           return this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail;
       }
    set selectedProjetActiviteRechercheDetail(value: ProjetActiviteRechercheDetailVo) {
        this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail = value;
       }

   get viewProjetActiviteRechercheDetailDialog():boolean {
           return this.projetActiviteRechercheDetailService.viewProjetActiviteRechercheDetailDialog;

       }
    set viewProjetActiviteRechercheDetailDialog(value: boolean) {
        this.projetActiviteRechercheDetailService.viewProjetActiviteRechercheDetailDialog= value;
       }

       get selectedEtablissement():EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements():Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get editEtablissementDialog():boolean {
           return this.etablissementService.editEtablissementDialog;
       }
      set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
       }
       get selectedProjetActiviteRecherche():ProjetActiviteRechercheVo {
           return this.projetActiviteRechercheService.selectedProjetActiviteRecherche;
       }
      set selectedProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this.projetActiviteRechercheService.selectedProjetActiviteRecherche = value;
       }
       get projetActiviteRecherches():Array<ProjetActiviteRechercheVo> {
           return this.projetActiviteRechercheService.projetActiviteRecherches;
       }
       set projetActiviteRecherches(value: Array<ProjetActiviteRechercheVo>) {
        this.projetActiviteRechercheService.projetActiviteRecherches = value;
       }
       get editProjetActiviteRechercheDialog():boolean {
           return this.projetActiviteRechercheService.editProjetActiviteRechercheDialog;
       }
      set editProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.editProjetActiviteRechercheDialog= value;
       }
       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
       }
       get selectedRoleProjet():RoleProjetVo {
           return this.roleProjetService.selectedRoleProjet;
       }
      set selectedRoleProjet(value: RoleProjetVo) {
        this.roleProjetService.selectedRoleProjet = value;
       }
       get roleProjets():Array<RoleProjetVo> {
           return this.roleProjetService.roleProjets;
       }
       set roleProjets(value: Array<RoleProjetVo>) {
        this.roleProjetService.roleProjets = value;
       }
       get editRoleProjetDialog():boolean {
           return this.roleProjetService.editRoleProjetDialog;
       }
      set editRoleProjetDialog(value: boolean) {
        this.roleProjetService.editRoleProjetDialog= value;
       }
       get selectedStatusProjet():StatusProjetVo {
           return this.statusProjetService.selectedStatusProjet;
       }
      set selectedStatusProjet(value: StatusProjetVo) {
        this.statusProjetService.selectedStatusProjet = value;
       }
       get statusProjets():Array<StatusProjetVo> {
           return this.statusProjetService.statusProjets;
       }
       set statusProjets(value: Array<StatusProjetVo>) {
        this.statusProjetService.statusProjets = value;
       }
       get editStatusProjetDialog():boolean {
           return this.statusProjetService.editStatusProjetDialog;
       }
      set editStatusProjetDialog(value: boolean) {
        this.statusProjetService.editStatusProjetDialog= value;
       }
       get selectedInstrumentIrd():InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds():Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get editInstrumentIrdDialog():boolean {
           return this.instrumentIrdService.editInstrumentIrdDialog;
       }
      set editInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.editInstrumentIrdDialog= value;
       }
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }
       get selectedEtatEtapeCampagne():EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes():Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get editEtatEtapeCampagneDialog():boolean {
           return this.etatEtapeCampagneService.editEtatEtapeCampagneDialog;
       }
      set editEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.editEtatEtapeCampagneDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
