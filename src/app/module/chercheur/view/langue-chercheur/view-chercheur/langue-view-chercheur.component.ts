import {Component, OnInit} from '@angular/core';
import {LangueService} from '../../../../../controller/service/Langue.service';
import {LangueVo} from '../../../../../controller/model/Langue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-langue-view-chercheur',
  templateUrl: './langue-view-chercheur.component.html',
  styleUrls: ['./langue-view-chercheur.component.css']
})
export class LangueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private langueService: LangueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewLangueDialog  = false;
}

// getters and setters

get langues(): Array<LangueVo> {
    return this.langueService.langues;
       }
set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }

 get selectedLangue():LangueVo {
           return this.langueService.selectedLangue;
       }
    set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }

   get viewLangueDialog():boolean {
           return this.langueService.viewLangueDialog;

       }
    set viewLangueDialog(value: boolean) {
        this.langueService.viewLangueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
