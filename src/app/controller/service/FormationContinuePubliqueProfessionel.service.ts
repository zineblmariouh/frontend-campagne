import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FormationContinuePubliqueProfessionelVo} from '../model/FormationContinuePubliqueProfessionel.model';
import {FormationContinueVo} from '../model/FormationContinue.model';
import {PubliqueProfessionelVo} from '../model/PubliqueProfessionel.model';


@Injectable({
  providedIn: 'root'
})
export class FormationContinuePubliqueProfessionelService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/formationContinuePubliqueProfessionel/';
        })
    }
     private _formationContinuePubliqueProfessionels: Array<FormationContinuePubliqueProfessionelVo> ;
     private _selectedFormationContinuePubliqueProfessionel: FormationContinuePubliqueProfessionelVo;
     private _formationContinuePubliqueProfessionelSelections: Array<FormationContinuePubliqueProfessionelVo>;
     private _createFormationContinuePubliqueProfessionelDialog: boolean;
     private _editFormationContinuePubliqueProfessionelDialog: boolean;
     private _viewFormationContinuePubliqueProfessionelDialog: boolean;
     public editFormationContinuePubliqueProfessionel$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFormationContinuePubliqueProfessionel:FormationContinuePubliqueProfessionelVo ;

    // methods

    public findAll(){
     return this.http.get<Array<FormationContinuePubliqueProfessionelVo>>(this.API);
    }

    public save(): Observable<FormationContinuePubliqueProfessionelVo> {
         return this.http.post<FormationContinuePubliqueProfessionelVo>(this.API, this.selectedFormationContinuePubliqueProfessionel);
    }

    delete(formationContinuePubliqueProfessionel: FormationContinuePubliqueProfessionelVo) {
         return this.http.delete<number>(this.API + 'id/' + formationContinuePubliqueProfessionel.id);
    }


    public edit(): Observable<FormationContinuePubliqueProfessionelVo> {
        return this.http.put<FormationContinuePubliqueProfessionelVo>(this.API, this.selectedFormationContinuePubliqueProfessionel);
    }


     public findByCriteria(formationContinuePubliqueProfessionel:FormationContinuePubliqueProfessionelVo):Observable<Array<FormationContinuePubliqueProfessionelVo>>{
           return this.http.post<Array<FormationContinuePubliqueProfessionelVo>>(this.API +'search', formationContinuePubliqueProfessionel);
    }

   public findByIdWithAssociatedList(formationContinuePubliqueProfessionel:FormationContinuePubliqueProfessionelVo):Observable<FormationContinuePubliqueProfessionelVo>{
         return this.http.get<FormationContinuePubliqueProfessionelVo>(this.API + 'detail/id/' +formationContinuePubliqueProfessionel.id);
    }

    // getters and setters


    get formationContinuePubliqueProfessionels(): Array<FormationContinuePubliqueProfessionelVo> {
    if(this._formationContinuePubliqueProfessionels==null){
    this._formationContinuePubliqueProfessionels=new Array<FormationContinuePubliqueProfessionelVo>();
    }
return this._formationContinuePubliqueProfessionels;
       }

    set formationContinuePubliqueProfessionels(value: Array<FormationContinuePubliqueProfessionelVo>) {
        this._formationContinuePubliqueProfessionels = value;
       }

    get selectedFormationContinuePubliqueProfessionel(): FormationContinuePubliqueProfessionelVo {
    if(this._selectedFormationContinuePubliqueProfessionel==null){
    this._selectedFormationContinuePubliqueProfessionel=new FormationContinuePubliqueProfessionelVo();
    }
           return this._selectedFormationContinuePubliqueProfessionel;
       }

    set selectedFormationContinuePubliqueProfessionel(value: FormationContinuePubliqueProfessionelVo) {
        this._selectedFormationContinuePubliqueProfessionel = value;
       }

    get formationContinuePubliqueProfessionelSelections(): Array<FormationContinuePubliqueProfessionelVo> {
    if(this._formationContinuePubliqueProfessionelSelections==null){
    this._formationContinuePubliqueProfessionelSelections=new Array<FormationContinuePubliqueProfessionelVo>();
    }
        return this._formationContinuePubliqueProfessionelSelections;
       }


    set formationContinuePubliqueProfessionelSelections(value: Array<FormationContinuePubliqueProfessionelVo>) {
        this._formationContinuePubliqueProfessionelSelections = value;
       }

    get createFormationContinuePubliqueProfessionelDialog(): boolean {
        return this._createFormationContinuePubliqueProfessionelDialog;
       }

    set createFormationContinuePubliqueProfessionelDialog(value: boolean) {
        this._createFormationContinuePubliqueProfessionelDialog = value;
       }

    get editFormationContinuePubliqueProfessionelDialog(): boolean {
        return this._editFormationContinuePubliqueProfessionelDialog;
       }

    set editFormationContinuePubliqueProfessionelDialog(value: boolean) {
        this._editFormationContinuePubliqueProfessionelDialog = value;
       }

    get viewFormationContinuePubliqueProfessionelDialog(): boolean {
        return this._viewFormationContinuePubliqueProfessionelDialog;
       }

    set viewFormationContinuePubliqueProfessionelDialog(value: boolean) {
        this._viewFormationContinuePubliqueProfessionelDialog = value;
       }

     get searchFormationContinuePubliqueProfessionel(): FormationContinuePubliqueProfessionelVo {
     if(this._searchFormationContinuePubliqueProfessionel==null){
    this._searchFormationContinuePubliqueProfessionel=new FormationContinuePubliqueProfessionelVo();
    }
        return this._searchFormationContinuePubliqueProfessionel;
    }

    set searchFormationContinuePubliqueProfessionel(value: FormationContinuePubliqueProfessionelVo) {
        this._searchFormationContinuePubliqueProfessionel = value;
       }

}
