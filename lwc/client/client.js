import { LightningElement , wire} from 'lwc';
import getAllClients from "@salesforce/apex/Cliente.getAllClients";
import insertClient from "@salesforce/apex/Cliente.insertClient";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex} from "@salesforce/apex";

export default class Client extends LightningElement {

    clientes;
    wiredClientesList;

    
    @wire(getAllClients)
    wiredClients( result ) {
        this.wiredClientesList = result;
        if(result.data){
            this.clientes = result.data;
        } else if(result.error){
            this.showErrorToast('Se ha producido un error al cargar los usuarios.');
        }     
    }

    saveRecord(ev){   

        let firstName = ev.detail.nombre;
        let lastName = ev.detail.apellidos;
        let email = ev.detail.email;
        let phone = ev.detail.telefono;
        
        console.log(phone);
            insertClient({ firstName: firstName, lastName: lastName, email: email, phone: phone})
            .then((result) => {
                this.showToast();
                refreshApex( this.wiredClientesList);    
            })
            .catch((error) => {
                console.log(error)
                this.showErrorToast('Se ha producido un error al insertar el usuario.');
            });
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'Se ha insertado con éxito los datos del nuevo cliente',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    showErrorToast(msg) {       
        const evt = new ShowToastEvent({
            title: 'Error',
            message: msg,
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

}

