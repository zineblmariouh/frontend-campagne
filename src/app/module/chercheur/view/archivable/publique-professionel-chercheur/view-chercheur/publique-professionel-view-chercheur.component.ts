import {Component, OnInit} from '@angular/core';
import {PubliqueProfessionelService} from '../../../../../controller/service/PubliqueProfessionel.service';
import {PubliqueProfessionelVo} from '../../../../../controller/model/PubliqueProfessionel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-publique-professionel-view-chercheur',
  templateUrl: './publique-professionel-view-chercheur.component.html',
  styleUrls: ['./publique-professionel-view-chercheur.component.css']
})
export class PubliqueProfessionelViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private publiqueProfessionelService: PubliqueProfessionelService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewPubliqueProfessionelDialog  = false;
}

// getters and setters

get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
    return this.publiqueProfessionelService.publiqueProfessionels;
       }
set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }

 get selectedPubliqueProfessionel():PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
    set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }

   get viewPubliqueProfessionelDialog():boolean {
           return this.publiqueProfessionelService.viewPubliqueProfessionelDialog;

       }
    set viewPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.viewPubliqueProfessionelDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
