import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeInstrumentIrdVo} from '../model/TypeInstrumentIrd.model';


@Injectable({
  providedIn: 'root'
})
export class TypeInstrumentIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeInstrumentIrd/';
        })
    }
     private _typeInstrumentIrds: Array<TypeInstrumentIrdVo> ;
     private _selectedTypeInstrumentIrd: TypeInstrumentIrdVo;
     private _typeInstrumentIrdSelections: Array<TypeInstrumentIrdVo>;
     private _createTypeInstrumentIrdDialog: boolean;
     private _editTypeInstrumentIrdDialog: boolean;
     private _viewTypeInstrumentIrdDialog: boolean;
     public editTypeInstrumentIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeInstrumentIrd:TypeInstrumentIrdVo ;

    // methods
    public archiver(typeInstrumentIrd: TypeInstrumentIrdVo): Observable<TypeInstrumentIrdVo> {
        return this.http.put<TypeInstrumentIrdVo>(this.API + 'archiver/' ,typeInstrumentIrd);
    }
    public desarchiver(typeInstrumentIrd: TypeInstrumentIrdVo): Observable<TypeInstrumentIrdVo> {
    return this.http.put<TypeInstrumentIrdVo>(this.API + 'desarchiver/' ,typeInstrumentIrd);
    }

    public findAll(){
     return this.http.get<Array<TypeInstrumentIrdVo>>(this.API);
    }

    public save(): Observable<TypeInstrumentIrdVo> {
           return this.http.post<TypeInstrumentIrdVo>(this.API, {...this.selectedTypeInstrumentIrd,dateCreation: moment(this.selectedTypeInstrumentIrd.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typeInstrumentIrd: TypeInstrumentIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + typeInstrumentIrd.id);
    }


    public edit(): Observable<TypeInstrumentIrdVo> {
        return this.http.put<TypeInstrumentIrdVo>(this.API, this.selectedTypeInstrumentIrd);
    }


     public findByCriteria(typeInstrumentIrd:TypeInstrumentIrdVo):Observable<Array<TypeInstrumentIrdVo>>{
           return this.http.post<Array<TypeInstrumentIrdVo>>(this.API +'search', typeInstrumentIrd);
    }

   public findByIdWithAssociatedList(typeInstrumentIrd:TypeInstrumentIrdVo):Observable<TypeInstrumentIrdVo>{
         return this.http.get<TypeInstrumentIrdVo>(this.API + 'detail/id/' +typeInstrumentIrd.id);
    }

    // getters and setters


    get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
    if(this._typeInstrumentIrds==null){
    this._typeInstrumentIrds=new Array<TypeInstrumentIrdVo>();
    }
return this._typeInstrumentIrds;
       }

    set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this._typeInstrumentIrds = value;
       }

    get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
    if(this._selectedTypeInstrumentIrd==null){
    this._selectedTypeInstrumentIrd=new TypeInstrumentIrdVo();
    }
           return this._selectedTypeInstrumentIrd;
       }

    set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this._selectedTypeInstrumentIrd = value;
       }

    get typeInstrumentIrdSelections(): Array<TypeInstrumentIrdVo> {
    if(this._typeInstrumentIrdSelections==null){
    this._typeInstrumentIrdSelections=new Array<TypeInstrumentIrdVo>();
    }
        return this._typeInstrumentIrdSelections;
       }


    set typeInstrumentIrdSelections(value: Array<TypeInstrumentIrdVo>) {
        this._typeInstrumentIrdSelections = value;
       }

    get createTypeInstrumentIrdDialog(): boolean {
        return this._createTypeInstrumentIrdDialog;
       }

    set createTypeInstrumentIrdDialog(value: boolean) {
        this._createTypeInstrumentIrdDialog = value;
       }

    get editTypeInstrumentIrdDialog(): boolean {
        return this._editTypeInstrumentIrdDialog;
       }

    set editTypeInstrumentIrdDialog(value: boolean) {
        this._editTypeInstrumentIrdDialog = value;
       }

    get viewTypeInstrumentIrdDialog(): boolean {
        return this._viewTypeInstrumentIrdDialog;
       }

    set viewTypeInstrumentIrdDialog(value: boolean) {
        this._viewTypeInstrumentIrdDialog = value;
       }

     get searchTypeInstrumentIrd(): TypeInstrumentIrdVo {
     if(this._searchTypeInstrumentIrd==null){
    this._searchTypeInstrumentIrd=new TypeInstrumentIrdVo();
    }
        return this._searchTypeInstrumentIrd;
    }

    set searchTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this._searchTypeInstrumentIrd = value;
       }

}
