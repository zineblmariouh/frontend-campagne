import {Component, OnInit} from '@angular/core';
import {NatureEtudeService} from '../../../../../controller/service/NatureEtude.service';
import {NatureEtudeVo} from '../../../../../controller/model/NatureEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-nature-etude-edit-admin',
  templateUrl: './nature-etude-edit-admin.component.html',
  styleUrls: ['./nature-etude-edit-admin.component.css']
})
export class NatureEtudeEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private natureEtudeService: NatureEtudeService
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
            this.selectedNatureEtude.dateArchivage = DateUtils.toDate(this.selectedNatureEtude.dateArchivage);
            this.selectedNatureEtude.dateCreation = DateUtils.toDate(this.selectedNatureEtude.dateCreation);
    this.natureEtudeService.edit().subscribe(natureEtude=>{
    const myIndex = this.natureEtudes.findIndex(e => e.id === this.selectedNatureEtude.id);
    this.natureEtudes[myIndex] = this.selectedNatureEtude;
    this.editNatureEtudeDialog = false;
    this.selectedNatureEtude = new NatureEtudeVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editNatureEtudeDialog  = false;
}

// getters and setters

get natureEtudes(): Array<NatureEtudeVo> {
    return this.natureEtudeService.natureEtudes;
       }
set natureEtudes(value: Array<NatureEtudeVo>) {
        this.natureEtudeService.natureEtudes = value;
       }

 get selectedNatureEtude(): NatureEtudeVo {
           return this.natureEtudeService.selectedNatureEtude;
       }
    set selectedNatureEtude(value: NatureEtudeVo) {
        this.natureEtudeService.selectedNatureEtude = value;
       }

   get editNatureEtudeDialog(): boolean {
           return this.natureEtudeService.editNatureEtudeDialog;

       }
    set editNatureEtudeDialog(value: boolean) {
        this.natureEtudeService.editNatureEtudeDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
