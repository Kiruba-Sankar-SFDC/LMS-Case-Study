import { LightningElement, wire } from "lwc";
import { refreshApex } from "@salesforce/apex";
import getContacts from "@salesforce/apex/ContactController.getContacts";
import {
     subscribe,
     unsubscribe,
     APPLICATION_SCOPE,
     MessageContext
} from "lightning/messageService";
import lmsCaseStudyReference from "@salesforce/messageChannel/Lms_Case_Study__c";
export default class DataTable extends LightningElement {
     subscription = null;

     @wire(MessageContext)
     messageContext;
     subscribeToMessageChannel() {
          if (!this.subscription) {
               this.subscription = subscribe(
                    this.messageContext,
                    lmsCaseStudyReference,
                    (message) => this.handleMessage(message),
                    { scope: APPLICATION_SCOPE }
               );
          }
     }
     handleMessage(message) {
          console.log("I cameeeeeeeeeeeee");
          console.log(message.message);
          return refreshApex(this.wiredData);
     }
     unsubscribeToMessageChannel() {
          unsubscribe(this.subscription);
          this.subscription = null;
     }
     connectedCallback() {
          this.subscribeToMessageChannel();
     }

     disconnectedCallback() {
          this.unsubscribeToMessageChannel();
     }

     columns = [
          { label: "Contact Name", fieldName: "Name", type: "text" },
          {
               label: "Department",
               fieldName: "Department",
               type: "text",
               cellAttributes: {
                    iconName: { fieldName: "TrendIcon" },
                    iconPosition: "right"
               }
          },
          {
               label: "Birthdate",
               fieldName: "Birthdate",
               type: "date"
          }
     ];
     wiredData;
     contacts;

     @wire(getContacts)
     getContacts(result) {
          this.wiredData = result;
          if (result.data) {
               this.contacts = result.data;
          } else if (result.error) {
               console.error("Error when fetching contacts " + result.error);
          }
     }
}
