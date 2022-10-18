import {Component, OnInit, Input} from '@angular/core';
import {GestionEquipeDetailService} from '../../../../../controller/service/GestionEquipeDetail.service';
import {GestionEquipeDetailVo} from '../../../../../controller/model/GestionEquipeDetail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {GestionEquipeVo} from '../../../../../controller/model/GestionEquipe.model';
import {GestionEquipeService} from '../../../../../controller/service/GestionEquipe.service';
@Component({
  selector: 'app-gestion-equipe-detail-create-admin',
  templateUrl: './gestion-equipe-detail-create-admin.component.html',
  styleUrls: ['./gestion-equipe-detail-create-admin.component.css']
})
export class GestionEquipeDetailCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private gestionEquipeDetailService: GestionEquipeDetailService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private gestionEquipeService :GestionEquipeService
) {

}


// methods
ngOnInit(): void {

    this.selectedGestionEquipe = new GestionEquipeVo();
    this.gestionEquipeService.findAll().subscribe((data) => this.gestionEquipes = data);
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
     this.gestionEquipeDetailService.save().subscribe(gestionEquipeDetail=>{
       this.gestionEquipeDetails.push({...gestionEquipeDetail});
       this.createGestionEquipeDetailDialog = false;
       this.submitted = false;
       this.selectedGestionEquipeDetail = new GestionEquipeDetailVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }










//openPopup
              public async openCreategestionEquipe(gestionEquipe: string) {
                      const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'add');
                       if(isPermistted){
         this.selectedGestionEquipe = new GestionEquipeVo();
        this.createGestionEquipeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createGestionEquipeDetailDialog  = false;
    this.setValidation(true);
}

// getters and setters

get gestionEquipeDetails(): Array<GestionEquipeDetailVo> {
    return this.gestionEquipeDetailService.gestionEquipeDetails;
       }
set gestionEquipeDetails(value: Array<GestionEquipeDetailVo>) {
        this.gestionEquipeDetailService.gestionEquipeDetails = value;
       }

 get selectedGestionEquipeDetail():GestionEquipeDetailVo {
           return this.gestionEquipeDetailService.selectedGestionEquipeDetail;
       }
    set selectedGestionEquipeDetail(value: GestionEquipeDetailVo) {
        this.gestionEquipeDetailService.selectedGestionEquipeDetail = value;
       }

   get createGestionEquipeDetailDialog(): boolean {
           return this.gestionEquipeDetailService.createGestionEquipeDetailDialog;

       }
    set createGestionEquipeDetailDialog(value: boolean) {
        this.gestionEquipeDetailService.createGestionEquipeDetailDialog= value;
       }

       get selectedGestionEquipe(): GestionEquipeVo {
           return this.gestionEquipeService.selectedGestionEquipe;
       }
      set selectedGestionEquipe(value: GestionEquipeVo) {
        this.gestionEquipeService.selectedGestionEquipe = value;
       }
       get gestionEquipes(): Array<GestionEquipeVo> {
           return this.gestionEquipeService.gestionEquipes;
       }
       set gestionEquipes(value: Array<GestionEquipeVo>) {
        this.gestionEquipeService.gestionEquipes = value;
       }
       get createGestionEquipeDialog(): boolean {
           return this.gestionEquipeService.createGestionEquipeDialog;
       }
      set createGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.createGestionEquipeDialog= value;
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



}
