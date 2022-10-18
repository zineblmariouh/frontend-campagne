import {Component, OnInit, Input} from '@angular/core';
import {EnseignementEtFormationService} from '../../../../../controller/service/EnseignementEtFormation.service';
import {EnseignementEtFormationVo} from '../../../../../controller/model/EnseignementEtFormation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {FormationContinueDisciplineScientifiqueVo} from '../../../../../controller/model/FormationContinueDisciplineScientifique.model';
import {FormationContinueDisciplineScientifiqueService} from '../../../../../controller/service/FormationContinueDisciplineScientifique.service';
import {EnseignementEnjeuxIrdVo} from '../../../../../controller/model/EnseignementEnjeuxIrd.model';
import {EnseignementEnjeuxIrdService} from '../../../../../controller/service/EnseignementEnjeuxIrd.service';
import {FormationContinuePubliqueProfessionelVo} from '../../../../../controller/model/FormationContinuePubliqueProfessionel.model';
import {FormationContinuePubliqueProfessionelService} from '../../../../../controller/service/FormationContinuePubliqueProfessionel.service';
import {PaysFormationContinueVo} from '../../../../../controller/model/PaysFormationContinue.model';
import {PaysFormationContinueService} from '../../../../../controller/service/PaysFormationContinue.service';
import {StatusCursusVo} from '../../../../../controller/model/StatusCursus.model';
import {StatusCursusService} from '../../../../../controller/service/StatusCursus.service';
import {NatureEnseignementVo} from '../../../../../controller/model/NatureEnseignement.model';
import {NatureEnseignementService} from '../../../../../controller/service/NatureEnseignement.service';
import {NiveauResponsabilitePedagogiqueVo} from '../../../../../controller/model/NiveauResponsabilitePedagogique.model';
import {NiveauResponsabilitePedagogiqueService} from '../../../../../controller/service/NiveauResponsabilitePedagogique.service';
import {ModaliteFormationContinueVo} from '../../../../../controller/model/ModaliteFormationContinue.model';
import {ModaliteFormationContinueService} from '../../../../../controller/service/ModaliteFormationContinue.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {EnseignementZoneGeographiqueVo} from '../../../../../controller/model/EnseignementZoneGeographique.model';
import {EnseignementZoneGeographiqueService} from '../../../../../controller/service/EnseignementZoneGeographique.service';
import {EnseignementDisciplineScientifiqueVo} from '../../../../../controller/model/EnseignementDisciplineScientifique.model';
import {EnseignementDisciplineScientifiqueService} from '../../../../../controller/service/EnseignementDisciplineScientifique.service';
import {ZoneGeographiqueFormationContinueVo} from '../../../../../controller/model/ZoneGeographiqueFormationContinue.model';
import {ZoneGeographiqueFormationContinueService} from '../../../../../controller/service/ZoneGeographiqueFormationContinue.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {ResponsabilitePedagogiquePaysVo} from '../../../../../controller/model/ResponsabilitePedagogiquePays.model';
import {ResponsabilitePedagogiquePaysService} from '../../../../../controller/service/ResponsabilitePedagogiquePays.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {ModaliteEtudeVo} from '../../../../../controller/model/ModaliteEtude.model';
import {ModaliteEtudeService} from '../../../../../controller/service/ModaliteEtude.service';
import {NiveauEtudeEnseignementVo} from '../../../../../controller/model/NiveauEtudeEnseignement.model';
import {NiveauEtudeEnseignementService} from '../../../../../controller/service/NiveauEtudeEnseignement.service';
import {EtablissementEnseignementVo} from '../../../../../controller/model/EtablissementEnseignement.model';
import {EtablissementEnseignementService} from '../../../../../controller/service/EtablissementEnseignement.service';
import {FormationContinueCommanditaireVo} from '../../../../../controller/model/FormationContinueCommanditaire.model';
import {FormationContinueCommanditaireService} from '../../../../../controller/service/FormationContinueCommanditaire.service';
import {FormationContinueObjetFormationGeneriqueVo} from '../../../../../controller/model/FormationContinueObjetFormationGenerique.model';
import {FormationContinueObjetFormationGeneriqueService} from '../../../../../controller/service/FormationContinueObjetFormationGenerique.service';
import {PubliqueProfessionelVo} from '../../../../../controller/model/PubliqueProfessionel.model';
import {PubliqueProfessionelService} from '../../../../../controller/service/PubliqueProfessionel.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {FormationContinueEnjeuxIrdVo} from '../../../../../controller/model/FormationContinueEnjeuxIrd.model';
import {FormationContinueEnjeuxIrdService} from '../../../../../controller/service/FormationContinueEnjeuxIrd.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ResponsabilitePedagogiqueEtablissementVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEtablissement.model';
import {ResponsabilitePedagogiqueEtablissementService} from '../../../../../controller/service/ResponsabilitePedagogiqueEtablissement.service';
import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {ResponsabilitePedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEnjeuxIrd.model';
import {ResponsabilitePedagogiqueEnjeuxIrdService} from '../../../../../controller/service/ResponsabilitePedagogiqueEnjeuxIrd.service';
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
  selector: 'app-enseignement-et-formation-create-admin',
  templateUrl: './enseignement-et-formation-create-admin.component.html',
  styleUrls: ['./enseignement-et-formation-create-admin.component.css']
})
export class EnseignementEtFormationCreateAdminComponent implements OnInit {

