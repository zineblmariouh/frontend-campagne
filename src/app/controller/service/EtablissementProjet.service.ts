import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtablissementProjetVo} from '../model/EtablissementProjet.model';
import {VilleVo} from '../model/Ville.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class EtablissementProjetService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etablissementProjet/';
        })
    }
     private _etablissementProjets: Array<EtablissementProjetVo> ;
     private _selectedEtablissementProjet: EtablissementProjetVo;
     private _etablissementProjetSelections: Array<EtablissementProjetVo>;
     private _createEtablissementProjetDialog: boolean;
     private _editEtablissementProjetDialog: boolean;
     private _viewEtablissementProjetDialog: boolean;
     public editEtablissementProjet$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtablissementProjet:EtablissementProjetVo ;

    // methods
    public archiver(etablissementProjet: EtablissementProjetVo): Observable<EtablissementProjetVo> {
        return this.http.put<EtablissementProjetVo>(this.API + 'archiver/' ,etablissementProjet);
    }
    public desarchiver(etablissementProjet: EtablissementProjetVo): Observable<EtablissementProjetVo> {
    return this.http.put<EtablissementProjetVo>(this.API + 'desarchiver/' ,etablissementProjet);
    }

    public findAll(){
     return this.http.get<Array<EtablissementProjetVo>>(this.API);
    }

    public save(): Observable<EtablissementProjetVo> {
           return this.http.post<EtablissementProjetVo>(this.API, {...this.selectedEtablissementProjet,dateCreation: moment(this.selectedEtablissementProjet.dateCreation).format("YYYY-MM-DD")});
    }

    delete(etablissementProjet: EtablissementProjetVo) {
         return this.http.delete<number>(this.API + 'id/' + etablissementProjet.id);
    }


    public edit(): Observable<EtablissementProjetVo> {
        return this.http.put<EtablissementProjetVo>(this.API, this.selectedEtablissementProjet);
    }


     public findByCriteria(etablissementProjet:EtablissementProjetVo):Observable<Array<EtablissementProjetVo>>{
           return this.http.post<Array<EtablissementProjetVo>>(this.API +'search', etablissementProjet);
    }

   public findByIdWithAssociatedList(etablissementProjet:EtablissementProjetVo):Observable<EtablissementProjetVo>{
         return this.http.get<EtablissementProjetVo>(this.API + 'detail/id/' +etablissementProjet.id);
    }

    // getters and setters


    get etablissementProjets(): Array<EtablissementProjetVo> {
    if(this._etablissementProjets==null){
    this._etablissementProjets=new Array<EtablissementProjetVo>();
    }
return this._etablissementProjets;
       }

    set etablissementProjets(value: Array<EtablissementProjetVo>) {
        this._etablissementProjets = value;
       }

    get selectedEtablissementProjet(): EtablissementProjetVo {
    if(this._selectedEtablissementProjet==null){
    this._selectedEtablissementProjet=new EtablissementProjetVo();
    }
           return this._selectedEtablissementProjet;
       }

    set selectedEtablissementProjet(value: EtablissementProjetVo) {
        this._selectedEtablissementProjet = value;
       }

    get etablissementProjetSelections(): Array<EtablissementProjetVo> {
    if(this._etablissementProjetSelections==null){
    this._etablissementProjetSelections=new Array<EtablissementProjetVo>();
    }
        return this._etablissementProjetSelections;
       }


    set etablissementProjetSelections(value: Array<EtablissementProjetVo>) {
        this._etablissementProjetSelections = value;
       }

    get createEtablissementProjetDialog(): boolean {
        return this._createEtablissementProjetDialog;
       }

    set createEtablissementProjetDialog(value: boolean) {
        this._createEtablissementProjetDialog = value;
       }

    get editEtablissementProjetDialog(): boolean {
        return this._editEtablissementProjetDialog;
       }

    set editEtablissementProjetDialog(value: boolean) {
        this._editEtablissementProjetDialog = value;
       }

    get viewEtablissementProjetDialog(): boolean {
        return this._viewEtablissementProjetDialog;
       }

    set viewEtablissementProjetDialog(value: boolean) {
        this._viewEtablissementProjetDialog = value;
       }

     get searchEtablissementProjet(): EtablissementProjetVo {
     if(this._searchEtablissementProjet==null){
    this._searchEtablissementProjet=new EtablissementProjetVo();
    }
        return this._searchEtablissementProjet;
    }

    set searchEtablissementProjet(value: EtablissementProjetVo) {
        this._searchEtablissementProjet = value;
       }

}
