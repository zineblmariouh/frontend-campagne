import {Component, OnInit} from '@angular/core';
import {CultureScientifiqueService} from '../../../../../controller/service/CultureScientifique.service';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
import {FormatRencontreService} from '../../../../../controller/service/FormatRencontre.service';
import {NatureActiviteGrandPubliqueVo} from '../../../../../controller/model/NatureActiviteGrandPublique.model';
import {NatureActiviteGrandPubliqueService} from '../../../../../controller/service/NatureActiviteGrandPublique.service';
import {ContexteVo} from '../../../../../controller/model/Contexte.model';
import {ContexteService} from '../../../../../controller/service/Contexte.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-culture-scientifique-view-admin',
  templateUrl: './culture-scientifique-view-admin.component.html',
  styleUrls: ['./culture-scientifique-view-admin.component.css']
})
export class CultureScientifiqueViewAdminComponent implements OnInit {

        selectedRencontreGrandPubliqueJeunePubliques: RencontreGrandPubliqueJeunePubliqueVo = new RencontreGrandPubliqueJeunePubliqueVo();
        rencontreGrandPubliqueJeunePubliquesListe: Array<RencontreGrandPubliqueJeunePubliqueVo> = [];

        myFormatRencontres: Array<FormatRencontreVo> = [];
        myContextes: Array<ContexteVo> = [];
        myPayss: Array<PaysVo> = [];
        myEtatEtapeCampagnes: Array<EtatEtapeCampagneVo> = [];

        selectedRencontreMedias: RencontreMediaVo = new RencontreMediaVo();
        rencontreMediasListe: Array<RencontreMediaVo> = [];


        selectedOutilPedagogiques: OutilPedagogiqueVo = new OutilPedagogiqueVo();
        outilPedagogiquesListe: Array<OutilPedagogiqueVo> = [];



constructor(private datePipe: DatePipe, private cultureScientifiqueService: CultureScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private outilPedagogiqueService :OutilPedagogiqueService
    ,private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
    ,private rencontreMediaService :RencontreMediaService
    ,private formatRencontreService :FormatRencontreService
    ,private natureActiviteGrandPubliqueService :NatureActiviteGrandPubliqueService
    ,private contexteService :ContexteService
    ,private campagneService :CampagneService
    ,private paysService :PaysService
    ,private chercheurService :ChercheurService
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
                this.selectedRencontreMedias.formatRencontreVo = new FormatRencontreVo();
                this.formatRencontreService.findAll().subscribe((data) => this.formatRencontres = data);
                this.selectedRencontreMedias.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedOutilPedagogiques.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedNatureActiviteGrandPublique = new NatureActiviteGrandPubliqueVo();
    this.natureActiviteGrandPubliqueService.findAll().subscribe((data) => this.natureActiviteGrandPubliques = data);
}

hideViewDialog(){
    this.viewCultureScientifiqueDialog  = false;
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

   get viewCultureScientifiqueDialog():boolean {
           return this.cultureScientifiqueService.viewCultureScientifiqueDialog;

       }
    set viewCultureScientifiqueDialog(value: boolean) {
        this.cultureScientifiqueService.viewCultureScientifiqueDialog= value;
       }

       get selectedNatureActiviteGrandPublique():NatureActiviteGrandPubliqueVo {
           return this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique;
       }
      set selectedNatureActiviteGrandPublique(value: NatureActiviteGrandPubliqueVo) {
        this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique = value;
       }
       get natureActiviteGrandPubliques():Array<NatureActiviteGrandPubliqueVo> {
           return this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques;
       }
       set natureActiviteGrandPubliques(value: Array<NatureActiviteGrandPubliqueVo>) {
        this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques = value;
       }
       get editNatureActiviteGrandPubliqueDialog():boolean {
           return this.natureActiviteGrandPubliqueService.editNatureActiviteGrandPubliqueDialog;
       }
      set editNatureActiviteGrandPubliqueDialog(value: boolean) {
        this.natureActiviteGrandPubliqueService.editNatureActiviteGrandPubliqueDialog= value;
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
       get selectedCampagne():CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes():Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get editCampagneDialog():boolean {
           return this.campagneService.editCampagneDialog;
       }
      set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog= value;
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
       get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs():Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
