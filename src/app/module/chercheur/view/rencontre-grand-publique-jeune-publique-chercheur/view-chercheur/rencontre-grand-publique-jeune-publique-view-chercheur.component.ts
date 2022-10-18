import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
import {FormatRencontreService} from '../../../../../controller/service/FormatRencontre.service';
import {PaysRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysRencontreGrandPubliqueJeunePublique.model';
import {PaysRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysRencontreGrandPubliqueJeunePublique.service';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import {CultureScientifiqueService} from '../../../../../controller/service/CultureScientifique.service';
import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliquePeriode.model';
import {RencontreGrandPubliqueJeunePubliquePeriodeService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliquePeriode.service';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysOrganisateurRencontreGrandPubliqueJeunePublique.model';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysOrganisateurRencontreGrandPubliqueJeunePublique.service';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/TypePubliqueRencontreGrandPubliqueJeunePublique.service';
import {StructureOganisatriceVo} from '../../../../../controller/model/StructureOganisatrice.model';
import {StructureOganisatriceService} from '../../../../../controller/service/StructureOganisatrice.service';
import {ContexteVo} from '../../../../../controller/model/Contexte.model';
import {ContexteService} from '../../../../../controller/service/Contexte.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-view-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-view-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-view-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueViewChercheurComponent implements OnInit {

        selectedTypePubliqueRencontreGrandPubliqueJeunePubliques: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo = new TypePubliqueRencontreGrandPubliqueJeunePubliqueVo();
        typePubliqueRencontreGrandPubliqueJeunePubliquesListe: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> = [];

        myTypePubliques: Array<TypePubliqueVo> = [];

        selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrds: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo = new RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo();
        rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsListe: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo = new RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo();
        rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesListe: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

        selectedRencontreGrandPubliqueJeunePubliquePeriodes: RencontreGrandPubliqueJeunePubliquePeriodeVo = new RencontreGrandPubliqueJeunePubliquePeriodeVo();
        rencontreGrandPubliqueJeunePubliquePeriodesListe: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo> = [];


        selectedStructureOganisatrices: StructureOganisatriceVo = new StructureOganisatriceVo();
        structureOganisatricesListe: Array<StructureOganisatriceVo> = [];

        myEtablissements: Array<EtablissementVo> = [];

        selectedPaysRencontreGrandPubliqueJeunePubliques: PaysRencontreGrandPubliqueJeunePubliqueVo = new PaysRencontreGrandPubliqueJeunePubliqueVo();
        paysRencontreGrandPubliqueJeunePubliquesListe: Array<PaysRencontreGrandPubliqueJeunePubliqueVo> = [];

        myPayss: Array<PaysVo> = [];

        selectedPaysOrganisateurRencontreGrandPubliqueJeunePubliques: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo = new PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo();
        paysOrganisateurRencontreGrandPubliqueJeunePubliquesListe: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> = [];


        selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrds: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo = new RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo();
        rencontreGrandPubliqueJeunePubliqueInstrumentIrdsListe: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> = [];

        myInstrumentIrds: Array<InstrumentIrdVo> = [];

        selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo = new RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo();
        rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsListe: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> = [];

        myTypeInstrumentIrds: Array<TypeInstrumentIrdVo> = [];


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService :RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private rencontreGrandPubliqueJeunePubliqueInstrumentIrdService :RencontreGrandPubliqueJeunePubliqueInstrumentIrdService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService :RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService
    ,private etablissementService :EtablissementService
    ,private formatRencontreService :FormatRencontreService
    ,private paysRencontreGrandPubliqueJeunePubliqueService :PaysRencontreGrandPubliqueJeunePubliqueService
    ,private rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService :RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService
    ,private typePubliqueService :TypePubliqueService
    ,private instrumentIrdService :InstrumentIrdService
    ,private paysService :PaysService
    ,private cultureScientifiqueService :CultureScientifiqueService
    ,private rencontreGrandPubliqueJeunePubliquePeriodeService :RencontreGrandPubliqueJeunePubliquePeriodeService
    ,private paysOrganisateurRencontreGrandPubliqueJeunePubliqueService :PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService
    ,private typePubliqueRencontreGrandPubliqueJeunePubliqueService :TypePubliqueRencontreGrandPubliqueJeunePubliqueService
    ,private structureOganisatriceService :StructureOganisatriceService
    ,private contexteService :ContexteService
    ,private typeInstrumentIrdService :TypeInstrumentIrdService
) {
}

// methods
ngOnInit(): void {
                this.selectedTypePubliqueRencontreGrandPubliqueJeunePubliques.typePubliqueVo = new TypePubliqueVo();
                this.typePubliqueService.findAll().subscribe((data) => this.typePubliques = data);
                this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedStructureOganisatrices.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedPaysRencontreGrandPubliqueJeunePubliques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePubliques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrds.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
                this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds.typeInstrumentIrdVo = new TypeInstrumentIrdVo();
                this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedFormatRencontre = new FormatRencontreVo();
    this.formatRencontreService.findAll().subscribe((data) => this.formatRencontres = data);
    this.selectedContexte = new ContexteVo();
    this.contexteService.findAll().subscribe((data) => this.contextes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedCultureScientifique = new CultureScientifiqueVo();
    this.cultureScientifiqueService.findAll().subscribe((data) => this.cultureScientifiques = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewRencontreGrandPubliqueJeunePubliqueDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliques(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
    return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }

 get selectedRencontreGrandPubliqueJeunePublique():RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
    set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }

   get viewRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.viewRencontreGrandPubliqueJeunePubliqueDialog;

       }
    set viewRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.viewRencontreGrandPubliqueJeunePubliqueDialog= value;
       }

       get selectedEtablissement():EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements():Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get editEtablissementDialog():boolean {
           return this.etablissementService.editEtablissementDialog;
       }
      set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
       }
       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
       }
       get selectedFormatRencontre():FormatRencontreVo {
           return this.formatRencontreService.selectedFormatRencontre;
       }
      set selectedFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.selectedFormatRencontre = value;
       }
       get formatRencontres():Array<FormatRencontreVo> {
           return this.formatRencontreService.formatRencontres;
       }
       set formatRencontres(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontres = value;
       }
       get editFormatRencontreDialog():boolean {
           return this.formatRencontreService.editFormatRencontreDialog;
       }
      set editFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.editFormatRencontreDialog= value;
       }
       get selectedCultureScientifique():CultureScientifiqueVo {
           return this.cultureScientifiqueService.selectedCultureScientifique;
       }
      set selectedCultureScientifique(value: CultureScientifiqueVo) {
        this.cultureScientifiqueService.selectedCultureScientifique = value;
       }
       get cultureScientifiques():Array<CultureScientifiqueVo> {
           return this.cultureScientifiqueService.cultureScientifiques;
       }
       set cultureScientifiques(value: Array<CultureScientifiqueVo>) {
        this.cultureScientifiqueService.cultureScientifiques = value;
       }
       get editCultureScientifiqueDialog():boolean {
           return this.cultureScientifiqueService.editCultureScientifiqueDialog;
       }
      set editCultureScientifiqueDialog(value: boolean) {
        this.cultureScientifiqueService.editCultureScientifiqueDialog= value;
       }
       get selectedTypeInstrumentIrd():TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds():Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get editTypeInstrumentIrdDialog():boolean {
           return this.typeInstrumentIrdService.editTypeInstrumentIrdDialog;
       }
      set editTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.editTypeInstrumentIrdDialog= value;
       }
       get selectedContexte():ContexteVo {
           return this.contexteService.selectedContexte;
       }
      set selectedContexte(value: ContexteVo) {
        this.contexteService.selectedContexte = value;
       }
       get contextes():Array<ContexteVo> {
           return this.contexteService.contextes;
       }
       set contextes(value: Array<ContexteVo>) {
        this.contexteService.contextes = value;
       }
       get editContexteDialog():boolean {
           return this.contexteService.editContexteDialog;
       }
      set editContexteDialog(value: boolean) {
        this.contexteService.editContexteDialog= value;
       }
       get selectedInstrumentIrd():InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds():Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get editInstrumentIrdDialog():boolean {
           return this.instrumentIrdService.editInstrumentIrdDialog;
       }
      set editInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.editInstrumentIrdDialog= value;
       }
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
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
       get selectedTypePublique():TypePubliqueVo {
           return this.typePubliqueService.selectedTypePublique;
       }
      set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
       }
       get typePubliques():Array<TypePubliqueVo> {
           return this.typePubliqueService.typePubliques;
       }
       set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
       }
       get editTypePubliqueDialog():boolean {
           return this.typePubliqueService.editTypePubliqueDialog;
       }
      set editTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.editTypePubliqueDialog= value;
       }
       get selectedDisciplineScientifique():DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques():Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get editDisciplineScientifiqueDialog():boolean {
           return this.disciplineScientifiqueService.editDisciplineScientifiqueDialog;
       }
      set editDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.editDisciplineScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
