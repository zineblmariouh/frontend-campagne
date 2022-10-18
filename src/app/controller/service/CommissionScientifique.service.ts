import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommissionScientifiqueVo} from '../model/CommissionScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class CommissionScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/commissionScientifique/';
        })
    }
     private _commissionScientifiques: Array<CommissionScientifiqueVo> ;
     private _selectedCommissionScientifique: CommissionScientifiqueVo;
     private _commissionScientifiqueSelections: Array<CommissionScientifiqueVo>;
     private _createCommissionScientifiqueDialog: boolean;
     private _editCommissionScientifiqueDialog: boolean;
     private _viewCommissionScientifiqueDialog: boolean;
     public editCommissionScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommissionScientifique:CommissionScientifiqueVo ;

    // methods
    public archiver(commissionScientifique: CommissionScientifiqueVo): Observable<CommissionScientifiqueVo> {
        return this.http.put<CommissionScientifiqueVo>(this.API + 'archiver/' ,commissionScientifique);
    }
    public desarchiver(commissionScientifique: CommissionScientifiqueVo): Observable<CommissionScientifiqueVo> {
    return this.http.put<CommissionScientifiqueVo>(this.API + 'desarchiver/' ,commissionScientifique);
    }

    public findAll(){
     return this.http.get<Array<CommissionScientifiqueVo>>(this.API);
    }

    public save(): Observable<CommissionScientifiqueVo> {
           return this.http.post<CommissionScientifiqueVo>(this.API, {...this.selectedCommissionScientifique,dateCreation: moment(this.selectedCommissionScientifique.dateCreation).format("YYYY-MM-DD")});
    }

    delete(commissionScientifique: CommissionScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + commissionScientifique.id);
    }


    public edit(): Observable<CommissionScientifiqueVo> {
        return this.http.put<CommissionScientifiqueVo>(this.API, this.selectedCommissionScientifique);
    }


     public findByCriteria(commissionScientifique:CommissionScientifiqueVo):Observable<Array<CommissionScientifiqueVo>>{
           return this.http.post<Array<CommissionScientifiqueVo>>(this.API +'search', commissionScientifique);
    }

   public findByIdWithAssociatedList(commissionScientifique:CommissionScientifiqueVo):Observable<CommissionScientifiqueVo>{
         return this.http.get<CommissionScientifiqueVo>(this.API + 'detail/id/' +commissionScientifique.id);
    }

    // getters and setters


    get commissionScientifiques(): Array<CommissionScientifiqueVo> {
    if(this._commissionScientifiques==null){
    this._commissionScientifiques=new Array<CommissionScientifiqueVo>();
    }
return this._commissionScientifiques;
       }

    set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this._commissionScientifiques = value;
       }

    get selectedCommissionScientifique(): CommissionScientifiqueVo {
    if(this._selectedCommissionScientifique==null){
    this._selectedCommissionScientifique=new CommissionScientifiqueVo();
    }
           return this._selectedCommissionScientifique;
       }

    set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this._selectedCommissionScientifique = value;
       }

    get commissionScientifiqueSelections(): Array<CommissionScientifiqueVo> {
    if(this._commissionScientifiqueSelections==null){
    this._commissionScientifiqueSelections=new Array<CommissionScientifiqueVo>();
    }
        return this._commissionScientifiqueSelections;
       }


    set commissionScientifiqueSelections(value: Array<CommissionScientifiqueVo>) {
        this._commissionScientifiqueSelections = value;
       }

    get createCommissionScientifiqueDialog(): boolean {
        return this._createCommissionScientifiqueDialog;
       }

    set createCommissionScientifiqueDialog(value: boolean) {
        this._createCommissionScientifiqueDialog = value;
       }

    get editCommissionScientifiqueDialog(): boolean {
        return this._editCommissionScientifiqueDialog;
       }

    set editCommissionScientifiqueDialog(value: boolean) {
        this._editCommissionScientifiqueDialog = value;
       }

    get viewCommissionScientifiqueDialog(): boolean {
        return this._viewCommissionScientifiqueDialog;
       }

    set viewCommissionScientifiqueDialog(value: boolean) {
        this._viewCommissionScientifiqueDialog = value;
       }

     get searchCommissionScientifique(): CommissionScientifiqueVo {
     if(this._searchCommissionScientifique==null){
    this._searchCommissionScientifique=new CommissionScientifiqueVo();
    }
        return this._searchCommissionScientifique;
    }

    set searchCommissionScientifique(value: CommissionScientifiqueVo) {
        this._searchCommissionScientifique = value;
       }

}
