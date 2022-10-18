import {Component, OnInit, Input} from '@angular/core';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EnseignementEnjeuxIrdVo} from '../../../../../controller/model/EnseignementEnjeuxIrd.model';
import {EnseignementEnjeuxIrdService} from '../../../../../controller/service/EnseignementEnjeuxIrd.service';
import {EnseignementEtFormationVo} from '../../../../../controller/model/EnseignementEtFormation.model';
import {EnseignementEtFormationService} from '../../../../../controller/service/EnseignementEtFormation.service';
import {NatureEnseignementVo} from '../../../../../controller/model/NatureEnseignement.model';
import {NatureEnseignementService} from '../../../../../controller/service/NatureEnseignement.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {EnseignementZoneGeographiqueVo} from '../../../../../controller/model/EnseignementZoneGeographique.model';
import {EnseignementZoneGeographiqueService} from '../../../../../controller/service/EnseignementZoneGeographique.service';
import {EnseignementDisciplineScientifiqueVo} from '../../../../../controller/model/EnseignementDisciplineScientifique.model';
import {EnseignementDisciplineScientifiqueService} from '../../../../../controller/service/EnseignementDisciplineScientifique.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {ModaliteEtudeVo} from '../../../../../controller/model/ModaliteEtude.model';
import {ModaliteEtudeService} from '../../../../../controller/service/ModaliteEtude.service';
import {NiveauEtudeEnseignementVo} from '../../../../../controller/model/NiveauEtudeEnseignement.model';
import {NiveauEtudeEnseignementService} from '../../../../../controller/service/NiveauEtudeEnseignement.service';
import {EtablissementEnseignementVo} from '../../../../../controller/model/EtablissementEnseignement.model';
import {EtablissementEnseignementService} from '../../../../../controller/service/EtablissementEnseignement.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {TypeEtudeEnseignementVo} from '../../../../../controller/model/TypeEtudeEnseignement.model';
import {TypeEtudeEnseignementService} from '../../../../../controller/service/TypeEtudeEnseignement.service';
import {NiveauEtudeVo} from '../../../../../controller/model/NiveauEtude.model';
import {NiveauEtudeService} from '../../../../../controller/service/NiveauEtude.service';
import {TypeEtudeVo} from '../../../../../controller/model/TypeEtude.model';
import {TypeEtudeService} from '../../../../../controller/service/TypeEtude.service';
import {EnseignementNatureVo} from '../../../../../controller/model/EnseignementNature.model';
import {EnseignementNatureService} from '../../../../../controller/service/EnseignementNature.service';
@Component({
  selector: 'app-enseignement-create-chercheur',
  templateUrl: './enseignement-create-chercheur.component.html',
  styleUrls: ['./enseignement-create-chercheur.component.css']
})
export class EnseignementCreateChercheurComponent implements OnInit {

        selectedTypeEtudeEnseignements: TypeEtudeEnseignementVo = new TypeEtudeEnseignementVo();
        selectedEnseignementNatures: EnseignementNatureVo = new EnseignementNatureVo();
        selectedNiveauEtudeEnseignements: NiveauEtudeEnseignementVo = new NiveauEtudeEnseignementVo();
        selectedEtablissementEnseignements: EtablissementEnseignementVo = new EtablissementEnseignementVo();
        selectedEnseignementZoneGeographiques: EnseignementZoneGeographiqueVo = new EnseignementZoneGeographiqueVo();
        selectedEnseignementEnjeuxIrds: EnseignementEnjeuxIrdVo = new EnseignementEnjeuxIrdVo();
        selectedEnseignementDisciplineScientifiques: EnseignementDisciplineScientifiqueVo = new EnseignementDisciplineScientifiqueVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEnseignementIntitule = true;
   _validEnseignementNombreHeure = true;
   _validEnseignementModaliteEtude = true;
   _validEnseignementTypeEtudeEnseignements = true;
   _validEnseignementNiveauEtudeEnseignements = true;
   _validEnseignementEtablissementEnseignements = true;
   _validEnseignementEnseignementZoneGeographiques = true;
   _validEnseignementEnseignementEnjeuxIrds = true;

