import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
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
  selector: 'app-encadrement-etudiant-edit-chercheur',
  templateUrl: './encadrement-etudiant-edit-chercheur.component.html',
  styleUrls: ['./encadrement-etudiant-edit-chercheur.component.css']
})
export class EncadrementEtudiantEditChercheurComponent implements OnInit {

        selectedEncadrementEtudiantEnjeuxIrds: EncadrementEtudiantEnjeuxIrdVo = new EncadrementEtudiantEnjeuxIrdVo();
        encadrementEtudiantEnjeuxIrdsListe: Array<EncadrementEtudiantEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedEncadrementEtudiantDisciplineScientifiques: EncadrementEtudiantDisciplineScientifiqueVo = new EncadrementEtudiantDisciplineScientifiqueVo();
        encadrementEtudiantDisciplineScientifiquesListe: Array<EncadrementEtudiantDisciplineScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];


constructor(private datePipe: DatePipe, private encadrementEtudiantService: EncadrementEtudiantService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private etudiantService: EtudiantService
 ,       private responsabiliteDirectionEncadrementEtudiantService: ResponsabiliteDirectionEncadrementEtudiantService
 ,       private encadrementService: EncadrementService
 ,       private encadrementEtudiantEnjeuxIrdService: EncadrementEtudiantEnjeuxIrdService
 ,       private niveauFormationPostBacService: NiveauFormationPostBacService
 ,       private etablissementService: EtablissementService
 ,       private encadrementEtudiantDisciplineScientifiqueService: EncadrementEtudiantDisciplineScientifiqueService
 ,       private paysService: PaysService
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
        addEncadrementEtudiantEnjeuxIrds() {
        if( this.selectedEncadrementEtudiant.encadrementEtudiantEnjeuxIrdsVo == null ){
            this.selectedEncadrementEtudiant.encadrementEtudiantEnjeuxIrdsVo = new Array<EncadrementEtudiantEnjeuxIrdVo>();
        }
        this.selectedEncadrementEtudiant.encadrementEtudiantEnjeuxIrdsVo.push(this.selectedEncadrementEtudiantEnjeuxIrds);
        this.selectedEncadrementEtudiantEnjeuxIrds = new EncadrementEtudiantEnjeuxIrdVo();
        }

       deleteEncadrementEtudiantEnjeuxIrds(p: EncadrementEtudiantEnjeuxIrdVo) {
        this.selectedEncadrementEtudiant.encadrementEtudiantEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedEncadrementEtudiant.encadrementEtudiantEnjeuxIrdsVo.splice(index, 1); }
        });
    }
        addEncadrementEtudiantDisciplineScientifiques() {
        if( this.selectedEncadrementEtudiant.encadrementEtudiantDisciplineScientifiquesVo == null ){
            this.selectedEncadrementEtudiant.encadrementEtudiantDisciplineScientifiquesVo = new Array<EncadrementEtudiantDisciplineScientifiqueVo>();
        }
        this.selectedEncadrementEtudiant.encadrementEtudiantDisciplineScientifiquesVo.push(this.selectedEncadrementEtudiantDisciplineScientifiques);
        this.selectedEncadrementEtudiantDisciplineScientifiques = new EncadrementEtudiantDisciplineScientifiqueVo();
        }

       deleteEncadrementEtudiantDisciplineScientifiques(p: EncadrementEtudiantDisciplineScientifiqueVo) {
        this.selectedEncadrementEtudiant.encadrementEtudiantDisciplineScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedEncadrementEtudiant.encadrementEtudiantDisciplineScientifiquesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.encadrementEtudiantService.edit().subscribe(encadrementEtudiant=>{
    const myIndex = this.encadrementEtudiants.findIndex(e => e.id === this.selectedEncadrementEtudiant.id);
    this.encadrementEtudiants[myIndex] = this.selectedEncadrementEtudiant;
    this.editEncadrementEtudiantDialog = false;
    this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();


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
              public async openCreateencadrement(encadrement: string) {
                      const isPermistted = await this.roleService.isPermitted('Encadrement', 'add');
                       if(isPermistted){
         this.selectedEncadrement = new EncadrementVo();
        this.createEncadrementDialog = true;
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
              public async openCreatedisciplineScientifique(disciplineScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
        this.createDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEncadrementEtudiantDialog  = false;
}

// getters and setters

get encadrementEtudiants(): Array<EncadrementEtudiantVo> {
    return this.encadrementEtudiantService.encadrementEtudiants;
       }
set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiants = value;
       }

 get selectedEncadrementEtudiant(): EncadrementEtudiantVo {
           return this.encadrementEtudiantService.selectedEncadrementEtudiant;
       }
    set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.selectedEncadrementEtudiant = value;
       }

   get editEncadrementEtudiantDialog(): boolean {
           return this.encadrementEtudiantService.editEncadrementEtudiantDialog;

       }
    set editEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.editEncadrementEtudiantDialog = value;
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
       get selectedEncadrement(): EncadrementVo {
           return this.encadrementService.selectedEncadrement;
       }
      set selectedEncadrement(value: EncadrementVo) {
        this.encadrementService.selectedEncadrement = value;
       }
       get encadrements(): Array<EncadrementVo> {
           return this.encadrementService.encadrements;
       }
       set encadrements(value: Array<EncadrementVo>) {
        this.encadrementService.encadrements = value;
       }
       get createEncadrementDialog(): boolean {
           return this.encadrementService.createEncadrementDialog;
       }
      set createEncadrementDialog(value: boolean) {
        this.encadrementService.createEncadrementDialog= value;
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
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get createDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
      set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
