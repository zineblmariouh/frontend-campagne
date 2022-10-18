import {Component, OnInit, Input} from '@angular/core';
import {EtablissementConseilsScientifiqueService} from '../../../../../controller/service/EtablissementConseilsScientifique.service';
import {EtablissementConseilsScientifiqueVo} from '../../../../../controller/model/EtablissementConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
@Component({
  selector: 'app-etablissement-conseils-scientifique-create-admin',
  templateUrl: './etablissement-conseils-scientifique-create-admin.component.html',
  styleUrls: ['./etablissement-conseils-scientifique-create-admin.component.css']
})
export class EtablissementConseilsScientifiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validConseilsScientifiqueNatureExpertise = true;
    _validConseilsScientifiqueIntitule = true;
    _validConseilsScientifiqueEtablissementConseilsScientifiques = true;
    _validConseilsScientifiqueTypeExpertise = true;
    _validConseilsScientifiqueNombreJoursConsacres = true;
    _validEtablissementLibelle = true;



constructor(private datePipe: DatePipe, private etablissementConseilsScientifiqueService: EtablissementConseilsScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private conseilsScientifiqueService :ConseilsScientifiqueService
,       private etablissementService :EtablissementService
) {

}


// methods
ngOnInit(): void {

    this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
    this.conseilsScientifiqueService.findAll().subscribe((data) => this.conseilsScientifiques = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
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
     this.etablissementConseilsScientifiqueService.save().subscribe(etablissementConseilsScientifique=>{
       this.etablissementConseilsScientifiques.push({...etablissementConseilsScientifique});
       this.createEtablissementConseilsScientifiqueDialog = false;
       this.submitted = false;
       this.selectedEtablissementConseilsScientifique = new EtablissementConseilsScientifiqueVo();


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
              public async openCreateconseilsScientifique(conseilsScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'add');
                       if(isPermistted){
         this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
        this.createConseilsScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createEtablissementConseilsScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etablissementConseilsScientifiques(): Array<EtablissementConseilsScientifiqueVo> {
    return this.etablissementConseilsScientifiqueService.etablissementConseilsScientifiques;
       }
set etablissementConseilsScientifiques(value: Array<EtablissementConseilsScientifiqueVo>) {
        this.etablissementConseilsScientifiqueService.etablissementConseilsScientifiques = value;
       }

 get selectedEtablissementConseilsScientifique():EtablissementConseilsScientifiqueVo {
           return this.etablissementConseilsScientifiqueService.selectedEtablissementConseilsScientifique;
       }
    set selectedEtablissementConseilsScientifique(value: EtablissementConseilsScientifiqueVo) {
        this.etablissementConseilsScientifiqueService.selectedEtablissementConseilsScientifique = value;
       }

   get createEtablissementConseilsScientifiqueDialog(): boolean {
           return this.etablissementConseilsScientifiqueService.createEtablissementConseilsScientifiqueDialog;

       }
    set createEtablissementConseilsScientifiqueDialog(value: boolean) {
        this.etablissementConseilsScientifiqueService.createEtablissementConseilsScientifiqueDialog= value;
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
       get selectedConseilsScientifique(): ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
      set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }
       get conseilsScientifiques(): Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiques;
       }
       set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }
       get createConseilsScientifiqueDialog(): boolean {
           return this.conseilsScientifiqueService.createConseilsScientifiqueDialog;
       }
      set createConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.createConseilsScientifiqueDialog= value;
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


    get validConseilsScientifiqueNatureExpertise(): boolean {
    return this._validConseilsScientifiqueNatureExpertise;
    }

    set validConseilsScientifiqueNatureExpertise(value: boolean) {
    this._validConseilsScientifiqueNatureExpertise = value;
    }
    get validConseilsScientifiqueIntitule(): boolean {
    return this._validConseilsScientifiqueIntitule;
    }

    set validConseilsScientifiqueIntitule(value: boolean) {
    this._validConseilsScientifiqueIntitule = value;
    }
    get validConseilsScientifiqueEtablissementConseilsScientifiques(): boolean {
    return this._validConseilsScientifiqueEtablissementConseilsScientifiques;
    }

    set validConseilsScientifiqueEtablissementConseilsScientifiques(value: boolean) {
    this._validConseilsScientifiqueEtablissementConseilsScientifiques = value;
    }
    get validConseilsScientifiqueTypeExpertise(): boolean {
    return this._validConseilsScientifiqueTypeExpertise;
    }

    set validConseilsScientifiqueTypeExpertise(value: boolean) {
    this._validConseilsScientifiqueTypeExpertise = value;
    }
    get validConseilsScientifiqueNombreJoursConsacres(): boolean {
    return this._validConseilsScientifiqueNombreJoursConsacres;
    }

    set validConseilsScientifiqueNombreJoursConsacres(value: boolean) {
    this._validConseilsScientifiqueNombreJoursConsacres = value;
    }
    get validEtablissementLibelle(): boolean {
    return this._validEtablissementLibelle;
    }

    set validEtablissementLibelle(value: boolean) {
    this._validEtablissementLibelle = value;
    }

}
