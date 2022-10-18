import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {NotificationVo} from '../model/Notification.model';
import {CategorieNotificationVo} from '../model/CategorieNotification.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/notification/';
        })
    }
     private _notifications: Array<NotificationVo> ;
     private _selectedNotification: NotificationVo;
     private _notificationSelections: Array<NotificationVo>;
     private _createNotificationDialog: boolean;
     private _editNotificationDialog: boolean;
     private _viewNotificationDialog: boolean;
     public editNotification$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchNotification:NotificationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<NotificationVo>>(this.API);
    }

    public save(): Observable<NotificationVo> {
           return this.http.post<NotificationVo>(this.API, {...this.selectedNotification,dateLecture: moment(this.selectedNotification.dateLecture).format("YYYY-MM-DD")});
    }

    delete(notification: NotificationVo) {
         return this.http.delete<number>(this.API + 'id/' + notification.id);
    }


    public edit(): Observable<NotificationVo> {
        return this.http.put<NotificationVo>(this.API, this.selectedNotification);
    }


     public findByCriteria(notification:NotificationVo):Observable<Array<NotificationVo>>{
           return this.http.post<Array<NotificationVo>>(this.API +'search', notification);
    }

   public findByIdWithAssociatedList(notification:NotificationVo):Observable<NotificationVo>{
         return this.http.get<NotificationVo>(this.API + 'detail/id/' +notification.id);
    }

    // getters and setters


    get notifications(): Array<NotificationVo> {
    if(this._notifications==null){
    this._notifications=new Array<NotificationVo>();
    }
return this._notifications;
       }

    set notifications(value: Array<NotificationVo>) {
        this._notifications = value;
       }

    get selectedNotification(): NotificationVo {
    if(this._selectedNotification==null){
    this._selectedNotification=new NotificationVo();
    }
           return this._selectedNotification;
       }

    set selectedNotification(value: NotificationVo) {
        this._selectedNotification = value;
       }

    get notificationSelections(): Array<NotificationVo> {
    if(this._notificationSelections==null){
    this._notificationSelections=new Array<NotificationVo>();
    }
        return this._notificationSelections;
       }


    set notificationSelections(value: Array<NotificationVo>) {
        this._notificationSelections = value;
       }

    get createNotificationDialog(): boolean {
        return this._createNotificationDialog;
       }

    set createNotificationDialog(value: boolean) {
        this._createNotificationDialog = value;
       }

    get editNotificationDialog(): boolean {
        return this._editNotificationDialog;
       }

    set editNotificationDialog(value: boolean) {
        this._editNotificationDialog = value;
       }

    get viewNotificationDialog(): boolean {
        return this._viewNotificationDialog;
       }

    set viewNotificationDialog(value: boolean) {
        this._viewNotificationDialog = value;
       }

     get searchNotification(): NotificationVo {
     if(this._searchNotification==null){
    this._searchNotification=new NotificationVo();
    }
        return this._searchNotification;
    }

    set searchNotification(value: NotificationVo) {
        this._searchNotification = value;
       }

}
