import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {AffectationStructurelleVo} from '../model/AffectationStructurelle.model';


@Injectable({
  providedIn: 'root'
})
export class AffectationStructurelleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/affectationStructurelle/';
        })
    }
     private _affectationStructurelles: Array<AffectationStructurelleVo> ;
     private _selectedAffectationStructurelle: AffectationStructurelleVo;
     private _affectationStructurelleSelections: Array<AffectationStructurelleVo>;
     private _createAffectationStructurelleDialog: boolean;
     private _editAffectationStructurelleDialog: boolean;
     private _viewAffectationStructurelleDialog: boolean;
     public editAffectationStructurelle$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchAffectationStructurelle:AffectationStructurelleVo ;

    // methods

    public findAll(){
     return this.http.get<Array<AffectationStructurelleVo>>(this.API);
    }

    public save(): Observable<AffectationStructurelleVo> {
         return this.http.post<AffectationStructurelleVo>(this.API, this.selectedAffectationStructurelle);
    }

    delete(affectationStructurelle: AffectationStructurelleVo) {
         return this.http.delete<number>(this.API + 'id/' + affectationStructurelle.id);
    }


    public edit(): Observable<AffectationStructurelleVo> {
        return this.http.put<AffectationStructurelleVo>(this.API, this.selectedAffectationStructurelle);
    }


     public findByCriteria(affectationStructurelle:AffectationStructurelleVo):Observable<Array<AffectationStructurelleVo>>{
           return this.http.post<Array<AffectationStructurelleVo>>(this.API +'search', affectationStructurelle);
    }

   public findByIdWithAssociatedList(affectationStructurelle:AffectationStructurelleVo):Observable<AffectationStructurelleVo>{
         return this.http.get<AffectationStructurelleVo>(this.API + 'detail/id/' +affectationStructurelle.id);
    }

    // getters and setters


    get affectationStructurelles(): Array<AffectationStructurelleVo> {
    if(this._affectationStructurelles==null){
    this._affectationStructurelles=new Array<AffectationStructurelleVo>();
    }
return this._affectationStructurelles;
       }

    set affectationStructurelles(value: Array<AffectationStructurelleVo>) {
        this._affectationStructurelles = value;
       }

    get selectedAffectationStructurelle(): AffectationStructurelleVo {
    if(this._selectedAffectationStructurelle==null){
    this._selectedAffectationStructurelle=new AffectationStructurelleVo();
    }
           return this._selectedAffectationStructurelle;
       }

    set selectedAffectationStructurelle(value: AffectationStructurelleVo) {
        this._selectedAffectationStructurelle = value;
       }

    get affectationStructurelleSelections(): Array<AffectationStructurelleVo> {
    if(this._affectationStructurelleSelections==null){
    this._affectationStructurelleSelections=new Array<AffectationStructurelleVo>();
    }
        return this._affectationStructurelleSelections;
       }


    set affectationStructurelleSelections(value: Array<AffectationStructurelleVo>) {
        this._affectationStructurelleSelections = value;
       }

    get createAffectationStructurelleDialog(): boolean {
        return this._createAffectationStructurelleDialog;
       }

    set createAffectationStructurelleDialog(value: boolean) {
        this._createAffectationStructurelleDialog = value;
       }

    get editAffectationStructurelleDialog(): boolean {
        return this._editAffectationStructurelleDialog;
       }

    set editAffectationStructurelleDialog(value: boolean) {
        this._editAffectationStructurelleDialog = value;
       }

    get viewAffectationStructurelleDialog(): boolean {
        return this._viewAffectationStructurelleDialog;
       }

    set viewAffectationStructurelleDialog(value: boolean) {
        this._viewAffectationStructurelleDialog = value;
       }

     get searchAffectationStructurelle(): AffectationStructurelleVo {
     if(this._searchAffectationStructurelle==null){
    this._searchAffectationStructurelle=new AffectationStructurelleVo();
    }
        return this._searchAffectationStructurelle;
    }

    set searchAffectationStructurelle(value: AffectationStructurelleVo) {
        this._searchAffectationStructurelle = value;
       }

}
