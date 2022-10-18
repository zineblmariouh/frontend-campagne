import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.model';
import {TypeSavoirVo} from '../model/TypeSavoir.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/DeveloppementDeSavoirEtInnovationScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeSavoirDeveloppementDeSavoirEtInnovationScientifique/';
        })
    }
     private _typeSavoirDeveloppementDeSavoirEtInnovationScientifiques: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> ;
     private _selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo;
     private _typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueSelections: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>;
     private _createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog: boolean;
     private _editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog: boolean;
     private _viewTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog: boolean;
     public editTypeSavoirDeveloppementDeSavoirEtInnovationScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique:TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>>(this.API);
    }

    public save(): Observable<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> {
         return this.http.post<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>(this.API, this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique);
    }

    delete(typeSavoirDeveloppementDeSavoirEtInnovationScientifique: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + typeSavoirDeveloppementDeSavoirEtInnovationScientifique.id);
    }


    public edit(): Observable<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> {
        return this.http.put<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>(this.API, this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique);
    }


     public findByCriteria(typeSavoirDeveloppementDeSavoirEtInnovationScientifique:TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo):Observable<Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>>{
           return this.http.post<Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>>(this.API +'search', typeSavoirDeveloppementDeSavoirEtInnovationScientifique);
    }

   public findByIdWithAssociatedList(typeSavoirDeveloppementDeSavoirEtInnovationScientifique:TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo):Observable<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>{
         return this.http.get<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>(this.API + 'detail/id/' +typeSavoirDeveloppementDeSavoirEtInnovationScientifique.id);
    }

    // getters and setters


    get typeSavoirDeveloppementDeSavoirEtInnovationScientifiques(): Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> {
    if(this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiques==null){
    this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiques=new Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>();
    }
return this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiques;
       }

    set typeSavoirDeveloppementDeSavoirEtInnovationScientifiques(value: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiques = value;
       }

    get selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(): TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo {
    if(this._selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique==null){
    this._selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique=new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
    }
           return this._selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique;
       }

    set selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(value: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this._selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = value;
       }

    get typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueSelections(): Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> {
    if(this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueSelections==null){
    this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueSelections=new Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>();
    }
        return this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueSelections;
       }


    set typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueSelections(value: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueSelections = value;
       }

    get createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
        return this._createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }

    set createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this._createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
       }

    get editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
        return this._editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }

    set editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this._editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
       }

    get viewTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
        return this._viewTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }

    set viewTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this._viewTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
       }

     get searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(): TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo {
     if(this._searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique==null){
    this._searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique=new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
    }
        return this._searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique;
    }

    set searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(value: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this._searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = value;
       }

}
