import {Component, OnInit, Input} from '@angular/core';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {FormationContinueDisciplineScientifiqueVo} from '../../../../../controller/model/FormationContinueDisciplineScientifique.model';
import {FormationContinueDisciplineScientifiqueService} from '../../../../../controller/service/FormationContinueDisciplineScientifique.service';
import {FormationContinuePubliqueProfessionelVo} from '../../../../../controller/model/FormationContinuePubliqueProfessionel.model';
import {FormationContinuePubliqueProfessionelService} from '../../../../../controller/service/FormationContinuePubliqueProfessionel.service';
import {EnseignementEtFormationVo} from '../../../../../controller/model/EnseignementEtFormation.model';
import {EnseignementEtFormationService} from '../../../../../controller/service/EnseignementEtFormation.service';
import {PaysFormationContinueVo} from '../../../../../controller/model/PaysFormationContinue.model';
import {PaysFormationContinueService} from '../../../../../controller/service/PaysFormationContinue.service';
import {ModaliteFormationContinueVo} from '../../../../../controller/model/ModaliteFormationContinue.model';
import {ModaliteFormationContinueService} from '../../../../../controller/service/ModaliteFormationContinue.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {ZoneGeographiqueFormationContinueVo} from '../../../../../controller/model/ZoneGeographiqueFormationContinue.model';
import {ZoneGeographiqueFormationContinueService} from '../../../../../controller/service/ZoneGeographiqueFormationContinue.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {FormationContinueCommanditaireVo} from '../../../../../controller/model/FormationContinueCommanditaire.model';
import {FormationContinueCommanditaireService} from '../../../../../controller/service/FormationContinueCommanditaire.service';
import {PubliqueProfessionelVo} from '../../../../../controller/model/PubliqueProfessionel.model';
import {PubliqueProfessionelService} from '../../../../../controller/service/PubliqueProfessionel.service';
import {FormationContinueObjetFormationGeneriqueVo} from '../../../../../controller/model/FormationContinueObjetFormationGenerique.model';
import {FormationContinueObjetFormationGeneriqueService} from '../../../../../controller/service/FormationContinueObjetFormationGenerique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {FormationContinueEnjeuxIrdVo} from '../../../../../controller/model/FormationContinueEnjeuxIrd.model';
import {FormationContinueEnjeuxIrdService} from '../../../../../controller/service/FormationContinueEnjeuxIrd.service';
import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {CommanditaireVo} from '../../../../../controller/model/Commanditaire.model';
import {CommanditaireService} from '../../../../../controller/service/Commanditaire.service';
@Component({
  selector: 'app-formation-continue-create-admin',
  templateUrl: './formation-continue-create-admin.component.html',
  styleUrls: ['./formation-continue-create-admin.component.css']
})
export class FormationContinueCreateAdminComponent implements OnInit {

        selectedFormationContinuePubliqueProfessionels: FormationContinuePubliqueProfessionelVo = new FormationContinuePubliqueProfessionelVo();
        selectedFormationContinueObjetFormationGeneriques: FormationContinueObjetFormationGeneriqueVo = new FormationContinueObjetFormationGeneriqueVo();
        selectedFormationContinueEnjeuxIrds: FormationContinueEnjeuxIrdVo = new FormationContinueEnjeuxIrdVo();
        selectedFormationContinueDisciplineScientifiques: FormationContinueDisciplineScientifiqueVo = new FormationContinueDisciplineScientifiqueVo();
        selectedPaysFormationContinue: PaysFormationContinueVo = new PaysFormationContinueVo();
        selectedZoneGeographiqueFormationContinues: ZoneGeographiqueFormationContinueVo = new ZoneGeographiqueFormationContinueVo();
        selectedFormationContinueCommanditaires: FormationContinueCommanditaireVo = new FormationContinueCommanditaireVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validFormationContinueIntitule = true;
   _validFormationContinueFormationContinuePubliqueProfessionels = true;
   _validFormationContinueNombreHeuresDispenseesDansAnnee = true;
   _validFormationContinueModaliteFormationContinue = true;
   _validFormationContinueFormationContinueEnjeuxIrds = true;
   _validFormationContinuePaysFormationContinue = true;
   _validFormationContinueZoneGeographiqueFormationContinues = true;
   _validFormationContinueFormationContinueCommanditaires = true;

