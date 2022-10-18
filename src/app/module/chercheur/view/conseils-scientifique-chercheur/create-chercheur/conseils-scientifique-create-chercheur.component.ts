import {Component, OnInit, Input} from '@angular/core';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EnjeuxIrdConseilsScientifiqueVo} from '../../../../../controller/model/EnjeuxIrdConseilsScientifique.model';
import {EnjeuxIrdConseilsScientifiqueService} from '../../../../../controller/service/EnjeuxIrdConseilsScientifique.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {DisciplineScientifiqueConseilsScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilsScientifique.model';
import {DisciplineScientifiqueConseilsScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueConseilsScientifique.service';
import {TypeExpertiseVo} from '../../../../../controller/model/TypeExpertise.model';
import {TypeExpertiseService} from '../../../../../controller/service/TypeExpertise.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EtablissementConseilsScientifiqueVo} from '../../../../../controller/model/EtablissementConseilsScientifique.model';
import {EtablissementConseilsScientifiqueService} from '../../../../../controller/service/EtablissementConseilsScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import {ExpertiseService} from '../../../../../controller/service/Expertise.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {ZoneGeographiqueConseilsScientifiqueVo} from '../../../../../controller/model/ZoneGeographiqueConseilsScientifique.model';
import {ZoneGeographiqueConseilsScientifiqueService} from '../../../../../controller/service/ZoneGeographiqueConseilsScientifique.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-conseils-scientifique-create-chercheur',
  templateUrl: './conseils-scientifique-create-chercheur.component.html',
  styleUrls: ['./conseils-scientifique-create-chercheur.component.css']
})
export class ConseilsScientifiqueCreateChercheurComponent implements OnInit {

        selectedEtablissementConseilsScientifiques: EtablissementConseilsScientifiqueVo = new EtablissementConseilsScientifiqueVo();
        selectedZoneGeographiqueConseilsScientifiques: ZoneGeographiqueConseilsScientifiqueVo = new ZoneGeographiqueConseilsScientifiqueVo();
        selectedEnjeuxIrdConseilsScientifiques: EnjeuxIrdConseilsScientifiqueVo = new EnjeuxIrdConseilsScientifiqueVo();
        selectedDisciplineScientifiqueConseilsScientifiques: DisciplineScientifiqueConseilsScientifiqueVo = new DisciplineScientifiqueConseilsScientifiqueVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validConseilsScientifiqueNatureExpertise = true;
   _validConseilsScientifiqueIntitule = true;
   _validConseilsScientifiqueEtablissementConseilsScientifiques = true;
   _validConseilsScientifiqueTypeExpertise = true;
   _validConseilsScientifiqueNombreJoursConsacres = true;

    _validNatureExpertiseLibelle = true;
    _validNatureExpertiseCode = true;
    _validTypeExpertiseLibelle = true;
    _validTypeExpertiseCode = true;
    _validExpertiseTempsEstimePourCetteAnnne = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _etablissementConseilsScientifiquesVo: Array<EtablissementConseilsScientifiqueVo> = [];
private _enjeuxIrdConseilsScientifiquesVo: Array<EnjeuxIrdConseilsScientifiqueVo> = [];
private _disciplineScientifiqueConseilsScientifiquesVo: Array<DisciplineScientifiqueConseilsScientifiqueVo> = [];

constructor(private datePipe: DatePipe, private conseilsScientifiqueService: ConseilsScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private enjeuxIrdConseilsScientifiqueService :EnjeuxIrdConseilsScientifiqueService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private disciplineScientifiqueConseilsScientifiqueService :DisciplineScientifiqueConseilsScientifiqueService
,       private typeExpertiseService :TypeExpertiseService
,       private natureExpertiseService :NatureExpertiseService
,       private enjeuxIrdService :EnjeuxIrdService
,       private etablissementConseilsScientifiqueService :EtablissementConseilsScientifiqueService
,       private etablissementService :EtablissementService
,       private expertiseService :ExpertiseService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private zoneGeographiqueConseilsScientifiqueService :ZoneGeographiqueConseilsScientifiqueService
,       private zoneGeographiqueService :ZoneGeographiqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

            this.etablissementService.findAll().subscribe(data => this.prepareEtablissementConseilsScientifiques(data));

                this.selectedEtablissementConseilsScientifiques.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);



                this.selectedZoneGeographiqueConseilsScientifiques.zoneGeographiqueVo = new ZoneGeographiqueVo();
                this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
                this.selectedZoneGeographiqueConseilsScientifiques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


            this.enjeuxIrdService.findAll().subscribe(data => this.prepareEnjeuxIrdConseilsScientifiques(data));

