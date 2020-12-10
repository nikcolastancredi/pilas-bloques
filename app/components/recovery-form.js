import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { userExistsInDB } from './userExistsInDB';
import { cuilExistsInDB } from './cuilExistsInDB';
import { updatePassword } from './updatePassword';

export default Component.extend ({
    
    @tracked
    existUser: false,
    userName: '',
    cuil: '',
    pass: '',

    actions:{
        passwordRecovery() {
        
            if(this.userName == '' || this.pass == ''){
                alert('El campo usuario y/o Contraseña no puede ser vacio')
            }
            else{
                //Validacion en una lista en ves de la base de datos
                if(userExistsInDB(this.userName)){
                    this.existUser = !this.bool;
                    //Tiene que aparecer dos campos parentCUIL y newPassword
                    //Validar el campo del parentCuil 
                    console.log(this.existUser);
                    const expresion = /\b(20|23|24|27|30|33|34)(\D)?[0-9]{8}(\D)?[0-9]/g;
                    const valido = this.cuil.match(expresion); 
                    if (valido && cuilExistsInDB(this.cuil)){
                        updatePassword(this.pass);
                        alert('Se recupero la contraseña');
                    }
                    else {
                        alert('El Cuil no es valido')
                    }
                
                }
                else{
                    alert('No hay un usuario registrado con ese nombre. ¿Quizás te equivocaste al escribir ?. Si no te registraste podés hacerlo acá')
                }
                
            }
        }
    }


});