        selectedEnseignements: EnseignementVo = new EnseignementVo();
        selectedFormationContinues: FormationContinueVo = new FormationContinueVo();
        selectedResponsabilitePedagogiques: ResponsabilitePedagogiqueVo = new ResponsabilitePedagogiqueVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEnseignementEtFormationTempsEstimePourCetteAnnne = true;

    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;
    _validCampagneLibelle = true;
    _validEnseignementIntitule = true;
    _validEnseignementNombreHeure = true;
    _validEnseignementModaliteEtude = true;
    _validEnseignementTypeEtudeEnseignements = true;
    _validEnseignementNiveauEtudeEnseignements = true;
    _validEnseignementEtablissementEnseignements = true;
    _validEnseignementEnseignementZoneGeographiques = true;
    _validEnseignementEnseignementEnjeuxIrds = true;
    _validFormationContinueIntitule = true;
    _validFormationContinueFormationContinuePubliqueProfessionels = true;
    _validFormationContinueNombreHeuresDispenseesDansAnnee = true;
    _validFormationContinueModaliteFormationContinue = true;
    _validFormationContinueFormationContinueEnjeuxIrds = true;
    _validFormationContinuePaysFormationContinue = true;
    _validFormationContinueZoneGeographiqueFormationContinues = true;
    _validFormationContinueFormationContinueCommanditaires = true;
    _validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = true;
    _validResponsabilitePedagogiqueStatusCursus = true;
    _validResponsabilitePedagogiqueIntituleCursus = true;
    _validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = true;
    _validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = true;

