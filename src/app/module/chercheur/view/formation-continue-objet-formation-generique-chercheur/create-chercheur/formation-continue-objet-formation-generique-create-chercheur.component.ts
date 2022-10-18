import {Component, OnInit, Input} from '@angular/core';
import {FormationContinueObjetFormationGeneriqueService} from '../../../../../controller/service/FormationContinueObjetFormationGenerique.service';
import {FormationContinueObjetFormationGeneriqueVo} from '../../../../../controller/model/FormationContinueObjetFormationGenerique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
@Component({
  selector: 'app-formation-continue-objet-formation-generique-create-chercheur',
  templateUrl: './formation-continue-objet-formation-generique-create-chercheur.component.html',
  styleUrls: ['./formation-continue-objet-formation-generique-create-chercheur.component.css']
})
export class FormationContinueObjetFormationGeneriqueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validObjetFormationGeneriqueLibelle = true;
    _validObjetFormationGeneriqueCode = true;
    _validFormationContinueIntitule = true;
    _validFormationContinueFormationContinuePubliqueProfessionels = true;
    _validFormationContinueNombreHeuresDispenseesDansAnnee = true;
    _validFormationContinueModaliteFormationContinue = true;
    _validFormationContinueFormationContinueEnjeuxIrds = true;
    _validFormationContinuePaysFormationContinue = true;
    _validFormationContinueZoneGeographiqueFormationContinues = true;
    _validFormationContinueFormationContinueCommanditaires = true;



constructor(private datePipe: DatePipe, private formationContinueObjetFormationGeneriqueService: FormationContinueObjetFormationGeneriqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private objetFormationGeneriqueService :ObjetFormationGeneriqueService
,       private formationContinueService :FormationContinueService
) {

}


// methods
ngOnInit(): void {

    this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
    this.objetFormationGeneriqueService.findAll().subscribe((data) => this.objetFormationGeneriques = data);
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
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
     this.formationContinueObjetFormationGeneriqueService.save().subscribe(formationContinueObjetFormationGenerique=>{
       this.formationContinueObjetFormationGeneriques.push({...formationContinueObjetFormationGenerique});
       this.createFormationContinueObjetFormationGeneriqueDialog = false;
       this.submitted = false;
       this.selectedFormationContinueObjetFormationGenerique = new FormationContinueObjetFormationGeneriqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateobjetFormationGenerique(objetFormationGenerique: string) {
                      const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'add');
                       if(isPermistted){
         this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
        this.createObjetFormationGeneriqueDialog = true;
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
    this.createFormationContinueObjetFormationGeneriqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get formationContinueObjetFormationGeneriques(): Array<FormationContinueObjetFormationGeneriqueVo> {
    return this.formationContinueObjetFormationGeneriqueService.formationContinueObjetFormationGeneriques;
       }
set formationContinueObjetFormationGeneriques(value: Array<FormationContinueObjetFormationGeneriqueVo>) {
        this.formationContinueObjetFormationGeneriqueService.formationContinueObjetFormationGeneriques = value;
       }

 get selectedFormationContinueObjetFormationGenerique():FormationContinueObjetFormationGeneriqueVo {
           return this.formationContinueObjetFormationGeneriqueService.selectedFormationContinueObjetFormationGenerique;
       }
    set selectedFormationContinueObjetFormationGenerique(value: FormationContinueObjetFormationGeneriqueVo) {
        this.formationContinueObjetFormationGeneriqueService.selectedFormationContinueObjetFormationGenerique = value;
       }

   get createFormationContinueObjetFormationGeneriqueDialog(): boolean {
           return this.formationContinueObjetFormationGeneriqueService.createFormationContinueObjetFormationGeneriqueDialog;

       }
    set createFormationContinueObjetFormationGeneriqueDialog(value: boolean) {
        this.formationContinueObjetFormationGeneriqueService.createFormationContinueObjetFormationGeneriqueDialog= value;
       }

       get selectedObjetFormationGenerique(): ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
      set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }
       get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
       set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }
       get createObjetFormationGeneriqueDialog(): boolean {
           return this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog;
       }
      set createObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog= value;
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


    get validObjetFormationGeneriqueLibelle(): boolean {
    return this._validObjetFormationGeneriqueLibelle;
    }

    set validObjetFormationGeneriqueLibelle(value: boolean) {
    this._validObjetFormationGeneriqueLibelle = value;
    }
    get validObjetFormationGeneriqueCode(): boolean {
    return this._validObjetFormationGeneriqueCode;
    }

    set validObjetFormationGeneriqueCode(value: boolean) {
    this._validObjetFormationGeneriqueCode = value;
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

}
