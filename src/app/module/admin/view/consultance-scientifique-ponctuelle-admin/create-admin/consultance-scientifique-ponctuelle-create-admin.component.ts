import {Component, OnInit, Input} from '@angular/core';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {EtablissementConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EtablissementConsultanceScientifiquePonctuelle.model';
import {EtablissementConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EtablissementConsultanceScientifiquePonctuelle.service';
import {InstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/InstrumentIrdConsultanceScientifiquePonctuelle.model';
import {InstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/InstrumentIrdConsultanceScientifiquePonctuelle.service';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/DisciplineScientifiqueConsultanceScientifiquePonctuelle.model';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/DisciplineScientifiqueConsultanceScientifiquePonctuelle.service';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/TypeInstrumentIrdConsultanceScientifiquePonctuelle.model';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/TypeInstrumentIrdConsultanceScientifiquePonctuelle.service';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import {ExpertiseService} from '../../../../../controller/service/Expertise.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {TypeExpertiseVo} from '../../../../../controller/model/TypeExpertise.model';
import {TypeExpertiseService} from '../../../../../controller/service/TypeExpertise.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ZoneGeographiqueConsultanceScientifiquePonctuelle.model';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ZoneGeographiqueConsultanceScientifiquePonctuelle.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EnjeuxIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EnjeuxIrdConsultanceScientifiquePonctuelle.model';
import {EnjeuxIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EnjeuxIrdConsultanceScientifiquePonctuelle.service';
import {PaysCommanditaireVo} from '../../../../../controller/model/PaysCommanditaire.model';
import {PaysCommanditaireService} from '../../../../../controller/service/PaysCommanditaire.service';
@Component({
  selector: 'app-consultance-scientifique-ponctuelle-create-admin',
  templateUrl: './consultance-scientifique-ponctuelle-create-admin.component.html',
  styleUrls: ['./consultance-scientifique-ponctuelle-create-admin.component.css']
})
export class ConsultanceScientifiquePonctuelleCreateAdminComponent implements OnInit {

        selectedZoneGeographiqueConsultanceScientifiquePonctuelles: ZoneGeographiqueConsultanceScientifiquePonctuelleVo = new ZoneGeographiqueConsultanceScientifiquePonctuelleVo();
        selectedPaysCommanditaires: PaysCommanditaireVo = new PaysCommanditaireVo();
        selectedEtablissementConsultanceScientifiquePonctuelles: EtablissementConsultanceScientifiquePonctuelleVo = new EtablissementConsultanceScientifiquePonctuelleVo();
        selectedDisciplineScientifiqueConsultanceScientifiquePonctuelles: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo = new DisciplineScientifiqueConsultanceScientifiquePonctuelleVo();
        selectedEnjeuxIrdConsultanceScientifiquePonctuelles: EnjeuxIrdConsultanceScientifiquePonctuelleVo = new EnjeuxIrdConsultanceScientifiquePonctuelleVo();
        selectedInstrumentIrdConsultanceScientifiquePonctuelles: InstrumentIrdConsultanceScientifiquePonctuelleVo = new InstrumentIrdConsultanceScientifiquePonctuelleVo();
        selectedTypeInstrumentIrdConsultanceScientifiquePonctuelles: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo = new TypeInstrumentIrdConsultanceScientifiquePonctuelleVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validConsultanceScientifiquePonctuelleTypeExpertise = true;
   _validConsultanceScientifiquePonctuelleNatureExpertise = true;
   _validConsultanceScientifiquePonctuelleSujetExpertise = true;
   _validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles = true;
   _validConsultanceScientifiquePonctuellePaysCommanditaires = true;
   _validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles = true;
   _validConsultanceScientifiquePonctuelleNombreJourDedie = true;
   _validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles = true;
   _validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles = true;
   _validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd = true;
   _validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles = true;
   _validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles = true;

    _validTypeExpertiseLibelle = true;
    _validTypeExpertiseCode = true;
    _validNatureExpertiseLibelle = true;
    _validNatureExpertiseCode = true;
    _validExpertiseTempsEstimePourCetteAnnne = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _paysCommanditairesVo: Array<PaysCommanditaireVo> = [];
private _etablissementConsultanceScientifiquePonctuellesVo: Array<EtablissementConsultanceScientifiquePonctuelleVo> = [];
private _disciplineScientifiqueConsultanceScientifiquePonctuellesVo: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> = [];
private _enjeuxIrdConsultanceScientifiquePonctuellesVo: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> = [];
private _typeInstrumentIrdConsultanceScientifiquePonctuellesVo: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> = [];

constructor(private datePipe: DatePipe, private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private instrumentIrdService :InstrumentIrdService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private etablissementConsultanceScientifiquePonctuelleService :EtablissementConsultanceScientifiquePonctuelleService
,       private typeExpertiseService :TypeExpertiseService
,       private natureExpertiseService :NatureExpertiseService
,       private enjeuxIrdService :EnjeuxIrdService
,       private etablissementService :EtablissementService
,       private instrumentIrdConsultanceScientifiquePonctuelleService :InstrumentIrdConsultanceScientifiquePonctuelleService
,       private typeInstrumentIrdService :TypeInstrumentIrdService
,       private zoneGeographiqueConsultanceScientifiquePonctuelleService :ZoneGeographiqueConsultanceScientifiquePonctuelleService
,       private disciplineScientifiqueConsultanceScientifiquePonctuelleService :DisciplineScientifiqueConsultanceScientifiquePonctuelleService
,       private typeInstrumentIrdConsultanceScientifiquePonctuelleService :TypeInstrumentIrdConsultanceScientifiquePonctuelleService
,       private expertiseService :ExpertiseService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private enjeuxIrdConsultanceScientifiquePonctuelleService :EnjeuxIrdConsultanceScientifiquePonctuelleService
,       private paysCommanditaireService :PaysCommanditaireService
,       private zoneGeographiqueService :ZoneGeographiqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {


                this.selectedZoneGeographiqueConsultanceScientifiquePonctuelles.zoneGeographiqueVo = new ZoneGeographiqueVo();
                this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
                this.selectedZoneGeographiqueConsultanceScientifiquePonctuelles.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


            this.paysService.findAll().subscribe(data => this.preparePaysCommanditaires(data));

                this.selectedPaysCommanditaires.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


            this.etablissementService.findAll().subscribe(data => this.prepareEtablissementConsultanceScientifiquePonctuelles(data));

                this.selectedEtablissementConsultanceScientifiquePonctuelles.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);


            this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareDisciplineScientifiqueConsultanceScientifiquePonctuelles(data));

                this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelles.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);


            this.enjeuxIrdService.findAll().subscribe(data => this.prepareEnjeuxIrdConsultanceScientifiquePonctuelles(data));

                this.selectedEnjeuxIrdConsultanceScientifiquePonctuelles.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);



                this.selectedInstrumentIrdConsultanceScientifiquePonctuelles.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);


            this.typeInstrumentIrdService.findAll().subscribe(data => this.prepareTypeInstrumentIrdConsultanceScientifiquePonctuelles(data));

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

         preparePaysCommanditaires(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const paysCommanditaire = new PaysCommanditaireVo();
        paysCommanditaire.paysVo = e;
        this.paysCommanditairesVo.push(paysCommanditaire);
        });
        }
    }
         prepareEtablissementConsultanceScientifiquePonctuelles(etablissements: Array<EtablissementVo>): void{
        if( etablissements != null){
        etablissements.forEach(e => {
        const etablissementConsultanceScientifiquePonctuelle = new EtablissementConsultanceScientifiquePonctuelleVo();
        etablissementConsultanceScientifiquePonctuelle.etablissementVo = e;
        this.etablissementConsultanceScientifiquePonctuellesVo.push(etablissementConsultanceScientifiquePonctuelle);
        });
        }
    }
         prepareDisciplineScientifiqueConsultanceScientifiquePonctuelles(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const disciplineScientifiqueConsultanceScientifiquePonctuelle = new DisciplineScientifiqueConsultanceScientifiquePonctuelleVo();
        disciplineScientifiqueConsultanceScientifiquePonctuelle.disciplineScientifiqueVo = e;
        this.disciplineScientifiqueConsultanceScientifiquePonctuellesVo.push(disciplineScientifiqueConsultanceScientifiquePonctuelle);
        });
        }
    }
         prepareEnjeuxIrdConsultanceScientifiquePonctuelles(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const enjeuxIrdConsultanceScientifiquePonctuelle = new EnjeuxIrdConsultanceScientifiquePonctuelleVo();
        enjeuxIrdConsultanceScientifiquePonctuelle.enjeuxIrdVo = e;
        this.enjeuxIrdConsultanceScientifiquePonctuellesVo.push(enjeuxIrdConsultanceScientifiquePonctuelle);
        });
        }
    }
         prepareTypeInstrumentIrdConsultanceScientifiquePonctuelles(typeInstrumentIrds: Array<TypeInstrumentIrdVo>): void{
        if( typeInstrumentIrds != null){
        typeInstrumentIrds.forEach(e => {
        const typeInstrumentIrdConsultanceScientifiquePonctuelle = new TypeInstrumentIrdConsultanceScientifiquePonctuelleVo();
        typeInstrumentIrdConsultanceScientifiquePonctuelle.typeInstrumentIrdVo = e;
        this.typeInstrumentIrdConsultanceScientifiquePonctuellesVo.push(typeInstrumentIrdConsultanceScientifiquePonctuelle);
        });
        }
    }

    validateZoneGeographiqueConsultanceScientifiquePonctuelles(){
    this.errorMessages = new Array();
    }
    validateInstrumentIrdConsultanceScientifiquePonctuelles(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validConsultanceScientifiquePonctuelleTypeExpertise = value;
    this.validConsultanceScientifiquePonctuelleNatureExpertise = value;
    this.validConsultanceScientifiquePonctuelleSujetExpertise = value;
    this.validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles = value;
    this.validConsultanceScientifiquePonctuellePaysCommanditaires = value;
    this.validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles = value;
    this.validConsultanceScientifiquePonctuelleNombreJourDedie = value;
    this.validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles = value;
    this.validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles = value;
    this.validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd = value;
    this.validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles = value;
    this.validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles = value;
    }

        addZoneGeographiqueConsultanceScientifiquePonctuelles() {
        if( this.selectedConsultanceScientifiquePonctuelle.zoneGeographiqueConsultanceScientifiquePonctuellesVo == null ){
            this.selectedConsultanceScientifiquePonctuelle.zoneGeographiqueConsultanceScientifiquePonctuellesVo = new Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>();
        }
       this.validateZoneGeographiqueConsultanceScientifiquePonctuelles();
       if (this.errorMessages.length === 0) {
              this.selectedConsultanceScientifiquePonctuelle.zoneGeographiqueConsultanceScientifiquePonctuellesVo.push(this.selectedZoneGeographiqueConsultanceScientifiquePonctuelles);
              this.selectedZoneGeographiqueConsultanceScientifiquePonctuelles = new ZoneGeographiqueConsultanceScientifiquePonctuelleVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteZoneGeographiqueConsultanceScientifiquePonctuelles(p: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {
        this.selectedConsultanceScientifiquePonctuelle.zoneGeographiqueConsultanceScientifiquePonctuellesVo.forEach((element, index) => {
            if (element === p) { this.selectedConsultanceScientifiquePonctuelle.zoneGeographiqueConsultanceScientifiquePonctuellesVo.splice(index, 1); }
        });
    }
        addInstrumentIrdConsultanceScientifiquePonctuelles() {
        if( this.selectedConsultanceScientifiquePonctuelle.instrumentIrdConsultanceScientifiquePonctuellesVo == null ){
            this.selectedConsultanceScientifiquePonctuelle.instrumentIrdConsultanceScientifiquePonctuellesVo = new Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>();
        }
       this.validateInstrumentIrdConsultanceScientifiquePonctuelles();
       if (this.errorMessages.length === 0) {
              this.selectedConsultanceScientifiquePonctuelle.instrumentIrdConsultanceScientifiquePonctuellesVo.push(this.selectedInstrumentIrdConsultanceScientifiquePonctuelles);
              this.selectedInstrumentIrdConsultanceScientifiquePonctuelles = new InstrumentIrdConsultanceScientifiquePonctuelleVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteInstrumentIrdConsultanceScientifiquePonctuelles(p: InstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.selectedConsultanceScientifiquePonctuelle.instrumentIrdConsultanceScientifiquePonctuellesVo.forEach((element, index) => {
            if (element === p) { this.selectedConsultanceScientifiquePonctuelle.instrumentIrdConsultanceScientifiquePonctuellesVo.splice(index, 1); }
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
     this.consultanceScientifiquePonctuelleService.save().subscribe(consultanceScientifiquePonctuelle=>{
       this.consultanceScientifiquePonctuelles.push({...consultanceScientifiquePonctuelle});
       this.createConsultanceScientifiquePonctuelleDialog = false;
       this.submitted = false;
       this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateConsultanceScientifiquePonctuelleTypeExpertise();
this.validateConsultanceScientifiquePonctuelleNatureExpertise();
this.validateConsultanceScientifiquePonctuelleSujetExpertise();
this.validateConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles();
this.validateConsultanceScientifiquePonctuellePaysCommanditaires();
this.validateConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles();
this.validateConsultanceScientifiquePonctuelleNombreJourDedie();
this.validateConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles();
this.validateConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles();
this.validateConsultanceScientifiquePonctuelleRelieeInstrumentsIrd();
this.validateConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles();
this.validateConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles();

    }

private validateConsultanceScientifiquePonctuelleTypeExpertise(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.typeExpertiseVo)) {
            this.errorMessages.push('Type expertise non valide');
            this.validConsultanceScientifiquePonctuelleTypeExpertise = false;
        } else {
            this.validConsultanceScientifiquePonctuelleTypeExpertise = true;
        }
    }
private validateConsultanceScientifiquePonctuelleNatureExpertise(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.natureExpertiseVo)) {
            this.errorMessages.push('Nature expertise non valide');
            this.validConsultanceScientifiquePonctuelleNatureExpertise = false;
        } else {
            this.validConsultanceScientifiquePonctuelleNatureExpertise = true;
        }
    }
private validateConsultanceScientifiquePonctuelleSujetExpertise(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.sujetExpertise)) {
            this.errorMessages.push('Sujet expertise non valide');
            this.validConsultanceScientifiquePonctuelleSujetExpertise = false;
        } else {
            this.validConsultanceScientifiquePonctuelleSujetExpertise = true;
        }
    }
private validateConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.zoneGeographiqueConsultanceScientifiquePonctuellesVo)) {
            this.errorMessages.push('Zone geographique consultance scientifique ponctuelles non valide');
            this.validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles = false;
        } else {
            this.validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles = true;
        }
    }