       private _typeEtudeEnseignementsVo: Array<TypeEtudeEnseignementVo> = [];
       private _enseignementNaturesVo: Array<EnseignementNatureVo> = [];
       private _niveauEtudeEnseignementsVo: Array<NiveauEtudeEnseignementVo> = [];
       private _etablissementEnseignementsVo: Array<EtablissementEnseignementVo> = [];
       private _enseignementEnjeuxIrdsVo: Array<EnseignementEnjeuxIrdVo> = [];
       private _enseignementDisciplineScientifiquesVo: Array<EnseignementDisciplineScientifiqueVo> = [];
       private _formationContinuePubliqueProfessionelsVo: Array<FormationContinuePubliqueProfessionelVo> = [];
       private _formationContinueObjetFormationGeneriquesVo: Array<FormationContinueObjetFormationGeneriqueVo> = [];
       private _formationContinueEnjeuxIrdsVo: Array<FormationContinueEnjeuxIrdVo> = [];
       private _formationContinueDisciplineScientifiquesVo: Array<FormationContinueDisciplineScientifiqueVo> = [];
       private _paysFormationContinueVo: Array<PaysFormationContinueVo> = [];
       private _responsabilitePedagogiqueEnjeuxIrdsVo: Array<ResponsabilitePedagogiqueEnjeuxIrdVo> = [];
       private _responsabilitePedagogiquePayssVo: Array<ResponsabilitePedagogiquePaysVo> = [];


constructor(private datePipe: DatePipe, private enseignementEtFormationService: EnseignementEtFormationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private chercheurService :ChercheurService
,       private modaliteEtudeService :ModaliteEtudeService
,       private publiqueProfessionelService :PubliqueProfessionelService
,       private statusCursusService :StatusCursusService
,       private enjeuxIrdService :EnjeuxIrdService
,       private natureEnseignementService :NatureEnseignementService
,       private etablissementService :EtablissementService
,       private campagneService :CampagneService
,       private enseignementService :EnseignementService
,       private responsabilitePedagogiqueService :ResponsabilitePedagogiqueService
,       private objetFormationGeneriqueService :ObjetFormationGeneriqueService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private niveauResponsabilitePedagogiqueService :NiveauResponsabilitePedagogiqueService
,       private niveauEtudeService :NiveauEtudeService
,       private typeEtudeService :TypeEtudeService
,       private modaliteFormationContinueService :ModaliteFormationContinueService
,       private paysService :PaysService
,       private formationContinueService :FormationContinueService
) {

}


// methods
ngOnInit(): void {


                this.selectedEnseignements.modaliteEtudeVo = new ModaliteEtudeVo();
                this.modaliteEtudeService.findAll().subscribe((data) => this.modaliteEtudes = data);
                this.selectedEnseignements.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.typeEtudeService.findAll().subscribe(data => this.prepareTypeEtudeEnseignements(data));
                this.natureEnseignementService.findAll().subscribe(data => this.prepareEnseignementNatures(data));
                this.niveauEtudeService.findAll().subscribe(data => this.prepareNiveauEtudeEnseignements(data));
                this.etablissementService.findAll().subscribe(data => this.prepareEtablissementEnseignements(data));
                this.enjeuxIrdService.findAll().subscribe(data => this.prepareEnseignementEnjeuxIrds(data));
                this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareEnseignementDisciplineScientifiques(data));


