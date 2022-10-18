import {Component, OnInit} from '@angular/core';
import {PaysRencontreMediaService} from '../../../../../controller/service/PaysRencontreMedia.service';
import {PaysRencontreMediaVo} from '../../../../../controller/model/PaysRencontreMedia.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-pays-rencontre-media-view-admin',
  templateUrl: './pays-rencontre-media-view-admin.component.html',
  styleUrls: ['./pays-rencontre-media-view-admin.component.css']
})
export class PaysRencontreMediaViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysRencontreMediaService: PaysRencontreMediaService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreMediaService :RencontreMediaService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
}

hideViewDialog(){
    this.viewPaysRencontreMediaDialog  = false;
}

// getters and setters

get paysRencontreMedias(): Array<PaysRencontreMediaVo> {
    return this.paysRencontreMediaService.paysRencontreMedias;
       }
set paysRencontreMedias(value: Array<PaysRencontreMediaVo>) {
        this.paysRencontreMediaService.paysRencontreMedias = value;
       }

 get selectedPaysRencontreMedia():PaysRencontreMediaVo {
           return this.paysRencontreMediaService.selectedPaysRencontreMedia;
       }
    set selectedPaysRencontreMedia(value: PaysRencontreMediaVo) {
        this.paysRencontreMediaService.selectedPaysRencontreMedia = value;
       }

   get viewPaysRencontreMediaDialog():boolean {
           return this.paysRencontreMediaService.viewPaysRencontreMediaDialog;

       }
    set viewPaysRencontreMediaDialog(value: boolean) {
        this.paysRencontreMediaService.viewPaysRencontreMediaDialog= value;
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
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
