import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FormationContinueCommanditaireVo} from '../model/FormationContinueCommanditaire.model';
import {CommanditaireVo} from '../model/Commanditaire.model';
import {FormationContinueVo} from '../model/FormationContinue.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class FormationContinueCommanditaireService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/formationContinueCommanditaire/';
        })
    }
     private _formationContinueCommanditaires: Array<FormationContinueCommanditaireVo> ;
     private _selectedFormationContinueCommanditaire: FormationContinueCommanditaireVo;
     private _formationContinueCommanditaireSelections: Array<FormationContinueCommanditaireVo>;
     private _createFormationContinueCommanditaireDialog: boolean;
     private _editFormationContinueCommanditaireDialog: boolean;
     private _viewFormationContinueCommanditaireDialog: boolean;
     public editFormationContinueCommanditaire$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFormationContinueCommanditaire:FormationContinueCommanditaireVo ;

    // methods

    public findAll(){
     return this.http.get<Array<FormationContinueCommanditaireVo>>(this.API);
    }

    public save(): Observable<FormationContinueCommanditaireVo> {
         return this.http.post<FormationContinueCommanditaireVo>(this.API, this.selectedFormationContinueCommanditaire);
    }

    delete(formationContinueCommanditaire: FormationContinueCommanditaireVo) {
         return this.http.delete<number>(this.API + 'id/' + formationContinueCommanditaire.id);
    }


    public edit(): Observable<FormationContinueCommanditaireVo> {
        return this.http.put<FormationContinueCommanditaireVo>(this.API, this.selectedFormationContinueCommanditaire);
    }


     public findByCriteria(formationContinueCommanditaire:FormationContinueCommanditaireVo):Observable<Array<FormationContinueCommanditaireVo>>{
           return this.http.post<Array<FormationContinueCommanditaireVo>>(this.API +'search', formationContinueCommanditaire);
    }

   public findByIdWithAssociatedList(formationContinueCommanditaire:FormationContinueCommanditaireVo):Observable<FormationContinueCommanditaireVo>{
         return this.http.get<FormationContinueCommanditaireVo>(this.API + 'detail/id/' +formationContinueCommanditaire.id);
    }

    // getters and setters


    get formationContinueCommanditaires(): Array<FormationContinueCommanditaireVo> {
    if(this._formationContinueCommanditaires==null){
    this._formationContinueCommanditaires=new Array<FormationContinueCommanditaireVo>();
    }
return this._formationContinueCommanditaires;
       }

    set formationContinueCommanditaires(value: Array<FormationContinueCommanditaireVo>) {
        this._formationContinueCommanditaires = value;
       }

    get selectedFormationContinueCommanditaire(): FormationContinueCommanditaireVo {
    if(this._selectedFormationContinueCommanditaire==null){
    this._selectedFormationContinueCommanditaire=new FormationContinueCommanditaireVo();
    }
           return this._selectedFormationContinueCommanditaire;
       }

    set selectedFormationContinueCommanditaire(value: FormationContinueCommanditaireVo) {
        this._selectedFormationContinueCommanditaire = value;
       }

    get formationContinueCommanditaireSelections(): Array<FormationContinueCommanditaireVo> {
    if(this._formationContinueCommanditaireSelections==null){
    this._formationContinueCommanditaireSelections=new Array<FormationContinueCommanditaireVo>();
    }
        return this._formationContinueCommanditaireSelections;
       }


    set formationContinueCommanditaireSelections(value: Array<FormationContinueCommanditaireVo>) {
        this._formationContinueCommanditaireSelections = value;
       }

    get createFormationContinueCommanditaireDialog(): boolean {
        return this._createFormationContinueCommanditaireDialog;
       }

    set createFormationContinueCommanditaireDialog(value: boolean) {
        this._createFormationContinueCommanditaireDialog = value;
       }

    get editFormationContinueCommanditaireDialog(): boolean {
        return this._editFormationContinueCommanditaireDialog;
       }

    set editFormationContinueCommanditaireDialog(value: boolean) {
        this._editFormationContinueCommanditaireDialog = value;
       }

    get viewFormationContinueCommanditaireDialog(): boolean {
        return this._viewFormationContinueCommanditaireDialog;
       }

    set viewFormationContinueCommanditaireDialog(value: boolean) {
        this._viewFormationContinueCommanditaireDialog = value;
       }

     get searchFormationContinueCommanditaire(): FormationContinueCommanditaireVo {
     if(this._searchFormationContinueCommanditaire==null){
    this._searchFormationContinueCommanditaire=new FormationContinueCommanditaireVo();
    }
        return this._searchFormationContinueCommanditaire;
    }

    set searchFormationContinueCommanditaire(value: FormationContinueCommanditaireVo) {
        this._searchFormationContinueCommanditaire = value;
       }

}
