import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './user-auth.service';


@Injectable({
  providedIn: 'root'
})

export class CommonService {
 // rootUrl = environment.api_url;
     // rootUrl = 'http://testing.texcutive.com:3001/admin/';
     // rootUrl = 'http://localhost:3001/admin/';
     rootUrl =  'http://65.1.120.140:3001/admin/';
httpOptionSecure = {}
  constructor(private auth: AuthService,private http: HttpClient) {
      this.httpOptionSecure = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Accept':'application/json'
         })
      };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" })
  };

  http_request = new XMLHttpRequest();

  public name: any = {};
  getAuthHeaderOption() {
   
    let headers = new HttpHeaders()
   
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      
    let option = { headers: headers };
    return option
  }

  getUploadMulitpleImages() {
    let headers = new HttpHeaders()
    //.set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
     //.set('Accept-Language', 'en_US');
     let option = { headers: headers };
  return option
 }
  

  apiPost(path, param) {
      console.log(this.getAuthHeaderOption())
    return this.http.post(this.rootUrl + path, param,this.getAuthHeaderOption());
  }

  apiGet(path) {
    return this.http.get(this.rootUrl + path, this.getAuthHeaderOption());
  }

  apiUpload(path, param) {
    return this.http.post(this.rootUrl + path, param, this.getUploadMulitpleImages());
  }

  apiPatch(path, param) {
    return this.http.patch(this.rootUrl + path, param);
  }

  apiDelete(path, param) {
    return this.http.delete(this.rootUrl + path, param);
  }


  upload(path, formData) {
    return this.http.post<any>(this.rootUrl + path, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event, formData)),
      catchError(this.handleError) 
    );
  }


  private getEventMessage(event: HttpEvent<any>, formData) {
    console.log(event.type)

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
        break;
      case HttpEventType.Response:
        return this.apiResponse(event);
        break;
      default:
        return `File "${formData.get('videos').name}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone, filePath: '', error: '2', data: { file_url: '' } };

  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }


}