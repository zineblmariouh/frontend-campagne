import {Component, OnInit} from '@angular/core';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-pays-edit-admin',
  templateUrl: './pays-edit-admin.component.html',
  styleUrls: ['./pays-edit-admin.component.css']
})
export class PaysEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysService: PaysService
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
            this.selectedPays.dateArchivage = DateUtils.toDate(this.selectedPays.dateArchivage);
            this.selectedPays.dateCreation = DateUtils.toDate(this.selectedPays.dateCreation);
    this.paysService.edit().subscribe(pays=>{
    const myIndex = this.payss.findIndex(e => e.id === this.selectedPays.id);
    this.payss[myIndex] = this.selectedPays;
    this.editPaysDialog = false;
    this.selectedPays = new PaysVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editPaysDialog  = false;
}

// getters and setters

get payss(): Array<PaysVo> {
    return this.paysService.payss;
       }
set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }

 get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
    set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }

   get editPaysDialog(): boolean {
           return this.paysService.editPaysDialog;

       }
    set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
