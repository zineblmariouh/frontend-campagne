import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {VieInstitutionnelleDetailVo} from '../model/VieInstitutionnelleDetail.model';
import {TypeInstanceVo} from '../model/TypeInstance.model';
import {VieInstitutionnelleVo} from '../model/VieInstitutionnelle.model';
import {VieInstitutionnelleDetailInstrumentIrdVo} from '../model/VieInstitutionnelleDetailInstrumentIrd.model';
import {StructureIrdVo} from '../model/StructureIrd.model';
import {PaysVo} from '../model/Pays.model';
import {VieInstitutionnelleDetailEtablissementVo} from '../model/VieInstitutionnelleDetailEtablissement.model';


@Injectable({
  providedIn: 'root'
})
export class VieInstitutionnelleDetailService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/vieInstitutionnelleDetail/';
        })
    }
     private _vieInstitutionnelleDetails: Array<VieInstitutionnelleDetailVo> ;
     private _selectedVieInstitutionnelleDetail: VieInstitutionnelleDetailVo;
     private _vieInstitutionnelleDetailSelections: Array<VieInstitutionnelleDetailVo>;
     private _createVieInstitutionnelleDetailDialog: boolean;
     private _editVieInstitutionnelleDetailDialog: boolean;
     private _viewVieInstitutionnelleDetailDialog: boolean;
     public editVieInstitutionnelleDetail$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchVieInstitutionnelleDetail:VieInstitutionnelleDetailVo ;

    // methods

    public findAll(){
     return this.http.get<Array<VieInstitutionnelleDetailVo>>(this.API);
    }

    public save(): Observable<VieInstitutionnelleDetailVo> {
         return this.http.post<VieInstitutionnelleDetailVo>(this.API, this.selectedVieInstitutionnelleDetail);
    }

    delete(vieInstitutionnelleDetail: VieInstitutionnelleDetailVo) {
         return this.http.delete<number>(this.API + 'id/' + vieInstitutionnelleDetail.id);
    }


    public edit(): Observable<VieInstitutionnelleDetailVo> {
        return this.http.put<VieInstitutionnelleDetailVo>(this.API, this.selectedVieInstitutionnelleDetail);
    }


     public findByCriteria(vieInstitutionnelleDetail:VieInstitutionnelleDetailVo):Observable<Array<VieInstitutionnelleDetailVo>>{
           return this.http.post<Array<VieInstitutionnelleDetailVo>>(this.API +'search', vieInstitutionnelleDetail);
    }

   public findByIdWithAssociatedList(vieInstitutionnelleDetail:VieInstitutionnelleDetailVo):Observable<VieInstitutionnelleDetailVo>{
         return this.http.get<VieInstitutionnelleDetailVo>(this.API + 'detail/id/' +vieInstitutionnelleDetail.id);
    }

    // getters and setters


    get vieInstitutionnelleDetails(): Array<VieInstitutionnelleDetailVo> {
    if(this._vieInstitutionnelleDetails==null){
    this._vieInstitutionnelleDetails=new Array<VieInstitutionnelleDetailVo>();
    }
return this._vieInstitutionnelleDetails;
       }

    set vieInstitutionnelleDetails(value: Array<VieInstitutionnelleDetailVo>) {
        this._vieInstitutionnelleDetails = value;
       }

    get selectedVieInstitutionnelleDetail(): VieInstitutionnelleDetailVo {
    if(this._selectedVieInstitutionnelleDetail==null){
    this._selectedVieInstitutionnelleDetail=new VieInstitutionnelleDetailVo();
    }
           return this._selectedVieInstitutionnelleDetail;
       }

    set selectedVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this._selectedVieInstitutionnelleDetail = value;
       }

    get vieInstitutionnelleDetailSelections(): Array<VieInstitutionnelleDetailVo> {
    if(this._vieInstitutionnelleDetailSelections==null){
    this._vieInstitutionnelleDetailSelections=new Array<VieInstitutionnelleDetailVo>();
    }
        return this._vieInstitutionnelleDetailSelections;
       }


    set vieInstitutionnelleDetailSelections(value: Array<VieInstitutionnelleDetailVo>) {
        this._vieInstitutionnelleDetailSelections = value;
       }

    get createVieInstitutionnelleDetailDialog(): boolean {
        return this._createVieInstitutionnelleDetailDialog;
       }

    set createVieInstitutionnelleDetailDialog(value: boolean) {
        this._createVieInstitutionnelleDetailDialog = value;
       }

    get editVieInstitutionnelleDetailDialog(): boolean {
        return this._editVieInstitutionnelleDetailDialog;
       }

    set editVieInstitutionnelleDetailDialog(value: boolean) {
        this._editVieInstitutionnelleDetailDialog = value;
       }

    get viewVieInstitutionnelleDetailDialog(): boolean {
        return this._viewVieInstitutionnelleDetailDialog;
       }

    set viewVieInstitutionnelleDetailDialog(value: boolean) {
        this._viewVieInstitutionnelleDetailDialog = value;
       }

     get searchVieInstitutionnelleDetail(): VieInstitutionnelleDetailVo {
     if(this._searchVieInstitutionnelleDetail==null){
    this._searchVieInstitutionnelleDetail=new VieInstitutionnelleDetailVo();
    }
        return this._searchVieInstitutionnelleDetail;
    }

    set searchVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this._searchVieInstitutionnelleDetail = value;
       }

}
