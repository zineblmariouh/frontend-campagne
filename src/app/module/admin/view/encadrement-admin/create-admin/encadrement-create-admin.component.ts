import {Component, OnInit, Input} from '@angular/core';
import {EncadrementService} from '../../../../../controller/service/Encadrement.service';
import {EncadrementVo} from '../../../../../controller/model/Encadrement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EncadrementEtudiantDisciplineScientifiqueVo} from '../../../../../controller/model/EncadrementEtudiantDisciplineScientifique.model';
import {EncadrementEtudiantDisciplineScientifiqueService} from '../../../../../controller/service/EncadrementEtudiantDisciplineScientifique.service';
import {ResponsabiliteDirectionEncadrementEtudiantVo} from '../../../../../controller/model/ResponsabiliteDirectionEncadrementEtudiant.model';
import {ResponsabiliteDirectionEncadrementEtudiantService} from '../../../../../controller/service/ResponsabiliteDirectionEncadrementEtudiant.service';
import {FinancementDoctorantVo} from '../../../../../controller/model/FinancementDoctorant.model';
import {FinancementDoctorantService} from '../../../../../controller/service/FinancementDoctorant.service';
import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
import {DisciplineScientifiqueEncadrementDoctorantVo} from '../../../../../controller/model/DisciplineScientifiqueEncadrementDoctorant.model';
import {DisciplineScientifiqueEncadrementDoctorantService} from '../../../../../controller/service/DisciplineScientifiqueEncadrementDoctorant.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {NiveauFormationPostBacVo} from '../../../../../controller/model/NiveauFormationPostBac.model';
import {NiveauFormationPostBacService} from '../../../../../controller/service/NiveauFormationPostBac.service';
import {EtudiantVo} from '../../../../../controller/model/Etudiant.model';
import {EtudiantService} from '../../../../../controller/service/Etudiant.service';
import {EnjeuxIrdEncadrementDoctorantVo} from '../../../../../controller/model/EnjeuxIrdEncadrementDoctorant.model';
import {EnjeuxIrdEncadrementDoctorantService} from '../../../../../controller/service/EnjeuxIrdEncadrementDoctorant.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {DoctorantVo} from '../../../../../controller/model/Doctorant.model';
import {DoctorantService} from '../../../../../controller/service/Doctorant.service';
import {CommunauteSavoirEncadrementDoctorantVo} from '../../../../../controller/model/CommunauteSavoirEncadrementDoctorant.model';
import {CommunauteSavoirEncadrementDoctorantService} from '../../../../../controller/service/CommunauteSavoirEncadrementDoctorant.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {EncadrementEtudiantEnjeuxIrdVo} from '../../../../../controller/model/EncadrementEtudiantEnjeuxIrd.model';
import {EncadrementEtudiantEnjeuxIrdService} from '../../../../../controller/service/EncadrementEtudiantEnjeuxIrd.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {ResponsabiliteEncadrementDoctorantVo} from '../../../../../controller/model/ResponsabiliteEncadrementDoctorant.model';
import {ResponsabiliteEncadrementDoctorantService} from '../../../../../controller/service/ResponsabiliteEncadrementDoctorant.service';
@Component({
  selector: 'app-encadrement-create-admin',
  templateUrl: './encadrement-create-admin.component.html',
  styleUrls: ['./encadrement-create-admin.component.css']
})
export class EncadrementCreateAdminComponent implements OnInit {

        selectedEncadrementEtudiants: EncadrementEtudiantVo = new EncadrementEtudiantVo();
        selectedEncadrementDoctorants: EncadrementDoctorantVo = new EncadrementDoctorantVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCampagneLibelle = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;

