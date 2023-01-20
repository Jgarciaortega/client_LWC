import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Form extends LightningElement {

    nombre;
    apellidos;
    email;
    telefono;

    clickSave(){

        console.log('clicking save');
        if(this.nombre === undefined || this.nombre === ''){
            this.showErrorToast('Es necesario rellenar el nombre para poder validar la inserción del cliente');
            
        }else if(this.apellidos === undefined || this.apellidos === ''){
            this.showErrorToast('Es necesario rellenar los apellidos para poder validar la inserción del cliente');
            
        }else{
 
            const event = new CustomEvent('saverecord', {
                detail:
                {
                    nombre: this.nombre,
                    apellidos: this.apellidos,
                    email: this.email,
                    telefono: this.telefono
                }  
            });
            this.dispatchEvent(event);
            this.cleanInputs();
        }

    }

    cleanInputs(){
        this.template.querySelectorAll('lightning-input').forEach(element => {
           element.value = '';
           this.nombre = '';
           this.apellidos = '';
           this.email = '';
           this.telefono = '';
          });
    }

    setNombre(ev){ 
       this.nombre = ev.detail.value
    }

    setApellidos(ev){
        this.apellidos = ev.detail.value;
    }

    setEmail(ev){
        this.email = ev.detail.value;
    }

    setTelefono(ev){
        this.telefono = ev.detail.value;
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
