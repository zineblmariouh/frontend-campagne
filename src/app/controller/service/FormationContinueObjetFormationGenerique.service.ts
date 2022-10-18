import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FormationContinueObjetFormationGeneriqueVo} from '../model/FormationContinueObjetFormationGenerique.model';
import {ObjetFormationGeneriqueVo} from '../model/ObjetFormationGenerique.model';
import {FormationContinueVo} from '../model/FormationContinue.model';


@Injectable({
  providedIn: 'root'
})
export class FormationContinueObjetFormationGeneriqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/formationContinueObjetFormationGenerique/';
        })
    }
     private _formationContinueObjetFormationGeneriques: Array<FormationContinueObjetFormationGeneriqueVo> ;
     private _selectedFormationContinueObjetFormationGenerique: FormationContinueObjetFormationGeneriqueVo;
     private _formationContinueObjetFormationGeneriqueSelections: Array<FormationContinueObjetFormationGeneriqueVo>;
     private _createFormationContinueObjetFormationGeneriqueDialog: boolean;
     private _editFormationContinueObjetFormationGeneriqueDialog: boolean;
     private _viewFormationContinueObjetFormationGeneriqueDialog: boolean;
     public editFormationContinueObjetFormationGenerique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFormationContinueObjetFormationGenerique:FormationContinueObjetFormationGeneriqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<FormationContinueObjetFormationGeneriqueVo>>(this.API);
    }

    public save(): Observable<FormationContinueObjetFormationGeneriqueVo> {
         return this.http.post<FormationContinueObjetFormationGeneriqueVo>(this.API, this.selectedFormationContinueObjetFormationGenerique);
    }

    delete(formationContinueObjetFormationGenerique: FormationContinueObjetFormationGeneriqueVo) {
         return this.http.delete<number>(this.API + 'id/' + formationContinueObjetFormationGenerique.id);
    }


    public edit(): Observable<FormationContinueObjetFormationGeneriqueVo> {
        return this.http.put<FormationContinueObjetFormationGeneriqueVo>(this.API, this.selectedFormationContinueObjetFormationGenerique);
    }


     public findByCriteria(formationContinueObjetFormationGenerique:FormationContinueObjetFormationGeneriqueVo):Observable<Array<FormationContinueObjetFormationGeneriqueVo>>{
           return this.http.post<Array<FormationContinueObjetFormationGeneriqueVo>>(this.API +'search', formationContinueObjetFormationGenerique);
    }

   public findByIdWithAssociatedList(formationContinueObjetFormationGenerique:FormationContinueObjetFormationGeneriqueVo):Observable<FormationContinueObjetFormationGeneriqueVo>{
         return this.http.get<FormationContinueObjetFormationGeneriqueVo>(this.API + 'detail/id/' +formationContinueObjetFormationGenerique.id);
    }

    // getters and setters


    get formationContinueObjetFormationGeneriques(): Array<FormationContinueObjetFormationGeneriqueVo> {
    if(this._formationContinueObjetFormationGeneriques==null){
    this._formationContinueObjetFormationGeneriques=new Array<FormationContinueObjetFormationGeneriqueVo>();
    }
return this._formationContinueObjetFormationGeneriques;
       }

    set formationContinueObjetFormationGeneriques(value: Array<FormationContinueObjetFormationGeneriqueVo>) {
        this._formationContinueObjetFormationGeneriques = value;
       }

    get selectedFormationContinueObjetFormationGenerique(): FormationContinueObjetFormationGeneriqueVo {
    if(this._selectedFormationContinueObjetFormationGenerique==null){
    this._selectedFormationContinueObjetFormationGenerique=new FormationContinueObjetFormationGeneriqueVo();
    }
           return this._selectedFormationContinueObjetFormationGenerique;
       }

    set selectedFormationContinueObjetFormationGenerique(value: FormationContinueObjetFormationGeneriqueVo) {
        this._selectedFormationContinueObjetFormationGenerique = value;
       }

    get formationContinueObjetFormationGeneriqueSelections(): Array<FormationContinueObjetFormationGeneriqueVo> {
    if(this._formationContinueObjetFormationGeneriqueSelections==null){
    this._formationContinueObjetFormationGeneriqueSelections=new Array<FormationContinueObjetFormationGeneriqueVo>();
    }
        return this._formationContinueObjetFormationGeneriqueSelections;
       }


    set formationContinueObjetFormationGeneriqueSelections(value: Array<FormationContinueObjetFormationGeneriqueVo>) {
        this._formationContinueObjetFormationGeneriqueSelections = value;
       }

    get createFormationContinueObjetFormationGeneriqueDialog(): boolean {
        return this._createFormationContinueObjetFormationGeneriqueDialog;
       }

    set createFormationContinueObjetFormationGeneriqueDialog(value: boolean) {
        this._createFormationContinueObjetFormationGeneriqueDialog = value;
       }

    get editFormationContinueObjetFormationGeneriqueDialog(): boolean {
        return this._editFormationContinueObjetFormationGeneriqueDialog;
       }

    set editFormationContinueObjetFormationGeneriqueDialog(value: boolean) {
        this._editFormationContinueObjetFormationGeneriqueDialog = value;
       }

    get viewFormationContinueObjetFormationGeneriqueDialog(): boolean {
        return this._viewFormationContinueObjetFormationGeneriqueDialog;
       }

    set viewFormationContinueObjetFormationGeneriqueDialog(value: boolean) {
        this._viewFormationContinueObjetFormationGeneriqueDialog = value;
       }

     get searchFormationContinueObjetFormationGenerique(): FormationContinueObjetFormationGeneriqueVo {
     if(this._searchFormationContinueObjetFormationGenerique==null){
    this._searchFormationContinueObjetFormationGenerique=new FormationContinueObjetFormationGeneriqueVo();
    }
        return this._searchFormationContinueObjetFormationGenerique;
    }

    set searchFormationContinueObjetFormationGenerique(value: FormationContinueObjetFormationGeneriqueVo) {
        this._searchFormationContinueObjetFormationGenerique = value;
       }

}
