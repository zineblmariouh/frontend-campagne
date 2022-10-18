import {Component, OnInit} from '@angular/core';
import {RencontreMediaPeriodeService} from '../../../../../controller/service/RencontreMediaPeriode.service';
import {RencontreMediaPeriodeVo} from '../../../../../controller/model/RencontreMediaPeriode.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';

@Component({
  selector: 'app-rencontre-media-periode-view-chercheur',
  templateUrl: './rencontre-media-periode-view-chercheur.component.html',
  styleUrls: ['./rencontre-media-periode-view-chercheur.component.css']
})
export class RencontreMediaPeriodeViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreMediaPeriodeService: RencontreMediaPeriodeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreMediaService :RencontreMediaService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
}

hideViewDialog(){
    this.viewRencontreMediaPeriodeDialog  = false;
}

// getters and setters

get rencontreMediaPeriodes(): Array<RencontreMediaPeriodeVo> {
    return this.rencontreMediaPeriodeService.rencontreMediaPeriodes;
       }
set rencontreMediaPeriodes(value: Array<RencontreMediaPeriodeVo>) {
        this.rencontreMediaPeriodeService.rencontreMediaPeriodes = value;
       }

 get selectedRencontreMediaPeriode():RencontreMediaPeriodeVo {
           return this.rencontreMediaPeriodeService.selectedRencontreMediaPeriode;
       }
    set selectedRencontreMediaPeriode(value: RencontreMediaPeriodeVo) {
        this.rencontreMediaPeriodeService.selectedRencontreMediaPeriode = value;
       }

   get viewRencontreMediaPeriodeDialog():boolean {
           return this.rencontreMediaPeriodeService.viewRencontreMediaPeriodeDialog;

       }
    set viewRencontreMediaPeriodeDialog(value: boolean) {
        this.rencontreMediaPeriodeService.viewRencontreMediaPeriodeDialog= value;
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
