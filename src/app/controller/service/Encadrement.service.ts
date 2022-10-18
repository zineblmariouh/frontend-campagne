import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EncadrementVo} from '../model/Encadrement.model';
import {EncadrementEtudiantVo} from '../model/EncadrementEtudiant.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {EncadrementDoctorantVo} from '../model/EncadrementDoctorant.model';
import {CampagneVo} from '../model/Campagne.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class EncadrementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/encadrement/';
        })
    }
     private _encadrements: Array<EncadrementVo> ;
     private _selectedEncadrement: EncadrementVo;
     private _encadrementSelections: Array<EncadrementVo>;
     private _createEncadrementDialog: boolean;
     private _editEncadrementDialog: boolean;
     private _viewEncadrementDialog: boolean;
     public editEncadrement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEncadrement:EncadrementVo ;

    // methods

    public findByChercheurUsernameAndCampagneId(username: string, compagneId: number): Observable<EncadrementVo>{
        return this.http.get<EncadrementVo>(this.API + 'username/' +username+ '/id/' +compagneId);
        }

    public findByChercheurId(id: string): Observable<Array<EncadrementVo>>{
        return this.http.get<Array<EncadrementVo>>(this.API + 'chercheur/id/' +id);
         }

    public findAll(){
     return this.http.get<Array<EncadrementVo>>(this.API);
    }

    public save(): Observable<EncadrementVo> {
         return this.http.post<EncadrementVo>(this.API, this.selectedEncadrement);
    }

    delete(encadrement: EncadrementVo) {
         return this.http.delete<number>(this.API + 'id/' + encadrement.id);
    }


    public edit(): Observable<EncadrementVo> {
        return this.http.put<EncadrementVo>(this.API, this.selectedEncadrement);
    }


     public findByCriteria(encadrement:EncadrementVo):Observable<Array<EncadrementVo>>{
           return this.http.post<Array<EncadrementVo>>(this.API +'search', encadrement);
    }

   public findByIdWithAssociatedList(encadrement:EncadrementVo):Observable<EncadrementVo>{
         return this.http.get<EncadrementVo>(this.API + 'detail/id/' +encadrement.id);
    }

    // getters and setters


    get encadrements(): Array<EncadrementVo> {
    if(this._encadrements==null){
    this._encadrements=new Array<EncadrementVo>();
    }
return this._encadrements;
       }

    set encadrements(value: Array<EncadrementVo>) {
        this._encadrements = value;
       }

    get selectedEncadrement(): EncadrementVo {
    if(this._selectedEncadrement==null){
    this._selectedEncadrement=new EncadrementVo();
    }
           return this._selectedEncadrement;
       }

    set selectedEncadrement(value: EncadrementVo) {
        this._selectedEncadrement = value;
       }

    get encadrementSelections(): Array<EncadrementVo> {
    if(this._encadrementSelections==null){
    this._encadrementSelections=new Array<EncadrementVo>();
    }
        return this._encadrementSelections;
       }


    set encadrementSelections(value: Array<EncadrementVo>) {
        this._encadrementSelections = value;
       }

    get createEncadrementDialog(): boolean {
        return this._createEncadrementDialog;
       }

    set createEncadrementDialog(value: boolean) {
        this._createEncadrementDialog = value;
       }

    get editEncadrementDialog(): boolean {
        return this._editEncadrementDialog;
       }

    set editEncadrementDialog(value: boolean) {
        this._editEncadrementDialog = value;
       }

    get viewEncadrementDialog(): boolean {
        return this._viewEncadrementDialog;
       }

    set viewEncadrementDialog(value: boolean) {
        this._viewEncadrementDialog = value;
       }

     get searchEncadrement(): EncadrementVo {
     if(this._searchEncadrement==null){
    this._searchEncadrement=new EncadrementVo();
    }
        return this._searchEncadrement;
    }

    set searchEncadrement(value: EncadrementVo) {
        this._searchEncadrement = value;
       }

}
