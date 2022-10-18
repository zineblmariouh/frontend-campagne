import {Component, OnInit} from '@angular/core';
import {NiveauFormationPostBacService} from '../../../../../controller/service/NiveauFormationPostBac.service';
import {NiveauFormationPostBacVo} from '../../../../../controller/model/NiveauFormationPostBac.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-niveau-formation-post-bac-edit-chercheur',
  templateUrl: './niveau-formation-post-bac-edit-chercheur.component.html',
  styleUrls: ['./niveau-formation-post-bac-edit-chercheur.component.css']
})
export class NiveauFormationPostBacEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private niveauFormationPostBacService: NiveauFormationPostBacService
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
            this.selectedNiveauFormationPostBac.dateArchivage = DateUtils.toDate(this.selectedNiveauFormationPostBac.dateArchivage);
            this.selectedNiveauFormationPostBac.dateCreation = DateUtils.toDate(this.selectedNiveauFormationPostBac.dateCreation);
    this.niveauFormationPostBacService.edit().subscribe(niveauFormationPostBac=>{
    const myIndex = this.niveauFormationPostBacs.findIndex(e => e.id === this.selectedNiveauFormationPostBac.id);
    this.niveauFormationPostBacs[myIndex] = this.selectedNiveauFormationPostBac;
    this.editNiveauFormationPostBacDialog = false;
    this.selectedNiveauFormationPostBac = new NiveauFormationPostBacVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editNiveauFormationPostBacDialog  = false;
}

// getters and setters

get niveauFormationPostBacs(): Array<NiveauFormationPostBacVo> {
    return this.niveauFormationPostBacService.niveauFormationPostBacs;
       }
set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacs = value;
       }

 get selectedNiveauFormationPostBac(): NiveauFormationPostBacVo {
           return this.niveauFormationPostBacService.selectedNiveauFormationPostBac;
       }
    set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.selectedNiveauFormationPostBac = value;
       }

   get editNiveauFormationPostBacDialog(): boolean {
           return this.niveauFormationPostBacService.editNiveauFormationPostBacDialog;

       }
    set editNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.editNiveauFormationPostBacDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
