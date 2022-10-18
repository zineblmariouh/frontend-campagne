import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatCampagneVo} from '../model/EtatCampagne.model';


@Injectable({
  providedIn: 'root'
})
export class EtatCampagneService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatCampagne/';
        })
    }
     private _etatCampagnes: Array<EtatCampagneVo> ;
     private _selectedEtatCampagne: EtatCampagneVo;
     private _etatCampagneSelections: Array<EtatCampagneVo>;
     private _createEtatCampagneDialog: boolean;
     private _editEtatCampagneDialog: boolean;
     private _viewEtatCampagneDialog: boolean;
     public editEtatCampagne$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatCampagne:EtatCampagneVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatCampagneVo>>(this.API);
    }

    public save(): Observable<EtatCampagneVo> {
         return this.http.post<EtatCampagneVo>(this.API, this.selectedEtatCampagne);
    }

    delete(etatCampagne: EtatCampagneVo) {
         return this.http.delete<number>(this.API + 'id/' + etatCampagne.id);
    }


    public edit(): Observable<EtatCampagneVo> {
        return this.http.put<EtatCampagneVo>(this.API, this.selectedEtatCampagne);
    }


     public findByCriteria(etatCampagne:EtatCampagneVo):Observable<Array<EtatCampagneVo>>{
           return this.http.post<Array<EtatCampagneVo>>(this.API +'search', etatCampagne);
    }

   public findByIdWithAssociatedList(etatCampagne:EtatCampagneVo):Observable<EtatCampagneVo>{
         return this.http.get<EtatCampagneVo>(this.API + 'detail/id/' +etatCampagne.id);
    }

    // getters and setters


    get etatCampagnes(): Array<EtatCampagneVo> {
    if(this._etatCampagnes==null){
    this._etatCampagnes=new Array<EtatCampagneVo>();
    }
return this._etatCampagnes;
       }

    set etatCampagnes(value: Array<EtatCampagneVo>) {
        this._etatCampagnes = value;
       }

    get selectedEtatCampagne(): EtatCampagneVo {
    if(this._selectedEtatCampagne==null){
    this._selectedEtatCampagne=new EtatCampagneVo();
    }
           return this._selectedEtatCampagne;
       }

    set selectedEtatCampagne(value: EtatCampagneVo) {
        this._selectedEtatCampagne = value;
       }

    get etatCampagneSelections(): Array<EtatCampagneVo> {
    if(this._etatCampagneSelections==null){
    this._etatCampagneSelections=new Array<EtatCampagneVo>();
    }
        return this._etatCampagneSelections;
       }


    set etatCampagneSelections(value: Array<EtatCampagneVo>) {
        this._etatCampagneSelections = value;
       }

    get createEtatCampagneDialog(): boolean {
        return this._createEtatCampagneDialog;
       }

    set createEtatCampagneDialog(value: boolean) {
        this._createEtatCampagneDialog = value;
       }

    get editEtatCampagneDialog(): boolean {
        return this._editEtatCampagneDialog;
       }

    set editEtatCampagneDialog(value: boolean) {
        this._editEtatCampagneDialog = value;
       }

    get viewEtatCampagneDialog(): boolean {
        return this._viewEtatCampagneDialog;
       }

    set viewEtatCampagneDialog(value: boolean) {
        this._viewEtatCampagneDialog = value;
       }

     get searchEtatCampagne(): EtatCampagneVo {
     if(this._searchEtatCampagne==null){
    this._searchEtatCampagne=new EtatCampagneVo();
    }
        return this._searchEtatCampagne;
    }

    set searchEtatCampagne(value: EtatCampagneVo) {
        this._searchEtatCampagne = value;
       }

}
