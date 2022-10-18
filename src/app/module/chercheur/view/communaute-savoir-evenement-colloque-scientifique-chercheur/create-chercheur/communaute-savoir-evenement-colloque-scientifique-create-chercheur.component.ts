import {Component, OnInit, Input} from '@angular/core';
import {CommunauteSavoirEvenementColloqueScientifiqueService} from '../../../../../controller/service/CommunauteSavoirEvenementColloqueScientifique.service';
import {CommunauteSavoirEvenementColloqueScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirEvenementColloqueScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';
@Component({
  selector: 'app-communaute-savoir-evenement-colloque-scientifique-create-chercheur',
  templateUrl: './communaute-savoir-evenement-colloque-scientifique-create-chercheur.component.html',
  styleUrls: ['./communaute-savoir-evenement-colloque-scientifique-create-chercheur.component.css']
})
export class CommunauteSavoirEvenementColloqueScientifiqueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCommunauteSavoirLibelle = true;
    _validCommunauteSavoirCode = true;



constructor(private datePipe: DatePipe, private communauteSavoirEvenementColloqueScientifiqueService: CommunauteSavoirEvenementColloqueScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private communauteSavoirService :CommunauteSavoirService
,       private evenementColloqueScienntifiqueService :EvenementColloqueScienntifiqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
    this.evenementColloqueScienntifiqueService.findAll().subscribe((data) => this.evenementColloqueScienntifiques = data);
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
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
     this.communauteSavoirEvenementColloqueScientifiqueService.save().subscribe(communauteSavoirEvenementColloqueScientifique=>{
       this.communauteSavoirEvenementColloqueScientifiques.push({...communauteSavoirEvenementColloqueScientifique});
       this.createCommunauteSavoirEvenementColloqueScientifiqueDialog = false;
       this.submitted = false;
       this.selectedCommunauteSavoirEvenementColloqueScientifique = new CommunauteSavoirEvenementColloqueScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
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
// methods

hideCreateDialog(){
    this.createCommunauteSavoirEvenementColloqueScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get communauteSavoirEvenementColloqueScientifiques(): Array<CommunauteSavoirEvenementColloqueScientifiqueVo> {
    return this.communauteSavoirEvenementColloqueScientifiqueService.communauteSavoirEvenementColloqueScientifiques;
       }
set communauteSavoirEvenementColloqueScientifiques(value: Array<CommunauteSavoirEvenementColloqueScientifiqueVo>) {
        this.communauteSavoirEvenementColloqueScientifiqueService.communauteSavoirEvenementColloqueScientifiques = value;
       }

 get selectedCommunauteSavoirEvenementColloqueScientifique():CommunauteSavoirEvenementColloqueScientifiqueVo {
           return this.communauteSavoirEvenementColloqueScientifiqueService.selectedCommunauteSavoirEvenementColloqueScientifique;
       }
    set selectedCommunauteSavoirEvenementColloqueScientifique(value: CommunauteSavoirEvenementColloqueScientifiqueVo) {
        this.communauteSavoirEvenementColloqueScientifiqueService.selectedCommunauteSavoirEvenementColloqueScientifique = value;
       }

   get createCommunauteSavoirEvenementColloqueScientifiqueDialog(): boolean {
           return this.communauteSavoirEvenementColloqueScientifiqueService.createCommunauteSavoirEvenementColloqueScientifiqueDialog;

       }
    set createCommunauteSavoirEvenementColloqueScientifiqueDialog(value: boolean) {
        this.communauteSavoirEvenementColloqueScientifiqueService.createCommunauteSavoirEvenementColloqueScientifiqueDialog= value;
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


    get validCommunauteSavoirLibelle(): boolean {
    return this._validCommunauteSavoirLibelle;
    }

    set validCommunauteSavoirLibelle(value: boolean) {
    this._validCommunauteSavoirLibelle = value;
    }
    get validCommunauteSavoirCode(): boolean {
    return this._validCommunauteSavoirCode;
    }

    set validCommunauteSavoirCode(value: boolean) {
    this._validCommunauteSavoirCode = value;
    }

}
