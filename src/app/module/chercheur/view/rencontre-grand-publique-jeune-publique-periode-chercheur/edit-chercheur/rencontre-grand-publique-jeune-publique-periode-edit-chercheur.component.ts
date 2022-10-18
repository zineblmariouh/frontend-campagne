import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliquePeriodeService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliquePeriode.service';
import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliquePeriode.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-periode-edit-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-periode-edit-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-periode-edit-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliquePeriodeEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliquePeriodeService: RencontreGrandPubliqueJeunePubliquePeriodeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedRencontreGrandPubliqueJeunePubliquePeriode.dateRencontre = DateUtils.toDate(this.selectedRencontreGrandPubliqueJeunePubliquePeriode.dateRencontre);
    this.rencontreGrandPubliqueJeunePubliquePeriodeService.edit().subscribe(rencontreGrandPubliqueJeunePubliquePeriode=>{
    const myIndex = this.rencontreGrandPubliqueJeunePubliquePeriodes.findIndex(e => e.id === this.selectedRencontreGrandPubliqueJeunePubliquePeriode.id);
    this.rencontreGrandPubliqueJeunePubliquePeriodes[myIndex] = this.selectedRencontreGrandPubliqueJeunePubliquePeriode;
    this.editRencontreGrandPubliqueJeunePubliquePeriodeDialog = false;
    this.selectedRencontreGrandPubliqueJeunePubliquePeriode = new RencontreGrandPubliqueJeunePubliquePeriodeVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editRencontreGrandPubliqueJeunePubliquePeriodeDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliquePeriodes(): Array<RencontreGrandPubliqueJeunePubliquePeriodeVo> {
    return this.rencontreGrandPubliqueJeunePubliquePeriodeService.rencontreGrandPubliqueJeunePubliquePeriodes;
       }
set rencontreGrandPubliqueJeunePubliquePeriodes(value: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.rencontreGrandPubliqueJeunePubliquePeriodes = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliquePeriode(): RencontreGrandPubliqueJeunePubliquePeriodeVo {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.selectedRencontreGrandPubliqueJeunePubliquePeriode;
       }
    set selectedRencontreGrandPubliqueJeunePubliquePeriode(value: RencontreGrandPubliqueJeunePubliquePeriodeVo) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.selectedRencontreGrandPubliqueJeunePubliquePeriode = value;
       }

   get editRencontreGrandPubliqueJeunePubliquePeriodeDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.editRencontreGrandPubliqueJeunePubliquePeriodeDialog;

       }
    set editRencontreGrandPubliqueJeunePubliquePeriodeDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.editRencontreGrandPubliqueJeunePubliquePeriodeDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
