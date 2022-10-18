import {Component, OnInit} from '@angular/core';
import {GestionEquipeDetailService} from '../../../../../controller/service/GestionEquipeDetail.service';
import {GestionEquipeDetailVo} from '../../../../../controller/model/GestionEquipeDetail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {GestionEquipeVo} from '../../../../../controller/model/GestionEquipe.model';
import {GestionEquipeService} from '../../../../../controller/service/GestionEquipe.service';

@Component({
  selector: 'app-gestion-equipe-detail-edit-admin',
  templateUrl: './gestion-equipe-detail-edit-admin.component.html',
  styleUrls: ['./gestion-equipe-detail-edit-admin.component.css']
})
export class GestionEquipeDetailEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private gestionEquipeDetailService: GestionEquipeDetailService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private gestionEquipeService: GestionEquipeService
) {
}

// methods
ngOnInit(): void {
    this.selectedGestionEquipe = new GestionEquipeVo();
    this.gestionEquipeService.findAll().subscribe((data) => this.gestionEquipes = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.gestionEquipeDetailService.edit().subscribe(gestionEquipeDetail=>{
    const myIndex = this.gestionEquipeDetails.findIndex(e => e.id === this.selectedGestionEquipeDetail.id);
    this.gestionEquipeDetails[myIndex] = this.selectedGestionEquipeDetail;
    this.editGestionEquipeDetailDialog = false;
    this.selectedGestionEquipeDetail = new GestionEquipeDetailVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editGestionEquipeDetailDialog  = false;
}

// getters and setters

get gestionEquipeDetails(): Array<GestionEquipeDetailVo> {
    return this.gestionEquipeDetailService.gestionEquipeDetails;
       }
set gestionEquipeDetails(value: Array<GestionEquipeDetailVo>) {
        this.gestionEquipeDetailService.gestionEquipeDetails = value;
       }

 get selectedGestionEquipeDetail(): GestionEquipeDetailVo {
           return this.gestionEquipeDetailService.selectedGestionEquipeDetail;
       }
    set selectedGestionEquipeDetail(value: GestionEquipeDetailVo) {
        this.gestionEquipeDetailService.selectedGestionEquipeDetail = value;
       }

   get editGestionEquipeDetailDialog(): boolean {
           return this.gestionEquipeDetailService.editGestionEquipeDetailDialog;

       }
    set editGestionEquipeDetailDialog(value: boolean) {
        this.gestionEquipeDetailService.editGestionEquipeDetailDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
