import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeveloppementDeSavoirEtInnovationScientifiquePaysVo} from '../model/DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class DeveloppementDeSavoirEtInnovationScientifiquePaysService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/developpementDeSavoirEtInnovationScientifiquePays/';
        })
    }
     private _developpementDeSavoirEtInnovationScientifiquePayss: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> ;
     private _selectedDeveloppementDeSavoirEtInnovationScientifiquePays: DeveloppementDeSavoirEtInnovationScientifiquePaysVo;
     private _developpementDeSavoirEtInnovationScientifiquePaysSelections: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>;
     private _createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog: boolean;
     private _editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog: boolean;
     private _viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog: boolean;
     public editDeveloppementDeSavoirEtInnovationScientifiquePays$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDeveloppementDeSavoirEtInnovationScientifiquePays:DeveloppementDeSavoirEtInnovationScientifiquePaysVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>>(this.API);
    }

    public save(): Observable<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {
         return this.http.post<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiquePays);
    }

    delete(developpementDeSavoirEtInnovationScientifiquePays: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {
         return this.http.delete<number>(this.API + 'id/' + developpementDeSavoirEtInnovationScientifiquePays.id);
    }


    public edit(): Observable<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {
        return this.http.put<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiquePays);
    }


     public findByCriteria(developpementDeSavoirEtInnovationScientifiquePays:DeveloppementDeSavoirEtInnovationScientifiquePaysVo):Observable<Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>>{
           return this.http.post<Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>>(this.API +'search', developpementDeSavoirEtInnovationScientifiquePays);
    }

   public findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiquePays:DeveloppementDeSavoirEtInnovationScientifiquePaysVo):Observable<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>{
         return this.http.get<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>(this.API + 'detail/id/' +developpementDeSavoirEtInnovationScientifiquePays.id);
    }

    // getters and setters


    get developpementDeSavoirEtInnovationScientifiquePayss(): Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {
    if(this._developpementDeSavoirEtInnovationScientifiquePayss==null){
    this._developpementDeSavoirEtInnovationScientifiquePayss=new Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>();
    }
return this._developpementDeSavoirEtInnovationScientifiquePayss;
       }

    set developpementDeSavoirEtInnovationScientifiquePayss(value: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>) {
        this._developpementDeSavoirEtInnovationScientifiquePayss = value;
       }

    get selectedDeveloppementDeSavoirEtInnovationScientifiquePays(): DeveloppementDeSavoirEtInnovationScientifiquePaysVo {
    if(this._selectedDeveloppementDeSavoirEtInnovationScientifiquePays==null){
    this._selectedDeveloppementDeSavoirEtInnovationScientifiquePays=new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
    }
           return this._selectedDeveloppementDeSavoirEtInnovationScientifiquePays;
       }

    set selectedDeveloppementDeSavoirEtInnovationScientifiquePays(value: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {
        this._selectedDeveloppementDeSavoirEtInnovationScientifiquePays = value;
       }

    get developpementDeSavoirEtInnovationScientifiquePaysSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {
    if(this._developpementDeSavoirEtInnovationScientifiquePaysSelections==null){
    this._developpementDeSavoirEtInnovationScientifiquePaysSelections=new Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>();
    }
        return this._developpementDeSavoirEtInnovationScientifiquePaysSelections;
       }


    set developpementDeSavoirEtInnovationScientifiquePaysSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>) {
        this._developpementDeSavoirEtInnovationScientifiquePaysSelections = value;
       }

    get createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(): boolean {
        return this._createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog;
       }

    set createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(value: boolean) {
        this._createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog = value;
       }

    get editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(): boolean {
        return this._editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog;
       }

    set editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(value: boolean) {
        this._editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog = value;
       }

    get viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(): boolean {
        return this._viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog;
       }

    set viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(value: boolean) {
        this._viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog = value;
       }

     get searchDeveloppementDeSavoirEtInnovationScientifiquePays(): DeveloppementDeSavoirEtInnovationScientifiquePaysVo {
     if(this._searchDeveloppementDeSavoirEtInnovationScientifiquePays==null){
    this._searchDeveloppementDeSavoirEtInnovationScientifiquePays=new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
    }
        return this._searchDeveloppementDeSavoirEtInnovationScientifiquePays;
    }

    set searchDeveloppementDeSavoirEtInnovationScientifiquePays(value: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {
        this._searchDeveloppementDeSavoirEtInnovationScientifiquePays = value;
       }

}
