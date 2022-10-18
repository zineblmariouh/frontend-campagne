import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CampagneChercheurFermetureVo} from '../model/CampagneChercheurFermeture.model';
import {CampagneVo} from '../model/Campagne.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class CampagneChercheurFermetureService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/campagneChercheurFermeture/';
        })
    }
     private _campagneChercheurFermetures: Array<CampagneChercheurFermetureVo> ;
     private _selectedCampagneChercheurFermeture: CampagneChercheurFermetureVo;
     private _campagneChercheurFermetureSelections: Array<CampagneChercheurFermetureVo>;
     private _createCampagneChercheurFermetureDialog: boolean;
     private _editCampagneChercheurFermetureDialog: boolean;
     private _viewCampagneChercheurFermetureDialog: boolean;
     public editCampagneChercheurFermeture$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCampagneChercheurFermeture:CampagneChercheurFermetureVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CampagneChercheurFermetureVo>>(this.API);
    }

    public save(): Observable<CampagneChercheurFermetureVo> {
           return this.http.post<CampagneChercheurFermetureVo>(this.API, {...this.selectedCampagneChercheurFermeture,dateEnvoi: moment(this.selectedCampagneChercheurFermeture.dateEnvoi).format("YYYY-MM-DD")});
    }

    delete(campagneChercheurFermeture: CampagneChercheurFermetureVo) {
         return this.http.delete<number>(this.API + 'id/' + campagneChercheurFermeture.id);
    }


    public edit(): Observable<CampagneChercheurFermetureVo> {
        return this.http.put<CampagneChercheurFermetureVo>(this.API, this.selectedCampagneChercheurFermeture);
    }


     public findByCriteria(campagneChercheurFermeture:CampagneChercheurFermetureVo):Observable<Array<CampagneChercheurFermetureVo>>{
           return this.http.post<Array<CampagneChercheurFermetureVo>>(this.API +'search', campagneChercheurFermeture);
    }

   public findByIdWithAssociatedList(campagneChercheurFermeture:CampagneChercheurFermetureVo):Observable<CampagneChercheurFermetureVo>{
         return this.http.get<CampagneChercheurFermetureVo>(this.API + 'detail/id/' +campagneChercheurFermeture.id);
    }

    // getters and setters


    get campagneChercheurFermetures(): Array<CampagneChercheurFermetureVo> {
    if(this._campagneChercheurFermetures==null){
    this._campagneChercheurFermetures=new Array<CampagneChercheurFermetureVo>();
    }
return this._campagneChercheurFermetures;
       }

    set campagneChercheurFermetures(value: Array<CampagneChercheurFermetureVo>) {
        this._campagneChercheurFermetures = value;
       }

    get selectedCampagneChercheurFermeture(): CampagneChercheurFermetureVo {
    if(this._selectedCampagneChercheurFermeture==null){
    this._selectedCampagneChercheurFermeture=new CampagneChercheurFermetureVo();
    }
           return this._selectedCampagneChercheurFermeture;
       }

    set selectedCampagneChercheurFermeture(value: CampagneChercheurFermetureVo) {
        this._selectedCampagneChercheurFermeture = value;
       }

    get campagneChercheurFermetureSelections(): Array<CampagneChercheurFermetureVo> {
    if(this._campagneChercheurFermetureSelections==null){
    this._campagneChercheurFermetureSelections=new Array<CampagneChercheurFermetureVo>();
    }
        return this._campagneChercheurFermetureSelections;
       }


    set campagneChercheurFermetureSelections(value: Array<CampagneChercheurFermetureVo>) {
        this._campagneChercheurFermetureSelections = value;
       }

    get createCampagneChercheurFermetureDialog(): boolean {
        return this._createCampagneChercheurFermetureDialog;
       }

    set createCampagneChercheurFermetureDialog(value: boolean) {
        this._createCampagneChercheurFermetureDialog = value;
       }

    get editCampagneChercheurFermetureDialog(): boolean {
        return this._editCampagneChercheurFermetureDialog;
       }

    set editCampagneChercheurFermetureDialog(value: boolean) {
        this._editCampagneChercheurFermetureDialog = value;
       }

    get viewCampagneChercheurFermetureDialog(): boolean {
        return this._viewCampagneChercheurFermetureDialog;
       }

    set viewCampagneChercheurFermetureDialog(value: boolean) {
        this._viewCampagneChercheurFermetureDialog = value;
       }

     get searchCampagneChercheurFermeture(): CampagneChercheurFermetureVo {
     if(this._searchCampagneChercheurFermeture==null){
    this._searchCampagneChercheurFermeture=new CampagneChercheurFermetureVo();
    }
        return this._searchCampagneChercheurFermeture;
    }

    set searchCampagneChercheurFermeture(value: CampagneChercheurFermetureVo) {
        this._searchCampagneChercheurFermeture = value;
       }

}
