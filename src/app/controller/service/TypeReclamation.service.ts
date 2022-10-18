import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeReclamationVo} from '../model/TypeReclamation.model';


@Injectable({
  providedIn: 'root'
})
export class TypeReclamationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeReclamation/';
        })
    }
     private _typeReclamations: Array<TypeReclamationVo> ;
     private _selectedTypeReclamation: TypeReclamationVo;
     private _typeReclamationSelections: Array<TypeReclamationVo>;
     private _createTypeReclamationDialog: boolean;
     private _editTypeReclamationDialog: boolean;
     private _viewTypeReclamationDialog: boolean;
     public editTypeReclamation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeReclamation:TypeReclamationVo ;

    // methods
    public archiver(typeReclamation: TypeReclamationVo): Observable<TypeReclamationVo> {
        return this.http.put<TypeReclamationVo>(this.API + 'archiver/' ,typeReclamation);
    }
    public desarchiver(typeReclamation: TypeReclamationVo): Observable<TypeReclamationVo> {
    return this.http.put<TypeReclamationVo>(this.API + 'desarchiver/' ,typeReclamation);
    }

    public findAll(){
     return this.http.get<Array<TypeReclamationVo>>(this.API);
    }

    public save(): Observable<TypeReclamationVo> {
           return this.http.post<TypeReclamationVo>(this.API, {...this.selectedTypeReclamation,dateCreation: moment(this.selectedTypeReclamation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typeReclamation: TypeReclamationVo) {
         return this.http.delete<number>(this.API + 'id/' + typeReclamation.id);
    }


    public edit(): Observable<TypeReclamationVo> {
        return this.http.put<TypeReclamationVo>(this.API, this.selectedTypeReclamation);
    }


     public findByCriteria(typeReclamation:TypeReclamationVo):Observable<Array<TypeReclamationVo>>{
           return this.http.post<Array<TypeReclamationVo>>(this.API +'search', typeReclamation);
    }

   public findByIdWithAssociatedList(typeReclamation:TypeReclamationVo):Observable<TypeReclamationVo>{
         return this.http.get<TypeReclamationVo>(this.API + 'detail/id/' +typeReclamation.id);
    }

    // getters and setters


    get typeReclamations(): Array<TypeReclamationVo> {
    if(this._typeReclamations==null){
    this._typeReclamations=new Array<TypeReclamationVo>();
    }
return this._typeReclamations;
       }

    set typeReclamations(value: Array<TypeReclamationVo>) {
        this._typeReclamations = value;
       }

    get selectedTypeReclamation(): TypeReclamationVo {
    if(this._selectedTypeReclamation==null){
    this._selectedTypeReclamation=new TypeReclamationVo();
    }
           return this._selectedTypeReclamation;
       }

    set selectedTypeReclamation(value: TypeReclamationVo) {
        this._selectedTypeReclamation = value;
       }

    get typeReclamationSelections(): Array<TypeReclamationVo> {
    if(this._typeReclamationSelections==null){
    this._typeReclamationSelections=new Array<TypeReclamationVo>();
    }
        return this._typeReclamationSelections;
       }


    set typeReclamationSelections(value: Array<TypeReclamationVo>) {
        this._typeReclamationSelections = value;
       }

    get createTypeReclamationDialog(): boolean {
        return this._createTypeReclamationDialog;
       }

    set createTypeReclamationDialog(value: boolean) {
        this._createTypeReclamationDialog = value;
       }

    get editTypeReclamationDialog(): boolean {
        return this._editTypeReclamationDialog;
       }

    set editTypeReclamationDialog(value: boolean) {
        this._editTypeReclamationDialog = value;
       }

    get viewTypeReclamationDialog(): boolean {
        return this._viewTypeReclamationDialog;
       }

    set viewTypeReclamationDialog(value: boolean) {
        this._viewTypeReclamationDialog = value;
       }

     get searchTypeReclamation(): TypeReclamationVo {
     if(this._searchTypeReclamation==null){
    this._searchTypeReclamation=new TypeReclamationVo();
    }
        return this._searchTypeReclamation;
    }

    set searchTypeReclamation(value: TypeReclamationVo) {
        this._searchTypeReclamation = value;
       }

}
