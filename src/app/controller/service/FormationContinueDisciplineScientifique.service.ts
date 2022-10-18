import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FormationContinueDisciplineScientifiqueVo} from '../model/FormationContinueDisciplineScientifique.model';
import {FormationContinueVo} from '../model/FormationContinue.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class FormationContinueDisciplineScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/formationContinueDisciplineScientifique/';
        })
    }
     private _formationContinueDisciplineScientifiques: Array<FormationContinueDisciplineScientifiqueVo> ;
     private _selectedFormationContinueDisciplineScientifique: FormationContinueDisciplineScientifiqueVo;
     private _formationContinueDisciplineScientifiqueSelections: Array<FormationContinueDisciplineScientifiqueVo>;
     private _createFormationContinueDisciplineScientifiqueDialog: boolean;
     private _editFormationContinueDisciplineScientifiqueDialog: boolean;
     private _viewFormationContinueDisciplineScientifiqueDialog: boolean;
     public editFormationContinueDisciplineScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFormationContinueDisciplineScientifique:FormationContinueDisciplineScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<FormationContinueDisciplineScientifiqueVo>>(this.API);
    }

    public save(): Observable<FormationContinueDisciplineScientifiqueVo> {
         return this.http.post<FormationContinueDisciplineScientifiqueVo>(this.API, this.selectedFormationContinueDisciplineScientifique);
    }

    delete(formationContinueDisciplineScientifique: FormationContinueDisciplineScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + formationContinueDisciplineScientifique.id);
    }


    public edit(): Observable<FormationContinueDisciplineScientifiqueVo> {
        return this.http.put<FormationContinueDisciplineScientifiqueVo>(this.API, this.selectedFormationContinueDisciplineScientifique);
    }


     public findByCriteria(formationContinueDisciplineScientifique:FormationContinueDisciplineScientifiqueVo):Observable<Array<FormationContinueDisciplineScientifiqueVo>>{
           return this.http.post<Array<FormationContinueDisciplineScientifiqueVo>>(this.API +'search', formationContinueDisciplineScientifique);
    }

   public findByIdWithAssociatedList(formationContinueDisciplineScientifique:FormationContinueDisciplineScientifiqueVo):Observable<FormationContinueDisciplineScientifiqueVo>{
         return this.http.get<FormationContinueDisciplineScientifiqueVo>(this.API + 'detail/id/' +formationContinueDisciplineScientifique.id);
    }

    // getters and setters


    get formationContinueDisciplineScientifiques(): Array<FormationContinueDisciplineScientifiqueVo> {
    if(this._formationContinueDisciplineScientifiques==null){
    this._formationContinueDisciplineScientifiques=new Array<FormationContinueDisciplineScientifiqueVo>();
    }
return this._formationContinueDisciplineScientifiques;
       }

    set formationContinueDisciplineScientifiques(value: Array<FormationContinueDisciplineScientifiqueVo>) {
        this._formationContinueDisciplineScientifiques = value;
       }

    get selectedFormationContinueDisciplineScientifique(): FormationContinueDisciplineScientifiqueVo {
    if(this._selectedFormationContinueDisciplineScientifique==null){
    this._selectedFormationContinueDisciplineScientifique=new FormationContinueDisciplineScientifiqueVo();
    }
           return this._selectedFormationContinueDisciplineScientifique;
       }

    set selectedFormationContinueDisciplineScientifique(value: FormationContinueDisciplineScientifiqueVo) {
        this._selectedFormationContinueDisciplineScientifique = value;
       }

    get formationContinueDisciplineScientifiqueSelections(): Array<FormationContinueDisciplineScientifiqueVo> {
    if(this._formationContinueDisciplineScientifiqueSelections==null){
    this._formationContinueDisciplineScientifiqueSelections=new Array<FormationContinueDisciplineScientifiqueVo>();
    }
        return this._formationContinueDisciplineScientifiqueSelections;
       }


    set formationContinueDisciplineScientifiqueSelections(value: Array<FormationContinueDisciplineScientifiqueVo>) {
        this._formationContinueDisciplineScientifiqueSelections = value;
       }

    get createFormationContinueDisciplineScientifiqueDialog(): boolean {
        return this._createFormationContinueDisciplineScientifiqueDialog;
       }

    set createFormationContinueDisciplineScientifiqueDialog(value: boolean) {
        this._createFormationContinueDisciplineScientifiqueDialog = value;
       }

    get editFormationContinueDisciplineScientifiqueDialog(): boolean {
        return this._editFormationContinueDisciplineScientifiqueDialog;
       }

    set editFormationContinueDisciplineScientifiqueDialog(value: boolean) {
        this._editFormationContinueDisciplineScientifiqueDialog = value;
       }

    get viewFormationContinueDisciplineScientifiqueDialog(): boolean {
        return this._viewFormationContinueDisciplineScientifiqueDialog;
       }

    set viewFormationContinueDisciplineScientifiqueDialog(value: boolean) {
        this._viewFormationContinueDisciplineScientifiqueDialog = value;
       }

     get searchFormationContinueDisciplineScientifique(): FormationContinueDisciplineScientifiqueVo {
     if(this._searchFormationContinueDisciplineScientifique==null){
    this._searchFormationContinueDisciplineScientifique=new FormationContinueDisciplineScientifiqueVo();
    }
        return this._searchFormationContinueDisciplineScientifique;
    }

    set searchFormationContinueDisciplineScientifique(value: FormationContinueDisciplineScientifiqueVo) {
        this._searchFormationContinueDisciplineScientifique = value;
       }

}
