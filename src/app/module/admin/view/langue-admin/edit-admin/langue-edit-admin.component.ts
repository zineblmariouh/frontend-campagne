import {Component, OnInit} from '@angular/core';
import {LangueService} from '../../../../../controller/service/Langue.service';
import {LangueVo} from '../../../../../controller/model/Langue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-langue-edit-admin',
  templateUrl: './langue-edit-admin.component.html',
  styleUrls: ['./langue-edit-admin.component.css']
})
export class LangueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private langueService: LangueService
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
    this.langueService.edit().subscribe(langue=>{
    const myIndex = this.langues.findIndex(e => e.id === this.selectedLangue.id);
    this.langues[myIndex] = this.selectedLangue;
    this.editLangueDialog = false;
    this.selectedLangue = new LangueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editLangueDialog  = false;
}

// getters and setters

get langues(): Array<LangueVo> {
    return this.langueService.langues;
       }
set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }

 get selectedLangue(): LangueVo {
           return this.langueService.selectedLangue;
       }
    set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }

   get editLangueDialog(): boolean {
           return this.langueService.editLangueDialog;

       }
    set editLangueDialog(value: boolean) {
        this.langueService.editLangueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
