import {Component, OnInit, Input} from '@angular/core';
import {FormationContinueCommanditaireService} from '../../../../../controller/service/FormationContinueCommanditaire.service';
import {FormationContinueCommanditaireVo} from '../../../../../controller/model/FormationContinueCommanditaire.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {CommanditaireVo} from '../../../../../controller/model/Commanditaire.model';
import {CommanditaireService} from '../../../../../controller/service/Commanditaire.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
@Component({
  selector: 'app-formation-continue-commanditaire-create-chercheur',
  templateUrl: './formation-continue-commanditaire-create-chercheur.component.html',
  styleUrls: ['./formation-continue-commanditaire-create-chercheur.component.css']
})
export class FormationContinueCommanditaireCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCommanditaireLibelle = true;
    _validCommanditaireCode = true;
    _validFormationContinueIntitule = true;
    _validFormationContinueFormationContinuePubliqueProfessionels = true;
    _validFormationContinueNombreHeuresDispenseesDansAnnee = true;
    _validFormationContinueModaliteFormationContinue = true;
    _validFormationContinueFormationContinueEnjeuxIrds = true;
    _validFormationContinuePaysFormationContinue = true;
    _validFormationContinueZoneGeographiqueFormationContinues = true;
    _validFormationContinueFormationContinueCommanditaires = true;
    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private formationContinueCommanditaireService: FormationContinueCommanditaireService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private commanditaireService :CommanditaireService
,       private paysService :PaysService
,       private formationContinueService :FormationContinueService
) {

}


// methods
ngOnInit(): void {

    this.selectedCommanditaire = new CommanditaireVo();
    this.commanditaireService.findAll().subscribe((data) => this.commanditaires = data);
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
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
     this.formationContinueCommanditaireService.save().subscribe(formationContinueCommanditaire=>{
       this.formationContinueCommanditaires.push({...formationContinueCommanditaire});
       this.createFormationContinueCommanditaireDialog = false;
       this.submitted = false;
       this.selectedFormationContinueCommanditaire = new FormationContinueCommanditaireVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }








//openPopup
              public async openCreatecommanditaire(commanditaire: string) {
                      const isPermistted = await this.roleService.isPermitted('Commanditaire', 'add');
                       if(isPermistted){
         this.selectedCommanditaire = new CommanditaireVo();
        this.createCommanditaireDialog = true;
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
              public async openCreateformationContinue(formationContinue: string) {
                      const isPermistted = await this.roleService.isPermitted('FormationContinue', 'add');
                       if(isPermistted){
         this.selectedFormationContinue = new FormationContinueVo();
        this.createFormationContinueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createFormationContinueCommanditaireDialog  = false;
    this.setValidation(true);
}

// getters and setters

get formationContinueCommanditaires(): Array<FormationContinueCommanditaireVo> {
    return this.formationContinueCommanditaireService.formationContinueCommanditaires;
       }
set formationContinueCommanditaires(value: Array<FormationContinueCommanditaireVo>) {
        this.formationContinueCommanditaireService.formationContinueCommanditaires = value;
       }

 get selectedFormationContinueCommanditaire():FormationContinueCommanditaireVo {
           return this.formationContinueCommanditaireService.selectedFormationContinueCommanditaire;
       }
    set selectedFormationContinueCommanditaire(value: FormationContinueCommanditaireVo) {
        this.formationContinueCommanditaireService.selectedFormationContinueCommanditaire = value;
       }

   get createFormationContinueCommanditaireDialog(): boolean {
           return this.formationContinueCommanditaireService.createFormationContinueCommanditaireDialog;

       }
    set createFormationContinueCommanditaireDialog(value: boolean) {
        this.formationContinueCommanditaireService.createFormationContinueCommanditaireDialog= value;
       }

       get selectedCommanditaire(): CommanditaireVo {
           return this.commanditaireService.selectedCommanditaire;
       }
      set selectedCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.selectedCommanditaire = value;
       }
       get commanditaires(): Array<CommanditaireVo> {
           return this.commanditaireService.commanditaires;
       }
       set commanditaires(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaires = value;
       }
       get createCommanditaireDialog(): boolean {
           return this.commanditaireService.createCommanditaireDialog;
       }
      set createCommanditaireDialog(value: boolean) {
        this.commanditaireService.createCommanditaireDialog= value;
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
       get selectedFormationContinue(): FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
      set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }
       get formationContinues(): Array<FormationContinueVo> {
           return this.formationContinueService.formationContinues;
       }
       set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }
       get createFormationContinueDialog(): boolean {
           return this.formationContinueService.createFormationContinueDialog;
       }
      set createFormationContinueDialog(value: boolean) {
        this.formationContinueService.createFormationContinueDialog= value;
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




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validCommanditaireLibelle(): boolean {
    return this._validCommanditaireLibelle;
    }

    set validCommanditaireLibelle(value: boolean) {
    this._validCommanditaireLibelle = value;
    }
    get validCommanditaireCode(): boolean {
    return this._validCommanditaireCode;
    }

    set validCommanditaireCode(value: boolean) {
    this._validCommanditaireCode = value;
    }
    get validFormationContinueIntitule(): boolean {
    return this._validFormationContinueIntitule;
    }

    set validFormationContinueIntitule(value: boolean) {
    this._validFormationContinueIntitule = value;
    }
    get validFormationContinueFormationContinuePubliqueProfessionels(): boolean {
    return this._validFormationContinueFormationContinuePubliqueProfessionels;
    }

    set validFormationContinueFormationContinuePubliqueProfessionels(value: boolean) {
    this._validFormationContinueFormationContinuePubliqueProfessionels = value;
    }
    get validFormationContinueNombreHeuresDispenseesDansAnnee(): boolean {
    return this._validFormationContinueNombreHeuresDispenseesDansAnnee;
    }

    set validFormationContinueNombreHeuresDispenseesDansAnnee(value: boolean) {
    this._validFormationContinueNombreHeuresDispenseesDansAnnee = value;
    }
    get validFormationContinueModaliteFormationContinue(): boolean {
    return this._validFormationContinueModaliteFormationContinue;
    }

    set validFormationContinueModaliteFormationContinue(value: boolean) {
    this._validFormationContinueModaliteFormationContinue = value;
    }
    get validFormationContinueFormationContinueEnjeuxIrds(): boolean {
    return this._validFormationContinueFormationContinueEnjeuxIrds;
    }

    set validFormationContinueFormationContinueEnjeuxIrds(value: boolean) {
    this._validFormationContinueFormationContinueEnjeuxIrds = value;
    }
    get validFormationContinuePaysFormationContinue(): boolean {
    return this._validFormationContinuePaysFormationContinue;
    }

    set validFormationContinuePaysFormationContinue(value: boolean) {
    this._validFormationContinuePaysFormationContinue = value;
    }
    get validFormationContinueZoneGeographiqueFormationContinues(): boolean {
    return this._validFormationContinueZoneGeographiqueFormationContinues;
    }

    set validFormationContinueZoneGeographiqueFormationContinues(value: boolean) {
    this._validFormationContinueZoneGeographiqueFormationContinues = value;
    }
    get validFormationContinueFormationContinueCommanditaires(): boolean {
    return this._validFormationContinueFormationContinueCommanditaires;
    }

    set validFormationContinueFormationContinueCommanditaires(value: boolean) {
    this._validFormationContinueFormationContinueCommanditaires = value;
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

}
