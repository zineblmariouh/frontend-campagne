import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeInstanceVo} from '../model/TypeInstance.model';


@Injectable({
  providedIn: 'root'
})
export class TypeInstanceService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeInstance/';
        })
    }
     private _typeInstances: Array<TypeInstanceVo> ;
     private _selectedTypeInstance: TypeInstanceVo;
     private _typeInstanceSelections: Array<TypeInstanceVo>;
     private _createTypeInstanceDialog: boolean;
     private _editTypeInstanceDialog: boolean;
     private _viewTypeInstanceDialog: boolean;
     public editTypeInstance$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeInstance:TypeInstanceVo ;

    // methods
    public archiver(typeInstance: TypeInstanceVo): Observable<TypeInstanceVo> {
        return this.http.put<TypeInstanceVo>(this.API + 'archiver/' ,typeInstance);
    }
    public desarchiver(typeInstance: TypeInstanceVo): Observable<TypeInstanceVo> {
    return this.http.put<TypeInstanceVo>(this.API + 'desarchiver/' ,typeInstance);
    }

    public findAll(){
     return this.http.get<Array<TypeInstanceVo>>(this.API);
    }

    public save(): Observable<TypeInstanceVo> {
           return this.http.post<TypeInstanceVo>(this.API, {...this.selectedTypeInstance,dateCreation: moment(this.selectedTypeInstance.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typeInstance: TypeInstanceVo) {
         return this.http.delete<number>(this.API + 'id/' + typeInstance.id);
    }


    public edit(): Observable<TypeInstanceVo> {
        return this.http.put<TypeInstanceVo>(this.API, this.selectedTypeInstance);
    }


     public findByCriteria(typeInstance:TypeInstanceVo):Observable<Array<TypeInstanceVo>>{
           return this.http.post<Array<TypeInstanceVo>>(this.API +'search', typeInstance);
    }

   public findByIdWithAssociatedList(typeInstance:TypeInstanceVo):Observable<TypeInstanceVo>{
         return this.http.get<TypeInstanceVo>(this.API + 'detail/id/' +typeInstance.id);
    }

    // getters and setters


    get typeInstances(): Array<TypeInstanceVo> {
    if(this._typeInstances==null){
    this._typeInstances=new Array<TypeInstanceVo>();
    }
return this._typeInstances;
       }

    set typeInstances(value: Array<TypeInstanceVo>) {
        this._typeInstances = value;
       }

    get selectedTypeInstance(): TypeInstanceVo {
    if(this._selectedTypeInstance==null){
    this._selectedTypeInstance=new TypeInstanceVo();
    }
           return this._selectedTypeInstance;
       }

    set selectedTypeInstance(value: TypeInstanceVo) {
        this._selectedTypeInstance = value;
       }

    get typeInstanceSelections(): Array<TypeInstanceVo> {
    if(this._typeInstanceSelections==null){
    this._typeInstanceSelections=new Array<TypeInstanceVo>();
    }
        return this._typeInstanceSelections;
       }


    set typeInstanceSelections(value: Array<TypeInstanceVo>) {
        this._typeInstanceSelections = value;
       }

    get createTypeInstanceDialog(): boolean {
        return this._createTypeInstanceDialog;
       }

    set createTypeInstanceDialog(value: boolean) {
        this._createTypeInstanceDialog = value;
       }

    get editTypeInstanceDialog(): boolean {
        return this._editTypeInstanceDialog;
       }

    set editTypeInstanceDialog(value: boolean) {
        this._editTypeInstanceDialog = value;
       }

    get viewTypeInstanceDialog(): boolean {
        return this._viewTypeInstanceDialog;
       }

    set viewTypeInstanceDialog(value: boolean) {
        this._viewTypeInstanceDialog = value;
       }

     get searchTypeInstance(): TypeInstanceVo {
     if(this._searchTypeInstance==null){
    this._searchTypeInstance=new TypeInstanceVo();
    }
        return this._searchTypeInstance;
    }

    set searchTypeInstance(value: TypeInstanceVo) {
        this._searchTypeInstance = value;
       }

}
