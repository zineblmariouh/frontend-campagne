import {Component, OnInit, Input} from '@angular/core';
import {OutilPedagogiquePubliqueCibleService} from '../../../../../controller/service/OutilPedagogiquePubliqueCible.service';
import {OutilPedagogiquePubliqueCibleVo} from '../../../../../controller/model/OutilPedagogiquePubliqueCible.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {PubliqueCibleVo} from '../../../../../controller/model/PubliqueCible.model';
import {PubliqueCibleService} from '../../../../../controller/service/PubliqueCible.service';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
@Component({
  selector: 'app-outil-pedagogique-publique-cible-create-chercheur',
  templateUrl: './outil-pedagogique-publique-cible-create-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-publique-cible-create-chercheur.component.css']
})
export class OutilPedagogiquePubliqueCibleCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPubliqueCibleLibelle = true;



constructor(private datePipe: DatePipe, private outilPedagogiquePubliqueCibleService: OutilPedagogiquePubliqueCibleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private publiqueCibleService :PubliqueCibleService
,       private outilPedagogiqueService :OutilPedagogiqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedPubliqueCible = new PubliqueCibleVo();
    this.publiqueCibleService.findAll().subscribe((data) => this.publiqueCibles = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
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
     this.outilPedagogiquePubliqueCibleService.save().subscribe(outilPedagogiquePubliqueCible=>{
       this.outilPedagogiquePubliqueCibles.push({...outilPedagogiquePubliqueCible});
       this.createOutilPedagogiquePubliqueCibleDialog = false;
       this.submitted = false;
       this.selectedOutilPedagogiquePubliqueCible = new OutilPedagogiquePubliqueCibleVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateoutilPedagogique(outilPedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'add');
                       if(isPermistted){
         this.selectedOutilPedagogique = new OutilPedagogiqueVo();
        this.createOutilPedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepubliqueCible(publiqueCible: string) {
                      const isPermistted = await this.roleService.isPermitted('PubliqueCible', 'add');
                       if(isPermistted){
         this.selectedPubliqueCible = new PubliqueCibleVo();
        this.createPubliqueCibleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createOutilPedagogiquePubliqueCibleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get outilPedagogiquePubliqueCibles(): Array<OutilPedagogiquePubliqueCibleVo> {
    return this.outilPedagogiquePubliqueCibleService.outilPedagogiquePubliqueCibles;
       }
set outilPedagogiquePubliqueCibles(value: Array<OutilPedagogiquePubliqueCibleVo>) {
        this.outilPedagogiquePubliqueCibleService.outilPedagogiquePubliqueCibles = value;
       }

 get selectedOutilPedagogiquePubliqueCible():OutilPedagogiquePubliqueCibleVo {
           return this.outilPedagogiquePubliqueCibleService.selectedOutilPedagogiquePubliqueCible;
       }
    set selectedOutilPedagogiquePubliqueCible(value: OutilPedagogiquePubliqueCibleVo) {
        this.outilPedagogiquePubliqueCibleService.selectedOutilPedagogiquePubliqueCible = value;
       }

   get createOutilPedagogiquePubliqueCibleDialog(): boolean {
           return this.outilPedagogiquePubliqueCibleService.createOutilPedagogiquePubliqueCibleDialog;

       }
    set createOutilPedagogiquePubliqueCibleDialog(value: boolean) {
        this.outilPedagogiquePubliqueCibleService.createOutilPedagogiquePubliqueCibleDialog= value;
       }

       get selectedOutilPedagogique(): OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
      set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }
       get outilPedagogiques(): Array<OutilPedagogiqueVo> {
           return this.outilPedagogiqueService.outilPedagogiques;
       }
       set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }
       get createOutilPedagogiqueDialog(): boolean {
           return this.outilPedagogiqueService.createOutilPedagogiqueDialog;
       }
      set createOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.createOutilPedagogiqueDialog= value;
       }
       get selectedPubliqueCible(): PubliqueCibleVo {
           return this.publiqueCibleService.selectedPubliqueCible;
       }
      set selectedPubliqueCible(value: PubliqueCibleVo) {
        this.publiqueCibleService.selectedPubliqueCible = value;
       }
       get publiqueCibles(): Array<PubliqueCibleVo> {
           return this.publiqueCibleService.publiqueCibles;
       }
       set publiqueCibles(value: Array<PubliqueCibleVo>) {
        this.publiqueCibleService.publiqueCibles = value;
       }
       get createPubliqueCibleDialog(): boolean {
           return this.publiqueCibleService.createPubliqueCibleDialog;
       }
      set createPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.createPubliqueCibleDialog= value;
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


    get validPubliqueCibleLibelle(): boolean {
    return this._validPubliqueCibleLibelle;
    }

    set validPubliqueCibleLibelle(value: boolean) {
    this._validPubliqueCibleLibelle = value;
    }

}
