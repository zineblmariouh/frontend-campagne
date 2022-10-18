import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CategorieNotificationVo} from '../model/CategorieNotification.model';


@Injectable({
  providedIn: 'root'
})
export class CategorieNotificationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/categorieNotification/';
        })
    }
     private _categorieNotifications: Array<CategorieNotificationVo> ;
     private _selectedCategorieNotification: CategorieNotificationVo;
     private _categorieNotificationSelections: Array<CategorieNotificationVo>;
     private _createCategorieNotificationDialog: boolean;
     private _editCategorieNotificationDialog: boolean;
     private _viewCategorieNotificationDialog: boolean;
     public editCategorieNotification$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCategorieNotification:CategorieNotificationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CategorieNotificationVo>>(this.API);
    }

    public save(): Observable<CategorieNotificationVo> {
         return this.http.post<CategorieNotificationVo>(this.API, this.selectedCategorieNotification);
    }

    delete(categorieNotification: CategorieNotificationVo) {
         return this.http.delete<number>(this.API + 'id/' + categorieNotification.id);
    }


    public edit(): Observable<CategorieNotificationVo> {
        return this.http.put<CategorieNotificationVo>(this.API, this.selectedCategorieNotification);
    }


     public findByCriteria(categorieNotification:CategorieNotificationVo):Observable<Array<CategorieNotificationVo>>{
           return this.http.post<Array<CategorieNotificationVo>>(this.API +'search', categorieNotification);
    }

   public findByIdWithAssociatedList(categorieNotification:CategorieNotificationVo):Observable<CategorieNotificationVo>{
         return this.http.get<CategorieNotificationVo>(this.API + 'detail/id/' +categorieNotification.id);
    }

    // getters and setters


    get categorieNotifications(): Array<CategorieNotificationVo> {
    if(this._categorieNotifications==null){
    this._categorieNotifications=new Array<CategorieNotificationVo>();
    }
return this._categorieNotifications;
       }

    set categorieNotifications(value: Array<CategorieNotificationVo>) {
        this._categorieNotifications = value;
       }

    get selectedCategorieNotification(): CategorieNotificationVo {
    if(this._selectedCategorieNotification==null){
    this._selectedCategorieNotification=new CategorieNotificationVo();
    }
           return this._selectedCategorieNotification;
       }

    set selectedCategorieNotification(value: CategorieNotificationVo) {
        this._selectedCategorieNotification = value;
       }

    get categorieNotificationSelections(): Array<CategorieNotificationVo> {
    if(this._categorieNotificationSelections==null){
    this._categorieNotificationSelections=new Array<CategorieNotificationVo>();
    }
        return this._categorieNotificationSelections;
       }


    set categorieNotificationSelections(value: Array<CategorieNotificationVo>) {
        this._categorieNotificationSelections = value;
       }

    get createCategorieNotificationDialog(): boolean {
        return this._createCategorieNotificationDialog;
       }

    set createCategorieNotificationDialog(value: boolean) {
        this._createCategorieNotificationDialog = value;
       }

    get editCategorieNotificationDialog(): boolean {
        return this._editCategorieNotificationDialog;
       }

    set editCategorieNotificationDialog(value: boolean) {
        this._editCategorieNotificationDialog = value;
       }

    get viewCategorieNotificationDialog(): boolean {
        return this._viewCategorieNotificationDialog;
       }

    set viewCategorieNotificationDialog(value: boolean) {
        this._viewCategorieNotificationDialog = value;
       }

     get searchCategorieNotification(): CategorieNotificationVo {
     if(this._searchCategorieNotification==null){
    this._searchCategorieNotification=new CategorieNotificationVo();
    }
        return this._searchCategorieNotification;
    }

    set searchCategorieNotification(value: CategorieNotificationVo) {
        this._searchCategorieNotification = value;
       }

}