private validateConsultanceScientifiquePonctuellePaysCommanditaires(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.paysCommanditairesVo)) {
            this.errorMessages.push('Pays commanditaires non valide');
            this.validConsultanceScientifiquePonctuellePaysCommanditaires = false;
        } else {
            this.validConsultanceScientifiquePonctuellePaysCommanditaires = true;
        }
    }
private validateConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.etablissementConsultanceScientifiquePonctuellesVo)) {
            this.errorMessages.push('Etablissement consultance scientifique ponctuelles non valide');
            this.validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles = false;
        } else {
            this.validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles = true;
        }
    }
private validateConsultanceScientifiquePonctuelleNombreJourDedie(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.nombreJourDedie)) {
            this.errorMessages.push('Nombre jour dedie non valide');
            this.validConsultanceScientifiquePonctuelleNombreJourDedie = false;
        } else {
            this.validConsultanceScientifiquePonctuelleNombreJourDedie = true;
        }
    }
private validateConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.disciplineScientifiqueConsultanceScientifiquePonctuellesVo)) {
            this.errorMessages.push('Discipline scientifique consultance scientifique ponctuelles non valide');
            this.validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles = false;
        } else {
            this.validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles = true;
        }
    }
private validateConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.enjeuxIrdConsultanceScientifiquePonctuellesVo)) {
            this.errorMessages.push('Enjeux ird consultance scientifique ponctuelles non valide');
            this.validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles = false;
        } else {
            this.validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles = true;
        }
    }