                this.selectedFormationContinues.modaliteFormationContinueVo = new ModaliteFormationContinueVo();
                this.modaliteFormationContinueService.findAll().subscribe((data) => this.modaliteFormationContinues = data);
                this.selectedFormationContinues.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.publiqueProfessionelService.findAll().subscribe(data => this.prepareFormationContinuePubliqueProfessionels(data));
                this.objetFormationGeneriqueService.findAll().subscribe(data => this.prepareFormationContinueObjetFormationGeneriques(data));
                this.enjeuxIrdService.findAll().subscribe(data => this.prepareFormationContinueEnjeuxIrds(data));
                this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareFormationContinueDisciplineScientifiques(data));
                this.paysService.findAll().subscribe(data => this.preparePaysFormationContinue(data));


                this.selectedResponsabilitePedagogiques.niveauResponsabilitePedagogiqueVo = new NiveauResponsabilitePedagogiqueVo();
                this.niveauResponsabilitePedagogiqueService.findAll().subscribe((data) => this.niveauResponsabilitePedagogiques = data);
                this.selectedResponsabilitePedagogiques.statusCursusVo = new StatusCursusVo();
                this.statusCursusService.findAll().subscribe((data) => this.statusCursuss = data);
                this.selectedResponsabilitePedagogiques.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.enjeuxIrdService.findAll().subscribe(data => this.prepareResponsabilitePedagogiqueEnjeuxIrds(data));
                this.paysService.findAll().subscribe(data => this.prepareResponsabilitePedagogiquePayss(data));

    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
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
   prepareResponsabilitePedagogiqueEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const responsabilitePedagogiqueEnjeuxIrd = new ResponsabilitePedagogiqueEnjeuxIrdVo();
        responsabilitePedagogiqueEnjeuxIrd.enjeuxIrdVo = e;
        this.responsabilitePedagogiqueEnjeuxIrdsVo.push(responsabilitePedagogiqueEnjeuxIrd);
        });
        }
   }
   prepareResponsabilitePedagogiquePayss(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const responsabilitePedagogiquePays = new ResponsabilitePedagogiquePaysVo();
        responsabilitePedagogiquePays.paysVo = e;
        this.responsabilitePedagogiquePayssVo.push(responsabilitePedagogiquePays);
        });
        }
   }

    validateEnseignements(){
    this.errorMessages = new Array();
    this.validateEnseignementIntitule();
    this.validateEnseignementNombreHeure();
    this.validateEnseignementModaliteEtude();
    this.validateEnseignementTypeEtudeEnseignements();
    this.validateEnseignementNiveauEtudeEnseignements();
    this.validateEnseignementEtablissementEnseignements();
    this.validateEnseignementEnseignementZoneGeographiques();
    this.validateEnseignementEnseignementEnjeuxIrds();
    }
    validateFormationContinues(){
    this.errorMessages = new Array();
    this.validateFormationContinueIntitule();
    this.validateFormationContinueFormationContinuePubliqueProfessionels();
    this.validateFormationContinueNombreHeuresDispenseesDansAnnee();
    this.validateFormationContinueModaliteFormationContinue();
    this.validateFormationContinueFormationContinueEnjeuxIrds();
    this.validateFormationContinuePaysFormationContinue();
    this.validateFormationContinueZoneGeographiqueFormationContinues();
    this.validateFormationContinueFormationContinueCommanditaires();
    }
    validateResponsabilitePedagogiques(){
    this.errorMessages = new Array();
    this.validateResponsabilitePedagogiqueNiveauResponsabilitePedagogique();
    this.validateResponsabilitePedagogiqueStatusCursus();
    this.validateResponsabilitePedagogiqueIntituleCursus();
    this.validateResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements();
    this.validateResponsabilitePedagogiqueResponsabilitePedagogiquePayss();
    }


