import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleDetailService} from '../../../../../controller/service/VieInstitutionnelleDetail.service';
import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {TypeInstanceVo} from '../../../../../controller/model/TypeInstance.model';
import {TypeInstanceService} from '../../../../../controller/service/TypeInstance.service';
import {VieInstitutionnelleVo} from '../../../../../controller/model/VieInstitutionnelle.model';
import {VieInstitutionnelleService} from '../../../../../controller/service/VieInstitutionnelle.service';
import {VieInstitutionnelleDetailInstrumentIrdVo} from '../../../../../controller/model/VieInstitutionnelleDetailInstrumentIrd.model';
import {VieInstitutionnelleDetailInstrumentIrdService} from '../../../../../controller/service/VieInstitutionnelleDetailInstrumentIrd.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {StructureIrdVo} from '../../../../../controller/model/StructureIrd.model';
import {StructureIrdService} from '../../../../../controller/service/StructureIrd.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {VieInstitutionnelleDetailEtablissementVo} from '../../../../../controller/model/VieInstitutionnelleDetailEtablissement.model';
import {VieInstitutionnelleDetailEtablissementService} from '../../../../../controller/service/VieInstitutionnelleDetailEtablissement.service';

@Component({
  selector: 'app-vie-institutionnelle-detail-view-chercheur',
  templateUrl: './vie-institutionnelle-detail-view-chercheur.component.html',
  styleUrls: ['./vie-institutionnelle-detail-view-chercheur.component.css']
})
export class VieInstitutionnelleDetailViewChercheurComponent implements OnInit {

        selectedVieInstitutionnelleDetailInstrumentIrds: VieInstitutionnelleDetailInstrumentIrdVo = new VieInstitutionnelleDetailInstrumentIrdVo();
        vieInstitutionnelleDetailInstrumentIrdsListe: Array<VieInstitutionnelleDetailInstrumentIrdVo> = [];

        myInstrumentIrds: Array<InstrumentIrdVo> = [];

        selectedVieInstitutionnelleDetailEtablissements: VieInstitutionnelleDetailEtablissementVo = new VieInstitutionnelleDetailEtablissementVo();
        vieInstitutionnelleDetailEtablissementsListe: Array<VieInstitutionnelleDetailEtablissementVo> = [];

        myEtablissements: Array<EtablissementVo> = [];


constructor(private datePipe: DatePipe, private vieInstitutionnelleDetailService: VieInstitutionnelleDetailService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etablissementService :EtablissementService
    ,private typeInstanceService :TypeInstanceService
    ,private vieInstitutionnelleService :VieInstitutionnelleService
    ,private vieInstitutionnelleDetailInstrumentIrdService :VieInstitutionnelleDetailInstrumentIrdService
    ,private instrumentIrdService :InstrumentIrdService
    ,private structureIrdService :StructureIrdService
    ,private paysService :PaysService
    ,private vieInstitutionnelleDetailEtablissementService :VieInstitutionnelleDetailEtablissementService
) {
}

// methods
ngOnInit(): void {
                this.selectedVieInstitutionnelleDetailInstrumentIrds.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
                this.selectedVieInstitutionnelleDetailEtablissements.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedTypeInstance = new TypeInstanceVo();
    this.typeInstanceService.findAll().subscribe((data) => this.typeInstances = data);
    this.selectedStructureIrd = new StructureIrdVo();
    this.structureIrdService.findAll().subscribe((data) => this.structureIrds = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedVieInstitutionnelle = new VieInstitutionnelleVo();
    this.vieInstitutionnelleService.findAll().subscribe((data) => this.vieInstitutionnelles = data);
}

hideViewDialog(){
    this.viewVieInstitutionnelleDetailDialog  = false;
}

// getters and setters

get vieInstitutionnelleDetails(): Array<VieInstitutionnelleDetailVo> {
    return this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails;
       }
set vieInstitutionnelleDetails(value: Array<VieInstitutionnelleDetailVo>) {
        this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails = value;
       }

 get selectedVieInstitutionnelleDetail():VieInstitutionnelleDetailVo {
           return this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail;
       }
    set selectedVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail = value;
       }

   get viewVieInstitutionnelleDetailDialog():boolean {
           return this.vieInstitutionnelleDetailService.viewVieInstitutionnelleDetailDialog;

       }
    set viewVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.viewVieInstitutionnelleDetailDialog= value;
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
       get selectedTypeInstance():TypeInstanceVo {
           return this.typeInstanceService.selectedTypeInstance;
       }
      set selectedTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.selectedTypeInstance = value;
       }
       get typeInstances():Array<TypeInstanceVo> {
           return this.typeInstanceService.typeInstances;
       }
       set typeInstances(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstances = value;
       }
       get editTypeInstanceDialog():boolean {
           return this.typeInstanceService.editTypeInstanceDialog;
       }
      set editTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.editTypeInstanceDialog= value;
       }
       get selectedVieInstitutionnelle():VieInstitutionnelleVo {
           return this.vieInstitutionnelleService.selectedVieInstitutionnelle;
       }
      set selectedVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this.vieInstitutionnelleService.selectedVieInstitutionnelle = value;
       }
       get vieInstitutionnelles():Array<VieInstitutionnelleVo> {
           return this.vieInstitutionnelleService.vieInstitutionnelles;
       }
       set vieInstitutionnelles(value: Array<VieInstitutionnelleVo>) {
        this.vieInstitutionnelleService.vieInstitutionnelles = value;
       }
       get editVieInstitutionnelleDialog():boolean {
           return this.vieInstitutionnelleService.editVieInstitutionnelleDialog;
       }
      set editVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.editVieInstitutionnelleDialog= value;
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
       get selectedStructureIrd():StructureIrdVo {
           return this.structureIrdService.selectedStructureIrd;
       }
      set selectedStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.selectedStructureIrd = value;
       }
       get structureIrds():Array<StructureIrdVo> {
           return this.structureIrdService.structureIrds;
       }
       set structureIrds(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrds = value;
       }
       get editStructureIrdDialog():boolean {
           return this.structureIrdService.editStructureIrdDialog;
       }
      set editStructureIrdDialog(value: boolean) {
        this.structureIrdService.editStructureIrdDialog= value;
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
