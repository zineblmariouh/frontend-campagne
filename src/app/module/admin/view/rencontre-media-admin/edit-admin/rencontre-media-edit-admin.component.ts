import {Component, OnInit} from '@angular/core';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
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
  selector: 'app-rencontre-media-edit-admin',
  templateUrl: './rencontre-media-edit-admin.component.html',
  styleUrls: ['./rencontre-media-edit-admin.component.css']
})
export class RencontreMediaEditAdminComponent implements OnInit {

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
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreMediaPeriodeService: RencontreMediaPeriodeService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private paysRencontreMediaService: PaysRencontreMediaService
 ,       private rencontreMediaDisciplineScientifiqueService: RencontreMediaDisciplineScientifiqueService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private rencontreMediaEnjeuxIrdService: RencontreMediaEnjeuxIrdService
 ,       private typePubliqueRencontreMediaService: TypePubliqueRencontreMediaService
 ,       private formatRencontreService: FormatRencontreService
 ,       private typePubliqueService: TypePubliqueService
 ,       private paysService: PaysService
 ,       private cultureScientifiqueService: CultureScientifiqueService
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
        addTypePubliqueRencontreMedias() {
        if( this.selectedRencontreMedia.typePubliqueRencontreMediasVo == null ){
            this.selectedRencontreMedia.typePubliqueRencontreMediasVo = new Array<TypePubliqueRencontreMediaVo>();
        }
        this.selectedRencontreMedia.typePubliqueRencontreMediasVo.push(this.selectedTypePubliqueRencontreMedias);
        this.selectedTypePubliqueRencontreMedias = new TypePubliqueRencontreMediaVo();
        }

