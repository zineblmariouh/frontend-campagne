import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypePubliqueCultureScientifiqueVo} from '../model/TypePubliqueCultureScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class TypePubliqueCultureScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typePubliqueCultureScientifique/';
        })
    }
     private _typePubliqueCultureScientifiques: Array<TypePubliqueCultureScientifiqueVo> ;
     private _selectedTypePubliqueCultureScientifique: TypePubliqueCultureScientifiqueVo;
     private _typePubliqueCultureScientifiqueSelections: Array<TypePubliqueCultureScientifiqueVo>;
     private _createTypePubliqueCultureScientifiqueDialog: boolean;
     private _editTypePubliqueCultureScientifiqueDialog: boolean;
     private _viewTypePubliqueCultureScientifiqueDialog: boolean;
     public editTypePubliqueCultureScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypePubliqueCultureScientifique:TypePubliqueCultureScientifiqueVo ;

    // methods
    public archiver(typePubliqueCultureScientifique: TypePubliqueCultureScientifiqueVo): Observable<TypePubliqueCultureScientifiqueVo> {
        return this.http.put<TypePubliqueCultureScientifiqueVo>(this.API + 'archiver/' ,typePubliqueCultureScientifique);
    }
    public desarchiver(typePubliqueCultureScientifique: TypePubliqueCultureScientifiqueVo): Observable<TypePubliqueCultureScientifiqueVo> {
    return this.http.put<TypePubliqueCultureScientifiqueVo>(this.API + 'desarchiver/' ,typePubliqueCultureScientifique);
    }

    public findAll(){
     return this.http.get<Array<TypePubliqueCultureScientifiqueVo>>(this.API);
    }

    public save(): Observable<TypePubliqueCultureScientifiqueVo> {
           return this.http.post<TypePubliqueCultureScientifiqueVo>(this.API, {...this.selectedTypePubliqueCultureScientifique,dateCreation: moment(this.selectedTypePubliqueCultureScientifique.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typePubliqueCultureScientifique: TypePubliqueCultureScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + typePubliqueCultureScientifique.id);
    }


    public edit(): Observable<TypePubliqueCultureScientifiqueVo> {
        return this.http.put<TypePubliqueCultureScientifiqueVo>(this.API, this.selectedTypePubliqueCultureScientifique);
    }


     public findByCriteria(typePubliqueCultureScientifique:TypePubliqueCultureScientifiqueVo):Observable<Array<TypePubliqueCultureScientifiqueVo>>{
           return this.http.post<Array<TypePubliqueCultureScientifiqueVo>>(this.API +'search', typePubliqueCultureScientifique);
    }

   public findByIdWithAssociatedList(typePubliqueCultureScientifique:TypePubliqueCultureScientifiqueVo):Observable<TypePubliqueCultureScientifiqueVo>{
         return this.http.get<TypePubliqueCultureScientifiqueVo>(this.API + 'detail/id/' +typePubliqueCultureScientifique.id);
    }

    // getters and setters


    get typePubliqueCultureScientifiques(): Array<TypePubliqueCultureScientifiqueVo> {
    if(this._typePubliqueCultureScientifiques==null){
    this._typePubliqueCultureScientifiques=new Array<TypePubliqueCultureScientifiqueVo>();
    }
return this._typePubliqueCultureScientifiques;
       }

    set typePubliqueCultureScientifiques(value: Array<TypePubliqueCultureScientifiqueVo>) {
        this._typePubliqueCultureScientifiques = value;
       }

    get selectedTypePubliqueCultureScientifique(): TypePubliqueCultureScientifiqueVo {
    if(this._selectedTypePubliqueCultureScientifique==null){
    this._selectedTypePubliqueCultureScientifique=new TypePubliqueCultureScientifiqueVo();
    }
           return this._selectedTypePubliqueCultureScientifique;
       }

    set selectedTypePubliqueCultureScientifique(value: TypePubliqueCultureScientifiqueVo) {
        this._selectedTypePubliqueCultureScientifique = value;
       }

    get typePubliqueCultureScientifiqueSelections(): Array<TypePubliqueCultureScientifiqueVo> {
    if(this._typePubliqueCultureScientifiqueSelections==null){
    this._typePubliqueCultureScientifiqueSelections=new Array<TypePubliqueCultureScientifiqueVo>();
    }
        return this._typePubliqueCultureScientifiqueSelections;
       }


    set typePubliqueCultureScientifiqueSelections(value: Array<TypePubliqueCultureScientifiqueVo>) {
        this._typePubliqueCultureScientifiqueSelections = value;
       }

    get createTypePubliqueCultureScientifiqueDialog(): boolean {
        return this._createTypePubliqueCultureScientifiqueDialog;
       }

    set createTypePubliqueCultureScientifiqueDialog(value: boolean) {
        this._createTypePubliqueCultureScientifiqueDialog = value;
       }

    get editTypePubliqueCultureScientifiqueDialog(): boolean {
        return this._editTypePubliqueCultureScientifiqueDialog;
       }

    set editTypePubliqueCultureScientifiqueDialog(value: boolean) {
        this._editTypePubliqueCultureScientifiqueDialog = value;
       }

    get viewTypePubliqueCultureScientifiqueDialog(): boolean {
        return this._viewTypePubliqueCultureScientifiqueDialog;
       }

    set viewTypePubliqueCultureScientifiqueDialog(value: boolean) {
        this._viewTypePubliqueCultureScientifiqueDialog = value;
       }

     get searchTypePubliqueCultureScientifique(): TypePubliqueCultureScientifiqueVo {
     if(this._searchTypePubliqueCultureScientifique==null){
    this._searchTypePubliqueCultureScientifique=new TypePubliqueCultureScientifiqueVo();
    }
        return this._searchTypePubliqueCultureScientifique;
    }

    set searchTypePubliqueCultureScientifique(value: TypePubliqueCultureScientifiqueVo) {
        this._searchTypePubliqueCultureScientifique = value;
       }

}
