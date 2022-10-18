import {Component, OnInit} from '@angular/core';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueEncadrementDoctorantVo} from '../../../../../controller/model/DisciplineScientifiqueEncadrementDoctorant.model';
import {DisciplineScientifiqueEncadrementDoctorantService} from '../../../../../controller/service/DisciplineScientifiqueEncadrementDoctorant.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {ResponsabiliteEncadrementDoctorantVo} from '../../../../../controller/model/ResponsabiliteEncadrementDoctorant.model';
import {ResponsabiliteEncadrementDoctorantService} from '../../../../../controller/service/ResponsabiliteEncadrementDoctorant.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {FinancementDoctorantVo} from '../../../../../controller/model/FinancementDoctorant.model';
import {FinancementDoctorantService} from '../../../../../controller/service/FinancementDoctorant.service';
import {EnjeuxIrdEncadrementDoctorantVo} from '../../../../../controller/model/EnjeuxIrdEncadrementDoctorant.model';
import {EnjeuxIrdEncadrementDoctorantService} from '../../../../../controller/service/EnjeuxIrdEncadrementDoctorant.service';
import {CommunauteSavoirEncadrementDoctorantVo} from '../../../../../controller/model/CommunauteSavoirEncadrementDoctorant.model';
import {CommunauteSavoirEncadrementDoctorantService} from '../../../../../controller/service/CommunauteSavoirEncadrementDoctorant.service';
import {EncadrementVo} from '../../../../../controller/model/Encadrement.model';
import {EncadrementService} from '../../../../../controller/service/Encadrement.service';
import {DoctorantVo} from '../../../../../controller/model/Doctorant.model';
import {DoctorantService} from '../../../../../controller/service/Doctorant.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';

@Component({
  selector: 'app-encadrement-doctorant-view-admin',
  templateUrl: './encadrement-doctorant-view-admin.component.html',
  styleUrls: ['./encadrement-doctorant-view-admin.component.css']
})
export class EncadrementDoctorantViewAdminComponent implements OnInit {

        selectedEnjeuxIrdEncadrementDoctorants: EnjeuxIrdEncadrementDoctorantVo = new EnjeuxIrdEncadrementDoctorantVo();
        enjeuxIrdEncadrementDoctorantsListe: Array<EnjeuxIrdEncadrementDoctorantVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedDisciplineScientifiqueEncadrementDoctorants: DisciplineScientifiqueEncadrementDoctorantVo = new DisciplineScientifiqueEncadrementDoctorantVo();
        disciplineScientifiqueEncadrementDoctorantsListe: Array<DisciplineScientifiqueEncadrementDoctorantVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

        selectedCommunauteSavoirEncadrementDoctorants: CommunauteSavoirEncadrementDoctorantVo = new CommunauteSavoirEncadrementDoctorantVo();
        communauteSavoirEncadrementDoctorantsListe: Array<CommunauteSavoirEncadrementDoctorantVo> = [];

        myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];


constructor(private datePipe: DatePipe, private encadrementDoctorantService: EncadrementDoctorantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueEncadrementDoctorantService :DisciplineScientifiqueEncadrementDoctorantService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private responsabiliteEncadrementDoctorantService :ResponsabiliteEncadrementDoctorantService
    ,private etablissementService :EtablissementService
    ,private paysService :PaysService
    ,private financementDoctorantService :FinancementDoctorantService
    ,private enjeuxIrdEncadrementDoctorantService :EnjeuxIrdEncadrementDoctorantService
    ,private communauteSavoirEncadrementDoctorantService :CommunauteSavoirEncadrementDoctorantService
    ,private encadrementService :EncadrementService
    ,private doctorantService :DoctorantService
    ,private communauteSavoirService :CommunauteSavoirService
) {
}

