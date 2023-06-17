import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubscriptionService } from '../subscription/subscription-service.service';
import { SubscriptionOrderService } from './subscription-order.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subscription-order',
  templateUrl: './subscription-order.component.html',
  styleUrls: ['./subscription-order.component.scss']
})
export class SubscriptionOrderComponent implements OnInit {

  subscriptionForm: FormGroup;
  subscriptions: any[] = [];
  subscription: any;

  constructor(
    private subscriptionOrderService: SubscriptionOrderService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private subscriptionService: SubscriptionService
    ) {
    this.subscriptionForm = this.formBuilder.group({
      subscription_type_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllSubscriptions(); // Get all subscriptions on initialization
  }

  getAllSubscriptions(): void {
    this.subscriptionService.getAllSubscriptionTypes()
      .subscribe(subscriptions => this.subscriptions = subscriptions);
  }

  saveSubscription(): void {
    if (this.subscriptionForm.valid) {
      const subscriptionTypeId = this.subscriptionForm.get('subscription_type_id')?.value;
      console.log(subscriptionTypeId);
      this.subscriptionOrderService.createSubscription(subscriptionTypeId).subscribe({
        next: response => {
          //TODO: add the re-direct on the main page & add the message func;
        },
        error: error => {
          //TODO: add the message func;
          console.log('Error status:', error.status);
          console.log('Error message:', error.message);
        }
      });
    }
  }

  async open(content: any) {
    const subscriptionTypeId = this.subscriptionForm.get('subscription_type_id')?.value;
    this.subscription = await this.subscriptionOrderService.getSubscriptionTypeById(subscriptionTypeId).toPromise();
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        if (result === 'Save click') {
          this.saveSubscription();
        }
    }, (reason) => {
        // handle dismiss, if needed
    });
  }

  

  getSubscriptionTypeName(id: number): string {
    const sub = this.subscriptions.find(subscription => subscription.id_subscription_type === id);
    return sub ? sub.type_name : '';
  }

}
