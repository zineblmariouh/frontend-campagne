import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CampagneRappelVo} from '../model/CampagneRappel.model';
import {CampagneRappelChercheurVo} from '../model/CampagneRappelChercheur.model';
import {TemplateRappelVo} from '../model/TemplateRappel.model';
import {CampagneVo} from '../model/Campagne.model';


@Injectable({
  providedIn: 'root'
})
export class CampagneRappelService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/campagneRappel/';
        })
    }
     private _campagneRappels: Array<CampagneRappelVo> ;
     private _selectedCampagneRappel: CampagneRappelVo;
     private _campagneRappelSelections: Array<CampagneRappelVo>;
     private _createCampagneRappelDialog: boolean;
     private _editCampagneRappelDialog: boolean;
     private _viewCampagneRappelDialog: boolean;
     public editCampagneRappel$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCampagneRappel:CampagneRappelVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CampagneRappelVo>>(this.API);
    }

    public save(): Observable<CampagneRappelVo> {
           return this.http.post<CampagneRappelVo>(this.API, {...this.selectedCampagneRappel,dateRappel: moment(this.selectedCampagneRappel.dateRappel).format("YYYY-MM-DD")});
    }

    delete(campagneRappel: CampagneRappelVo) {
         return this.http.delete<number>(this.API + 'id/' + campagneRappel.id);
    }


    public edit(): Observable<CampagneRappelVo> {
        return this.http.put<CampagneRappelVo>(this.API, this.selectedCampagneRappel);
    }


     public findByCriteria(campagneRappel:CampagneRappelVo):Observable<Array<CampagneRappelVo>>{
           return this.http.post<Array<CampagneRappelVo>>(this.API +'search', campagneRappel);
    }

   public findByIdWithAssociatedList(campagneRappel:CampagneRappelVo):Observable<CampagneRappelVo>{
         return this.http.get<CampagneRappelVo>(this.API + 'detail/id/' +campagneRappel.id);
    }

    // getters and setters


    get campagneRappels(): Array<CampagneRappelVo> {
    if(this._campagneRappels==null){
    this._campagneRappels=new Array<CampagneRappelVo>();
    }
return this._campagneRappels;
       }

    set campagneRappels(value: Array<CampagneRappelVo>) {
        this._campagneRappels = value;
       }

    get selectedCampagneRappel(): CampagneRappelVo {
    if(this._selectedCampagneRappel==null){
    this._selectedCampagneRappel=new CampagneRappelVo();
    }
           return this._selectedCampagneRappel;
       }

    set selectedCampagneRappel(value: CampagneRappelVo) {
        this._selectedCampagneRappel = value;
       }

    get campagneRappelSelections(): Array<CampagneRappelVo> {
    if(this._campagneRappelSelections==null){
    this._campagneRappelSelections=new Array<CampagneRappelVo>();
    }
        return this._campagneRappelSelections;
       }


    set campagneRappelSelections(value: Array<CampagneRappelVo>) {
        this._campagneRappelSelections = value;
       }

    get createCampagneRappelDialog(): boolean {
        return this._createCampagneRappelDialog;
       }

    set createCampagneRappelDialog(value: boolean) {
        this._createCampagneRappelDialog = value;
       }

    get editCampagneRappelDialog(): boolean {
        return this._editCampagneRappelDialog;
       }

    set editCampagneRappelDialog(value: boolean) {
        this._editCampagneRappelDialog = value;
       }

    get viewCampagneRappelDialog(): boolean {
        return this._viewCampagneRappelDialog;
       }

    set viewCampagneRappelDialog(value: boolean) {
        this._viewCampagneRappelDialog = value;
       }

     get searchCampagneRappel(): CampagneRappelVo {
     if(this._searchCampagneRappel==null){
    this._searchCampagneRappel=new CampagneRappelVo();
    }
        return this._searchCampagneRappel;
    }

    set searchCampagneRappel(value: CampagneRappelVo) {
        this._searchCampagneRappel = value;
       }

}