    _validModaliteFormationContinueLibelle = true;
    _validModaliteFormationContinueCode = true;
    _validEnseignementEtFormationTempsEstimePourCetteAnnne = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _formationContinuePubliqueProfessionelsVo: Array<FormationContinuePubliqueProfessionelVo> = [];
private _formationContinueObjetFormationGeneriquesVo: Array<FormationContinueObjetFormationGeneriqueVo> = [];
private _formationContinueEnjeuxIrdsVo: Array<FormationContinueEnjeuxIrdVo> = [];
private _formationContinueDisciplineScientifiquesVo: Array<FormationContinueDisciplineScientifiqueVo> = [];
private _paysFormationContinueVo: Array<PaysFormationContinueVo> = [];

constructor(private datePipe: DatePipe, private formationContinueService: FormationContinueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private formationContinueDisciplineScientifiqueService :FormationContinueDisciplineScientifiqueService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private formationContinuePubliqueProfessionelService :FormationContinuePubliqueProfessionelService
,       private enseignementEtFormationService :EnseignementEtFormationService
,       private paysFormationContinueService :PaysFormationContinueService
,       private formationContinueCommanditaireService :FormationContinueCommanditaireService
,       private publiqueProfessionelService :PubliqueProfessionelService
,       private formationContinueObjetFormationGeneriqueService :FormationContinueObjetFormationGeneriqueService
,       private enjeuxIrdService :EnjeuxIrdService
,       private formationContinueEnjeuxIrdService :FormationContinueEnjeuxIrdService
,       private objetFormationGeneriqueService :ObjetFormationGeneriqueService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private commanditaireService :CommanditaireService
,       private modaliteFormationContinueService :ModaliteFormationContinueService
,       private paysService :PaysService
,       private zoneGeographiqueService :ZoneGeographiqueService
,       private zoneGeographiqueFormationContinueService :ZoneGeographiqueFormationContinueService
) {

}


// methods
ngOnInit(): void {

            this.publiqueProfessionelService.findAll().subscribe(data => this.prepareFormationContinuePubliqueProfessionels(data));

                this.selectedFormationContinuePubliqueProfessionels.publiqueProfessionelVo = new PubliqueProfessionelVo();
                this.publiqueProfessionelService.findAll().subscribe((data) => this.publiqueProfessionels = data);


            this.objetFormationGeneriqueService.findAll().subscribe(data => this.prepareFormationContinueObjetFormationGeneriques(data));

                this.selectedFormationContinueObjetFormationGeneriques.objetFormationGeneriqueVo = new ObjetFormationGeneriqueVo();
                this.objetFormationGeneriqueService.findAll().subscribe((data) => this.objetFormationGeneriques = data);


            this.enjeuxIrdService.findAll().subscribe(data => this.prepareFormationContinueEnjeuxIrds(data));

                this.selectedFormationContinueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareFormationContinueDisciplineScientifiques(data));

