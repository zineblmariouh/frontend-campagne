import {Component, OnInit, Input} from '@angular/core';
import {OutilPedagogiqueLangueService} from '../../../../../controller/service/OutilPedagogiqueLangue.service';
import {OutilPedagogiqueLangueVo} from '../../../../../controller/model/OutilPedagogiqueLangue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {LangueVo} from '../../../../../controller/model/Langue.model';
import {LangueService} from '../../../../../controller/service/Langue.service';
@Component({
  selector: 'app-outil-pedagogique-langue-create-admin',
  templateUrl: './outil-pedagogique-langue-create-admin.component.html',
  styleUrls: ['./outil-pedagogique-langue-create-admin.component.css']
})
export class OutilPedagogiqueLangueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validLangueLibelle = true;
    _validLangueCode = true;



constructor(private datePipe: DatePipe, private outilPedagogiqueLangueService: OutilPedagogiqueLangueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private outilPedagogiqueService :OutilPedagogiqueService
,       private langueService :LangueService
) {

}


// methods
ngOnInit(): void {

    this.selectedLangue = new LangueVo();
    this.langueService.findAll().subscribe((data) => this.langues = data);
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
     this.outilPedagogiqueLangueService.save().subscribe(outilPedagogiqueLangue=>{
       this.outilPedagogiqueLangues.push({...outilPedagogiqueLangue});
       this.createOutilPedagogiqueLangueDialog = false;
       this.submitted = false;
       this.selectedOutilPedagogiqueLangue = new OutilPedagogiqueLangueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatelangue(langue: string) {
                      const isPermistted = await this.roleService.isPermitted('Langue', 'add');
                       if(isPermistted){
         this.selectedLangue = new LangueVo();
        this.createLangueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
// methods

hideCreateDialog(){
    this.createOutilPedagogiqueLangueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get outilPedagogiqueLangues(): Array<OutilPedagogiqueLangueVo> {
    return this.outilPedagogiqueLangueService.outilPedagogiqueLangues;
       }
set outilPedagogiqueLangues(value: Array<OutilPedagogiqueLangueVo>) {
        this.outilPedagogiqueLangueService.outilPedagogiqueLangues = value;
       }

 get selectedOutilPedagogiqueLangue():OutilPedagogiqueLangueVo {
           return this.outilPedagogiqueLangueService.selectedOutilPedagogiqueLangue;
       }
    set selectedOutilPedagogiqueLangue(value: OutilPedagogiqueLangueVo) {
        this.outilPedagogiqueLangueService.selectedOutilPedagogiqueLangue = value;
       }

   get createOutilPedagogiqueLangueDialog(): boolean {
           return this.outilPedagogiqueLangueService.createOutilPedagogiqueLangueDialog;

       }
    set createOutilPedagogiqueLangueDialog(value: boolean) {
        this.outilPedagogiqueLangueService.createOutilPedagogiqueLangueDialog= value;
       }

       get selectedLangue(): LangueVo {
           return this.langueService.selectedLangue;
       }
      set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }
       get langues(): Array<LangueVo> {
           return this.langueService.langues;
       }
       set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }
       get createLangueDialog(): boolean {
           return this.langueService.createLangueDialog;
       }
      set createLangueDialog(value: boolean) {
        this.langueService.createLangueDialog= value;
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


    get validLangueLibelle(): boolean {
    return this._validLangueLibelle;
    }

    set validLangueLibelle(value: boolean) {
    this._validLangueLibelle = value;
    }
    get validLangueCode(): boolean {
    return this._validLangueCode;
    }

    set validLangueCode(value: boolean) {
    this._validLangueCode = value;
    }

}
