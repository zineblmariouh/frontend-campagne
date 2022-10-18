import {Component, OnInit, Input} from '@angular/core';
import {ExpertiseService} from '../../../../../controller/service/Expertise.service';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';

import { TokenService } from 'src/app/controller/service/Token.service';

import {EtablissementComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EtablissementComiteEtCommissionEvaluation.model';
import {EtablissementComiteEtCommissionEvaluationService} from '../../../../../controller/service/EtablissementComiteEtCommissionEvaluation.service';
import {TypeExpertiseEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluation.model';
import {TypeExpertiseEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluation.service';
import {EtablissementConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EtablissementConsultanceScientifiquePonctuelle.model';
import {EtablissementConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EtablissementConsultanceScientifiquePonctuelle.service';
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {InstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/InstrumentIrdConsultanceScientifiquePonctuelle.model';
import {InstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/InstrumentIrdConsultanceScientifiquePonctuelle.service';
import {DisciplineScientifiqueComiteEtCommissionEvaluationVo} from '../../../../../controller/model/DisciplineScientifiqueComiteEtCommissionEvaluation.model';
import {DisciplineScientifiqueComiteEtCommissionEvaluationService} from '../../../../../controller/service/DisciplineScientifiqueComiteEtCommissionEvaluation.service';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/DisciplineScientifiqueConsultanceScientifiquePonctuelle.model';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/DisciplineScientifiqueConsultanceScientifiquePonctuelle.service';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/TypeInstrumentIrdConsultanceScientifiquePonctuelle.model';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/TypeInstrumentIrdConsultanceScientifiquePonctuelle.service';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {InstrumentIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/InstrumentIrdComiteEtCommissionEvaluation.model';
import {InstrumentIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/InstrumentIrdComiteEtCommissionEvaluation.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnjeuxIrdConseilsScientifiqueVo} from '../../../../../controller/model/EnjeuxIrdConseilsScientifique.model';
import {EnjeuxIrdConseilsScientifiqueService} from '../../../../../controller/service/EnjeuxIrdConseilsScientifique.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {TypeExpertiseVo} from '../../../../../controller/model/TypeExpertise.model';
import {TypeExpertiseService} from '../../../../../controller/service/TypeExpertise.service';
import {DisciplineScientifiqueConseilsScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilsScientifique.model';
import {DisciplineScientifiqueConseilsScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueConseilsScientifique.service';
import {RoleComiteEtCommissionEvaluationVo} from '../../../../../controller/model/RoleComiteEtCommissionEvaluation.model';
import {RoleComiteEtCommissionEvaluationService} from '../../../../../controller/service/RoleComiteEtCommissionEvaluation.service';
import {RoleEvaluationVo} from '../../../../../controller/model/RoleEvaluation.model';
import {RoleEvaluationService} from '../../../../../controller/service/RoleEvaluation.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {EtablissementConseilsScientifiqueVo} from '../../../../../controller/model/EtablissementConseilsScientifique.model';
import {EtablissementConseilsScientifiqueService} from '../../../../../controller/service/EtablissementConseilsScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ZoneGeographiqueConsultanceScientifiquePonctuelle.model';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ZoneGeographiqueConsultanceScientifiquePonctuelle.service';
import {EnjeuxIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EnjeuxIrdComiteEtCommissionEvaluation.model';
import {EnjeuxIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/EnjeuxIrdComiteEtCommissionEvaluation.service';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluationComiteEtCommissionEvaluation.model';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluationComiteEtCommissionEvaluation.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EnjeuxIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EnjeuxIrdConsultanceScientifiquePonctuelle.model';
import {EnjeuxIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EnjeuxIrdConsultanceScientifiquePonctuelle.service';
import {ZoneGeographiqueConseilsScientifiqueVo} from '../../../../../controller/model/ZoneGeographiqueConseilsScientifique.model';
import {ZoneGeographiqueConseilsScientifiqueService} from '../../../../../controller/service/ZoneGeographiqueConseilsScientifique.service';
import {PaysCommanditaireVo} from '../../../../../controller/model/PaysCommanditaire.model';
import {PaysCommanditaireService} from '../../../../../controller/service/PaysCommanditaire.service';
@Component({
  selector: 'app-expertise-create-chercheur',
  templateUrl: './expertise-create-chercheur.component.html',
  styleUrls: ['./expertise-create-chercheur.component.css']
})
export class ExpertiseCreateChercheurComponent implements OnInit {

        selectedConseilsScientifiques: ConseilsScientifiqueVo = new ConseilsScientifiqueVo();
        selectedConsultanceScientifiquePonctuelles: ConsultanceScientifiquePonctuelleVo = new ConsultanceScientifiquePonctuelleVo();
        selectedComiteEtCommissionEvaluations: ComiteEtCommissionEvaluationVo = new ComiteEtCommissionEvaluationVo();
    msgsContents: string;
    info: string;
    chercheurVo: ChercheurVo;
    isLoaded: boolean = false;
    isBlocked: boolean = true;
    campagneVo: CampagneVo;
    data: any;
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validExpertiseTempsEstimePourCetteAnnne = true;

    _validConseilsScientifiqueNatureExpertise = true;
    _validConseilsScientifiqueIntitule = true;
    _validConseilsScientifiqueEtablissementConseilsScientifiques = true;
    _validConseilsScientifiqueTypeExpertise = true;
    _validConseilsScientifiqueNombreJoursConsacres = true;
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
    _validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = true;
    _validComiteEtCommissionEvaluationNatureExpertise = true;
    _validComiteEtCommissionEvaluationNom = true;
    _validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = true;
    _validComiteEtCommissionEvaluationNomRevueOuEditeur = true;
    _validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = true;
    _validComiteEtCommissionEvaluationNombreJourDedie = true;
    _validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = true;
    _validComiteEtCommissionEvaluationRelieeInstrumentsIrd = true;
    _validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;
    _validCampagneLibelle = true;

       private _etablissementConseilsScientifiquesVo: Array<EtablissementConseilsScientifiqueVo> = [];
       private _enjeuxIrdConseilsScientifiquesVo: Array<EnjeuxIrdConseilsScientifiqueVo> = [];
       private _disciplineScientifiqueConseilsScientifiquesVo: Array<DisciplineScientifiqueConseilsScientifiqueVo> = [];
       private _paysCommanditairesVo: Array<PaysCommanditaireVo> = [];
       private _etablissementConsultanceScientifiquePonctuellesVo: Array<EtablissementConsultanceScientifiquePonctuelleVo> = [];
       private _disciplineScientifiqueConsultanceScientifiquePonctuellesVo: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> = [];
       private _enjeuxIrdConsultanceScientifiquePonctuellesVo: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> = [];
       private _typeInstrumentIrdConsultanceScientifiquePonctuellesVo: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> = [];
       private _typeExpertiseEvaluationComiteEtCommissionEvaluationsVo: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> = [];
       private _etablissementComiteEtCommissionEvaluationsVo: Array<EtablissementComiteEtCommissionEvaluationVo> = [];
       private _roleComiteEtCommissionEvaluationsVo: Array<RoleComiteEtCommissionEvaluationVo> = [];
       private _disciplineScientifiqueComiteEtCommissionEvaluationsVo: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> = [];
       private _enjeuxIrdComiteEtCommissionEvaluationsVo: Array<EnjeuxIrdComiteEtCommissionEvaluationVo> = [];


constructor(private datePipe: DatePipe, private expertiseService: ExpertiseService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
  ,       private tokenService: TokenService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private typeExpertiseEvaluationService :TypeExpertiseEvaluationService
,       private chercheurService :ChercheurService
,       private typeExpertiseService :TypeExpertiseService
,       private roleEvaluationService :RoleEvaluationService
,       private natureExpertiseService :NatureExpertiseService
,       private enjeuxIrdService :EnjeuxIrdService
,       private conseilsScientifiqueService :ConseilsScientifiqueService
,       private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
,       private etablissementService :EtablissementService
,       private typeInstrumentIrdService :TypeInstrumentIrdService
,       private campagneService :CampagneService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private comiteEtCommissionEvaluationService :ComiteEtCommissionEvaluationService
,       private paysService :PaysService
) {

}


 public loadCampagne(username) {
    this.campagneService.findProgressCampagneByChercheurUsername(username).subscribe(data => {
     if (data != null && data.id != null) {
        let campagneVo = data;
        this.expertiseService.findByChercheurUsernameAndCampagneId(this.tokenService.getUsername(), campagneVo['id']).subscribe(expertise => {
          this.isLoaded = false;
          if (expertise) {
            this.msgsContents = 'Vous avez saisi les données expertise de cette campagne';
            this.info = 'info'
            //this.selectedExpertise={ ...expertise }['0']; TODO: in case non formulaire
            this.selectedExpertise.campagneVo=campagneVo;
            this.isLoaded = true;
          }
          else {
            this.msgsContents =  "Il y a une campagne en cours, vous pouvez saisir les données"
            this.selectedExpertise.campagneVo=campagneVo;
            this.info = "info"
            this.isLoaded = true;
          }
        });
      }
      else {
        this.msgsContents = "Actuellement, aucune campagne en cours"
        this.info = "warn"
        this.isLoaded = false;
 }
});
}
// methods
ngOnInit(): void {
        this.loadCampagne(this.tokenService.getUsername());


                this.selectedConseilsScientifiques.natureExpertiseVo = new NatureExpertiseVo();
                this.natureExpertiseService.findAll().subscribe((data) => this.natureExpertises = data);
                this.selectedConseilsScientifiques.typeExpertiseVo = new TypeExpertiseVo();
                this.typeExpertiseService.findAll().subscribe((data) => this.typeExpertises = data);
                this.selectedConseilsScientifiques.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.etablissementService.findAll().subscribe(data => this.prepareEtablissementConseilsScientifiques(data));
                this.enjeuxIrdService.findAll().subscribe(data => this.prepareEnjeuxIrdConseilsScientifiques(data));
                this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareDisciplineScientifiqueConseilsScientifiques(data));


                this.selectedConsultanceScientifiquePonctuelles.typeExpertiseVo = new TypeExpertiseVo();
                this.typeExpertiseService.findAll().subscribe((data) => this.typeExpertises = data);
                this.selectedConsultanceScientifiquePonctuelles.natureExpertiseVo = new NatureExpertiseVo();
                this.natureExpertiseService.findAll().subscribe((data) => this.natureExpertises = data);
                this.selectedConsultanceScientifiquePonctuelles.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.paysService.findAll().subscribe(data => this.preparePaysCommanditaires(data));
                this.etablissementService.findAll().subscribe(data => this.prepareEtablissementConsultanceScientifiquePonctuelles(data));
                this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareDisciplineScientifiqueConsultanceScientifiquePonctuelles(data));
                this.enjeuxIrdService.findAll().subscribe(data => this.prepareEnjeuxIrdConsultanceScientifiquePonctuelles(data));
                this.typeInstrumentIrdService.findAll().subscribe(data => this.prepareTypeInstrumentIrdConsultanceScientifiquePonctuelles(data));


                this.selectedComiteEtCommissionEvaluations.natureExpertiseVo = new NatureExpertiseVo();
                this.natureExpertiseService.findAll().subscribe((data) => this.natureExpertises = data);
                this.selectedComiteEtCommissionEvaluations.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.typeExpertiseEvaluationService.findAll().subscribe(data => this.prepareTypeExpertiseEvaluationComiteEtCommissionEvaluations(data));
                this.etablissementService.findAll().subscribe(data => this.prepareEtablissementComiteEtCommissionEvaluations(data));
                this.roleEvaluationService.findAll().subscribe(data => this.prepareRoleComiteEtCommissionEvaluations(data));
                this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareDisciplineScientifiqueComiteEtCommissionEvaluations(data));
                this.enjeuxIrdService.findAll().subscribe(data => this.prepareEnjeuxIrdComiteEtCommissionEvaluations(data));

    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
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
   prepareTypeExpertiseEvaluationComiteEtCommissionEvaluations(typeExpertiseEvaluations: Array<TypeExpertiseEvaluationVo>): void{
        if( typeExpertiseEvaluations != null){
        typeExpertiseEvaluations.forEach(e => {
        const typeExpertiseEvaluationComiteEtCommissionEvaluation = new TypeExpertiseEvaluationComiteEtCommissionEvaluationVo();
        typeExpertiseEvaluationComiteEtCommissionEvaluation.typeExpertiseEvaluationVo = e;
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo.push(typeExpertiseEvaluationComiteEtCommissionEvaluation);
        });
        }
   }
   prepareEtablissementComiteEtCommissionEvaluations(etablissements: Array<EtablissementVo>): void{
        if( etablissements != null){
        etablissements.forEach(e => {
        const etablissementComiteEtCommissionEvaluation = new EtablissementComiteEtCommissionEvaluationVo();
        etablissementComiteEtCommissionEvaluation.etablissementVo = e;
        this.etablissementComiteEtCommissionEvaluationsVo.push(etablissementComiteEtCommissionEvaluation);
        });
        }
   }
   prepareRoleComiteEtCommissionEvaluations(roleEvaluations: Array<RoleEvaluationVo>): void{
        if( roleEvaluations != null){
        roleEvaluations.forEach(e => {
        const roleComiteEtCommissionEvaluation = new RoleComiteEtCommissionEvaluationVo();
        roleComiteEtCommissionEvaluation.roleEvaluationVo = e;
        this.roleComiteEtCommissionEvaluationsVo.push(roleComiteEtCommissionEvaluation);
        });
        }
   }
   prepareDisciplineScientifiqueComiteEtCommissionEvaluations(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const disciplineScientifiqueComiteEtCommissionEvaluation = new DisciplineScientifiqueComiteEtCommissionEvaluationVo();
        disciplineScientifiqueComiteEtCommissionEvaluation.disciplineScientifiqueVo = e;
        this.disciplineScientifiqueComiteEtCommissionEvaluationsVo.push(disciplineScientifiqueComiteEtCommissionEvaluation);
        });
        }
   }
   prepareEnjeuxIrdComiteEtCommissionEvaluations(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const enjeuxIrdComiteEtCommissionEvaluation = new EnjeuxIrdComiteEtCommissionEvaluationVo();
        enjeuxIrdComiteEtCommissionEvaluation.enjeuxIrdVo = e;
        this.enjeuxIrdComiteEtCommissionEvaluationsVo.push(enjeuxIrdComiteEtCommissionEvaluation);
        });
        }
   }

    validateConseilsScientifiques(){
    this.errorMessages = new Array();
    this.validateConseilsScientifiqueNatureExpertise();
    this.validateConseilsScientifiqueIntitule();
    this.validateConseilsScientifiqueEtablissementConseilsScientifiques();
    this.validateConseilsScientifiqueTypeExpertise();
    this.validateConseilsScientifiqueNombreJoursConsacres();
    }
    validateConsultanceScientifiquePonctuelles(){
    this.errorMessages = new Array();
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
    validateComiteEtCommissionEvaluations(){
    this.errorMessages = new Array();
    this.validateComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations();
    this.validateComiteEtCommissionEvaluationNatureExpertise();
    this.validateComiteEtCommissionEvaluationNom();
    this.validateComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations();
    this.validateComiteEtCommissionEvaluationNomRevueOuEditeur();
    this.validateComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations();
    this.validateComiteEtCommissionEvaluationNombreJourDedie();
    this.validateComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations();
    this.validateComiteEtCommissionEvaluationRelieeInstrumentsIrd();
    this.validateComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations();
    }


private setValidation(value : boolean){
    this.validExpertiseTempsEstimePourCetteAnnne = value;
    this.validConseilsScientifiqueNatureExpertise = value;
    this.validConseilsScientifiqueIntitule = value;
    this.validConseilsScientifiqueEtablissementConseilsScientifiques = value;
    this.validConseilsScientifiqueTypeExpertise = value;
    this.validConseilsScientifiqueNombreJoursConsacres = value;
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
    this.validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = value;
    this.validComiteEtCommissionEvaluationNatureExpertise = value;
    this.validComiteEtCommissionEvaluationNom = value;
    this.validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = value;
    this.validComiteEtCommissionEvaluationNomRevueOuEditeur = value;
    this.validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = value;
    this.validComiteEtCommissionEvaluationNombreJourDedie = value;
    this.validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = value;
    this.validComiteEtCommissionEvaluationRelieeInstrumentsIrd = value;
    this.validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = value;
    }

        addConseilsScientifiques() {
        if( this.selectedExpertise.conseilsScientifiquesVo == null ){
            this.selectedExpertise.conseilsScientifiquesVo = new Array<ConseilsScientifiqueVo>();
        }
       this.validateConseilsScientifiques();
       if (this.errorMessages.length === 0) {
              this.selectedExpertise.conseilsScientifiquesVo.push(this.selectedConseilsScientifiques);
              this.selectedConseilsScientifiques = new ConseilsScientifiqueVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteConseilsScientifiques(p: ConseilsScientifiqueVo) {
        this.selectedExpertise.conseilsScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedExpertise.conseilsScientifiquesVo.splice(index, 1); }
        });
    }
        addConsultanceScientifiquePonctuelles() {
        if( this.selectedExpertise.consultanceScientifiquePonctuellesVo == null ){
            this.selectedExpertise.consultanceScientifiquePonctuellesVo = new Array<ConsultanceScientifiquePonctuelleVo>();
        }
       this.validateConsultanceScientifiquePonctuelles();
       if (this.errorMessages.length === 0) {
              this.selectedExpertise.consultanceScientifiquePonctuellesVo.push(this.selectedConsultanceScientifiquePonctuelles);
              this.selectedConsultanceScientifiquePonctuelles = new ConsultanceScientifiquePonctuelleVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteConsultanceScientifiquePonctuelles(p: ConsultanceScientifiquePonctuelleVo) {
        this.selectedExpertise.consultanceScientifiquePonctuellesVo.forEach((element, index) => {
            if (element === p) { this.selectedExpertise.consultanceScientifiquePonctuellesVo.splice(index, 1); }
        });
    }
        addComiteEtCommissionEvaluations() {
        if( this.selectedExpertise.comiteEtCommissionEvaluationsVo == null ){
            this.selectedExpertise.comiteEtCommissionEvaluationsVo = new Array<ComiteEtCommissionEvaluationVo>();
        }
       this.validateComiteEtCommissionEvaluations();
       if (this.errorMessages.length === 0) {
              this.selectedExpertise.comiteEtCommissionEvaluationsVo.push(this.selectedComiteEtCommissionEvaluations);
              this.selectedComiteEtCommissionEvaluations = new ComiteEtCommissionEvaluationVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteComiteEtCommissionEvaluations(p: ComiteEtCommissionEvaluationVo) {
        this.selectedExpertise.comiteEtCommissionEvaluationsVo.forEach((element, index) => {
            if (element === p) { this.selectedExpertise.comiteEtCommissionEvaluationsVo.splice(index, 1); }
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
if(this.data) {
 this.selectedExpertise=this.data;
 }
     this.expertiseService.save().subscribe(expertise=>{
       this.expertises.push({...expertise});
       this.createExpertiseDialog = false;
       this.submitted = false;
       this.selectedExpertise = new ExpertiseVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateExpertiseTempsEstimePourCetteAnnne();

    }

private validateExpertiseTempsEstimePourCetteAnnne(){
        if (this.stringUtilService.isEmpty(this.selectedExpertise.tempsEstimePourCetteAnnne)) {
            this.errorMessages.push('Temps estime pour cette annne non valide');
            this.validExpertiseTempsEstimePourCetteAnnne = false;
        } else {
            this.validExpertiseTempsEstimePourCetteAnnne = true;
        }
    }







            private validateConseilsScientifiqueNatureExpertise(){
            if (this.selectedConseilsScientifiques.natureExpertiseVo == null) {
            this.errorMessages.push('NatureExpertise de la conseilsScientifique est  invalide');
             this.validConseilsScientifiqueNatureExpertise = false;
            } else {
            this.validConseilsScientifiqueNatureExpertise = true;
            }
            }

            private validateConseilsScientifiqueIntitule(){
            if (this.selectedConseilsScientifiques.intitule == null) {
            this.errorMessages.push('Intitule de la conseilsScientifique est  invalide');
             this.validConseilsScientifiqueIntitule = false;
            } else {
            this.validConseilsScientifiqueIntitule = true;
            }
            }

            private validateConseilsScientifiqueEtablissementConseilsScientifiques(){
            if (this.selectedConseilsScientifiques.etablissementConseilsScientifiquesVo == null || this.selectedConseilsScientifiques.etablissementConseilsScientifiquesVo.length === 0) {
            this.errorMessages.push('EtablissementConseilsScientifiques de la conseilsScientifique est  invalide');
             this.validConseilsScientifiqueEtablissementConseilsScientifiques = false;
            } else {
            this.validConseilsScientifiqueEtablissementConseilsScientifiques = true;
            }
            }




            private validateConseilsScientifiqueTypeExpertise(){
            if (this.selectedConseilsScientifiques.typeExpertiseVo == null) {
            this.errorMessages.push('TypeExpertise de la conseilsScientifique est  invalide');
             this.validConseilsScientifiqueTypeExpertise = false;
            } else {
            this.validConseilsScientifiqueTypeExpertise = true;
            }
            }

            private validateConseilsScientifiqueNombreJoursConsacres(){
            if (this.selectedConseilsScientifiques.nombreJoursConsacres == null) {
            this.errorMessages.push('NombreJoursConsacres de la conseilsScientifique est  invalide');
             this.validConseilsScientifiqueNombreJoursConsacres = false;
            } else {
            this.validConseilsScientifiqueNombreJoursConsacres = true;
            }
            }






            private validateConsultanceScientifiquePonctuelleTypeExpertise(){
            if (this.selectedConsultanceScientifiquePonctuelles.typeExpertiseVo == null) {
            this.errorMessages.push('TypeExpertise de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuelleTypeExpertise = false;
            } else {
            this.validConsultanceScientifiquePonctuelleTypeExpertise = true;
            }
            }

            private validateConsultanceScientifiquePonctuelleNatureExpertise(){
            if (this.selectedConsultanceScientifiquePonctuelles.natureExpertiseVo == null) {
            this.errorMessages.push('NatureExpertise de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuelleNatureExpertise = false;
            } else {
            this.validConsultanceScientifiquePonctuelleNatureExpertise = true;
            }
            }

            private validateConsultanceScientifiquePonctuelleSujetExpertise(){
            if (this.selectedConsultanceScientifiquePonctuelles.sujetExpertise == null) {
            this.errorMessages.push('SujetExpertise de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuelleSujetExpertise = false;
            } else {
            this.validConsultanceScientifiquePonctuelleSujetExpertise = true;
            }
            }

            private validateConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles(){
            if (this.selectedConsultanceScientifiquePonctuelles.zoneGeographiqueConsultanceScientifiquePonctuellesVo == null || this.selectedConsultanceScientifiquePonctuelles.zoneGeographiqueConsultanceScientifiquePonctuellesVo.length === 0) {
            this.errorMessages.push('ZoneGeographiqueConsultanceScientifiquePonctuelles de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles = false;
            } else {
            this.validConsultanceScientifiquePonctuelleZoneGeographiqueConsultanceScientifiquePonctuelles = true;
            }
            }

            private validateConsultanceScientifiquePonctuellePaysCommanditaires(){
            if (this.selectedConsultanceScientifiquePonctuelles.paysCommanditairesVo == null || this.selectedConsultanceScientifiquePonctuelles.paysCommanditairesVo.length === 0) {
            this.errorMessages.push('PaysCommanditaires de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuellePaysCommanditaires = false;
            } else {
            this.validConsultanceScientifiquePonctuellePaysCommanditaires = true;
            }
            }

            private validateConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles(){
            if (this.selectedConsultanceScientifiquePonctuelles.etablissementConsultanceScientifiquePonctuellesVo == null || this.selectedConsultanceScientifiquePonctuelles.etablissementConsultanceScientifiquePonctuellesVo.length === 0) {
            this.errorMessages.push('EtablissementConsultanceScientifiquePonctuelles de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles = false;
            } else {
            this.validConsultanceScientifiquePonctuelleEtablissementConsultanceScientifiquePonctuelles = true;
            }
            }

            private validateConsultanceScientifiquePonctuelleNombreJourDedie(){
            if (this.selectedConsultanceScientifiquePonctuelles.nombreJourDedie == null) {
            this.errorMessages.push('NombreJourDedie de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuelleNombreJourDedie = false;
            } else {
            this.validConsultanceScientifiquePonctuelleNombreJourDedie = true;
            }
            }


            private validateConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles(){
            if (this.selectedConsultanceScientifiquePonctuelles.disciplineScientifiqueConsultanceScientifiquePonctuellesVo == null || this.selectedConsultanceScientifiquePonctuelles.disciplineScientifiqueConsultanceScientifiquePonctuellesVo.length === 0) {
            this.errorMessages.push('DisciplineScientifiqueConsultanceScientifiquePonctuelles de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles = false;
            } else {
            this.validConsultanceScientifiquePonctuelleDisciplineScientifiqueConsultanceScientifiquePonctuelles = true;
            }
            }

            private validateConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles(){
            if (this.selectedConsultanceScientifiquePonctuelles.enjeuxIrdConsultanceScientifiquePonctuellesVo == null || this.selectedConsultanceScientifiquePonctuelles.enjeuxIrdConsultanceScientifiquePonctuellesVo.length === 0) {
            this.errorMessages.push('EnjeuxIrdConsultanceScientifiquePonctuelles de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles = false;
            } else {
            this.validConsultanceScientifiquePonctuelleEnjeuxIrdConsultanceScientifiquePonctuelles = true;
            }
            }

            private validateConsultanceScientifiquePonctuelleRelieeInstrumentsIrd(){
            if (this.selectedConsultanceScientifiquePonctuelles.relieeInstrumentsIrd == null) {
            this.errorMessages.push('RelieeInstrumentsIrd de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd = false;
            } else {
            this.validConsultanceScientifiquePonctuelleRelieeInstrumentsIrd = true;
            }
            }

            private validateConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles(){
            if (this.selectedConsultanceScientifiquePonctuelles.instrumentIrdConsultanceScientifiquePonctuellesVo == null || this.selectedConsultanceScientifiquePonctuelles.instrumentIrdConsultanceScientifiquePonctuellesVo.length === 0) {
            this.errorMessages.push('InstrumentIrdConsultanceScientifiquePonctuelles de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles = false;
            } else {
            this.validConsultanceScientifiquePonctuelleInstrumentIrdConsultanceScientifiquePonctuelles = true;
            }
            }

            private validateConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles(){
            if (this.selectedConsultanceScientifiquePonctuelles.typeInstrumentIrdConsultanceScientifiquePonctuellesVo == null || this.selectedConsultanceScientifiquePonctuelles.typeInstrumentIrdConsultanceScientifiquePonctuellesVo.length === 0) {
            this.errorMessages.push('TypeInstrumentIrdConsultanceScientifiquePonctuelles de la consultanceScientifiquePonctuelle est  invalide');
             this.validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles = false;
            } else {
            this.validConsultanceScientifiquePonctuelleTypeInstrumentIrdConsultanceScientifiquePonctuelles = true;
            }
            }







            private validateComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations(){
            if (this.selectedComiteEtCommissionEvaluations.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo == null || this.selectedComiteEtCommissionEvaluations.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo.length === 0) {
            this.errorMessages.push('TypeExpertiseEvaluationComiteEtCommissionEvaluations de la comiteEtCommissionEvaluation est  invalide');
             this.validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = false;
            } else {
            this.validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = true;
            }
            }

            private validateComiteEtCommissionEvaluationNatureExpertise(){
            if (this.selectedComiteEtCommissionEvaluations.natureExpertiseVo == null) {
            this.errorMessages.push('NatureExpertise de la comiteEtCommissionEvaluation est  invalide');
             this.validComiteEtCommissionEvaluationNatureExpertise = false;
            } else {
            this.validComiteEtCommissionEvaluationNatureExpertise = true;
            }
            }

            private validateComiteEtCommissionEvaluationNom(){
            if (this.selectedComiteEtCommissionEvaluations.nom == null) {
            this.errorMessages.push('Nom de la comiteEtCommissionEvaluation est  invalide');
             this.validComiteEtCommissionEvaluationNom = false;
            } else {
            this.validComiteEtCommissionEvaluationNom = true;
            }
            }

            private validateComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations(){
            if (this.selectedComiteEtCommissionEvaluations.etablissementComiteEtCommissionEvaluationsVo == null || this.selectedComiteEtCommissionEvaluations.etablissementComiteEtCommissionEvaluationsVo.length === 0) {
            this.errorMessages.push('EtablissementComiteEtCommissionEvaluations de la comiteEtCommissionEvaluation est  invalide');
             this.validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = false;
            } else {
            this.validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = true;
            }
            }

            private validateComiteEtCommissionEvaluationNomRevueOuEditeur(){
            if (this.selectedComiteEtCommissionEvaluations.nomRevueOuEditeur == null) {
            this.errorMessages.push('NomRevueOuEditeur de la comiteEtCommissionEvaluation est  invalide');
             this.validComiteEtCommissionEvaluationNomRevueOuEditeur = false;
            } else {
            this.validComiteEtCommissionEvaluationNomRevueOuEditeur = true;
            }
            }

            private validateComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations(){
            if (this.selectedComiteEtCommissionEvaluations.roleComiteEtCommissionEvaluationsVo == null || this.selectedComiteEtCommissionEvaluations.roleComiteEtCommissionEvaluationsVo.length === 0) {
            this.errorMessages.push('RoleComiteEtCommissionEvaluations de la comiteEtCommissionEvaluation est  invalide');
             this.validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = false;
            } else {
            this.validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = true;
            }
            }


            private validateComiteEtCommissionEvaluationNombreJourDedie(){
            if (this.selectedComiteEtCommissionEvaluations.nombreJourDedie == null) {
            this.errorMessages.push('NombreJourDedie de la comiteEtCommissionEvaluation est  invalide');
             this.validComiteEtCommissionEvaluationNombreJourDedie = false;
            } else {
            this.validComiteEtCommissionEvaluationNombreJourDedie = true;
            }
            }

            private validateComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations(){
            if (this.selectedComiteEtCommissionEvaluations.disciplineScientifiqueComiteEtCommissionEvaluationsVo == null || this.selectedComiteEtCommissionEvaluations.disciplineScientifiqueComiteEtCommissionEvaluationsVo.length === 0) {
            this.errorMessages.push('DisciplineScientifiqueComiteEtCommissionEvaluations de la comiteEtCommissionEvaluation est  invalide');
             this.validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = false;
            } else {
            this.validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = true;
            }
            }


            private validateComiteEtCommissionEvaluationRelieeInstrumentsIrd(){
            if (this.selectedComiteEtCommissionEvaluations.relieeInstrumentsIrd == null) {
            this.errorMessages.push('RelieeInstrumentsIrd de la comiteEtCommissionEvaluation est  invalide');
             this.validComiteEtCommissionEvaluationRelieeInstrumentsIrd = false;
            } else {
            this.validComiteEtCommissionEvaluationRelieeInstrumentsIrd = true;
            }
            }

            private validateComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations(){
            if (this.selectedComiteEtCommissionEvaluations.instrumentIrdComiteEtCommissionEvaluationsVo == null || this.selectedComiteEtCommissionEvaluations.instrumentIrdComiteEtCommissionEvaluationsVo.length === 0) {
            this.errorMessages.push('InstrumentIrdComiteEtCommissionEvaluations de la comiteEtCommissionEvaluation est  invalide');
             this.validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = false;
            } else {
            this.validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = true;
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
              public async openCreatecampagne(campagne: string) {
                      const isPermistted = await this.roleService.isPermitted('Campagne', 'add');
                       if(isPermistted){
         this.selectedCampagne = new CampagneVo();
        this.createCampagneDialog = true;
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
              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createExpertiseDialog  = false;
    this.setValidation(true);
}

// getters and setters

get expertises(): Array<ExpertiseVo> {
    return this.expertiseService.expertises;
       }
set expertises(value: Array<ExpertiseVo>) {
        this.expertiseService.expertises = value;
       }

 get selectedExpertise():ExpertiseVo {
           return this.expertiseService.selectedExpertise;
       }
    set selectedExpertise(value: ExpertiseVo) {
        this.expertiseService.selectedExpertise = value;
       }

   get createExpertiseDialog(): boolean {
           return this.expertiseService.createExpertiseDialog;

       }
    set createExpertiseDialog(value: boolean) {
        this.expertiseService.createExpertiseDialog= value;
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
       get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes(): Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get createCampagneDialog(): boolean {
           return this.campagneService.createCampagneDialog;
       }
      set createCampagneDialog(value: boolean) {
        this.campagneService.createCampagneDialog= value;
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
       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;
       }
      set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
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
    get typeExpertiseEvaluationComiteEtCommissionEvaluationsVo(): Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> {
    if( this._typeExpertiseEvaluationComiteEtCommissionEvaluationsVo == null )
    this._typeExpertiseEvaluationComiteEtCommissionEvaluationsVo = new Array();
        return this._typeExpertiseEvaluationComiteEtCommissionEvaluationsVo;
    }

    set typeExpertiseEvaluationComiteEtCommissionEvaluationsVo(value: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>) {
        this._typeExpertiseEvaluationComiteEtCommissionEvaluationsVo = value;
    }
    get etablissementComiteEtCommissionEvaluationsVo(): Array<EtablissementComiteEtCommissionEvaluationVo> {
    if( this._etablissementComiteEtCommissionEvaluationsVo == null )
    this._etablissementComiteEtCommissionEvaluationsVo = new Array();
        return this._etablissementComiteEtCommissionEvaluationsVo;
    }

    set etablissementComiteEtCommissionEvaluationsVo(value: Array<EtablissementComiteEtCommissionEvaluationVo>) {
        this._etablissementComiteEtCommissionEvaluationsVo = value;
    }
    get roleComiteEtCommissionEvaluationsVo(): Array<RoleComiteEtCommissionEvaluationVo> {
    if( this._roleComiteEtCommissionEvaluationsVo == null )
    this._roleComiteEtCommissionEvaluationsVo = new Array();
        return this._roleComiteEtCommissionEvaluationsVo;
    }

    set roleComiteEtCommissionEvaluationsVo(value: Array<RoleComiteEtCommissionEvaluationVo>) {
        this._roleComiteEtCommissionEvaluationsVo = value;
    }
    get disciplineScientifiqueComiteEtCommissionEvaluationsVo(): Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> {
    if( this._disciplineScientifiqueComiteEtCommissionEvaluationsVo == null )
    this._disciplineScientifiqueComiteEtCommissionEvaluationsVo = new Array();
        return this._disciplineScientifiqueComiteEtCommissionEvaluationsVo;
    }

    set disciplineScientifiqueComiteEtCommissionEvaluationsVo(value: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>) {
        this._disciplineScientifiqueComiteEtCommissionEvaluationsVo = value;
    }
    get enjeuxIrdComiteEtCommissionEvaluationsVo(): Array<EnjeuxIrdComiteEtCommissionEvaluationVo> {
    if( this._enjeuxIrdComiteEtCommissionEvaluationsVo == null )
    this._enjeuxIrdComiteEtCommissionEvaluationsVo = new Array();
        return this._enjeuxIrdComiteEtCommissionEvaluationsVo;
    }

    set enjeuxIrdComiteEtCommissionEvaluationsVo(value: Array<EnjeuxIrdComiteEtCommissionEvaluationVo>) {
        this._enjeuxIrdComiteEtCommissionEvaluationsVo = value;
    }

    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validExpertiseTempsEstimePourCetteAnnne(): boolean {
    return this._validExpertiseTempsEstimePourCetteAnnne;
    }

    set validExpertiseTempsEstimePourCetteAnnne(value: boolean) {
    this._validExpertiseTempsEstimePourCetteAnnne = value;
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
    get validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationNatureExpertise(): boolean {
    return this._validComiteEtCommissionEvaluationNatureExpertise;
    }

    set validComiteEtCommissionEvaluationNatureExpertise(value: boolean) {
    this._validComiteEtCommissionEvaluationNatureExpertise = value;
    }
    get validComiteEtCommissionEvaluationNom(): boolean {
    return this._validComiteEtCommissionEvaluationNom;
    }

    set validComiteEtCommissionEvaluationNom(value: boolean) {
    this._validComiteEtCommissionEvaluationNom = value;
    }
    get validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationNomRevueOuEditeur(): boolean {
    return this._validComiteEtCommissionEvaluationNomRevueOuEditeur;
    }

    set validComiteEtCommissionEvaluationNomRevueOuEditeur(value: boolean) {
    this._validComiteEtCommissionEvaluationNomRevueOuEditeur = value;
    }
    get validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationNombreJourDedie(): boolean {
    return this._validComiteEtCommissionEvaluationNombreJourDedie;
    }

    set validComiteEtCommissionEvaluationNombreJourDedie(value: boolean) {
    this._validComiteEtCommissionEvaluationNombreJourDedie = value;
    }
    get validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationRelieeInstrumentsIrd(): boolean {
    return this._validComiteEtCommissionEvaluationRelieeInstrumentsIrd;
    }

    set validComiteEtCommissionEvaluationRelieeInstrumentsIrd(value: boolean) {
    this._validComiteEtCommissionEvaluationRelieeInstrumentsIrd = value;
    }
    get validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = value;
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
    get validCampagneLibelle(): boolean {
    return this._validCampagneLibelle;
    }

    set validCampagneLibelle(value: boolean) {
    this._validCampagneLibelle = value;
    }

}
