import {Component, OnInit} from '@angular/core';
import {TemplateOuvertureService} from '../../../../../controller/service/TemplateOuverture.service';
import {TemplateOuvertureVo} from '../../../../../controller/model/TemplateOuverture.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-template-ouverture-view-chercheur',
  templateUrl: './template-ouverture-view-chercheur.component.html',
  styleUrls: ['./template-ouverture-view-chercheur.component.css']
})
export class TemplateOuvertureViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateOuvertureService: TemplateOuvertureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateOuvertureDialog  = false;
}

// getters and setters

get templateOuvertures(): Array<TemplateOuvertureVo> {
    return this.templateOuvertureService.templateOuvertures;
       }
set templateOuvertures(value: Array<TemplateOuvertureVo>) {
        this.templateOuvertureService.templateOuvertures = value;
       }

 get selectedTemplateOuverture():TemplateOuvertureVo {
           return this.templateOuvertureService.selectedTemplateOuverture;
       }
    set selectedTemplateOuverture(value: TemplateOuvertureVo) {
        this.templateOuvertureService.selectedTemplateOuverture = value;
       }

   get viewTemplateOuvertureDialog():boolean {
           return this.templateOuvertureService.viewTemplateOuvertureDialog;

       }
    set viewTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.viewTemplateOuvertureDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
