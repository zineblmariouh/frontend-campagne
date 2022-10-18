import {Component, OnInit} from '@angular/core';
import {ModeDiffusionService} from '../../../../../controller/service/ModeDiffusion.service';
import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';

@Component({
  selector: 'app-mode-diffusion-view-admin',
  templateUrl: './mode-diffusion-view-admin.component.html',
  styleUrls: ['./mode-diffusion-view-admin.component.css']
})
export class ModeDiffusionViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private modeDiffusionService: ModeDiffusionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeSavoirService :TypeSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeSavoir = new TypeSavoirVo();
    this.typeSavoirService.findAll().subscribe((data) => this.typeSavoirs = data);
}

hideViewDialog(){
    this.viewModeDiffusionDialog  = false;
}

// getters and setters

get modeDiffusions(): Array<ModeDiffusionVo> {
    return this.modeDiffusionService.modeDiffusions;
       }
set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
       }

 get selectedModeDiffusion():ModeDiffusionVo {
           return this.modeDiffusionService.selectedModeDiffusion;
       }
    set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
       }

   get viewModeDiffusionDialog():boolean {
           return this.modeDiffusionService.viewModeDiffusionDialog;

       }
    set viewModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.viewModeDiffusionDialog= value;
       }

       get selectedTypeSavoir():TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
      set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }
       get typeSavoirs():Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirs;
       }
       set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }
       get editTypeSavoirDialog():boolean {
           return this.typeSavoirService.editTypeSavoirDialog;
       }
      set editTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.editTypeSavoirDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
