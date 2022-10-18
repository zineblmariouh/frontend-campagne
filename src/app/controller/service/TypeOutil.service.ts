import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeOutilVo} from '../model/TypeOutil.model';


@Injectable({
  providedIn: 'root'
})
export class TypeOutilService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeOutil/';
        })
    }
     private _typeOutils: Array<TypeOutilVo> ;
     private _selectedTypeOutil: TypeOutilVo;
     private _typeOutilSelections: Array<TypeOutilVo>;
     private _createTypeOutilDialog: boolean;
     private _editTypeOutilDialog: boolean;
     private _viewTypeOutilDialog: boolean;
     public editTypeOutil$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeOutil:TypeOutilVo ;

    // methods
    public archiver(typeOutil: TypeOutilVo): Observable<TypeOutilVo> {
        return this.http.put<TypeOutilVo>(this.API + 'archiver/' ,typeOutil);
    }
    public desarchiver(typeOutil: TypeOutilVo): Observable<TypeOutilVo> {
    return this.http.put<TypeOutilVo>(this.API + 'desarchiver/' ,typeOutil);
    }

    public findAll(){
     return this.http.get<Array<TypeOutilVo>>(this.API);
    }

    public save(): Observable<TypeOutilVo> {
           return this.http.post<TypeOutilVo>(this.API, {...this.selectedTypeOutil,dateCreation: moment(this.selectedTypeOutil.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typeOutil: TypeOutilVo) {
         return this.http.delete<number>(this.API + 'id/' + typeOutil.id);
    }


    public edit(): Observable<TypeOutilVo> {
        return this.http.put<TypeOutilVo>(this.API, this.selectedTypeOutil);
    }


     public findByCriteria(typeOutil:TypeOutilVo):Observable<Array<TypeOutilVo>>{
           return this.http.post<Array<TypeOutilVo>>(this.API +'search', typeOutil);
    }

   public findByIdWithAssociatedList(typeOutil:TypeOutilVo):Observable<TypeOutilVo>{
         return this.http.get<TypeOutilVo>(this.API + 'detail/id/' +typeOutil.id);
    }

    // getters and setters


    get typeOutils(): Array<TypeOutilVo> {
    if(this._typeOutils==null){
    this._typeOutils=new Array<TypeOutilVo>();
    }
return this._typeOutils;
       }

    set typeOutils(value: Array<TypeOutilVo>) {
        this._typeOutils = value;
       }

    get selectedTypeOutil(): TypeOutilVo {
    if(this._selectedTypeOutil==null){
    this._selectedTypeOutil=new TypeOutilVo();
    }
           return this._selectedTypeOutil;
       }

    set selectedTypeOutil(value: TypeOutilVo) {
        this._selectedTypeOutil = value;
       }

    get typeOutilSelections(): Array<TypeOutilVo> {
    if(this._typeOutilSelections==null){
    this._typeOutilSelections=new Array<TypeOutilVo>();
    }
        return this._typeOutilSelections;
       }


    set typeOutilSelections(value: Array<TypeOutilVo>) {
        this._typeOutilSelections = value;
       }

    get createTypeOutilDialog(): boolean {
        return this._createTypeOutilDialog;
       }

    set createTypeOutilDialog(value: boolean) {
        this._createTypeOutilDialog = value;
       }

    get editTypeOutilDialog(): boolean {
        return this._editTypeOutilDialog;
       }

    set editTypeOutilDialog(value: boolean) {
        this._editTypeOutilDialog = value;
       }

    get viewTypeOutilDialog(): boolean {
        return this._viewTypeOutilDialog;
       }

    set viewTypeOutilDialog(value: boolean) {
        this._viewTypeOutilDialog = value;
       }

     get searchTypeOutil(): TypeOutilVo {
     if(this._searchTypeOutil==null){
    this._searchTypeOutil=new TypeOutilVo();
    }
        return this._searchTypeOutil;
    }

    set searchTypeOutil(value: TypeOutilVo) {
        this._searchTypeOutil = value;
       }

}
