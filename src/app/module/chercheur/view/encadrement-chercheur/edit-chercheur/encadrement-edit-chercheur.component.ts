import {Component, OnInit} from '@angular/core';
import {EncadrementService} from '../../../../../controller/service/Encadrement.service';
import {EncadrementVo} from '../../../../../controller/model/Encadrement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
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
  selector: 'app-encadrement-edit-chercheur',
  templateUrl: './encadrement-edit-chercheur.component.html',
  styleUrls: ['./encadrement-edit-chercheur.component.css']
})
export class EncadrementEditChercheurComponent implements OnInit {

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
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private encadrementEtudiantService: EncadrementEtudiantService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private etablissementService: EtablissementService
 ,       private encadrementDoctorantService: EncadrementDoctorantService
 ,       private doctorantService: DoctorantService
 ,       private chercheurService: ChercheurService
 ,       private niveauFormationPostBacService: NiveauFormationPostBacService
 ,       private responsabiliteEncadrementDoctorantService: ResponsabiliteEncadrementDoctorantService
 ,       private financementDoctorantService: FinancementDoctorantService
 ,       private etudiantService: EtudiantService
 ,       private campagneService: CampagneService
 ,       private responsabiliteDirectionEncadrementEtudiantService: ResponsabiliteDirectionEncadrementEtudiantService
 ,       private paysService: PaysService
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
        addEncadrementEtudiants() {
        if( this.selectedEncadrement.encadrementEtudiantsVo == null ){
            this.selectedEncadrement.encadrementEtudiantsVo = new Array<EncadrementEtudiantVo>();
        }
        this.selectedEncadrement.encadrementEtudiantsVo.push(this.selectedEncadrementEtudiants);
        this.selectedEncadrementEtudiants = new EncadrementEtudiantVo();
        }

       deleteEncadrementEtudiants(p: EncadrementEtudiantVo) {
        this.selectedEncadrement.encadrementEtudiantsVo.forEach((element, index) => {
            if (element === p) { this.selectedEncadrement.encadrementEtudiantsVo.splice(index, 1); }
        });
    }
        addEncadrementDoctorants() {
        if( this.selectedEncadrement.encadrementDoctorantsVo == null ){
            this.selectedEncadrement.encadrementDoctorantsVo = new Array<EncadrementDoctorantVo>();
        }
        this.selectedEncadrement.encadrementDoctorantsVo.push(this.selectedEncadrementDoctorants);
        this.selectedEncadrementDoctorants = new EncadrementDoctorantVo();
        }