private validateConsultanceScientifiquePonctuelleRelieeInstrumentsIrd(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.relieeInstrumentsIrd)) {
            this.errorMessages.push('Reliee instruments ird non valide');
            this.validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd = false;
        } else {
            this.validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd = true;
        }
    }
private validateConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.instrumentIrdConsultanceScientifiquePonctuellesVo)) {
            this.errorMessages.push('Instrument ird consultance scientifique ponctuelles non valide');
            this.validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles = false;
        } else {
            this.validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles = true;
        }
    }
private validateConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles(){
        if (this.stringUtilService.isEmpty(this.selectedConsultanceScientifiquePonctuelle.typeInstrumentIrdConsultanceScientifiquePonctuellesVo)) {
            this.errorMessages.push('Type instrument ird consultance scientifique ponctuelles non valide');
            this.validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles = false;
        } else {
            this.validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles = true;
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

hideCreateDialog(){
    this.createConsultanceScientifiquePonctuelleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get consultanceScientifiquePonctuelles(): Array<ConsultanceScientifiquePonctuelleVo> {
    return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles;
       }
set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles = value;
       }

 get selectedConsultanceScientifiquePonctuelle():ConsultanceScientifiquePonctuelleVo {
           return this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle;
       }
    set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle = value;
       }

   get createConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog;

       }
    set createConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog= value;
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


    get paysCommanditairesVo(): Array<PaysCommanditaireVo> {
    if( this._paysCommanditairesVo == null )
    this._paysCommanditairesVo = new Array();
    return this._paysCommanditairesVo;
    }

    set paysCommanditairesVo(value: Array<PaysCommanditaireVo>) {
    this._paysCommanditairesVo = value;
    }
    get etablissementConsultanceScientifiquePonctuellesVo(): Array<EtablissementConsultanceScientifiquePonctuelleVo> {
    if( this._etablissementConsultanceScientifiquePonctuellesVo == null )
    this._etablissementConsultanceScientifiquePonctuellesVo = new Array();
    return this._etablissementConsultanceScientifiquePonctuellesVo;
    }

    set etablissementConsultanceScientifiquePonctuellesVo(value: Array<EtablissementConsultanceScientifiquePonctuelleVo>) {
    this._etablissementConsultanceScientifiquePonctuellesVo = value;
    }
    get disciplineScientifiqueConsultanceScientifiquePonctuellesVo(): Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> {
    if( this._disciplineScientifiqueConsultanceScientifiquePonctuellesVo == null )
    this._disciplineScientifiqueConsultanceScientifiquePonctuellesVo = new Array();
    return this._disciplineScientifiqueConsultanceScientifiquePonctuellesVo;
    }

    set disciplineScientifiqueConsultanceScientifiquePonctuellesVo(value: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>) {
    this._disciplineScientifiqueConsultanceScientifiquePonctuellesVo = value;
    }
    get enjeuxIrdConsultanceScientifiquePonctuellesVo(): Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> {
    if( this._enjeuxIrdConsultanceScientifiquePonctuellesVo == null )
    this._enjeuxIrdConsultanceScientifiquePonctuellesVo = new Array();
    return this._enjeuxIrdConsultanceScientifiquePonctuellesVo;
    }

    set enjeuxIrdConsultanceScientifiquePonctuellesVo(value: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>) {
    this._enjeuxIrdConsultanceScientifiquePonctuellesVo = value;
    }
    get typeInstrumentIrdConsultanceScientifiquePonctuellesVo(): Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> {
    if( this._typeInstrumentIrdConsultanceScientifiquePonctuellesVo == null )
    this._typeInstrumentIrdConsultanceScientifiquePonctuellesVo = new Array();
    return this._typeInstrumentIrdConsultanceScientifiquePonctuellesVo;
    }

    set typeInstrumentIrdConsultanceScientifiquePonctuellesVo(value: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>) {
    this._typeInstrumentIrdConsultanceScientifiquePonctuellesVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validConsultanceScientifiquePonctuelleTypeExpertise(): boolean {
    return this._validConsultanceScientifiquePonctuelleTypeExpertise;
    }

    set validConsultanceScientifiquePonctuelleTypeExpertise(value: boolean) {
    this._validConsultanceScientifiquePonctuelleTypeExpertise = value;
    }
    get validConsultanceScientifiquePonctuelleNatureExpertise(): boolean {
    return this._validConsultanceScientifiquePonctuelleNatureExpertise;
    }

    set validConsultanceScientifiquePonctuelleNatureExpertise(value: boolean) {
    this._validConsultanceScientifiquePonctuelleNatureExpertise = value;
    }
    get validConsultanceScientifiquePonctuelleSujetExpertise(): boolean {
    return this._validConsultanceScientifiquePonctuelleSujetExpertise;
    }

    set validConsultanceScientifiquePonctuelleSujetExpertise(value: boolean) {
    this._validConsultanceScientifiquePonctuelleSujetExpertise = value;
    }
    get validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles = value;
    }
    get validConsultanceScientifiquePonctuellePaysCommanditaires(): boolean {
    return this._validConsultanceScientifiquePonctuellePaysCommanditaires;
    }

    set validConsultanceScientifiquePonctuellePaysCommanditaires(value: boolean) {
    this._validConsultanceScientifiquePonctuellePaysCommanditaires = value;
    }
    get validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles = value;
    }
    get validConsultanceScientifiquePonctuelleNombreJourDedie(): boolean {
    return this._validConsultanceScientifiquePonctuelleNombreJourDedie;
    }

    set validConsultanceScientifiquePonctuelleNombreJourDedie(value: boolean) {
    this._validConsultanceScientifiquePonctuelleNombreJourDedie = value;
    }
    get validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles = value;
    }
    get validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles = value;
    }
    get validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd(): boolean {
    return this._validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd;
    }

    set validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd(value: boolean) {
    this._validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd = value;
    }
    get validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles = value;
    }
    get validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles(): boolean {
    return this._validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles;
    }

    set validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles(value: boolean) {
    this._validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles = value;
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
