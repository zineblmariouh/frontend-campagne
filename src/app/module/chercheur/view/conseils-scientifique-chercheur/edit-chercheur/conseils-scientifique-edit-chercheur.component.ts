import {Component, OnInit} from '@angular/core';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
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
import {EnjeuxIrdConseilsScientifiqueVo} from '../../../../../controller/model/EnjeuxIrdConseilsScientifique.model';
import {EnjeuxIrdConseilsScientifiqueService} from '../../../../../controller/service/EnjeuxIrdConseilsScientifique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {TypeExpertiseVo} from '../../../../../controller/model/TypeExpertise.model';
import {TypeExpertiseService} from '../../../../../controller/service/TypeExpertise.service';
import {EtablissementConseilsScientifiqueVo} from '../../../../../controller/model/EtablissementConseilsScientifique.model';
import {EtablissementConseilsScientifiqueService} from '../../../../../controller/service/EtablissementConseilsScientifique.service';
import {DisciplineScientifiqueConseilsScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilsScientifique.model';
import {DisciplineScientifiqueConseilsScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueConseilsScientifique.service';
import {ZoneGeographiqueConseilsScientifiqueVo} from '../../../../../controller/model/ZoneGeographiqueConseilsScientifique.model';
import {ZoneGeographiqueConseilsScientifiqueService} from '../../../../../controller/service/ZoneGeographiqueConseilsScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import {ExpertiseService} from '../../../../../controller/service/Expertise.service';

@Component({
  selector: 'app-conseils-scientifique-edit-chercheur',
  templateUrl: './conseils-scientifique-edit-chercheur.component.html',
  styleUrls: ['./conseils-scientifique-edit-chercheur.component.css']
})
export class ConseilsScientifiqueEditChercheurComponent implements OnInit {

        selectedEtablissementConseilsScientifiques: EtablissementConseilsScientifiqueVo = new EtablissementConseilsScientifiqueVo();
        etablissementConseilsScientifiquesListe: Array<EtablissementConseilsScientifiqueVo> = [];

        myEtablissements: Array<EtablissementVo> = [];

        selectedZoneGeographiqueConseilsScientifiques: ZoneGeographiqueConseilsScientifiqueVo = new ZoneGeographiqueConseilsScientifiqueVo();
        zoneGeographiqueConseilsScientifiquesListe: Array<ZoneGeographiqueConseilsScientifiqueVo> = [];

        myZoneGeographiques: Array<ZoneGeographiqueVo> = [];
        myPayss: Array<PaysVo> = [];

        selectedEnjeuxIrdConseilsScientifiques: EnjeuxIrdConseilsScientifiqueVo = new EnjeuxIrdConseilsScientifiqueVo();
        enjeuxIrdConseilsScientifiquesListe: Array<EnjeuxIrdConseilsScientifiqueVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedDisciplineScientifiqueConseilsScientifiques: DisciplineScientifiqueConseilsScientifiqueVo = new DisciplineScientifiqueConseilsScientifiqueVo();
        disciplineScientifiqueConseilsScientifiquesListe: Array<DisciplineScientifiqueConseilsScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];


constructor(private datePipe: DatePipe, private conseilsScientifiqueService: ConseilsScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private enjeuxIrdConseilsScientifiqueService: EnjeuxIrdConseilsScientifiqueService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private etablissementService: EtablissementService
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private natureExpertiseService: NatureExpertiseService
 ,       private typeExpertiseService: TypeExpertiseService
 ,       private etablissementConseilsScientifiqueService: EtablissementConseilsScientifiqueService
 ,       private disciplineScientifiqueConseilsScientifiqueService: DisciplineScientifiqueConseilsScientifiqueService
 ,       private zoneGeographiqueConseilsScientifiqueService: ZoneGeographiqueConseilsScientifiqueService
 ,       private paysService: PaysService
 ,       private expertiseService: ExpertiseService
) {
}

// methods
ngOnInit(): void {
                this.selectedEtablissementConseilsScientifiques.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedZoneGeographiqueConseilsScientifiques.zoneGeographiqueVo = new ZoneGeographiqueVo();
                this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
                this.selectedZoneGeographiqueConseilsScientifiques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedEnjeuxIrdConseilsScientifiques.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedDisciplineScientifiqueConseilsScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedNatureExpertise = new NatureExpertiseVo();
    this.natureExpertiseService.findAll().subscribe((data) => this.natureExpertises = data);
    this.selectedTypeExpertise = new TypeExpertiseVo();
    this.typeExpertiseService.findAll().subscribe((data) => this.typeExpertises = data);
    this.selectedExpertise = new ExpertiseVo();
    this.expertiseService.findAll().subscribe((data) => this.expertises = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addEtablissementConseilsScientifiques() {
        if( this.selectedConseilsScientifique.etablissementConseilsScientifiquesVo == null ){
            this.selectedConseilsScientifique.etablissementConseilsScientifiquesVo = new Array<EtablissementConseilsScientifiqueVo>();
        }
        this.selectedConseilsScientifique.etablissementConseilsScientifiquesVo.push(this.selectedEtablissementConseilsScientifiques);
        this.selectedEtablissementConseilsScientifiques = new EtablissementConseilsScientifiqueVo();
        }

       deleteEtablissementConseilsScientifiques(p: EtablissementConseilsScientifiqueVo) {
        this.selectedConseilsScientifique.etablissementConseilsScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedConseilsScientifique.etablissementConseilsScientifiquesVo.splice(index, 1); }
        });
    }
        addZoneGeographiqueConseilsScientifiques() {
        if( this.selectedConseilsScientifique.zoneGeographiqueConseilsScientifiquesVo == null ){
            this.selectedConseilsScientifique.zoneGeographiqueConseilsScientifiquesVo = new Array<ZoneGeographiqueConseilsScientifiqueVo>();
        }
        this.selectedConseilsScientifique.zoneGeographiqueConseilsScientifiquesVo.push(this.selectedZoneGeographiqueConseilsScientifiques);
        this.selectedZoneGeographiqueConseilsScientifiques = new ZoneGeographiqueConseilsScientifiqueVo();
        }

       deleteZoneGeographiqueConseilsScientifiques(p: ZoneGeographiqueConseilsScientifiqueVo) {
        this.selectedConseilsScientifique.zoneGeographiqueConseilsScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedConseilsScientifique.zoneGeographiqueConseilsScientifiquesVo.splice(index, 1); }
        });
    }
        addEnjeuxIrdConseilsScientifiques() {
        if( this.selectedConseilsScientifique.enjeuxIrdConseilsScientifiquesVo == null ){
            this.selectedConseilsScientifique.enjeuxIrdConseilsScientifiquesVo = new Array<EnjeuxIrdConseilsScientifiqueVo>();
        }
        this.selectedConseilsScientifique.enjeuxIrdConseilsScientifiquesVo.push(this.selectedEnjeuxIrdConseilsScientifiques);
        this.selectedEnjeuxIrdConseilsScientifiques = new EnjeuxIrdConseilsScientifiqueVo();
        }

       deleteEnjeuxIrdConseilsScientifiques(p: EnjeuxIrdConseilsScientifiqueVo) {
        this.selectedConseilsScientifique.enjeuxIrdConseilsScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedConseilsScientifique.enjeuxIrdConseilsScientifiquesVo.splice(index, 1); }
        });
    }
        addDisciplineScientifiqueConseilsScientifiques() {
        if( this.selectedConseilsScientifique.disciplineScientifiqueConseilsScientifiquesVo == null ){
            this.selectedConseilsScientifique.disciplineScientifiqueConseilsScientifiquesVo = new Array<DisciplineScientifiqueConseilsScientifiqueVo>();
        }
        this.selectedConseilsScientifique.disciplineScientifiqueConseilsScientifiquesVo.push(this.selectedDisciplineScientifiqueConseilsScientifiques);
        this.selectedDisciplineScientifiqueConseilsScientifiques = new DisciplineScientifiqueConseilsScientifiqueVo();
        }

       deleteDisciplineScientifiqueConseilsScientifiques(p: DisciplineScientifiqueConseilsScientifiqueVo) {
        this.selectedConseilsScientifique.disciplineScientifiqueConseilsScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedConseilsScientifique.disciplineScientifiqueConseilsScientifiquesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.conseilsScientifiqueService.edit().subscribe(conseilsScientifique=>{
    const myIndex = this.conseilsScientifiques.findIndex(e => e.id === this.selectedConseilsScientifique.id);
    this.conseilsScientifiques[myIndex] = this.selectedConseilsScientifique;
    this.editConseilsScientifiqueDialog = false;
    this.selectedConseilsScientifique = new ConseilsScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatenatureExpertise(natureExpertise: string) {
                      const isPermistted = await this.roleService.isPermitted('NatureExpertise', 'add');
                       if(isPermistted){
         this.selectedNatureExpertise = new NatureExpertiseVo();
        this.createNatureExpertiseDialog = true;
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
              public async openCreatetypeExpertise(typeExpertise: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeExpertise', 'add');
                       if(isPermistted){
         this.selectedTypeExpertise = new TypeExpertiseVo();
        this.createTypeExpertiseDialog = true;
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
              public async openCreateexpertise(expertise: string) {
                      const isPermistted = await this.roleService.isPermitted('Expertise', 'add');
                       if(isPermistted){
         this.selectedExpertise = new ExpertiseVo();
        this.createExpertiseDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatezoneGeographique(zoneGeographique: string) {
                      const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'add');
                       if(isPermistted){
         this.selectedZoneGeographique = new ZoneGeographiqueVo();
        this.createZoneGeographiqueDialog = true;
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
    this.editConseilsScientifiqueDialog  = false;
}

// getters and setters

get conseilsScientifiques(): Array<ConseilsScientifiqueVo> {
    return this.conseilsScientifiqueService.conseilsScientifiques;
       }
set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }

 get selectedConseilsScientifique(): ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
    set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }

   get editConseilsScientifiqueDialog(): boolean {
           return this.conseilsScientifiqueService.editConseilsScientifiqueDialog;

       }
    set editConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.editConseilsScientifiqueDialog = value;
       }

       get selectedNatureExpertise(): NatureExpertiseVo {
           return this.natureExpertiseService.selectedNatureExpertise;
       }
      set selectedNatureExpertise(value: NatureExpertiseVo) {
        this.natureExpertiseService.selectedNatureExpertise = value;
       }
       get natureExpertises(): Array<NatureExpertiseVo> {
           return this.natureExpertiseService.natureExpertises;
       }
       set natureExpertises(value: Array<NatureExpertiseVo>) {
        this.natureExpertiseService.natureExpertises = value;
       }
       get createNatureExpertiseDialog(): boolean {
           return this.natureExpertiseService.createNatureExpertiseDialog;
       }
      set createNatureExpertiseDialog(value: boolean) {
        this.natureExpertiseService.createNatureExpertiseDialog= value;
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
       get selectedTypeExpertise(): TypeExpertiseVo {
           return this.typeExpertiseService.selectedTypeExpertise;
       }
      set selectedTypeExpertise(value: TypeExpertiseVo) {
        this.typeExpertiseService.selectedTypeExpertise = value;
       }
       get typeExpertises(): Array<TypeExpertiseVo> {
           return this.typeExpertiseService.typeExpertises;
       }
       set typeExpertises(value: Array<TypeExpertiseVo>) {
        this.typeExpertiseService.typeExpertises = value;
       }
       get createTypeExpertiseDialog(): boolean {
           return this.typeExpertiseService.createTypeExpertiseDialog;
       }
      set createTypeExpertiseDialog(value: boolean) {
        this.typeExpertiseService.createTypeExpertiseDialog= value;
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
       get selectedExpertise(): ExpertiseVo {
           return this.expertiseService.selectedExpertise;
       }
      set selectedExpertise(value: ExpertiseVo) {
        this.expertiseService.selectedExpertise = value;
       }
       get expertises(): Array<ExpertiseVo> {
           return this.expertiseService.expertises;
       }
       set expertises(value: Array<ExpertiseVo>) {
        this.expertiseService.expertises = value;
       }
       get createExpertiseDialog(): boolean {
           return this.expertiseService.createExpertiseDialog;
       }
      set createExpertiseDialog(value: boolean) {
        this.expertiseService.createExpertiseDialog= value;
       }
       get selectedZoneGeographique(): ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
      set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
       get zoneGeographiques(): Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
       set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }
       get createZoneGeographiqueDialog(): boolean {
           return this.zoneGeographiqueService.createZoneGeographiqueDialog;
       }
      set createZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.createZoneGeographiqueDialog= value;
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
