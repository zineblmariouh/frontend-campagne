import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RoleProjetVo} from '../model/RoleProjet.model';


@Injectable({
  providedIn: 'root'
})
export class RoleProjetService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/roleProjet/';
        })
    }
     private _roleProjets: Array<RoleProjetVo> ;
     private _selectedRoleProjet: RoleProjetVo;
     private _roleProjetSelections: Array<RoleProjetVo>;
     private _createRoleProjetDialog: boolean;
     private _editRoleProjetDialog: boolean;
     private _viewRoleProjetDialog: boolean;
     public editRoleProjet$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRoleProjet:RoleProjetVo ;

    // methods
    public archiver(roleProjet: RoleProjetVo): Observable<RoleProjetVo> {
        return this.http.put<RoleProjetVo>(this.API + 'archiver/' ,roleProjet);
    }
    public desarchiver(roleProjet: RoleProjetVo): Observable<RoleProjetVo> {
    return this.http.put<RoleProjetVo>(this.API + 'desarchiver/' ,roleProjet);
    }

    public findAll(){
     return this.http.get<Array<RoleProjetVo>>(this.API);
    }

    public save(): Observable<RoleProjetVo> {
           return this.http.post<RoleProjetVo>(this.API, {...this.selectedRoleProjet,dateCreation: moment(this.selectedRoleProjet.dateCreation).format("YYYY-MM-DD")});
    }

    delete(roleProjet: RoleProjetVo) {
         return this.http.delete<number>(this.API + 'id/' + roleProjet.id);
    }


    public edit(): Observable<RoleProjetVo> {
        return this.http.put<RoleProjetVo>(this.API, this.selectedRoleProjet);
    }


     public findByCriteria(roleProjet:RoleProjetVo):Observable<Array<RoleProjetVo>>{
           return this.http.post<Array<RoleProjetVo>>(this.API +'search', roleProjet);
    }

   public findByIdWithAssociatedList(roleProjet:RoleProjetVo):Observable<RoleProjetVo>{
         return this.http.get<RoleProjetVo>(this.API + 'detail/id/' +roleProjet.id);
    }

    // getters and setters


    get roleProjets(): Array<RoleProjetVo> {
    if(this._roleProjets==null){
    this._roleProjets=new Array<RoleProjetVo>();
    }
return this._roleProjets;
       }

    set roleProjets(value: Array<RoleProjetVo>) {
        this._roleProjets = value;
       }

    get selectedRoleProjet(): RoleProjetVo {
    if(this._selectedRoleProjet==null){
    this._selectedRoleProjet=new RoleProjetVo();
    }
           return this._selectedRoleProjet;
       }

    set selectedRoleProjet(value: RoleProjetVo) {
        this._selectedRoleProjet = value;
       }

    get roleProjetSelections(): Array<RoleProjetVo> {
    if(this._roleProjetSelections==null){
    this._roleProjetSelections=new Array<RoleProjetVo>();
    }
        return this._roleProjetSelections;
       }


    set roleProjetSelections(value: Array<RoleProjetVo>) {
        this._roleProjetSelections = value;
       }

    get createRoleProjetDialog(): boolean {
        return this._createRoleProjetDialog;
       }

    set createRoleProjetDialog(value: boolean) {
        this._createRoleProjetDialog = value;
       }

    get editRoleProjetDialog(): boolean {
        return this._editRoleProjetDialog;
       }

    set editRoleProjetDialog(value: boolean) {
        this._editRoleProjetDialog = value;
       }

    get viewRoleProjetDialog(): boolean {
        return this._viewRoleProjetDialog;
       }

    set viewRoleProjetDialog(value: boolean) {
        this._viewRoleProjetDialog = value;
       }

     get searchRoleProjet(): RoleProjetVo {
     if(this._searchRoleProjet==null){
    this._searchRoleProjet=new RoleProjetVo();
    }
        return this._searchRoleProjet;
    }

    set searchRoleProjet(value: RoleProjetVo) {
        this._searchRoleProjet = value;
       }

}
