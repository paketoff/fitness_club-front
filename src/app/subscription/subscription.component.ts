import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription/subscription-service.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  constructor(private subscriptionService: SubscriptionService) { }

  subscriptions: any[] = [];

  ngOnInit(): void {
    this.getAllSubscriptions();
  }

  getAllSubscriptions(): void {
    this.subscriptionService.getAllSubscriptionTypes()
      .subscribe(subscriptions => this.subscriptions = subscriptions);
  }
}
