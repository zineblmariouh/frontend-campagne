import {Component, OnInit} from '@angular/core';
import {NationaliteService} from '../../../../../controller/service/Nationalite.service';
import {NationaliteVo} from '../../../../../controller/model/Nationalite.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-nationalite-edit-admin',
  templateUrl: './nationalite-edit-admin.component.html',
  styleUrls: ['./nationalite-edit-admin.component.css']
})
export class NationaliteEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private nationaliteService: NationaliteService
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
            this.selectedNationalite.dateArchivage = DateUtils.toDate(this.selectedNationalite.dateArchivage);
            this.selectedNationalite.dateCreation = DateUtils.toDate(this.selectedNationalite.dateCreation);
    this.nationaliteService.edit().subscribe(nationalite=>{
    const myIndex = this.nationalites.findIndex(e => e.id === this.selectedNationalite.id);
    this.nationalites[myIndex] = this.selectedNationalite;
    this.editNationaliteDialog = false;
    this.selectedNationalite = new NationaliteVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editNationaliteDialog  = false;
}

// getters and setters

get nationalites(): Array<NationaliteVo> {
    return this.nationaliteService.nationalites;
       }
set nationalites(value: Array<NationaliteVo>) {
        this.nationaliteService.nationalites = value;
       }

 get selectedNationalite(): NationaliteVo {
           return this.nationaliteService.selectedNationalite;
       }
    set selectedNationalite(value: NationaliteVo) {
        this.nationaliteService.selectedNationalite = value;
       }

   get editNationaliteDialog(): boolean {
           return this.nationaliteService.editNationaliteDialog;

       }
    set editNationaliteDialog(value: boolean) {
        this.nationaliteService.editNationaliteDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
