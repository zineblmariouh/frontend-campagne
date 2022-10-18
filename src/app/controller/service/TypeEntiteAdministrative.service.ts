import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeEntiteAdministrativeVo} from '../model/TypeEntiteAdministrative.model';


@Injectable({
  providedIn: 'root'
})
export class TypeEntiteAdministrativeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeEntiteAdministrative/';
        })
    }
     private _typeEntiteAdministratives: Array<TypeEntiteAdministrativeVo> ;
     private _selectedTypeEntiteAdministrative: TypeEntiteAdministrativeVo;
     private _typeEntiteAdministrativeSelections: Array<TypeEntiteAdministrativeVo>;
     private _createTypeEntiteAdministrativeDialog: boolean;
     private _editTypeEntiteAdministrativeDialog: boolean;
     private _viewTypeEntiteAdministrativeDialog: boolean;
     public editTypeEntiteAdministrative$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeEntiteAdministrative:TypeEntiteAdministrativeVo ;

    // methods
    public archiver(typeEntiteAdministrative: TypeEntiteAdministrativeVo): Observable<TypeEntiteAdministrativeVo> {
        return this.http.put<TypeEntiteAdministrativeVo>(this.API + 'archiver/' ,typeEntiteAdministrative);
    }
    public desarchiver(typeEntiteAdministrative: TypeEntiteAdministrativeVo): Observable<TypeEntiteAdministrativeVo> {
    return this.http.put<TypeEntiteAdministrativeVo>(this.API + 'desarchiver/' ,typeEntiteAdministrative);
    }

    public findAll(){
     return this.http.get<Array<TypeEntiteAdministrativeVo>>(this.API);
    }

    public save(): Observable<TypeEntiteAdministrativeVo> {
           return this.http.post<TypeEntiteAdministrativeVo>(this.API, {...this.selectedTypeEntiteAdministrative,dateCreation: moment(this.selectedTypeEntiteAdministrative.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typeEntiteAdministrative: TypeEntiteAdministrativeVo) {
         return this.http.delete<number>(this.API + 'id/' + typeEntiteAdministrative.id);
    }


    public edit(): Observable<TypeEntiteAdministrativeVo> {
        return this.http.put<TypeEntiteAdministrativeVo>(this.API, this.selectedTypeEntiteAdministrative);
    }


     public findByCriteria(typeEntiteAdministrative:TypeEntiteAdministrativeVo):Observable<Array<TypeEntiteAdministrativeVo>>{
           return this.http.post<Array<TypeEntiteAdministrativeVo>>(this.API +'search', typeEntiteAdministrative);
    }

   public findByIdWithAssociatedList(typeEntiteAdministrative:TypeEntiteAdministrativeVo):Observable<TypeEntiteAdministrativeVo>{
         return this.http.get<TypeEntiteAdministrativeVo>(this.API + 'detail/id/' +typeEntiteAdministrative.id);
    }

    // getters and setters


    get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
    if(this._typeEntiteAdministratives==null){
    this._typeEntiteAdministratives=new Array<TypeEntiteAdministrativeVo>();
    }
return this._typeEntiteAdministratives;
       }

    set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this._typeEntiteAdministratives = value;
       }

    get selectedTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
    if(this._selectedTypeEntiteAdministrative==null){
    this._selectedTypeEntiteAdministrative=new TypeEntiteAdministrativeVo();
    }
           return this._selectedTypeEntiteAdministrative;
       }

    set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this._selectedTypeEntiteAdministrative = value;
       }

    get typeEntiteAdministrativeSelections(): Array<TypeEntiteAdministrativeVo> {
    if(this._typeEntiteAdministrativeSelections==null){
    this._typeEntiteAdministrativeSelections=new Array<TypeEntiteAdministrativeVo>();
    }
        return this._typeEntiteAdministrativeSelections;
       }


    set typeEntiteAdministrativeSelections(value: Array<TypeEntiteAdministrativeVo>) {
        this._typeEntiteAdministrativeSelections = value;
       }

    get createTypeEntiteAdministrativeDialog(): boolean {
        return this._createTypeEntiteAdministrativeDialog;
       }

    set createTypeEntiteAdministrativeDialog(value: boolean) {
        this._createTypeEntiteAdministrativeDialog = value;
       }

    get editTypeEntiteAdministrativeDialog(): boolean {
        return this._editTypeEntiteAdministrativeDialog;
       }

    set editTypeEntiteAdministrativeDialog(value: boolean) {
        this._editTypeEntiteAdministrativeDialog = value;
       }

    get viewTypeEntiteAdministrativeDialog(): boolean {
        return this._viewTypeEntiteAdministrativeDialog;
       }

    set viewTypeEntiteAdministrativeDialog(value: boolean) {
        this._viewTypeEntiteAdministrativeDialog = value;
       }

     get searchTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
     if(this._searchTypeEntiteAdministrative==null){
    this._searchTypeEntiteAdministrative=new TypeEntiteAdministrativeVo();
    }
        return this._searchTypeEntiteAdministrative;
    }

    set searchTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this._searchTypeEntiteAdministrative = value;
       }

}
