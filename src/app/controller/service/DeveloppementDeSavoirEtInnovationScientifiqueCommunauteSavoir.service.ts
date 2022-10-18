import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo} from '../model/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {CommunauteSavoirVo} from '../model/CommunauteSavoir.model';


@Injectable({
  providedIn: 'root'
})
export class DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir/';
        })
    }
     private _developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> ;
     private _selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo;
     private _developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirSelections: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>;
     private _createDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog: boolean;
     private _editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog: boolean;
     private _viewDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog: boolean;
     public editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir:DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>>(this.API);
    }

    public save(): Observable<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> {
         return this.http.post<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir);
    }

    delete(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo) {
         return this.http.delete<number>(this.API + 'id/' + developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir.id);
    }


    public edit(): Observable<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> {
        return this.http.put<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir);
    }


     public findByCriteria(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir:DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo):Observable<Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>>{
           return this.http.post<Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>>(this.API +'search', developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir);
    }

   public findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir:DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo):Observable<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>{
         return this.http.get<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>(this.API + 'detail/id/' +developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir.id);
    }

    // getters and setters


    get developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs(): Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> {
    if(this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs==null){
    this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs=new Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>();
    }
return this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs;
       }

    set developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs = value;
       }

    get selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(): DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo {
    if(this._selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir==null){
    this._selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir=new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
    }
           return this._selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir;
       }

    set selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(value: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo) {
        this._selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir = value;
       }

    get developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> {
    if(this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirSelections==null){
    this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirSelections=new Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>();
    }
        return this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirSelections;
       }


    set developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirSelections = value;
       }

    get createDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog(): boolean {
        return this._createDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog;
       }

    set createDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog(value: boolean) {
        this._createDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog = value;
       }

    get editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog(): boolean {
        return this._editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog;
       }

    set editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog(value: boolean) {
        this._editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog = value;
       }

    get viewDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog(): boolean {
        return this._viewDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog;
       }

    set viewDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog(value: boolean) {
        this._viewDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog = value;
       }

     get searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(): DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo {
     if(this._searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir==null){
    this._searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir=new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
    }
        return this._searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir;
    }

    set searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(value: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo) {
        this._searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir = value;
       }

}