private setValidation(value : boolean){
    this.validEnseignementEtFormationTempsEstimePourCetteAnnne = value;
    this.validEnseignementIntitule = value;
    this.validEnseignementNombreHeure = value;
    this.validEnseignementModaliteEtude = value;
    this.validEnseignementTypeEtudeEnseignements = value;
    this.validEnseignementNiveauEtudeEnseignements = value;
    this.validEnseignementEtablissementEnseignements = value;
    this.validEnseignementEnseignementZoneGeographiques = value;
    this.validEnseignementEnseignementEnjeuxIrds = value;
    this.validFormationContinueIntitule = value;
    this.validFormationContinueFormationContinuePubliqueProfessionels = value;
    this.validFormationContinueNombreHeuresDispenseesDansAnnee = value;
    this.validFormationContinueModaliteFormationContinue = value;
    this.validFormationContinueFormationContinueEnjeuxIrds = value;
    this.validFormationContinuePaysFormationContinue = value;
    this.validFormationContinueZoneGeographiqueFormationContinues = value;
    this.validFormationContinueFormationContinueCommanditaires = value;
    this.validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = value;
    this.validResponsabilitePedagogiqueStatusCursus = value;
    this.validResponsabilitePedagogiqueIntituleCursus = value;
    this.validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = value;
    this.validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = value;
    }

        addEnseignements() {
        if( this.selectedEnseignementEtFormation.enseignementsVo == null ){
            this.selectedEnseignementEtFormation.enseignementsVo = new Array<EnseignementVo>();
        }
       this.validateEnseignements();
       if (this.errorMessages.length === 0) {
              this.selectedEnseignementEtFormation.enseignementsVo.push(this.selectedEnseignements);
              this.selectedEnseignements = new EnseignementVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteEnseignements(p: EnseignementVo) {
        this.selectedEnseignementEtFormation.enseignementsVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignementEtFormation.enseignementsVo.splice(index, 1); }
        });
    }
        addFormationContinues() {
        if( this.selectedEnseignementEtFormation.formationContinuesVo == null ){
            this.selectedEnseignementEtFormation.formationContinuesVo = new Array<FormationContinueVo>();
        }
       this.validateFormationContinues();
       if (this.errorMessages.length === 0) {
              this.selectedEnseignementEtFormation.formationContinuesVo.push(this.selectedFormationContinues);
              this.selectedFormationContinues = new FormationContinueVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteFormationContinues(p: FormationContinueVo) {
        this.selectedEnseignementEtFormation.formationContinuesVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignementEtFormation.formationContinuesVo.splice(index, 1); }
        });
    }
        addResponsabilitePedagogiques() {
        if( this.selectedEnseignementEtFormation.responsabilitePedagogiquesVo == null ){
            this.selectedEnseignementEtFormation.responsabilitePedagogiquesVo = new Array<ResponsabilitePedagogiqueVo>();
        }
       this.validateResponsabilitePedagogiques();
       if (this.errorMessages.length === 0) {
              this.selectedEnseignementEtFormation.responsabilitePedagogiquesVo.push(this.selectedResponsabilitePedagogiques);
              this.selectedResponsabilitePedagogiques = new ResponsabilitePedagogiqueVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteResponsabilitePedagogiques(p: ResponsabilitePedagogiqueVo) {
        this.selectedEnseignementEtFormation.responsabilitePedagogiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignementEtFormation.responsabilitePedagogiquesVo.splice(index, 1); }
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
     this.enseignementEtFormationService.save().subscribe(enseignementEtFormation=>{
       this.enseignementEtFormations.push({...enseignementEtFormation});
       this.createEnseignementEtFormationDialog = false;
       this.submitted = false;
       this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEnseignementEtFormationTempsEstimePourCetteAnnne();

    }

private validateEnseignementEtFormationTempsEstimePourCetteAnnne(){
        if (this.stringUtilService.isEmpty(this.selectedEnseignementEtFormation.tempsEstimePourCetteAnnne)) {
            this.errorMessages.push('Temps estime pour cette annne non valide');
            this.validEnseignementEtFormationTempsEstimePourCetteAnnne = false;
        } else {
            this.validEnseignementEtFormationTempsEstimePourCetteAnnne = true;
        }
    }










            private validateEnseignementIntitule(){
            if (this.selectedEnseignements.intitule == null) {
            this.errorMessages.push('Intitule de la enseignement est  invalide');
             this.validEnseignementIntitule = false;
            } else {
            this.validEnseignementIntitule = true;
            }
            }

            private validateEnseignementNombreHeure(){
            if (this.selectedEnseignements.nombreHeure == null) {
            this.errorMessages.push('NombreHeure de la enseignement est  invalide');
             this.validEnseignementNombreHeure = false;
            } else {
            this.validEnseignementNombreHeure = true;
            }
            }

            private validateEnseignementModaliteEtude(){
            if (this.selectedEnseignements.modaliteEtudeVo == null) {
            this.errorMessages.push('ModaliteEtude de la enseignement est  invalide');
             this.validEnseignementModaliteEtude = false;
            } else {
            this.validEnseignementModaliteEtude = true;
            }
            }

            private validateEnseignementTypeEtudeEnseignements(){
            if (this.selectedEnseignements.typeEtudeEnseignementsVo == null || this.selectedEnseignements.typeEtudeEnseignementsVo.length === 0) {
            this.errorMessages.push('TypeEtudeEnseignements de la enseignement est  invalide');
             this.validEnseignementTypeEtudeEnseignements = false;
            } else {
            this.validEnseignementTypeEtudeEnseignements = true;
            }
            }


            private validateEnseignementNiveauEtudeEnseignements(){
            if (this.selectedEnseignements.niveauEtudeEnseignementsVo == null || this.selectedEnseignements.niveauEtudeEnseignementsVo.length === 0) {
            this.errorMessages.push('NiveauEtudeEnseignements de la enseignement est  invalide');
             this.validEnseignementNiveauEtudeEnseignements = false;
            } else {
            this.validEnseignementNiveauEtudeEnseignements = true;
            }
            }


            private validateEnseignementEtablissementEnseignements(){
            if (this.selectedEnseignements.etablissementEnseignementsVo == null || this.selectedEnseignements.etablissementEnseignementsVo.length === 0) {
            this.errorMessages.push('EtablissementEnseignements de la enseignement est  invalide');
             this.validEnseignementEtablissementEnseignements = false;
            } else {
            this.validEnseignementEtablissementEnseignements = true;
            }
            }

            private validateEnseignementEnseignementZoneGeographiques(){
            if (this.selectedEnseignements.enseignementZoneGeographiquesVo == null || this.selectedEnseignements.enseignementZoneGeographiquesVo.length === 0) {
            this.errorMessages.push('EnseignementZoneGeographiques de la enseignement est  invalide');
             this.validEnseignementEnseignementZoneGeographiques = false;
            } else {
            this.validEnseignementEnseignementZoneGeographiques = true;
            }
            }

            private validateEnseignementEnseignementEnjeuxIrds(){
            if (this.selectedEnseignements.enseignementEnjeuxIrdsVo == null || this.selectedEnseignements.enseignementEnjeuxIrdsVo.length === 0) {
            this.errorMessages.push('EnseignementEnjeuxIrds de la enseignement est  invalide');
             this.validEnseignementEnseignementEnjeuxIrds = false;
            } else {
            this.validEnseignementEnseignementEnjeuxIrds = true;
            }
            }







            private validateFormationContinueIntitule(){
            if (this.selectedFormationContinues.intitule == null) {
            this.errorMessages.push('Intitule de la formationContinue est  invalide');
             this.validFormationContinueIntitule = false;
            } else {
            this.validFormationContinueIntitule = true;
            }
            }

            private validateFormationContinueFormationContinuePubliqueProfessionels(){
            if (this.selectedFormationContinues.formationContinuePubliqueProfessionelsVo == null || this.selectedFormationContinues.formationContinuePubliqueProfessionelsVo.length === 0) {
            this.errorMessages.push('FormationContinuePubliqueProfessionels de la formationContinue est  invalide');
             this.validFormationContinueFormationContinuePubliqueProfessionels = false;
            } else {
            this.validFormationContinueFormationContinuePubliqueProfessionels = true;
            }
            }

            private validateFormationContinueNombreHeuresDispenseesDansAnnee(){
            if (this.selectedFormationContinues.nombreHeuresDispenseesDansAnnee == null) {
            this.errorMessages.push('NombreHeuresDispenseesDansAnnee de la formationContinue est  invalide');
             this.validFormationContinueNombreHeuresDispenseesDansAnnee = false;
            } else {
            this.validFormationContinueNombreHeuresDispenseesDansAnnee = true;
            }
            }

            private validateFormationContinueModaliteFormationContinue(){
            if (this.selectedFormationContinues.modaliteFormationContinueVo == null) {
            this.errorMessages.push('ModaliteFormationContinue de la formationContinue est  invalide');
             this.validFormationContinueModaliteFormationContinue = false;
            } else {
            this.validFormationContinueModaliteFormationContinue = true;
            }
            }


            private validateFormationContinueFormationContinueEnjeuxIrds(){
            if (this.selectedFormationContinues.formationContinueEnjeuxIrdsVo == null || this.selectedFormationContinues.formationContinueEnjeuxIrdsVo.length === 0) {
            this.errorMessages.push('FormationContinueEnjeuxIrds de la formationContinue est  invalide');
             this.validFormationContinueFormationContinueEnjeuxIrds = false;
            } else {
            this.validFormationContinueFormationContinueEnjeuxIrds = true;
            }
            }


            private validateFormationContinuePaysFormationContinue(){
            if (this.selectedFormationContinues.paysFormationContinueVo == null || this.selectedFormationContinues.paysFormationContinueVo.length === 0) {
            this.errorMessages.push('PaysFormationContinue de la formationContinue est  invalide');
             this.validFormationContinuePaysFormationContinue = false;
            } else {
            this.validFormationContinuePaysFormationContinue = true;
            }
            }

            private validateFormationContinueZoneGeographiqueFormationContinues(){
            if (this.selectedFormationContinues.zoneGeographiqueFormationContinuesVo == null || this.selectedFormationContinues.zoneGeographiqueFormationContinuesVo.length === 0) {
            this.errorMessages.push('ZoneGeographiqueFormationContinues de la formationContinue est  invalide');
             this.validFormationContinueZoneGeographiqueFormationContinues = false;
            } else {
            this.validFormationContinueZoneGeographiqueFormationContinues = true;
            }
            }

            private validateFormationContinueFormationContinueCommanditaires(){
            if (this.selectedFormationContinues.formationContinueCommanditairesVo == null || this.selectedFormationContinues.formationContinueCommanditairesVo.length === 0) {
            this.errorMessages.push('FormationContinueCommanditaires de la formationContinue est  invalide');
             this.validFormationContinueFormationContinueCommanditaires = false;
            } else {
            this.validFormationContinueFormationContinueCommanditaires = true;
            }
            }






            private validateResponsabilitePedagogiqueNiveauResponsabilitePedagogique(){
            if (this.selectedResponsabilitePedagogiques.niveauResponsabilitePedagogiqueVo == null) {
            this.errorMessages.push('NiveauResponsabilitePedagogique de la responsabilitePedagogique est  invalide');
             this.validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = false;
            } else {
            this.validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = true;
            }
            }

            private validateResponsabilitePedagogiqueStatusCursus(){
            if (this.selectedResponsabilitePedagogiques.statusCursusVo == null) {
            this.errorMessages.push('StatusCursus de la responsabilitePedagogique est  invalide');
             this.validResponsabilitePedagogiqueStatusCursus = false;
            } else {
            this.validResponsabilitePedagogiqueStatusCursus = true;
            }
            }

            private validateResponsabilitePedagogiqueIntituleCursus(){
            if (this.selectedResponsabilitePedagogiques.intituleCursus == null) {
            this.errorMessages.push('IntituleCursus de la responsabilitePedagogique est  invalide');
             this.validResponsabilitePedagogiqueIntituleCursus = false;
            } else {
            this.validResponsabilitePedagogiqueIntituleCursus = true;
            }
            }




            private validateResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements(){
            if (this.selectedResponsabilitePedagogiques.responsabilitePedagogiqueEtablissementsVo == null || this.selectedResponsabilitePedagogiques.responsabilitePedagogiqueEtablissementsVo.length === 0) {
            this.errorMessages.push('ResponsabilitePedagogiqueEtablissements de la responsabilitePedagogique est  invalide');
             this.validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = false;
            } else {
            this.validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = true;
            }
            }

            private validateResponsabilitePedagogiqueResponsabilitePedagogiquePayss(){
            if (this.selectedResponsabilitePedagogiques.responsabilitePedagogiquePayssVo == null || this.selectedResponsabilitePedagogiques.responsabilitePedagogiquePayssVo.length === 0) {
            this.errorMessages.push('ResponsabilitePedagogiquePayss de la responsabilitePedagogique est  invalide');
             this.validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = false;
            } else {
            this.validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = true;
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
              public async openCreateniveauResponsabilitePedagogique(niveauResponsabilitePedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauResponsabilitePedagogique', 'add');
                       if(isPermistted){
         this.selectedNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();
        this.createNiveauResponsabilitePedagogiqueDialog = true;
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
              public async openCreatestatusCursus(statusCursus: string) {
                      const isPermistted = await this.roleService.isPermitted('StatusCursus', 'add');
                       if(isPermistted){
         this.selectedStatusCursus = new StatusCursusVo();
        this.createStatusCursusDialog = true;
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
    this.createEnseignementEtFormationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get enseignementEtFormations(): Array<EnseignementEtFormationVo> {
    return this.enseignementEtFormationService.enseignementEtFormations;
       }
set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }

 get selectedEnseignementEtFormation():EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
    set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }

   get createEnseignementEtFormationDialog(): boolean {
           return this.enseignementEtFormationService.createEnseignementEtFormationDialog;

       }
    set createEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.createEnseignementEtFormationDialog= value;
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
       get selectedNiveauResponsabilitePedagogique(): NiveauResponsabilitePedagogiqueVo {
           return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
       }
      set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
       }
       get niveauResponsabilitePedagogiques(): Array<NiveauResponsabilitePedagogiqueVo> {
           return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
       }
       set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
       }
       get createNiveauResponsabilitePedagogiqueDialog(): boolean {
           return this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog;
       }
      set createNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog= value;
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
       get selectedStatusCursus(): StatusCursusVo {
           return this.statusCursusService.selectedStatusCursus;
       }
      set selectedStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.selectedStatusCursus = value;
       }
       get statusCursuss(): Array<StatusCursusVo> {
           return this.statusCursusService.statusCursuss;
       }
       set statusCursuss(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursuss = value;
       }
       get createStatusCursusDialog(): boolean {
           return this.statusCursusService.createStatusCursusDialog;
       }
      set createStatusCursusDialog(value: boolean) {
        this.statusCursusService.createStatusCursusDialog= value;
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
    get responsabilitePedagogiqueEnjeuxIrdsVo(): Array<ResponsabilitePedagogiqueEnjeuxIrdVo> {
    if( this._responsabilitePedagogiqueEnjeuxIrdsVo == null )
    this._responsabilitePedagogiqueEnjeuxIrdsVo = new Array();
        return this._responsabilitePedagogiqueEnjeuxIrdsVo;
    }

    set responsabilitePedagogiqueEnjeuxIrdsVo(value: Array<ResponsabilitePedagogiqueEnjeuxIrdVo>) {
        this._responsabilitePedagogiqueEnjeuxIrdsVo = value;
    }
    get responsabilitePedagogiquePayssVo(): Array<ResponsabilitePedagogiquePaysVo> {
    if( this._responsabilitePedagogiquePayssVo == null )
    this._responsabilitePedagogiquePayssVo = new Array();
        return this._responsabilitePedagogiquePayssVo;
    }

    set responsabilitePedagogiquePayssVo(value: Array<ResponsabilitePedagogiquePaysVo>) {
        this._responsabilitePedagogiquePayssVo = value;
    }

    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
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
    get validCampagneLibelle(): boolean {
    return this._validCampagneLibelle;
    }

    set validCampagneLibelle(value: boolean) {
    this._validCampagneLibelle = value;
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
    get validResponsabilitePedagogiqueNiveauResponsabilitePedagogique(): boolean {
    return this._validResponsabilitePedagogiqueNiveauResponsabilitePedagogique;
    }

    set validResponsabilitePedagogiqueNiveauResponsabilitePedagogique(value: boolean) {
    this._validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = value;
    }
    get validResponsabilitePedagogiqueStatusCursus(): boolean {
    return this._validResponsabilitePedagogiqueStatusCursus;
    }

    set validResponsabilitePedagogiqueStatusCursus(value: boolean) {
    this._validResponsabilitePedagogiqueStatusCursus = value;
    }
    get validResponsabilitePedagogiqueIntituleCursus(): boolean {
    return this._validResponsabilitePedagogiqueIntituleCursus;
    }

    set validResponsabilitePedagogiqueIntituleCursus(value: boolean) {
    this._validResponsabilitePedagogiqueIntituleCursus = value;
    }
    get validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements(): boolean {
    return this._validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements;
    }

    set validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements(value: boolean) {
    this._validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = value;
    }
    get validResponsabilitePedagogiqueResponsabilitePedagogiquePayss(): boolean {
    return this._validResponsabilitePedagogiqueResponsabilitePedagogiquePayss;
    }

    set validResponsabilitePedagogiqueResponsabilitePedagogiquePayss(value: boolean) {
    this._validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = value;
    }

}
