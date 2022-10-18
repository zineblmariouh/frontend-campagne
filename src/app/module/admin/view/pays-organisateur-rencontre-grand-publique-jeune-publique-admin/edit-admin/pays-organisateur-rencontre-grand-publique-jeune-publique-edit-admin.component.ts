import {Component, OnInit} from '@angular/core';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysOrganisateurRencontreGrandPubliqueJeunePublique.service';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysOrganisateurRencontreGrandPubliqueJeunePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-pays-organisateur-rencontre-grand-publique-jeune-publique-edit-admin',
  templateUrl: './pays-organisateur-rencontre-grand-publique-jeune-publique-edit-admin.component.html',
  styleUrls: ['./pays-organisateur-rencontre-grand-publique-jeune-publique-edit-admin.component.css']
})
export class PaysOrganisateurRencontreGrandPubliqueJeunePubliqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysOrganisateurRencontreGrandPubliqueJeunePubliqueService: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.edit().subscribe(paysOrganisateurRencontreGrandPubliqueJeunePublique=>{
    const myIndex = this.paysOrganisateurRencontreGrandPubliqueJeunePubliques.findIndex(e => e.id === this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique.id);
    this.paysOrganisateurRencontreGrandPubliqueJeunePubliques[myIndex] = this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique;
    this.editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog = false;
    this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique = new PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo();


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

hideEditDialog(){
    this.editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog  = false;
}

// getters and setters

get paysOrganisateurRencontreGrandPubliqueJeunePubliques(): Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> {
    return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.paysOrganisateurRencontreGrandPubliqueJeunePubliques;
       }
set paysOrganisateurRencontreGrandPubliqueJeunePubliques(value: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.paysOrganisateurRencontreGrandPubliqueJeunePubliques = value;
       }

 get selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique(): PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo {
           return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique;
       }
    set selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique(value: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique = value;
       }

   get editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog;

       }
    set editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
