import {Component, OnInit} from '@angular/core';
import {NationaliteService} from '../../../../../controller/service/Nationalite.service';
import {NationaliteVo} from '../../../../../controller/model/Nationalite.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-nationalite-view-admin',
  templateUrl: './nationalite-view-admin.component.html',
  styleUrls: ['./nationalite-view-admin.component.css']
})
export class NationaliteViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private nationaliteService: NationaliteService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewNationaliteDialog  = false;
}

// getters and setters

get nationalites(): Array<NationaliteVo> {
    return this.nationaliteService.nationalites;
       }
set nationalites(value: Array<NationaliteVo>) {
        this.nationaliteService.nationalites = value;
       }

 get selectedNationalite():NationaliteVo {
           return this.nationaliteService.selectedNationalite;
       }
    set selectedNationalite(value: NationaliteVo) {
        this.nationaliteService.selectedNationalite = value;
       }

   get viewNationaliteDialog():boolean {
           return this.nationaliteService.viewNationaliteDialog;

       }
    set viewNationaliteDialog(value: boolean) {
        this.nationaliteService.viewNationaliteDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
