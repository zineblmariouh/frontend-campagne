import {Component, OnInit, Input} from '@angular/core';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ModaliteVo} from '../../../../../controller/model/Modalite.model';
import {ModaliteService} from '../../../../../controller/service/Modalite.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {ModaliteInterventionVo} from '../../../../../controller/model/ModaliteIntervention.model';
import {ModaliteInterventionService} from '../../../../../controller/service/ModaliteIntervention.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EvenementColloqueScienntifiqueEnjeuxIrdVo} from '../../../../../controller/model/EvenementColloqueScienntifiqueEnjeuxIrd.model';
import {EvenementColloqueScienntifiqueEnjeuxIrdService} from '../../../../../controller/service/EvenementColloqueScienntifiqueEnjeuxIrd.service';
import {DisciplineScientifiqueEvenementColloqueScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueEvenementColloqueScientifique.model';
import {DisciplineScientifiqueEvenementColloqueScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueEvenementColloqueScientifique.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EvenementColloqueScienntifiquePaysVo} from '../../../../../controller/model/EvenementColloqueScienntifiquePays.model';
import {EvenementColloqueScienntifiquePaysService} from '../../../../../controller/service/EvenementColloqueScienntifiquePays.service';
import {CommunauteSavoirEvenementColloqueScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirEvenementColloqueScientifique.model';
import {CommunauteSavoirEvenementColloqueScientifiqueService} from '../../../../../controller/service/CommunauteSavoirEvenementColloqueScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
@Component({
  selector: 'app-evenement-colloque-scienntifique-create-admin',
  templateUrl: './evenement-colloque-scienntifique-create-admin.component.html',
  styleUrls: ['./evenement-colloque-scienntifique-create-admin.component.css']
})
export class EvenementColloqueScienntifiqueCreateAdminComponent implements OnInit {

        selectedEvenementColloqueScienntifiqueEnjeuxIrds: EvenementColloqueScienntifiqueEnjeuxIrdVo = new EvenementColloqueScienntifiqueEnjeuxIrdVo();
        selectedCommunauteSavoirEvenementColloqueScientifiques: CommunauteSavoirEvenementColloqueScientifiqueVo = new CommunauteSavoirEvenementColloqueScientifiqueVo();
        selectedDisciplineScientifiqueEvenementColloqueScientifiques: DisciplineScientifiqueEvenementColloqueScientifiqueVo = new DisciplineScientifiqueEvenementColloqueScientifiqueVo();
        selectedEvenementColloqueScienntifiquePayss: EvenementColloqueScienntifiquePaysVo = new EvenementColloqueScienntifiquePaysVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validModaliteLibelle = true;
    _validModaliteInterventionLibelle = true;
    _validModaliteInterventionCode = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _evenementColloqueScienntifiqueEnjeuxIrdsVo: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> = [];
private _communauteSavoirEvenementColloqueScientifiquesVo: Array<CommunauteSavoirEvenementColloqueScientifiqueVo> = [];
private _disciplineScientifiqueEvenementColloqueScientifiquesVo: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> = [];
private _evenementColloqueScienntifiquePayssVo: Array<EvenementColloqueScienntifiquePaysVo> = [];

constructor(private datePipe: DatePipe, private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private modaliteService :ModaliteService
,       private disciplineScientifiqueEvenementColloqueScientifiqueService :DisciplineScientifiqueEvenementColloqueScientifiqueService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private communauteSavoirService :CommunauteSavoirService
,       private modaliteInterventionService :ModaliteInterventionService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private enjeuxIrdService :EnjeuxIrdService
,       private evenementColloqueScienntifiquePaysService :EvenementColloqueScienntifiquePaysService
,       private communauteSavoirEvenementColloqueScientifiqueService :CommunauteSavoirEvenementColloqueScientifiqueService
,       private paysService :PaysService
,       private savoirEtInnovationService :SavoirEtInnovationService
,       private evenementColloqueScienntifiqueEnjeuxIrdService :EvenementColloqueScienntifiqueEnjeuxIrdService
) {

}


// methods
ngOnInit(): void {

            this.enjeuxIrdService.findAll().subscribe(data => this.prepareEvenementColloqueScienntifiqueEnjeuxIrds(data));

                this.selectedEvenementColloqueScienntifiqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.communauteSavoirService.findAll().subscribe(data => this.prepareCommunauteSavoirEvenementColloqueScientifiques(data));

                this.selectedCommunauteSavoirEvenementColloqueScientifiques.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);


            this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareDisciplineScientifiqueEvenementColloqueScientifiques(data));

                this.selectedDisciplineScientifiqueEvenementColloqueScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);


            this.paysService.findAll().subscribe(data => this.prepareEvenementColloqueScienntifiquePayss(data));

                this.selectedEvenementColloqueScienntifiquePayss.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


    this.selectedModalite = new ModaliteVo();
    this.modaliteService.findAll().subscribe((data) => this.modalites = data);
    this.selectedModaliteIntervention = new ModaliteInterventionVo();
    this.modaliteInterventionService.findAll().subscribe((data) => this.modaliteInterventions = data);
    this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
    this.savoirEtInnovationService.findAll().subscribe((data) => this.savoirEtInnovations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

         prepareEvenementColloqueScienntifiqueEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const evenementColloqueScienntifiqueEnjeuxIrd = new EvenementColloqueScienntifiqueEnjeuxIrdVo();
        evenementColloqueScienntifiqueEnjeuxIrd.enjeuxIrdVo = e;
        this.evenementColloqueScienntifiqueEnjeuxIrdsVo.push(evenementColloqueScienntifiqueEnjeuxIrd);
        });
        }
    }
         prepareCommunauteSavoirEvenementColloqueScientifiques(communauteSavoirs: Array<CommunauteSavoirVo>): void{
        if( communauteSavoirs != null){
        communauteSavoirs.forEach(e => {
        const communauteSavoirEvenementColloqueScientifique = new CommunauteSavoirEvenementColloqueScientifiqueVo();
        communauteSavoirEvenementColloqueScientifique.communauteSavoirVo = e;
        this.communauteSavoirEvenementColloqueScientifiquesVo.push(communauteSavoirEvenementColloqueScientifique);
        });
        }
    }
         prepareDisciplineScientifiqueEvenementColloqueScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const disciplineScientifiqueEvenementColloqueScientifique = new DisciplineScientifiqueEvenementColloqueScientifiqueVo();
        disciplineScientifiqueEvenementColloqueScientifique.disciplineScientifiqueVo = e;
        this.disciplineScientifiqueEvenementColloqueScientifiquesVo.push(disciplineScientifiqueEvenementColloqueScientifique);
        });
        }
    }
         prepareEvenementColloqueScienntifiquePayss(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const evenementColloqueScienntifiquePays = new EvenementColloqueScienntifiquePaysVo();
        evenementColloqueScienntifiquePays.paysVo = e;
        this.evenementColloqueScienntifiquePayssVo.push(evenementColloqueScienntifiquePays);
        });
        }
    }



