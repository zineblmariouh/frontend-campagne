import {Component, OnInit} from '@angular/core';
import {TemplateRappelService} from '../../../../../controller/service/TemplateRappel.service';
import {TemplateRappelVo} from '../../../../../controller/model/TemplateRappel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-template-rappel-view-chercheur',
  templateUrl: './template-rappel-view-chercheur.component.html',
  styleUrls: ['./template-rappel-view-chercheur.component.css']
})
export class TemplateRappelViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateRappelService: TemplateRappelService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateRappelDialog  = false;
}

// getters and setters

get templateRappels(): Array<TemplateRappelVo> {
    return this.templateRappelService.templateRappels;
       }
set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
       }

 get selectedTemplateRappel():TemplateRappelVo {
           return this.templateRappelService.selectedTemplateRappel;
       }
    set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
       }

   get viewTemplateRappelDialog():boolean {
           return this.templateRappelService.viewTemplateRappelDialog;

       }
    set viewTemplateRappelDialog(value: boolean) {
        this.templateRappelService.viewTemplateRappelDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
