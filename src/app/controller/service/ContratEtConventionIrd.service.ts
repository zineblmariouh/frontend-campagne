import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ContratEtConventionIrdVo} from '../model/ContratEtConventionIrd.model';
import {SavoirEtInnovationVo} from '../model/SavoirEtInnovation.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {StatusContratEtConventionVo} from '../model/StatusContratEtConvention.model';


@Injectable({
  providedIn: 'root'
})
export class ContratEtConventionIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/contratEtConventionIrd/';
        })
    }
     private _contratEtConventionIrds: Array<ContratEtConventionIrdVo> ;
     private _selectedContratEtConventionIrd: ContratEtConventionIrdVo;
     private _contratEtConventionIrdSelections: Array<ContratEtConventionIrdVo>;
     private _createContratEtConventionIrdDialog: boolean;
     private _editContratEtConventionIrdDialog: boolean;
     private _viewContratEtConventionIrdDialog: boolean;
     public editContratEtConventionIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchContratEtConventionIrd:ContratEtConventionIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ContratEtConventionIrdVo>>(this.API);
    }

    public save(): Observable<ContratEtConventionIrdVo> {
           return this.http.post<ContratEtConventionIrdVo>(this.API, {...this.selectedContratEtConventionIrd,dateContrat: moment(this.selectedContratEtConventionIrd.dateContrat).format("YYYY-MM-DD")});
    }

    delete(contratEtConventionIrd: ContratEtConventionIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + contratEtConventionIrd.id);
    }


    public edit(): Observable<ContratEtConventionIrdVo> {
        return this.http.put<ContratEtConventionIrdVo>(this.API, this.selectedContratEtConventionIrd);
    }


     public findByCriteria(contratEtConventionIrd:ContratEtConventionIrdVo):Observable<Array<ContratEtConventionIrdVo>>{
           return this.http.post<Array<ContratEtConventionIrdVo>>(this.API +'search', contratEtConventionIrd);
    }

   public findByIdWithAssociatedList(contratEtConventionIrd:ContratEtConventionIrdVo):Observable<ContratEtConventionIrdVo>{
         return this.http.get<ContratEtConventionIrdVo>(this.API + 'detail/id/' +contratEtConventionIrd.id);
    }

    // getters and setters


    get contratEtConventionIrds(): Array<ContratEtConventionIrdVo> {
    if(this._contratEtConventionIrds==null){
    this._contratEtConventionIrds=new Array<ContratEtConventionIrdVo>();
    }
return this._contratEtConventionIrds;
       }

    set contratEtConventionIrds(value: Array<ContratEtConventionIrdVo>) {
        this._contratEtConventionIrds = value;
       }

    get selectedContratEtConventionIrd(): ContratEtConventionIrdVo {
    if(this._selectedContratEtConventionIrd==null){
    this._selectedContratEtConventionIrd=new ContratEtConventionIrdVo();
    }
           return this._selectedContratEtConventionIrd;
       }

    set selectedContratEtConventionIrd(value: ContratEtConventionIrdVo) {
        this._selectedContratEtConventionIrd = value;
       }

    get contratEtConventionIrdSelections(): Array<ContratEtConventionIrdVo> {
    if(this._contratEtConventionIrdSelections==null){
    this._contratEtConventionIrdSelections=new Array<ContratEtConventionIrdVo>();
    }
        return this._contratEtConventionIrdSelections;
       }


    set contratEtConventionIrdSelections(value: Array<ContratEtConventionIrdVo>) {
        this._contratEtConventionIrdSelections = value;
       }

    get createContratEtConventionIrdDialog(): boolean {
        return this._createContratEtConventionIrdDialog;
       }

    set createContratEtConventionIrdDialog(value: boolean) {
        this._createContratEtConventionIrdDialog = value;
       }

    get editContratEtConventionIrdDialog(): boolean {
        return this._editContratEtConventionIrdDialog;
       }

    set editContratEtConventionIrdDialog(value: boolean) {
        this._editContratEtConventionIrdDialog = value;
       }

    get viewContratEtConventionIrdDialog(): boolean {
        return this._viewContratEtConventionIrdDialog;
       }

    set viewContratEtConventionIrdDialog(value: boolean) {
        this._viewContratEtConventionIrdDialog = value;
       }

     get searchContratEtConventionIrd(): ContratEtConventionIrdVo {
     if(this._searchContratEtConventionIrd==null){
    this._searchContratEtConventionIrd=new ContratEtConventionIrdVo();
    }
        return this._searchContratEtConventionIrd;
    }

    set searchContratEtConventionIrd(value: ContratEtConventionIrdVo) {
        this._searchContratEtConventionIrd = value;
       }

}
