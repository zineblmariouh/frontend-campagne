import {Component, OnInit} from '@angular/core';
import {FinancementDoctorantService} from '../../../../../controller/service/FinancementDoctorant.service';
import {FinancementDoctorantVo} from '../../../../../controller/model/FinancementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-financement-doctorant-edit-chercheur',
  templateUrl: './financement-doctorant-edit-chercheur.component.html',
  styleUrls: ['./financement-doctorant-edit-chercheur.component.css']
})
export class FinancementDoctorantEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private financementDoctorantService: FinancementDoctorantService
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
            this.selectedFinancementDoctorant.dateArchivage = DateUtils.toDate(this.selectedFinancementDoctorant.dateArchivage);
            this.selectedFinancementDoctorant.dateCreation = DateUtils.toDate(this.selectedFinancementDoctorant.dateCreation);
    this.financementDoctorantService.edit().subscribe(financementDoctorant=>{
    const myIndex = this.financementDoctorants.findIndex(e => e.id === this.selectedFinancementDoctorant.id);
    this.financementDoctorants[myIndex] = this.selectedFinancementDoctorant;
    this.editFinancementDoctorantDialog = false;
    this.selectedFinancementDoctorant = new FinancementDoctorantVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editFinancementDoctorantDialog  = false;
}

// getters and setters

get financementDoctorants(): Array<FinancementDoctorantVo> {
    return this.financementDoctorantService.financementDoctorants;
       }
set financementDoctorants(value: Array<FinancementDoctorantVo>) {
        this.financementDoctorantService.financementDoctorants = value;
       }

 get selectedFinancementDoctorant(): FinancementDoctorantVo {
           return this.financementDoctorantService.selectedFinancementDoctorant;
       }
    set selectedFinancementDoctorant(value: FinancementDoctorantVo) {
        this.financementDoctorantService.selectedFinancementDoctorant = value;
       }

   get editFinancementDoctorantDialog(): boolean {
           return this.financementDoctorantService.editFinancementDoctorantDialog;

       }
    set editFinancementDoctorantDialog(value: boolean) {
        this.financementDoctorantService.editFinancementDoctorantDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
