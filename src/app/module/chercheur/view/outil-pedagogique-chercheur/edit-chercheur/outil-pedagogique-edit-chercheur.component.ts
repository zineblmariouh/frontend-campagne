import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
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
import {OutilPedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/OutilPedagogiqueEnjeuxIrd.model';
import {OutilPedagogiqueEnjeuxIrdService} from '../../../../../controller/service/OutilPedagogiqueEnjeuxIrd.service';
import {OutilPedagogiquePaysDiffusionVo} from '../../../../../controller/model/OutilPedagogiquePaysDiffusion.model';
import {OutilPedagogiquePaysDiffusionService} from '../../../../../controller/service/OutilPedagogiquePaysDiffusion.service';
import {TypeOutilVo} from '../../../../../controller/model/TypeOutil.model';
import {TypeOutilService} from '../../../../../controller/service/TypeOutil.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {LangueVo} from '../../../../../controller/model/Langue.model';
import {LangueService} from '../../../../../controller/service/Langue.service';
import {OutilPedagogiquePaysConceptionVo} from '../../../../../controller/model/OutilPedagogiquePaysConception.model';
import {OutilPedagogiquePaysConceptionService} from '../../../../../controller/service/OutilPedagogiquePaysConception.service';
import {OutilPedagogiqueInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueInstrumentIrd.model';
import {OutilPedagogiqueInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueInstrumentIrd.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import {CultureScientifiqueService} from '../../../../../controller/service/CultureScientifique.service';
import {OutilPedagogiqueTypeInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueTypeInstrumentIrd.model';
import {OutilPedagogiqueTypeInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueTypeInstrumentIrd.service';
import {OutilPedagogiqueLangueVo} from '../../../../../controller/model/OutilPedagogiqueLangue.model';
import {OutilPedagogiqueLangueService} from '../../../../../controller/service/OutilPedagogiqueLangue.service';
import {OutilPedagogiquePubliqueCibleVo} from '../../../../../controller/model/OutilPedagogiquePubliqueCible.model';
import {OutilPedagogiquePubliqueCibleService} from '../../../../../controller/service/OutilPedagogiquePubliqueCible.service';
import {TypeOutilPedagogiqueVo} from '../../../../../controller/model/TypeOutilPedagogique.model';
import {TypeOutilPedagogiqueService} from '../../../../../controller/service/TypeOutilPedagogique.service';
import {PubliqueCibleVo} from '../../../../../controller/model/PubliqueCible.model';
import {PubliqueCibleService} from '../../../../../controller/service/PubliqueCible.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {OutilPedagogiqueDisciplineScientifiqueVo} from '../../../../../controller/model/OutilPedagogiqueDisciplineScientifique.model';
import {OutilPedagogiqueDisciplineScientifiqueService} from '../../../../../controller/service/OutilPedagogiqueDisciplineScientifique.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';

@Component({
  selector: 'app-outil-pedagogique-edit-chercheur',
  templateUrl: './outil-pedagogique-edit-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-edit-chercheur.component.css']
})
export class OutilPedagogiqueEditChercheurComponent implements OnInit {

        selectedOutilPedagogiqueEnjeuxIrds: OutilPedagogiqueEnjeuxIrdVo = new OutilPedagogiqueEnjeuxIrdVo();
        outilPedagogiqueEnjeuxIrdsListe: Array<OutilPedagogiqueEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedOutilPedagogiqueDisciplineScientifiques: OutilPedagogiqueDisciplineScientifiqueVo = new OutilPedagogiqueDisciplineScientifiqueVo();
        outilPedagogiqueDisciplineScientifiquesListe: Array<OutilPedagogiqueDisciplineScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

        selectedOutilPedagogiquePubliqueCibles: OutilPedagogiquePubliqueCibleVo = new OutilPedagogiquePubliqueCibleVo();
        outilPedagogiquePubliqueCiblesListe: Array<OutilPedagogiquePubliqueCibleVo> = [];

        myPubliqueCibles: Array<PubliqueCibleVo> = [];

        selectedTypeOutilPedagogiques: TypeOutilPedagogiqueVo = new TypeOutilPedagogiqueVo();
        typeOutilPedagogiquesListe: Array<TypeOutilPedagogiqueVo> = [];

        myTypeOutils: Array<TypeOutilVo> = [];

        selectedOutilPedagogiqueLangues: OutilPedagogiqueLangueVo = new OutilPedagogiqueLangueVo();
        outilPedagogiqueLanguesListe: Array<OutilPedagogiqueLangueVo> = [];

        myLangues: Array<LangueVo> = [];

        selectedOutilPedagogiquePaysConceptions: OutilPedagogiquePaysConceptionVo = new OutilPedagogiquePaysConceptionVo();
        outilPedagogiquePaysConceptionsListe: Array<OutilPedagogiquePaysConceptionVo> = [];

        myPayss: Array<PaysVo> = [];

        selectedOutilPedagogiquePaysDiffusions: OutilPedagogiquePaysDiffusionVo = new OutilPedagogiquePaysDiffusionVo();
        outilPedagogiquePaysDiffusionsListe: Array<OutilPedagogiquePaysDiffusionVo> = [];


        selectedOutilPedagogiqueInstrumentIrds: OutilPedagogiqueInstrumentIrdVo = new OutilPedagogiqueInstrumentIrdVo();
        outilPedagogiqueInstrumentIrdsListe: Array<OutilPedagogiqueInstrumentIrdVo> = [];

        myInstrumentIrds: Array<InstrumentIrdVo> = [];

        selectedOutilPedagogiqueTypeInstrumentIrds: OutilPedagogiqueTypeInstrumentIrdVo = new OutilPedagogiqueTypeInstrumentIrdVo();
        outilPedagogiqueTypeInstrumentIrdsListe: Array<OutilPedagogiqueTypeInstrumentIrdVo> = [];

        myTypeInstrumentIrds: Array<TypeInstrumentIrdVo> = [];


constructor(private datePipe: DatePipe, private outilPedagogiqueService: OutilPedagogiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private outilPedagogiqueEnjeuxIrdService: OutilPedagogiqueEnjeuxIrdService
 ,       private outilPedagogiquePaysDiffusionService: OutilPedagogiquePaysDiffusionService
 ,       private typeOutilService: TypeOutilService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private langueService: LangueService
 ,       private outilPedagogiquePaysConceptionService: OutilPedagogiquePaysConceptionService
 ,       private outilPedagogiqueInstrumentIrdService: OutilPedagogiqueInstrumentIrdService
 ,       private instrumentIrdService: InstrumentIrdService
 ,       private cultureScientifiqueService: CultureScientifiqueService
 ,       private outilPedagogiqueTypeInstrumentIrdService: OutilPedagogiqueTypeInstrumentIrdService
 ,       private outilPedagogiqueLangueService: OutilPedagogiqueLangueService
 ,       private outilPedagogiquePubliqueCibleService: OutilPedagogiquePubliqueCibleService
 ,       private typeOutilPedagogiqueService: TypeOutilPedagogiqueService
 ,       private publiqueCibleService: PubliqueCibleService
 ,       private paysService: PaysService
 ,       private outilPedagogiqueDisciplineScientifiqueService: OutilPedagogiqueDisciplineScientifiqueService
 ,       private typeInstrumentIrdService: TypeInstrumentIrdService
) {
}

// methods
ngOnInit(): void {
                this.selectedOutilPedagogiqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedOutilPedagogiqueDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedOutilPedagogiquePubliqueCibles.publiqueCibleVo = new PubliqueCibleVo();
                this.publiqueCibleService.findAll().subscribe((data) => this.publiqueCibles = data);
                this.selectedTypeOutilPedagogiques.typeOutilVo = new TypeOutilVo();
                this.typeOutilService.findAll().subscribe((data) => this.typeOutils = data);
                this.selectedOutilPedagogiqueLangues.langueVo = new LangueVo();
                this.langueService.findAll().subscribe((data) => this.langues = data);
                this.selectedOutilPedagogiquePaysConceptions.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedOutilPedagogiquePaysDiffusions.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedOutilPedagogiqueInstrumentIrds.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
                this.selectedOutilPedagogiqueTypeInstrumentIrds.typeInstrumentIrdVo = new TypeInstrumentIrdVo();
                this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedCultureScientifique = new CultureScientifiqueVo();
    this.cultureScientifiqueService.findAll().subscribe((data) => this.cultureScientifiques = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addOutilPedagogiqueEnjeuxIrds() {
        if( this.selectedOutilPedagogique.outilPedagogiqueEnjeuxIrdsVo == null ){
            this.selectedOutilPedagogique.outilPedagogiqueEnjeuxIrdsVo = new Array<OutilPedagogiqueEnjeuxIrdVo>();
        }
        this.selectedOutilPedagogique.outilPedagogiqueEnjeuxIrdsVo.push(this.selectedOutilPedagogiqueEnjeuxIrds);
        this.selectedOutilPedagogiqueEnjeuxIrds = new OutilPedagogiqueEnjeuxIrdVo();
        }

       deleteOutilPedagogiqueEnjeuxIrds(p: OutilPedagogiqueEnjeuxIrdVo) {
        this.selectedOutilPedagogique.outilPedagogiqueEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedOutilPedagogique.outilPedagogiqueEnjeuxIrdsVo.splice(index, 1); }
        });
    }
        addOutilPedagogiqueDisciplineScientifiques() {
        if( this.selectedOutilPedagogique.outilPedagogiqueDisciplineScientifiquesVo == null ){
            this.selectedOutilPedagogique.outilPedagogiqueDisciplineScientifiquesVo = new Array<OutilPedagogiqueDisciplineScientifiqueVo>();
        }
        this.selectedOutilPedagogique.outilPedagogiqueDisciplineScientifiquesVo.push(this.selectedOutilPedagogiqueDisciplineScientifiques);
        this.selectedOutilPedagogiqueDisciplineScientifiques = new OutilPedagogiqueDisciplineScientifiqueVo();
        }

       deleteOutilPedagogiqueDisciplineScientifiques(p: OutilPedagogiqueDisciplineScientifiqueVo) {
        this.selectedOutilPedagogique.outilPedagogiqueDisciplineScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedOutilPedagogique.outilPedagogiqueDisciplineScientifiquesVo.splice(index, 1); }
        });
    }
        addOutilPedagogiquePubliqueCibles() {
        if( this.selectedOutilPedagogique.outilPedagogiquePubliqueCiblesVo == null ){
            this.selectedOutilPedagogique.outilPedagogiquePubliqueCiblesVo = new Array<OutilPedagogiquePubliqueCibleVo>();
        }
        this.selectedOutilPedagogique.outilPedagogiquePubliqueCiblesVo.push(this.selectedOutilPedagogiquePubliqueCibles);
        this.selectedOutilPedagogiquePubliqueCibles = new OutilPedagogiquePubliqueCibleVo();
        }

       deleteOutilPedagogiquePubliqueCibles(p: OutilPedagogiquePubliqueCibleVo) {
        this.selectedOutilPedagogique.outilPedagogiquePubliqueCiblesVo.forEach((element, index) => {
            if (element === p) { this.selectedOutilPedagogique.outilPedagogiquePubliqueCiblesVo.splice(index, 1); }
        });
    }
        addTypeOutilPedagogiques() {
        if( this.selectedOutilPedagogique.typeOutilPedagogiquesVo == null ){
            this.selectedOutilPedagogique.typeOutilPedagogiquesVo = new Array<TypeOutilPedagogiqueVo>();
        }
        this.selectedOutilPedagogique.typeOutilPedagogiquesVo.push(this.selectedTypeOutilPedagogiques);
        this.selectedTypeOutilPedagogiques = new TypeOutilPedagogiqueVo();
        }

       deleteTypeOutilPedagogiques(p: TypeOutilPedagogiqueVo) {
        this.selectedOutilPedagogique.typeOutilPedagogiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedOutilPedagogique.typeOutilPedagogiquesVo.splice(index, 1); }
        });
    }
        addOutilPedagogiqueLangues() {
        if( this.selectedOutilPedagogique.outilPedagogiqueLanguesVo == null ){
            this.selectedOutilPedagogique.outilPedagogiqueLanguesVo = new Array<OutilPedagogiqueLangueVo>();
        }
        this.selectedOutilPedagogique.outilPedagogiqueLanguesVo.push(this.selectedOutilPedagogiqueLangues);
        this.selectedOutilPedagogiqueLangues = new OutilPedagogiqueLangueVo();
        }

       deleteOutilPedagogiqueLangues(p: OutilPedagogiqueLangueVo) {
        this.selectedOutilPedagogique.outilPedagogiqueLanguesVo.forEach((element, index) => {
            if (element === p) { this.selectedOutilPedagogique.outilPedagogiqueLanguesVo.splice(index, 1); }
        });
    }
        addOutilPedagogiquePaysConceptions() {
        if( this.selectedOutilPedagogique.outilPedagogiquePaysConceptionsVo == null ){
            this.selectedOutilPedagogique.outilPedagogiquePaysConceptionsVo = new Array<OutilPedagogiquePaysConceptionVo>();
        }
        this.selectedOutilPedagogique.outilPedagogiquePaysConceptionsVo.push(this.selectedOutilPedagogiquePaysConceptions);
        this.selectedOutilPedagogiquePaysConceptions = new OutilPedagogiquePaysConceptionVo();
        }

       deleteOutilPedagogiquePaysConceptions(p: OutilPedagogiquePaysConceptionVo) {
        this.selectedOutilPedagogique.outilPedagogiquePaysConceptionsVo.forEach((element, index) => {
            if (element === p) { this.selectedOutilPedagogique.outilPedagogiquePaysConceptionsVo.splice(index, 1); }
        });
    }
        addOutilPedagogiquePaysDiffusions() {
        if( this.selectedOutilPedagogique.outilPedagogiquePaysDiffusionsVo == null ){
            this.selectedOutilPedagogique.outilPedagogiquePaysDiffusionsVo = new Array<OutilPedagogiquePaysDiffusionVo>();
        }
        this.selectedOutilPedagogique.outilPedagogiquePaysDiffusionsVo.push(this.selectedOutilPedagogiquePaysDiffusions);
        this.selectedOutilPedagogiquePaysDiffusions = new OutilPedagogiquePaysDiffusionVo();
        }

       deleteOutilPedagogiquePaysDiffusions(p: OutilPedagogiquePaysDiffusionVo) {
        this.selectedOutilPedagogique.outilPedagogiquePaysDiffusionsVo.forEach((element, index) => {
            if (element === p) { this.selectedOutilPedagogique.outilPedagogiquePaysDiffusionsVo.splice(index, 1); }
        });
    }
        addOutilPedagogiqueInstrumentIrds() {
        if( this.selectedOutilPedagogique.outilPedagogiqueInstrumentIrdsVo == null ){
            this.selectedOutilPedagogique.outilPedagogiqueInstrumentIrdsVo = new Array<OutilPedagogiqueInstrumentIrdVo>();
        }
        this.selectedOutilPedagogique.outilPedagogiqueInstrumentIrdsVo.push(this.selectedOutilPedagogiqueInstrumentIrds);
        this.selectedOutilPedagogiqueInstrumentIrds = new OutilPedagogiqueInstrumentIrdVo();
        }

       deleteOutilPedagogiqueInstrumentIrds(p: OutilPedagogiqueInstrumentIrdVo) {
        this.selectedOutilPedagogique.outilPedagogiqueInstrumentIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedOutilPedagogique.outilPedagogiqueInstrumentIrdsVo.splice(index, 1); }
        });
    }
        addOutilPedagogiqueTypeInstrumentIrds() {
        if( this.selectedOutilPedagogique.outilPedagogiqueTypeInstrumentIrdsVo == null ){
            this.selectedOutilPedagogique.outilPedagogiqueTypeInstrumentIrdsVo = new Array<OutilPedagogiqueTypeInstrumentIrdVo>();
        }
        this.selectedOutilPedagogique.outilPedagogiqueTypeInstrumentIrdsVo.push(this.selectedOutilPedagogiqueTypeInstrumentIrds);
        this.selectedOutilPedagogiqueTypeInstrumentIrds = new OutilPedagogiqueTypeInstrumentIrdVo();
        }

       deleteOutilPedagogiqueTypeInstrumentIrds(p: OutilPedagogiqueTypeInstrumentIrdVo) {
        this.selectedOutilPedagogique.outilPedagogiqueTypeInstrumentIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedOutilPedagogique.outilPedagogiqueTypeInstrumentIrdsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedOutilPedagogique.dateDiffusion = DateUtils.toDate(this.selectedOutilPedagogique.dateDiffusion);
    this.outilPedagogiqueService.edit().subscribe(outilPedagogique=>{
    const myIndex = this.outilPedagogiques.findIndex(e => e.id === this.selectedOutilPedagogique.id);
    this.outilPedagogiques[myIndex] = this.selectedOutilPedagogique;
    this.editOutilPedagogiqueDialog = false;
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatelangue(langue: string) {
                      const isPermistted = await this.roleService.isPermitted('Langue', 'add');
                       if(isPermistted){
         this.selectedLangue = new LangueVo();
        this.createLangueDialog = true;
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
              public async openCreatecultureScientifique(cultureScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('CultureScientifique', 'add');
                       if(isPermistted){
         this.selectedCultureScientifique = new CultureScientifiqueVo();
        this.createCultureScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeOutil(typeOutil: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeOutil', 'add');
                       if(isPermistted){
         this.selectedTypeOutil = new TypeOutilVo();
        this.createTypeOutilDialog = true;
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
              public async openCreatepubliqueCible(publiqueCible: string) {
                      const isPermistted = await this.roleService.isPermitted('PubliqueCible', 'add');
                       if(isPermistted){
         this.selectedPubliqueCible = new PubliqueCibleVo();
        this.createPubliqueCibleDialog = true;
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
    this.editOutilPedagogiqueDialog  = false;
}

// getters and setters

get outilPedagogiques(): Array<OutilPedagogiqueVo> {
    return this.outilPedagogiqueService.outilPedagogiques;
       }
set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }

 get selectedOutilPedagogique(): OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
    set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }

   get editOutilPedagogiqueDialog(): boolean {
           return this.outilPedagogiqueService.editOutilPedagogiqueDialog;

       }
    set editOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.editOutilPedagogiqueDialog = value;
       }

       get selectedLangue(): LangueVo {
           return this.langueService.selectedLangue;
       }
      set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }
       get langues(): Array<LangueVo> {
           return this.langueService.langues;
       }
       set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }
       get createLangueDialog(): boolean {
           return this.langueService.createLangueDialog;
       }
      set createLangueDialog(value: boolean) {
        this.langueService.createLangueDialog= value;
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
       get selectedCultureScientifique(): CultureScientifiqueVo {
           return this.cultureScientifiqueService.selectedCultureScientifique;
       }
      set selectedCultureScientifique(value: CultureScientifiqueVo) {
        this.cultureScientifiqueService.selectedCultureScientifique = value;
       }
       get cultureScientifiques(): Array<CultureScientifiqueVo> {
           return this.cultureScientifiqueService.cultureScientifiques;
       }
       set cultureScientifiques(value: Array<CultureScientifiqueVo>) {
        this.cultureScientifiqueService.cultureScientifiques = value;
       }
       get createCultureScientifiqueDialog(): boolean {
           return this.cultureScientifiqueService.createCultureScientifiqueDialog;
       }
      set createCultureScientifiqueDialog(value: boolean) {
        this.cultureScientifiqueService.createCultureScientifiqueDialog= value;
       }
       get selectedTypeOutil(): TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
      set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }
       get typeOutils(): Array<TypeOutilVo> {
           return this.typeOutilService.typeOutils;
       }
       set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }
       get createTypeOutilDialog(): boolean {
           return this.typeOutilService.createTypeOutilDialog;
       }
      set createTypeOutilDialog(value: boolean) {
        this.typeOutilService.createTypeOutilDialog= value;
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
       get selectedPubliqueCible(): PubliqueCibleVo {
           return this.publiqueCibleService.selectedPubliqueCible;
       }
      set selectedPubliqueCible(value: PubliqueCibleVo) {
        this.publiqueCibleService.selectedPubliqueCible = value;
       }
       get publiqueCibles(): Array<PubliqueCibleVo> {
           return this.publiqueCibleService.publiqueCibles;
       }
       set publiqueCibles(value: Array<PubliqueCibleVo>) {
        this.publiqueCibleService.publiqueCibles = value;
       }
       get createPubliqueCibleDialog(): boolean {
           return this.publiqueCibleService.createPubliqueCibleDialog;
       }
      set createPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.createPubliqueCibleDialog= value;
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