private setValidation(value : boolean){
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
     this.evenementColloqueScienntifiqueService.save().subscribe(evenementColloqueScienntifique=>{
       this.evenementColloqueScienntifiques.push({...evenementColloqueScienntifique});
       this.createEvenementColloqueScienntifiqueDialog = false;
       this.submitted = false;
       this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }


































//openPopup
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
              public async openCreatemodaliteIntervention(modaliteIntervention: string) {
                      const isPermistted = await this.roleService.isPermitted('ModaliteIntervention', 'add');
                       if(isPermistted){
         this.selectedModaliteIntervention = new ModaliteInterventionVo();
        this.createModaliteInterventionDialog = true;
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
              public async openCreatemodalite(modalite: string) {
                      const isPermistted = await this.roleService.isPermitted('Modalite', 'add');
                       if(isPermistted){
         this.selectedModalite = new ModaliteVo();
        this.createModaliteDialog = true;
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

hideCreateDialog(){
    this.createEvenementColloqueScienntifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get evenementColloqueScienntifiques(): Array<EvenementColloqueScienntifiqueVo> {
    return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }

 get selectedEvenementColloqueScienntifique():EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
    set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }

   get createEvenementColloqueScienntifiqueDialog(): boolean {
           return this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog;

       }
    set createEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog= value;
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
       get selectedModaliteIntervention(): ModaliteInterventionVo {
           return this.modaliteInterventionService.selectedModaliteIntervention;
       }
      set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
       }
       get modaliteInterventions(): Array<ModaliteInterventionVo> {
           return this.modaliteInterventionService.modaliteInterventions;
       }
       set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
       }
       get createModaliteInterventionDialog(): boolean {
           return this.modaliteInterventionService.createModaliteInterventionDialog;
       }
      set createModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.createModaliteInterventionDialog= value;
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
       get selectedModalite(): ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
      set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }
       get modalites(): Array<ModaliteVo> {
           return this.modaliteService.modalites;
       }
       set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }
       get createModaliteDialog(): boolean {
           return this.modaliteService.createModaliteDialog;
       }
      set createModaliteDialog(value: boolean) {
        this.modaliteService.createModaliteDialog= value;
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


    get evenementColloqueScienntifiqueEnjeuxIrdsVo(): Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> {
    if( this._evenementColloqueScienntifiqueEnjeuxIrdsVo == null )
    this._evenementColloqueScienntifiqueEnjeuxIrdsVo = new Array();
    return this._evenementColloqueScienntifiqueEnjeuxIrdsVo;
    }

    set evenementColloqueScienntifiqueEnjeuxIrdsVo(value: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>) {
    this._evenementColloqueScienntifiqueEnjeuxIrdsVo = value;
    }
    get communauteSavoirEvenementColloqueScientifiquesVo(): Array<CommunauteSavoirEvenementColloqueScientifiqueVo> {
    if( this._communauteSavoirEvenementColloqueScientifiquesVo == null )
    this._communauteSavoirEvenementColloqueScientifiquesVo = new Array();
    return this._communauteSavoirEvenementColloqueScientifiquesVo;
    }

    set communauteSavoirEvenementColloqueScientifiquesVo(value: Array<CommunauteSavoirEvenementColloqueScientifiqueVo>) {
    this._communauteSavoirEvenementColloqueScientifiquesVo = value;
    }
    get disciplineScientifiqueEvenementColloqueScientifiquesVo(): Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> {
    if( this._disciplineScientifiqueEvenementColloqueScientifiquesVo == null )
    this._disciplineScientifiqueEvenementColloqueScientifiquesVo = new Array();
    return this._disciplineScientifiqueEvenementColloqueScientifiquesVo;
    }

    set disciplineScientifiqueEvenementColloqueScientifiquesVo(value: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>) {
    this._disciplineScientifiqueEvenementColloqueScientifiquesVo = value;
    }
    get evenementColloqueScienntifiquePayssVo(): Array<EvenementColloqueScienntifiquePaysVo> {
    if( this._evenementColloqueScienntifiquePayssVo == null )
    this._evenementColloqueScienntifiquePayssVo = new Array();
    return this._evenementColloqueScienntifiquePayssVo;
    }

    set evenementColloqueScienntifiquePayssVo(value: Array<EvenementColloqueScienntifiquePaysVo>) {
    this._evenementColloqueScienntifiquePayssVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validModaliteLibelle(): boolean {
    return this._validModaliteLibelle;
    }

    set validModaliteLibelle(value: boolean) {
    this._validModaliteLibelle = value;
    }
    get validModaliteInterventionLibelle(): boolean {
    return this._validModaliteInterventionLibelle;
    }

    set validModaliteInterventionLibelle(value: boolean) {
    this._validModaliteInterventionLibelle = value;
    }
    get validModaliteInterventionCode(): boolean {
    return this._validModaliteInterventionCode;
    }

    set validModaliteInterventionCode(value: boolean) {
    this._validModaliteInterventionCode = value;
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