       deleteTypePubliqueRencontreMedias(p: TypePubliqueRencontreMediaVo) {
        this.selectedRencontreMedia.typePubliqueRencontreMediasVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreMedia.typePubliqueRencontreMediasVo.splice(index, 1); }
        });
    }
        addRencontreMediaEnjeuxIrds() {
        if( this.selectedRencontreMedia.rencontreMediaEnjeuxIrdsVo == null ){
            this.selectedRencontreMedia.rencontreMediaEnjeuxIrdsVo = new Array<RencontreMediaEnjeuxIrdVo>();
        }
        this.selectedRencontreMedia.rencontreMediaEnjeuxIrdsVo.push(this.selectedRencontreMediaEnjeuxIrds);
        this.selectedRencontreMediaEnjeuxIrds = new RencontreMediaEnjeuxIrdVo();
        }

       deleteRencontreMediaEnjeuxIrds(p: RencontreMediaEnjeuxIrdVo) {
        this.selectedRencontreMedia.rencontreMediaEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreMedia.rencontreMediaEnjeuxIrdsVo.splice(index, 1); }
        });
    }
        addRencontreMediaDisciplineScientifiques() {
        if( this.selectedRencontreMedia.rencontreMediaDisciplineScientifiquesVo == null ){
            this.selectedRencontreMedia.rencontreMediaDisciplineScientifiquesVo = new Array<RencontreMediaDisciplineScientifiqueVo>();
        }
        this.selectedRencontreMedia.rencontreMediaDisciplineScientifiquesVo.push(this.selectedRencontreMediaDisciplineScientifiques);
        this.selectedRencontreMediaDisciplineScientifiques = new RencontreMediaDisciplineScientifiqueVo();
        }

       deleteRencontreMediaDisciplineScientifiques(p: RencontreMediaDisciplineScientifiqueVo) {
        this.selectedRencontreMedia.rencontreMediaDisciplineScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreMedia.rencontreMediaDisciplineScientifiquesVo.splice(index, 1); }
        });
    }
        addRencontreMediaPeriodes() {
        if( this.selectedRencontreMedia.rencontreMediaPeriodesVo == null ){
            this.selectedRencontreMedia.rencontreMediaPeriodesVo = new Array<RencontreMediaPeriodeVo>();
        }
        this.selectedRencontreMedia.rencontreMediaPeriodesVo.push(this.selectedRencontreMediaPeriodes);
        this.selectedRencontreMediaPeriodes = new RencontreMediaPeriodeVo();
        }

       deleteRencontreMediaPeriodes(p: RencontreMediaPeriodeVo) {
        this.selectedRencontreMedia.rencontreMediaPeriodesVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreMedia.rencontreMediaPeriodesVo.splice(index, 1); }
        });
    }
        addPaysRencontreMedias() {
        if( this.selectedRencontreMedia.paysRencontreMediasVo == null ){
            this.selectedRencontreMedia.paysRencontreMediasVo = new Array<PaysRencontreMediaVo>();
        }
        this.selectedRencontreMedia.paysRencontreMediasVo.push(this.selectedPaysRencontreMedias);
        this.selectedPaysRencontreMedias = new PaysRencontreMediaVo();
        }

       deletePaysRencontreMedias(p: PaysRencontreMediaVo) {
        this.selectedRencontreMedia.paysRencontreMediasVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreMedia.paysRencontreMediasVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.rencontreMediaService.edit().subscribe(rencontreMedia=>{
    const myIndex = this.rencontreMedias.findIndex(e => e.id === this.selectedRencontreMedia.id);
    this.rencontreMedias[myIndex] = this.selectedRencontreMedia;
    this.editRencontreMediaDialog = false;
    this.selectedRencontreMedia = new RencontreMediaVo();


    }, error => {
        console.log(error);
    });

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
              public async openCreatecultureScientifique(cultureScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('CultureScientifique', 'add');
                       if(isPermistted){
         this.selectedCultureScientifique = new CultureScientifiqueVo();
        this.createCultureScientifiqueDialog = true;
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
              public async openCreatetypePublique(typePublique: string) {
                      const isPermistted = await this.roleService.isPermitted('TypePublique', 'add');
                       if(isPermistted){
         this.selectedTypePublique = new TypePubliqueVo();
        this.createTypePubliqueDialog = true;
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

hideEditDialog(){
    this.editRencontreMediaDialog  = false;
}

// getters and setters

get rencontreMedias(): Array<RencontreMediaVo> {
    return this.rencontreMediaService.rencontreMedias;
       }
set rencontreMedias(value: Array<RencontreMediaVo>) {
        this.rencontreMediaService.rencontreMedias = value;
       }

 get selectedRencontreMedia(): RencontreMediaVo {
           return this.rencontreMediaService.selectedRencontreMedia;
       }
    set selectedRencontreMedia(value: RencontreMediaVo) {
        this.rencontreMediaService.selectedRencontreMedia = value;
       }

   get editRencontreMediaDialog(): boolean {
           return this.rencontreMediaService.editRencontreMediaDialog;

       }
    set editRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.editRencontreMediaDialog = value;
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
       get selectedCultureScientifique(): CultureScientifiqueVo {
           return this.cultureScientifiqueService.selectedCultureScientifique;
       }
      set selectedCultureScientifique(value: CultureScientifiqueVo) {
        this.cultureScientifiqueService.selectedCultureScientifique = value;
       }
       get cultureScientifiques(): Array<CultureScientifiqueVo> {
           return this.cultureScientifiqueService.cultureScientifiques;
       }
       set cultureScientifiques(value: Array<CultureScientifiqueVo>) {
        this.cultureScientifiqueService.cultureScientifiques = value;
       }
       get createCultureScientifiqueDialog(): boolean {
           return this.cultureScientifiqueService.createCultureScientifiqueDialog;
       }
      set createCultureScientifiqueDialog(value: boolean) {
        this.cultureScientifiqueService.createCultureScientifiqueDialog= value;
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
       get selectedTypePublique(): TypePubliqueVo {
           return this.typePubliqueService.selectedTypePublique;
       }
      set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
       }
       get typePubliques(): Array<TypePubliqueVo> {
           return this.typePubliqueService.typePubliques;
       }
       set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
       }
       get createTypePubliqueDialog(): boolean {
           return this.typePubliqueService.createTypePubliqueDialog;
       }
      set createTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.createTypePubliqueDialog= value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
