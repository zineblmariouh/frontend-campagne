import {Component, OnInit} from '@angular/core';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
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
  selector: 'app-encadrement-doctorant-edit-admin',
  templateUrl: './encadrement-doctorant-edit-admin.component.html',
  styleUrls: ['./encadrement-doctorant-edit-admin.component.css']
})
export class EncadrementDoctorantEditAdminComponent implements OnInit {

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
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueEncadrementDoctorantService: DisciplineScientifiqueEncadrementDoctorantService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private responsabiliteEncadrementDoctorantService: ResponsabiliteEncadrementDoctorantService
 ,       private etablissementService: EtablissementService
 ,       private paysService: PaysService
 ,       private financementDoctorantService: FinancementDoctorantService
 ,       private enjeuxIrdEncadrementDoctorantService: EnjeuxIrdEncadrementDoctorantService
 ,       private communauteSavoirEncadrementDoctorantService: CommunauteSavoirEncadrementDoctorantService
 ,       private encadrementService: EncadrementService
 ,       private doctorantService: DoctorantService
 ,       private communauteSavoirService: CommunauteSavoirService
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
        addEnjeuxIrdEncadrementDoctorants() {
        if( this.selectedEncadrementDoctorant.enjeuxIrdEncadrementDoctorantsVo == null ){
            this.selectedEncadrementDoctorant.enjeuxIrdEncadrementDoctorantsVo = new Array<EnjeuxIrdEncadrementDoctorantVo>();
        }
        this.selectedEncadrementDoctorant.enjeuxIrdEncadrementDoctorantsVo.push(this.selectedEnjeuxIrdEncadrementDoctorants);
        this.selectedEnjeuxIrdEncadrementDoctorants = new EnjeuxIrdEncadrementDoctorantVo();
        }

       deleteEnjeuxIrdEncadrementDoctorants(p: EnjeuxIrdEncadrementDoctorantVo) {
        this.selectedEncadrementDoctorant.enjeuxIrdEncadrementDoctorantsVo.forEach((element, index) => {
            if (element === p) { this.selectedEncadrementDoctorant.enjeuxIrdEncadrementDoctorantsVo.splice(index, 1); }
        });
    }
        addDisciplineScientifiqueEncadrementDoctorants() {
        if( this.selectedEncadrementDoctorant.disciplineScientifiqueEncadrementDoctorantsVo == null ){
            this.selectedEncadrementDoctorant.disciplineScientifiqueEncadrementDoctorantsVo = new Array<DisciplineScientifiqueEncadrementDoctorantVo>();
        }
        this.selectedEncadrementDoctorant.disciplineScientifiqueEncadrementDoctorantsVo.push(this.selectedDisciplineScientifiqueEncadrementDoctorants);
        this.selectedDisciplineScientifiqueEncadrementDoctorants = new DisciplineScientifiqueEncadrementDoctorantVo();
        }

       deleteDisciplineScientifiqueEncadrementDoctorants(p: DisciplineScientifiqueEncadrementDoctorantVo) {
        this.selectedEncadrementDoctorant.disciplineScientifiqueEncadrementDoctorantsVo.forEach((element, index) => {
            if (element === p) { this.selectedEncadrementDoctorant.disciplineScientifiqueEncadrementDoctorantsVo.splice(index, 1); }
        });
    }
        addCommunauteSavoirEncadrementDoctorants() {
        if( this.selectedEncadrementDoctorant.communauteSavoirEncadrementDoctorantsVo == null ){
            this.selectedEncadrementDoctorant.communauteSavoirEncadrementDoctorantsVo = new Array<CommunauteSavoirEncadrementDoctorantVo>();
        }
        this.selectedEncadrementDoctorant.communauteSavoirEncadrementDoctorantsVo.push(this.selectedCommunauteSavoirEncadrementDoctorants);
        this.selectedCommunauteSavoirEncadrementDoctorants = new CommunauteSavoirEncadrementDoctorantVo();
        }

       deleteCommunauteSavoirEncadrementDoctorants(p: CommunauteSavoirEncadrementDoctorantVo) {
        this.selectedEncadrementDoctorant.communauteSavoirEncadrementDoctorantsVo.forEach((element, index) => {
            if (element === p) { this.selectedEncadrementDoctorant.communauteSavoirEncadrementDoctorantsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedEncadrementDoctorant.dateDebutThese = DateUtils.toDate(this.selectedEncadrementDoctorant.dateDebutThese);
            this.selectedEncadrementDoctorant.datePrevuSoutenanceThese = DateUtils.toDate(this.selectedEncadrementDoctorant.datePrevuSoutenanceThese);
    this.encadrementDoctorantService.edit().subscribe(encadrementDoctorant=>{
    const myIndex = this.encadrementDoctorants.findIndex(e => e.id === this.selectedEncadrementDoctorant.id);
    this.encadrementDoctorants[myIndex] = this.selectedEncadrementDoctorant;
    this.editEncadrementDoctorantDialog = false;
    this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();


    }, error => {
        console.log(error);
    });

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
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
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
    this.editEncadrementDoctorantDialog  = false;
}

// getters and setters

get encadrementDoctorants(): Array<EncadrementDoctorantVo> {
    return this.encadrementDoctorantService.encadrementDoctorants;
       }
set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorants = value;
       }

 get selectedEncadrementDoctorant(): EncadrementDoctorantVo {
           return this.encadrementDoctorantService.selectedEncadrementDoctorant;
       }
    set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.selectedEncadrementDoctorant = value;
       }

   get editEncadrementDoctorantDialog(): boolean {
           return this.encadrementDoctorantService.editEncadrementDoctorantDialog;

       }
    set editEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.editEncadrementDoctorantDialog = value;
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
       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
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
