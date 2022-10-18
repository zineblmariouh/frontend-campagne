import {Component, OnInit} from '@angular/core';
import {RencontreMediaEnjeuxIrdService} from '../../../../../controller/service/RencontreMediaEnjeuxIrd.service';
import {RencontreMediaEnjeuxIrdVo} from '../../../../../controller/model/RencontreMediaEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-rencontre-media-enjeux-ird-view-chercheur',
  templateUrl: './rencontre-media-enjeux-ird-view-chercheur.component.html',
  styleUrls: ['./rencontre-media-enjeux-ird-view-chercheur.component.css']
})
export class RencontreMediaEnjeuxIrdViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreMediaEnjeuxIrdService: RencontreMediaEnjeuxIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreMediaService :RencontreMediaService
    ,private enjeuxIrdService :EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

hideViewDialog(){
    this.viewRencontreMediaEnjeuxIrdDialog  = false;
}

// getters and setters

get rencontreMediaEnjeuxIrds(): Array<RencontreMediaEnjeuxIrdVo> {
    return this.rencontreMediaEnjeuxIrdService.rencontreMediaEnjeuxIrds;
       }
set rencontreMediaEnjeuxIrds(value: Array<RencontreMediaEnjeuxIrdVo>) {
        this.rencontreMediaEnjeuxIrdService.rencontreMediaEnjeuxIrds = value;
       }

 get selectedRencontreMediaEnjeuxIrd():RencontreMediaEnjeuxIrdVo {
           return this.rencontreMediaEnjeuxIrdService.selectedRencontreMediaEnjeuxIrd;
       }
    set selectedRencontreMediaEnjeuxIrd(value: RencontreMediaEnjeuxIrdVo) {
        this.rencontreMediaEnjeuxIrdService.selectedRencontreMediaEnjeuxIrd = value;
       }

   get viewRencontreMediaEnjeuxIrdDialog():boolean {
           return this.rencontreMediaEnjeuxIrdService.viewRencontreMediaEnjeuxIrdDialog;

       }
    set viewRencontreMediaEnjeuxIrdDialog(value: boolean) {
        this.rencontreMediaEnjeuxIrdService.viewRencontreMediaEnjeuxIrdDialog= value;
       }

       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
       }
       get selectedRencontreMedia():RencontreMediaVo {
           return this.rencontreMediaService.selectedRencontreMedia;
       }
      set selectedRencontreMedia(value: RencontreMediaVo) {
        this.rencontreMediaService.selectedRencontreMedia = value;
       }
       get rencontreMedias():Array<RencontreMediaVo> {
           return this.rencontreMediaService.rencontreMedias;
       }
       set rencontreMedias(value: Array<RencontreMediaVo>) {
        this.rencontreMediaService.rencontreMedias = value;
       }
       get editRencontreMediaDialog():boolean {
           return this.rencontreMediaService.editRencontreMediaDialog;
       }
      set editRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.editRencontreMediaDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
