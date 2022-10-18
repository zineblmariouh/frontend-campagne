import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnseignementEtFormationVo} from '../../../../../controller/model/EnseignementEtFormation.model';
import {EnseignementEtFormationService} from '../../../../../controller/service/EnseignementEtFormation.service';
import {StatusCursusVo} from '../../../../../controller/model/StatusCursus.model';
import {StatusCursusService} from '../../../../../controller/service/StatusCursus.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {NiveauResponsabilitePedagogiqueVo} from '../../../../../controller/model/NiveauResponsabilitePedagogique.model';
import {NiveauResponsabilitePedagogiqueService} from '../../../../../controller/service/NiveauResponsabilitePedagogique.service';
import {ResponsabilitePedagogiqueEtablissementVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEtablissement.model';
import {ResponsabilitePedagogiqueEtablissementService} from '../../../../../controller/service/ResponsabilitePedagogiqueEtablissement.service';
import {ResponsabilitePedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEnjeuxIrd.model';
import {ResponsabilitePedagogiqueEnjeuxIrdService} from '../../../../../controller/service/ResponsabilitePedagogiqueEnjeuxIrd.service';
import {ResponsabilitePedagogiquePaysVo} from '../../../../../controller/model/ResponsabilitePedagogiquePays.model';
import {ResponsabilitePedagogiquePaysService} from '../../../../../controller/service/ResponsabilitePedagogiquePays.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-responsabilite-pedagogique-view-chercheur',
  templateUrl: './responsabilite-pedagogique-view-chercheur.component.html',
  styleUrls: ['./responsabilite-pedagogique-view-chercheur.component.css']
})
export class ResponsabilitePedagogiqueViewChercheurComponent implements OnInit {

        selectedResponsabilitePedagogiqueEnjeuxIrds: ResponsabilitePedagogiqueEnjeuxIrdVo = new ResponsabilitePedagogiqueEnjeuxIrdVo();
        responsabilitePedagogiqueEnjeuxIrdsListe: Array<ResponsabilitePedagogiqueEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedResponsabilitePedagogiqueEtablissements: ResponsabilitePedagogiqueEtablissementVo = new ResponsabilitePedagogiqueEtablissementVo();
        responsabilitePedagogiqueEtablissementsListe: Array<ResponsabilitePedagogiqueEtablissementVo> = [];

        myEtablissements: Array<EtablissementVo> = [];
        myPayss: Array<PaysVo> = [];

        selectedResponsabilitePedagogiquePayss: ResponsabilitePedagogiquePaysVo = new ResponsabilitePedagogiquePaysVo();
        responsabilitePedagogiquePayssListe: Array<ResponsabilitePedagogiquePaysVo> = [];



constructor(private datePipe: DatePipe, private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enseignementEtFormationService :EnseignementEtFormationService
    ,private statusCursusService :StatusCursusService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private niveauResponsabilitePedagogiqueService :NiveauResponsabilitePedagogiqueService
    ,private responsabilitePedagogiqueEtablissementService :ResponsabilitePedagogiqueEtablissementService
    ,private responsabilitePedagogiqueEnjeuxIrdService :ResponsabilitePedagogiqueEnjeuxIrdService
    ,private responsabilitePedagogiquePaysService :ResponsabilitePedagogiquePaysService
    ,private etablissementService :EtablissementService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedResponsabilitePedagogiqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedResponsabilitePedagogiqueEtablissements.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedResponsabilitePedagogiqueEtablissements.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedResponsabilitePedagogiquePayss.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();
    this.niveauResponsabilitePedagogiqueService.findAll().subscribe((data) => this.niveauResponsabilitePedagogiques = data);
    this.selectedStatusCursus = new StatusCursusVo();
    this.statusCursusService.findAll().subscribe((data) => this.statusCursuss = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
    this.enseignementEtFormationService.findAll().subscribe((data) => this.enseignementEtFormations = data);
}

hideViewDialog(){
    this.viewResponsabilitePedagogiqueDialog  = false;
}

// getters and setters

get responsabilitePedagogiques(): Array<ResponsabilitePedagogiqueVo> {
    return this.responsabilitePedagogiqueService.responsabilitePedagogiques;
       }
set responsabilitePedagogiques(value: Array<ResponsabilitePedagogiqueVo>) {
        this.responsabilitePedagogiqueService.responsabilitePedagogiques = value;
       }

 get selectedResponsabilitePedagogique():ResponsabilitePedagogiqueVo {
           return this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique;
       }
    set selectedResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique = value;
       }

   get viewResponsabilitePedagogiqueDialog():boolean {
           return this.responsabilitePedagogiqueService.viewResponsabilitePedagogiqueDialog;

       }
    set viewResponsabilitePedagogiqueDialog(value: boolean) {
        this.responsabilitePedagogiqueService.viewResponsabilitePedagogiqueDialog= value;
       }

       get selectedEnseignementEtFormation():EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
      set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }
       get enseignementEtFormations():Array<EnseignementEtFormationVo> {
           return this.enseignementEtFormationService.enseignementEtFormations;
       }
       set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }
       get editEnseignementEtFormationDialog():boolean {
           return this.enseignementEtFormationService.editEnseignementEtFormationDialog;
       }
      set editEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.editEnseignementEtFormationDialog= value;
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
       get selectedNiveauResponsabilitePedagogique():NiveauResponsabilitePedagogiqueVo {
           return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
       }
      set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
       }
       get niveauResponsabilitePedagogiques():Array<NiveauResponsabilitePedagogiqueVo> {
           return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
       }
       set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
       }
       get editNiveauResponsabilitePedagogiqueDialog():boolean {
           return this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog;
       }
      set editNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog= value;
       }
       get selectedStatusCursus():StatusCursusVo {
           return this.statusCursusService.selectedStatusCursus;
       }
      set selectedStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.selectedStatusCursus = value;
       }
       get statusCursuss():Array<StatusCursusVo> {
           return this.statusCursusService.statusCursuss;
       }
       set statusCursuss(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursuss = value;
       }
       get editStatusCursusDialog():boolean {
           return this.statusCursusService.editStatusCursusDialog;
       }
      set editStatusCursusDialog(value: boolean) {
        this.statusCursusService.editStatusCursusDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
