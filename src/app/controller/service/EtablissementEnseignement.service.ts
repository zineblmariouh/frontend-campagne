import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtablissementEnseignementVo} from '../model/EtablissementEnseignement.model';
import {EnseignementVo} from '../model/Enseignement.model';
import {EtablissementVo} from '../model/Etablissement.model';


@Injectable({
  providedIn: 'root'
})
export class EtablissementEnseignementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etablissementEnseignement/';
        })
    }
     private _etablissementEnseignements: Array<EtablissementEnseignementVo> ;
     private _selectedEtablissementEnseignement: EtablissementEnseignementVo;
     private _etablissementEnseignementSelections: Array<EtablissementEnseignementVo>;
     private _createEtablissementEnseignementDialog: boolean;
     private _editEtablissementEnseignementDialog: boolean;
     private _viewEtablissementEnseignementDialog: boolean;
     public editEtablissementEnseignement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtablissementEnseignement:EtablissementEnseignementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtablissementEnseignementVo>>(this.API);
    }

    public save(): Observable<EtablissementEnseignementVo> {
         return this.http.post<EtablissementEnseignementVo>(this.API, this.selectedEtablissementEnseignement);
    }

    delete(etablissementEnseignement: EtablissementEnseignementVo) {
         return this.http.delete<number>(this.API + 'id/' + etablissementEnseignement.id);
    }


    public edit(): Observable<EtablissementEnseignementVo> {
        return this.http.put<EtablissementEnseignementVo>(this.API, this.selectedEtablissementEnseignement);
    }


     public findByCriteria(etablissementEnseignement:EtablissementEnseignementVo):Observable<Array<EtablissementEnseignementVo>>{
           return this.http.post<Array<EtablissementEnseignementVo>>(this.API +'search', etablissementEnseignement);
    }

   public findByIdWithAssociatedList(etablissementEnseignement:EtablissementEnseignementVo):Observable<EtablissementEnseignementVo>{
         return this.http.get<EtablissementEnseignementVo>(this.API + 'detail/id/' +etablissementEnseignement.id);
    }

    // getters and setters


    get etablissementEnseignements(): Array<EtablissementEnseignementVo> {
    if(this._etablissementEnseignements==null){
    this._etablissementEnseignements=new Array<EtablissementEnseignementVo>();
    }
return this._etablissementEnseignements;
       }

    set etablissementEnseignements(value: Array<EtablissementEnseignementVo>) {
        this._etablissementEnseignements = value;
       }

    get selectedEtablissementEnseignement(): EtablissementEnseignementVo {
    if(this._selectedEtablissementEnseignement==null){
    this._selectedEtablissementEnseignement=new EtablissementEnseignementVo();
    }
           return this._selectedEtablissementEnseignement;
       }

    set selectedEtablissementEnseignement(value: EtablissementEnseignementVo) {
        this._selectedEtablissementEnseignement = value;
       }

    get etablissementEnseignementSelections(): Array<EtablissementEnseignementVo> {
    if(this._etablissementEnseignementSelections==null){
    this._etablissementEnseignementSelections=new Array<EtablissementEnseignementVo>();
    }
        return this._etablissementEnseignementSelections;
       }


    set etablissementEnseignementSelections(value: Array<EtablissementEnseignementVo>) {
        this._etablissementEnseignementSelections = value;
       }

    get createEtablissementEnseignementDialog(): boolean {
        return this._createEtablissementEnseignementDialog;
       }

    set createEtablissementEnseignementDialog(value: boolean) {
        this._createEtablissementEnseignementDialog = value;
       }

    get editEtablissementEnseignementDialog(): boolean {
        return this._editEtablissementEnseignementDialog;
       }

    set editEtablissementEnseignementDialog(value: boolean) {
        this._editEtablissementEnseignementDialog = value;
       }

    get viewEtablissementEnseignementDialog(): boolean {
        return this._viewEtablissementEnseignementDialog;
       }

    set viewEtablissementEnseignementDialog(value: boolean) {
        this._viewEtablissementEnseignementDialog = value;
       }

     get searchEtablissementEnseignement(): EtablissementEnseignementVo {
     if(this._searchEtablissementEnseignement==null){
    this._searchEtablissementEnseignement=new EtablissementEnseignementVo();
    }
        return this._searchEtablissementEnseignement;
    }

    set searchEtablissementEnseignement(value: EtablissementEnseignementVo) {
        this._searchEtablissementEnseignement = value;
       }

}
