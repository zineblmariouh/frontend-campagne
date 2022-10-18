import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
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
  selector: 'app-responsabilite-pedagogique-edit-chercheur',
  templateUrl: './responsabilite-pedagogique-edit-chercheur.component.html',
  styleUrls: ['./responsabilite-pedagogique-edit-chercheur.component.css']
})
export class ResponsabilitePedagogiqueEditChercheurComponent implements OnInit {

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
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enseignementEtFormationService: EnseignementEtFormationService
 ,       private statusCursusService: StatusCursusService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private niveauResponsabilitePedagogiqueService: NiveauResponsabilitePedagogiqueService
 ,       private responsabilitePedagogiqueEtablissementService: ResponsabilitePedagogiqueEtablissementService
 ,       private responsabilitePedagogiqueEnjeuxIrdService: ResponsabilitePedagogiqueEnjeuxIrdService
 ,       private responsabilitePedagogiquePaysService: ResponsabilitePedagogiquePaysService
 ,       private etablissementService: EtablissementService
 ,       private paysService: PaysService
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
        addResponsabilitePedagogiqueEnjeuxIrds() {
        if( this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEnjeuxIrdsVo == null ){
            this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEnjeuxIrdsVo = new Array<ResponsabilitePedagogiqueEnjeuxIrdVo>();
        }
        this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEnjeuxIrdsVo.push(this.selectedResponsabilitePedagogiqueEnjeuxIrds);
        this.selectedResponsabilitePedagogiqueEnjeuxIrds = new ResponsabilitePedagogiqueEnjeuxIrdVo();
        }

       deleteResponsabilitePedagogiqueEnjeuxIrds(p: ResponsabilitePedagogiqueEnjeuxIrdVo) {
        this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEnjeuxIrdsVo.splice(index, 1); }
        });
    }
        addResponsabilitePedagogiqueEtablissements() {
        if( this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEtablissementsVo == null ){
            this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEtablissementsVo = new Array<ResponsabilitePedagogiqueEtablissementVo>();
        }
        this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEtablissementsVo.push(this.selectedResponsabilitePedagogiqueEtablissements);
        this.selectedResponsabilitePedagogiqueEtablissements = new ResponsabilitePedagogiqueEtablissementVo();
        }

       deleteResponsabilitePedagogiqueEtablissements(p: ResponsabilitePedagogiqueEtablissementVo) {
        this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEtablissementsVo.forEach((element, index) => {
            if (element === p) { this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEtablissementsVo.splice(index, 1); }
        });
    }
        addResponsabilitePedagogiquePayss() {
        if( this.selectedResponsabilitePedagogique.responsabilitePedagogiquePayssVo == null ){
            this.selectedResponsabilitePedagogique.responsabilitePedagogiquePayssVo = new Array<ResponsabilitePedagogiquePaysVo>();
        }
        this.selectedResponsabilitePedagogique.responsabilitePedagogiquePayssVo.push(this.selectedResponsabilitePedagogiquePayss);
        this.selectedResponsabilitePedagogiquePayss = new ResponsabilitePedagogiquePaysVo();
        }

       deleteResponsabilitePedagogiquePayss(p: ResponsabilitePedagogiquePaysVo) {
        this.selectedResponsabilitePedagogique.responsabilitePedagogiquePayssVo.forEach((element, index) => {
            if (element === p) { this.selectedResponsabilitePedagogique.responsabilitePedagogiquePayssVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.responsabilitePedagogiqueService.edit().subscribe(responsabilitePedagogique=>{
    const myIndex = this.responsabilitePedagogiques.findIndex(e => e.id === this.selectedResponsabilitePedagogique.id);
    this.responsabilitePedagogiques[myIndex] = this.selectedResponsabilitePedagogique;
    this.editResponsabilitePedagogiqueDialog = false;
    this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenseignementEtFormation(enseignementEtFormation: string) {
                      const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'add');
                       if(isPermistted){
         this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
        this.createEnseignementEtFormationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
              public async openCreateniveauResponsabilitePedagogique(niveauResponsabilitePedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauResponsabilitePedagogique', 'add');
                       if(isPermistted){
         this.selectedNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();
        this.createNiveauResponsabilitePedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestatusCursus(statusCursus: string) {
                      const isPermistted = await this.roleService.isPermitted('StatusCursus', 'add');
                       if(isPermistted){
         this.selectedStatusCursus = new StatusCursusVo();
        this.createStatusCursusDialog = true;
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
    this.editResponsabilitePedagogiqueDialog  = false;
}

// getters and setters

get responsabilitePedagogiques(): Array<ResponsabilitePedagogiqueVo> {
    return this.responsabilitePedagogiqueService.responsabilitePedagogiques;
       }
set responsabilitePedagogiques(value: Array<ResponsabilitePedagogiqueVo>) {
        this.responsabilitePedagogiqueService.responsabilitePedagogiques = value;
       }

 get selectedResponsabilitePedagogique(): ResponsabilitePedagogiqueVo {
           return this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique;
       }
    set selectedResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique = value;
       }

   get editResponsabilitePedagogiqueDialog(): boolean {
           return this.responsabilitePedagogiqueService.editResponsabilitePedagogiqueDialog;

       }
    set editResponsabilitePedagogiqueDialog(value: boolean) {
        this.responsabilitePedagogiqueService.editResponsabilitePedagogiqueDialog = value;
       }

       get selectedEnseignementEtFormation(): EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
      set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }
       get enseignementEtFormations(): Array<EnseignementEtFormationVo> {
           return this.enseignementEtFormationService.enseignementEtFormations;
       }
       set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }
       get createEnseignementEtFormationDialog(): boolean {
           return this.enseignementEtFormationService.createEnseignementEtFormationDialog;
       }
      set createEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.createEnseignementEtFormationDialog= value;
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
       get selectedNiveauResponsabilitePedagogique(): NiveauResponsabilitePedagogiqueVo {
           return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
       }
      set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
       }
       get niveauResponsabilitePedagogiques(): Array<NiveauResponsabilitePedagogiqueVo> {
           return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
       }
       set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
       }
       get createNiveauResponsabilitePedagogiqueDialog(): boolean {
           return this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog;
       }
      set createNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog= value;
       }
       get selectedStatusCursus(): StatusCursusVo {
           return this.statusCursusService.selectedStatusCursus;
       }
      set selectedStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.selectedStatusCursus = value;
       }
       get statusCursuss(): Array<StatusCursusVo> {
           return this.statusCursusService.statusCursuss;
       }
       set statusCursuss(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursuss = value;
       }
       get createStatusCursusDialog(): boolean {
           return this.statusCursusService.createStatusCursusDialog;
       }
      set createStatusCursusDialog(value: boolean) {
        this.statusCursusService.createStatusCursusDialog= value;
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