                this.selectedEnjeuxIrdConseilsScientifiques.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareDisciplineScientifiqueConseilsScientifiques(data));

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

         prepareEtablissementConseilsScientifiques(etablissements: Array<EtablissementVo>): void{
        if( etablissements != null){
        etablissements.forEach(e => {
        const etablissementConseilsScientifique = new EtablissementConseilsScientifiqueVo();
        etablissementConseilsScientifique.etablissementVo = e;
        this.etablissementConseilsScientifiquesVo.push(etablissementConseilsScientifique);
        });
        }
    }
         prepareEnjeuxIrdConseilsScientifiques(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const enjeuxIrdConseilsScientifique = new EnjeuxIrdConseilsScientifiqueVo();
        enjeuxIrdConseilsScientifique.enjeuxIrdVo = e;
        this.enjeuxIrdConseilsScientifiquesVo.push(enjeuxIrdConseilsScientifique);
        });
        }
    }
         prepareDisciplineScientifiqueConseilsScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const disciplineScientifiqueConseilsScientifique = new DisciplineScientifiqueConseilsScientifiqueVo();
        disciplineScientifiqueConseilsScientifique.disciplineScientifiqueVo = e;
        this.disciplineScientifiqueConseilsScientifiquesVo.push(disciplineScientifiqueConseilsScientifique);
        });
        }
    }

    validateZoneGeographiqueConseilsScientifiques(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validConseilsScientifiqueNatureExpertise = value;
    this.validConseilsScientifiqueIntitule = value;
    this.validConseilsScientifiqueEtablissementConseilsScientifiques = value;
    this.validConseilsScientifiqueTypeExpertise = value;
    this.validConseilsScientifiqueNombreJoursConsacres = value;
    }

        addZoneGeographiqueConseilsScientifiques() {
        if( this.selectedConseilsScientifique.zoneGeographiqueConseilsScientifiquesVo == null ){
            this.selectedConseilsScientifique.zoneGeographiqueConseilsScientifiquesVo = new Array<ZoneGeographiqueConseilsScientifiqueVo>();
        }
       this.validateZoneGeographiqueConseilsScientifiques();
       if (this.errorMessages.length === 0) {
              this.selectedConseilsScientifique.zoneGeographiqueConseilsScientifiquesVo.push(this.selectedZoneGeographiqueConseilsScientifiques);
              this.selectedZoneGeographiqueConseilsScientifiques = new ZoneGeographiqueConseilsScientifiqueVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteZoneGeographiqueConseilsScientifiques(p: ZoneGeographiqueConseilsScientifiqueVo) {
        this.selectedConseilsScientifique.zoneGeographiqueConseilsScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedConseilsScientifique.zoneGeographiqueConseilsScientifiquesVo.splice(index, 1); }
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
     this.conseilsScientifiqueService.save().subscribe(conseilsScientifique=>{
       this.conseilsScientifiques.push({...conseilsScientifique});
       this.createConseilsScientifiqueDialog = false;
       this.submitted = false;
       this.selectedConseilsScientifique = new ConseilsScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateConseilsScientifiqueNatureExpertise();
this.validateConseilsScientifiqueIntitule();
this.validateConseilsScientifiqueEtablissementConseilsScientifiques();
this.validateConseilsScientifiqueTypeExpertise();
this.validateConseilsScientifiqueNombreJoursConsacres();

    }

private validateConseilsScientifiqueNatureExpertise(){
        if (this.stringUtilService.isEmpty(this.selectedConseilsScientifique.natureExpertiseVo)) {
            this.errorMessages.push('Nature expertise non valide');
            this.validConseilsScientifiqueNatureExpertise = false;
        } else {
            this.validConseilsScientifiqueNatureExpertise = true;
        }
    }
private validateConseilsScientifiqueIntitule(){
        if (this.stringUtilService.isEmpty(this.selectedConseilsScientifique.intitule)) {
            this.errorMessages.push('Intitule non valide');
            this.validConseilsScientifiqueIntitule = false;
        } else {
            this.validConseilsScientifiqueIntitule = true;
        }
    }
private validateConseilsScientifiqueEtablissementConseilsScientifiques(){
        if (this.stringUtilService.isEmpty(this.selectedConseilsScientifique.etablissementConseilsScientifiquesVo)) {
            this.errorMessages.push('Etablissement conseils scientifiques non valide');
            this.validConseilsScientifiqueEtablissementConseilsScientifiques = false;
        } else {
            this.validConseilsScientifiqueEtablissementConseilsScientifiques = true;
        }
    }
private validateConseilsScientifiqueTypeExpertise(){
        if (this.stringUtilService.isEmpty(this.selectedConseilsScientifique.typeExpertiseVo)) {
            this.errorMessages.push('Type expertise non valide');
            this.validConseilsScientifiqueTypeExpertise = false;
        } else {
            this.validConseilsScientifiqueTypeExpertise = true;
        }
    }
private validateConseilsScientifiqueNombreJoursConsacres(){
        if (this.stringUtilService.isEmpty(this.selectedConseilsScientifique.nombreJoursConsacres)) {
            this.errorMessages.push('Nombre jours consacres non valide');
            this.validConseilsScientifiqueNombreJoursConsacres = false;
        } else {
            this.validConseilsScientifiqueNombreJoursConsacres = true;
        }
    }
































//openPopup
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

hideCreateDialog(){
    this.createConseilsScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get conseilsScientifiques(): Array<ConseilsScientifiqueVo> {
    return this.conseilsScientifiqueService.conseilsScientifiques;
       }
set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }

 get selectedConseilsScientifique():ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
    set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }

   get createConseilsScientifiqueDialog(): boolean {
           return this.conseilsScientifiqueService.createConseilsScientifiqueDialog;

       }
    set createConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.createConseilsScientifiqueDialog= value;
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


    get etablissementConseilsScientifiquesVo(): Array<EtablissementConseilsScientifiqueVo> {
    if( this._etablissementConseilsScientifiquesVo == null )
    this._etablissementConseilsScientifiquesVo = new Array();
    return this._etablissementConseilsScientifiquesVo;
    }

    set etablissementConseilsScientifiquesVo(value: Array<EtablissementConseilsScientifiqueVo>) {
    this._etablissementConseilsScientifiquesVo = value;
    }
    get enjeuxIrdConseilsScientifiquesVo(): Array<EnjeuxIrdConseilsScientifiqueVo> {
    if( this._enjeuxIrdConseilsScientifiquesVo == null )
    this._enjeuxIrdConseilsScientifiquesVo = new Array();
    return this._enjeuxIrdConseilsScientifiquesVo;
    }

    set enjeuxIrdConseilsScientifiquesVo(value: Array<EnjeuxIrdConseilsScientifiqueVo>) {
    this._enjeuxIrdConseilsScientifiquesVo = value;
    }
    get disciplineScientifiqueConseilsScientifiquesVo(): Array<DisciplineScientifiqueConseilsScientifiqueVo> {
    if( this._disciplineScientifiqueConseilsScientifiquesVo == null )
    this._disciplineScientifiqueConseilsScientifiquesVo = new Array();
    return this._disciplineScientifiqueConseilsScientifiquesVo;
    }

    set disciplineScientifiqueConseilsScientifiquesVo(value: Array<DisciplineScientifiqueConseilsScientifiqueVo>) {
    this._disciplineScientifiqueConseilsScientifiquesVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validConseilsScientifiqueNatureExpertise(): boolean {
    return this._validConseilsScientifiqueNatureExpertise;
    }

    set validConseilsScientifiqueNatureExpertise(value: boolean) {
    this._validConseilsScientifiqueNatureExpertise = value;
    }
    get validConseilsScientifiqueIntitule(): boolean {
    return this._validConseilsScientifiqueIntitule;
    }

    set validConseilsScientifiqueIntitule(value: boolean) {
    this._validConseilsScientifiqueIntitule = value;
    }
    get validConseilsScientifiqueEtablissementConseilsScientifiques(): boolean {
    return this._validConseilsScientifiqueEtablissementConseilsScientifiques;
    }

    set validConseilsScientifiqueEtablissementConseilsScientifiques(value: boolean) {
    this._validConseilsScientifiqueEtablissementConseilsScientifiques = value;
    }
    get validConseilsScientifiqueTypeExpertise(): boolean {
    return this._validConseilsScientifiqueTypeExpertise;
    }

    set validConseilsScientifiqueTypeExpertise(value: boolean) {
    this._validConseilsScientifiqueTypeExpertise = value;
    }
    get validConseilsScientifiqueNombreJoursConsacres(): boolean {
    return this._validConseilsScientifiqueNombreJoursConsacres;
    }

    set validConseilsScientifiqueNombreJoursConsacres(value: boolean) {
    this._validConseilsScientifiqueNombreJoursConsacres = value;
    }

    get validNatureExpertiseLibelle(): boolean {
    return this._validNatureExpertiseLibelle;
    }

    set validNatureExpertiseLibelle(value: boolean) {
    this._validNatureExpertiseLibelle = value;
    }
    get validNatureExpertiseCode(): boolean {
    return this._validNatureExpertiseCode;
    }

    set validNatureExpertiseCode(value: boolean) {
    this._validNatureExpertiseCode = value;
    }
    get validTypeExpertiseLibelle(): boolean {
    return this._validTypeExpertiseLibelle;
    }

    set validTypeExpertiseLibelle(value: boolean) {
    this._validTypeExpertiseLibelle = value;
    }
    get validTypeExpertiseCode(): boolean {
    return this._validTypeExpertiseCode;
    }

    set validTypeExpertiseCode(value: boolean) {
    this._validTypeExpertiseCode = value;
    }
    get validExpertiseTempsEstimePourCetteAnnne(): boolean {
    return this._validExpertiseTempsEstimePourCetteAnnne;
    }

    set validExpertiseTempsEstimePourCetteAnnne(value: boolean) {
    this._validExpertiseTempsEstimePourCetteAnnne = value;
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
