import {Component, OnInit} from '@angular/core';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-nature-expertise-edit-chercheur',
  templateUrl: './nature-expertise-edit-chercheur.component.html',
  styleUrls: ['./nature-expertise-edit-chercheur.component.css']
})
export class NatureExpertiseEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private natureExpertiseService: NatureExpertiseService
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
            this.selectedNatureExpertise.dateArchivage = DateUtils.toDate(this.selectedNatureExpertise.dateArchivage);
            this.selectedNatureExpertise.dateCreation = DateUtils.toDate(this.selectedNatureExpertise.dateCreation);
    this.natureExpertiseService.edit().subscribe(natureExpertise=>{
    const myIndex = this.natureExpertises.findIndex(e => e.id === this.selectedNatureExpertise.id);
    this.natureExpertises[myIndex] = this.selectedNatureExpertise;
    this.editNatureExpertiseDialog = false;
    this.selectedNatureExpertise = new NatureExpertiseVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editNatureExpertiseDialog  = false;
}

// getters and setters

get natureExpertises(): Array<NatureExpertiseVo> {
    return this.natureExpertiseService.natureExpertises;
       }
set natureExpertises(value: Array<NatureExpertiseVo>) {
        this.natureExpertiseService.natureExpertises = value;
       }

 get selectedNatureExpertise(): NatureExpertiseVo {
           return this.natureExpertiseService.selectedNatureExpertise;
       }
    set selectedNatureExpertise(value: NatureExpertiseVo) {
        this.natureExpertiseService.selectedNatureExpertise = value;
       }

   get editNatureExpertiseDialog(): boolean {
           return this.natureExpertiseService.editNatureExpertiseDialog;

       }
    set editNatureExpertiseDialog(value: boolean) {
        this.natureExpertiseService.editNatureExpertiseDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
