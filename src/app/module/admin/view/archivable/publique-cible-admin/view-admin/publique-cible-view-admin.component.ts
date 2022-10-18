import {Component, OnInit} from '@angular/core';
import {PubliqueCibleService} from '../../../../../controller/service/PubliqueCible.service';
import {PubliqueCibleVo} from '../../../../../controller/model/PubliqueCible.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-publique-cible-view-admin',
  templateUrl: './publique-cible-view-admin.component.html',
  styleUrls: ['./publique-cible-view-admin.component.css']
})
export class PubliqueCibleViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private publiqueCibleService: PubliqueCibleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewPubliqueCibleDialog  = false;
}

// getters and setters

get publiqueCibles(): Array<PubliqueCibleVo> {
    return this.publiqueCibleService.publiqueCibles;
       }
set publiqueCibles(value: Array<PubliqueCibleVo>) {
        this.publiqueCibleService.publiqueCibles = value;
       }

 get selectedPubliqueCible():PubliqueCibleVo {
           return this.publiqueCibleService.selectedPubliqueCible;
       }
    set selectedPubliqueCible(value: PubliqueCibleVo) {
        this.publiqueCibleService.selectedPubliqueCible = value;
       }

   get viewPubliqueCibleDialog():boolean {
           return this.publiqueCibleService.viewPubliqueCibleDialog;

       }
    set viewPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.viewPubliqueCibleDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
