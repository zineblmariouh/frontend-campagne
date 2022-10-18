import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {StatusProjetVo} from '../model/StatusProjet.model';


@Injectable({
  providedIn: 'root'
})
export class StatusProjetService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/statusProjet/';
        })
    }
     private _statusProjets: Array<StatusProjetVo> ;
     private _selectedStatusProjet: StatusProjetVo;
     private _statusProjetSelections: Array<StatusProjetVo>;
     private _createStatusProjetDialog: boolean;
     private _editStatusProjetDialog: boolean;
     private _viewStatusProjetDialog: boolean;
     public editStatusProjet$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchStatusProjet:StatusProjetVo ;

    // methods
    public archiver(statusProjet: StatusProjetVo): Observable<StatusProjetVo> {
        return this.http.put<StatusProjetVo>(this.API + 'archiver/' ,statusProjet);
    }
    public desarchiver(statusProjet: StatusProjetVo): Observable<StatusProjetVo> {
    return this.http.put<StatusProjetVo>(this.API + 'desarchiver/' ,statusProjet);
    }

    public findAll(){
     return this.http.get<Array<StatusProjetVo>>(this.API);
    }

    public save(): Observable<StatusProjetVo> {
           return this.http.post<StatusProjetVo>(this.API, {...this.selectedStatusProjet,dateCreation: moment(this.selectedStatusProjet.dateCreation).format("YYYY-MM-DD")});
    }

    delete(statusProjet: StatusProjetVo) {
         return this.http.delete<number>(this.API + 'id/' + statusProjet.id);
    }


    public edit(): Observable<StatusProjetVo> {
        return this.http.put<StatusProjetVo>(this.API, this.selectedStatusProjet);
    }


     public findByCriteria(statusProjet:StatusProjetVo):Observable<Array<StatusProjetVo>>{
           return this.http.post<Array<StatusProjetVo>>(this.API +'search', statusProjet);
    }

   public findByIdWithAssociatedList(statusProjet:StatusProjetVo):Observable<StatusProjetVo>{
         return this.http.get<StatusProjetVo>(this.API + 'detail/id/' +statusProjet.id);
    }

    // getters and setters


    get statusProjets(): Array<StatusProjetVo> {
    if(this._statusProjets==null){
    this._statusProjets=new Array<StatusProjetVo>();
    }
return this._statusProjets;
       }

    set statusProjets(value: Array<StatusProjetVo>) {
        this._statusProjets = value;
       }

    get selectedStatusProjet(): StatusProjetVo {
    if(this._selectedStatusProjet==null){
    this._selectedStatusProjet=new StatusProjetVo();
    }
           return this._selectedStatusProjet;
       }

    set selectedStatusProjet(value: StatusProjetVo) {
        this._selectedStatusProjet = value;
       }

    get statusProjetSelections(): Array<StatusProjetVo> {
    if(this._statusProjetSelections==null){
    this._statusProjetSelections=new Array<StatusProjetVo>();
    }
        return this._statusProjetSelections;
       }


    set statusProjetSelections(value: Array<StatusProjetVo>) {
        this._statusProjetSelections = value;
       }

    get createStatusProjetDialog(): boolean {
        return this._createStatusProjetDialog;
       }

    set createStatusProjetDialog(value: boolean) {
        this._createStatusProjetDialog = value;
       }

    get editStatusProjetDialog(): boolean {
        return this._editStatusProjetDialog;
       }

    set editStatusProjetDialog(value: boolean) {
        this._editStatusProjetDialog = value;
       }

    get viewStatusProjetDialog(): boolean {
        return this._viewStatusProjetDialog;
       }

    set viewStatusProjetDialog(value: boolean) {
        this._viewStatusProjetDialog = value;
       }

     get searchStatusProjet(): StatusProjetVo {
     if(this._searchStatusProjet==null){
    this._searchStatusProjet=new StatusProjetVo();
    }
        return this._searchStatusProjet;
    }

    set searchStatusProjet(value: StatusProjetVo) {
        this._searchStatusProjet = value;
       }

}
