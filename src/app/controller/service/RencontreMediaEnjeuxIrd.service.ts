import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RencontreMediaEnjeuxIrdVo} from '../model/RencontreMediaEnjeuxIrd.model';
import {RencontreMediaVo} from '../model/RencontreMedia.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';


@Injectable({
  providedIn: 'root'
})
export class RencontreMediaEnjeuxIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/rencontreMediaEnjeuxIrd/';
        })
    }
     private _rencontreMediaEnjeuxIrds: Array<RencontreMediaEnjeuxIrdVo> ;
     private _selectedRencontreMediaEnjeuxIrd: RencontreMediaEnjeuxIrdVo;
     private _rencontreMediaEnjeuxIrdSelections: Array<RencontreMediaEnjeuxIrdVo>;
     private _createRencontreMediaEnjeuxIrdDialog: boolean;
     private _editRencontreMediaEnjeuxIrdDialog: boolean;
     private _viewRencontreMediaEnjeuxIrdDialog: boolean;
     public editRencontreMediaEnjeuxIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRencontreMediaEnjeuxIrd:RencontreMediaEnjeuxIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RencontreMediaEnjeuxIrdVo>>(this.API);
    }

    public save(): Observable<RencontreMediaEnjeuxIrdVo> {
         return this.http.post<RencontreMediaEnjeuxIrdVo>(this.API, this.selectedRencontreMediaEnjeuxIrd);
    }

    delete(rencontreMediaEnjeuxIrd: RencontreMediaEnjeuxIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + rencontreMediaEnjeuxIrd.id);
    }


    public edit(): Observable<RencontreMediaEnjeuxIrdVo> {
        return this.http.put<RencontreMediaEnjeuxIrdVo>(this.API, this.selectedRencontreMediaEnjeuxIrd);
    }


     public findByCriteria(rencontreMediaEnjeuxIrd:RencontreMediaEnjeuxIrdVo):Observable<Array<RencontreMediaEnjeuxIrdVo>>{
           return this.http.post<Array<RencontreMediaEnjeuxIrdVo>>(this.API +'search', rencontreMediaEnjeuxIrd);
    }

   public findByIdWithAssociatedList(rencontreMediaEnjeuxIrd:RencontreMediaEnjeuxIrdVo):Observable<RencontreMediaEnjeuxIrdVo>{
         return this.http.get<RencontreMediaEnjeuxIrdVo>(this.API + 'detail/id/' +rencontreMediaEnjeuxIrd.id);
    }

    // getters and setters


    get rencontreMediaEnjeuxIrds(): Array<RencontreMediaEnjeuxIrdVo> {
    if(this._rencontreMediaEnjeuxIrds==null){
    this._rencontreMediaEnjeuxIrds=new Array<RencontreMediaEnjeuxIrdVo>();
    }
return this._rencontreMediaEnjeuxIrds;
       }

    set rencontreMediaEnjeuxIrds(value: Array<RencontreMediaEnjeuxIrdVo>) {
        this._rencontreMediaEnjeuxIrds = value;
       }

    get selectedRencontreMediaEnjeuxIrd(): RencontreMediaEnjeuxIrdVo {
    if(this._selectedRencontreMediaEnjeuxIrd==null){
    this._selectedRencontreMediaEnjeuxIrd=new RencontreMediaEnjeuxIrdVo();
    }
           return this._selectedRencontreMediaEnjeuxIrd;
       }

    set selectedRencontreMediaEnjeuxIrd(value: RencontreMediaEnjeuxIrdVo) {
        this._selectedRencontreMediaEnjeuxIrd = value;
       }

    get rencontreMediaEnjeuxIrdSelections(): Array<RencontreMediaEnjeuxIrdVo> {
    if(this._rencontreMediaEnjeuxIrdSelections==null){
    this._rencontreMediaEnjeuxIrdSelections=new Array<RencontreMediaEnjeuxIrdVo>();
    }
        return this._rencontreMediaEnjeuxIrdSelections;
       }


    set rencontreMediaEnjeuxIrdSelections(value: Array<RencontreMediaEnjeuxIrdVo>) {
        this._rencontreMediaEnjeuxIrdSelections = value;
       }

    get createRencontreMediaEnjeuxIrdDialog(): boolean {
        return this._createRencontreMediaEnjeuxIrdDialog;
       }

    set createRencontreMediaEnjeuxIrdDialog(value: boolean) {
        this._createRencontreMediaEnjeuxIrdDialog = value;
       }

    get editRencontreMediaEnjeuxIrdDialog(): boolean {
        return this._editRencontreMediaEnjeuxIrdDialog;
       }

    set editRencontreMediaEnjeuxIrdDialog(value: boolean) {
        this._editRencontreMediaEnjeuxIrdDialog = value;
       }

    get viewRencontreMediaEnjeuxIrdDialog(): boolean {
        return this._viewRencontreMediaEnjeuxIrdDialog;
       }

    set viewRencontreMediaEnjeuxIrdDialog(value: boolean) {
        this._viewRencontreMediaEnjeuxIrdDialog = value;
       }

     get searchRencontreMediaEnjeuxIrd(): RencontreMediaEnjeuxIrdVo {
     if(this._searchRencontreMediaEnjeuxIrd==null){
    this._searchRencontreMediaEnjeuxIrd=new RencontreMediaEnjeuxIrdVo();
    }
        return this._searchRencontreMediaEnjeuxIrd;
    }

    set searchRencontreMediaEnjeuxIrd(value: RencontreMediaEnjeuxIrdVo) {
        this._searchRencontreMediaEnjeuxIrd = value;
       }

}
