import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DisciplineScientifiqueExpertiseScientifiqueVo} from '../model/DisciplineScientifiqueExpertiseScientifique.model';
import {ExpertiseScientifiqueVo} from '../model/ExpertiseScientifique.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class DisciplineScientifiqueExpertiseScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/disciplineScientifiqueExpertiseScientifique/';
        })
    }
     private _disciplineScientifiqueExpertiseScientifiques: Array<DisciplineScientifiqueExpertiseScientifiqueVo> ;
     private _selectedDisciplineScientifiqueExpertiseScientifique: DisciplineScientifiqueExpertiseScientifiqueVo;
     private _disciplineScientifiqueExpertiseScientifiqueSelections: Array<DisciplineScientifiqueExpertiseScientifiqueVo>;
     private _createDisciplineScientifiqueExpertiseScientifiqueDialog: boolean;
     private _editDisciplineScientifiqueExpertiseScientifiqueDialog: boolean;
     private _viewDisciplineScientifiqueExpertiseScientifiqueDialog: boolean;
     public editDisciplineScientifiqueExpertiseScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDisciplineScientifiqueExpertiseScientifique:DisciplineScientifiqueExpertiseScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DisciplineScientifiqueExpertiseScientifiqueVo>>(this.API);
    }

    public save(): Observable<DisciplineScientifiqueExpertiseScientifiqueVo> {
         return this.http.post<DisciplineScientifiqueExpertiseScientifiqueVo>(this.API, this.selectedDisciplineScientifiqueExpertiseScientifique);
    }

    delete(disciplineScientifiqueExpertiseScientifique: DisciplineScientifiqueExpertiseScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + disciplineScientifiqueExpertiseScientifique.id);
    }


    public edit(): Observable<DisciplineScientifiqueExpertiseScientifiqueVo> {
        return this.http.put<DisciplineScientifiqueExpertiseScientifiqueVo>(this.API, this.selectedDisciplineScientifiqueExpertiseScientifique);
    }


     public findByCriteria(disciplineScientifiqueExpertiseScientifique:DisciplineScientifiqueExpertiseScientifiqueVo):Observable<Array<DisciplineScientifiqueExpertiseScientifiqueVo>>{
           return this.http.post<Array<DisciplineScientifiqueExpertiseScientifiqueVo>>(this.API +'search', disciplineScientifiqueExpertiseScientifique);
    }

   public findByIdWithAssociatedList(disciplineScientifiqueExpertiseScientifique:DisciplineScientifiqueExpertiseScientifiqueVo):Observable<DisciplineScientifiqueExpertiseScientifiqueVo>{
         return this.http.get<DisciplineScientifiqueExpertiseScientifiqueVo>(this.API + 'detail/id/' +disciplineScientifiqueExpertiseScientifique.id);
    }

    // getters and setters


    get disciplineScientifiqueExpertiseScientifiques(): Array<DisciplineScientifiqueExpertiseScientifiqueVo> {
    if(this._disciplineScientifiqueExpertiseScientifiques==null){
    this._disciplineScientifiqueExpertiseScientifiques=new Array<DisciplineScientifiqueExpertiseScientifiqueVo>();
    }
return this._disciplineScientifiqueExpertiseScientifiques;
       }

    set disciplineScientifiqueExpertiseScientifiques(value: Array<DisciplineScientifiqueExpertiseScientifiqueVo>) {
        this._disciplineScientifiqueExpertiseScientifiques = value;
       }

    get selectedDisciplineScientifiqueExpertiseScientifique(): DisciplineScientifiqueExpertiseScientifiqueVo {
    if(this._selectedDisciplineScientifiqueExpertiseScientifique==null){
    this._selectedDisciplineScientifiqueExpertiseScientifique=new DisciplineScientifiqueExpertiseScientifiqueVo();
    }
           return this._selectedDisciplineScientifiqueExpertiseScientifique;
       }

    set selectedDisciplineScientifiqueExpertiseScientifique(value: DisciplineScientifiqueExpertiseScientifiqueVo) {
        this._selectedDisciplineScientifiqueExpertiseScientifique = value;
       }

    get disciplineScientifiqueExpertiseScientifiqueSelections(): Array<DisciplineScientifiqueExpertiseScientifiqueVo> {
    if(this._disciplineScientifiqueExpertiseScientifiqueSelections==null){
    this._disciplineScientifiqueExpertiseScientifiqueSelections=new Array<DisciplineScientifiqueExpertiseScientifiqueVo>();
    }
        return this._disciplineScientifiqueExpertiseScientifiqueSelections;
       }


    set disciplineScientifiqueExpertiseScientifiqueSelections(value: Array<DisciplineScientifiqueExpertiseScientifiqueVo>) {
        this._disciplineScientifiqueExpertiseScientifiqueSelections = value;
       }

    get createDisciplineScientifiqueExpertiseScientifiqueDialog(): boolean {
        return this._createDisciplineScientifiqueExpertiseScientifiqueDialog;
       }

    set createDisciplineScientifiqueExpertiseScientifiqueDialog(value: boolean) {
        this._createDisciplineScientifiqueExpertiseScientifiqueDialog = value;
       }

    get editDisciplineScientifiqueExpertiseScientifiqueDialog(): boolean {
        return this._editDisciplineScientifiqueExpertiseScientifiqueDialog;
       }

    set editDisciplineScientifiqueExpertiseScientifiqueDialog(value: boolean) {
        this._editDisciplineScientifiqueExpertiseScientifiqueDialog = value;
       }

    get viewDisciplineScientifiqueExpertiseScientifiqueDialog(): boolean {
        return this._viewDisciplineScientifiqueExpertiseScientifiqueDialog;
       }

    set viewDisciplineScientifiqueExpertiseScientifiqueDialog(value: boolean) {
        this._viewDisciplineScientifiqueExpertiseScientifiqueDialog = value;
       }

     get searchDisciplineScientifiqueExpertiseScientifique(): DisciplineScientifiqueExpertiseScientifiqueVo {
     if(this._searchDisciplineScientifiqueExpertiseScientifique==null){
    this._searchDisciplineScientifiqueExpertiseScientifique=new DisciplineScientifiqueExpertiseScientifiqueVo();
    }
        return this._searchDisciplineScientifiqueExpertiseScientifique;
    }

    set searchDisciplineScientifiqueExpertiseScientifique(value: DisciplineScientifiqueExpertiseScientifiqueVo) {
        this._searchDisciplineScientifiqueExpertiseScientifique = value;
       }

}
