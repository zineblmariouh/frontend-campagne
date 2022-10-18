import {Component, OnInit} from '@angular/core';
import {TemplateRappelService} from '../../../../../controller/service/TemplateRappel.service';
import {TemplateRappelVo} from '../../../../../controller/model/TemplateRappel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-template-rappel-edit-admin',
  templateUrl: './template-rappel-edit-admin.component.html',
  styleUrls: ['./template-rappel-edit-admin.component.css']
})
export class TemplateRappelEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateRappelService: TemplateRappelService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedTemplateRappel.dateArchivage = DateUtils.toDate(this.selectedTemplateRappel.dateArchivage);
            this.selectedTemplateRappel.dateCreation = DateUtils.toDate(this.selectedTemplateRappel.dateCreation);
    this.templateRappelService.edit().subscribe(templateRappel=>{
    const myIndex = this.templateRappels.findIndex(e => e.id === this.selectedTemplateRappel.id);
    this.templateRappels[myIndex] = this.selectedTemplateRappel;
    this.editTemplateRappelDialog = false;
    this.selectedTemplateRappel = new TemplateRappelVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTemplateRappelDialog  = false;
}

// getters and setters

get templateRappels(): Array<TemplateRappelVo> {
    return this.templateRappelService.templateRappels;
       }
set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
       }

 get selectedTemplateRappel(): TemplateRappelVo {
           return this.templateRappelService.selectedTemplateRappel;
       }
    set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
       }

   get editTemplateRappelDialog(): boolean {
           return this.templateRappelService.editTemplateRappelDialog;

       }
    set editTemplateRappelDialog(value: boolean) {
        this.templateRappelService.editTemplateRappelDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
