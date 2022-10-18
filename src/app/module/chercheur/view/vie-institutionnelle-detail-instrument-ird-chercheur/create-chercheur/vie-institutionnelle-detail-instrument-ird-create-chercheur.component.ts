import {Component, OnInit, Input} from '@angular/core';
import {VieInstitutionnelleDetailInstrumentIrdService} from '../../../../../controller/service/VieInstitutionnelleDetailInstrumentIrd.service';
import {VieInstitutionnelleDetailInstrumentIrdVo} from '../../../../../controller/model/VieInstitutionnelleDetailInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {VieInstitutionnelleDetailService} from '../../../../../controller/service/VieInstitutionnelleDetail.service';
@Component({
  selector: 'app-vie-institutionnelle-detail-instrument-ird-create-chercheur',
  templateUrl: './vie-institutionnelle-detail-instrument-ird-create-chercheur.component.html',
  styleUrls: ['./vie-institutionnelle-detail-instrument-ird-create-chercheur.component.css']
})
export class VieInstitutionnelleDetailInstrumentIrdCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validInstrumentIrdCode = true;
    _validInstrumentIrdLibelle = true;



constructor(private datePipe: DatePipe, private vieInstitutionnelleDetailInstrumentIrdService: VieInstitutionnelleDetailInstrumentIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private instrumentIrdService :InstrumentIrdService
,       private vieInstitutionnelleDetailService :VieInstitutionnelleDetailService
) {

}


// methods
ngOnInit(): void {

    this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
    this.vieInstitutionnelleDetailService.findAll().subscribe((data) => this.vieInstitutionnelleDetails = data);
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
     this.vieInstitutionnelleDetailInstrumentIrdService.save().subscribe(vieInstitutionnelleDetailInstrumentIrd=>{
       this.vieInstitutionnelleDetailInstrumentIrds.push({...vieInstitutionnelleDetailInstrumentIrd});
       this.createVieInstitutionnelleDetailInstrumentIrdDialog = false;
       this.submitted = false;
       this.selectedVieInstitutionnelleDetailInstrumentIrd = new VieInstitutionnelleDetailInstrumentIrdVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatevieInstitutionnelleDetail(vieInstitutionnelleDetail: string) {
                      const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'add');
                       if(isPermistted){
         this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
        this.createVieInstitutionnelleDetailDialog = true;
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
    this.createVieInstitutionnelleDetailInstrumentIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get vieInstitutionnelleDetailInstrumentIrds(): Array<VieInstitutionnelleDetailInstrumentIrdVo> {
    return this.vieInstitutionnelleDetailInstrumentIrdService.vieInstitutionnelleDetailInstrumentIrds;
       }
set vieInstitutionnelleDetailInstrumentIrds(value: Array<VieInstitutionnelleDetailInstrumentIrdVo>) {
        this.vieInstitutionnelleDetailInstrumentIrdService.vieInstitutionnelleDetailInstrumentIrds = value;
       }

 get selectedVieInstitutionnelleDetailInstrumentIrd():VieInstitutionnelleDetailInstrumentIrdVo {
           return this.vieInstitutionnelleDetailInstrumentIrdService.selectedVieInstitutionnelleDetailInstrumentIrd;
       }
    set selectedVieInstitutionnelleDetailInstrumentIrd(value: VieInstitutionnelleDetailInstrumentIrdVo) {
        this.vieInstitutionnelleDetailInstrumentIrdService.selectedVieInstitutionnelleDetailInstrumentIrd = value;
       }

   get createVieInstitutionnelleDetailInstrumentIrdDialog(): boolean {
           return this.vieInstitutionnelleDetailInstrumentIrdService.createVieInstitutionnelleDetailInstrumentIrdDialog;

       }
    set createVieInstitutionnelleDetailInstrumentIrdDialog(value: boolean) {
        this.vieInstitutionnelleDetailInstrumentIrdService.createVieInstitutionnelleDetailInstrumentIrdDialog= value;
       }

       get selectedVieInstitutionnelleDetail(): VieInstitutionnelleDetailVo {
           return this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail;
       }
      set selectedVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail = value;
       }
       get vieInstitutionnelleDetails(): Array<VieInstitutionnelleDetailVo> {
           return this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails;
       }
       set vieInstitutionnelleDetails(value: Array<VieInstitutionnelleDetailVo>) {
        this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails = value;
       }
       get createVieInstitutionnelleDetailDialog(): boolean {
           return this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog;
       }
      set createVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog= value;
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
