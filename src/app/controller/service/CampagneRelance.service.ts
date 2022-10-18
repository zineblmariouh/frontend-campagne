import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CampagneRelanceVo} from '../model/CampagneRelance.model';
import {CampagneRelanceChercheurVo} from '../model/CampagneRelanceChercheur.model';
import {TemplateRelanceVo} from '../model/TemplateRelance.model';
import {CampagneVo} from '../model/Campagne.model';


@Injectable({
  providedIn: 'root'
})
export class CampagneRelanceService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/campagneRelance/';
        })
    }
     private _campagneRelances: Array<CampagneRelanceVo> ;
     private _selectedCampagneRelance: CampagneRelanceVo;
     private _campagneRelanceSelections: Array<CampagneRelanceVo>;
     private _createCampagneRelanceDialog: boolean;
     private _editCampagneRelanceDialog: boolean;
     private _viewCampagneRelanceDialog: boolean;
     public editCampagneRelance$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCampagneRelance:CampagneRelanceVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CampagneRelanceVo>>(this.API);
    }

    public save(): Observable<CampagneRelanceVo> {
           return this.http.post<CampagneRelanceVo>(this.API, {...this.selectedCampagneRelance,dateRelance: moment(this.selectedCampagneRelance.dateRelance).format("YYYY-MM-DD")});
    }

    delete(campagneRelance: CampagneRelanceVo) {
         return this.http.delete<number>(this.API + 'id/' + campagneRelance.id);
    }


    public edit(): Observable<CampagneRelanceVo> {
        return this.http.put<CampagneRelanceVo>(this.API, this.selectedCampagneRelance);
    }


     public findByCriteria(campagneRelance:CampagneRelanceVo):Observable<Array<CampagneRelanceVo>>{
           return this.http.post<Array<CampagneRelanceVo>>(this.API +'search', campagneRelance);
    }

   public findByIdWithAssociatedList(campagneRelance:CampagneRelanceVo):Observable<CampagneRelanceVo>{
         return this.http.get<CampagneRelanceVo>(this.API + 'detail/id/' +campagneRelance.id);
    }

    // getters and setters


    get campagneRelances(): Array<CampagneRelanceVo> {
    if(this._campagneRelances==null){
    this._campagneRelances=new Array<CampagneRelanceVo>();
    }
return this._campagneRelances;
       }

    set campagneRelances(value: Array<CampagneRelanceVo>) {
        this._campagneRelances = value;
       }

    get selectedCampagneRelance(): CampagneRelanceVo {
    if(this._selectedCampagneRelance==null){
    this._selectedCampagneRelance=new CampagneRelanceVo();
    }
           return this._selectedCampagneRelance;
       }

    set selectedCampagneRelance(value: CampagneRelanceVo) {
        this._selectedCampagneRelance = value;
       }

    get campagneRelanceSelections(): Array<CampagneRelanceVo> {
    if(this._campagneRelanceSelections==null){
    this._campagneRelanceSelections=new Array<CampagneRelanceVo>();
    }
        return this._campagneRelanceSelections;
       }


    set campagneRelanceSelections(value: Array<CampagneRelanceVo>) {
        this._campagneRelanceSelections = value;
       }

    get createCampagneRelanceDialog(): boolean {
        return this._createCampagneRelanceDialog;
       }

    set createCampagneRelanceDialog(value: boolean) {
        this._createCampagneRelanceDialog = value;
       }

    get editCampagneRelanceDialog(): boolean {
        return this._editCampagneRelanceDialog;
       }

    set editCampagneRelanceDialog(value: boolean) {
        this._editCampagneRelanceDialog = value;
       }

    get viewCampagneRelanceDialog(): boolean {
        return this._viewCampagneRelanceDialog;
       }

    set viewCampagneRelanceDialog(value: boolean) {
        this._viewCampagneRelanceDialog = value;
       }

     get searchCampagneRelance(): CampagneRelanceVo {
     if(this._searchCampagneRelance==null){
    this._searchCampagneRelance=new CampagneRelanceVo();
    }
        return this._searchCampagneRelance;
    }

    set searchCampagneRelance(value: CampagneRelanceVo) {
        this._searchCampagneRelance = value;
       }

}
