import {Component, OnInit, Input} from '@angular/core';
import {OutilPedagogiqueInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueInstrumentIrd.service';
import {OutilPedagogiqueInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
@Component({
  selector: 'app-outil-pedagogique-instrument-ird-create-chercheur',
  templateUrl: './outil-pedagogique-instrument-ird-create-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-instrument-ird-create-chercheur.component.css']
})
export class OutilPedagogiqueInstrumentIrdCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validInstrumentIrdCode = true;
    _validInstrumentIrdLibelle = true;



constructor(private datePipe: DatePipe, private outilPedagogiqueInstrumentIrdService: OutilPedagogiqueInstrumentIrdService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private instrumentIrdService :InstrumentIrdService
,       private outilPedagogiqueService :OutilPedagogiqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
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
     this.outilPedagogiqueInstrumentIrdService.save().subscribe(outilPedagogiqueInstrumentIrd=>{
       this.outilPedagogiqueInstrumentIrds.push({...outilPedagogiqueInstrumentIrd});
       this.createOutilPedagogiqueInstrumentIrdDialog = false;
       this.submitted = false;
       this.selectedOutilPedagogiqueInstrumentIrd = new OutilPedagogiqueInstrumentIrdVo();


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
    this.createOutilPedagogiqueInstrumentIrdDialog  = false;
    this.setValidation(true);
}

// getters and setters

get outilPedagogiqueInstrumentIrds(): Array<OutilPedagogiqueInstrumentIrdVo> {
    return this.outilPedagogiqueInstrumentIrdService.outilPedagogiqueInstrumentIrds;
       }
set outilPedagogiqueInstrumentIrds(value: Array<OutilPedagogiqueInstrumentIrdVo>) {
        this.outilPedagogiqueInstrumentIrdService.outilPedagogiqueInstrumentIrds = value;
       }

 get selectedOutilPedagogiqueInstrumentIrd():OutilPedagogiqueInstrumentIrdVo {
           return this.outilPedagogiqueInstrumentIrdService.selectedOutilPedagogiqueInstrumentIrd;
       }
    set selectedOutilPedagogiqueInstrumentIrd(value: OutilPedagogiqueInstrumentIrdVo) {
        this.outilPedagogiqueInstrumentIrdService.selectedOutilPedagogiqueInstrumentIrd = value;
       }

   get createOutilPedagogiqueInstrumentIrdDialog(): boolean {
           return this.outilPedagogiqueInstrumentIrdService.createOutilPedagogiqueInstrumentIrdDialog;

       }
    set createOutilPedagogiqueInstrumentIrdDialog(value: boolean) {
        this.outilPedagogiqueInstrumentIrdService.createOutilPedagogiqueInstrumentIrdDialog= value;
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
