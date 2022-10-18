import {Component, OnInit, Input} from '@angular/core';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {OutilPedagogiqueLangueVo} from '../../../../../controller/model/OutilPedagogiqueLangue.model';
import {OutilPedagogiqueLangueService} from '../../../../../controller/service/OutilPedagogiqueLangue.service';
import {OutilPedagogiquePaysConceptionVo} from '../../../../../controller/model/OutilPedagogiquePaysConception.model';
import {OutilPedagogiquePaysConceptionService} from '../../../../../controller/service/OutilPedagogiquePaysConception.service';
import {OutilPedagogiqueDisciplineScientifiqueVo} from '../../../../../controller/model/OutilPedagogiqueDisciplineScientifique.model';
import {OutilPedagogiqueDisciplineScientifiqueService} from '../../../../../controller/service/OutilPedagogiqueDisciplineScientifique.service';
import {OutilPedagogiquePubliqueCibleVo} from '../../../../../controller/model/OutilPedagogiquePubliqueCible.model';
import {OutilPedagogiquePubliqueCibleService} from '../../../../../controller/service/OutilPedagogiquePubliqueCible.service';
import {TypeOutilVo} from '../../../../../controller/model/TypeOutil.model';
import {TypeOutilService} from '../../../../../controller/service/TypeOutil.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {LangueVo} from '../../../../../controller/model/Langue.model';
import {LangueService} from '../../../../../controller/service/Langue.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {TypeOutilPedagogiqueVo} from '../../../../../controller/model/TypeOutilPedagogique.model';
import {TypeOutilPedagogiqueService} from '../../../../../controller/service/TypeOutilPedagogique.service';
import {PubliqueCibleVo} from '../../../../../controller/model/PubliqueCible.model';
import {PubliqueCibleService} from '../../../../../controller/service/PubliqueCible.service';
import {OutilPedagogiqueInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueInstrumentIrd.model';
import {OutilPedagogiqueInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueInstrumentIrd.service';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import {CultureScientifiqueService} from '../../../../../controller/service/CultureScientifique.service';
import {OutilPedagogiquePaysDiffusionVo} from '../../../../../controller/model/OutilPedagogiquePaysDiffusion.model';
import {OutilPedagogiquePaysDiffusionService} from '../../../../../controller/service/OutilPedagogiquePaysDiffusion.service';
import {OutilPedagogiqueTypeInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueTypeInstrumentIrd.model';
import {OutilPedagogiqueTypeInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueTypeInstrumentIrd.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {OutilPedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/OutilPedagogiqueEnjeuxIrd.model';
import {OutilPedagogiqueEnjeuxIrdService} from '../../../../../controller/service/OutilPedagogiqueEnjeuxIrd.service';
@Component({
  selector: 'app-outil-pedagogique-create-admin',
  templateUrl: './outil-pedagogique-create-admin.component.html',
  styleUrls: ['./outil-pedagogique-create-admin.component.css']
})
export class OutilPedagogiqueCreateAdminComponent implements OnInit {

        selectedOutilPedagogiqueEnjeuxIrds: OutilPedagogiqueEnjeuxIrdVo = new OutilPedagogiqueEnjeuxIrdVo();
        selectedOutilPedagogiqueDisciplineScientifiques: OutilPedagogiqueDisciplineScientifiqueVo = new OutilPedagogiqueDisciplineScientifiqueVo();
        selectedOutilPedagogiquePubliqueCibles: OutilPedagogiquePubliqueCibleVo = new OutilPedagogiquePubliqueCibleVo();
        selectedTypeOutilPedagogiques: TypeOutilPedagogiqueVo = new TypeOutilPedagogiqueVo();
        selectedOutilPedagogiqueLangues: OutilPedagogiqueLangueVo = new OutilPedagogiqueLangueVo();
        selectedOutilPedagogiquePaysConceptions: OutilPedagogiquePaysConceptionVo = new OutilPedagogiquePaysConceptionVo();
        selectedOutilPedagogiquePaysDiffusions: OutilPedagogiquePaysDiffusionVo = new OutilPedagogiquePaysDiffusionVo();
        selectedOutilPedagogiqueInstrumentIrds: OutilPedagogiqueInstrumentIrdVo = new OutilPedagogiqueInstrumentIrdVo();
        selectedOutilPedagogiqueTypeInstrumentIrds: OutilPedagogiqueTypeInstrumentIrdVo = new OutilPedagogiqueTypeInstrumentIrdVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _outilPedagogiqueEnjeuxIrdsVo: Array<OutilPedagogiqueEnjeuxIrdVo> = [];
private _outilPedagogiqueDisciplineScientifiquesVo: Array<OutilPedagogiqueDisciplineScientifiqueVo> = [];
private _outilPedagogiquePubliqueCiblesVo: Array<OutilPedagogiquePubliqueCibleVo> = [];
private _typeOutilPedagogiquesVo: Array<TypeOutilPedagogiqueVo> = [];
private _outilPedagogiqueLanguesVo: Array<OutilPedagogiqueLangueVo> = [];
private _outilPedagogiquePaysConceptionsVo: Array<OutilPedagogiquePaysConceptionVo> = [];
private _outilPedagogiquePaysDiffusionsVo: Array<OutilPedagogiquePaysDiffusionVo> = [];
private _outilPedagogiqueInstrumentIrdsVo: Array<OutilPedagogiqueInstrumentIrdVo> = [];
private _outilPedagogiqueTypeInstrumentIrdsVo: Array<OutilPedagogiqueTypeInstrumentIrdVo> = [];

constructor(private datePipe: DatePipe, private outilPedagogiqueService: OutilPedagogiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private instrumentIrdService :InstrumentIrdService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private outilPedagogiqueLangueService :OutilPedagogiqueLangueService
,       private enjeuxIrdService :EnjeuxIrdService
,       private langueService :LangueService
,       private typeInstrumentIrdService :TypeInstrumentIrdService
,       private typeOutilPedagogiqueService :TypeOutilPedagogiqueService
,       private publiqueCibleService :PubliqueCibleService
,       private outilPedagogiqueInstrumentIrdService :OutilPedagogiqueInstrumentIrdService
,       private cultureScientifiqueService :CultureScientifiqueService
,       private outilPedagogiquePaysDiffusionService :OutilPedagogiquePaysDiffusionService
,       private outilPedagogiquePaysConceptionService :OutilPedagogiquePaysConceptionService
,       private outilPedagogiqueTypeInstrumentIrdService :OutilPedagogiqueTypeInstrumentIrdService
,       private outilPedagogiqueDisciplineScientifiqueService :OutilPedagogiqueDisciplineScientifiqueService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private outilPedagogiqueEnjeuxIrdService :OutilPedagogiqueEnjeuxIrdService
,       private outilPedagogiquePubliqueCibleService :OutilPedagogiquePubliqueCibleService
,       private typeOutilService :TypeOutilService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

            this.enjeuxIrdService.findAll().subscribe(data => this.prepareOutilPedagogiqueEnjeuxIrds(data));

                this.selectedOutilPedagogiqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareOutilPedagogiqueDisciplineScientifiques(data));

                this.selectedOutilPedagogiqueDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);


            this.publiqueCibleService.findAll().subscribe(data => this.prepareOutilPedagogiquePubliqueCibles(data));

                this.selectedOutilPedagogiquePubliqueCibles.publiqueCibleVo = new PubliqueCibleVo();
                this.publiqueCibleService.findAll().subscribe((data) => this.publiqueCibles = data);


            this.typeOutilService.findAll().subscribe(data => this.prepareTypeOutilPedagogiques(data));

                this.selectedTypeOutilPedagogiques.typeOutilVo = new TypeOutilVo();
                this.typeOutilService.findAll().subscribe((data) => this.typeOutils = data);


            this.langueService.findAll().subscribe(data => this.prepareOutilPedagogiqueLangues(data));

                this.selectedOutilPedagogiqueLangues.langueVo = new LangueVo();
                this.langueService.findAll().subscribe((data) => this.langues = data);


            this.paysService.findAll().subscribe(data => this.prepareOutilPedagogiquePaysConceptions(data));

                this.selectedOutilPedagogiquePaysConceptions.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


            this.paysService.findAll().subscribe(data => this.prepareOutilPedagogiquePaysDiffusions(data));

                this.selectedOutilPedagogiquePaysDiffusions.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


            this.instrumentIrdService.findAll().subscribe(data => this.prepareOutilPedagogiqueInstrumentIrds(data));

                this.selectedOutilPedagogiqueInstrumentIrds.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);


            this.typeInstrumentIrdService.findAll().subscribe(data => this.prepareOutilPedagogiqueTypeInstrumentIrds(data));

                this.selectedOutilPedagogiqueTypeInstrumentIrds.typeInstrumentIrdVo = new TypeInstrumentIrdVo();
                this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);


    this.selectedCultureScientifique = new CultureScientifiqueVo();
    this.cultureScientifiqueService.findAll().subscribe((data) => this.cultureScientifiques = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
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



private setValidation(value : boolean){
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
     this.outilPedagogiqueService.save().subscribe(outilPedagogique=>{
       this.outilPedagogiques.push({...outilPedagogique});
       this.createOutilPedagogiqueDialog = false;
       this.submitted = false;
       this.selectedOutilPedagogique = new OutilPedagogiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }




























































//openPopup
              public async openCreatelangue(langue: string) {
                      const isPermistted = await this.roleService.isPermitted('Langue', 'add');
                       if(isPermistted){
         this.selectedLangue = new LangueVo();
        this.createLangueDialog = true;
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
              public async openCreatetypeOutil(typeOutil: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeOutil', 'add');
                       if(isPermistted){
         this.selectedTypeOutil = new TypeOutilVo();
        this.createTypeOutilDialog = true;
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
              public async openCreatepubliqueCible(publiqueCible: string) {
                      const isPermistted = await this.roleService.isPermitted('PubliqueCible', 'add');
                       if(isPermistted){
         this.selectedPubliqueCible = new PubliqueCibleVo();
        this.createPubliqueCibleDialog = true;
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
    this.createOutilPedagogiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get outilPedagogiques(): Array<OutilPedagogiqueVo> {
    return this.outilPedagogiqueService.outilPedagogiques;
       }
set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }

 get selectedOutilPedagogique():OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
    set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }

   get createOutilPedagogiqueDialog(): boolean {
           return this.outilPedagogiqueService.createOutilPedagogiqueDialog;

       }
    set createOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.createOutilPedagogiqueDialog= value;
       }

       get selectedLangue(): LangueVo {
           return this.langueService.selectedLangue;
       }
      set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }
       get langues(): Array<LangueVo> {
           return this.langueService.langues;
       }
       set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }
       get createLangueDialog(): boolean {
           return this.langueService.createLangueDialog;
       }
      set createLangueDialog(value: boolean) {
        this.langueService.createLangueDialog= value;
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
       get selectedTypeOutil(): TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
      set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }
       get typeOutils(): Array<TypeOutilVo> {
           return this.typeOutilService.typeOutils;
       }
       set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }
       get createTypeOutilDialog(): boolean {
           return this.typeOutilService.createTypeOutilDialog;
       }
      set createTypeOutilDialog(value: boolean) {
        this.typeOutilService.createTypeOutilDialog= value;
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
       get selectedPubliqueCible(): PubliqueCibleVo {
           return this.publiqueCibleService.selectedPubliqueCible;
       }
      set selectedPubliqueCible(value: PubliqueCibleVo) {
        this.publiqueCibleService.selectedPubliqueCible = value;
       }
       get publiqueCibles(): Array<PubliqueCibleVo> {
           return this.publiqueCibleService.publiqueCibles;
       }
       set publiqueCibles(value: Array<PubliqueCibleVo>) {
        this.publiqueCibleService.publiqueCibles = value;
       }
       get createPubliqueCibleDialog(): boolean {
           return this.publiqueCibleService.createPubliqueCibleDialog;
       }
      set createPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.createPubliqueCibleDialog= value;
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
