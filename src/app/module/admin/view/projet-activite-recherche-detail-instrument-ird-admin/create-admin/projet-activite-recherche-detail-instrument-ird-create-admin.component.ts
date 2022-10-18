import {Component, OnInit, Input} from '@angular/core';
import {ProjetActiviteRechercheDetailInstrumentIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstrumentIrd.service';
import {ProjetActiviteRechercheDetailInstrumentIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
@Component({
  selector: 'app-projet-activite-recherche-detail-instrument-ird-create-admin',
  templateUrl: './projet-activite-recherche-detail-instrument-ird-create-admin.component.html',
  styleUrls: ['./projet-activite-recherche-detail-instrument-ird-create-admin.component.css']
})
export class ProjetActiviteRechercheDetailInstrumentIrdCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validInstrumentIrdCode = true;
    _validInstrumentIrdLibelle = true;



constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailInstrumentIrdService: ProjetActiviteRechercheDetailInstrumentIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private instrumentIrdService :InstrumentIrdService
,       private projetActiviteRechercheDetailService :ProjetActiviteRechercheDetailService
) {

}


// methods
ngOnInit(): void {

    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
    this.projetActiviteRechercheDetailService.findAll().subscribe((data) => this.projetActiviteRechercheDetails = data);
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
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
     this.projetActiviteRechercheDetailInstrumentIrdService.save().subscribe(projetActiviteRechercheDetailInstrumentIrd=>{
       this.projetActiviteRechercheDetailInstrumentIrds.push({...projetActiviteRechercheDetailInstrumentIrd});
       this.createProjetActiviteRechercheDetailInstrumentIrdDialog = false;
       this.submitted = false;
       this.selectedProjetActiviteRechercheDetailInstrumentIrd = new ProjetActiviteRechercheDetailInstrumentIrdVo();


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
              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createProjetActiviteRechercheDetailInstrumentIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get projetActiviteRechercheDetailInstrumentIrds(): Array<ProjetActiviteRechercheDetailInstrumentIrdVo> {
    return this.projetActiviteRechercheDetailInstrumentIrdService.projetActiviteRechercheDetailInstrumentIrds;
       }
set projetActiviteRechercheDetailInstrumentIrds(value: Array<ProjetActiviteRechercheDetailInstrumentIrdVo>) {
        this.projetActiviteRechercheDetailInstrumentIrdService.projetActiviteRechercheDetailInstrumentIrds = value;
       }

 get selectedProjetActiviteRechercheDetailInstrumentIrd():ProjetActiviteRechercheDetailInstrumentIrdVo {
           return this.projetActiviteRechercheDetailInstrumentIrdService.selectedProjetActiviteRechercheDetailInstrumentIrd;
       }
    set selectedProjetActiviteRechercheDetailInstrumentIrd(value: ProjetActiviteRechercheDetailInstrumentIrdVo) {
        this.projetActiviteRechercheDetailInstrumentIrdService.selectedProjetActiviteRechercheDetailInstrumentIrd = value;
       }

   get createProjetActiviteRechercheDetailInstrumentIrdDialog(): boolean {
           return this.projetActiviteRechercheDetailInstrumentIrdService.createProjetActiviteRechercheDetailInstrumentIrdDialog;

       }
    set createProjetActiviteRechercheDetailInstrumentIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailInstrumentIrdService.createProjetActiviteRechercheDetailInstrumentIrdDialog= value;
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
       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
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


    get validInstrumentIrdCode(): boolean {
    return this._validInstrumentIrdCode;
    }

    set validInstrumentIrdCode(value: boolean) {
    this._validInstrumentIrdCode = value;
    }
    get validInstrumentIrdLibelle(): boolean {
    return this._validInstrumentIrdLibelle;
    }

    set validInstrumentIrdLibelle(value: boolean) {
    this._validInstrumentIrdLibelle = value;
    }

}
