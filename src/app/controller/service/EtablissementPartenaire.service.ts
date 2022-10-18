import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtablissementPartenaireVo} from '../model/EtablissementPartenaire.model';


@Injectable({
  providedIn: 'root'
})
export class EtablissementPartenaireService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etablissementPartenaire/';
        })
    }
     private _etablissementPartenaires: Array<EtablissementPartenaireVo> ;
     private _selectedEtablissementPartenaire: EtablissementPartenaireVo;
     private _etablissementPartenaireSelections: Array<EtablissementPartenaireVo>;
     private _createEtablissementPartenaireDialog: boolean;
     private _editEtablissementPartenaireDialog: boolean;
     private _viewEtablissementPartenaireDialog: boolean;
     public editEtablissementPartenaire$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtablissementPartenaire:EtablissementPartenaireVo ;

    // methods
    public archiver(etablissementPartenaire: EtablissementPartenaireVo): Observable<EtablissementPartenaireVo> {
        return this.http.put<EtablissementPartenaireVo>(this.API + 'archiver/' ,etablissementPartenaire);
    }
    public desarchiver(etablissementPartenaire: EtablissementPartenaireVo): Observable<EtablissementPartenaireVo> {
    return this.http.put<EtablissementPartenaireVo>(this.API + 'desarchiver/' ,etablissementPartenaire);
    }

    public findAll(){
     return this.http.get<Array<EtablissementPartenaireVo>>(this.API);
    }

    public save(): Observable<EtablissementPartenaireVo> {
           return this.http.post<EtablissementPartenaireVo>(this.API, {...this.selectedEtablissementPartenaire,dateCreation: moment(this.selectedEtablissementPartenaire.dateCreation).format("YYYY-MM-DD")});
    }

    delete(etablissementPartenaire: EtablissementPartenaireVo) {
         return this.http.delete<number>(this.API + 'id/' + etablissementPartenaire.id);
    }


    public edit(): Observable<EtablissementPartenaireVo> {
        return this.http.put<EtablissementPartenaireVo>(this.API, this.selectedEtablissementPartenaire);
    }


     public findByCriteria(etablissementPartenaire:EtablissementPartenaireVo):Observable<Array<EtablissementPartenaireVo>>{
           return this.http.post<Array<EtablissementPartenaireVo>>(this.API +'search', etablissementPartenaire);
    }

   public findByIdWithAssociatedList(etablissementPartenaire:EtablissementPartenaireVo):Observable<EtablissementPartenaireVo>{
         return this.http.get<EtablissementPartenaireVo>(this.API + 'detail/id/' +etablissementPartenaire.id);
    }

    // getters and setters


    get etablissementPartenaires(): Array<EtablissementPartenaireVo> {
    if(this._etablissementPartenaires==null){
    this._etablissementPartenaires=new Array<EtablissementPartenaireVo>();
    }
return this._etablissementPartenaires;
       }

    set etablissementPartenaires(value: Array<EtablissementPartenaireVo>) {
        this._etablissementPartenaires = value;
       }

    get selectedEtablissementPartenaire(): EtablissementPartenaireVo {
    if(this._selectedEtablissementPartenaire==null){
    this._selectedEtablissementPartenaire=new EtablissementPartenaireVo();
    }
           return this._selectedEtablissementPartenaire;
       }

    set selectedEtablissementPartenaire(value: EtablissementPartenaireVo) {
        this._selectedEtablissementPartenaire = value;
       }

    get etablissementPartenaireSelections(): Array<EtablissementPartenaireVo> {
    if(this._etablissementPartenaireSelections==null){
    this._etablissementPartenaireSelections=new Array<EtablissementPartenaireVo>();
    }
        return this._etablissementPartenaireSelections;
       }


    set etablissementPartenaireSelections(value: Array<EtablissementPartenaireVo>) {
        this._etablissementPartenaireSelections = value;
       }

    get createEtablissementPartenaireDialog(): boolean {
        return this._createEtablissementPartenaireDialog;
       }

    set createEtablissementPartenaireDialog(value: boolean) {
        this._createEtablissementPartenaireDialog = value;
       }

    get editEtablissementPartenaireDialog(): boolean {
        return this._editEtablissementPartenaireDialog;
       }

    set editEtablissementPartenaireDialog(value: boolean) {
        this._editEtablissementPartenaireDialog = value;
       }

    get viewEtablissementPartenaireDialog(): boolean {
        return this._viewEtablissementPartenaireDialog;
       }

    set viewEtablissementPartenaireDialog(value: boolean) {
        this._viewEtablissementPartenaireDialog = value;
       }

     get searchEtablissementPartenaire(): EtablissementPartenaireVo {
     if(this._searchEtablissementPartenaire==null){
    this._searchEtablissementPartenaire=new EtablissementPartenaireVo();
    }
        return this._searchEtablissementPartenaire;
    }

    set searchEtablissementPartenaire(value: EtablissementPartenaireVo) {
        this._searchEtablissementPartenaire = value;
       }

}
