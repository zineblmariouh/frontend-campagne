import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommunauteSavoirEncadrementDoctorantVo} from '../model/CommunauteSavoirEncadrementDoctorant.model';
import {EncadrementDoctorantVo} from '../model/EncadrementDoctorant.model';
import {CommunauteSavoirVo} from '../model/CommunauteSavoir.model';


@Injectable({
  providedIn: 'root'
})
export class CommunauteSavoirEncadrementDoctorantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/communauteSavoirEncadrementDoctorant/';
        })
    }
     private _communauteSavoirEncadrementDoctorants: Array<CommunauteSavoirEncadrementDoctorantVo> ;
     private _selectedCommunauteSavoirEncadrementDoctorant: CommunauteSavoirEncadrementDoctorantVo;
     private _communauteSavoirEncadrementDoctorantSelections: Array<CommunauteSavoirEncadrementDoctorantVo>;
     private _createCommunauteSavoirEncadrementDoctorantDialog: boolean;
     private _editCommunauteSavoirEncadrementDoctorantDialog: boolean;
     private _viewCommunauteSavoirEncadrementDoctorantDialog: boolean;
     public editCommunauteSavoirEncadrementDoctorant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommunauteSavoirEncadrementDoctorant:CommunauteSavoirEncadrementDoctorantVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CommunauteSavoirEncadrementDoctorantVo>>(this.API);
    }

    public save(): Observable<CommunauteSavoirEncadrementDoctorantVo> {
         return this.http.post<CommunauteSavoirEncadrementDoctorantVo>(this.API, this.selectedCommunauteSavoirEncadrementDoctorant);
    }

    delete(communauteSavoirEncadrementDoctorant: CommunauteSavoirEncadrementDoctorantVo) {
         return this.http.delete<number>(this.API + 'id/' + communauteSavoirEncadrementDoctorant.id);
    }


    public edit(): Observable<CommunauteSavoirEncadrementDoctorantVo> {
        return this.http.put<CommunauteSavoirEncadrementDoctorantVo>(this.API, this.selectedCommunauteSavoirEncadrementDoctorant);
    }


     public findByCriteria(communauteSavoirEncadrementDoctorant:CommunauteSavoirEncadrementDoctorantVo):Observable<Array<CommunauteSavoirEncadrementDoctorantVo>>{
           return this.http.post<Array<CommunauteSavoirEncadrementDoctorantVo>>(this.API +'search', communauteSavoirEncadrementDoctorant);
    }

   public findByIdWithAssociatedList(communauteSavoirEncadrementDoctorant:CommunauteSavoirEncadrementDoctorantVo):Observable<CommunauteSavoirEncadrementDoctorantVo>{
         return this.http.get<CommunauteSavoirEncadrementDoctorantVo>(this.API + 'detail/id/' +communauteSavoirEncadrementDoctorant.id);
    }

    // getters and setters


    get communauteSavoirEncadrementDoctorants(): Array<CommunauteSavoirEncadrementDoctorantVo> {
    if(this._communauteSavoirEncadrementDoctorants==null){
    this._communauteSavoirEncadrementDoctorants=new Array<CommunauteSavoirEncadrementDoctorantVo>();
    }
return this._communauteSavoirEncadrementDoctorants;
       }

    set communauteSavoirEncadrementDoctorants(value: Array<CommunauteSavoirEncadrementDoctorantVo>) {
        this._communauteSavoirEncadrementDoctorants = value;
       }

    get selectedCommunauteSavoirEncadrementDoctorant(): CommunauteSavoirEncadrementDoctorantVo {
    if(this._selectedCommunauteSavoirEncadrementDoctorant==null){
    this._selectedCommunauteSavoirEncadrementDoctorant=new CommunauteSavoirEncadrementDoctorantVo();
    }
           return this._selectedCommunauteSavoirEncadrementDoctorant;
       }

    set selectedCommunauteSavoirEncadrementDoctorant(value: CommunauteSavoirEncadrementDoctorantVo) {
        this._selectedCommunauteSavoirEncadrementDoctorant = value;
       }

    get communauteSavoirEncadrementDoctorantSelections(): Array<CommunauteSavoirEncadrementDoctorantVo> {
    if(this._communauteSavoirEncadrementDoctorantSelections==null){
    this._communauteSavoirEncadrementDoctorantSelections=new Array<CommunauteSavoirEncadrementDoctorantVo>();
    }
        return this._communauteSavoirEncadrementDoctorantSelections;
       }


    set communauteSavoirEncadrementDoctorantSelections(value: Array<CommunauteSavoirEncadrementDoctorantVo>) {
        this._communauteSavoirEncadrementDoctorantSelections = value;
       }

    get createCommunauteSavoirEncadrementDoctorantDialog(): boolean {
        return this._createCommunauteSavoirEncadrementDoctorantDialog;
       }

    set createCommunauteSavoirEncadrementDoctorantDialog(value: boolean) {
        this._createCommunauteSavoirEncadrementDoctorantDialog = value;
       }

    get editCommunauteSavoirEncadrementDoctorantDialog(): boolean {
        return this._editCommunauteSavoirEncadrementDoctorantDialog;
       }

    set editCommunauteSavoirEncadrementDoctorantDialog(value: boolean) {
        this._editCommunauteSavoirEncadrementDoctorantDialog = value;
       }

    get viewCommunauteSavoirEncadrementDoctorantDialog(): boolean {
        return this._viewCommunauteSavoirEncadrementDoctorantDialog;
       }

    set viewCommunauteSavoirEncadrementDoctorantDialog(value: boolean) {
        this._viewCommunauteSavoirEncadrementDoctorantDialog = value;
       }

     get searchCommunauteSavoirEncadrementDoctorant(): CommunauteSavoirEncadrementDoctorantVo {
     if(this._searchCommunauteSavoirEncadrementDoctorant==null){
    this._searchCommunauteSavoirEncadrementDoctorant=new CommunauteSavoirEncadrementDoctorantVo();
    }
        return this._searchCommunauteSavoirEncadrementDoctorant;
    }

    set searchCommunauteSavoirEncadrementDoctorant(value: CommunauteSavoirEncadrementDoctorantVo) {
        this._searchCommunauteSavoirEncadrementDoctorant = value;
       }

}
