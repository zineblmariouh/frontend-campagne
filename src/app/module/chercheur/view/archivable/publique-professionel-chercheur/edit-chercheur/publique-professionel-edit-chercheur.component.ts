import {Component, OnInit} from '@angular/core';
import {PubliqueProfessionelService} from '../../../../../controller/service/PubliqueProfessionel.service';
import {PubliqueProfessionelVo} from '../../../../../controller/model/PubliqueProfessionel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-publique-professionel-edit-chercheur',
  templateUrl: './publique-professionel-edit-chercheur.component.html',
  styleUrls: ['./publique-professionel-edit-chercheur.component.css']
})
export class PubliqueProfessionelEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private publiqueProfessionelService: PubliqueProfessionelService
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
            this.selectedPubliqueProfessionel.dateArchivage = DateUtils.toDate(this.selectedPubliqueProfessionel.dateArchivage);
            this.selectedPubliqueProfessionel.dateCreation = DateUtils.toDate(this.selectedPubliqueProfessionel.dateCreation);
    this.publiqueProfessionelService.edit().subscribe(publiqueProfessionel=>{
    const myIndex = this.publiqueProfessionels.findIndex(e => e.id === this.selectedPubliqueProfessionel.id);
    this.publiqueProfessionels[myIndex] = this.selectedPubliqueProfessionel;
    this.editPubliqueProfessionelDialog = false;
    this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editPubliqueProfessionelDialog  = false;
}

// getters and setters

get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
    return this.publiqueProfessionelService.publiqueProfessionels;
       }
set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }

 get selectedPubliqueProfessionel(): PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
    set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }

   get editPubliqueProfessionelDialog(): boolean {
           return this.publiqueProfessionelService.editPubliqueProfessionelDialog;

       }
    set editPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.editPubliqueProfessionelDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
