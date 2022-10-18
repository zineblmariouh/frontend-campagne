import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueErcService} from '../../../../../controller/service/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcVo} from '../../../../../controller/model/DisciplineScientifiqueErc.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {KeyWordDisciplineScientifiqueErcVo} from '../../../../../controller/model/KeyWordDisciplineScientifiqueErc.model';
import {KeyWordDisciplineScientifiqueErcService} from '../../../../../controller/service/KeyWordDisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcParentVo} from '../../../../../controller/model/DisciplineScientifiqueErcParent.model';
import {DisciplineScientifiqueErcParentService} from '../../../../../controller/service/DisciplineScientifiqueErcParent.service';
import {KeyWordVo} from '../../../../../controller/model/KeyWord.model';
import {KeyWordService} from '../../../../../controller/service/KeyWord.service';

@Component({
  selector: 'app-discipline-scientifique-erc-edit-chercheur',
  templateUrl: './discipline-scientifique-erc-edit-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-erc-edit-chercheur.component.css']
})
export class DisciplineScientifiqueErcEditChercheurComponent implements OnInit {

        selectedKeyWordDisciplineScientifiqueErcs: KeyWordDisciplineScientifiqueErcVo = new KeyWordDisciplineScientifiqueErcVo();
        keyWordDisciplineScientifiqueErcsListe: Array<KeyWordDisciplineScientifiqueErcVo> = [];

        myKeyWords: Array<KeyWordVo> = [];


constructor(private datePipe: DatePipe, private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private keyWordDisciplineScientifiqueErcService: KeyWordDisciplineScientifiqueErcService
 ,       private disciplineScientifiqueErcParentService: DisciplineScientifiqueErcParentService
 ,       private keyWordService: KeyWordService
) {
}

// methods
ngOnInit(): void {
                this.selectedKeyWordDisciplineScientifiqueErcs.keyWordVo = new KeyWordVo();
                this.keyWordService.findAll().subscribe((data) => this.keyWords = data);
    this.selectedDisciplineScientifiqueErcParent = new DisciplineScientifiqueErcParentVo();
    this.disciplineScientifiqueErcParentService.findAll().subscribe((data) => this.disciplineScientifiqueErcParents = data);
}
        addKeyWordDisciplineScientifiqueErcs() {
        if( this.selectedDisciplineScientifiqueErc.keyWordDisciplineScientifiqueErcsVo == null ){
            this.selectedDisciplineScientifiqueErc.keyWordDisciplineScientifiqueErcsVo = new Array<KeyWordDisciplineScientifiqueErcVo>();
        }
        this.selectedDisciplineScientifiqueErc.keyWordDisciplineScientifiqueErcsVo.push(this.selectedKeyWordDisciplineScientifiqueErcs);
        this.selectedKeyWordDisciplineScientifiqueErcs = new KeyWordDisciplineScientifiqueErcVo();
        }

       deleteKeyWordDisciplineScientifiqueErcs(p: KeyWordDisciplineScientifiqueErcVo) {
        this.selectedDisciplineScientifiqueErc.keyWordDisciplineScientifiqueErcsVo.forEach((element, index) => {
            if (element === p) { this.selectedDisciplineScientifiqueErc.keyWordDisciplineScientifiqueErcsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedDisciplineScientifiqueErc.dateArchivage = DateUtils.toDate(this.selectedDisciplineScientifiqueErc.dateArchivage);
            this.selectedDisciplineScientifiqueErc.dateCreation = DateUtils.toDate(this.selectedDisciplineScientifiqueErc.dateCreation);
    this.disciplineScientifiqueErcService.edit().subscribe(disciplineScientifiqueErc=>{
    const myIndex = this.disciplineScientifiqueErcs.findIndex(e => e.id === this.selectedDisciplineScientifiqueErc.id);
    this.disciplineScientifiqueErcs[myIndex] = this.selectedDisciplineScientifiqueErc;
    this.editDisciplineScientifiqueErcDialog = false;
    this.selectedDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatedisciplineScientifiqueErcParent(disciplineScientifiqueErcParent: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErcParent', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifiqueErcParent = new DisciplineScientifiqueErcParentVo();
        this.createDisciplineScientifiqueErcParentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatekeyWord(keyWord: string) {
                      const isPermistted = await this.roleService.isPermitted('KeyWord', 'add');
                       if(isPermistted){
         this.selectedKeyWord = new KeyWordVo();
        this.createKeyWordDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDisciplineScientifiqueErcDialog  = false;
}

// getters and setters

get disciplineScientifiqueErcs(): Array<DisciplineScientifiqueErcVo> {
    return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
       }
set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
       }

 get selectedDisciplineScientifiqueErc(): DisciplineScientifiqueErcVo {
           return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
       }
    set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
       }

   get editDisciplineScientifiqueErcDialog(): boolean {
           return this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog;

       }
    set editDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog = value;
       }

       get selectedDisciplineScientifiqueErcParent(): DisciplineScientifiqueErcParentVo {
           return this.disciplineScientifiqueErcParentService.selectedDisciplineScientifiqueErcParent;
       }
      set selectedDisciplineScientifiqueErcParent(value: DisciplineScientifiqueErcParentVo) {
        this.disciplineScientifiqueErcParentService.selectedDisciplineScientifiqueErcParent = value;
       }
       get disciplineScientifiqueErcParents(): Array<DisciplineScientifiqueErcParentVo> {
           return this.disciplineScientifiqueErcParentService.disciplineScientifiqueErcParents;
       }
       set disciplineScientifiqueErcParents(value: Array<DisciplineScientifiqueErcParentVo>) {
        this.disciplineScientifiqueErcParentService.disciplineScientifiqueErcParents = value;
       }
       get createDisciplineScientifiqueErcParentDialog(): boolean {
           return this.disciplineScientifiqueErcParentService.createDisciplineScientifiqueErcParentDialog;
       }
      set createDisciplineScientifiqueErcParentDialog(value: boolean) {
        this.disciplineScientifiqueErcParentService.createDisciplineScientifiqueErcParentDialog= value;
       }
       get selectedKeyWord(): KeyWordVo {
           return this.keyWordService.selectedKeyWord;
       }
      set selectedKeyWord(value: KeyWordVo) {
        this.keyWordService.selectedKeyWord = value;
       }
       get keyWords(): Array<KeyWordVo> {
           return this.keyWordService.keyWords;
       }
       set keyWords(value: Array<KeyWordVo>) {
        this.keyWordService.keyWords = value;
       }
       get createKeyWordDialog(): boolean {
           return this.keyWordService.createKeyWordDialog;
       }
      set createKeyWordDialog(value: boolean) {
        this.keyWordService.createKeyWordDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
