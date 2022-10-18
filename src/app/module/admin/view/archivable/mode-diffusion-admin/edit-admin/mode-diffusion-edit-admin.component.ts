import {Component, OnInit} from '@angular/core';
import {ModeDiffusionService} from '../../../../../controller/service/ModeDiffusion.service';
import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';

@Component({
  selector: 'app-mode-diffusion-edit-admin',
  templateUrl: './mode-diffusion-edit-admin.component.html',
  styleUrls: ['./mode-diffusion-edit-admin.component.css']
})
export class ModeDiffusionEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private modeDiffusionService: ModeDiffusionService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeSavoirService: TypeSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeSavoir = new TypeSavoirVo();
    this.typeSavoirService.findAll().subscribe((data) => this.typeSavoirs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedModeDiffusion.dateArchivage = DateUtils.toDate(this.selectedModeDiffusion.dateArchivage);
            this.selectedModeDiffusion.dateCreation = DateUtils.toDate(this.selectedModeDiffusion.dateCreation);
    this.modeDiffusionService.edit().subscribe(modeDiffusion=>{
    const myIndex = this.modeDiffusions.findIndex(e => e.id === this.selectedModeDiffusion.id);
    this.modeDiffusions[myIndex] = this.selectedModeDiffusion;
    this.editModeDiffusionDialog = false;
    this.selectedModeDiffusion = new ModeDiffusionVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetypeSavoir(typeSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'add');
                       if(isPermistted){
         this.selectedTypeSavoir = new TypeSavoirVo();
        this.createTypeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editModeDiffusionDialog  = false;
}

// getters and setters

get modeDiffusions(): Array<ModeDiffusionVo> {
    return this.modeDiffusionService.modeDiffusions;
       }
set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
       }

 get selectedModeDiffusion(): ModeDiffusionVo {
           return this.modeDiffusionService.selectedModeDiffusion;
       }
    set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
       }

   get editModeDiffusionDialog(): boolean {
           return this.modeDiffusionService.editModeDiffusionDialog;

       }
    set editModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.editModeDiffusionDialog = value;
       }

       get selectedTypeSavoir(): TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
      set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }
       get typeSavoirs(): Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirs;
       }
       set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }
       get createTypeSavoirDialog(): boolean {
           return this.typeSavoirService.createTypeSavoirDialog;
       }
      set createTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.createTypeSavoirDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