// methods
ngOnInit(): void {
                this.selectedEnjeuxIrdEncadrementDoctorants.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedDisciplineScientifiqueEncadrementDoctorants.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedCommunauteSavoirEncadrementDoctorants.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedResponsabiliteEncadrementDoctorant = new ResponsabiliteEncadrementDoctorantVo();
    this.responsabiliteEncadrementDoctorantService.findAll().subscribe((data) => this.responsabiliteEncadrementDoctorants = data);
    this.selectedFinancementDoctorant = new FinancementDoctorantVo();
    this.financementDoctorantService.findAll().subscribe((data) => this.financementDoctorants = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedDoctorant = new DoctorantVo();
    this.doctorantService.findAll().subscribe((data) => this.doctorants = data);
    this.selectedEncadrement = new EncadrementVo();
    this.encadrementService.findAll().subscribe((data) => this.encadrements = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewEncadrementDoctorantDialog  = false;
}

// getters and setters

get encadrementDoctorants(): Array<EncadrementDoctorantVo> {
    return this.encadrementDoctorantService.encadrementDoctorants;
       }
set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorants = value;
       }

 get selectedEncadrementDoctorant():EncadrementDoctorantVo {
           return this.encadrementDoctorantService.selectedEncadrementDoctorant;
       }
    set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.selectedEncadrementDoctorant = value;
       }

   get viewEncadrementDoctorantDialog():boolean {
           return this.encadrementDoctorantService.viewEncadrementDoctorantDialog;

       }
    set viewEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.viewEncadrementDoctorantDialog= value;
       }

       get selectedFinancementDoctorant():FinancementDoctorantVo {
           return this.financementDoctorantService.selectedFinancementDoctorant;
       }
      set selectedFinancementDoctorant(value: FinancementDoctorantVo) {
        this.financementDoctorantService.selectedFinancementDoctorant = value;
       }
       get financementDoctorants():Array<FinancementDoctorantVo> {
           return this.financementDoctorantService.financementDoctorants;
       }
       set financementDoctorants(value: Array<FinancementDoctorantVo>) {
        this.financementDoctorantService.financementDoctorants = value;
       }
       get editFinancementDoctorantDialog():boolean {
           return this.financementDoctorantService.editFinancementDoctorantDialog;
       }
      set editFinancementDoctorantDialog(value: boolean) {
        this.financementDoctorantService.editFinancementDoctorantDialog= value;
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
       get selectedResponsabiliteEncadrementDoctorant():ResponsabiliteEncadrementDoctorantVo {
           return this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant;
       }
      set selectedResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant = value;
       }
       get responsabiliteEncadrementDoctorants():Array<ResponsabiliteEncadrementDoctorantVo> {
           return this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants;
       }
       set responsabiliteEncadrementDoctorants(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants = value;
       }
       get editResponsabiliteEncadrementDoctorantDialog():boolean {
           return this.responsabiliteEncadrementDoctorantService.editResponsabiliteEncadrementDoctorantDialog;
       }
      set editResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.editResponsabiliteEncadrementDoctorantDialog= value;
       }
       get selectedCommunauteSavoir():CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs():Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get editCommunauteSavoirDialog():boolean {
           return this.communauteSavoirService.editCommunauteSavoirDialog;
       }
      set editCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.editCommunauteSavoirDialog= value;
       }
       get selectedEncadrement():EncadrementVo {
           return this.encadrementService.selectedEncadrement;
       }
      set selectedEncadrement(value: EncadrementVo) {
        this.encadrementService.selectedEncadrement = value;
       }
       get encadrements():Array<EncadrementVo> {
           return this.encadrementService.encadrements;
       }
       set encadrements(value: Array<EncadrementVo>) {
        this.encadrementService.encadrements = value;
       }
       get editEncadrementDialog():boolean {
           return this.encadrementService.editEncadrementDialog;
       }
      set editEncadrementDialog(value: boolean) {
        this.encadrementService.editEncadrementDialog= value;
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
       get selectedDoctorant():DoctorantVo {
           return this.doctorantService.selectedDoctorant;
       }
      set selectedDoctorant(value: DoctorantVo) {
        this.doctorantService.selectedDoctorant = value;
       }
       get doctorants():Array<DoctorantVo> {
           return this.doctorantService.doctorants;
       }
       set doctorants(value: Array<DoctorantVo>) {
        this.doctorantService.doctorants = value;
       }
       get editDoctorantDialog():boolean {
           return this.doctorantService.editDoctorantDialog;
       }
      set editDoctorantDialog(value: boolean) {
        this.doctorantService.editDoctorantDialog= value;
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
       get selectedDisciplineScientifique():DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques():Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get editDisciplineScientifiqueDialog():boolean {
           return this.disciplineScientifiqueService.editDisciplineScientifiqueDialog;
       }
      set editDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.editDisciplineScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
