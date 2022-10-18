import {Component, OnInit} from '@angular/core';
import {EncadrementService} from '../../../../../controller/service/Encadrement.service';
import {EncadrementVo} from '../../../../../controller/model/Encadrement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';
import {DoctorantVo} from '../../../../../controller/model/Doctorant.model';
import {DoctorantService} from '../../../../../controller/service/Doctorant.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {NiveauFormationPostBacVo} from '../../../../../controller/model/NiveauFormationPostBac.model';
import {NiveauFormationPostBacService} from '../../../../../controller/service/NiveauFormationPostBac.service';
import {ResponsabiliteEncadrementDoctorantVo} from '../../../../../controller/model/ResponsabiliteEncadrementDoctorant.model';
import {ResponsabiliteEncadrementDoctorantService} from '../../../../../controller/service/ResponsabiliteEncadrementDoctorant.service';
import {FinancementDoctorantVo} from '../../../../../controller/model/FinancementDoctorant.model';
import {FinancementDoctorantService} from '../../../../../controller/service/FinancementDoctorant.service';
import {EtudiantVo} from '../../../../../controller/model/Etudiant.model';
import {EtudiantService} from '../../../../../controller/service/Etudiant.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ResponsabiliteDirectionEncadrementEtudiantVo} from '../../../../../controller/model/ResponsabiliteDirectionEncadrementEtudiant.model';
import {ResponsabiliteDirectionEncadrementEtudiantService} from '../../../../../controller/service/ResponsabiliteDirectionEncadrementEtudiant.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-encadrement-view-admin',
  templateUrl: './encadrement-view-admin.component.html',
  styleUrls: ['./encadrement-view-admin.component.css']
})
export class EncadrementViewAdminComponent implements OnInit {

        selectedEncadrementEtudiants: EncadrementEtudiantVo = new EncadrementEtudiantVo();
        encadrementEtudiantsListe: Array<EncadrementEtudiantVo> = [];

        myNiveauFormationPostBacs: Array<NiveauFormationPostBacVo> = [];
        myResponsabiliteDirectionEncadrementEtudiants: Array<ResponsabiliteDirectionEncadrementEtudiantVo> = [];
        myEtudiants: Array<EtudiantVo> = [];
        myEtablissements: Array<EtablissementVo> = [];
        myPayss: Array<PaysVo> = [];
        myEtatEtapeCampagnes: Array<EtatEtapeCampagneVo> = [];

        selectedEncadrementDoctorants: EncadrementDoctorantVo = new EncadrementDoctorantVo();
        encadrementDoctorantsListe: Array<EncadrementDoctorantVo> = [];

        myResponsabiliteEncadrementDoctorants: Array<ResponsabiliteEncadrementDoctorantVo> = [];
        myFinancementDoctorants: Array<FinancementDoctorantVo> = [];
        myDoctorants: Array<DoctorantVo> = [];


constructor(private datePipe: DatePipe, private encadrementService: EncadrementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private encadrementEtudiantService :EncadrementEtudiantService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private etablissementService :EtablissementService
    ,private encadrementDoctorantService :EncadrementDoctorantService
    ,private doctorantService :DoctorantService
    ,private chercheurService :ChercheurService
    ,private niveauFormationPostBacService :NiveauFormationPostBacService
    ,private responsabiliteEncadrementDoctorantService :ResponsabiliteEncadrementDoctorantService
    ,private financementDoctorantService :FinancementDoctorantService
    ,private etudiantService :EtudiantService
    ,private campagneService :CampagneService
    ,private responsabiliteDirectionEncadrementEtudiantService :ResponsabiliteDirectionEncadrementEtudiantService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedEncadrementEtudiants.niveauFormationPostBacVo = new NiveauFormationPostBacVo();
                this.niveauFormationPostBacService.findAll().subscribe((data) => this.niveauFormationPostBacs = data);
                this.selectedEncadrementEtudiants.responsabiliteDirectionEncadrementEtudiantVo = new ResponsabiliteDirectionEncadrementEtudiantVo();
                this.responsabiliteDirectionEncadrementEtudiantService.findAll().subscribe((data) => this.responsabiliteDirectionEncadrementEtudiants = data);
                this.selectedEncadrementEtudiants.etudiantVo = new EtudiantVo();
                this.etudiantService.findAll().subscribe((data) => this.etudiants = data);
                this.selectedEncadrementEtudiants.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedEncadrementEtudiants.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedEncadrementEtudiants.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedEncadrementDoctorants.responsabiliteEncadrementDoctorantVo = new ResponsabiliteEncadrementDoctorantVo();
                this.responsabiliteEncadrementDoctorantService.findAll().subscribe((data) => this.responsabiliteEncadrementDoctorants = data);
                this.selectedEncadrementDoctorants.financementDoctorantVo = new FinancementDoctorantVo();
                this.financementDoctorantService.findAll().subscribe((data) => this.financementDoctorants = data);
                this.selectedEncadrementDoctorants.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedEncadrementDoctorants.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedEncadrementDoctorants.doctorantVo = new DoctorantVo();
                this.doctorantService.findAll().subscribe((data) => this.doctorants = data);
                this.selectedEncadrementDoctorants.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewEncadrementDialog  = false;
}

// getters and setters

get encadrements(): Array<EncadrementVo> {
    return this.encadrementService.encadrements;
       }
set encadrements(value: Array<EncadrementVo>) {
        this.encadrementService.encadrements = value;
       }

 get selectedEncadrement():EncadrementVo {
           return this.encadrementService.selectedEncadrement;
       }
    set selectedEncadrement(value: EncadrementVo) {
        this.encadrementService.selectedEncadrement = value;
       }

   get viewEncadrementDialog():boolean {
           return this.encadrementService.viewEncadrementDialog;

       }
    set viewEncadrementDialog(value: boolean) {
        this.encadrementService.viewEncadrementDialog= value;
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
       get selectedCampagne():CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes():Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get editCampagneDialog():boolean {
           return this.campagneService.editCampagneDialog;
       }
      set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog= value;
       }
       get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs():Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
