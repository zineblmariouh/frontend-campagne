import {Component, OnInit} from '@angular/core';
import {AffectationStructurelleService} from '../../../../../controller/service/AffectationStructurelle.service';
import {AffectationStructurelleVo} from '../../../../../controller/model/AffectationStructurelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-affectation-structurelle-edit-admin',
  templateUrl: './affectation-structurelle-edit-admin.component.html',
  styleUrls: ['./affectation-structurelle-edit-admin.component.css']
})
export class AffectationStructurelleEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private affectationStructurelleService: AffectationStructurelleService
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
    this.affectationStructurelleService.edit().subscribe(affectationStructurelle=>{
    const myIndex = this.affectationStructurelles.findIndex(e => e.id === this.selectedAffectationStructurelle.id);
    this.affectationStructurelles[myIndex] = this.selectedAffectationStructurelle;
    this.editAffectationStructurelleDialog = false;
    this.selectedAffectationStructurelle = new AffectationStructurelleVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editAffectationStructurelleDialog  = false;
}

// getters and setters

get affectationStructurelles(): Array<AffectationStructurelleVo> {
    return this.affectationStructurelleService.affectationStructurelles;
       }
set affectationStructurelles(value: Array<AffectationStructurelleVo>) {
        this.affectationStructurelleService.affectationStructurelles = value;
       }

 get selectedAffectationStructurelle(): AffectationStructurelleVo {
           return this.affectationStructurelleService.selectedAffectationStructurelle;
       }
    set selectedAffectationStructurelle(value: AffectationStructurelleVo) {
        this.affectationStructurelleService.selectedAffectationStructurelle = value;
       }

   get editAffectationStructurelleDialog(): boolean {
           return this.affectationStructurelleService.editAffectationStructurelleDialog;

       }
    set editAffectationStructurelleDialog(value: boolean) {
        this.affectationStructurelleService.editAffectationStructurelleDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
