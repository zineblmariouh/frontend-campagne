import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CampagneChercheurOuvertureVo} from '../model/CampagneChercheurOuverture.model';
import {EtatCampagneChercheurVo} from '../model/EtatCampagneChercheur.model';
import {CampagneVo} from '../model/Campagne.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class CampagneChercheurOuvertureService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/campagneChercheurOuverture/';
        })
    }
     private _campagneChercheurOuvertures: Array<CampagneChercheurOuvertureVo> ;
     private _selectedCampagneChercheurOuverture: CampagneChercheurOuvertureVo;
     private _campagneChercheurOuvertureSelections: Array<CampagneChercheurOuvertureVo>;
     private _createCampagneChercheurOuvertureDialog: boolean;
     private _editCampagneChercheurOuvertureDialog: boolean;
     private _viewCampagneChercheurOuvertureDialog: boolean;
     public editCampagneChercheurOuverture$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCampagneChercheurOuverture:CampagneChercheurOuvertureVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CampagneChercheurOuvertureVo>>(this.API);
    }

    public save(): Observable<CampagneChercheurOuvertureVo> {
           return this.http.post<CampagneChercheurOuvertureVo>(this.API, {...this.selectedCampagneChercheurOuverture,dateEnvoi: moment(this.selectedCampagneChercheurOuverture.dateEnvoi).format("YYYY-MM-DD")});
    }

    delete(campagneChercheurOuverture: CampagneChercheurOuvertureVo) {
         return this.http.delete<number>(this.API + 'id/' + campagneChercheurOuverture.id);
    }


    public edit(): Observable<CampagneChercheurOuvertureVo> {
        return this.http.put<CampagneChercheurOuvertureVo>(this.API, this.selectedCampagneChercheurOuverture);
    }


     public findByCriteria(campagneChercheurOuverture:CampagneChercheurOuvertureVo):Observable<Array<CampagneChercheurOuvertureVo>>{
           return this.http.post<Array<CampagneChercheurOuvertureVo>>(this.API +'search', campagneChercheurOuverture);
    }

   public findByIdWithAssociatedList(campagneChercheurOuverture:CampagneChercheurOuvertureVo):Observable<CampagneChercheurOuvertureVo>{
         return this.http.get<CampagneChercheurOuvertureVo>(this.API + 'detail/id/' +campagneChercheurOuverture.id);
    }

    // getters and setters


    get campagneChercheurOuvertures(): Array<CampagneChercheurOuvertureVo> {
    if(this._campagneChercheurOuvertures==null){
    this._campagneChercheurOuvertures=new Array<CampagneChercheurOuvertureVo>();
    }
return this._campagneChercheurOuvertures;
       }

    set campagneChercheurOuvertures(value: Array<CampagneChercheurOuvertureVo>) {
        this._campagneChercheurOuvertures = value;
       }

    get selectedCampagneChercheurOuverture(): CampagneChercheurOuvertureVo {
    if(this._selectedCampagneChercheurOuverture==null){
    this._selectedCampagneChercheurOuverture=new CampagneChercheurOuvertureVo();
    }
           return this._selectedCampagneChercheurOuverture;
       }

    set selectedCampagneChercheurOuverture(value: CampagneChercheurOuvertureVo) {
        this._selectedCampagneChercheurOuverture = value;
       }

    get campagneChercheurOuvertureSelections(): Array<CampagneChercheurOuvertureVo> {
    if(this._campagneChercheurOuvertureSelections==null){
    this._campagneChercheurOuvertureSelections=new Array<CampagneChercheurOuvertureVo>();
    }
        return this._campagneChercheurOuvertureSelections;
       }


    set campagneChercheurOuvertureSelections(value: Array<CampagneChercheurOuvertureVo>) {
        this._campagneChercheurOuvertureSelections = value;
       }

    get createCampagneChercheurOuvertureDialog(): boolean {
        return this._createCampagneChercheurOuvertureDialog;
       }

    set createCampagneChercheurOuvertureDialog(value: boolean) {
        this._createCampagneChercheurOuvertureDialog = value;
       }

    get editCampagneChercheurOuvertureDialog(): boolean {
        return this._editCampagneChercheurOuvertureDialog;
       }

    set editCampagneChercheurOuvertureDialog(value: boolean) {
        this._editCampagneChercheurOuvertureDialog = value;
       }

    get viewCampagneChercheurOuvertureDialog(): boolean {
        return this._viewCampagneChercheurOuvertureDialog;
       }

    set viewCampagneChercheurOuvertureDialog(value: boolean) {
        this._viewCampagneChercheurOuvertureDialog = value;
       }

     get searchCampagneChercheurOuverture(): CampagneChercheurOuvertureVo {
     if(this._searchCampagneChercheurOuverture==null){
    this._searchCampagneChercheurOuverture=new CampagneChercheurOuvertureVo();
    }
        return this._searchCampagneChercheurOuverture;
    }

    set searchCampagneChercheurOuverture(value: CampagneChercheurOuvertureVo) {
        this._searchCampagneChercheurOuverture = value;
       }

}
