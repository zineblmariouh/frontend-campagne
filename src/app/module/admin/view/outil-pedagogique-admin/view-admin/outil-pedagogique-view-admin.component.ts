import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
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
  selector: 'app-outil-pedagogique-view-admin',
  templateUrl: './outil-pedagogique-view-admin.component.html',
  styleUrls: ['./outil-pedagogique-view-admin.component.css']
})
export class OutilPedagogiqueViewAdminComponent implements OnInit {

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
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private outilPedagogiqueEnjeuxIrdService :OutilPedagogiqueEnjeuxIrdService
    ,private outilPedagogiquePaysDiffusionService :OutilPedagogiquePaysDiffusionService
    ,private typeOutilService :TypeOutilService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private langueService :LangueService
    ,private outilPedagogiquePaysConceptionService :OutilPedagogiquePaysConceptionService
    ,private outilPedagogiqueInstrumentIrdService :OutilPedagogiqueInstrumentIrdService
    ,private instrumentIrdService :InstrumentIrdService
    ,private cultureScientifiqueService :CultureScientifiqueService
    ,private outilPedagogiqueTypeInstrumentIrdService :OutilPedagogiqueTypeInstrumentIrdService
    ,private outilPedagogiqueLangueService :OutilPedagogiqueLangueService
    ,private outilPedagogiquePubliqueCibleService :OutilPedagogiquePubliqueCibleService
    ,private typeOutilPedagogiqueService :TypeOutilPedagogiqueService
    ,private publiqueCibleService :PubliqueCibleService
    ,private paysService :PaysService
    ,private outilPedagogiqueDisciplineScientifiqueService :OutilPedagogiqueDisciplineScientifiqueService
    ,private typeInstrumentIrdService :TypeInstrumentIrdService
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

hideViewDialog(){
    this.viewOutilPedagogiqueDialog  = false;
}

// getters and setters

get outilPedagogiques(): Array<OutilPedagogiqueVo> {
    return this.outilPedagogiqueService.outilPedagogiques;
       }
set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }

 get selectedOutilPedagogique():OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
    set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }

   get viewOutilPedagogiqueDialog():boolean {
           return this.outilPedagogiqueService.viewOutilPedagogiqueDialog;

       }
    set viewOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.viewOutilPedagogiqueDialog= value;
       }

       get selectedLangue():LangueVo {
           return this.langueService.selectedLangue;
       }
      set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }
       get langues():Array<LangueVo> {
           return this.langueService.langues;
       }
       set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }
       get editLangueDialog():boolean {
           return this.langueService.editLangueDialog;
       }
      set editLangueDialog(value: boolean) {
        this.langueService.editLangueDialog= value;
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
       get selectedCultureScientifique():CultureScientifiqueVo {
           return this.cultureScientifiqueService.selectedCultureScientifique;
       }
      set selectedCultureScientifique(value: CultureScientifiqueVo) {
        this.cultureScientifiqueService.selectedCultureScientifique = value;
       }
       get cultureScientifiques():Array<CultureScientifiqueVo> {
           return this.cultureScientifiqueService.cultureScientifiques;
       }
       set cultureScientifiques(value: Array<CultureScientifiqueVo>) {
        this.cultureScientifiqueService.cultureScientifiques = value;
       }
       get editCultureScientifiqueDialog():boolean {
           return this.cultureScientifiqueService.editCultureScientifiqueDialog;
       }
      set editCultureScientifiqueDialog(value: boolean) {
        this.cultureScientifiqueService.editCultureScientifiqueDialog= value;
       }
       get selectedTypeOutil():TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
      set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }
       get typeOutils():Array<TypeOutilVo> {
           return this.typeOutilService.typeOutils;
       }
       set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }
       get editTypeOutilDialog():boolean {
           return this.typeOutilService.editTypeOutilDialog;
       }
      set editTypeOutilDialog(value: boolean) {
        this.typeOutilService.editTypeOutilDialog= value;
       }
       get selectedTypeInstrumentIrd():TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds():Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get editTypeInstrumentIrdDialog():boolean {
           return this.typeInstrumentIrdService.editTypeInstrumentIrdDialog;
       }
      set editTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.editTypeInstrumentIrdDialog= value;
       }
       get selectedPubliqueCible():PubliqueCibleVo {
           return this.publiqueCibleService.selectedPubliqueCible;
       }
      set selectedPubliqueCible(value: PubliqueCibleVo) {
        this.publiqueCibleService.selectedPubliqueCible = value;
       }
       get publiqueCibles():Array<PubliqueCibleVo> {
           return this.publiqueCibleService.publiqueCibles;
       }
       set publiqueCibles(value: Array<PubliqueCibleVo>) {
        this.publiqueCibleService.publiqueCibles = value;
       }
       get editPubliqueCibleDialog():boolean {
           return this.publiqueCibleService.editPubliqueCibleDialog;
       }
      set editPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.editPubliqueCibleDialog= value;
       }
       get selectedInstrumentIrd():InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds():Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get editInstrumentIrdDialog():boolean {
           return this.instrumentIrdService.editInstrumentIrdDialog;
       }
      set editInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.editInstrumentIrdDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
