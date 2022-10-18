import {Component, OnInit} from '@angular/core';
import {ContratEtConventionIrdService} from '../../../../../controller/service/ContratEtConventionIrd.service';
import {ContratEtConventionIrdVo} from '../../../../../controller/model/ContratEtConventionIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {StatusContratEtConventionVo} from '../../../../../controller/model/StatusContratEtConvention.model';
import {StatusContratEtConventionService} from '../../../../../controller/service/StatusContratEtConvention.service';

@Component({
  selector: 'app-contrat-et-convention-ird-edit-admin',
  templateUrl: './contrat-et-convention-ird-edit-admin.component.html',
  styleUrls: ['./contrat-et-convention-ird-edit-admin.component.css']
})
export class ContratEtConventionIrdEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private contratEtConventionIrdService: ContratEtConventionIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private savoirEtInnovationService: SavoirEtInnovationService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private statusContratEtConventionService: StatusContratEtConventionService
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

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedContratEtConventionIrd.dateContrat = DateUtils.toDate(this.selectedContratEtConventionIrd.dateContrat);
    this.contratEtConventionIrdService.edit().subscribe(contratEtConventionIrd=>{
    const myIndex = this.contratEtConventionIrds.findIndex(e => e.id === this.selectedContratEtConventionIrd.id);
    this.contratEtConventionIrds[myIndex] = this.selectedContratEtConventionIrd;
    this.editContratEtConventionIrdDialog = false;
    this.selectedContratEtConventionIrd = new ContratEtConventionIrdVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatestatusContratEtConvention(statusContratEtConvention: string) {
                      const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'add');
                       if(isPermistted){
         this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();
        this.createStatusContratEtConventionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatesavoirEtInnovation(savoirEtInnovation: string) {
                      const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'add');
                       if(isPermistted){
         this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
        this.createSavoirEtInnovationDialog = true;
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
// methods

hideEditDialog(){
    this.editContratEtConventionIrdDialog  = false;
}

// getters and setters

get contratEtConventionIrds(): Array<ContratEtConventionIrdVo> {
    return this.contratEtConventionIrdService.contratEtConventionIrds;
       }
set contratEtConventionIrds(value: Array<ContratEtConventionIrdVo>) {
        this.contratEtConventionIrdService.contratEtConventionIrds = value;
       }

 get selectedContratEtConventionIrd(): ContratEtConventionIrdVo {
           return this.contratEtConventionIrdService.selectedContratEtConventionIrd;
       }
    set selectedContratEtConventionIrd(value: ContratEtConventionIrdVo) {
        this.contratEtConventionIrdService.selectedContratEtConventionIrd = value;
       }

   get editContratEtConventionIrdDialog(): boolean {
           return this.contratEtConventionIrdService.editContratEtConventionIrdDialog;

       }
    set editContratEtConventionIrdDialog(value: boolean) {
        this.contratEtConventionIrdService.editContratEtConventionIrdDialog = value;
       }

       get selectedStatusContratEtConvention(): StatusContratEtConventionVo {
           return this.statusContratEtConventionService.selectedStatusContratEtConvention;
       }
      set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
       }
       get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
           return this.statusContratEtConventionService.statusContratEtConventions;
       }
       set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
       }
       get createStatusContratEtConventionDialog(): boolean {
           return this.statusContratEtConventionService.createStatusContratEtConventionDialog;
       }
      set createStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.createStatusContratEtConventionDialog= value;
       }
       get selectedSavoirEtInnovation(): SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
      set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }
       get savoirEtInnovations(): Array<SavoirEtInnovationVo> {
           return this.savoirEtInnovationService.savoirEtInnovations;
       }
       set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }
       get createSavoirEtInnovationDialog(): boolean {
           return this.savoirEtInnovationService.createSavoirEtInnovationDialog;
       }
      set createSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.createSavoirEtInnovationDialog= value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
