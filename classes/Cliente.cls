public with sharing class Cliente{
    
    @AuraEnabled(cacheable=true)
    public static List<Cliente__c> getAllClients(){
      return[
            SELECT Id, First_Name__c, Last_Name__c, Email__c, Phone__c 
            FROM Cliente__c ORDER BY First_Name__c
        ];  
    } 

    @AuraEnabled
    public static void insertClient(String firstName, String lastName, String email, String phone){

        Cliente__c cliente = new Cliente__c(
            First_Name__c = firstName,
            Last_Name__c = lastName,
            Email__c = email,
            Phone__c = phone
        );

        insert cliente;
    }
    
}