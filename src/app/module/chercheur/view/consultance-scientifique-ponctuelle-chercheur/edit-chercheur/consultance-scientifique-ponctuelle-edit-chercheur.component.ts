import {Component, OnInit} from '@angular/core';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeInstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/TypeInstrumentIrdConsultanceScientifiquePonctuelle.model';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/TypeInstrumentIrdConsultanceScientifiquePonctuelle.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EtablissementConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EtablissementConsultanceScientifiquePonctuelle.model';
import {EtablissementConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EtablissementConsultanceScientifiquePonctuelle.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {PaysCommanditaireVo} from '../../../../../controller/model/PaysCommanditaire.model';
import {PaysCommanditaireService} from '../../../../../controller/service/PaysCommanditaire.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {EnjeuxIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EnjeuxIrdConsultanceScientifiquePonctuelle.model';
import {EnjeuxIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EnjeuxIrdConsultanceScientifiquePonctuelle.service';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ZoneGeographiqueConsultanceScientifiquePonctuelle.model';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ZoneGeographiqueConsultanceScientifiquePonctuelle.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {InstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/InstrumentIrdConsultanceScientifiquePonctuelle.model';
import {InstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/InstrumentIrdConsultanceScientifiquePonctuelle.service';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/DisciplineScientifiqueConsultanceScientifiquePonctuelle.model';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/DisciplineScientifiqueConsultanceScientifiquePonctuelle.service';
import {TypeExpertiseVo} from '../../../../../controller/model/TypeExpertise.model';
import {TypeExpertiseService} from '../../../../../controller/service/TypeExpertise.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import {ExpertiseService} from '../../../../../controller/service/Expertise.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';

@Component({
  selector: 'app-consultance-scientifique-ponctuelle-edit-chercheur',
  templateUrl: './consultance-scientifique-ponctuelle-edit-chercheur.component.html',
  styleUrls: ['./consultance-scientifique-ponctuelle-edit-chercheur.component.css']
})
export class ConsultanceScientifiquePonctuelleEditChercheurComponent implements OnInit {

        selectedZoneGeographiqueConsultanceScientifiquePonctuelles: ZoneGeographiqueConsultanceScientifiquePonctuelleVo = new ZoneGeographiqueConsultanceScientifiquePonctuelleVo();
        zoneGeographiqueConsultanceScientifiquePonctuellesListe: Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo> = [];

        myZoneGeographiques: Array<ZoneGeographiqueVo> = [];
        myPayss: Array<PaysVo> = [];

        selectedPaysCommanditaires: PaysCommanditaireVo = new PaysCommanditaireVo();
        paysCommanditairesListe: Array<PaysCommanditaireVo> = [];


        selectedEtablissementConsultanceScientifiquePonctuelles: EtablissementConsultanceScientifiquePonctuelleVo = new EtablissementConsultanceScientifiquePonctuelleVo();
        etablissementConsultanceScientifiquePonctuellesListe: Array<EtablissementConsultanceScientifiquePonctuelleVo> = [];

        myEtablissements: Array<EtablissementVo> = [];

        selectedDisciplineScientifiqueConsultanceScientifiquePonctuelles: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo = new DisciplineScientifiqueConsultanceScientifiquePonctuelleVo();
        disciplineScientifiqueConsultanceScientifiquePonctuellesListe: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

        selectedEnjeuxIrdConsultanceScientifiquePonctuelles: EnjeuxIrdConsultanceScientifiquePonctuelleVo = new EnjeuxIrdConsultanceScientifiquePonctuelleVo();
        enjeuxIrdConsultanceScientifiquePonctuellesListe: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedInstrumentIrdConsultanceScientifiquePonctuelles: InstrumentIrdConsultanceScientifiquePonctuelleVo = new InstrumentIrdConsultanceScientifiquePonctuelleVo();
        instrumentIrdConsultanceScientifiquePonctuellesListe: Array<InstrumentIrdConsultanceScientifiquePonctuelleVo> = [];

        myInstrumentIrds: Array<InstrumentIrdVo> = [];

        selectedTypeInstrumentIrdConsultanceScientifiquePonctuelles: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo = new TypeInstrumentIrdConsultanceScientifiquePonctuelleVo();
        typeInstrumentIrdConsultanceScientifiquePonctuellesListe: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> = [];

        myTypeInstrumentIrds: Array<TypeInstrumentIrdVo> = [];


constructor(private datePipe: DatePipe, private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeInstrumentIrdConsultanceScientifiquePonctuelleService: TypeInstrumentIrdConsultanceScientifiquePonctuelleService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private etablissementConsultanceScientifiquePonctuelleService: EtablissementConsultanceScientifiquePonctuelleService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private paysCommanditaireService: PaysCommanditaireService
 ,       private etablissementService: EtablissementService
 ,       private enjeuxIrdConsultanceScientifiquePonctuelleService: EnjeuxIrdConsultanceScientifiquePonctuelleService
 ,       private zoneGeographiqueConsultanceScientifiquePonctuelleService: ZoneGeographiqueConsultanceScientifiquePonctuelleService
 ,       private instrumentIrdService: InstrumentIrdService
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private instrumentIrdConsultanceScientifiquePonctuelleService: InstrumentIrdConsultanceScientifiquePonctuelleService
 ,       private disciplineScientifiqueConsultanceScientifiquePonctuelleService: DisciplineScientifiqueConsultanceScientifiquePonctuelleService
 ,       private typeExpertiseService: TypeExpertiseService
 ,       private natureExpertiseService: NatureExpertiseService
 ,       private paysService: PaysService
 ,       private expertiseService: ExpertiseService
 ,       private typeInstrumentIrdService: TypeInstrumentIrdService
) {
}

// methods
ngOnInit(): void {
                this.selectedZoneGeographiqueConsultanceScientifiquePonctuelles.zoneGeographiqueVo = new ZoneGeographiqueVo();
                this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
                this.selectedZoneGeographiqueConsultanceScientifiquePonctuelles.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedPaysCommanditaires.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedEtablissementConsultanceScientifiquePonctuelles.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelles.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedEnjeuxIrdConsultanceScientifiquePonctuelles.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedInstrumentIrdConsultanceScientifiquePonctuelles.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
                this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelles.typeInstrumentIrdVo = new TypeInstrumentIrdVo();
                this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedTypeExpertise = new TypeExpertiseVo();
    this.typeExpertiseService.findAll().subscribe((data) => this.typeExpertises = data);
    this.selectedNatureExpertise = new NatureExpertiseVo();
    this.natureExpertiseService.findAll().subscribe((data) => this.natureExpertises = data);
    this.selectedExpertise = new ExpertiseVo();
    this.expertiseService.findAll().subscribe((data) => this.expertises = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addZoneGeographiqueConsultanceScientifiquePonctuelles() {
        if( this.selectedConsultanceScientifiquePonctuelle.zoneGeographiqueConsultanceScientifiquePonctuellesVo == null ){
            this.selectedConsultanceScientifiquePonctuelle.zoneGeographiqueConsultanceScientifiquePonctuellesVo = new Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>();
        }
        this.selectedConsultanceScientifiquePonctuelle.zoneGeographiqueConsultanceScientifiquePonctuellesVo.push(this.selectedZoneGeographiqueConsultanceScientifiquePonctuelles);
        this.selectedZoneGeographiqueConsultanceScientifiquePonctuelles = new ZoneGeographiqueConsultanceScientifiquePonctuelleVo();
        }

       deleteZoneGeographiqueConsultanceScientifiquePonctuelles(p: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {
        this.selectedConsultanceScientifiquePonctuelle.zoneGeographiqueConsultanceScientifiquePonctuellesVo.forEach((element, index) => {
            if (element === p) { this.selectedConsultanceScientifiquePonctuelle.zoneGeographiqueConsultanceScientifiquePonctuellesVo.splice(index, 1); }
        });
    }
        addPaysCommanditaires() {
        if( this.selectedConsultanceScientifiquePonctuelle.paysCommanditairesVo == null ){
            this.selectedConsultanceScientifiquePonctuelle.paysCommanditairesVo = new Array<PaysCommanditaireVo>();
        }
        this.selectedConsultanceScientifiquePonctuelle.paysCommanditairesVo.push(this.selectedPaysCommanditaires);
        this.selectedPaysCommanditaires = new PaysCommanditaireVo();
        }

       deletePaysCommanditaires(p: PaysCommanditaireVo) {
        this.selectedConsultanceScientifiquePonctuelle.paysCommanditairesVo.forEach((element, index) => {
            if (element === p) { this.selectedConsultanceScientifiquePonctuelle.paysCommanditairesVo.splice(index, 1); }
        });
    }
        addEtablissementConsultanceScientifiquePonctuelles() {
        if( this.selectedConsultanceScientifiquePonctuelle.etablissementConsultanceScientifiquePonctuellesVo == null ){
            this.selectedConsultanceScientifiquePonctuelle.etablissementConsultanceScientifiquePonctuellesVo = new Array<EtablissementConsultanceScientifiquePonctuelleVo>();
        }
        this.selectedConsultanceScientifiquePonctuelle.etablissementConsultanceScientifiquePonctuellesVo.push(this.selectedEtablissementConsultanceScientifiquePonctuelles);
        this.selectedEtablissementConsultanceScientifiquePonctuelles = new EtablissementConsultanceScientifiquePonctuelleVo();
        }

       deleteEtablissementConsultanceScientifiquePonctuelles(p: EtablissementConsultanceScientifiquePonctuelleVo) {
        this.selectedConsultanceScientifiquePonctuelle.etablissementConsultanceScientifiquePonctuellesVo.forEach((element, index) => {
            if (element === p) { this.selectedConsultanceScientifiquePonctuelle.etablissementConsultanceScientifiquePonctuellesVo.splice(index, 1); }
        });
    }
        addDisciplineScientifiqueConsultanceScientifiquePonctuelles() {
        if( this.selectedConsultanceScientifiquePonctuelle.disciplineScientifiqueConsultanceScientifiquePonctuellesVo == null ){
            this.selectedConsultanceScientifiquePonctuelle.disciplineScientifiqueConsultanceScientifiquePonctuellesVo = new Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>();
        }
        this.selectedConsultanceScientifiquePonctuelle.disciplineScientifiqueConsultanceScientifiquePonctuellesVo.push(this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelles);
        this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelles = new DisciplineScientifiqueConsultanceScientifiquePonctuelleVo();
        }

       deleteDisciplineScientifiqueConsultanceScientifiquePonctuelles(p: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo) {
        this.selectedConsultanceScientifiquePonctuelle.disciplineScientifiqueConsultanceScientifiquePonctuellesVo.forEach((element, index) => {
            if (element === p) { this.selectedConsultanceScientifiquePonctuelle.disciplineScientifiqueConsultanceScientifiquePonctuellesVo.splice(index, 1); }
        });
    }
        addEnjeuxIrdConsultanceScientifiquePonctuelles() {
        if( this.selectedConsultanceScientifiquePonctuelle.enjeuxIrdConsultanceScientifiquePonctuellesVo == null ){
            this.selectedConsultanceScientifiquePonctuelle.enjeuxIrdConsultanceScientifiquePonctuellesVo = new Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>();
        }
        this.selectedConsultanceScientifiquePonctuelle.enjeuxIrdConsultanceScientifiquePonctuellesVo.push(this.selectedEnjeuxIrdConsultanceScientifiquePonctuelles);
        this.selectedEnjeuxIrdConsultanceScientifiquePonctuelles = new EnjeuxIrdConsultanceScientifiquePonctuelleVo();
        }

       deleteEnjeuxIrdConsultanceScientifiquePonctuelles(p: EnjeuxIrdConsultanceScientifiquePonctuelleVo) {
        this.selectedConsultanceScientifiquePonctuelle.enjeuxIrdConsultanceScientifiquePonctuellesVo.forEach((element, index) => {
            if (element === p) { this.selectedConsultanceScientifiquePonctuelle.enjeuxIrdConsultanceScientifiquePonctuellesVo.splice(index, 1); }
        });
    }
        addInstrumentIrdConsultanceScientifiquePonctuelles() {
        if( this.selectedConsultanceScientifiquePonctuelle.instrumentIrdConsultanceScientifiquePonctuellesVo == null ){
            this.selectedConsultanceScientifiquePonctuelle.instrumentIrdConsultanceScientifiquePonctuellesVo = new Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>();
        }
        this.selectedConsultanceScientifiquePonctuelle.instrumentIrdConsultanceScientifiquePonctuellesVo.push(this.selectedInstrumentIrdConsultanceScientifiquePonctuelles);
        this.selectedInstrumentIrdConsultanceScientifiquePonctuelles = new InstrumentIrdConsultanceScientifiquePonctuelleVo();
        }

       deleteInstrumentIrdConsultanceScientifiquePonctuelles(p: InstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.selectedConsultanceScientifiquePonctuelle.instrumentIrdConsultanceScientifiquePonctuellesVo.forEach((element, index) => {
            if (element === p) { this.selectedConsultanceScientifiquePonctuelle.instrumentIrdConsultanceScientifiquePonctuellesVo.splice(index, 1); }
        });
    }
        addTypeInstrumentIrdConsultanceScientifiquePonctuelles() {
        if( this.selectedConsultanceScientifiquePonctuelle.typeInstrumentIrdConsultanceScientifiquePonctuellesVo == null ){
            this.selectedConsultanceScientifiquePonctuelle.typeInstrumentIrdConsultanceScientifiquePonctuellesVo = new Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>();
        }
        this.selectedConsultanceScientifiquePonctuelle.typeInstrumentIrdConsultanceScientifiquePonctuellesVo.push(this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelles);
        this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelles = new TypeInstrumentIrdConsultanceScientifiquePonctuelleVo();
        }

       deleteTypeInstrumentIrdConsultanceScientifiquePonctuelles(p: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.selectedConsultanceScientifiquePonctuelle.typeInstrumentIrdConsultanceScientifiquePonctuellesVo.forEach((element, index) => {
            if (element === p) { this.selectedConsultanceScientifiquePonctuelle.typeInstrumentIrdConsultanceScientifiquePonctuellesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedConsultanceScientifiquePonctuelle.dateFin = DateUtils.toDate(this.selectedConsultanceScientifiquePonctuelle.dateFin);
    this.consultanceScientifiquePonctuelleService.edit().subscribe(consultanceScientifiquePonctuelle=>{
    const myIndex = this.consultanceScientifiquePonctuelles.findIndex(e => e.id === this.selectedConsultanceScientifiquePonctuelle.id);
    this.consultanceScientifiquePonctuelles[myIndex] = this.selectedConsultanceScientifiquePonctuelle;
    this.editConsultanceScientifiquePonctuelleDialog = false;
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();


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
              public async openCreatetypeInstrumentIrd(typeInstrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
        this.createTypeInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
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
    this.editConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get consultanceScientifiquePonctuelles(): Array<ConsultanceScientifiquePonctuelleVo> {
    return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles;
       }
set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles = value;
       }

 get selectedConsultanceScientifiquePonctuelle(): ConsultanceScientifiquePonctuelleVo {
           return this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle;
       }
    set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle = value;
       }

   get editConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.consultanceScientifiquePonctuelleService.editConsultanceScientifiquePonctuelleDialog;

       }
    set editConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.editConsultanceScientifiquePonctuelleDialog = value;
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
       get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get createTypeInstrumentIrdDialog(): boolean {
           return this.typeInstrumentIrdService.createTypeInstrumentIrdDialog;
       }
      set createTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.createTypeInstrumentIrdDialog= value;
       }
       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
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
