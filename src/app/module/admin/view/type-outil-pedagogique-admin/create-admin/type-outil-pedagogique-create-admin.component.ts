import {Component, OnInit, Input} from '@angular/core';
import {TypeOutilPedagogiqueService} from '../../../../../controller/service/TypeOutilPedagogique.service';
import {TypeOutilPedagogiqueVo} from '../../../../../controller/model/TypeOutilPedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {TypeOutilVo} from '../../../../../controller/model/TypeOutil.model';
import {TypeOutilService} from '../../../../../controller/service/TypeOutil.service';
@Component({
  selector: 'app-type-outil-pedagogique-create-admin',
  templateUrl: './type-outil-pedagogique-create-admin.component.html',
  styleUrls: ['./type-outil-pedagogique-create-admin.component.css']
})
export class TypeOutilPedagogiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validTypeOutilLibelle = true;
    _validTypeOutilCode = true;



constructor(private datePipe: DatePipe, private typeOutilPedagogiqueService: TypeOutilPedagogiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private outilPedagogiqueService :OutilPedagogiqueService
,       private typeOutilService :TypeOutilService
) {

}


// methods
ngOnInit(): void {

    this.selectedTypeOutil = new TypeOutilVo();
    this.typeOutilService.findAll().subscribe((data) => this.typeOutils = data);
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
     this.typeOutilPedagogiqueService.save().subscribe(typeOutilPedagogique=>{
       this.typeOutilPedagogiques.push({...typeOutilPedagogique});
       this.createTypeOutilPedagogiqueDialog = false;
       this.submitted = false;
       this.selectedTypeOutilPedagogique = new TypeOutilPedagogiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatetypeOutil(typeOutil: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeOutil', 'add');
                       if(isPermistted){
         this.selectedTypeOutil = new TypeOutilVo();
        this.createTypeOutilDialog = true;
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
    this.createTypeOutilPedagogiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeOutilPedagogiques(): Array<TypeOutilPedagogiqueVo> {
    return this.typeOutilPedagogiqueService.typeOutilPedagogiques;
       }
set typeOutilPedagogiques(value: Array<TypeOutilPedagogiqueVo>) {
        this.typeOutilPedagogiqueService.typeOutilPedagogiques = value;
       }

 get selectedTypeOutilPedagogique():TypeOutilPedagogiqueVo {
           return this.typeOutilPedagogiqueService.selectedTypeOutilPedagogique;
       }
    set selectedTypeOutilPedagogique(value: TypeOutilPedagogiqueVo) {
        this.typeOutilPedagogiqueService.selectedTypeOutilPedagogique = value;
       }

   get createTypeOutilPedagogiqueDialog(): boolean {
           return this.typeOutilPedagogiqueService.createTypeOutilPedagogiqueDialog;

       }
    set createTypeOutilPedagogiqueDialog(value: boolean) {
        this.typeOutilPedagogiqueService.createTypeOutilPedagogiqueDialog= value;
       }

       get selectedTypeOutil(): TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
      set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }
       get typeOutils(): Array<TypeOutilVo> {
           return this.typeOutilService.typeOutils;
       }
       set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }
       get createTypeOutilDialog(): boolean {
           return this.typeOutilService.createTypeOutilDialog;
       }
      set createTypeOutilDialog(value: boolean) {
        this.typeOutilService.createTypeOutilDialog= value;
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


    get validTypeOutilLibelle(): boolean {
    return this._validTypeOutilLibelle;
    }

    set validTypeOutilLibelle(value: boolean) {
    this._validTypeOutilLibelle = value;
    }
    get validTypeOutilCode(): boolean {
    return this._validTypeOutilCode;
    }

    set validTypeOutilCode(value: boolean) {
    this._validTypeOutilCode = value;
    }

}
