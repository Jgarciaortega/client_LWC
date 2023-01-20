import { LightningElement, track , api} from 'lwc';

const COLUMNS = [
    { label: 'Nombre', fieldName: 'First_Name__c' },
    { label: 'Apellidos', fieldName: 'Last_Name__c' },
    { label: 'Teléfono', fieldName: 'Phone__c'},
    { label: 'Email', fieldName: 'Email__c' }
];



export default class Table extends LightningElement {

    @api clientes;
    columns = COLUMNS;

}