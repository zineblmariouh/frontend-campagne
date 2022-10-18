import {Component, OnInit, Input} from '@angular/core';
import {FormationContinuePubliqueProfessionelService} from '../../../../../controller/service/FormationContinuePubliqueProfessionel.service';
import {FormationContinuePubliqueProfessionelVo} from '../../../../../controller/model/FormationContinuePubliqueProfessionel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {PubliqueProfessionelVo} from '../../../../../controller/model/PubliqueProfessionel.model';
import {PubliqueProfessionelService} from '../../../../../controller/service/PubliqueProfessionel.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
@Component({
  selector: 'app-formation-continue-publique-professionel-create-chercheur',
  templateUrl: './formation-continue-publique-professionel-create-chercheur.component.html',
  styleUrls: ['./formation-continue-publique-professionel-create-chercheur.component.css']
})
export class FormationContinuePubliqueProfessionelCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validFormationContinueIntitule = true;
    _validFormationContinueFormationContinuePubliqueProfessionels = true;
    _validFormationContinueNombreHeuresDispenseesDansAnnee = true;
    _validFormationContinueModaliteFormationContinue = true;
    _validFormationContinueFormationContinueEnjeuxIrds = true;
    _validFormationContinuePaysFormationContinue = true;
    _validFormationContinueZoneGeographiqueFormationContinues = true;
    _validFormationContinueFormationContinueCommanditaires = true;
    _validPubliqueProfessionelLibelle = true;



constructor(private datePipe: DatePipe, private formationContinuePubliqueProfessionelService: FormationContinuePubliqueProfessionelService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private publiqueProfessionelService :PubliqueProfessionelService
,       private formationContinueService :FormationContinueService
) {

}


// methods
ngOnInit(): void {

    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
    this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();
    this.publiqueProfessionelService.findAll().subscribe((data) => this.publiqueProfessionels = data);
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
     this.formationContinuePubliqueProfessionelService.save().subscribe(formationContinuePubliqueProfessionel=>{
       this.formationContinuePubliqueProfessionels.push({...formationContinuePubliqueProfessionel});
       this.createFormationContinuePubliqueProfessionelDialog = false;
       this.submitted = false;
       this.selectedFormationContinuePubliqueProfessionel = new FormationContinuePubliqueProfessionelVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatepubliqueProfessionel(publiqueProfessionel: string) {
                      const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'add');
                       if(isPermistted){
         this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();
        this.createPubliqueProfessionelDialog = true;
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
    this.createFormationContinuePubliqueProfessionelDialog  = false;
    this.setValidation(true);
}

// getters and setters

get formationContinuePubliqueProfessionels(): Array<FormationContinuePubliqueProfessionelVo> {
    return this.formationContinuePubliqueProfessionelService.formationContinuePubliqueProfessionels;
       }
set formationContinuePubliqueProfessionels(value: Array<FormationContinuePubliqueProfessionelVo>) {
        this.formationContinuePubliqueProfessionelService.formationContinuePubliqueProfessionels = value;
       }

 get selectedFormationContinuePubliqueProfessionel():FormationContinuePubliqueProfessionelVo {
           return this.formationContinuePubliqueProfessionelService.selectedFormationContinuePubliqueProfessionel;
       }
    set selectedFormationContinuePubliqueProfessionel(value: FormationContinuePubliqueProfessionelVo) {
        this.formationContinuePubliqueProfessionelService.selectedFormationContinuePubliqueProfessionel = value;
       }

   get createFormationContinuePubliqueProfessionelDialog(): boolean {
           return this.formationContinuePubliqueProfessionelService.createFormationContinuePubliqueProfessionelDialog;

       }
    set createFormationContinuePubliqueProfessionelDialog(value: boolean) {
        this.formationContinuePubliqueProfessionelService.createFormationContinuePubliqueProfessionelDialog= value;
       }

       get selectedPubliqueProfessionel(): PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
      set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }
       get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
           return this.publiqueProfessionelService.publiqueProfessionels;
       }
       set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }
       get createPubliqueProfessionelDialog(): boolean {
           return this.publiqueProfessionelService.createPubliqueProfessionelDialog;
       }
      set createPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.createPubliqueProfessionelDialog= value;
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
    get validPubliqueProfessionelLibelle(): boolean {
    return this._validPubliqueProfessionelLibelle;
    }

    set validPubliqueProfessionelLibelle(value: boolean) {
    this._validPubliqueProfessionelLibelle = value;
    }

}
