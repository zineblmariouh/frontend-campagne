import {Component, OnInit} from '@angular/core';
import {CorpsService} from '../../../../../controller/service/Corps.service';
import {CorpsVo} from '../../../../../controller/model/Corps.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-corps-edit-chercheur',
  templateUrl: './corps-edit-chercheur.component.html',
  styleUrls: ['./corps-edit-chercheur.component.css']
})
export class CorpsEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private corpsService: CorpsService
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
            this.selectedCorps.dateArchivage = DateUtils.toDate(this.selectedCorps.dateArchivage);
            this.selectedCorps.dateCreation = DateUtils.toDate(this.selectedCorps.dateCreation);
    this.corpsService.edit().subscribe(corps=>{
    const myIndex = this.corpss.findIndex(e => e.id === this.selectedCorps.id);
    this.corpss[myIndex] = this.selectedCorps;
    this.editCorpsDialog = false;
    this.selectedCorps = new CorpsVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editCorpsDialog  = false;
}

// getters and setters

get corpss(): Array<CorpsVo> {
    return this.corpsService.corpss;
       }
set corpss(value: Array<CorpsVo>) {
        this.corpsService.corpss = value;
       }

 get selectedCorps(): CorpsVo {
           return this.corpsService.selectedCorps;
       }
    set selectedCorps(value: CorpsVo) {
        this.corpsService.selectedCorps = value;
       }

   get editCorpsDialog(): boolean {
           return this.corpsService.editCorpsDialog;

       }
    set editCorpsDialog(value: boolean) {
        this.corpsService.editCorpsDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
