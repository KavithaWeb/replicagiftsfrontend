import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private baseUrl = 'https://replicagiftsbackend.onrender.com/api/trackmore'; // Your backend API URL

  constructor(private http: HttpClient) { }

  trackShipment(trackingId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/track`, { tracking_id: trackingId });
  }
}
