import {Component, OnInit, Input} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliquePeriodeService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliquePeriode.service';
import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliquePeriode.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-periode-create-admin',
  templateUrl: './rencontre-grand-publique-jeune-publique-periode-create-admin.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-periode-create-admin.component.css']
})
export class RencontreGrandPubliqueJeunePubliquePeriodeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliquePeriodeService: RencontreGrandPubliqueJeunePubliquePeriodeService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
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
     this.rencontreGrandPubliqueJeunePubliquePeriodeService.save().subscribe(rencontreGrandPubliqueJeunePubliquePeriode=>{
       this.rencontreGrandPubliqueJeunePubliquePeriodes.push({...rencontreGrandPubliqueJeunePubliquePeriode});
       this.createRencontreGrandPubliqueJeunePubliquePeriodeDialog = false;
       this.submitted = false;
       this.selectedRencontreGrandPubliqueJeunePubliquePeriode = new RencontreGrandPubliqueJeunePubliquePeriodeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreaterencontreGrandPubliqueJeunePublique(rencontreGrandPubliqueJeunePublique: string) {
                      const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'add');
                       if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
        this.createRencontreGrandPubliqueJeunePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createRencontreGrandPubliqueJeunePubliquePeriodeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get rencontreGrandPubliqueJeunePubliquePeriodes(): Array<RencontreGrandPubliqueJeunePubliquePeriodeVo> {
    return this.rencontreGrandPubliqueJeunePubliquePeriodeService.rencontreGrandPubliqueJeunePubliquePeriodes;
       }
set rencontreGrandPubliqueJeunePubliquePeriodes(value: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.rencontreGrandPubliqueJeunePubliquePeriodes = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliquePeriode():RencontreGrandPubliqueJeunePubliquePeriodeVo {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.selectedRencontreGrandPubliqueJeunePubliquePeriode;
       }
    set selectedRencontreGrandPubliqueJeunePubliquePeriode(value: RencontreGrandPubliqueJeunePubliquePeriodeVo) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.selectedRencontreGrandPubliqueJeunePubliquePeriode = value;
       }

   get createRencontreGrandPubliqueJeunePubliquePeriodeDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.createRencontreGrandPubliqueJeunePubliquePeriodeDialog;

       }
    set createRencontreGrandPubliqueJeunePubliquePeriodeDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.createRencontreGrandPubliqueJeunePubliquePeriodeDialog= value;
       }

       get selectedRencontreGrandPubliqueJeunePublique(): RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
      set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }
       get rencontreGrandPubliqueJeunePubliques(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
       set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }
       get createRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog;
       }
      set createRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog= value;
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
