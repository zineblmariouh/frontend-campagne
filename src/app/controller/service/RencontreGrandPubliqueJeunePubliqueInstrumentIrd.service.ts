import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from '../model/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../model/RencontreGrandPubliqueJeunePublique.model';
import {InstrumentIrdVo} from '../model/InstrumentIrd.model';


@Injectable({
  providedIn: 'root'
})
export class RencontreGrandPubliqueJeunePubliqueInstrumentIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/rencontreGrandPubliqueJeunePubliqueInstrumentIrd/';
        })
    }
     private _rencontreGrandPubliqueJeunePubliqueInstrumentIrds: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> ;
     private _selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo;
     private _rencontreGrandPubliqueJeunePubliqueInstrumentIrdSelections: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>;
     private _createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog: boolean;
     private _editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog: boolean;
     private _viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog: boolean;
     public editRencontreGrandPubliqueJeunePubliqueInstrumentIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd:RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>>(this.API);
    }

    public save(): Observable<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> {
         return this.http.post<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>(this.API, this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd);
    }

    delete(rencontreGrandPubliqueJeunePubliqueInstrumentIrd: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + rencontreGrandPubliqueJeunePubliqueInstrumentIrd.id);
    }


    public edit(): Observable<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> {
        return this.http.put<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>(this.API, this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd);
    }


     public findByCriteria(rencontreGrandPubliqueJeunePubliqueInstrumentIrd:RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo):Observable<Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>>{
           return this.http.post<Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>>(this.API +'search', rencontreGrandPubliqueJeunePubliqueInstrumentIrd);
    }

   public findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueInstrumentIrd:RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo):Observable<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>{
         return this.http.get<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>(this.API + 'detail/id/' +rencontreGrandPubliqueJeunePubliqueInstrumentIrd.id);
    }

    // getters and setters


    get rencontreGrandPubliqueJeunePubliqueInstrumentIrds(): Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> {
    if(this._rencontreGrandPubliqueJeunePubliqueInstrumentIrds==null){
    this._rencontreGrandPubliqueJeunePubliqueInstrumentIrds=new Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>();
    }
return this._rencontreGrandPubliqueJeunePubliqueInstrumentIrds;
       }

    set rencontreGrandPubliqueJeunePubliqueInstrumentIrds(value: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>) {
        this._rencontreGrandPubliqueJeunePubliqueInstrumentIrds = value;
       }

    get selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd(): RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo {
    if(this._selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd==null){
    this._selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd=new RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo();
    }
           return this._selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd;
       }

    set selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo) {
        this._selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd = value;
       }

    get rencontreGrandPubliqueJeunePubliqueInstrumentIrdSelections(): Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> {
    if(this._rencontreGrandPubliqueJeunePubliqueInstrumentIrdSelections==null){
    this._rencontreGrandPubliqueJeunePubliqueInstrumentIrdSelections=new Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>();
    }
        return this._rencontreGrandPubliqueJeunePubliqueInstrumentIrdSelections;
       }


    set rencontreGrandPubliqueJeunePubliqueInstrumentIrdSelections(value: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>) {
        this._rencontreGrandPubliqueJeunePubliqueInstrumentIrdSelections = value;
       }

    get createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(): boolean {
        return this._createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog;
       }

    set createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(value: boolean) {
        this._createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog = value;
       }

    get editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(): boolean {
        return this._editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog;
       }

    set editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(value: boolean) {
        this._editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog = value;
       }

    get viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(): boolean {
        return this._viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog;
       }

    set viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(value: boolean) {
        this._viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog = value;
       }

     get searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd(): RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo {
     if(this._searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd==null){
    this._searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd=new RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo();
    }
        return this._searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd;
    }

    set searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo) {
        this._searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd = value;
       }

}