    _validModaliteEtudeLibelle = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;
    _validEnseignementEtFormationTempsEstimePourCetteAnnne = true;


private _typeEtudeEnseignementsVo: Array<TypeEtudeEnseignementVo> = [];
private _enseignementNaturesVo: Array<EnseignementNatureVo> = [];
private _niveauEtudeEnseignementsVo: Array<NiveauEtudeEnseignementVo> = [];
private _etablissementEnseignementsVo: Array<EtablissementEnseignementVo> = [];
private _enseignementEnjeuxIrdsVo: Array<EnseignementEnjeuxIrdVo> = [];
private _enseignementDisciplineScientifiquesVo: Array<EnseignementDisciplineScientifiqueVo> = [];

constructor(private datePipe: DatePipe, private enseignementService: EnseignementService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private modaliteEtudeService :ModaliteEtudeService
,       private enseignementEnjeuxIrdService :EnseignementEnjeuxIrdService
,       private enseignementEtFormationService :EnseignementEtFormationService
,       private niveauEtudeEnseignementService :NiveauEtudeEnseignementService
,       private etablissementEnseignementService :EtablissementEnseignementService
,       private enjeuxIrdService :EnjeuxIrdService
,       private natureEnseignementService :NatureEnseignementService
,       private etablissementService :EtablissementService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private typeEtudeEnseignementService :TypeEtudeEnseignementService
,       private niveauEtudeService :NiveauEtudeService
,       private typeEtudeService :TypeEtudeService
,       private zoneGeographiqueService :ZoneGeographiqueService
,       private paysService :PaysService
,       private enseignementZoneGeographiqueService :EnseignementZoneGeographiqueService
,       private enseignementDisciplineScientifiqueService :EnseignementDisciplineScientifiqueService
,       private enseignementNatureService :EnseignementNatureService
) {

}


// methods
ngOnInit(): void {

            this.typeEtudeService.findAll().subscribe(data => this.prepareTypeEtudeEnseignements(data));

                this.selectedTypeEtudeEnseignements.typeEtudeVo = new TypeEtudeVo();
                this.typeEtudeService.findAll().subscribe((data) => this.typeEtudes = data);


            this.natureEnseignementService.findAll().subscribe(data => this.prepareEnseignementNatures(data));

                this.selectedEnseignementNatures.natureEnseignementVo = new NatureEnseignementVo();
                this.natureEnseignementService.findAll().subscribe((data) => this.natureEnseignements = data);


            this.niveauEtudeService.findAll().subscribe(data => this.prepareNiveauEtudeEnseignements(data));

                this.selectedNiveauEtudeEnseignements.niveauEtudeVo = new NiveauEtudeVo();
                this.niveauEtudeService.findAll().subscribe((data) => this.niveauEtudes = data);


            this.etablissementService.findAll().subscribe(data => this.prepareEtablissementEnseignements(data));

                this.selectedEtablissementEnseignements.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);



                this.selectedEnseignementZoneGeographiques.zoneGeographiqueVo = new ZoneGeographiqueVo();
                this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
                this.selectedEnseignementZoneGeographiques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


            this.enjeuxIrdService.findAll().subscribe(data => this.prepareEnseignementEnjeuxIrds(data));

