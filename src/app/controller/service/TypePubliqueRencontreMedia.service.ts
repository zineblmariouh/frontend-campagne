import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypePubliqueRencontreMediaVo} from '../model/TypePubliqueRencontreMedia.model';
import {RencontreMediaVo} from '../model/RencontreMedia.model';
import {TypePubliqueVo} from '../model/TypePublique.model';


@Injectable({
  providedIn: 'root'
})
export class TypePubliqueRencontreMediaService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typePubliqueRencontreMedia/';
        })
    }
     private _typePubliqueRencontreMedias: Array<TypePubliqueRencontreMediaVo> ;
     private _selectedTypePubliqueRencontreMedia: TypePubliqueRencontreMediaVo;
     private _typePubliqueRencontreMediaSelections: Array<TypePubliqueRencontreMediaVo>;
     private _createTypePubliqueRencontreMediaDialog: boolean;
     private _editTypePubliqueRencontreMediaDialog: boolean;
     private _viewTypePubliqueRencontreMediaDialog: boolean;
     public editTypePubliqueRencontreMedia$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypePubliqueRencontreMedia:TypePubliqueRencontreMediaVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypePubliqueRencontreMediaVo>>(this.API);
    }

    public save(): Observable<TypePubliqueRencontreMediaVo> {
         return this.http.post<TypePubliqueRencontreMediaVo>(this.API, this.selectedTypePubliqueRencontreMedia);
    }

    delete(typePubliqueRencontreMedia: TypePubliqueRencontreMediaVo) {
         return this.http.delete<number>(this.API + 'id/' + typePubliqueRencontreMedia.id);
    }


    public edit(): Observable<TypePubliqueRencontreMediaVo> {
        return this.http.put<TypePubliqueRencontreMediaVo>(this.API, this.selectedTypePubliqueRencontreMedia);
    }


     public findByCriteria(typePubliqueRencontreMedia:TypePubliqueRencontreMediaVo):Observable<Array<TypePubliqueRencontreMediaVo>>{
           return this.http.post<Array<TypePubliqueRencontreMediaVo>>(this.API +'search', typePubliqueRencontreMedia);
    }

   public findByIdWithAssociatedList(typePubliqueRencontreMedia:TypePubliqueRencontreMediaVo):Observable<TypePubliqueRencontreMediaVo>{
         return this.http.get<TypePubliqueRencontreMediaVo>(this.API + 'detail/id/' +typePubliqueRencontreMedia.id);
    }

    // getters and setters


    get typePubliqueRencontreMedias(): Array<TypePubliqueRencontreMediaVo> {
    if(this._typePubliqueRencontreMedias==null){
    this._typePubliqueRencontreMedias=new Array<TypePubliqueRencontreMediaVo>();
    }
return this._typePubliqueRencontreMedias;
       }

    set typePubliqueRencontreMedias(value: Array<TypePubliqueRencontreMediaVo>) {
        this._typePubliqueRencontreMedias = value;
       }

    get selectedTypePubliqueRencontreMedia(): TypePubliqueRencontreMediaVo {
    if(this._selectedTypePubliqueRencontreMedia==null){
    this._selectedTypePubliqueRencontreMedia=new TypePubliqueRencontreMediaVo();
    }
           return this._selectedTypePubliqueRencontreMedia;
       }

    set selectedTypePubliqueRencontreMedia(value: TypePubliqueRencontreMediaVo) {
        this._selectedTypePubliqueRencontreMedia = value;
       }

    get typePubliqueRencontreMediaSelections(): Array<TypePubliqueRencontreMediaVo> {
    if(this._typePubliqueRencontreMediaSelections==null){
    this._typePubliqueRencontreMediaSelections=new Array<TypePubliqueRencontreMediaVo>();
    }
        return this._typePubliqueRencontreMediaSelections;
       }


    set typePubliqueRencontreMediaSelections(value: Array<TypePubliqueRencontreMediaVo>) {
        this._typePubliqueRencontreMediaSelections = value;
       }

    get createTypePubliqueRencontreMediaDialog(): boolean {
        return this._createTypePubliqueRencontreMediaDialog;
       }

    set createTypePubliqueRencontreMediaDialog(value: boolean) {
        this._createTypePubliqueRencontreMediaDialog = value;
       }

    get editTypePubliqueRencontreMediaDialog(): boolean {
        return this._editTypePubliqueRencontreMediaDialog;
       }

    set editTypePubliqueRencontreMediaDialog(value: boolean) {
        this._editTypePubliqueRencontreMediaDialog = value;
       }

    get viewTypePubliqueRencontreMediaDialog(): boolean {
        return this._viewTypePubliqueRencontreMediaDialog;
       }

    set viewTypePubliqueRencontreMediaDialog(value: boolean) {
        this._viewTypePubliqueRencontreMediaDialog = value;
       }

     get searchTypePubliqueRencontreMedia(): TypePubliqueRencontreMediaVo {
     if(this._searchTypePubliqueRencontreMedia==null){
    this._searchTypePubliqueRencontreMedia=new TypePubliqueRencontreMediaVo();
    }
        return this._searchTypePubliqueRencontreMedia;
    }

    set searchTypePubliqueRencontreMedia(value: TypePubliqueRencontreMediaVo) {
        this._searchTypePubliqueRencontreMedia = value;
       }

}
