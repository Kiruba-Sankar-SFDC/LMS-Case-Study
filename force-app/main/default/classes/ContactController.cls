public without sharing class ContactController {

    @AuraEnabled(cacheable = true)
    public static List<Contact> getContacts(){
        try {
            return [Select Id, Name, Department, Birthdate From Contact];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}