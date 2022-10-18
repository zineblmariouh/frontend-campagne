import {Component, OnInit} from '@angular/core';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-nature-expertise-view-chercheur',
  templateUrl: './nature-expertise-view-chercheur.component.html',
  styleUrls: ['./nature-expertise-view-chercheur.component.css']
})
export class NatureExpertiseViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private natureExpertiseService: NatureExpertiseService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewNatureExpertiseDialog  = false;
}

// getters and setters

get natureExpertises(): Array<NatureExpertiseVo> {
    return this.natureExpertiseService.natureExpertises;
       }
set natureExpertises(value: Array<NatureExpertiseVo>) {
        this.natureExpertiseService.natureExpertises = value;
       }

 get selectedNatureExpertise():NatureExpertiseVo {
           return this.natureExpertiseService.selectedNatureExpertise;
       }
    set selectedNatureExpertise(value: NatureExpertiseVo) {
        this.natureExpertiseService.selectedNatureExpertise = value;
       }

   get viewNatureExpertiseDialog():boolean {
           return this.natureExpertiseService.viewNatureExpertiseDialog;

       }
    set viewNatureExpertiseDialog(value: boolean) {
        this.natureExpertiseService.viewNatureExpertiseDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
