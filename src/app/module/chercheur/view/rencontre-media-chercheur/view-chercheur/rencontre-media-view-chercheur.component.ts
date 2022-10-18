import {Component, OnInit} from '@angular/core';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreMediaPeriodeVo} from '../../../../../controller/model/RencontreMediaPeriode.model';
import {RencontreMediaPeriodeService} from '../../../../../controller/service/RencontreMediaPeriode.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {PaysRencontreMediaVo} from '../../../../../controller/model/PaysRencontreMedia.model';
import {PaysRencontreMediaService} from '../../../../../controller/service/PaysRencontreMedia.service';
import {RencontreMediaDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreMediaDisciplineScientifique.model';
import {RencontreMediaDisciplineScientifiqueService} from '../../../../../controller/service/RencontreMediaDisciplineScientifique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {RencontreMediaEnjeuxIrdVo} from '../../../../../controller/model/RencontreMediaEnjeuxIrd.model';
import {RencontreMediaEnjeuxIrdService} from '../../../../../controller/service/RencontreMediaEnjeuxIrd.service';
import {TypePubliqueRencontreMediaVo} from '../../../../../controller/model/TypePubliqueRencontreMedia.model';
import {TypePubliqueRencontreMediaService} from '../../../../../controller/service/TypePubliqueRencontreMedia.service';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
import {FormatRencontreService} from '../../../../../controller/service/FormatRencontre.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import {CultureScientifiqueService} from '../../../../../controller/service/CultureScientifique.service';

@Component({
  selector: 'app-rencontre-media-view-chercheur',
  templateUrl: './rencontre-media-view-chercheur.component.html',
  styleUrls: ['./rencontre-media-view-chercheur.component.css']
})
export class RencontreMediaViewChercheurComponent implements OnInit {

        selectedTypePubliqueRencontreMedias: TypePubliqueRencontreMediaVo = new TypePubliqueRencontreMediaVo();
        typePubliqueRencontreMediasListe: Array<TypePubliqueRencontreMediaVo> = [];

        myTypePubliques: Array<TypePubliqueVo> = [];

        selectedRencontreMediaEnjeuxIrds: RencontreMediaEnjeuxIrdVo = new RencontreMediaEnjeuxIrdVo();
        rencontreMediaEnjeuxIrdsListe: Array<RencontreMediaEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedRencontreMediaDisciplineScientifiques: RencontreMediaDisciplineScientifiqueVo = new RencontreMediaDisciplineScientifiqueVo();
        rencontreMediaDisciplineScientifiquesListe: Array<RencontreMediaDisciplineScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

        selectedRencontreMediaPeriodes: RencontreMediaPeriodeVo = new RencontreMediaPeriodeVo();
        rencontreMediaPeriodesListe: Array<RencontreMediaPeriodeVo> = [];


        selectedPaysRencontreMedias: PaysRencontreMediaVo = new PaysRencontreMediaVo();
        paysRencontreMediasListe: Array<PaysRencontreMediaVo> = [];

        myPayss: Array<PaysVo> = [];


constructor(private datePipe: DatePipe, private rencontreMediaService: RencontreMediaService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreMediaPeriodeService :RencontreMediaPeriodeService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private paysRencontreMediaService :PaysRencontreMediaService
    ,private rencontreMediaDisciplineScientifiqueService :RencontreMediaDisciplineScientifiqueService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private rencontreMediaEnjeuxIrdService :RencontreMediaEnjeuxIrdService
    ,private typePubliqueRencontreMediaService :TypePubliqueRencontreMediaService
    ,private formatRencontreService :FormatRencontreService
    ,private typePubliqueService :TypePubliqueService
    ,private paysService :PaysService
    ,private cultureScientifiqueService :CultureScientifiqueService
) {
}

// methods
ngOnInit(): void {
                this.selectedTypePubliqueRencontreMedias.typePubliqueVo = new TypePubliqueVo();
                this.typePubliqueService.findAll().subscribe((data) => this.typePubliques = data);
                this.selectedRencontreMediaEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedRencontreMediaDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedPaysRencontreMedias.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedFormatRencontre = new FormatRencontreVo();
    this.formatRencontreService.findAll().subscribe((data) => this.formatRencontres = data);
    this.selectedCultureScientifique = new CultureScientifiqueVo();
    this.cultureScientifiqueService.findAll().subscribe((data) => this.cultureScientifiques = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewRencontreMediaDialog  = false;
}

// getters and setters

get rencontreMedias(): Array<RencontreMediaVo> {
    return this.rencontreMediaService.rencontreMedias;
       }
set rencontreMedias(value: Array<RencontreMediaVo>) {
        this.rencontreMediaService.rencontreMedias = value;
       }

 get selectedRencontreMedia():RencontreMediaVo {
           return this.rencontreMediaService.selectedRencontreMedia;
       }
    set selectedRencontreMedia(value: RencontreMediaVo) {
        this.rencontreMediaService.selectedRencontreMedia = value;
       }

   get viewRencontreMediaDialog():boolean {
           return this.rencontreMediaService.viewRencontreMediaDialog;

       }
    set viewRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.viewRencontreMediaDialog= value;
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
