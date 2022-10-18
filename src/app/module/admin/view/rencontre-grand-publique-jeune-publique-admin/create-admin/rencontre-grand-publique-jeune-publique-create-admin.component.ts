import {Component, OnInit, Input} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.service';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.service';
import {StructureOganisatriceVo} from '../../../../../controller/model/StructureOganisatrice.model';
import {StructureOganisatriceService} from '../../../../../controller/service/StructureOganisatrice.service';
import {ContexteVo} from '../../../../../controller/model/Contexte.model';
import {ContexteService} from '../../../../../controller/service/Contexte.service';
import {PaysRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysRencontreGrandPubliqueJeunePublique.model';
import {PaysRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysRencontreGrandPubliqueJeunePublique.service';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysOrganisateurRencontreGrandPubliqueJeunePublique.model';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysOrganisateurRencontreGrandPubliqueJeunePublique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
import {FormatRencontreService} from '../../../../../controller/service/FormatRencontre.service';
import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliquePeriode.model';
import {RencontreGrandPubliqueJeunePubliquePeriodeService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliquePeriode.service';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/TypePubliqueRencontreGrandPubliqueJeunePublique.service';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import {CultureScientifiqueService} from '../../../../../controller/service/CultureScientifique.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-create-admin',
  templateUrl: './rencontre-grand-publique-jeune-publique-create-admin.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-create-admin.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueCreateAdminComponent implements OnInit {

        selectedTypePubliqueRencontreGrandPubliqueJeunePubliques: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo = new TypePubliqueRencontreGrandPubliqueJeunePubliqueVo();
        selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrds: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo = new RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo();
        selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo = new RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo();
        selectedRencontreGrandPubliqueJeunePubliquePeriodes: RencontreGrandPubliqueJeunePubliquePeriodeVo = new RencontreGrandPubliqueJeunePubliquePeriodeVo();
        selectedStructureOganisatrices: StructureOganisatriceVo = new StructureOganisatriceVo();
        selectedPaysRencontreGrandPubliqueJeunePubliques: PaysRencontreGrandPubliqueJeunePubliqueVo = new PaysRencontreGrandPubliqueJeunePubliqueVo();
        selectedPaysOrganisateurRencontreGrandPubliqueJeunePubliques: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo = new PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo();
        selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrds: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo = new RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo();
        selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo = new RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validFormatRencontreLibelle = true;
    _validContexteLibelle = true;
    _validContexteCode = true;
    _validPaysLibelle = true;
    _validPaysCode = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _typePubliqueRencontreGrandPubliqueJeunePubliquesVo: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> = [];
private _rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> = [];
private _rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> = [];
private _structureOganisatricesVo: Array<StructureOganisatriceVo> = [];
private _paysRencontreGrandPubliqueJeunePubliquesVo: Array<PaysRencontreGrandPubliqueJeunePubliqueVo> = [];
private _paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> = [];
private _rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> = [];
private _rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> = [];

constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private instrumentIrdService :InstrumentIrdService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private formatRencontreService :FormatRencontreService
,       private rencontreGrandPubliqueJeunePubliquePeriodeService :RencontreGrandPubliqueJeunePubliquePeriodeService
,       private rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService :RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService
,       private rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService :RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService
,       private enjeuxIrdService :EnjeuxIrdService
,       private rencontreGrandPubliqueJeunePubliqueInstrumentIrdService :RencontreGrandPubliqueJeunePubliqueInstrumentIrdService
,       private rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService :RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService
,       private structureOganisatriceService :StructureOganisatriceService
,       private etablissementService :EtablissementService
,       private typeInstrumentIrdService :TypeInstrumentIrdService
,       private typePubliqueRencontreGrandPubliqueJeunePubliqueService :TypePubliqueRencontreGrandPubliqueJeunePubliqueService
,       private contexteService :ContexteService
,       private cultureScientifiqueService :CultureScientifiqueService
,       private paysRencontreGrandPubliqueJeunePubliqueService :PaysRencontreGrandPubliqueJeunePubliqueService
,       private paysOrganisateurRencontreGrandPubliqueJeunePubliqueService :PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService
,       private typePubliqueService :TypePubliqueService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

            this.typePubliqueService.findAll().subscribe(data => this.prepareTypePubliqueRencontreGrandPubliqueJeunePubliques(data));

                this.selectedTypePubliqueRencontreGrandPubliqueJeunePubliques.typePubliqueVo = new TypePubliqueVo();
                this.typePubliqueService.findAll().subscribe((data) => this.typePubliques = data);


            this.enjeuxIrdService.findAll().subscribe(data => this.prepareRencontreGrandPubliqueJeunePubliqueEnjeuxIrds(data));

                this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(data));

                this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);





            this.etablissementService.findAll().subscribe(data => this.prepareStructureOganisatrices(data));

                this.selectedStructureOganisatrices.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);


            this.paysService.findAll().subscribe(data => this.preparePaysRencontreGrandPubliqueJeunePubliques(data));

                this.selectedPaysRencontreGrandPubliqueJeunePubliques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


            this.paysService.findAll().subscribe(data => this.preparePaysOrganisateurRencontreGrandPubliqueJeunePubliques(data));

                this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePubliques.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


            this.instrumentIrdService.findAll().subscribe(data => this.prepareRencontreGrandPubliqueJeunePubliqueInstrumentIrds(data));

                this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrds.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);


            this.typeInstrumentIrdService.findAll().subscribe(data => this.prepareRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(data));

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

    validateRencontreGrandPubliqueJeunePubliquePeriodes(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    }

        addRencontreGrandPubliqueJeunePubliquePeriodes() {
        if( this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliquePeriodesVo == null ){
            this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliquePeriodesVo = new Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>();
        }
       this.validateRencontreGrandPubliqueJeunePubliquePeriodes();
       if (this.errorMessages.length === 0) {
              this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliquePeriodesVo.push(this.selectedRencontreGrandPubliqueJeunePubliquePeriodes);
              this.selectedRencontreGrandPubliqueJeunePubliquePeriodes = new RencontreGrandPubliqueJeunePubliquePeriodeVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteRencontreGrandPubliqueJeunePubliquePeriodes(p: RencontreGrandPubliqueJeunePubliquePeriodeVo) {
        this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliquePeriodesVo.forEach((element, index) => {
            if (element === p) { this.selectedRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliquePeriodesVo.splice(index, 1); }
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
     this.rencontreGrandPubliqueJeunePubliqueService.save().subscribe(rencontreGrandPubliqueJeunePublique=>{
       this.rencontreGrandPubliqueJeunePubliques.push({...rencontreGrandPubliqueJeunePublique});
       this.createRencontreGrandPubliqueJeunePubliqueDialog = false;
       this.submitted = false;
       this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }




























































//openPopup
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
// methods

hideCreateDialog(){
    this.createRencontreGrandPubliqueJeunePubliqueDialog  = false;
    this.setValidation(true);
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

   get createRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog;

       }
    set createRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog= value;
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
    get validContexteLibelle(): boolean {
    return this._validContexteLibelle;
    }

    set validContexteLibelle(value: boolean) {
    this._validContexteLibelle = value;
    }
    get validContexteCode(): boolean {
    return this._validContexteCode;
    }

    set validContexteCode(value: boolean) {
    this._validContexteCode = value;
    }
    get validPaysLibelle(): boolean {
    return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
    this._validPaysLibelle = value;
    }
    get validPaysCode(): boolean {
    return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
    this._validPaysCode = value;
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
