import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EtudiantVo} from '../../../../../controller/model/Etudiant.model';
import {EtudiantService} from '../../../../../controller/service/Etudiant.service';
import {ResponsabiliteDirectionEncadrementEtudiantVo} from '../../../../../controller/model/ResponsabiliteDirectionEncadrementEtudiant.model';
import {ResponsabiliteDirectionEncadrementEtudiantService} from '../../../../../controller/service/ResponsabiliteDirectionEncadrementEtudiant.service';
import {EncadrementVo} from '../../../../../controller/model/Encadrement.model';
import {EncadrementService} from '../../../../../controller/service/Encadrement.service';
import {EncadrementEtudiantEnjeuxIrdVo} from '../../../../../controller/model/EncadrementEtudiantEnjeuxIrd.model';
import {EncadrementEtudiantEnjeuxIrdService} from '../../../../../controller/service/EncadrementEtudiantEnjeuxIrd.service';
import {NiveauFormationPostBacVo} from '../../../../../controller/model/NiveauFormationPostBac.model';
import {NiveauFormationPostBacService} from '../../../../../controller/service/NiveauFormationPostBac.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {EncadrementEtudiantDisciplineScientifiqueVo} from '../../../../../controller/model/EncadrementEtudiantDisciplineScientifique.model';
import {EncadrementEtudiantDisciplineScientifiqueService} from '../../../../../controller/service/EncadrementEtudiantDisciplineScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-encadrement-etudiant-view-admin',
  templateUrl: './encadrement-etudiant-view-admin.component.html',
  styleUrls: ['./encadrement-etudiant-view-admin.component.css']
})
export class EncadrementEtudiantViewAdminComponent implements OnInit {

        selectedEncadrementEtudiantEnjeuxIrds: EncadrementEtudiantEnjeuxIrdVo = new EncadrementEtudiantEnjeuxIrdVo();
        encadrementEtudiantEnjeuxIrdsListe: Array<EncadrementEtudiantEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedEncadrementEtudiantDisciplineScientifiques: EncadrementEtudiantDisciplineScientifiqueVo = new EncadrementEtudiantDisciplineScientifiqueVo();
        encadrementEtudiantDisciplineScientifiquesListe: Array<EncadrementEtudiantDisciplineScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];


constructor(private datePipe: DatePipe, private encadrementEtudiantService: EncadrementEtudiantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private etudiantService :EtudiantService
    ,private responsabiliteDirectionEncadrementEtudiantService :ResponsabiliteDirectionEncadrementEtudiantService
    ,private encadrementService :EncadrementService
    ,private encadrementEtudiantEnjeuxIrdService :EncadrementEtudiantEnjeuxIrdService
    ,private niveauFormationPostBacService :NiveauFormationPostBacService
    ,private etablissementService :EtablissementService
    ,private encadrementEtudiantDisciplineScientifiqueService :EncadrementEtudiantDisciplineScientifiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedEncadrementEtudiantEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedEncadrementEtudiantDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedNiveauFormationPostBac = new NiveauFormationPostBacVo();
    this.niveauFormationPostBacService.findAll().subscribe((data) => this.niveauFormationPostBacs = data);
    this.selectedResponsabiliteDirectionEncadrementEtudiant = new ResponsabiliteDirectionEncadrementEtudiantVo();
    this.responsabiliteDirectionEncadrementEtudiantService.findAll().subscribe((data) => this.responsabiliteDirectionEncadrementEtudiants = data);
    this.selectedEtudiant = new EtudiantVo();
    this.etudiantService.findAll().subscribe((data) => this.etudiants = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedEncadrement = new EncadrementVo();
    this.encadrementService.findAll().subscribe((data) => this.encadrements = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewEncadrementEtudiantDialog  = false;
}

// getters and setters

get encadrementEtudiants(): Array<EncadrementEtudiantVo> {
    return this.encadrementEtudiantService.encadrementEtudiants;
       }
set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiants = value;
       }

 get selectedEncadrementEtudiant():EncadrementEtudiantVo {
           return this.encadrementEtudiantService.selectedEncadrementEtudiant;
       }
    set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.selectedEncadrementEtudiant = value;
       }

   get viewEncadrementEtudiantDialog():boolean {
           return this.encadrementEtudiantService.viewEncadrementEtudiantDialog;

       }
    set viewEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.viewEncadrementEtudiantDialog= value;
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
       get selectedNiveauFormationPostBac():NiveauFormationPostBacVo {
           return this.niveauFormationPostBacService.selectedNiveauFormationPostBac;
       }
      set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.selectedNiveauFormationPostBac = value;
       }
       get niveauFormationPostBacs():Array<NiveauFormationPostBacVo> {
           return this.niveauFormationPostBacService.niveauFormationPostBacs;
       }
       set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacs = value;
       }
       get editNiveauFormationPostBacDialog():boolean {
           return this.niveauFormationPostBacService.editNiveauFormationPostBacDialog;
       }
      set editNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.editNiveauFormationPostBacDialog= value;
       }
       get selectedResponsabiliteDirectionEncadrementEtudiant():ResponsabiliteDirectionEncadrementEtudiantVo {
           return this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant;
       }
      set selectedResponsabiliteDirectionEncadrementEtudiant(value: ResponsabiliteDirectionEncadrementEtudiantVo) {
        this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant = value;
       }
       get responsabiliteDirectionEncadrementEtudiants():Array<ResponsabiliteDirectionEncadrementEtudiantVo> {
           return this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants;
       }
       set responsabiliteDirectionEncadrementEtudiants(value: Array<ResponsabiliteDirectionEncadrementEtudiantVo>) {
        this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants = value;
       }
       get editResponsabiliteDirectionEncadrementEtudiantDialog():boolean {
           return this.responsabiliteDirectionEncadrementEtudiantService.editResponsabiliteDirectionEncadrementEtudiantDialog;
       }
      set editResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteDirectionEncadrementEtudiantService.editResponsabiliteDirectionEncadrementEtudiantDialog= value;
       }
       get selectedEtudiant():EtudiantVo {
           return this.etudiantService.selectedEtudiant;
       }
      set selectedEtudiant(value: EtudiantVo) {
        this.etudiantService.selectedEtudiant = value;
       }
       get etudiants():Array<EtudiantVo> {
           return this.etudiantService.etudiants;
       }
       set etudiants(value: Array<EtudiantVo>) {
        this.etudiantService.etudiants = value;
       }
       get editEtudiantDialog():boolean {
           return this.etudiantService.editEtudiantDialog;
       }
      set editEtudiantDialog(value: boolean) {
        this.etudiantService.editEtudiantDialog= value;
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
