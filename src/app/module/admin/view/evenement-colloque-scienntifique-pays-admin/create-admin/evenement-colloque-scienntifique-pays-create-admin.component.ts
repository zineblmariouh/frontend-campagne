import {Component, OnInit, Input} from '@angular/core';
import {EvenementColloqueScienntifiquePaysService} from '../../../../../controller/service/EvenementColloqueScienntifiquePays.service';
import {EvenementColloqueScienntifiquePaysVo} from '../../../../../controller/model/EvenementColloqueScienntifiquePays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-evenement-colloque-scienntifique-pays-create-admin',
  templateUrl: './evenement-colloque-scienntifique-pays-create-admin.component.html',
  styleUrls: ['./evenement-colloque-scienntifique-pays-create-admin.component.css']
})
export class EvenementColloqueScienntifiquePaysCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private evenementColloqueScienntifiquePaysService: EvenementColloqueScienntifiquePaysService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private evenementColloqueScienntifiqueService :EvenementColloqueScienntifiqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
    this.evenementColloqueScienntifiqueService.findAll().subscribe((data) => this.evenementColloqueScienntifiques = data);
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
     this.evenementColloqueScienntifiquePaysService.save().subscribe(evenementColloqueScienntifiquePays=>{
       this.evenementColloqueScienntifiquePayss.push({...evenementColloqueScienntifiquePays});
       this.createEvenementColloqueScienntifiquePaysDialog = false;
       this.submitted = false;
       this.selectedEvenementColloqueScienntifiquePays = new EvenementColloqueScienntifiquePaysVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateevenementColloqueScienntifique(evenementColloqueScienntifique: string) {
                      const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'add');
                       if(isPermistted){
         this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
        this.createEvenementColloqueScienntifiqueDialog = true;
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
    this.createEvenementColloqueScienntifiquePaysDialog  = false;
    this.setValidation(true);
}

// getters and setters

get evenementColloqueScienntifiquePayss(): Array<EvenementColloqueScienntifiquePaysVo> {
    return this.evenementColloqueScienntifiquePaysService.evenementColloqueScienntifiquePayss;
       }
set evenementColloqueScienntifiquePayss(value: Array<EvenementColloqueScienntifiquePaysVo>) {
        this.evenementColloqueScienntifiquePaysService.evenementColloqueScienntifiquePayss = value;
       }

 get selectedEvenementColloqueScienntifiquePays():EvenementColloqueScienntifiquePaysVo {
           return this.evenementColloqueScienntifiquePaysService.selectedEvenementColloqueScienntifiquePays;
       }
    set selectedEvenementColloqueScienntifiquePays(value: EvenementColloqueScienntifiquePaysVo) {
        this.evenementColloqueScienntifiquePaysService.selectedEvenementColloqueScienntifiquePays = value;
       }

   get createEvenementColloqueScienntifiquePaysDialog(): boolean {
           return this.evenementColloqueScienntifiquePaysService.createEvenementColloqueScienntifiquePaysDialog;

       }
    set createEvenementColloqueScienntifiquePaysDialog(value: boolean) {
        this.evenementColloqueScienntifiquePaysService.createEvenementColloqueScienntifiquePaysDialog= value;
       }

       get selectedEvenementColloqueScienntifique(): EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
      set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }
       get evenementColloqueScienntifiques(): Array<EvenementColloqueScienntifiqueVo> {
           return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
       set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }
       get createEvenementColloqueScienntifiqueDialog(): boolean {
           return this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog;
       }
      set createEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog= value;
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




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
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
