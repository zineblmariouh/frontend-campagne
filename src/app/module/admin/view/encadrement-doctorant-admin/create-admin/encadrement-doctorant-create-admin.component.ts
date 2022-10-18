import {Component, OnInit, Input} from '@angular/core';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {DoctorantVo} from '../../../../../controller/model/Doctorant.model';
import {DoctorantService} from '../../../../../controller/service/Doctorant.service';
import {CommunauteSavoirEncadrementDoctorantVo} from '../../../../../controller/model/CommunauteSavoirEncadrementDoctorant.model';
import {CommunauteSavoirEncadrementDoctorantService} from '../../../../../controller/service/CommunauteSavoirEncadrementDoctorant.service';
import {FinancementDoctorantVo} from '../../../../../controller/model/FinancementDoctorant.model';
import {FinancementDoctorantService} from '../../../../../controller/service/FinancementDoctorant.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EncadrementVo} from '../../../../../controller/model/Encadrement.model';
import {EncadrementService} from '../../../../../controller/service/Encadrement.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {DisciplineScientifiqueEncadrementDoctorantVo} from '../../../../../controller/model/DisciplineScientifiqueEncadrementDoctorant.model';
import {DisciplineScientifiqueEncadrementDoctorantService} from '../../../../../controller/service/DisciplineScientifiqueEncadrementDoctorant.service';
import {ResponsabiliteEncadrementDoctorantVo} from '../../../../../controller/model/ResponsabiliteEncadrementDoctorant.model';
import {ResponsabiliteEncadrementDoctorantService} from '../../../../../controller/service/ResponsabiliteEncadrementDoctorant.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {EnjeuxIrdEncadrementDoctorantVo} from '../../../../../controller/model/EnjeuxIrdEncadrementDoctorant.model';
import {EnjeuxIrdEncadrementDoctorantService} from '../../../../../controller/service/EnjeuxIrdEncadrementDoctorant.service';
@Component({
  selector: 'app-encadrement-doctorant-create-admin',
  templateUrl: './encadrement-doctorant-create-admin.component.html',
  styleUrls: ['./encadrement-doctorant-create-admin.component.css']
})
export class EncadrementDoctorantCreateAdminComponent implements OnInit {

        selectedEnjeuxIrdEncadrementDoctorants: EnjeuxIrdEncadrementDoctorantVo = new EnjeuxIrdEncadrementDoctorantVo();
        selectedDisciplineScientifiqueEncadrementDoctorants: DisciplineScientifiqueEncadrementDoctorantVo = new DisciplineScientifiqueEncadrementDoctorantVo();
        selectedCommunauteSavoirEncadrementDoctorants: CommunauteSavoirEncadrementDoctorantVo = new CommunauteSavoirEncadrementDoctorantVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validResponsabiliteEncadrementDoctorantLibelle = true;
    _validResponsabiliteEncadrementDoctorantCode = true;
    _validFinancementDoctorantLibelle = true;
    _validFinancementDoctorantCode = true;
    _validEtablissementLibelle = true;
    _validPaysLibelle = true;
    _validPaysCode = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _enjeuxIrdEncadrementDoctorantsVo: Array<EnjeuxIrdEncadrementDoctorantVo> = [];
private _disciplineScientifiqueEncadrementDoctorantsVo: Array<DisciplineScientifiqueEncadrementDoctorantVo> = [];
private _communauteSavoirEncadrementDoctorantsVo: Array<CommunauteSavoirEncadrementDoctorantVo> = [];

constructor(private datePipe: DatePipe, private encadrementDoctorantService: EncadrementDoctorantService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private doctorantService :DoctorantService
,       private communauteSavoirEncadrementDoctorantService :CommunauteSavoirEncadrementDoctorantService
,       private financementDoctorantService :FinancementDoctorantService
,       private enjeuxIrdService :EnjeuxIrdService
,       private encadrementService :EncadrementService
,       private etablissementService :EtablissementService
,       private communauteSavoirService :CommunauteSavoirService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private disciplineScientifiqueEncadrementDoctorantService :DisciplineScientifiqueEncadrementDoctorantService
,       private responsabiliteEncadrementDoctorantService :ResponsabiliteEncadrementDoctorantService
,       private paysService :PaysService
,       private enjeuxIrdEncadrementDoctorantService :EnjeuxIrdEncadrementDoctorantService
) {

}


// methods
ngOnInit(): void {

            this.enjeuxIrdService.findAll().subscribe(data => this.prepareEnjeuxIrdEncadrementDoctorants(data));

                this.selectedEnjeuxIrdEncadrementDoctorants.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareDisciplineScientifiqueEncadrementDoctorants(data));