       private _encadrementEtudiantEnjeuxIrdsVo: Array<EncadrementEtudiantEnjeuxIrdVo> = [];
       private _encadrementEtudiantDisciplineScientifiquesVo: Array<EncadrementEtudiantDisciplineScientifiqueVo> = [];
       private _enjeuxIrdEncadrementDoctorantsVo: Array<EnjeuxIrdEncadrementDoctorantVo> = [];
       private _disciplineScientifiqueEncadrementDoctorantsVo: Array<DisciplineScientifiqueEncadrementDoctorantVo> = [];
       private _communauteSavoirEncadrementDoctorantsVo: Array<CommunauteSavoirEncadrementDoctorantVo> = [];


constructor(private datePipe: DatePipe, private encadrementService: EncadrementService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private chercheurService :ChercheurService
,       private doctorantService :DoctorantService
,       private responsabiliteDirectionEncadrementEtudiantService :ResponsabiliteDirectionEncadrementEtudiantService
,       private financementDoctorantService :FinancementDoctorantService
,       private encadrementEtudiantService :EncadrementEtudiantService
,       private enjeuxIrdService :EnjeuxIrdService
,       private etablissementService :EtablissementService
,       private campagneService :CampagneService
,       private communauteSavoirService :CommunauteSavoirService
,       private encadrementDoctorantService :EncadrementDoctorantService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private responsabiliteEncadrementDoctorantService :ResponsabiliteEncadrementDoctorantService
,       private paysService :PaysService
,       private niveauFormationPostBacService :NiveauFormationPostBacService
,       private etudiantService :EtudiantService
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

                this.enjeuxIrdService.findAll().subscribe(data => this.prepareEncadrementEtudiantEnjeuxIrds(data));
                this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareEncadrementEtudiantDisciplineScientifiques(data));


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

