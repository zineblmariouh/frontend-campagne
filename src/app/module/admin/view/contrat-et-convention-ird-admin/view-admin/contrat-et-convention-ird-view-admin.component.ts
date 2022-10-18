import {Component, OnInit} from '@angular/core';
import {ContratEtConventionIrdService} from '../../../../../controller/service/ContratEtConventionIrd.service';
import {ContratEtConventionIrdVo} from '../../../../../controller/model/ContratEtConventionIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {StatusContratEtConventionVo} from '../../../../../controller/model/StatusContratEtConvention.model';
import {StatusContratEtConventionService} from '../../../../../controller/service/StatusContratEtConvention.service';

@Component({
  selector: 'app-contrat-et-convention-ird-view-admin',
  templateUrl: './contrat-et-convention-ird-view-admin.component.html',
  styleUrls: ['./contrat-et-convention-ird-view-admin.component.css']
})
export class ContratEtConventionIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private contratEtConventionIrdService: ContratEtConventionIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private savoirEtInnovationService :SavoirEtInnovationService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private statusContratEtConventionService :StatusContratEtConventionService
) {
}

// methods
ngOnInit(): void {
    this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();
    this.statusContratEtConventionService.findAll().subscribe((data) => this.statusContratEtConventions = data);
    this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
    this.savoirEtInnovationService.findAll().subscribe((data) => this.savoirEtInnovations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewContratEtConventionIrdDialog  = false;
}

// getters and setters

get contratEtConventionIrds(): Array<ContratEtConventionIrdVo> {
    return this.contratEtConventionIrdService.contratEtConventionIrds;
       }
set contratEtConventionIrds(value: Array<ContratEtConventionIrdVo>) {
        this.contratEtConventionIrdService.contratEtConventionIrds = value;
       }

 get selectedContratEtConventionIrd():ContratEtConventionIrdVo {
           return this.contratEtConventionIrdService.selectedContratEtConventionIrd;
       }
    set selectedContratEtConventionIrd(value: ContratEtConventionIrdVo) {
        this.contratEtConventionIrdService.selectedContratEtConventionIrd = value;
       }

   get viewContratEtConventionIrdDialog():boolean {
           return this.contratEtConventionIrdService.viewContratEtConventionIrdDialog;

       }
    set viewContratEtConventionIrdDialog(value: boolean) {
        this.contratEtConventionIrdService.viewContratEtConventionIrdDialog= value;
       }

       get selectedStatusContratEtConvention():StatusContratEtConventionVo {
           return this.statusContratEtConventionService.selectedStatusContratEtConvention;
       }
      set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
       }
       get statusContratEtConventions():Array<StatusContratEtConventionVo> {
           return this.statusContratEtConventionService.statusContratEtConventions;
       }
       set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
       }
       get editStatusContratEtConventionDialog():boolean {
           return this.statusContratEtConventionService.editStatusContratEtConventionDialog;
       }
      set editStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.editStatusContratEtConventionDialog= value;
       }
       get selectedSavoirEtInnovation():SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
      set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }
       get savoirEtInnovations():Array<SavoirEtInnovationVo> {
           return this.savoirEtInnovationService.savoirEtInnovations;
       }
       set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }
       get editSavoirEtInnovationDialog():boolean {
           return this.savoirEtInnovationService.editSavoirEtInnovationDialog;
       }
      set editSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.editSavoirEtInnovationDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
