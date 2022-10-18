import {Component, OnInit} from '@angular/core';
import {PubliqueFormationService} from '../../../../../controller/service/PubliqueFormation.service';
import {PubliqueFormationVo} from '../../../../../controller/model/PubliqueFormation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-publique-formation-edit-admin',
  templateUrl: './publique-formation-edit-admin.component.html',
  styleUrls: ['./publique-formation-edit-admin.component.css']
})
export class PubliqueFormationEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private publiqueFormationService: PubliqueFormationService
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
            this.selectedPubliqueFormation.dateArchivage = DateUtils.toDate(this.selectedPubliqueFormation.dateArchivage);
            this.selectedPubliqueFormation.dateCreation = DateUtils.toDate(this.selectedPubliqueFormation.dateCreation);
    this.publiqueFormationService.edit().subscribe(publiqueFormation=>{
    const myIndex = this.publiqueFormations.findIndex(e => e.id === this.selectedPubliqueFormation.id);
    this.publiqueFormations[myIndex] = this.selectedPubliqueFormation;
    this.editPubliqueFormationDialog = false;
    this.selectedPubliqueFormation = new PubliqueFormationVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editPubliqueFormationDialog  = false;
}

// getters and setters

get publiqueFormations(): Array<PubliqueFormationVo> {
    return this.publiqueFormationService.publiqueFormations;
       }
set publiqueFormations(value: Array<PubliqueFormationVo>) {
        this.publiqueFormationService.publiqueFormations = value;
       }

 get selectedPubliqueFormation(): PubliqueFormationVo {
           return this.publiqueFormationService.selectedPubliqueFormation;
       }
    set selectedPubliqueFormation(value: PubliqueFormationVo) {
        this.publiqueFormationService.selectedPubliqueFormation = value;
       }

   get editPubliqueFormationDialog(): boolean {
           return this.publiqueFormationService.editPubliqueFormationDialog;

       }
    set editPubliqueFormationDialog(value: boolean) {
        this.publiqueFormationService.editPubliqueFormationDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
