import {Component, OnInit} from '@angular/core';
import {TypeEtudeService} from '../../../../../controller/service/TypeEtude.service';
import {TypeEtudeVo} from '../../../../../controller/model/TypeEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-etude-edit-admin',
  templateUrl: './type-etude-edit-admin.component.html',
  styleUrls: ['./type-etude-edit-admin.component.css']
})
export class TypeEtudeEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEtudeService: TypeEtudeService
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
            this.selectedTypeEtude.dateArchivage = DateUtils.toDate(this.selectedTypeEtude.dateArchivage);
            this.selectedTypeEtude.dateCreation = DateUtils.toDate(this.selectedTypeEtude.dateCreation);
    this.typeEtudeService.edit().subscribe(typeEtude=>{
    const myIndex = this.typeEtudes.findIndex(e => e.id === this.selectedTypeEtude.id);
    this.typeEtudes[myIndex] = this.selectedTypeEtude;
    this.editTypeEtudeDialog = false;
    this.selectedTypeEtude = new TypeEtudeVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeEtudeDialog  = false;
}

// getters and setters

get typeEtudes(): Array<TypeEtudeVo> {
    return this.typeEtudeService.typeEtudes;
       }
set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
       }

 get selectedTypeEtude(): TypeEtudeVo {
           return this.typeEtudeService.selectedTypeEtude;
       }
    set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
       }

   get editTypeEtudeDialog(): boolean {
           return this.typeEtudeService.editTypeEtudeDialog;

       }
    set editTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.editTypeEtudeDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