                this.selectedDisciplineScientifiqueEncadrementDoctorants.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);


            this.communauteSavoirService.findAll().subscribe(data => this.prepareCommunauteSavoirEncadrementDoctorants(data));

                this.selectedCommunauteSavoirEncadrementDoctorants.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);


    this.selectedResponsabiliteEncadrementDoctorant = new ResponsabiliteEncadrementDoctorantVo();
    this.responsabiliteEncadrementDoctorantService.findAll().subscribe((data) => this.responsabiliteEncadrementDoctorants = data);
    this.selectedFinancementDoctorant = new FinancementDoctorantVo();
    this.financementDoctorantService.findAll().subscribe((data) => this.financementDoctorants = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedDoctorant = new DoctorantVo();
    this.doctorantService.findAll().subscribe((data) => this.doctorants = data);
    this.selectedEncadrement = new EncadrementVo();
    this.encadrementService.findAll().subscribe((data) => this.encadrements = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

         prepareEnjeuxIrdEncadrementDoctorants(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const enjeuxIrdEncadrementDoctorant = new EnjeuxIrdEncadrementDoctorantVo();
        enjeuxIrdEncadrementDoctorant.enjeuxIrdVo = e;
        this.enjeuxIrdEncadrementDoctorantsVo.push(enjeuxIrdEncadrementDoctorant);
        });
        }
    }
         prepareDisciplineScientifiqueEncadrementDoctorants(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const disciplineScientifiqueEncadrementDoctorant = new DisciplineScientifiqueEncadrementDoctorantVo();
        disciplineScientifiqueEncadrementDoctorant.disciplineScientifiqueVo = e;
        this.disciplineScientifiqueEncadrementDoctorantsVo.push(disciplineScientifiqueEncadrementDoctorant);
        });
        }
    }
         prepareCommunauteSavoirEncadrementDoctorants(communauteSavoirs: Array<CommunauteSavoirVo>): void{
        if( communauteSavoirs != null){
        communauteSavoirs.forEach(e => {
        const communauteSavoirEncadrementDoctorant = new CommunauteSavoirEncadrementDoctorantVo();
        communauteSavoirEncadrementDoctorant.communauteSavoirVo = e;
        this.communauteSavoirEncadrementDoctorantsVo.push(communauteSavoirEncadrementDoctorant);
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
     this.encadrementDoctorantService.save().subscribe(encadrementDoctorant=>{
       this.encadrementDoctorants.push({...encadrementDoctorant});
       this.createEncadrementDoctorantDialog = false;
       this.submitted = false;
       this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }

































//openPopup
              public async openCreatefinancementDoctorant(financementDoctorant: string) {
                      const isPermistted = await this.roleService.isPermitted('FinancementDoctorant', 'add');
                       if(isPermistted){
         this.selectedFinancementDoctorant = new FinancementDoctorantVo();
        this.createFinancementDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
              public async openCreateresponsabiliteEncadrementDoctorant(responsabiliteEncadrementDoctorant: string) {
                      const isPermistted = await this.roleService.isPermitted('ResponsabiliteEncadrementDoctorant', 'add');
                       if(isPermistted){
         this.selectedResponsabiliteEncadrementDoctorant = new ResponsabiliteEncadrementDoctorantVo();
        this.createResponsabiliteEncadrementDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateencadrement(encadrement: string) {
                      const isPermistted = await this.roleService.isPermitted('Encadrement', 'add');
                       if(isPermistted){
         this.selectedEncadrement = new EncadrementVo();
        this.createEncadrementDialog = true;
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
              public async openCreatedoctorant(doctorant: string) {
                      const isPermistted = await this.roleService.isPermitted('Doctorant', 'add');
                       if(isPermistted){
         this.selectedDoctorant = new DoctorantVo();
        this.createDoctorantDialog = true;
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
// methods

hideCreateDialog(){
    this.createEncadrementDoctorantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get encadrementDoctorants(): Array<EncadrementDoctorantVo> {
    return this.encadrementDoctorantService.encadrementDoctorants;
       }
set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorants = value;
       }

 get selectedEncadrementDoctorant():EncadrementDoctorantVo {
           return this.encadrementDoctorantService.selectedEncadrementDoctorant;
       }
    set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.selectedEncadrementDoctorant = value;
       }

   get createEncadrementDoctorantDialog(): boolean {
           return this.encadrementDoctorantService.createEncadrementDoctorantDialog;

       }
    set createEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.createEncadrementDoctorantDialog= value;
       }

       get selectedFinancementDoctorant(): FinancementDoctorantVo {
           return this.financementDoctorantService.selectedFinancementDoctorant;
       }
      set selectedFinancementDoctorant(value: FinancementDoctorantVo) {
        this.financementDoctorantService.selectedFinancementDoctorant = value;
       }
       get financementDoctorants(): Array<FinancementDoctorantVo> {
           return this.financementDoctorantService.financementDoctorants;
       }
       set financementDoctorants(value: Array<FinancementDoctorantVo>) {
        this.financementDoctorantService.financementDoctorants = value;
       }
       get createFinancementDoctorantDialog(): boolean {
           return this.financementDoctorantService.createFinancementDoctorantDialog;
       }
      set createFinancementDoctorantDialog(value: boolean) {
        this.financementDoctorantService.createFinancementDoctorantDialog= value;
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
       get selectedResponsabiliteEncadrementDoctorant(): ResponsabiliteEncadrementDoctorantVo {
           return this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant;
       }
      set selectedResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this.responsabiliteEncadrementDoctorantService.selectedResponsabiliteEncadrementDoctorant = value;
       }
       get responsabiliteEncadrementDoctorants(): Array<ResponsabiliteEncadrementDoctorantVo> {
           return this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants;
       }
       set responsabiliteEncadrementDoctorants(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this.responsabiliteEncadrementDoctorantService.responsabiliteEncadrementDoctorants = value;
       }
       get createResponsabiliteEncadrementDoctorantDialog(): boolean {
           return this.responsabiliteEncadrementDoctorantService.createResponsabiliteEncadrementDoctorantDialog;
       }
      set createResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this.responsabiliteEncadrementDoctorantService.createResponsabiliteEncadrementDoctorantDialog= value;
       }
       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
       }
       get selectedEncadrement(): EncadrementVo {
           return this.encadrementService.selectedEncadrement;
       }
      set selectedEncadrement(value: EncadrementVo) {
        this.encadrementService.selectedEncadrement = value;
       }
       get encadrements(): Array<EncadrementVo> {
           return this.encadrementService.encadrements;
       }
       set encadrements(value: Array<EncadrementVo>) {
        this.encadrementService.encadrements = value;
       }
       get createEncadrementDialog(): boolean {
           return this.encadrementService.createEncadrementDialog;
       }
      set createEncadrementDialog(value: boolean) {
        this.encadrementService.createEncadrementDialog= value;
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
       get selectedDoctorant(): DoctorantVo {
           return this.doctorantService.selectedDoctorant;
       }
      set selectedDoctorant(value: DoctorantVo) {
        this.doctorantService.selectedDoctorant = value;
       }
       get doctorants(): Array<DoctorantVo> {
           return this.doctorantService.doctorants;
       }
       set doctorants(value: Array<DoctorantVo>) {
        this.doctorantService.doctorants = value;
       }
       get createDoctorantDialog(): boolean {
           return this.doctorantService.createDoctorantDialog;
       }
      set createDoctorantDialog(value: boolean) {
        this.doctorantService.createDoctorantDialog= value;
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


    get enjeuxIrdEncadrementDoctorantsVo(): Array<EnjeuxIrdEncadrementDoctorantVo> {
    if( this._enjeuxIrdEncadrementDoctorantsVo == null )
    this._enjeuxIrdEncadrementDoctorantsVo = new Array();
    return this._enjeuxIrdEncadrementDoctorantsVo;
    }

    set enjeuxIrdEncadrementDoctorantsVo(value: Array<EnjeuxIrdEncadrementDoctorantVo>) {
    this._enjeuxIrdEncadrementDoctorantsVo = value;
    }
    get disciplineScientifiqueEncadrementDoctorantsVo(): Array<DisciplineScientifiqueEncadrementDoctorantVo> {
    if( this._disciplineScientifiqueEncadrementDoctorantsVo == null )
    this._disciplineScientifiqueEncadrementDoctorantsVo = new Array();
    return this._disciplineScientifiqueEncadrementDoctorantsVo;
    }

    set disciplineScientifiqueEncadrementDoctorantsVo(value: Array<DisciplineScientifiqueEncadrementDoctorantVo>) {
    this._disciplineScientifiqueEncadrementDoctorantsVo = value;
    }
    get communauteSavoirEncadrementDoctorantsVo(): Array<CommunauteSavoirEncadrementDoctorantVo> {
    if( this._communauteSavoirEncadrementDoctorantsVo == null )
    this._communauteSavoirEncadrementDoctorantsVo = new Array();
    return this._communauteSavoirEncadrementDoctorantsVo;
    }

    set communauteSavoirEncadrementDoctorantsVo(value: Array<CommunauteSavoirEncadrementDoctorantVo>) {
    this._communauteSavoirEncadrementDoctorantsVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validResponsabiliteEncadrementDoctorantLibelle(): boolean {
    return this._validResponsabiliteEncadrementDoctorantLibelle;
    }

    set validResponsabiliteEncadrementDoctorantLibelle(value: boolean) {
    this._validResponsabiliteEncadrementDoctorantLibelle = value;
    }
    get validResponsabiliteEncadrementDoctorantCode(): boolean {
    return this._validResponsabiliteEncadrementDoctorantCode;
    }

    set validResponsabiliteEncadrementDoctorantCode(value: boolean) {
    this._validResponsabiliteEncadrementDoctorantCode = value;
    }
    get validFinancementDoctorantLibelle(): boolean {
    return this._validFinancementDoctorantLibelle;
    }

    set validFinancementDoctorantLibelle(value: boolean) {
    this._validFinancementDoctorantLibelle = value;
    }
    get validFinancementDoctorantCode(): boolean {
    return this._validFinancementDoctorantCode;
    }

    set validFinancementDoctorantCode(value: boolean) {
    this._validFinancementDoctorantCode = value;
    }
    get validEtablissementLibelle(): boolean {
    return this._validEtablissementLibelle;
    }

    set validEtablissementLibelle(value: boolean) {
    this._validEtablissementLibelle = value;
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
