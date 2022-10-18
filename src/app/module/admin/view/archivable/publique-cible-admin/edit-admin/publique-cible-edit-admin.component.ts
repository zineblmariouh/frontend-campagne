import {Component, OnInit} from '@angular/core';
import {PubliqueCibleService} from '../../../../../controller/service/PubliqueCible.service';
import {PubliqueCibleVo} from '../../../../../controller/model/PubliqueCible.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-publique-cible-edit-admin',
  templateUrl: './publique-cible-edit-admin.component.html',
  styleUrls: ['./publique-cible-edit-admin.component.css']
})
export class PubliqueCibleEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private publiqueCibleService: PubliqueCibleService
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
            this.selectedPubliqueCible.dateArchivage = DateUtils.toDate(this.selectedPubliqueCible.dateArchivage);
            this.selectedPubliqueCible.dateCreation = DateUtils.toDate(this.selectedPubliqueCible.dateCreation);
    this.publiqueCibleService.edit().subscribe(publiqueCible=>{
    const myIndex = this.publiqueCibles.findIndex(e => e.id === this.selectedPubliqueCible.id);
    this.publiqueCibles[myIndex] = this.selectedPubliqueCible;
    this.editPubliqueCibleDialog = false;
    this.selectedPubliqueCible = new PubliqueCibleVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editPubliqueCibleDialog  = false;
}

// getters and setters

get publiqueCibles(): Array<PubliqueCibleVo> {
    return this.publiqueCibleService.publiqueCibles;
       }
set publiqueCibles(value: Array<PubliqueCibleVo>) {
        this.publiqueCibleService.publiqueCibles = value;
       }

 get selectedPubliqueCible(): PubliqueCibleVo {
           return this.publiqueCibleService.selectedPubliqueCible;
       }
    set selectedPubliqueCible(value: PubliqueCibleVo) {
        this.publiqueCibleService.selectedPubliqueCible = value;
       }

   get editPubliqueCibleDialog(): boolean {
           return this.publiqueCibleService.editPubliqueCibleDialog;

       }
    set editPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.editPubliqueCibleDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
