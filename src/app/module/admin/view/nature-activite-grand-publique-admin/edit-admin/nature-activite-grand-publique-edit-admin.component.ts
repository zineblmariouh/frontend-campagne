import {Component, OnInit} from '@angular/core';
import {NatureActiviteGrandPubliqueService} from '../../../../../controller/service/NatureActiviteGrandPublique.service';
import {NatureActiviteGrandPubliqueVo} from '../../../../../controller/model/NatureActiviteGrandPublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-nature-activite-grand-publique-edit-admin',
  templateUrl: './nature-activite-grand-publique-edit-admin.component.html',
  styleUrls: ['./nature-activite-grand-publique-edit-admin.component.css']
})
export class NatureActiviteGrandPubliqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private natureActiviteGrandPubliqueService: NatureActiviteGrandPubliqueService
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
    this.natureActiviteGrandPubliqueService.edit().subscribe(natureActiviteGrandPublique=>{
    const myIndex = this.natureActiviteGrandPubliques.findIndex(e => e.id === this.selectedNatureActiviteGrandPublique.id);
    this.natureActiviteGrandPubliques[myIndex] = this.selectedNatureActiviteGrandPublique;
    this.editNatureActiviteGrandPubliqueDialog = false;
    this.selectedNatureActiviteGrandPublique = new NatureActiviteGrandPubliqueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editNatureActiviteGrandPubliqueDialog  = false;
}

// getters and setters

get natureActiviteGrandPubliques(): Array<NatureActiviteGrandPubliqueVo> {
    return this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques;
       }
set natureActiviteGrandPubliques(value: Array<NatureActiviteGrandPubliqueVo>) {
        this.natureActiviteGrandPubliqueService.natureActiviteGrandPubliques = value;
       }

 get selectedNatureActiviteGrandPublique(): NatureActiviteGrandPubliqueVo {
           return this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique;
       }
    set selectedNatureActiviteGrandPublique(value: NatureActiviteGrandPubliqueVo) {
        this.natureActiviteGrandPubliqueService.selectedNatureActiviteGrandPublique = value;
       }

   get editNatureActiviteGrandPubliqueDialog(): boolean {
           return this.natureActiviteGrandPubliqueService.editNatureActiviteGrandPubliqueDialog;

       }
    set editNatureActiviteGrandPubliqueDialog(value: boolean) {
        this.natureActiviteGrandPubliqueService.editNatureActiviteGrandPubliqueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
