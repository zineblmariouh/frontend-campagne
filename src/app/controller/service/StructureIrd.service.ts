import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {StructureIrdVo} from '../model/StructureIrd.model';


@Injectable({
  providedIn: 'root'
})
export class StructureIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/structureIrd/';
        })
    }
     private _structureIrds: Array<StructureIrdVo> ;
     private _selectedStructureIrd: StructureIrdVo;
     private _structureIrdSelections: Array<StructureIrdVo>;
     private _createStructureIrdDialog: boolean;
     private _editStructureIrdDialog: boolean;
     private _viewStructureIrdDialog: boolean;
     public editStructureIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchStructureIrd:StructureIrdVo ;

    // methods
    public archiver(structureIrd: StructureIrdVo): Observable<StructureIrdVo> {
        return this.http.put<StructureIrdVo>(this.API + 'archiver/' ,structureIrd);
    }
    public desarchiver(structureIrd: StructureIrdVo): Observable<StructureIrdVo> {
    return this.http.put<StructureIrdVo>(this.API + 'desarchiver/' ,structureIrd);
    }

    public findAll(){
     return this.http.get<Array<StructureIrdVo>>(this.API);
    }

    public save(): Observable<StructureIrdVo> {
           return this.http.post<StructureIrdVo>(this.API, {...this.selectedStructureIrd,dateCreation: moment(this.selectedStructureIrd.dateCreation).format("YYYY-MM-DD")});
    }

    delete(structureIrd: StructureIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + structureIrd.id);
    }


    public edit(): Observable<StructureIrdVo> {
        return this.http.put<StructureIrdVo>(this.API, this.selectedStructureIrd);
    }


     public findByCriteria(structureIrd:StructureIrdVo):Observable<Array<StructureIrdVo>>{
           return this.http.post<Array<StructureIrdVo>>(this.API +'search', structureIrd);
    }

   public findByIdWithAssociatedList(structureIrd:StructureIrdVo):Observable<StructureIrdVo>{
         return this.http.get<StructureIrdVo>(this.API + 'detail/id/' +structureIrd.id);
    }

    // getters and setters


    get structureIrds(): Array<StructureIrdVo> {
    if(this._structureIrds==null){
    this._structureIrds=new Array<StructureIrdVo>();
    }
return this._structureIrds;
       }

    set structureIrds(value: Array<StructureIrdVo>) {
        this._structureIrds = value;
       }

    get selectedStructureIrd(): StructureIrdVo {
    if(this._selectedStructureIrd==null){
    this._selectedStructureIrd=new StructureIrdVo();
    }
           return this._selectedStructureIrd;
       }

    set selectedStructureIrd(value: StructureIrdVo) {
        this._selectedStructureIrd = value;
       }

    get structureIrdSelections(): Array<StructureIrdVo> {
    if(this._structureIrdSelections==null){
    this._structureIrdSelections=new Array<StructureIrdVo>();
    }
        return this._structureIrdSelections;
       }


    set structureIrdSelections(value: Array<StructureIrdVo>) {
        this._structureIrdSelections = value;
       }

    get createStructureIrdDialog(): boolean {
        return this._createStructureIrdDialog;
       }

    set createStructureIrdDialog(value: boolean) {
        this._createStructureIrdDialog = value;
       }

    get editStructureIrdDialog(): boolean {
        return this._editStructureIrdDialog;
       }

    set editStructureIrdDialog(value: boolean) {
        this._editStructureIrdDialog = value;
       }

    get viewStructureIrdDialog(): boolean {
        return this._viewStructureIrdDialog;
       }

    set viewStructureIrdDialog(value: boolean) {
        this._viewStructureIrdDialog = value;
       }

     get searchStructureIrd(): StructureIrdVo {
     if(this._searchStructureIrd==null){
    this._searchStructureIrd=new StructureIrdVo();
    }
        return this._searchStructureIrd;
    }

    set searchStructureIrd(value: StructureIrdVo) {
        this._searchStructureIrd = value;
       }

}