       deleteEncadrementDoctorants(p: EncadrementDoctorantVo) {
        this.selectedEncadrement.encadrementDoctorantsVo.forEach((element, index) => {
            if (element === p) { this.selectedEncadrement.encadrementDoctorantsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.encadrementService.edit().subscribe(encadrement=>{
    const myIndex = this.encadrements.findIndex(e => e.id === this.selectedEncadrement.id);
    this.encadrements[myIndex] = this.selectedEncadrement;
    this.editEncadrementDialog = false;
    this.selectedEncadrement = new EncadrementVo();


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
              public async openCreatefinancementDoctorant(financementDoctorant: string) {
                      const isPermistted = await this.roleService.isPermitted('FinancementDoctorant', 'add');
                       if(isPermistted){
         this.selectedFinancementDoctorant = new FinancementDoctorantVo();
        this.createFinancementDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateniveauFormationPostBac(niveauFormationPostBac: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauFormationPostBac', 'add');
                       if(isPermistted){
         this.selectedNiveauFormationPostBac = new NiveauFormationPostBacVo();
        this.createNiveauFormationPostBacDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateresponsabiliteDirectionEncadrementEtudiant(responsabiliteDirectionEncadrementEtudiant: string) {
                      const isPermistted = await this.roleService.isPermitted('ResponsabiliteDirectionEncadrementEtudiant', 'add');
                       if(isPermistted){
         this.selectedResponsabiliteDirectionEncadrementEtudiant = new ResponsabiliteDirectionEncadrementEtudiantVo();
        this.createResponsabiliteDirectionEncadrementEtudiantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateresponsabiliteEncadrementDoctorant(responsabiliteEncadrementDoctorant: string) {
                      const isPermistted = await this.roleService.isPermitted('ResponsabiliteEncadrementDoctorant', 'add');
                       if(isPermistted){
         this.selectedResponsabiliteEncadrementDoctorant = new ResponsabiliteEncadrementDoctorantVo();
        this.createResponsabiliteEncadrementDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetudiant(etudiant: string) {
                      const isPermistted = await this.roleService.isPermitted('Etudiant', 'add');
                       if(isPermistted){
         this.selectedEtudiant = new EtudiantVo();
        this.createEtudiantDialog = true;
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
              public async openCreatedoctorant(doctorant: string) {
                      const isPermistted = await this.roleService.isPermitted('Doctorant', 'add');
                       if(isPermistted){
         this.selectedDoctorant = new DoctorantVo();
        this.createDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEncadrementDialog  = false;
}

// getters and setters

get encadrements(): Array<EncadrementVo> {
    return this.encadrementService.encadrements;
       }
set encadrements(value: Array<EncadrementVo>) {
        this.encadrementService.encadrements = value;
       }

 get selectedEncadrement(): EncadrementVo {
           return this.encadrementService.selectedEncadrement;
       }
    set selectedEncadrement(value: EncadrementVo) {
        this.encadrementService.selectedEncadrement = value;
       }

   get editEncadrementDialog(): boolean {
           return this.encadrementService.editEncadrementDialog;

       }
    set editEncadrementDialog(value: boolean) {
        this.encadrementService.editEncadrementDialog = value;
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
       get selectedFinancementDoctorant(): FinancementDoctorantVo {
           return this.financementDoctorantService.selectedFinancementDoctorant;
       }
      set selectedFinancementDoctorant(value: FinancementDoctorantVo) {
        this.financementDoctorantService.selectedFinancementDoctorant = value;
       }
       get financementDoctorants(): Array<FinancementDoctorantVo> {
           return this.financementDoctorantService.financementDoctorants;
       }
       set financementDoctorants(value: Array<FinancementDoctorantVo>) {
        this.financementDoctorantService.financementDoctorants = value;
       }
       get createFinancementDoctorantDialog(): boolean {
           return this.financementDoctorantService.createFinancementDoctorantDialog;
       }
      set createFinancementDoctorantDialog(value: boolean) {
        this.financementDoctorantService.createFinancementDoctorantDialog= value;
       }
       get selectedNiveauFormationPostBac(): NiveauFormationPostBacVo {
           return this.niveauFormationPostBacService.selectedNiveauFormationPostBac;
       }
      set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.selectedNiveauFormationPostBac = value;
       }
       get niveauFormationPostBacs(): Array<NiveauFormationPostBacVo> {
           return this.niveauFormationPostBacService.niveauFormationPostBacs;
       }
       set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacs = value;
       }
       get createNiveauFormationPostBacDialog(): boolean {
           return this.niveauFormationPostBacService.createNiveauFormationPostBacDialog;
       }
      set createNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.createNiveauFormationPostBacDialog= value;
       }
       get selectedResponsabiliteDirectionEncadrementEtudiant(): ResponsabiliteDirectionEncadrementEtudiantVo {
           return this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant;
       }
      set selectedResponsabiliteDirectionEncadrementEtudiant(value: ResponsabiliteDirectionEncadrementEtudiantVo) {
        this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant = value;
       }
       get responsabiliteDirectionEncadrementEtudiants(): Array<ResponsabiliteDirectionEncadrementEtudiantVo> {
           return this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants;
       }
       set responsabiliteDirectionEncadrementEtudiants(value: Array<ResponsabiliteDirectionEncadrementEtudiantVo>) {
        this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants = value;
       }
       get createResponsabiliteDirectionEncadrementEtudiantDialog(): boolean {
           return this.responsabiliteDirectionEncadrementEtudiantService.createResponsabiliteDirectionEncadrementEtudiantDialog;
       }
      set createResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteDirectionEncadrementEtudiantService.createResponsabiliteDirectionEncadrementEtudiantDialog= value;
       }
       get selectedResponsabiliteEncadrementDoctorant(): ResponsabiliteEncadrementDoctorantVo {
           return this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant;
       }
      set selectedResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant = value;
       }
       get responsabiliteEncadrementDoctorants(): Array<ResponsabiliteEncadrementDoctorantVo> {
           return this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants;
       }
       set responsabiliteEncadrementDoctorants(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants = value;
       }
       get createResponsabiliteEncadrementDoctorantDialog(): boolean {
           return this.responsabiliteEncadrementDoctorantService.createResponsabiliteEncadrementDoctorantDialog;
       }
      set createResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.createResponsabiliteEncadrementDoctorantDialog= value;
       }
       get selectedEtudiant(): EtudiantVo {
           return this.etudiantService.selectedEtudiant;
       }
      set selectedEtudiant(value: EtudiantVo) {
        this.etudiantService.selectedEtudiant = value;
       }
       get etudiants(): Array<EtudiantVo> {
           return this.etudiantService.etudiants;
       }
       set etudiants(value: Array<EtudiantVo>) {
        this.etudiantService.etudiants = value;
       }
       get createEtudiantDialog(): boolean {
           return this.etudiantService.createEtudiantDialog;
       }
      set createEtudiantDialog(value: boolean) {
        this.etudiantService.createEtudiantDialog= value;
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
       get selectedDoctorant(): DoctorantVo {
           return this.doctorantService.selectedDoctorant;
       }
      set selectedDoctorant(value: DoctorantVo) {
        this.doctorantService.selectedDoctorant = value;
       }
       get doctorants(): Array<DoctorantVo> {
           return this.doctorantService.doctorants;
       }
       set doctorants(value: Array<DoctorantVo>) {
        this.doctorantService.doctorants = value;
       }
       get createDoctorantDialog(): boolean {
           return this.doctorantService.createDoctorantDialog;
       }
      set createDoctorantDialog(value: boolean) {
        this.doctorantService.createDoctorantDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
