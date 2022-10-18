import {Component, OnInit, Input} from '@angular/core';
import {ProjetActiviteRechercheDetailPaysService} from '../../../../../controller/service/ProjetActiviteRechercheDetailPays.service';
import {ProjetActiviteRechercheDetailPaysVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailPays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-projet-activite-recherche-detail-pays-create-admin',
  templateUrl: './projet-activite-recherche-detail-pays-create-admin.component.html',
  styleUrls: ['./projet-activite-recherche-detail-pays-create-admin.component.css']
})
export class ProjetActiviteRechercheDetailPaysCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailPaysService: ProjetActiviteRechercheDetailPaysService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private projetActiviteRechercheDetailService :ProjetActiviteRechercheDetailService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
    this.projetActiviteRechercheDetailService.findAll().subscribe((data) => this.projetActiviteRechercheDetails = data);
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
     this.projetActiviteRechercheDetailPaysService.save().subscribe(projetActiviteRechercheDetailPays=>{
       this.projetActiviteRechercheDetailPayss.push({...projetActiviteRechercheDetailPays});
       this.createProjetActiviteRechercheDetailPaysDialog = false;
       this.submitted = false;
       this.selectedProjetActiviteRechercheDetailPays = new ProjetActiviteRechercheDetailPaysVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreateprojetActiviteRechercheDetail(projetActiviteRechercheDetail: string) {
                      const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'add');
                       if(isPermistted){
         this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
        this.createProjetActiviteRechercheDetailDialog = true;
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
    this.createProjetActiviteRechercheDetailPaysDialog  = false;
    this.setValidation(true);
}

// getters and setters

get projetActiviteRechercheDetailPayss(): Array<ProjetActiviteRechercheDetailPaysVo> {
    return this.projetActiviteRechercheDetailPaysService.projetActiviteRechercheDetailPayss;
       }
set projetActiviteRechercheDetailPayss(value: Array<ProjetActiviteRechercheDetailPaysVo>) {
        this.projetActiviteRechercheDetailPaysService.projetActiviteRechercheDetailPayss = value;
       }

 get selectedProjetActiviteRechercheDetailPays():ProjetActiviteRechercheDetailPaysVo {
           return this.projetActiviteRechercheDetailPaysService.selectedProjetActiviteRechercheDetailPays;
       }
    set selectedProjetActiviteRechercheDetailPays(value: ProjetActiviteRechercheDetailPaysVo) {
        this.projetActiviteRechercheDetailPaysService.selectedProjetActiviteRechercheDetailPays = value;
       }

   get createProjetActiviteRechercheDetailPaysDialog(): boolean {
           return this.projetActiviteRechercheDetailPaysService.createProjetActiviteRechercheDetailPaysDialog;

       }
    set createProjetActiviteRechercheDetailPaysDialog(value: boolean) {
        this.projetActiviteRechercheDetailPaysService.createProjetActiviteRechercheDetailPaysDialog= value;
       }

       get selectedProjetActiviteRechercheDetail(): ProjetActiviteRechercheDetailVo {
           return this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail;
       }
      set selectedProjetActiviteRechercheDetail(value: ProjetActiviteRechercheDetailVo) {
        this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail = value;
       }
       get projetActiviteRechercheDetails(): Array<ProjetActiviteRechercheDetailVo> {
           return this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails;
       }
       set projetActiviteRechercheDetails(value: Array<ProjetActiviteRechercheDetailVo>) {
        this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails = value;
       }
       get createProjetActiviteRechercheDetailDialog(): boolean {
           return this.projetActiviteRechercheDetailService.createProjetActiviteRechercheDetailDialog;
       }
      set createProjetActiviteRechercheDetailDialog(value: boolean) {
        this.projetActiviteRechercheDetailService.createProjetActiviteRechercheDetailDialog= value;
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
