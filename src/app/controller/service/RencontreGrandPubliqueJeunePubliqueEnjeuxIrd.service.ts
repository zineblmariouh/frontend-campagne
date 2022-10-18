import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from '../model/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../model/RencontreGrandPubliqueJeunePublique.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';


@Injectable({
  providedIn: 'root'
})
export class RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/rencontreGrandPubliqueJeunePubliqueEnjeuxIrd/';
        })
    }
     private _rencontreGrandPubliqueJeunePubliqueEnjeuxIrds: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> ;
     private _selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo;
     private _rencontreGrandPubliqueJeunePubliqueEnjeuxIrdSelections: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>;
     private _createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog: boolean;
     private _editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog: boolean;
     private _viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog: boolean;
     public editRencontreGrandPubliqueJeunePubliqueEnjeuxIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd:RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>>(this.API);
    }

    public save(): Observable<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> {
         return this.http.post<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>(this.API, this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd);
    }

    delete(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + rencontreGrandPubliqueJeunePubliqueEnjeuxIrd.id);
    }


    public edit(): Observable<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> {
        return this.http.put<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>(this.API, this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd);
    }


     public findByCriteria(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd:RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo):Observable<Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>>{
           return this.http.post<Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>>(this.API +'search', rencontreGrandPubliqueJeunePubliqueEnjeuxIrd);
    }

   public findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd:RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo):Observable<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>{
         return this.http.get<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>(this.API + 'detail/id/' +rencontreGrandPubliqueJeunePubliqueEnjeuxIrd.id);
    }

    // getters and setters


    get rencontreGrandPubliqueJeunePubliqueEnjeuxIrds(): Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> {
    if(this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrds==null){
    this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrds=new Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>();
    }
return this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrds;
       }

    set rencontreGrandPubliqueJeunePubliqueEnjeuxIrds(value: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>) {
        this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrds = value;
       }

    get selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(): RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo {
    if(this._selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd==null){
    this._selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd=new RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo();
    }
           return this._selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd;
       }

    set selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(value: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo) {
        this._selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = value;
       }

    get rencontreGrandPubliqueJeunePubliqueEnjeuxIrdSelections(): Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> {
    if(this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrdSelections==null){
    this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrdSelections=new Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>();
    }
        return this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrdSelections;
       }


    set rencontreGrandPubliqueJeunePubliqueEnjeuxIrdSelections(value: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>) {
        this._rencontreGrandPubliqueJeunePubliqueEnjeuxIrdSelections = value;
       }

    get createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(): boolean {
        return this._createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog;
       }

    set createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(value: boolean) {
        this._createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog = value;
       }

    get editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(): boolean {
        return this._editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog;
       }

    set editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(value: boolean) {
        this._editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog = value;
       }

    get viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(): boolean {
        return this._viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog;
       }

    set viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(value: boolean) {
        this._viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog = value;
       }

     get searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(): RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo {
     if(this._searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd==null){
    this._searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd=new RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo();
    }
        return this._searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd;
    }

    set searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(value: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo) {
        this._searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = value;
       }

}
