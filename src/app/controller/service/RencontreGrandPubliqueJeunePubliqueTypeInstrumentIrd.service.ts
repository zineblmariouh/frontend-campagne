import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from '../model/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import {TypeInstrumentIrdVo} from '../model/TypeInstrumentIrd.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../model/RencontreGrandPubliqueJeunePublique.model';


@Injectable({
  providedIn: 'root'
})
export class RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd/';
        })
    }
     private _rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> ;
     private _selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo;
     private _rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdSelections: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>;
     private _createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog: boolean;
     private _editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog: boolean;
     private _viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog: boolean;
     public editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd:RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>>(this.API);
    }

    public save(): Observable<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> {
         return this.http.post<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>(this.API, this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd);
    }

    delete(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.id);
    }


    public edit(): Observable<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> {
        return this.http.put<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>(this.API, this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd);
    }


     public findByCriteria(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd:RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo):Observable<Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>>{
           return this.http.post<Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>>(this.API +'search', rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd);
    }

   public findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd:RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo):Observable<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>{
         return this.http.get<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>(this.API + 'detail/id/' +rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.id);
    }

    // getters and setters


    get rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(): Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> {
    if(this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds==null){
    this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds=new Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>();
    }
return this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds;
       }

    set rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(value: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>) {
        this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds = value;
       }

    get selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(): RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo {
    if(this._selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd==null){
    this._selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd=new RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo();
    }
           return this._selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd;
       }

    set selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo) {
        this._selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = value;
       }

    get rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdSelections(): Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> {
    if(this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdSelections==null){
    this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdSelections=new Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>();
    }
        return this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdSelections;
       }


    set rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdSelections(value: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>) {
        this._rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdSelections = value;
       }

    get createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(): boolean {
        return this._createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog;
       }

    set createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(value: boolean) {
        this._createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog = value;
       }

    get editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(): boolean {
        return this._editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog;
       }

    set editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(value: boolean) {
        this._editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog = value;
       }

    get viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(): boolean {
        return this._viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog;
       }

    set viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(value: boolean) {
        this._viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog = value;
       }

     get searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(): RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo {
     if(this._searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd==null){
    this._searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd=new RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo();
    }
        return this._searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd;
    }

    set searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo) {
        this._searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = value;
       }

}
