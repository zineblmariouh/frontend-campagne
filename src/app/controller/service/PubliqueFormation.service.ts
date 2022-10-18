import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PubliqueFormationVo} from '../model/PubliqueFormation.model';


@Injectable({
  providedIn: 'root'
})
export class PubliqueFormationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/publiqueFormation/';
        })
    }
     private _publiqueFormations: Array<PubliqueFormationVo> ;
     private _selectedPubliqueFormation: PubliqueFormationVo;
     private _publiqueFormationSelections: Array<PubliqueFormationVo>;
     private _createPubliqueFormationDialog: boolean;
     private _editPubliqueFormationDialog: boolean;
     private _viewPubliqueFormationDialog: boolean;
     public editPubliqueFormation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPubliqueFormation:PubliqueFormationVo ;

    // methods
    public archiver(publiqueFormation: PubliqueFormationVo): Observable<PubliqueFormationVo> {
        return this.http.put<PubliqueFormationVo>(this.API + 'archiver/' ,publiqueFormation);
    }
    public desarchiver(publiqueFormation: PubliqueFormationVo): Observable<PubliqueFormationVo> {
    return this.http.put<PubliqueFormationVo>(this.API + 'desarchiver/' ,publiqueFormation);
    }

    public findAll(){
     return this.http.get<Array<PubliqueFormationVo>>(this.API);
    }

    public save(): Observable<PubliqueFormationVo> {
           return this.http.post<PubliqueFormationVo>(this.API, {...this.selectedPubliqueFormation,dateCreation: moment(this.selectedPubliqueFormation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(publiqueFormation: PubliqueFormationVo) {
         return this.http.delete<number>(this.API + 'id/' + publiqueFormation.id);
    }


    public edit(): Observable<PubliqueFormationVo> {
        return this.http.put<PubliqueFormationVo>(this.API, this.selectedPubliqueFormation);
    }


     public findByCriteria(publiqueFormation:PubliqueFormationVo):Observable<Array<PubliqueFormationVo>>{
           return this.http.post<Array<PubliqueFormationVo>>(this.API +'search', publiqueFormation);
    }

   public findByIdWithAssociatedList(publiqueFormation:PubliqueFormationVo):Observable<PubliqueFormationVo>{
         return this.http.get<PubliqueFormationVo>(this.API + 'detail/id/' +publiqueFormation.id);
    }

    // getters and setters


    get publiqueFormations(): Array<PubliqueFormationVo> {
    if(this._publiqueFormations==null){
    this._publiqueFormations=new Array<PubliqueFormationVo>();
    }
return this._publiqueFormations;
       }

    set publiqueFormations(value: Array<PubliqueFormationVo>) {
        this._publiqueFormations = value;
       }

    get selectedPubliqueFormation(): PubliqueFormationVo {
    if(this._selectedPubliqueFormation==null){
    this._selectedPubliqueFormation=new PubliqueFormationVo();
    }
           return this._selectedPubliqueFormation;
       }

    set selectedPubliqueFormation(value: PubliqueFormationVo) {
        this._selectedPubliqueFormation = value;
       }

    get publiqueFormationSelections(): Array<PubliqueFormationVo> {
    if(this._publiqueFormationSelections==null){
    this._publiqueFormationSelections=new Array<PubliqueFormationVo>();
    }
        return this._publiqueFormationSelections;
       }


    set publiqueFormationSelections(value: Array<PubliqueFormationVo>) {
        this._publiqueFormationSelections = value;
       }

    get createPubliqueFormationDialog(): boolean {
        return this._createPubliqueFormationDialog;
       }

    set createPubliqueFormationDialog(value: boolean) {
        this._createPubliqueFormationDialog = value;
       }

    get editPubliqueFormationDialog(): boolean {
        return this._editPubliqueFormationDialog;
       }

    set editPubliqueFormationDialog(value: boolean) {
        this._editPubliqueFormationDialog = value;
       }

    get viewPubliqueFormationDialog(): boolean {
        return this._viewPubliqueFormationDialog;
       }

    set viewPubliqueFormationDialog(value: boolean) {
        this._viewPubliqueFormationDialog = value;
       }

     get searchPubliqueFormation(): PubliqueFormationVo {
     if(this._searchPubliqueFormation==null){
    this._searchPubliqueFormation=new PubliqueFormationVo();
    }
        return this._searchPubliqueFormation;
    }

    set searchPubliqueFormation(value: PubliqueFormationVo) {
        this._searchPubliqueFormation = value;
       }

}
