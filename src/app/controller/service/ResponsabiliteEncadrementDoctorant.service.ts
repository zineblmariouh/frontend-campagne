import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ResponsabiliteEncadrementDoctorantVo} from '../model/ResponsabiliteEncadrementDoctorant.model';


@Injectable({
  providedIn: 'root'
})
export class ResponsabiliteEncadrementDoctorantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/responsabiliteEncadrementDoctorant/';
        })
    }
     private _responsabiliteEncadrementDoctorants: Array<ResponsabiliteEncadrementDoctorantVo> ;
     private _selectedResponsabiliteEncadrementDoctorant: ResponsabiliteEncadrementDoctorantVo;
     private _responsabiliteEncadrementDoctorantSelections: Array<ResponsabiliteEncadrementDoctorantVo>;
     private _createResponsabiliteEncadrementDoctorantDialog: boolean;
     private _editResponsabiliteEncadrementDoctorantDialog: boolean;
     private _viewResponsabiliteEncadrementDoctorantDialog: boolean;
     public editResponsabiliteEncadrementDoctorant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchResponsabiliteEncadrementDoctorant:ResponsabiliteEncadrementDoctorantVo ;

    // methods
    public archiver(responsabiliteEncadrementDoctorant: ResponsabiliteEncadrementDoctorantVo): Observable<ResponsabiliteEncadrementDoctorantVo> {
        return this.http.put<ResponsabiliteEncadrementDoctorantVo>(this.API + 'archiver/' ,responsabiliteEncadrementDoctorant);
    }
    public desarchiver(responsabiliteEncadrementDoctorant: ResponsabiliteEncadrementDoctorantVo): Observable<ResponsabiliteEncadrementDoctorantVo> {
    return this.http.put<ResponsabiliteEncadrementDoctorantVo>(this.API + 'desarchiver/' ,responsabiliteEncadrementDoctorant);
    }

    public findAll(){
     return this.http.get<Array<ResponsabiliteEncadrementDoctorantVo>>(this.API);
    }

    public save(): Observable<ResponsabiliteEncadrementDoctorantVo> {
           return this.http.post<ResponsabiliteEncadrementDoctorantVo>(this.API, {...this.selectedResponsabiliteEncadrementDoctorant,dateCreation: moment(this.selectedResponsabiliteEncadrementDoctorant.dateCreation).format("YYYY-MM-DD")});
    }

    delete(responsabiliteEncadrementDoctorant: ResponsabiliteEncadrementDoctorantVo) {
         return this.http.delete<number>(this.API + 'id/' + responsabiliteEncadrementDoctorant.id);
    }


    public edit(): Observable<ResponsabiliteEncadrementDoctorantVo> {
        return this.http.put<ResponsabiliteEncadrementDoctorantVo>(this.API, this.selectedResponsabiliteEncadrementDoctorant);
    }


     public findByCriteria(responsabiliteEncadrementDoctorant:ResponsabiliteEncadrementDoctorantVo):Observable<Array<ResponsabiliteEncadrementDoctorantVo>>{
           return this.http.post<Array<ResponsabiliteEncadrementDoctorantVo>>(this.API +'search', responsabiliteEncadrementDoctorant);
    }

   public findByIdWithAssociatedList(responsabiliteEncadrementDoctorant:ResponsabiliteEncadrementDoctorantVo):Observable<ResponsabiliteEncadrementDoctorantVo>{
         return this.http.get<ResponsabiliteEncadrementDoctorantVo>(this.API + 'detail/id/' +responsabiliteEncadrementDoctorant.id);
    }

    // getters and setters


    get responsabiliteEncadrementDoctorants(): Array<ResponsabiliteEncadrementDoctorantVo> {
    if(this._responsabiliteEncadrementDoctorants==null){
    this._responsabiliteEncadrementDoctorants=new Array<ResponsabiliteEncadrementDoctorantVo>();
    }
return this._responsabiliteEncadrementDoctorants;
       }

    set responsabiliteEncadrementDoctorants(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this._responsabiliteEncadrementDoctorants = value;
       }

    get selectedResponsabiliteEncadrementDoctorant(): ResponsabiliteEncadrementDoctorantVo {
    if(this._selectedResponsabiliteEncadrementDoctorant==null){
    this._selectedResponsabiliteEncadrementDoctorant=new ResponsabiliteEncadrementDoctorantVo();
    }
           return this._selectedResponsabiliteEncadrementDoctorant;
       }

    set selectedResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this._selectedResponsabiliteEncadrementDoctorant = value;
       }

    get responsabiliteEncadrementDoctorantSelections(): Array<ResponsabiliteEncadrementDoctorantVo> {
    if(this._responsabiliteEncadrementDoctorantSelections==null){
    this._responsabiliteEncadrementDoctorantSelections=new Array<ResponsabiliteEncadrementDoctorantVo>();
    }
        return this._responsabiliteEncadrementDoctorantSelections;
       }


    set responsabiliteEncadrementDoctorantSelections(value: Array<ResponsabiliteEncadrementDoctorantVo>) {
        this._responsabiliteEncadrementDoctorantSelections = value;
       }

    get createResponsabiliteEncadrementDoctorantDialog(): boolean {
        return this._createResponsabiliteEncadrementDoctorantDialog;
       }

    set createResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this._createResponsabiliteEncadrementDoctorantDialog = value;
       }

    get editResponsabiliteEncadrementDoctorantDialog(): boolean {
        return this._editResponsabiliteEncadrementDoctorantDialog;
       }

    set editResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this._editResponsabiliteEncadrementDoctorantDialog = value;
       }

    get viewResponsabiliteEncadrementDoctorantDialog(): boolean {
        return this._viewResponsabiliteEncadrementDoctorantDialog;
       }

    set viewResponsabiliteEncadrementDoctorantDialog(value: boolean) {
        this._viewResponsabiliteEncadrementDoctorantDialog = value;
       }

     get searchResponsabiliteEncadrementDoctorant(): ResponsabiliteEncadrementDoctorantVo {
     if(this._searchResponsabiliteEncadrementDoctorant==null){
    this._searchResponsabiliteEncadrementDoctorant=new ResponsabiliteEncadrementDoctorantVo();
    }
        return this._searchResponsabiliteEncadrementDoctorant;
    }

    set searchResponsabiliteEncadrementDoctorant(value: ResponsabiliteEncadrementDoctorantVo) {
        this._searchResponsabiliteEncadrementDoctorant = value;
       }

}
