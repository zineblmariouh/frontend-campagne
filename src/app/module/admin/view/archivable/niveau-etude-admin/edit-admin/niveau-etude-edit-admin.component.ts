import {Component, OnInit} from '@angular/core';
import {NiveauEtudeService} from '../../../../../controller/service/NiveauEtude.service';
import {NiveauEtudeVo} from '../../../../../controller/model/NiveauEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-niveau-etude-edit-admin',
  templateUrl: './niveau-etude-edit-admin.component.html',
  styleUrls: ['./niveau-etude-edit-admin.component.css']
})
export class NiveauEtudeEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private niveauEtudeService: NiveauEtudeService
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
            this.selectedNiveauEtude.dateArchivage = DateUtils.toDate(this.selectedNiveauEtude.dateArchivage);
            this.selectedNiveauEtude.dateCreation = DateUtils.toDate(this.selectedNiveauEtude.dateCreation);
    this.niveauEtudeService.edit().subscribe(niveauEtude=>{
    const myIndex = this.niveauEtudes.findIndex(e => e.id === this.selectedNiveauEtude.id);
    this.niveauEtudes[myIndex] = this.selectedNiveauEtude;
    this.editNiveauEtudeDialog = false;
    this.selectedNiveauEtude = new NiveauEtudeVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editNiveauEtudeDialog  = false;
}

// getters and setters

get niveauEtudes(): Array<NiveauEtudeVo> {
    return this.niveauEtudeService.niveauEtudes;
       }
set niveauEtudes(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudes = value;
       }

 get selectedNiveauEtude(): NiveauEtudeVo {
           return this.niveauEtudeService.selectedNiveauEtude;
       }
    set selectedNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.selectedNiveauEtude = value;
       }

   get editNiveauEtudeDialog(): boolean {
           return this.niveauEtudeService.editNiveauEtudeDialog;

       }
    set editNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.editNiveauEtudeDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
