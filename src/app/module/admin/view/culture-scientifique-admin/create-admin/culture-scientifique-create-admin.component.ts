import {Component, OnInit, Input} from '@angular/core';
import {CultureScientifiqueService} from '../../../../../controller/service/CultureScientifique.service';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {TypePubliqueRencontreMediaVo} from '../../../../../controller/model/TypePubliqueRencontreMedia.model';
import {TypePubliqueRencontreMediaService} from '../../../../../controller/service/TypePubliqueRencontreMedia.service';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.service';
import {StructureOganisatriceVo} from '../../../../../controller/model/StructureOganisatrice.model';
import {StructureOganisatriceService} from '../../../../../controller/service/StructureOganisatrice.service';
import {PaysRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysRencontreGrandPubliqueJeunePublique.model';
import {PaysRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysRencontreGrandPubliqueJeunePublique.service';
import {OutilPedagogiquePaysConceptionVo} from '../../../../../controller/model/OutilPedagogiquePaysConception.model';
import {OutilPedagogiquePaysConceptionService} from '../../../../../controller/service/OutilPedagogiquePaysConception.service';
import {OutilPedagogiquePubliqueCibleVo} from '../../../../../controller/model/OutilPedagogiquePubliqueCible.model';
import {OutilPedagogiquePubliqueCibleService} from '../../../../../controller/service/OutilPedagogiquePubliqueCible.service';
import {TypeOutilVo} from '../../../../../controller/model/TypeOutil.model';
import {TypeOutilService} from '../../../../../controller/service/TypeOutil.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.service';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {LangueVo} from '../../../../../controller/model/Langue.model';
import {LangueService} from '../../../../../controller/service/Langue.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/TypePubliqueRencontreGrandPubliqueJeunePublique.service';
import {TypeOutilPedagogiqueVo} from '../../../../../controller/model/TypeOutilPedagogique.model';
import {TypeOutilPedagogiqueService} from '../../../../../controller/service/TypeOutilPedagogique.service';
import {OutilPedagogiqueInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueInstrumentIrd.model';
import {OutilPedagogiqueInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueInstrumentIrd.service';
import {OutilPedagogiqueTypeInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueTypeInstrumentIrd.model';
import {OutilPedagogiqueTypeInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueTypeInstrumentIrd.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
import {OutilPedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/OutilPedagogiqueEnjeuxIrd.model';
import {OutilPedagogiqueEnjeuxIrdService} from '../../../../../controller/service/OutilPedagogiqueEnjeuxIrd.service';
import {RencontreMediaPeriodeVo} from '../../../../../controller/model/RencontreMediaPeriode.model';
import {RencontreMediaPeriodeService} from '../../../../../controller/service/RencontreMediaPeriode.service';
import {NatureActiviteGrandPubliqueVo} from '../../../../../controller/model/NatureActiviteGrandPublique.model';
import {NatureActiviteGrandPubliqueService} from '../../../../../controller/service/NatureActiviteGrandPublique.service';
import {OutilPedagogiqueLangueVo} from '../../../../../controller/model/OutilPedagogiqueLangue.model';
import {OutilPedagogiqueLangueService} from '../../../../../controller/service/OutilPedagogiqueLangue.service';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.service';
import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {ContexteVo} from '../../../../../controller/model/Contexte.model';
import {ContexteService} from '../../../../../controller/service/Contexte.service';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysOrganisateurRencontreGrandPubliqueJeunePublique.model';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysOrganisateurRencontreGrandPubliqueJeunePublique.service';
import {OutilPedagogiqueDisciplineScientifiqueVo} from '../../../../../controller/model/OutilPedagogiqueDisciplineScientifique.model';
import {OutilPedagogiqueDisciplineScientifiqueService} from '../../../../../controller/service/OutilPedagogiqueDisciplineScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {RencontreMediaEnjeuxIrdVo} from '../../../../../controller/model/RencontreMediaEnjeuxIrd.model';
import {RencontreMediaEnjeuxIrdService} from '../../../../../controller/service/RencontreMediaEnjeuxIrd.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
import {FormatRencontreService} from '../../../../../controller/service/FormatRencontre.service';
import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliquePeriode.model';
import {RencontreGrandPubliqueJeunePubliquePeriodeService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliquePeriode.service';
import {PaysRencontreMediaVo} from '../../../../../controller/model/PaysRencontreMedia.model';
import {PaysRencontreMediaService} from '../../../../../controller/service/PaysRencontreMedia.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {PubliqueCibleVo} from '../../../../../controller/model/PubliqueCible.model';
import {PubliqueCibleService} from '../../../../../controller/service/PubliqueCible.service';
import {OutilPedagogiquePaysDiffusionVo} from '../../../../../controller/model/OutilPedagogiquePaysDiffusion.model';
import {OutilPedagogiquePaysDiffusionService} from '../../../../../controller/service/OutilPedagogiquePaysDiffusion.service';
import {RencontreMediaDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreMediaDisciplineScientifique.model';
import {RencontreMediaDisciplineScientifiqueService} from '../../../../../controller/service/RencontreMediaDisciplineScientifique.service';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
@Component({
  selector: 'app-culture-scientifique-create-admin',
  templateUrl: './culture-scientifique-create-admin.component.html',
  styleUrls: ['./culture-scientifique-create-admin.component.css']
})
export class CultureScientifiqueCreateAdminComponent implements OnInit {

        selectedRencontreGrandPubliqueJeunePubliques: RencontreGrandPubliqueJeunePubliqueVo = new RencontreGrandPubliqueJeunePubliqueVo();
        selectedRencontreMedias: RencontreMediaVo = new RencontreMediaVo();
        selectedOutilPedagogiques: OutilPedagogiqueVo = new OutilPedagogiqueVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCampagneLibelle = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;
    _validNatureActiviteGrandPubliqueLibelle = true;
    _validNatureActiviteGrandPubliqueCode = true;

       private _typePubliqueRencontreGrandPubliqueJeunePubliquesVo: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> = [];
       private _rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> = [];
       private _rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> = [];
       private _structureOganisatricesVo: Array<StructureOganisatriceVo> = [];
       private _paysRencontreGrandPubliqueJeunePubliquesVo: Array<PaysRencontreGrandPubliqueJeunePubliqueVo> = [];
       private _paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> = [];
       private _rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> = [];
       private _rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> = [];
       private _typePubliqueRencontreMediasVo: Array<TypePubliqueRencontreMediaVo> = [];
       private _rencontreMediaEnjeuxIrdsVo: Array<RencontreMediaEnjeuxIrdVo> = [];
       private _rencontreMediaDisciplineScientifiquesVo: Array<RencontreMediaDisciplineScientifiqueVo> = [];
       private _paysRencontreMediasVo: Array<PaysRencontreMediaVo> = [];
       private _outilPedagogiqueEnjeuxIrdsVo: Array<OutilPedagogiqueEnjeuxIrdVo> = [];
       private _outilPedagogiqueDisciplineScientifiquesVo: Array<OutilPedagogiqueDisciplineScientifiqueVo> = [];
       private _outilPedagogiquePubliqueCiblesVo: Array<OutilPedagogiquePubliqueCibleVo> = [];
       private _typeOutilPedagogiquesVo: Array<TypeOutilPedagogiqueVo> = [];
       private _outilPedagogiqueLanguesVo: Array<OutilPedagogiqueLangueVo> = [];
       private _outilPedagogiquePaysConceptionsVo: Array<OutilPedagogiquePaysConceptionVo> = [];
       private _outilPedagogiquePaysDiffusionsVo: Array<OutilPedagogiquePaysDiffusionVo> = [];
       private _outilPedagogiqueInstrumentIrdsVo: Array<OutilPedagogiqueInstrumentIrdVo> = [];
       private _outilPedagogiqueTypeInstrumentIrdsVo: Array<OutilPedagogiqueTypeInstrumentIrdVo> = [];


constructor(private datePipe: DatePipe, private cultureScientifiqueService: CultureScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private instrumentIrdService :InstrumentIrdService
,       private chercheurService :ChercheurService
,       private natureActiviteGrandPubliqueService :NatureActiviteGrandPubliqueService
,       private formatRencontreService :FormatRencontreService
,       private enjeuxIrdService :EnjeuxIrdService
,       private langueService :LangueService
,       private etablissementService :EtablissementService
,       private typeInstrumentIrdService :TypeInstrumentIrdService
,       private rencontreMediaService :RencontreMediaService
,       private campagneService :CampagneService
,       private contexteService :ContexteService
,       private publiqueCibleService :PubliqueCibleService
,       private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
,       private typePubliqueService :TypePubliqueService
,       private outilPedagogiqueService :OutilPedagogiqueService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private typeOutilService :TypeOutilService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {


                this.selectedRencontreGrandPubliqueJeunePubliques.formatRencontreVo = new FormatRencontreVo();
                this.formatRencontreService.findAll().subscribe((data) => this.formatRencontres = data);
                this.selectedRencontreGrandPubliqueJeunePubliques.contexteVo = new ContexteVo();
                this.contexteService.findAll().subscribe((data) => this.contextes = data);
                this.selectedRencontreGrandPubliqueJeunePubliques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedRencontreGrandPubliqueJeunePubliques.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.typePubliqueService.findAll().subscribe(data => this.prepareTypePubliqueRencontreGrandPubliqueJeunePubliques(data));
                this.enjeuxIrdService.findAll().subscribe(data => this.prepareRencontreGrandPubliqueJeunePubliqueEnjeuxIrds(data));
                this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(data));
                this.etablissementService.findAll().subscribe(data => this.prepareStructureOganisatrices(data));
                this.paysService.findAll().subscribe(data => this.preparePaysRencontreGrandPubliqueJeunePubliques(data));
                this.paysService.findAll().subscribe(data => this.preparePaysOrganisateurRencontreGrandPubliqueJeunePubliques(data));
                this.instrumentIrdService.findAll().subscribe(data => this.prepareRencontreGrandPubliqueJeunePubliqueInstrumentIrds(data));
                this.typeInstrumentIrdService.findAll().subscribe(data => this.prepareRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(data));


                this.selectedRencontreMedias.formatRencontreVo = new FormatRencontreVo();
                this.formatRencontreService.findAll().subscribe((data) => this.formatRencontres = data);
                this.selectedRencontreMedias.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.typePubliqueService.findAll().subscribe(data => this.prepareTypePubliqueRencontreMedias(data));
                this.enjeuxIrdService.findAll().subscribe(data => this.prepareRencontreMediaEnjeuxIrds(data));
                this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareRencontreMediaDisciplineScientifiques(data));
                this.paysService.findAll().subscribe(data => this.preparePaysRencontreMedias(data));


                this.selectedOutilPedagogiques.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.enjeuxIrdService.findAll().subscribe(data => this.prepareOutilPedagogiqueEnjeuxIrds(data));
                this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareOutilPedagogiqueDisciplineScientifiques(data));
                this.publiqueCibleService.findAll().subscribe(data => this.prepareOutilPedagogiquePubliqueCibles(data));
                this.typeOutilService.findAll().subscribe(data => this.prepareTypeOutilPedagogiques(data));
                this.langueService.findAll().subscribe(data => this.prepareOutilPedagogiqueLangues(data));
                this.paysService.findAll().subscribe(data => this.prepareOutilPedagogiquePaysConceptions(data));
                this.paysService.findAll().subscribe(data => this.prepareOutilPedagogiquePaysDiffusions(data));
                this.instrumentIrdService.findAll().subscribe(data => this.prepareOutilPedagogiqueInstrumentIrds(data));
                this.typeInstrumentIrdService.findAll().subscribe(data => this.prepareOutilPedagogiqueTypeInstrumentIrds(data));

    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedNatureActiviteGrandPublique = new NatureActiviteGrandPubliqueVo();
    this.natureActiviteGrandPubliqueService.findAll().subscribe((data) => this.natureActiviteGrandPubliques = data);
}

   prepareTypePubliqueRencontreGrandPubliqueJeunePubliques(typePubliques: Array<TypePubliqueVo>): void{
        if( typePubliques != null){
        typePubliques.forEach(e => {
        const typePubliqueRencontreGrandPubliqueJeunePublique = new TypePubliqueRencontreGrandPubliqueJeunePubliqueVo();
        typePubliqueRencontreGrandPubliqueJeunePublique.typePubliqueVo = e;
        this.typePubliqueRencontreGrandPubliqueJeunePubliquesVo.push(typePubliqueRencontreGrandPubliqueJeunePublique);
        });
        }
   }
   prepareRencontreGrandPubliqueJeunePubliqueEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const rencontreGrandPubliqueJeunePubliqueEnjeuxIrd = new RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo();
        rencontreGrandPubliqueJeunePubliqueEnjeuxIrd.enjeuxIrdVo = e;
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo.push(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd);
        });
        }
   }
   prepareRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const rencontreGrandPubliqueJeunePubliqueDisciplineScientifique = new RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo();
        rencontreGrandPubliqueJeunePubliqueDisciplineScientifique.disciplineScientifiqueVo = e;
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo.push(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique);
        });
        }
   }
   prepareStructureOganisatrices(etablissements: Array<EtablissementVo>): void{
        if( etablissements != null){
        etablissements.forEach(e => {
        const structureOganisatrice = new StructureOganisatriceVo();
        structureOganisatrice.etablissementVo = e;
        this.structureOganisatricesVo.push(structureOganisatrice);
        });
        }
   }
   preparePaysRencontreGrandPubliqueJeunePubliques(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const paysRencontreGrandPubliqueJeunePublique = new PaysRencontreGrandPubliqueJeunePubliqueVo();
        paysRencontreGrandPubliqueJeunePublique.paysVo = e;
        this.paysRencontreGrandPubliqueJeunePubliquesVo.push(paysRencontreGrandPubliqueJeunePublique);
        });
        }
   }
   preparePaysOrganisateurRencontreGrandPubliqueJeunePubliques(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const paysOrganisateurRencontreGrandPubliqueJeunePublique = new PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo();
        paysOrganisateurRencontreGrandPubliqueJeunePublique.paysVo = e;
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo.push(paysOrganisateurRencontreGrandPubliqueJeunePublique);
        });
        }
   }
   prepareRencontreGrandPubliqueJeunePubliqueInstrumentIrds(instrumentIrds: Array<InstrumentIrdVo>): void{
        if( instrumentIrds != null){
        instrumentIrds.forEach(e => {
        const rencontreGrandPubliqueJeunePubliqueInstrumentIrd = new RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo();
        rencontreGrandPubliqueJeunePubliqueInstrumentIrd.instrumentIrdVo = e;
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo.push(rencontreGrandPubliqueJeunePubliqueInstrumentIrd);
        });
        }
   }
   prepareRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(typeInstrumentIrds: Array<TypeInstrumentIrdVo>): void{
        if( typeInstrumentIrds != null){
        typeInstrumentIrds.forEach(e => {
        const rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = new RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo();
        rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.typeInstrumentIrdVo = e;
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo.push(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd);
        });
        }
   }
   prepareTypePubliqueRencontreMedias(typePubliques: Array<TypePubliqueVo>): void{
        if( typePubliques != null){
        typePubliques.forEach(e => {
        const typePubliqueRencontreMedia = new TypePubliqueRencontreMediaVo();
        typePubliqueRencontreMedia.typePubliqueVo = e;
        this.typePubliqueRencontreMediasVo.push(typePubliqueRencontreMedia);
        });
        }
   }
   prepareRencontreMediaEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const rencontreMediaEnjeuxIrd = new RencontreMediaEnjeuxIrdVo();
        rencontreMediaEnjeuxIrd.enjeuxIrdVo = e;
        this.rencontreMediaEnjeuxIrdsVo.push(rencontreMediaEnjeuxIrd);
        });
        }
   }
   prepareRencontreMediaDisciplineScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const rencontreMediaDisciplineScientifique = new RencontreMediaDisciplineScientifiqueVo();
        rencontreMediaDisciplineScientifique.disciplineScientifiqueVo = e;
        this.rencontreMediaDisciplineScientifiquesVo.push(rencontreMediaDisciplineScientifique);
        });
        }
   }
   preparePaysRencontreMedias(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const paysRencontreMedia = new PaysRencontreMediaVo();
        paysRencontreMedia.paysVo = e;
        this.paysRencontreMediasVo.push(paysRencontreMedia);
        });
        }
   }
   prepareOutilPedagogiqueEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const outilPedagogiqueEnjeuxIrd = new OutilPedagogiqueEnjeuxIrdVo();
        outilPedagogiqueEnjeuxIrd.enjeuxIrdVo = e;
        this.outilPedagogiqueEnjeuxIrdsVo.push(outilPedagogiqueEnjeuxIrd);
        });
        }
   }
   prepareOutilPedagogiqueDisciplineScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const outilPedagogiqueDisciplineScientifique = new OutilPedagogiqueDisciplineScientifiqueVo();
        outilPedagogiqueDisciplineScientifique.disciplineScientifiqueVo = e;
        this.outilPedagogiqueDisciplineScientifiquesVo.push(outilPedagogiqueDisciplineScientifique);
        });
        }
   }
   prepareOutilPedagogiquePubliqueCibles(publiqueCibles: Array<PubliqueCibleVo>): void{
        if( publiqueCibles != null){
        publiqueCibles.forEach(e => {
        const outilPedagogiquePubliqueCible = new OutilPedagogiquePubliqueCibleVo();
        outilPedagogiquePubliqueCible.publiqueCibleVo = e;
        this.outilPedagogiquePubliqueCiblesVo.push(outilPedagogiquePubliqueCible);
        });
        }
   }
   prepareTypeOutilPedagogiques(typeOutils: Array<TypeOutilVo>): void{
        if( typeOutils != null){
        typeOutils.forEach(e => {
        const typeOutilPedagogique = new TypeOutilPedagogiqueVo();
        typeOutilPedagogique.typeOutilVo = e;
        this.typeOutilPedagogiquesVo.push(typeOutilPedagogique);
        });
        }
   }
   prepareOutilPedagogiqueLangues(langues: Array<LangueVo>): void{
        if( langues != null){
        langues.forEach(e => {
        const outilPedagogiqueLangue = new OutilPedagogiqueLangueVo();
        outilPedagogiqueLangue.langueVo = e;
        this.outilPedagogiqueLanguesVo.push(outilPedagogiqueLangue);
        });
        }
   }
   prepareOutilPedagogiquePaysConceptions(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const outilPedagogiquePaysConception = new OutilPedagogiquePaysConceptionVo();
        outilPedagogiquePaysConception.paysVo = e;
        this.outilPedagogiquePaysConceptionsVo.push(outilPedagogiquePaysConception);
        });
        }
   }
   prepareOutilPedagogiquePaysDiffusions(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const outilPedagogiquePaysDiffusion = new OutilPedagogiquePaysDiffusionVo();
        outilPedagogiquePaysDiffusion.paysVo = e;
        this.outilPedagogiquePaysDiffusionsVo.push(outilPedagogiquePaysDiffusion);
        });
        }
   }
   prepareOutilPedagogiqueInstrumentIrds(instrumentIrds: Array<InstrumentIrdVo>): void{
        if( instrumentIrds != null){
        instrumentIrds.forEach(e => {
        const outilPedagogiqueInstrumentIrd = new OutilPedagogiqueInstrumentIrdVo();
        outilPedagogiqueInstrumentIrd.instrumentIrdVo = e;
        this.outilPedagogiqueInstrumentIrdsVo.push(outilPedagogiqueInstrumentIrd);
        });
        }
   }
   prepareOutilPedagogiqueTypeInstrumentIrds(typeInstrumentIrds: Array<TypeInstrumentIrdVo>): void{
        if( typeInstrumentIrds != null){
        typeInstrumentIrds.forEach(e => {
        const outilPedagogiqueTypeInstrumentIrd = new OutilPedagogiqueTypeInstrumentIrdVo();
        outilPedagogiqueTypeInstrumentIrd.typeInstrumentIrdVo = e;
        this.outilPedagogiqueTypeInstrumentIrdsVo.push(outilPedagogiqueTypeInstrumentIrd);
        });
        }
   }

    validateRencontreGrandPubliqueJeunePubliques(){
    this.errorMessages = new Array();
    }
    validateRencontreMedias(){
    this.errorMessages = new Array();
    }
    validateOutilPedagogiques(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    }

        addRencontreGrandPubliqueJeunePubliques() {
        if( this.selectedCultureScientifique.rencontreGrandPubliqueJeunePubliquesVo == null ){
            this.selectedCultureScientifique.rencontreGrandPubliqueJeunePubliquesVo = new Array<RencontreGrandPubliqueJeunePubliqueVo>();
        }
       this.validateRencontreGrandPubliqueJeunePubliques();
       if (this.errorMessages.length === 0) {
              this.selectedCultureScientifique.rencontreGrandPubliqueJeunePubliquesVo.push(this.selectedRencontreGrandPubliqueJeunePubliques);
              this.selectedRencontreGrandPubliqueJeunePubliques = new RencontreGrandPubliqueJeunePubliqueVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteRencontreGrandPubliqueJeunePubliques(p: RencontreGrandPubliqueJeunePubliqueVo) {
        this.selectedCultureScientifique.rencontreGrandPubliqueJeunePubliquesVo.forEach((element, index) => {
            if (element === p) { this.selectedCultureScientifique.rencontreGrandPubliqueJeunePubliquesVo.splice(index, 1); }
        });
    }
        addRencontreMedias() {
        if( this.selectedCultureScientifique.rencontreMediasVo == null ){
            this.selectedCultureScientifique.rencontreMediasVo = new Array<RencontreMediaVo>();
        }
       this.validateRencontreMedias();
       if (this.errorMessages.length === 0) {
              this.selectedCultureScientifique.rencontreMediasVo.push(this.selectedRencontreMedias);
              this.selectedRencontreMedias = new RencontreMediaVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteRencontreMedias(p: RencontreMediaVo) {
        this.selectedCultureScientifique.rencontreMediasVo.forEach((element, index) => {
            if (element === p) { this.selectedCultureScientifique.rencontreMediasVo.splice(index, 1); }
        });
    }
        addOutilPedagogiques() {
        if( this.selectedCultureScientifique.outilPedagogiquesVo == null ){
            this.selectedCultureScientifique.outilPedagogiquesVo = new Array<OutilPedagogiqueVo>();
        }
       this.validateOutilPedagogiques();
       if (this.errorMessages.length === 0) {
              this.selectedCultureScientifique.outilPedagogiquesVo.push(this.selectedOutilPedagogiques);
              this.selectedOutilPedagogiques = new OutilPedagogiqueVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteOutilPedagogiques(p: OutilPedagogiqueVo) {
        this.selectedCultureScientifique.outilPedagogiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedCultureScientifique.outilPedagogiquesVo.splice(index, 1); }
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
     this.cultureScientifiqueService.save().subscribe(cultureScientifique=>{
       this.cultureScientifiques.push({...cultureScientifique});
       this.createCultureScientifiqueDialog = false;
       this.submitted = false;
       this.selectedCultureScientifique = new CultureScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }





































































//openPopup
              public async openCreatenatureActiviteGrandPublique(natureActiviteGrandPublique: string) {
                      const isPermistted = await this.roleService.isPermitted('NatureActiviteGrandPublique', 'add');
                       if(isPermistted){
         this.selectedNatureActiviteGrandPublique = new NatureActiviteGrandPubliqueVo();
        this.createNatureActiviteGrandPubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateformatRencontre(formatRencontre: string) {
                      const isPermistted = await this.roleService.isPermitted('FormatRencontre', 'add');
                       if(isPermistted){
         this.selectedFormatRencontre = new FormatRencontreVo();
        this.createFormatRencontreDialog = true;
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
              public async openCreatecontexte(contexte: string) {
                      const isPermistted = await this.roleService.isPermitted('Contexte', 'add');
                       if(isPermistted){
         this.selectedContexte = new ContexteVo();
        this.createContexteDialog = true;
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
// methods

hideCreateDialog(){
    this.createCultureScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get cultureScientifiques(): Array<CultureScientifiqueVo> {
    return this.cultureScientifiqueService.cultureScientifiques;
       }
set cultureScientifiques(value: Array<CultureScientifiqueVo>) {
        this.cultureScientifiqueService.cultureScientifiques = value;
       }

 get selectedCultureScientifique():CultureScientifiqueVo {
           return this.cultureScientifiqueService.selectedCultureScientifique;
       }
    set selectedCultureScientifique(value: CultureScientifiqueVo) {
        this.cultureScientifiqueService.selectedCultureScientifique = value;
       }

   get createCultureScientifiqueDialog(): boolean {
           return this.cultureScientifiqueService.createCultureScientifiqueDialog;

       }
    set createCultureScientifiqueDialog(value: boolean) {
        this.cultureScientifiqueService.createCultureScientifiqueDialog= value;
       }

       get selectedNatureActiviteGrandPublique(): NatureActiviteGrandPubliqueVo {
           return this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique;
       }
      set selectedNatureActiviteGrandPublique(value: NatureActiviteGrandPubliqueVo) {
        this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique = value;
       }
       get natureActiviteGrandPubliques(): Array<NatureActiviteGrandPubliqueVo> {
           return this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques;
       }
       set natureActiviteGrandPubliques(value: Array<NatureActiviteGrandPubliqueVo>) {
        this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques = value;
       }
       get createNatureActiviteGrandPubliqueDialog(): boolean {
           return this.natureActiviteGrandPubliqueService.createNatureActiviteGrandPubliqueDialog;
       }
      set createNatureActiviteGrandPubliqueDialog(value: boolean) {
        this.natureActiviteGrandPubliqueService.createNatureActiviteGrandPubliqueDialog= value;
       }
       get selectedFormatRencontre(): FormatRencontreVo {
           return this.formatRencontreService.selectedFormatRencontre;
       }
      set selectedFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.selectedFormatRencontre = value;
       }
       get formatRencontres(): Array<FormatRencontreVo> {
           return this.formatRencontreService.formatRencontres;
       }
       set formatRencontres(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontres = value;
       }
       get createFormatRencontreDialog(): boolean {
           return this.formatRencontreService.createFormatRencontreDialog;
       }
      set createFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.createFormatRencontreDialog= value;
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
       get selectedContexte(): ContexteVo {
           return this.contexteService.selectedContexte;
       }
      set selectedContexte(value: ContexteVo) {
        this.contexteService.selectedContexte = value;
       }
       get contextes(): Array<ContexteVo> {
           return this.contexteService.contextes;
       }
       set contextes(value: Array<ContexteVo>) {
        this.contexteService.contextes = value;
       }
       get createContexteDialog(): boolean {
           return this.contexteService.createContexteDialog;
       }
      set createContexteDialog(value: boolean) {
        this.contexteService.createContexteDialog= value;
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



    get typePubliqueRencontreGrandPubliqueJeunePubliquesVo(): Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> {
    if( this._typePubliqueRencontreGrandPubliqueJeunePubliquesVo == null )
    this._typePubliqueRencontreGrandPubliqueJeunePubliquesVo = new Array();
        return this._typePubliqueRencontreGrandPubliqueJeunePubliquesVo;
    }

    set typePubliqueRencontreGrandPubliqueJeunePubliquesVo(value: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>) {
        this._typePubliqueRencontreGrandPubliqueJeunePubliquesVo = value;
    }
    get rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo(): Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> {
    if( this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo == null )
    this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo = new Array();
        return this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo;
    }

    set rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo(value: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>) {
        this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo = value;
    }
    get rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo(): Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> {
    if( this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo == null )
    this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo = new Array();
        return this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo;
    }

    set rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo(value: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>) {
        this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo = value;
    }
    get structureOganisatricesVo(): Array<StructureOganisatriceVo> {
    if( this._structureOganisatricesVo == null )
    this._structureOganisatricesVo = new Array();
        return this._structureOganisatricesVo;
    }

    set structureOganisatricesVo(value: Array<StructureOganisatriceVo>) {
        this._structureOganisatricesVo = value;
    }
    get paysRencontreGrandPubliqueJeunePubliquesVo(): Array<PaysRencontreGrandPubliqueJeunePubliqueVo> {
    if( this._paysRencontreGrandPubliqueJeunePubliquesVo == null )
    this._paysRencontreGrandPubliqueJeunePubliquesVo = new Array();
        return this._paysRencontreGrandPubliqueJeunePubliquesVo;
    }

    set paysRencontreGrandPubliqueJeunePubliquesVo(value: Array<PaysRencontreGrandPubliqueJeunePubliqueVo>) {
        this._paysRencontreGrandPubliqueJeunePubliquesVo = value;
    }
    get paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo(): Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> {
    if( this._paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo == null )
    this._paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo = new Array();
        return this._paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo;
    }

    set paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo(value: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>) {
        this._paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo = value;
    }
    get rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo(): Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> {
    if( this._rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo == null )
    this._rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo = new Array();
        return this._rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo;
    }

    set rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo(value: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>) {
        this._rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo = value;
    }
    get rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo(): Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> {
    if( this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo == null )
    this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo = new Array();
        return this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo;
    }

    set rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo(value: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>) {
        this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo = value;
    }
    get typePubliqueRencontreMediasVo(): Array<TypePubliqueRencontreMediaVo> {
    if( this._typePubliqueRencontreMediasVo == null )
    this._typePubliqueRencontreMediasVo = new Array();
        return this._typePubliqueRencontreMediasVo;
    }

    set typePubliqueRencontreMediasVo(value: Array<TypePubliqueRencontreMediaVo>) {
        this._typePubliqueRencontreMediasVo = value;
    }
    get rencontreMediaEnjeuxIrdsVo(): Array<RencontreMediaEnjeuxIrdVo> {
    if( this._rencontreMediaEnjeuxIrdsVo == null )
    this._rencontreMediaEnjeuxIrdsVo = new Array();
        return this._rencontreMediaEnjeuxIrdsVo;
    }

    set rencontreMediaEnjeuxIrdsVo(value: Array<RencontreMediaEnjeuxIrdVo>) {
        this._rencontreMediaEnjeuxIrdsVo = value;
    }
    get rencontreMediaDisciplineScientifiquesVo(): Array<RencontreMediaDisciplineScientifiqueVo> {
    if( this._rencontreMediaDisciplineScientifiquesVo == null )
    this._rencontreMediaDisciplineScientifiquesVo = new Array();
        return this._rencontreMediaDisciplineScientifiquesVo;
    }

    set rencontreMediaDisciplineScientifiquesVo(value: Array<RencontreMediaDisciplineScientifiqueVo>) {
        this._rencontreMediaDisciplineScientifiquesVo = value;
    }
    get paysRencontreMediasVo(): Array<PaysRencontreMediaVo> {
    if( this._paysRencontreMediasVo == null )
    this._paysRencontreMediasVo = new Array();
        return this._paysRencontreMediasVo;
    }

    set paysRencontreMediasVo(value: Array<PaysRencontreMediaVo>) {
        this._paysRencontreMediasVo = value;
    }
    get outilPedagogiqueEnjeuxIrdsVo(): Array<OutilPedagogiqueEnjeuxIrdVo> {
    if( this._outilPedagogiqueEnjeuxIrdsVo == null )
    this._outilPedagogiqueEnjeuxIrdsVo = new Array();
        return this._outilPedagogiqueEnjeuxIrdsVo;
    }

    set outilPedagogiqueEnjeuxIrdsVo(value: Array<OutilPedagogiqueEnjeuxIrdVo>) {
        this._outilPedagogiqueEnjeuxIrdsVo = value;
    }
    get outilPedagogiqueDisciplineScientifiquesVo(): Array<OutilPedagogiqueDisciplineScientifiqueVo> {
    if( this._outilPedagogiqueDisciplineScientifiquesVo == null )
    this._outilPedagogiqueDisciplineScientifiquesVo = new Array();
        return this._outilPedagogiqueDisciplineScientifiquesVo;
    }

    set outilPedagogiqueDisciplineScientifiquesVo(value: Array<OutilPedagogiqueDisciplineScientifiqueVo>) {
        this._outilPedagogiqueDisciplineScientifiquesVo = value;
    }
    get outilPedagogiquePubliqueCiblesVo(): Array<OutilPedagogiquePubliqueCibleVo> {
    if( this._outilPedagogiquePubliqueCiblesVo == null )
    this._outilPedagogiquePubliqueCiblesVo = new Array();
        return this._outilPedagogiquePubliqueCiblesVo;
    }

    set outilPedagogiquePubliqueCiblesVo(value: Array<OutilPedagogiquePubliqueCibleVo>) {
        this._outilPedagogiquePubliqueCiblesVo = value;
    }
    get typeOutilPedagogiquesVo(): Array<TypeOutilPedagogiqueVo> {
    if( this._typeOutilPedagogiquesVo == null )
    this._typeOutilPedagogiquesVo = new Array();
        return this._typeOutilPedagogiquesVo;
    }

    set typeOutilPedagogiquesVo(value: Array<TypeOutilPedagogiqueVo>) {
        this._typeOutilPedagogiquesVo = value;
    }
    get outilPedagogiqueLanguesVo(): Array<OutilPedagogiqueLangueVo> {
    if( this._outilPedagogiqueLanguesVo == null )
    this._outilPedagogiqueLanguesVo = new Array();
        return this._outilPedagogiqueLanguesVo;
    }

    set outilPedagogiqueLanguesVo(value: Array<OutilPedagogiqueLangueVo>) {
        this._outilPedagogiqueLanguesVo = value;
    }
    get outilPedagogiquePaysConceptionsVo(): Array<OutilPedagogiquePaysConceptionVo> {
    if( this._outilPedagogiquePaysConceptionsVo == null )
    this._outilPedagogiquePaysConceptionsVo = new Array();
        return this._outilPedagogiquePaysConceptionsVo;
    }

    set outilPedagogiquePaysConceptionsVo(value: Array<OutilPedagogiquePaysConceptionVo>) {
        this._outilPedagogiquePaysConceptionsVo = value;
    }
    get outilPedagogiquePaysDiffusionsVo(): Array<OutilPedagogiquePaysDiffusionVo> {
    if( this._outilPedagogiquePaysDiffusionsVo == null )
    this._outilPedagogiquePaysDiffusionsVo = new Array();
        return this._outilPedagogiquePaysDiffusionsVo;
    }

    set outilPedagogiquePaysDiffusionsVo(value: Array<OutilPedagogiquePaysDiffusionVo>) {
        this._outilPedagogiquePaysDiffusionsVo = value;
    }
    get outilPedagogiqueInstrumentIrdsVo(): Array<OutilPedagogiqueInstrumentIrdVo> {
    if( this._outilPedagogiqueInstrumentIrdsVo == null )
    this._outilPedagogiqueInstrumentIrdsVo = new Array();
        return this._outilPedagogiqueInstrumentIrdsVo;
    }

    set outilPedagogiqueInstrumentIrdsVo(value: Array<OutilPedagogiqueInstrumentIrdVo>) {
        this._outilPedagogiqueInstrumentIrdsVo = value;
    }
    get outilPedagogiqueTypeInstrumentIrdsVo(): Array<OutilPedagogiqueTypeInstrumentIrdVo> {
    if( this._outilPedagogiqueTypeInstrumentIrdsVo == null )
    this._outilPedagogiqueTypeInstrumentIrdsVo = new Array();
        return this._outilPedagogiqueTypeInstrumentIrdsVo;
    }

    set outilPedagogiqueTypeInstrumentIrdsVo(value: Array<OutilPedagogiqueTypeInstrumentIrdVo>) {
        this._outilPedagogiqueTypeInstrumentIrdsVo = value;
    }

    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validCampagneLibelle(): boolean {
    return this._validCampagneLibelle;
    }

    set validCampagneLibelle(value: boolean) {
    this._validCampagneLibelle = value;
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
    get validNatureActiviteGrandPubliqueLibelle(): boolean {
    return this._validNatureActiviteGrandPubliqueLibelle;
    }

    set validNatureActiviteGrandPubliqueLibelle(value: boolean) {
    this._validNatureActiviteGrandPubliqueLibelle = value;
    }
    get validNatureActiviteGrandPubliqueCode(): boolean {
    return this._validNatureActiviteGrandPubliqueCode;
    }

    set validNatureActiviteGrandPubliqueCode(value: boolean) {
    this._validNatureActiviteGrandPubliqueCode = value;
    }

}