                this.enjeuxIrdService.findAll().subscribe(data => this.prepareEnjeuxIrdEncadrementDoctorants(data));
                this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareDisciplineScientifiqueEncadrementDoctorants(data));
                this.communauteSavoirService.findAll().subscribe(data => this.prepareCommunauteSavoirEncadrementDoctorants(data));

    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

   prepareEncadrementEtudiantEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const encadrementEtudiantEnjeuxIrd = new EncadrementEtudiantEnjeuxIrdVo();
        encadrementEtudiantEnjeuxIrd.enjeuxIrdVo = e;
        this.encadrementEtudiantEnjeuxIrdsVo.push(encadrementEtudiantEnjeuxIrd);
        });
        }
   }
   prepareEncadrementEtudiantDisciplineScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const encadrementEtudiantDisciplineScientifique = new EncadrementEtudiantDisciplineScientifiqueVo();
        encadrementEtudiantDisciplineScientifique.disciplineScientifiqueVo = e;
        this.encadrementEtudiantDisciplineScientifiquesVo.push(encadrementEtudiantDisciplineScientifique);
        });
        }
   }
   prepareEnjeuxIrdEncadrementDoctorants(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const enjeuxIrdEncadrementDoctorant = new EnjeuxIrdEncadrementDoctorantVo();
        enjeuxIrdEncadrementDoctorant.enjeuxIrdVo = e;
        this.enjeuxIrdEncadrementDoctorantsVo.push(enjeuxIrdEncadrementDoctorant);
        });
        }
   }
   prepareDisciplineScientifiqueEncadrementDoctorants(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const disciplineScientifiqueEncadrementDoctorant = new DisciplineScientifiqueEncadrementDoctorantVo();
        disciplineScientifiqueEncadrementDoctorant.disciplineScientifiqueVo = e;
        this.disciplineScientifiqueEncadrementDoctorantsVo.push(disciplineScientifiqueEncadrementDoctorant);
        });
        }
   }
   prepareCommunauteSavoirEncadrementDoctorants(communauteSavoirs: Array<CommunauteSavoirVo>): void{
        if( communauteSavoirs != null){
        communauteSavoirs.forEach(e => {
        const communauteSavoirEncadrementDoctorant = new CommunauteSavoirEncadrementDoctorantVo();
        communauteSavoirEncadrementDoctorant.communauteSavoirVo = e;
        this.communauteSavoirEncadrementDoctorantsVo.push(communauteSavoirEncadrementDoctorant);
        });
        }
   }

    validateEncadrementEtudiants(){
    this.errorMessages = new Array();
    }
    validateEncadrementDoctorants(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    }

        addEncadrementEtudiants() {
        if( this.selectedEncadrement.encadrementEtudiantsVo == null ){
            this.selectedEncadrement.encadrementEtudiantsVo = new Array<EncadrementEtudiantVo>();
        }
       this.validateEncadrementEtudiants();
       if (this.errorMessages.length === 0) {
              this.selectedEncadrement.encadrementEtudiantsVo.push(this.selectedEncadrementEtudiants);
              this.selectedEncadrementEtudiants = new EncadrementEtudiantVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
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
       this.validateEncadrementDoctorants();
       if (this.errorMessages.length === 0) {
              this.selectedEncadrement.encadrementDoctorantsVo.push(this.selectedEncadrementDoctorants);
              this.selectedEncadrementDoctorants = new EncadrementDoctorantVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteEncadrementDoctorants(p: EncadrementDoctorantVo) {
        this.selectedEncadrement.encadrementDoctorantsVo.forEach((element, index) => {
            if (element === p) { this.selectedEncadrement.encadrementDoctorantsVo.splice(index, 1); }
        });
    }

public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.encadrementService.save().subscribe(encadrement=>{
       this.encadrements.push({...encadrement});
       this.createEncadrementDialog = false;
       this.submitted = false;
       this.selectedEncadrement = new EncadrementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }











































//openPopup
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

hideCreateDialog(){
    this.createEncadrementDialog  = false;
    this.setValidation(true);
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

   get createEncadrementDialog(): boolean {
           return this.encadrementService.createEncadrementDialog;

       }
    set createEncadrementDialog(value: boolean) {
        this.encadrementService.createEncadrementDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }



    get encadrementEtudiantEnjeuxIrdsVo(): Array<EncadrementEtudiantEnjeuxIrdVo> {
    if( this._encadrementEtudiantEnjeuxIrdsVo == null )
    this._encadrementEtudiantEnjeuxIrdsVo = new Array();
        return this._encadrementEtudiantEnjeuxIrdsVo;
    }

    set encadrementEtudiantEnjeuxIrdsVo(value: Array<EncadrementEtudiantEnjeuxIrdVo>) {
        this._encadrementEtudiantEnjeuxIrdsVo = value;
    }
    get encadrementEtudiantDisciplineScientifiquesVo(): Array<EncadrementEtudiantDisciplineScientifiqueVo> {
    if( this._encadrementEtudiantDisciplineScientifiquesVo == null )
    this._encadrementEtudiantDisciplineScientifiquesVo = new Array();
        return this._encadrementEtudiantDisciplineScientifiquesVo;
    }

    set encadrementEtudiantDisciplineScientifiquesVo(value: Array<EncadrementEtudiantDisciplineScientifiqueVo>) {
        this._encadrementEtudiantDisciplineScientifiquesVo = value;
    }
    get enjeuxIrdEncadrementDoctorantsVo(): Array<EnjeuxIrdEncadrementDoctorantVo> {
    if( this._enjeuxIrdEncadrementDoctorantsVo == null )
    this._enjeuxIrdEncadrementDoctorantsVo = new Array();
        return this._enjeuxIrdEncadrementDoctorantsVo;
    }

    set enjeuxIrdEncadrementDoctorantsVo(value: Array<EnjeuxIrdEncadrementDoctorantVo>) {
        this._enjeuxIrdEncadrementDoctorantsVo = value;
    }
    get disciplineScientifiqueEncadrementDoctorantsVo(): Array<DisciplineScientifiqueEncadrementDoctorantVo> {
    if( this._disciplineScientifiqueEncadrementDoctorantsVo == null )
    this._disciplineScientifiqueEncadrementDoctorantsVo = new Array();
        return this._disciplineScientifiqueEncadrementDoctorantsVo;
    }

    set disciplineScientifiqueEncadrementDoctorantsVo(value: Array<DisciplineScientifiqueEncadrementDoctorantVo>) {
        this._disciplineScientifiqueEncadrementDoctorantsVo = value;
    }
    get communauteSavoirEncadrementDoctorantsVo(): Array<CommunauteSavoirEncadrementDoctorantVo> {
    if( this._communauteSavoirEncadrementDoctorantsVo == null )
    this._communauteSavoirEncadrementDoctorantsVo = new Array();
        return this._communauteSavoirEncadrementDoctorantsVo;
    }

    set communauteSavoirEncadrementDoctorantsVo(value: Array<CommunauteSavoirEncadrementDoctorantVo>) {
        this._communauteSavoirEncadrementDoctorantsVo = value;
    }

    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validCampagneLibelle(): boolean {
    return this._validCampagneLibelle;
    }

    set validCampagneLibelle(value: boolean) {
    this._validCampagneLibelle = value;
    }
    get validEtatEtapeCampagneLibelle(): boolean {
    return this._validEtatEtapeCampagneLibelle;
    }

    set validEtatEtapeCampagneLibelle(value: boolean) {
    this._validEtatEtapeCampagneLibelle = value;
    }
    get validEtatEtapeCampagneCode(): boolean {
    return this._validEtatEtapeCampagneCode;
    }

    set validEtatEtapeCampagneCode(value: boolean) {
    this._validEtatEtapeCampagneCode = value;
    }

}
