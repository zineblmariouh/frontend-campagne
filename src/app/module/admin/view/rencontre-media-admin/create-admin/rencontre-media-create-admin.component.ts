import {Component, OnInit, Input} from '@angular/core';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {RencontreMediaEnjeuxIrdVo} from '../../../../../controller/model/RencontreMediaEnjeuxIrd.model';
import {RencontreMediaEnjeuxIrdService} from '../../../../../controller/service/RencontreMediaEnjeuxIrd.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {TypePubliqueRencontreMediaVo} from '../../../../../controller/model/TypePubliqueRencontreMedia.model';
import {TypePubliqueRencontreMediaService} from '../../../../../controller/service/TypePubliqueRencontreMedia.service';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
import {FormatRencontreService} from '../../../../../controller/service/FormatRencontre.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {PaysRencontreMediaVo} from '../../../../../controller/model/PaysRencontreMedia.model';
import {PaysRencontreMediaService} from '../../../../../controller/service/PaysRencontreMedia.service';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import {CultureScientifiqueService} from '../../../../../controller/service/CultureScientifique.service';
import {RencontreMediaDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreMediaDisciplineScientifique.model';
import {RencontreMediaDisciplineScientifiqueService} from '../../../../../controller/service/RencontreMediaDisciplineScientifique.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {RencontreMediaPeriodeVo} from '../../../../../controller/model/RencontreMediaPeriode.model';
import {RencontreMediaPeriodeService} from '../../../../../controller/service/RencontreMediaPeriode.service';
@Component({
  selector: 'app-rencontre-media-create-admin',
  templateUrl: './rencontre-media-create-admin.component.html',
  styleUrls: ['./rencontre-media-create-admin.component.css']
})
export class RencontreMediaCreateAdminComponent implements OnInit {

        selectedTypePubliqueRencontreMedias: TypePubliqueRencontreMediaVo = new TypePubliqueRencontreMediaVo();
        selectedRencontreMediaEnjeuxIrds: RencontreMediaEnjeuxIrdVo = new RencontreMediaEnjeuxIrdVo();
        selectedRencontreMediaDisciplineScientifiques: RencontreMediaDisciplineScientifiqueVo = new RencontreMediaDisciplineScientifiqueVo();
        selectedRencontreMediaPeriodes: RencontreMediaPeriodeVo = new RencontreMediaPeriodeVo();
        selectedPaysRencontreMedias: PaysRencontreMediaVo = new PaysRencontreMediaVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validFormatRencontreLibelle = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _typePubliqueRencontreMediasVo: Array<TypePubliqueRencontreMediaVo> = [];
private _rencontreMediaEnjeuxIrdsVo: Array<RencontreMediaEnjeuxIrdVo> = [];
private _rencontreMediaDisciplineScientifiquesVo: Array<RencontreMediaDisciplineScientifiqueVo> = [];
private _paysRencontreMediasVo: Array<PaysRencontreMediaVo> = [];

constructor(private datePipe: DatePipe, private rencontreMediaService: RencontreMediaService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private rencontreMediaEnjeuxIrdService :RencontreMediaEnjeuxIrdService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private typePubliqueRencontreMediaService :TypePubliqueRencontreMediaService
,       private cultureScientifiqueService :CultureScientifiqueService
,       private formatRencontreService :FormatRencontreService
,       private rencontreMediaDisciplineScientifiqueService :RencontreMediaDisciplineScientifiqueService
,       private typePubliqueService :TypePubliqueService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private enjeuxIrdService :EnjeuxIrdService
,       private paysRencontreMediaService :PaysRencontreMediaService
,       private paysService :PaysService
,       private rencontreMediaPeriodeService :RencontreMediaPeriodeService
) {

}


// methods
ngOnInit(): void {

            this.typePubliqueService.findAll().subscribe(data => this.prepareTypePubliqueRencontreMedias(data));

                this.selectedTypePubliqueRencontreMedias.typePubliqueVo = new TypePubliqueVo();
                this.typePubliqueService.findAll().subscribe((data) => this.typePubliques = data);


            this.enjeuxIrdService.findAll().subscribe(data => this.prepareRencontreMediaEnjeuxIrds(data));

                this.selectedRencontreMediaEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareRencontreMediaDisciplineScientifiques(data));

                this.selectedRencontreMediaDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);





            this.paysService.findAll().subscribe(data => this.preparePaysRencontreMedias(data));

                this.selectedPaysRencontreMedias.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


    this.selectedFormatRencontre = new FormatRencontreVo();
    this.formatRencontreService.findAll().subscribe((data) => this.formatRencontres = data);
    this.selectedCultureScientifique = new CultureScientifiqueVo();
    this.cultureScientifiqueService.findAll().subscribe((data) => this.cultureScientifiques = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
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

    validateRencontreMediaPeriodes(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    }

        addRencontreMediaPeriodes() {
        if( this.selectedRencontreMedia.rencontreMediaPeriodesVo == null ){
            this.selectedRencontreMedia.rencontreMediaPeriodesVo = new Array<RencontreMediaPeriodeVo>();
        }
       this.validateRencontreMediaPeriodes();
       if (this.errorMessages.length === 0) {
              this.selectedRencontreMedia.rencontreMediaPeriodesVo.push(this.selectedRencontreMediaPeriodes);
              this.selectedRencontreMediaPeriodes = new RencontreMediaPeriodeVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteRencontreMediaPeriodes(p: RencontreMediaPeriodeVo) {
        this.selectedRencontreMedia.rencontreMediaPeriodesVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreMedia.rencontreMediaPeriodesVo.splice(index, 1); }
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
     this.rencontreMediaService.save().subscribe(rencontreMedia=>{
       this.rencontreMedias.push({...rencontreMedia});
       this.createRencontreMediaDialog = false;
       this.submitted = false;
       this.selectedRencontreMedia = new RencontreMediaVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }




































//openPopup
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

hideCreateDialog(){
    this.createRencontreMediaDialog  = false;
    this.setValidation(true);
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

   get createRencontreMediaDialog(): boolean {
           return this.rencontreMediaService.createRencontreMediaDialog;

       }
    set createRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.createRencontreMediaDialog= value;
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


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validFormatRencontreLibelle(): boolean {
    return this._validFormatRencontreLibelle;
    }

    set validFormatRencontreLibelle(value: boolean) {
    this._validFormatRencontreLibelle = value;
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
