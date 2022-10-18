import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EncadrementEtudiantEnjeuxIrdVo} from '../model/EncadrementEtudiantEnjeuxIrd.model';
import {EncadrementEtudiantVo} from '../model/EncadrementEtudiant.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';


@Injectable({
  providedIn: 'root'
})
export class EncadrementEtudiantEnjeuxIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/encadrementEtudiantEnjeuxIrd/';
        })
    }
     private _encadrementEtudiantEnjeuxIrds: Array<EncadrementEtudiantEnjeuxIrdVo> ;
     private _selectedEncadrementEtudiantEnjeuxIrd: EncadrementEtudiantEnjeuxIrdVo;
     private _encadrementEtudiantEnjeuxIrdSelections: Array<EncadrementEtudiantEnjeuxIrdVo>;
     private _createEncadrementEtudiantEnjeuxIrdDialog: boolean;
     private _editEncadrementEtudiantEnjeuxIrdDialog: boolean;
     private _viewEncadrementEtudiantEnjeuxIrdDialog: boolean;
     public editEncadrementEtudiantEnjeuxIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEncadrementEtudiantEnjeuxIrd:EncadrementEtudiantEnjeuxIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EncadrementEtudiantEnjeuxIrdVo>>(this.API);
    }

    public save(): Observable<EncadrementEtudiantEnjeuxIrdVo> {
         return this.http.post<EncadrementEtudiantEnjeuxIrdVo>(this.API, this.selectedEncadrementEtudiantEnjeuxIrd);
    }

    delete(encadrementEtudiantEnjeuxIrd: EncadrementEtudiantEnjeuxIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + encadrementEtudiantEnjeuxIrd.id);
    }


    public edit(): Observable<EncadrementEtudiantEnjeuxIrdVo> {
        return this.http.put<EncadrementEtudiantEnjeuxIrdVo>(this.API, this.selectedEncadrementEtudiantEnjeuxIrd);
    }


     public findByCriteria(encadrementEtudiantEnjeuxIrd:EncadrementEtudiantEnjeuxIrdVo):Observable<Array<EncadrementEtudiantEnjeuxIrdVo>>{
           return this.http.post<Array<EncadrementEtudiantEnjeuxIrdVo>>(this.API +'search', encadrementEtudiantEnjeuxIrd);
    }

   public findByIdWithAssociatedList(encadrementEtudiantEnjeuxIrd:EncadrementEtudiantEnjeuxIrdVo):Observable<EncadrementEtudiantEnjeuxIrdVo>{
         return this.http.get<EncadrementEtudiantEnjeuxIrdVo>(this.API + 'detail/id/' +encadrementEtudiantEnjeuxIrd.id);
    }

    // getters and setters


    get encadrementEtudiantEnjeuxIrds(): Array<EncadrementEtudiantEnjeuxIrdVo> {
    if(this._encadrementEtudiantEnjeuxIrds==null){
    this._encadrementEtudiantEnjeuxIrds=new Array<EncadrementEtudiantEnjeuxIrdVo>();
    }
return this._encadrementEtudiantEnjeuxIrds;
       }

    set encadrementEtudiantEnjeuxIrds(value: Array<EncadrementEtudiantEnjeuxIrdVo>) {
        this._encadrementEtudiantEnjeuxIrds = value;
       }

    get selectedEncadrementEtudiantEnjeuxIrd(): EncadrementEtudiantEnjeuxIrdVo {
    if(this._selectedEncadrementEtudiantEnjeuxIrd==null){
    this._selectedEncadrementEtudiantEnjeuxIrd=new EncadrementEtudiantEnjeuxIrdVo();
    }
           return this._selectedEncadrementEtudiantEnjeuxIrd;
       }

    set selectedEncadrementEtudiantEnjeuxIrd(value: EncadrementEtudiantEnjeuxIrdVo) {
        this._selectedEncadrementEtudiantEnjeuxIrd = value;
       }

    get encadrementEtudiantEnjeuxIrdSelections(): Array<EncadrementEtudiantEnjeuxIrdVo> {
    if(this._encadrementEtudiantEnjeuxIrdSelections==null){
    this._encadrementEtudiantEnjeuxIrdSelections=new Array<EncadrementEtudiantEnjeuxIrdVo>();
    }
        return this._encadrementEtudiantEnjeuxIrdSelections;
       }


    set encadrementEtudiantEnjeuxIrdSelections(value: Array<EncadrementEtudiantEnjeuxIrdVo>) {
        this._encadrementEtudiantEnjeuxIrdSelections = value;
       }

    get createEncadrementEtudiantEnjeuxIrdDialog(): boolean {
        return this._createEncadrementEtudiantEnjeuxIrdDialog;
       }

    set createEncadrementEtudiantEnjeuxIrdDialog(value: boolean) {
        this._createEncadrementEtudiantEnjeuxIrdDialog = value;
       }

    get editEncadrementEtudiantEnjeuxIrdDialog(): boolean {
        return this._editEncadrementEtudiantEnjeuxIrdDialog;
       }

    set editEncadrementEtudiantEnjeuxIrdDialog(value: boolean) {
        this._editEncadrementEtudiantEnjeuxIrdDialog = value;
       }

    get viewEncadrementEtudiantEnjeuxIrdDialog(): boolean {
        return this._viewEncadrementEtudiantEnjeuxIrdDialog;
       }

    set viewEncadrementEtudiantEnjeuxIrdDialog(value: boolean) {
        this._viewEncadrementEtudiantEnjeuxIrdDialog = value;
       }

     get searchEncadrementEtudiantEnjeuxIrd(): EncadrementEtudiantEnjeuxIrdVo {
     if(this._searchEncadrementEtudiantEnjeuxIrd==null){
    this._searchEncadrementEtudiantEnjeuxIrd=new EncadrementEtudiantEnjeuxIrdVo();
    }
        return this._searchEncadrementEtudiantEnjeuxIrd;
    }

    set searchEncadrementEtudiantEnjeuxIrd(value: EncadrementEtudiantEnjeuxIrdVo) {
        this._searchEncadrementEtudiantEnjeuxIrd = value;
       }

}