                this.selectedEnseignementEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareEnseignementDisciplineScientifiques(data));

                this.selectedEnseignementDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);


    this.selectedModaliteEtude = new ModaliteEtudeVo();
    this.modaliteEtudeService.findAll().subscribe((data) => this.modaliteEtudes = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
    this.enseignementEtFormationService.findAll().subscribe((data) => this.enseignementEtFormations = data);
}

         prepareTypeEtudeEnseignements(typeEtudes: Array<TypeEtudeVo>): void{
        if( typeEtudes != null){
        typeEtudes.forEach(e => {
        const typeEtudeEnseignement = new TypeEtudeEnseignementVo();
        typeEtudeEnseignement.typeEtudeVo = e;
        this.typeEtudeEnseignementsVo.push(typeEtudeEnseignement);
        });
        }
    }
         prepareEnseignementNatures(natureEnseignements: Array<NatureEnseignementVo>): void{
        if( natureEnseignements != null){
        natureEnseignements.forEach(e => {
        const enseignementNature = new EnseignementNatureVo();
        enseignementNature.natureEnseignementVo = e;
        this.enseignementNaturesVo.push(enseignementNature);
        });
        }
    }
         prepareNiveauEtudeEnseignements(niveauEtudes: Array<NiveauEtudeVo>): void{
        if( niveauEtudes != null){
        niveauEtudes.forEach(e => {
        const niveauEtudeEnseignement = new NiveauEtudeEnseignementVo();
        niveauEtudeEnseignement.niveauEtudeVo = e;
        this.niveauEtudeEnseignementsVo.push(niveauEtudeEnseignement);
        });
        }
    }
         prepareEtablissementEnseignements(etablissements: Array<EtablissementVo>): void{
        if( etablissements != null){
        etablissements.forEach(e => {
        const etablissementEnseignement = new EtablissementEnseignementVo();
        etablissementEnseignement.etablissementVo = e;
        this.etablissementEnseignementsVo.push(etablissementEnseignement);
        });
        }
    }
         prepareEnseignementEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const enseignementEnjeuxIrd = new EnseignementEnjeuxIrdVo();
        enseignementEnjeuxIrd.enjeuxIrdVo = e;
        this.enseignementEnjeuxIrdsVo.push(enseignementEnjeuxIrd);
        });
        }
    }
         prepareEnseignementDisciplineScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const enseignementDisciplineScientifique = new EnseignementDisciplineScientifiqueVo();
        enseignementDisciplineScientifique.disciplineScientifiqueVo = e;
        this.enseignementDisciplineScientifiquesVo.push(enseignementDisciplineScientifique);
        });
        }
    }

    validateEnseignementZoneGeographiques(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validEnseignementIntitule = value;
    this.validEnseignementNombreHeure = value;
    this.validEnseignementModaliteEtude = value;
    this.validEnseignementTypeEtudeEnseignements = value;
    this.validEnseignementNiveauEtudeEnseignements = value;
    this.validEnseignementEtablissementEnseignements = value;
    this.validEnseignementEnseignementZoneGeographiques = value;
    this.validEnseignementEnseignementEnjeuxIrds = value;
    }

        addEnseignementZoneGeographiques() {
        if( this.selectedEnseignement.enseignementZoneGeographiquesVo == null ){
            this.selectedEnseignement.enseignementZoneGeographiquesVo = new Array<EnseignementZoneGeographiqueVo>();
        }
       this.validateEnseignementZoneGeographiques();
       if (this.errorMessages.length === 0) {
              this.selectedEnseignement.enseignementZoneGeographiquesVo.push(this.selectedEnseignementZoneGeographiques);
              this.selectedEnseignementZoneGeographiques = new EnseignementZoneGeographiqueVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteEnseignementZoneGeographiques(p: EnseignementZoneGeographiqueVo) {
        this.selectedEnseignement.enseignementZoneGeographiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignement.enseignementZoneGeographiquesVo.splice(index, 1); }
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
     this.enseignementService.save().subscribe(enseignement=>{
       this.enseignements.push({...enseignement});
       this.createEnseignementDialog = false;
       this.submitted = false;
       this.selectedEnseignement = new EnseignementVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEnseignementIntitule();
this.validateEnseignementNombreHeure();
this.validateEnseignementModaliteEtude();
this.validateEnseignementTypeEtudeEnseignements();
this.validateEnseignementNiveauEtudeEnseignements();
this.validateEnseignementEtablissementEnseignements();
this.validateEnseignementEnseignementZoneGeographiques();
this.validateEnseignementEnseignementEnjeuxIrds();

    }

private validateEnseignementIntitule(){
        if (this.stringUtilService.isEmpty(this.selectedEnseignement.intitule)) {
            this.errorMessages.push('Intitule non valide');
            this.validEnseignementIntitule = false;
        } else {
            this.validEnseignementIntitule = true;
        }
    }
private validateEnseignementNombreHeure(){
        if (this.stringUtilService.isEmpty(this.selectedEnseignement.nombreHeure)) {
            this.errorMessages.push('Nombre heure non valide');
            this.validEnseignementNombreHeure = false;
        } else {
            this.validEnseignementNombreHeure = true;
        }
    }
private validateEnseignementModaliteEtude(){
        if (this.stringUtilService.isEmpty(this.selectedEnseignement.modaliteEtudeVo)) {
            this.errorMessages.push('Modalite etude non valide');
            this.validEnseignementModaliteEtude = false;
        } else {
            this.validEnseignementModaliteEtude = true;
        }
    }
private validateEnseignementTypeEtudeEnseignements(){
        if (this.stringUtilService.isEmpty(this.selectedEnseignement.typeEtudeEnseignementsVo)) {
            this.errorMessages.push('Type etude enseignements non valide');
            this.validEnseignementTypeEtudeEnseignements = false;
        } else {
            this.validEnseignementTypeEtudeEnseignements = true;
        }
    }
private validateEnseignementNiveauEtudeEnseignements(){
        if (this.stringUtilService.isEmpty(this.selectedEnseignement.niveauEtudeEnseignementsVo)) {
            this.errorMessages.push('Niveau etude enseignements non valide');
            this.validEnseignementNiveauEtudeEnseignements = false;
        } else {
            this.validEnseignementNiveauEtudeEnseignements = true;
        }
    }
private validateEnseignementEtablissementEnseignements(){
        if (this.stringUtilService.isEmpty(this.selectedEnseignement.etablissementEnseignementsVo)) {
            this.errorMessages.push('Etablissement enseignements non valide');
            this.validEnseignementEtablissementEnseignements = false;
        } else {
            this.validEnseignementEtablissementEnseignements = true;
        }
    }
private validateEnseignementEnseignementZoneGeographiques(){
        if (this.stringUtilService.isEmpty(this.selectedEnseignement.enseignementZoneGeographiquesVo)) {
            this.errorMessages.push('Enseignement zone geographiques non valide');
            this.validEnseignementEnseignementZoneGeographiques = false;
        } else {
            this.validEnseignementEnseignementZoneGeographiques = true;
        }
    }
private validateEnseignementEnseignementEnjeuxIrds(){
        if (this.stringUtilService.isEmpty(this.selectedEnseignement.enseignementEnjeuxIrdsVo)) {
            this.errorMessages.push('Enseignement enjeux irds non valide');
            this.validEnseignementEnseignementEnjeuxIrds = false;
        } else {
            this.validEnseignementEnseignementEnjeuxIrds = true;
        }
    }















































//openPopup
              public async openCreatemodaliteEtude(modaliteEtude: string) {
                      const isPermistted = await this.roleService.isPermitted('ModaliteEtude', 'add');
                       if(isPermistted){
         this.selectedModaliteEtude = new ModaliteEtudeVo();
        this.createModaliteEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
              public async openCreatenatureEnseignement(natureEnseignement: string) {
                      const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'add');
                       if(isPermistted){
         this.selectedNatureEnseignement = new NatureEnseignementVo();
        this.createNatureEnseignementDialog = true;
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
              public async openCreateniveauEtude(niveauEtude: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauEtude', 'add');
                       if(isPermistted){
         this.selectedNiveauEtude = new NiveauEtudeVo();
        this.createNiveauEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeEtude(typeEtude: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeEtude', 'add');
                       if(isPermistted){
         this.selectedTypeEtude = new TypeEtudeVo();
        this.createTypeEtudeDialog = true;
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
    this.createEnseignementDialog  = false;
    this.setValidation(true);
}

// getters and setters

get enseignements(): Array<EnseignementVo> {
    return this.enseignementService.enseignements;
       }
set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }

 get selectedEnseignement():EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
    set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }

   get createEnseignementDialog(): boolean {
           return this.enseignementService.createEnseignementDialog;

       }
    set createEnseignementDialog(value: boolean) {
        this.enseignementService.createEnseignementDialog= value;
       }

       get selectedModaliteEtude(): ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
      set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }
       get modaliteEtudes(): Array<ModaliteEtudeVo> {
           return this.modaliteEtudeService.modaliteEtudes;
       }
       set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }
       get createModaliteEtudeDialog(): boolean {
           return this.modaliteEtudeService.createModaliteEtudeDialog;
       }
      set createModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.createModaliteEtudeDialog= value;
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
       get selectedNatureEnseignement(): NatureEnseignementVo {
           return this.natureEnseignementService.selectedNatureEnseignement;
       }
      set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
       }
       get natureEnseignements(): Array<NatureEnseignementVo> {
           return this.natureEnseignementService.natureEnseignements;
       }
       set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
       }
       get createNatureEnseignementDialog(): boolean {
           return this.natureEnseignementService.createNatureEnseignementDialog;
       }
      set createNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.createNatureEnseignementDialog= value;
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
       get selectedNiveauEtude(): NiveauEtudeVo {
           return this.niveauEtudeService.selectedNiveauEtude;
       }
      set selectedNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.selectedNiveauEtude = value;
       }
       get niveauEtudes(): Array<NiveauEtudeVo> {
           return this.niveauEtudeService.niveauEtudes;
       }
       set niveauEtudes(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudes = value;
       }
       get createNiveauEtudeDialog(): boolean {
           return this.niveauEtudeService.createNiveauEtudeDialog;
       }
      set createNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.createNiveauEtudeDialog= value;
       }
       get selectedTypeEtude(): TypeEtudeVo {
           return this.typeEtudeService.selectedTypeEtude;
       }
      set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
       }
       get typeEtudes(): Array<TypeEtudeVo> {
           return this.typeEtudeService.typeEtudes;
       }
       set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
       }
       get createTypeEtudeDialog(): boolean {
           return this.typeEtudeService.createTypeEtudeDialog;
       }
      set createTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.createTypeEtudeDialog= value;
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


    get typeEtudeEnseignementsVo(): Array<TypeEtudeEnseignementVo> {
    if( this._typeEtudeEnseignementsVo == null )
    this._typeEtudeEnseignementsVo = new Array();
    return this._typeEtudeEnseignementsVo;
    }

    set typeEtudeEnseignementsVo(value: Array<TypeEtudeEnseignementVo>) {
    this._typeEtudeEnseignementsVo = value;
    }
    get enseignementNaturesVo(): Array<EnseignementNatureVo> {
    if( this._enseignementNaturesVo == null )
    this._enseignementNaturesVo = new Array();
    return this._enseignementNaturesVo;
    }

    set enseignementNaturesVo(value: Array<EnseignementNatureVo>) {
    this._enseignementNaturesVo = value;
    }
    get niveauEtudeEnseignementsVo(): Array<NiveauEtudeEnseignementVo> {
    if( this._niveauEtudeEnseignementsVo == null )
    this._niveauEtudeEnseignementsVo = new Array();
    return this._niveauEtudeEnseignementsVo;
    }

    set niveauEtudeEnseignementsVo(value: Array<NiveauEtudeEnseignementVo>) {
    this._niveauEtudeEnseignementsVo = value;
    }
    get etablissementEnseignementsVo(): Array<EtablissementEnseignementVo> {
    if( this._etablissementEnseignementsVo == null )
    this._etablissementEnseignementsVo = new Array();
    return this._etablissementEnseignementsVo;
    }

    set etablissementEnseignementsVo(value: Array<EtablissementEnseignementVo>) {
    this._etablissementEnseignementsVo = value;
    }
    get enseignementEnjeuxIrdsVo(): Array<EnseignementEnjeuxIrdVo> {
    if( this._enseignementEnjeuxIrdsVo == null )
    this._enseignementEnjeuxIrdsVo = new Array();
    return this._enseignementEnjeuxIrdsVo;
    }

    set enseignementEnjeuxIrdsVo(value: Array<EnseignementEnjeuxIrdVo>) {
    this._enseignementEnjeuxIrdsVo = value;
    }
    get enseignementDisciplineScientifiquesVo(): Array<EnseignementDisciplineScientifiqueVo> {
    if( this._enseignementDisciplineScientifiquesVo == null )
    this._enseignementDisciplineScientifiquesVo = new Array();
    return this._enseignementDisciplineScientifiquesVo;
    }

    set enseignementDisciplineScientifiquesVo(value: Array<EnseignementDisciplineScientifiqueVo>) {
    this._enseignementDisciplineScientifiquesVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validEnseignementIntitule(): boolean {
    return this._validEnseignementIntitule;
    }

    set validEnseignementIntitule(value: boolean) {
    this._validEnseignementIntitule = value;
    }
    get validEnseignementNombreHeure(): boolean {
    return this._validEnseignementNombreHeure;
    }

    set validEnseignementNombreHeure(value: boolean) {
    this._validEnseignementNombreHeure = value;
    }
    get validEnseignementModaliteEtude(): boolean {
    return this._validEnseignementModaliteEtude;
    }

    set validEnseignementModaliteEtude(value: boolean) {
    this._validEnseignementModaliteEtude = value;
    }
    get validEnseignementTypeEtudeEnseignements(): boolean {
    return this._validEnseignementTypeEtudeEnseignements;
    }

    set validEnseignementTypeEtudeEnseignements(value: boolean) {
    this._validEnseignementTypeEtudeEnseignements = value;
    }
    get validEnseignementNiveauEtudeEnseignements(): boolean {
    return this._validEnseignementNiveauEtudeEnseignements;
    }

    set validEnseignementNiveauEtudeEnseignements(value: boolean) {
    this._validEnseignementNiveauEtudeEnseignements = value;
    }
    get validEnseignementEtablissementEnseignements(): boolean {
    return this._validEnseignementEtablissementEnseignements;
    }

    set validEnseignementEtablissementEnseignements(value: boolean) {
    this._validEnseignementEtablissementEnseignements = value;
    }
    get validEnseignementEnseignementZoneGeographiques(): boolean {
    return this._validEnseignementEnseignementZoneGeographiques;
    }

    set validEnseignementEnseignementZoneGeographiques(value: boolean) {
    this._validEnseignementEnseignementZoneGeographiques = value;
    }
    get validEnseignementEnseignementEnjeuxIrds(): boolean {
    return this._validEnseignementEnseignementEnjeuxIrds;
    }

    set validEnseignementEnseignementEnjeuxIrds(value: boolean) {
    this._validEnseignementEnseignementEnjeuxIrds = value;
    }

    get validModaliteEtudeLibelle(): boolean {
    return this._validModaliteEtudeLibelle;
    }

    set validModaliteEtudeLibelle(value: boolean) {
    this._validModaliteEtudeLibelle = value;
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
    get validEnseignementEtFormationTempsEstimePourCetteAnnne(): boolean {
    return this._validEnseignementEtFormationTempsEstimePourCetteAnnne;
    }

    set validEnseignementEtFormationTempsEstimePourCetteAnnne(value: boolean) {
    this._validEnseignementEtFormationTempsEstimePourCetteAnnne = value;
    }

}
