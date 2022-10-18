import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {LangueVo} from '../model/Langue.model';


@Injectable({
  providedIn: 'root'
})
export class LangueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/langue/';
        })
    }
     private _langues: Array<LangueVo> ;
     private _selectedLangue: LangueVo;
     private _langueSelections: Array<LangueVo>;
     private _createLangueDialog: boolean;
     private _editLangueDialog: boolean;
     private _viewLangueDialog: boolean;
     public editLangue$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchLangue:LangueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<LangueVo>>(this.API);
    }

    public save(): Observable<LangueVo> {
         return this.http.post<LangueVo>(this.API, this.selectedLangue);
    }

    delete(langue: LangueVo) {
         return this.http.delete<number>(this.API + 'id/' + langue.id);
    }


    public edit(): Observable<LangueVo> {
        return this.http.put<LangueVo>(this.API, this.selectedLangue);
    }


     public findByCriteria(langue:LangueVo):Observable<Array<LangueVo>>{
           return this.http.post<Array<LangueVo>>(this.API +'search', langue);
    }

   public findByIdWithAssociatedList(langue:LangueVo):Observable<LangueVo>{
         return this.http.get<LangueVo>(this.API + 'detail/id/' +langue.id);
    }

    // getters and setters


    get langues(): Array<LangueVo> {
    if(this._langues==null){
    this._langues=new Array<LangueVo>();
    }
return this._langues;
       }

    set langues(value: Array<LangueVo>) {
        this._langues = value;
       }

    get selectedLangue(): LangueVo {
    if(this._selectedLangue==null){
    this._selectedLangue=new LangueVo();
    }
           return this._selectedLangue;
       }

    set selectedLangue(value: LangueVo) {
        this._selectedLangue = value;
       }

    get langueSelections(): Array<LangueVo> {
    if(this._langueSelections==null){
    this._langueSelections=new Array<LangueVo>();
    }
        return this._langueSelections;
       }


    set langueSelections(value: Array<LangueVo>) {
        this._langueSelections = value;
       }

    get createLangueDialog(): boolean {
        return this._createLangueDialog;
       }

    set createLangueDialog(value: boolean) {
        this._createLangueDialog = value;
       }

    get editLangueDialog(): boolean {
        return this._editLangueDialog;
       }

    set editLangueDialog(value: boolean) {
        this._editLangueDialog = value;
       }

    get viewLangueDialog(): boolean {
        return this._viewLangueDialog;
       }

    set viewLangueDialog(value: boolean) {
        this._viewLangueDialog = value;
       }

     get searchLangue(): LangueVo {
     if(this._searchLangue==null){
    this._searchLangue=new LangueVo();
    }
        return this._searchLangue;
    }

    set searchLangue(value: LangueVo) {
        this._searchLangue = value;
       }

}
