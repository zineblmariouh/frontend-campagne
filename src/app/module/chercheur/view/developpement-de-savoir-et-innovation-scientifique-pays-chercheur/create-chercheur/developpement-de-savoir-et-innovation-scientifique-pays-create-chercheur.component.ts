import {Component, OnInit, Input} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiquePays.service';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-pays-create-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-pays-create-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-pays-create-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiquePaysCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiquePaysService: DeveloppementDeSavoirEtInnovationScientifiquePaysService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
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
     this.developpementDeSavoirEtInnovationScientifiquePaysService.save().subscribe(developpementDeSavoirEtInnovationScientifiquePays=>{
       this.developpementDeSavoirEtInnovationScientifiquePayss.push({...developpementDeSavoirEtInnovationScientifiquePays});
       this.createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog = false;
       this.submitted = false;
       this.selectedDeveloppementDeSavoirEtInnovationScientifiquePays = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatedeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'add');
                       if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
        this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
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
    this.createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog  = false;
    this.setValidation(true);
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiquePayss(): Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {
    return this.developpementDeSavoirEtInnovationScientifiquePaysService.developpementDeSavoirEtInnovationScientifiquePayss;
       }
set developpementDeSavoirEtInnovationScientifiquePayss(value: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.developpementDeSavoirEtInnovationScientifiquePayss = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiquePays():DeveloppementDeSavoirEtInnovationScientifiquePaysVo {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.selectedDeveloppementDeSavoirEtInnovationScientifiquePays;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiquePays(value: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.selectedDeveloppementDeSavoirEtInnovationScientifiquePays = value;
       }

   get createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog;

       }
    set createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog= value;
       }

       get selectedDeveloppementDeSavoirEtInnovationScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
      set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }
       get developpementDeSavoirEtInnovationScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
       set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }
       get createDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
      set createDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
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
