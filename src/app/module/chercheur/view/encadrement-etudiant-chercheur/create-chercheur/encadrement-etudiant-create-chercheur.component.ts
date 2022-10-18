import {Component, OnInit, Input} from '@angular/core';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EncadrementEtudiantDisciplineScientifiqueVo} from '../../../../../controller/model/EncadrementEtudiantDisciplineScientifique.model';
import {EncadrementEtudiantDisciplineScientifiqueService} from '../../../../../controller/service/EncadrementEtudiantDisciplineScientifique.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {ResponsabiliteDirectionEncadrementEtudiantVo} from '../../../../../controller/model/ResponsabiliteDirectionEncadrementEtudiant.model';
import {ResponsabiliteDirectionEncadrementEtudiantService} from '../../../../../controller/service/ResponsabiliteDirectionEncadrementEtudiant.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EncadrementVo} from '../../../../../controller/model/Encadrement.model';
import {EncadrementService} from '../../../../../controller/service/Encadrement.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {EncadrementEtudiantEnjeuxIrdVo} from '../../../../../controller/model/EncadrementEtudiantEnjeuxIrd.model';
import {EncadrementEtudiantEnjeuxIrdService} from '../../../../../controller/service/EncadrementEtudiantEnjeuxIrd.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {NiveauFormationPostBacVo} from '../../../../../controller/model/NiveauFormationPostBac.model';
import {NiveauFormationPostBacService} from '../../../../../controller/service/NiveauFormationPostBac.service';
import {EtudiantVo} from '../../../../../controller/model/Etudiant.model';
import {EtudiantService} from '../../../../../controller/service/Etudiant.service';
@Component({
  selector: 'app-encadrement-etudiant-create-chercheur',
  templateUrl: './encadrement-etudiant-create-chercheur.component.html',
  styleUrls: ['./encadrement-etudiant-create-chercheur.component.css']
})
export class EncadrementEtudiantCreateChercheurComponent implements OnInit {

        selectedEncadrementEtudiantEnjeuxIrds: EncadrementEtudiantEnjeuxIrdVo = new EncadrementEtudiantEnjeuxIrdVo();
        selectedEncadrementEtudiantDisciplineScientifiques: EncadrementEtudiantDisciplineScientifiqueVo = new EncadrementEtudiantDisciplineScientifiqueVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validNiveauFormationPostBacCode = true;
    _validNiveauFormationPostBacLibelle = true;
    _validResponsabiliteDirectionEncadrementEtudiantLibelle = true;
    _validEtablissementLibelle = true;
    _validPaysLibelle = true;
    _validPaysCode = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _encadrementEtudiantEnjeuxIrdsVo: Array<EncadrementEtudiantEnjeuxIrdVo> = [];
private _encadrementEtudiantDisciplineScientifiquesVo: Array<EncadrementEtudiantDisciplineScientifiqueVo> = [];

constructor(private datePipe: DatePipe, private encadrementEtudiantService: EncadrementEtudiantService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private encadrementEtudiantDisciplineScientifiqueService :EncadrementEtudiantDisciplineScientifiqueService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private responsabiliteDirectionEncadrementEtudiantService :ResponsabiliteDirectionEncadrementEtudiantService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private enjeuxIrdService :EnjeuxIrdService
,       private encadrementService :EncadrementService
,       private paysService :PaysService
,       private niveauFormationPostBacService :NiveauFormationPostBacService
,       private etablissementService :EtablissementService
,       private etudiantService :EtudiantService
,       private encadrementEtudiantEnjeuxIrdService :EncadrementEtudiantEnjeuxIrdService
) {

}


// methods
ngOnInit(): void {

            this.enjeuxIrdService.findAll().subscribe(data => this.prepareEncadrementEtudiantEnjeuxIrds(data));

                this.selectedEncadrementEtudiantEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareEncadrementEtudiantDisciplineScientifiques(data));

                this.selectedEncadrementEtudiantDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);


    this.selectedNiveauFormationPostBac = new NiveauFormationPostBacVo();
    this.niveauFormationPostBacService.findAll().subscribe((data) => this.niveauFormationPostBacs = data);
    this.selectedResponsabiliteDirectionEncadrementEtudiant = new ResponsabiliteDirectionEncadrementEtudiantVo();
    this.responsabiliteDirectionEncadrementEtudiantService.findAll().subscribe((data) => this.responsabiliteDirectionEncadrementEtudiants = data);
    this.selectedEtudiant = new EtudiantVo();
    this.etudiantService.findAll().subscribe((data) => this.etudiants = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedEncadrement = new EncadrementVo();
    this.encadrementService.findAll().subscribe((data) => this.encadrements = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

         prepareEncadrementEtudiantEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const encadrementEtudiantEnjeuxIrd = new EncadrementEtudiantEnjeuxIrdVo();
        encadrementEtudiantEnjeuxIrd.enjeuxIrdVo = e;
        this.encadrementEtudiantEnjeuxIrdsVo.push(encadrementEtudiantEnjeuxIrd);
        });
        }
    }
         prepareEncadrementEtudiantDisciplineScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const encadrementEtudiantDisciplineScientifique = new EncadrementEtudiantDisciplineScientifiqueVo();
        encadrementEtudiantDisciplineScientifique.disciplineScientifiqueVo = e;
        this.encadrementEtudiantDisciplineScientifiquesVo.push(encadrementEtudiantDisciplineScientifique);
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
     this.encadrementEtudiantService.save().subscribe(encadrementEtudiant=>{
       this.encadrementEtudiants.push({...encadrementEtudiant});
       this.createEncadrementEtudiantDialog = false;
       this.submitted = false;
       this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();


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
              public async openCreateniveauFormationPostBac(niveauFormationPostBac: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauFormationPostBac', 'add');
                       if(isPermistted){
         this.selectedNiveauFormationPostBac = new NiveauFormationPostBacVo();
        this.createNiveauFormationPostBacDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateresponsabiliteDirectionEncadrementEtudiant(responsabiliteDirectionEncadrementEtudiant: string) {
                      const isPermistted = await this.roleService.isPermitted('ResponsabiliteDirectionEncadrementEtudiant', 'add');
                       if(isPermistted){
         this.selectedResponsabiliteDirectionEncadrementEtudiant = new ResponsabiliteDirectionEncadrementEtudiantVo();
        this.createResponsabiliteDirectionEncadrementEtudiantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetudiant(etudiant: string) {
                      const isPermistted = await this.roleService.isPermitted('Etudiant', 'add');
                       if(isPermistted){
         this.selectedEtudiant = new EtudiantVo();
        this.createEtudiantDialog = true;
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
    this.createEncadrementEtudiantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get encadrementEtudiants(): Array<EncadrementEtudiantVo> {
    return this.encadrementEtudiantService.encadrementEtudiants;
       }
set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiants = value;
       }

 get selectedEncadrementEtudiant():EncadrementEtudiantVo {
           return this.encadrementEtudiantService.selectedEncadrementEtudiant;
       }
    set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.selectedEncadrementEtudiant = value;
       }

   get createEncadrementEtudiantDialog(): boolean {
           return this.encadrementEtudiantService.createEncadrementEtudiantDialog;

       }
    set createEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.createEncadrementEtudiantDialog= value;
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
       get selectedNiveauFormationPostBac(): NiveauFormationPostBacVo {
           return this.niveauFormationPostBacService.selectedNiveauFormationPostBac;
       }
      set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.selectedNiveauFormationPostBac = value;
       }
       get niveauFormationPostBacs(): Array<NiveauFormationPostBacVo> {
           return this.niveauFormationPostBacService.niveauFormationPostBacs;
       }
       set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacs = value;
       }
       get createNiveauFormationPostBacDialog(): boolean {
           return this.niveauFormationPostBacService.createNiveauFormationPostBacDialog;
       }
      set createNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.createNiveauFormationPostBacDialog= value;
       }
       get selectedResponsabiliteDirectionEncadrementEtudiant(): ResponsabiliteDirectionEncadrementEtudiantVo {
           return this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant;
       }
      set selectedResponsabiliteDirectionEncadrementEtudiant(value: ResponsabiliteDirectionEncadrementEtudiantVo) {
        this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant = value;
       }
       get responsabiliteDirectionEncadrementEtudiants(): Array<ResponsabiliteDirectionEncadrementEtudiantVo> {
           return this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants;
       }
       set responsabiliteDirectionEncadrementEtudiants(value: Array<ResponsabiliteDirectionEncadrementEtudiantVo>) {
        this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants = value;
       }
       get createResponsabiliteDirectionEncadrementEtudiantDialog(): boolean {
           return this.responsabiliteDirectionEncadrementEtudiantService.createResponsabiliteDirectionEncadrementEtudiantDialog;
       }
      set createResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteDirectionEncadrementEtudiantService.createResponsabiliteDirectionEncadrementEtudiantDialog= value;
       }
       get selectedEtudiant(): EtudiantVo {
           return this.etudiantService.selectedEtudiant;
       }
      set selectedEtudiant(value: EtudiantVo) {
        this.etudiantService.selectedEtudiant = value;
       }
       get etudiants(): Array<EtudiantVo> {
           return this.etudiantService.etudiants;
       }
       set etudiants(value: Array<EtudiantVo>) {
        this.etudiantService.etudiants = value;
       }
       get createEtudiantDialog(): boolean {
           return this.etudiantService.createEtudiantDialog;
       }
      set createEtudiantDialog(value: boolean) {
        this.etudiantService.createEtudiantDialog= value;
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


    get encadrementEtudiantEnjeuxIrdsVo(): Array<EncadrementEtudiantEnjeuxIrdVo> {
    if( this._encadrementEtudiantEnjeuxIrdsVo == null )
    this._encadrementEtudiantEnjeuxIrdsVo = new Array();
    return this._encadrementEtudiantEnjeuxIrdsVo;
    }

    set encadrementEtudiantEnjeuxIrdsVo(value: Array<EncadrementEtudiantEnjeuxIrdVo>) {
    this._encadrementEtudiantEnjeuxIrdsVo = value;
    }
    get encadrementEtudiantDisciplineScientifiquesVo(): Array<EncadrementEtudiantDisciplineScientifiqueVo> {
    if( this._encadrementEtudiantDisciplineScientifiquesVo == null )
    this._encadrementEtudiantDisciplineScientifiquesVo = new Array();
    return this._encadrementEtudiantDisciplineScientifiquesVo;
    }

    set encadrementEtudiantDisciplineScientifiquesVo(value: Array<EncadrementEtudiantDisciplineScientifiqueVo>) {
    this._encadrementEtudiantDisciplineScientifiquesVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validNiveauFormationPostBacCode(): boolean {
    return this._validNiveauFormationPostBacCode;
    }

    set validNiveauFormationPostBacCode(value: boolean) {
    this._validNiveauFormationPostBacCode = value;
    }
    get validNiveauFormationPostBacLibelle(): boolean {
    return this._validNiveauFormationPostBacLibelle;
    }

    set validNiveauFormationPostBacLibelle(value: boolean) {
    this._validNiveauFormationPostBacLibelle = value;
    }
    get validResponsabiliteDirectionEncadrementEtudiantLibelle(): boolean {
    return this._validResponsabiliteDirectionEncadrementEtudiantLibelle;
    }

    set validResponsabiliteDirectionEncadrementEtudiantLibelle(value: boolean) {
    this._validResponsabiliteDirectionEncadrementEtudiantLibelle = value;
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
