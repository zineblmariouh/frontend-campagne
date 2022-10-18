import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtablissementConsultanceScientifiquePonctuelleVo} from '../model/EtablissementConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleVo} from '../model/ConsultanceScientifiquePonctuelle.model';
import {EtablissementVo} from '../model/Etablissement.model';


@Injectable({
  providedIn: 'root'
})
export class EtablissementConsultanceScientifiquePonctuelleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etablissementConsultanceScientifiquePonctuelle/';
        })
    }
     private _etablissementConsultanceScientifiquePonctuelles: Array<EtablissementConsultanceScientifiquePonctuelleVo> ;
     private _selectedEtablissementConsultanceScientifiquePonctuelle: EtablissementConsultanceScientifiquePonctuelleVo;
     private _etablissementConsultanceScientifiquePonctuelleSelections: Array<EtablissementConsultanceScientifiquePonctuelleVo>;
     private _createEtablissementConsultanceScientifiquePonctuelleDialog: boolean;
     private _editEtablissementConsultanceScientifiquePonctuelleDialog: boolean;
     private _viewEtablissementConsultanceScientifiquePonctuelleDialog: boolean;
     public editEtablissementConsultanceScientifiquePonctuelle$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtablissementConsultanceScientifiquePonctuelle:EtablissementConsultanceScientifiquePonctuelleVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtablissementConsultanceScientifiquePonctuelleVo>>(this.API);
    }

    public save(): Observable<EtablissementConsultanceScientifiquePonctuelleVo> {
         return this.http.post<EtablissementConsultanceScientifiquePonctuelleVo>(this.API, this.selectedEtablissementConsultanceScientifiquePonctuelle);
    }

    delete(etablissementConsultanceScientifiquePonctuelle: EtablissementConsultanceScientifiquePonctuelleVo) {
         return this.http.delete<number>(this.API + 'id/' + etablissementConsultanceScientifiquePonctuelle.id);
    }


    public edit(): Observable<EtablissementConsultanceScientifiquePonctuelleVo> {
        return this.http.put<EtablissementConsultanceScientifiquePonctuelleVo>(this.API, this.selectedEtablissementConsultanceScientifiquePonctuelle);
    }


     public findByCriteria(etablissementConsultanceScientifiquePonctuelle:EtablissementConsultanceScientifiquePonctuelleVo):Observable<Array<EtablissementConsultanceScientifiquePonctuelleVo>>{
           return this.http.post<Array<EtablissementConsultanceScientifiquePonctuelleVo>>(this.API +'search', etablissementConsultanceScientifiquePonctuelle);
    }

   public findByIdWithAssociatedList(etablissementConsultanceScientifiquePonctuelle:EtablissementConsultanceScientifiquePonctuelleVo):Observable<EtablissementConsultanceScientifiquePonctuelleVo>{
         return this.http.get<EtablissementConsultanceScientifiquePonctuelleVo>(this.API + 'detail/id/' +etablissementConsultanceScientifiquePonctuelle.id);
    }

    // getters and setters


    get etablissementConsultanceScientifiquePonctuelles(): Array<EtablissementConsultanceScientifiquePonctuelleVo> {
    if(this._etablissementConsultanceScientifiquePonctuelles==null){
    this._etablissementConsultanceScientifiquePonctuelles=new Array<EtablissementConsultanceScientifiquePonctuelleVo>();
    }
return this._etablissementConsultanceScientifiquePonctuelles;
       }

    set etablissementConsultanceScientifiquePonctuelles(value: Array<EtablissementConsultanceScientifiquePonctuelleVo>) {
        this._etablissementConsultanceScientifiquePonctuelles = value;
       }

    get selectedEtablissementConsultanceScientifiquePonctuelle(): EtablissementConsultanceScientifiquePonctuelleVo {
    if(this._selectedEtablissementConsultanceScientifiquePonctuelle==null){
    this._selectedEtablissementConsultanceScientifiquePonctuelle=new EtablissementConsultanceScientifiquePonctuelleVo();
    }
           return this._selectedEtablissementConsultanceScientifiquePonctuelle;
       }

    set selectedEtablissementConsultanceScientifiquePonctuelle(value: EtablissementConsultanceScientifiquePonctuelleVo) {
        this._selectedEtablissementConsultanceScientifiquePonctuelle = value;
       }

    get etablissementConsultanceScientifiquePonctuelleSelections(): Array<EtablissementConsultanceScientifiquePonctuelleVo> {
    if(this._etablissementConsultanceScientifiquePonctuelleSelections==null){
    this._etablissementConsultanceScientifiquePonctuelleSelections=new Array<EtablissementConsultanceScientifiquePonctuelleVo>();
    }
        return this._etablissementConsultanceScientifiquePonctuelleSelections;
       }


    set etablissementConsultanceScientifiquePonctuelleSelections(value: Array<EtablissementConsultanceScientifiquePonctuelleVo>) {
        this._etablissementConsultanceScientifiquePonctuelleSelections = value;
       }

    get createEtablissementConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._createEtablissementConsultanceScientifiquePonctuelleDialog;
       }

    set createEtablissementConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._createEtablissementConsultanceScientifiquePonctuelleDialog = value;
       }

    get editEtablissementConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._editEtablissementConsultanceScientifiquePonctuelleDialog;
       }

    set editEtablissementConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._editEtablissementConsultanceScientifiquePonctuelleDialog = value;
       }

    get viewEtablissementConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._viewEtablissementConsultanceScientifiquePonctuelleDialog;
       }

    set viewEtablissementConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._viewEtablissementConsultanceScientifiquePonctuelleDialog = value;
       }

     get searchEtablissementConsultanceScientifiquePonctuelle(): EtablissementConsultanceScientifiquePonctuelleVo {
     if(this._searchEtablissementConsultanceScientifiquePonctuelle==null){
    this._searchEtablissementConsultanceScientifiquePonctuelle=new EtablissementConsultanceScientifiquePonctuelleVo();
    }
        return this._searchEtablissementConsultanceScientifiquePonctuelle;
    }

    set searchEtablissementConsultanceScientifiquePonctuelle(value: EtablissementConsultanceScientifiquePonctuelleVo) {
        this._searchEtablissementConsultanceScientifiquePonctuelle = value;
       }

}