                this.selectedFormationContinueDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);


            this.paysService.findAll().subscribe(data => this.preparePaysFormationContinue(data));

                this.selectedPaysFormationContinue.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);



                this.selectedZoneGeographiqueFormationContinues.zoneGeographiqueVo = new ZoneGeographiqueVo();
                this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
                this.selectedZoneGeographiqueFormationContinues.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);



                this.selectedFormationContinueCommanditaires.commanditaireVo = new CommanditaireVo();
                this.commanditaireService.findAll().subscribe((data) => this.commanditaires = data);
                this.selectedFormationContinueCommanditaires.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


    this.selectedModaliteFormationContinue = new ModaliteFormationContinueVo();
    this.modaliteFormationContinueService.findAll().subscribe((data) => this.modaliteFormationContinues = data);
    this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
    this.enseignementEtFormationService.findAll().subscribe((data) => this.enseignementEtFormations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

         prepareFormationContinuePubliqueProfessionels(publiqueProfessionels: Array<PubliqueProfessionelVo>): void{
        if( publiqueProfessionels != null){
        publiqueProfessionels.forEach(e => {
        const formationContinuePubliqueProfessionel = new FormationContinuePubliqueProfessionelVo();
        formationContinuePubliqueProfessionel.publiqueProfessionelVo = e;
        this.formationContinuePubliqueProfessionelsVo.push(formationContinuePubliqueProfessionel);
        });
        }
    }
         prepareFormationContinueObjetFormationGeneriques(objetFormationGeneriques: Array<ObjetFormationGeneriqueVo>): void{
        if( objetFormationGeneriques != null){
        objetFormationGeneriques.forEach(e => {
        const formationContinueObjetFormationGenerique = new FormationContinueObjetFormationGeneriqueVo();
        formationContinueObjetFormationGenerique.objetFormationGeneriqueVo = e;
        this.formationContinueObjetFormationGeneriquesVo.push(formationContinueObjetFormationGenerique);
        });
        }
    }
         prepareFormationContinueEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const formationContinueEnjeuxIrd = new FormationContinueEnjeuxIrdVo();
        formationContinueEnjeuxIrd.enjeuxIrdVo = e;
        this.formationContinueEnjeuxIrdsVo.push(formationContinueEnjeuxIrd);
        });
        }
    }
         prepareFormationContinueDisciplineScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const formationContinueDisciplineScientifique = new FormationContinueDisciplineScientifiqueVo();
        formationContinueDisciplineScientifique.disciplineScientifiqueVo = e;
        this.formationContinueDisciplineScientifiquesVo.push(formationContinueDisciplineScientifique);
        });
        }
    }
         preparePaysFormationContinue(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const paysFormationContinue = new PaysFormationContinueVo();
        paysFormationContinue.paysVo = e;
        this.paysFormationContinueVo.push(paysFormationContinue);
        });
        }
    }

    validateZoneGeographiqueFormationContinues(){
    this.errorMessages = new Array();
    }
    validateFormationContinueCommanditaires(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validFormationContinueIntitule = value;
    this.validFormationContinueFormationContinuePubliqueProfessionels = value;
    this.validFormationContinueNombreHeuresDispenseesDansAnnee = value;
    this.validFormationContinueModaliteFormationContinue = value;
    this.validFormationContinueFormationContinueEnjeuxIrds = value;
    this.validFormationContinuePaysFormationContinue = value;
    this.validFormationContinueZoneGeographiqueFormationContinues = value;
    this.validFormationContinueFormationContinueCommanditaires = value;
    }

        addZoneGeographiqueFormationContinues() {
        if( this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo == null ){
            this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo = new Array<ZoneGeographiqueFormationContinueVo>();
        }
       this.validateZoneGeographiqueFormationContinues();
       if (this.errorMessages.length === 0) {
              this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo.push(this.selectedZoneGeographiqueFormationContinues);
              this.selectedZoneGeographiqueFormationContinues = new ZoneGeographiqueFormationContinueVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteZoneGeographiqueFormationContinues(p: ZoneGeographiqueFormationContinueVo) {
        this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo.splice(index, 1); }
        });
    }
        addFormationContinueCommanditaires() {
        if( this.selectedFormationContinue.formationContinueCommanditairesVo == null ){
            this.selectedFormationContinue.formationContinueCommanditairesVo = new Array<FormationContinueCommanditaireVo>();
        }
       this.validateFormationContinueCommanditaires();
       if (this.errorMessages.length === 0) {
              this.selectedFormationContinue.formationContinueCommanditairesVo.push(this.selectedFormationContinueCommanditaires);
              this.selectedFormationContinueCommanditaires = new FormationContinueCommanditaireVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteFormationContinueCommanditaires(p: FormationContinueCommanditaireVo) {
        this.selectedFormationContinue.formationContinueCommanditairesVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.formationContinueCommanditairesVo.splice(index, 1); }
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
     this.formationContinueService.save().subscribe(formationContinue=>{
       this.formationContinues.push({...formationContinue});
       this.createFormationContinueDialog = false;
       this.submitted = false;
       this.selectedFormationContinue = new FormationContinueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateFormationContinueIntitule();
this.validateFormationContinueFormationContinuePubliqueProfessionels();
this.validateFormationContinueNombreHeuresDispenseesDansAnnee();
this.validateFormationContinueModaliteFormationContinue();
this.validateFormationContinueFormationContinueEnjeuxIrds();
this.validateFormationContinuePaysFormationContinue();
this.validateFormationContinueZoneGeographiqueFormationContinues();
this.validateFormationContinueFormationContinueCommanditaires();

    }

private validateFormationContinueIntitule(){
        if (this.stringUtilService.isEmpty(this.selectedFormationContinue.intitule)) {
            this.errorMessages.push('Intitule non valide');
            this.validFormationContinueIntitule = false;
        } else {
            this.validFormationContinueIntitule = true;
        }
    }
private validateFormationContinueFormationContinuePubliqueProfessionels(){
        if (this.stringUtilService.isEmpty(this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo)) {
            this.errorMessages.push('Formation continue publique professionels non valide');
            this.validFormationContinueFormationContinuePubliqueProfessionels = false;
        } else {
            this.validFormationContinueFormationContinuePubliqueProfessionels = true;
        }
    }
private validateFormationContinueNombreHeuresDispenseesDansAnnee(){
        if (this.stringUtilService.isEmpty(this.selectedFormationContinue.nombreHeuresDispenseesDansAnnee)) {
            this.errorMessages.push('Nombre heures dispensees dans annee non valide');
            this.validFormationContinueNombreHeuresDispenseesDansAnnee = false;
        } else {
            this.validFormationContinueNombreHeuresDispenseesDansAnnee = true;
        }
    }
private validateFormationContinueModaliteFormationContinue(){
        if (this.stringUtilService.isEmpty(this.selectedFormationContinue.modaliteFormationContinueVo)) {
            this.errorMessages.push('Modalite formation continue non valide');
            this.validFormationContinueModaliteFormationContinue = false;
        } else {
            this.validFormationContinueModaliteFormationContinue = true;
        }
    }
private validateFormationContinueFormationContinueEnjeuxIrds(){
        if (this.stringUtilService.isEmpty(this.selectedFormationContinue.formationContinueEnjeuxIrdsVo)) {
            this.errorMessages.push('Formation continue enjeux irds non valide');
            this.validFormationContinueFormationContinueEnjeuxIrds = false;
        } else {
            this.validFormationContinueFormationContinueEnjeuxIrds = true;
        }
    }
private validateFormationContinuePaysFormationContinue(){
        if (this.stringUtilService.isEmpty(this.selectedFormationContinue.paysFormationContinueVo)) {
            this.errorMessages.push('Pays formation continue non valide');
            this.validFormationContinuePaysFormationContinue = false;
        } else {
            this.validFormationContinuePaysFormationContinue = true;
        }
    }
private validateFormationContinueZoneGeographiqueFormationContinues(){
        if (this.stringUtilService.isEmpty(this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo)) {
            this.errorMessages.push('Zone geographique formation continues non valide');
            this.validFormationContinueZoneGeographiqueFormationContinues = false;
        } else {
            this.validFormationContinueZoneGeographiqueFormationContinues = true;
        }
    }
private validateFormationContinueFormationContinueCommanditaires(){
        if (this.stringUtilService.isEmpty(this.selectedFormationContinue.formationContinueCommanditairesVo)) {
            this.errorMessages.push('Formation continue commanditaires non valide');
            this.validFormationContinueFormationContinueCommanditaires = false;
        } else {
            this.validFormationContinueFormationContinueCommanditaires = true;
        }
    }















































//openPopup
              public async openCreateenseignementEtFormation(enseignementEtFormation: string) {
                      const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'add');
                       if(isPermistted){
         this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
        this.createEnseignementEtFormationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateobjetFormationGenerique(objetFormationGenerique: string) {
                      const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'add');
                       if(isPermistted){
         this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
        this.createObjetFormationGeneriqueDialog = true;
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
              public async openCreatemodaliteFormationContinue(modaliteFormationContinue: string) {
                      const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'add');
                       if(isPermistted){
         this.selectedModaliteFormationContinue = new ModaliteFormationContinueVo();
        this.createModaliteFormationContinueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecommanditaire(commanditaire: string) {
                      const isPermistted = await this.roleService.isPermitted('Commanditaire', 'add');
                       if(isPermistted){
         this.selectedCommanditaire = new CommanditaireVo();
        this.createCommanditaireDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepubliqueProfessionel(publiqueProfessionel: string) {
                      const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'add');
                       if(isPermistted){
         this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();
        this.createPubliqueProfessionelDialog = true;
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
    this.createFormationContinueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get formationContinues(): Array<FormationContinueVo> {
    return this.formationContinueService.formationContinues;
       }
set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }

 get selectedFormationContinue():FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
    set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }

   get createFormationContinueDialog(): boolean {
           return this.formationContinueService.createFormationContinueDialog;

       }
    set createFormationContinueDialog(value: boolean) {
        this.formationContinueService.createFormationContinueDialog= value;
       }

       get selectedEnseignementEtFormation(): EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
      set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }
       get enseignementEtFormations(): Array<EnseignementEtFormationVo> {
           return this.enseignementEtFormationService.enseignementEtFormations;
       }
       set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }
       get createEnseignementEtFormationDialog(): boolean {
           return this.enseignementEtFormationService.createEnseignementEtFormationDialog;
       }
      set createEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.createEnseignementEtFormationDialog= value;
       }
       get selectedObjetFormationGenerique(): ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
      set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }
       get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
       set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }
       get createObjetFormationGeneriqueDialog(): boolean {
           return this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog;
       }
      set createObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog= value;
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
       get selectedModaliteFormationContinue(): ModaliteFormationContinueVo {
           return this.modaliteFormationContinueService.selectedModaliteFormationContinue;
       }
      set selectedModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.selectedModaliteFormationContinue = value;
       }
       get modaliteFormationContinues(): Array<ModaliteFormationContinueVo> {
           return this.modaliteFormationContinueService.modaliteFormationContinues;
       }
       set modaliteFormationContinues(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinues = value;
       }
       get createModaliteFormationContinueDialog(): boolean {
           return this.modaliteFormationContinueService.createModaliteFormationContinueDialog;
       }
      set createModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.createModaliteFormationContinueDialog= value;
       }
       get selectedCommanditaire(): CommanditaireVo {
           return this.commanditaireService.selectedCommanditaire;
       }
      set selectedCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.selectedCommanditaire = value;
       }
       get commanditaires(): Array<CommanditaireVo> {
           return this.commanditaireService.commanditaires;
       }
       set commanditaires(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaires = value;
       }
       get createCommanditaireDialog(): boolean {
           return this.commanditaireService.createCommanditaireDialog;
       }
      set createCommanditaireDialog(value: boolean) {
        this.commanditaireService.createCommanditaireDialog= value;
       }
       get selectedPubliqueProfessionel(): PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
      set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }
       get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
           return this.publiqueProfessionelService.publiqueProfessionels;
       }
       set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }
       get createPubliqueProfessionelDialog(): boolean {
           return this.publiqueProfessionelService.createPubliqueProfessionelDialog;
       }
      set createPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.createPubliqueProfessionelDialog= value;
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


    get formationContinuePubliqueProfessionelsVo(): Array<FormationContinuePubliqueProfessionelVo> {
    if( this._formationContinuePubliqueProfessionelsVo == null )
    this._formationContinuePubliqueProfessionelsVo = new Array();
    return this._formationContinuePubliqueProfessionelsVo;
    }

    set formationContinuePubliqueProfessionelsVo(value: Array<FormationContinuePubliqueProfessionelVo>) {
    this._formationContinuePubliqueProfessionelsVo = value;
    }
    get formationContinueObjetFormationGeneriquesVo(): Array<FormationContinueObjetFormationGeneriqueVo> {
    if( this._formationContinueObjetFormationGeneriquesVo == null )
    this._formationContinueObjetFormationGeneriquesVo = new Array();
    return this._formationContinueObjetFormationGeneriquesVo;
    }

    set formationContinueObjetFormationGeneriquesVo(value: Array<FormationContinueObjetFormationGeneriqueVo>) {
    this._formationContinueObjetFormationGeneriquesVo = value;
    }
    get formationContinueEnjeuxIrdsVo(): Array<FormationContinueEnjeuxIrdVo> {
    if( this._formationContinueEnjeuxIrdsVo == null )
    this._formationContinueEnjeuxIrdsVo = new Array();
    return this._formationContinueEnjeuxIrdsVo;
    }

    set formationContinueEnjeuxIrdsVo(value: Array<FormationContinueEnjeuxIrdVo>) {
    this._formationContinueEnjeuxIrdsVo = value;
    }
    get formationContinueDisciplineScientifiquesVo(): Array<FormationContinueDisciplineScientifiqueVo> {
    if( this._formationContinueDisciplineScientifiquesVo == null )
    this._formationContinueDisciplineScientifiquesVo = new Array();
    return this._formationContinueDisciplineScientifiquesVo;
    }

    set formationContinueDisciplineScientifiquesVo(value: Array<FormationContinueDisciplineScientifiqueVo>) {
    this._formationContinueDisciplineScientifiquesVo = value;
    }
    get paysFormationContinueVo(): Array<PaysFormationContinueVo> {
    if( this._paysFormationContinueVo == null )
    this._paysFormationContinueVo = new Array();
    return this._paysFormationContinueVo;
    }

    set paysFormationContinueVo(value: Array<PaysFormationContinueVo>) {
    this._paysFormationContinueVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validFormationContinueIntitule(): boolean {
    return this._validFormationContinueIntitule;
    }

    set validFormationContinueIntitule(value: boolean) {
    this._validFormationContinueIntitule = value;
    }
    get validFormationContinueFormationContinuePubliqueProfessionels(): boolean {
    return this._validFormationContinueFormationContinuePubliqueProfessionels;
    }

    set validFormationContinueFormationContinuePubliqueProfessionels(value: boolean) {
    this._validFormationContinueFormationContinuePubliqueProfessionels = value;
    }
    get validFormationContinueNombreHeuresDispenseesDansAnnee(): boolean {
    return this._validFormationContinueNombreHeuresDispenseesDansAnnee;
    }

    set validFormationContinueNombreHeuresDispenseesDansAnnee(value: boolean) {
    this._validFormationContinueNombreHeuresDispenseesDansAnnee = value;
    }
    get validFormationContinueModaliteFormationContinue(): boolean {
    return this._validFormationContinueModaliteFormationContinue;
    }

    set validFormationContinueModaliteFormationContinue(value: boolean) {
    this._validFormationContinueModaliteFormationContinue = value;
    }
    get validFormationContinueFormationContinueEnjeuxIrds(): boolean {
    return this._validFormationContinueFormationContinueEnjeuxIrds;
    }

    set validFormationContinueFormationContinueEnjeuxIrds(value: boolean) {
    this._validFormationContinueFormationContinueEnjeuxIrds = value;
    }
    get validFormationContinuePaysFormationContinue(): boolean {
    return this._validFormationContinuePaysFormationContinue;
    }

    set validFormationContinuePaysFormationContinue(value: boolean) {
    this._validFormationContinuePaysFormationContinue = value;
    }
    get validFormationContinueZoneGeographiqueFormationContinues(): boolean {
    return this._validFormationContinueZoneGeographiqueFormationContinues;
    }

    set validFormationContinueZoneGeographiqueFormationContinues(value: boolean) {
    this._validFormationContinueZoneGeographiqueFormationContinues = value;
    }
    get validFormationContinueFormationContinueCommanditaires(): boolean {
    return this._validFormationContinueFormationContinueCommanditaires;
    }

    set validFormationContinueFormationContinueCommanditaires(value: boolean) {
    this._validFormationContinueFormationContinueCommanditaires = value;
    }

    get validModaliteFormationContinueLibelle(): boolean {
    return this._validModaliteFormationContinueLibelle;
    }

    set validModaliteFormationContinueLibelle(value: boolean) {
    this._validModaliteFormationContinueLibelle = value;
    }
    get validModaliteFormationContinueCode(): boolean {
    return this._validModaliteFormationContinueCode;
    }

    set validModaliteFormationContinueCode(value: boolean) {
    this._validModaliteFormationContinueCode = value;
    }
    get validEnseignementEtFormationTempsEstimePourCetteAnnne(): boolean {
    return this._validEnseignementEtFormationTempsEstimePourCetteAnnne;
    }

    set validEnseignementEtFormationTempsEstimePourCetteAnnne(value: boolean) {
    this._validEnseignementEtFormationTempsEstimePourCetteAnnne = value;
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
