import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { TrackService } from '../service/track.service';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})
export class OrderViewComponent {

  constructor(private route: ActivatedRoute, private cart: CartService, private router: Router, private trackingService: TrackService) { }

  trackingInfo: any

  data: any;

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      let id = params['id'];

      this.cart.frameData(id).subscribe((data: any) => {
        console.log(data);
        this.data = data;
      });

    });
  }

  nav() {
    this.router.navigateByUrl(`/buy-now/${this.data._id}`);
  }



}
