import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import lmsCaseStudyReference from "@salesforce/messageChannel/Lms_Case_Study__c";
import { publish, MessageContext } from "lightning/messageService";

export default class RecordForm extends LightningElement {
     isSpinner;

     @wire(MessageContext)
     messageContext;

     handleError(error) {
          this.isSpinner = false;
          console.error("Error when updating case  " + JSON.stringify(error));
          this.showToast("Error when updating case");
     }

     handleSuccess() {
          this.isSpinner = false;
          this.showToast("Infra Case Created Successfully", "", "success");
          const payload = { message: "Contact Created Successfully" };
          publish(this.messageContext, lmsCaseStudyReference, payload);
          this.refs.cancel?.click();
     }
     showToast(title, message, variant) {
          const event = new ShowToastEvent({
               title: title,
               message: message,
               variant: variant
          });
          this.dispatchEvent(event);
     }
}
