import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {GestionEquipeDetailVo} from '../model/GestionEquipeDetail.model';
import {GestionEquipeVo} from '../model/GestionEquipe.model';


@Injectable({
  providedIn: 'root'
})
export class GestionEquipeDetailService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/gestionEquipeDetail/';
        })
    }
     private _gestionEquipeDetails: Array<GestionEquipeDetailVo> ;
     private _selectedGestionEquipeDetail: GestionEquipeDetailVo;
     private _gestionEquipeDetailSelections: Array<GestionEquipeDetailVo>;
     private _createGestionEquipeDetailDialog: boolean;
     private _editGestionEquipeDetailDialog: boolean;
     private _viewGestionEquipeDetailDialog: boolean;
     public editGestionEquipeDetail$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchGestionEquipeDetail:GestionEquipeDetailVo ;

    // methods

    public findAll(){
     return this.http.get<Array<GestionEquipeDetailVo>>(this.API);
    }

    public save(): Observable<GestionEquipeDetailVo> {
         return this.http.post<GestionEquipeDetailVo>(this.API, this.selectedGestionEquipeDetail);
    }

    delete(gestionEquipeDetail: GestionEquipeDetailVo) {
         return this.http.delete<number>(this.API + 'id/' + gestionEquipeDetail.id);
    }


    public edit(): Observable<GestionEquipeDetailVo> {
        return this.http.put<GestionEquipeDetailVo>(this.API, this.selectedGestionEquipeDetail);
    }


     public findByCriteria(gestionEquipeDetail:GestionEquipeDetailVo):Observable<Array<GestionEquipeDetailVo>>{
           return this.http.post<Array<GestionEquipeDetailVo>>(this.API +'search', gestionEquipeDetail);
    }

   public findByIdWithAssociatedList(gestionEquipeDetail:GestionEquipeDetailVo):Observable<GestionEquipeDetailVo>{
         return this.http.get<GestionEquipeDetailVo>(this.API + 'detail/id/' +gestionEquipeDetail.id);
    }

    // getters and setters


    get gestionEquipeDetails(): Array<GestionEquipeDetailVo> {
    if(this._gestionEquipeDetails==null){
    this._gestionEquipeDetails=new Array<GestionEquipeDetailVo>();
    }
return this._gestionEquipeDetails;
       }

    set gestionEquipeDetails(value: Array<GestionEquipeDetailVo>) {
        this._gestionEquipeDetails = value;
       }

    get selectedGestionEquipeDetail(): GestionEquipeDetailVo {
    if(this._selectedGestionEquipeDetail==null){
    this._selectedGestionEquipeDetail=new GestionEquipeDetailVo();
    }
           return this._selectedGestionEquipeDetail;
       }

    set selectedGestionEquipeDetail(value: GestionEquipeDetailVo) {
        this._selectedGestionEquipeDetail = value;
       }

    get gestionEquipeDetailSelections(): Array<GestionEquipeDetailVo> {
    if(this._gestionEquipeDetailSelections==null){
    this._gestionEquipeDetailSelections=new Array<GestionEquipeDetailVo>();
    }
        return this._gestionEquipeDetailSelections;
       }


    set gestionEquipeDetailSelections(value: Array<GestionEquipeDetailVo>) {
        this._gestionEquipeDetailSelections = value;
       }

    get createGestionEquipeDetailDialog(): boolean {
        return this._createGestionEquipeDetailDialog;
       }

    set createGestionEquipeDetailDialog(value: boolean) {
        this._createGestionEquipeDetailDialog = value;
       }

    get editGestionEquipeDetailDialog(): boolean {
        return this._editGestionEquipeDetailDialog;
       }

    set editGestionEquipeDetailDialog(value: boolean) {
        this._editGestionEquipeDetailDialog = value;
       }

    get viewGestionEquipeDetailDialog(): boolean {
        return this._viewGestionEquipeDetailDialog;
       }

    set viewGestionEquipeDetailDialog(value: boolean) {
        this._viewGestionEquipeDetailDialog = value;
       }

     get searchGestionEquipeDetail(): GestionEquipeDetailVo {
     if(this._searchGestionEquipeDetail==null){
    this._searchGestionEquipeDetail=new GestionEquipeDetailVo();
    }
        return this._searchGestionEquipeDetail;
    }

    set searchGestionEquipeDetail(value: GestionEquipeDetailVo) {
        this._searchGestionEquipeDetail = value;
       }

}
