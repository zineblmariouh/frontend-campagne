import {Component, OnInit} from '@angular/core';
import {NatureEnseignementService} from '../../../../../controller/service/NatureEnseignement.service';
import {NatureEnseignementVo} from '../../../../../controller/model/NatureEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-nature-enseignement-edit-chercheur',
  templateUrl: './nature-enseignement-edit-chercheur.component.html',
  styleUrls: ['./nature-enseignement-edit-chercheur.component.css']
})
export class NatureEnseignementEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private natureEnseignementService: NatureEnseignementService
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
            this.selectedNatureEnseignement.dateArchivage = DateUtils.toDate(this.selectedNatureEnseignement.dateArchivage);
            this.selectedNatureEnseignement.dateCreation = DateUtils.toDate(this.selectedNatureEnseignement.dateCreation);
    this.natureEnseignementService.edit().subscribe(natureEnseignement=>{
    const myIndex = this.natureEnseignements.findIndex(e => e.id === this.selectedNatureEnseignement.id);
    this.natureEnseignements[myIndex] = this.selectedNatureEnseignement;
    this.editNatureEnseignementDialog = false;
    this.selectedNatureEnseignement = new NatureEnseignementVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editNatureEnseignementDialog  = false;
}

// getters and setters

get natureEnseignements(): Array<NatureEnseignementVo> {
    return this.natureEnseignementService.natureEnseignements;
       }
set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
       }

 get selectedNatureEnseignement(): NatureEnseignementVo {
           return this.natureEnseignementService.selectedNatureEnseignement;
       }
    set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
       }

   get editNatureEnseignementDialog(): boolean {
           return this.natureEnseignementService.editNatureEnseignementDialog;

       }
    set editNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.editNatureEnseignementDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
