window.onload = function(){ //Acciones tras cargar la página
pantalla=document.getElementById("textoPantalla"); //elemento pantalla de salida
}
x="0"; //número en pantalla
xi=1; //iniciar número en pantalla: 1=si; 0=no;
coma=0; //estado coma decimal 0=no, 1=si;
ni=0; //número oculto o en espera.
op="no"; //operación en curso; "no" =  sin operación.

//mostrar número en pantalla según se va escribiendo:
function numero(xx) { //recoge el número pulsado en el argumento.
         if (x=="0" || xi==1  ) {	// inicializar un número, 
            pantalla.innerHTML=xx; //mostrar en pantalla
            x=xx; //guardar número
            if (xx==".") { //si escribimos una coma al principio del número
               pantalla.innerHTML="0."; //escribimos 0.
               x=xx; //guardar número
               coma=1; //cambiar estado de la coma
               }
           }
           else { //continuar escribiendo un número
               if (xx=="." && coma==0) { //si escribimos una coma decimal pòr primera vez
                   pantalla.innerHTML+=xx;
                   x+=xx;
                   coma=1; //cambiar el estado de la coma  
               }
               //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
               else if (xx=="." && coma==1) {} 
               //Resto de casos: escribir un número del 0 al 9: 	 
               else {
                   pantalla.innerHTML+=xx;
                   x+=xx
               }
            }
            xi=0 //el número está iniciado y podemos ampliarlo.
         }
function operar(s) {
         igualar() //si hay operaciones pendientes se realizan primero
         ni=x //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
         op=s; //guardamos tipo de operación.
         xi=1; //inicializar pantalla.
         }	
function igualar() {
         if (op=="no") { //no hay ninguna operación pendiente.
            pantalla.innerHTML=x;	//mostramos el mismo número	
            }
         else { //con operación pendiente resolvemos
            sl=ni+op+x; // escribimos la operación en una cadena
            if(op=="^"){
                potxy(ni,x);
            }
            else{
                sol=eval(sl) //convertimos la cadena a código y resolvemos
                pantalla.innerHTML=sol //mostramos la solución
                x=sol; //guardamos la solución
            }
            op="no"; //ya no hay operaciones pendientes
            xi=1; //se puede reiniciar la pantalla.
            }
        }

function potxy(arg, p){
    if(arg=="e^"){
        x=Math.pow(Math.E,p);
    }
    else{
        x=Math.pow(arg,p);
    }
    pantalla.innerHTML=x;
}
function binario(){
    var digito = 0;
    var entero=Math.trunc(x);
    var concatenacion ="";
    var cadenaR ="";
    while(entero > 1){
        digito = (entero%2);
        concatenacion += "" + digito;
        entero = entero/2;
        entero = Math.trunc(entero);
    }
    concatenacion += 1;
    for (var a=concatenacion.length-1; a>=0; a--){
            cadenaR += "" + concatenacion.charAt(a);
    }
        
        var recorrer=x;
        var ss="";
        var c;
        for(c=0; c<recorrer.length;c++){
            ss=recorrer.charAt(c);
            if(ss=="."){
                cadenaR+=".";
                var subcadena=recorrer.substring(c,recorrer.length);
                var decimal=subcadena;
                console.log("subcadena "+subcadena);
                var j=0;
                while (decimal!=1 && j<5){
                    cadenaR+=Math.trunc(decimal*2);
                    decimal=decimal*2;
                    if(decimal>1){
                        decimal=decimal-1;
                    }
                    j++;
                }
            }
        }
    pantalla.innerHTML=cadenaR;
}

function octal() {
    var digito = 0;
    var entero=Math.trunc(x);
    var concatenacion ="";
    var cadenaR ="";
    
        while(entero > 7){
             digito = (entero%8);
             concatenacion += "" + digito;
             entero = entero/8;
             entero = Math.trunc(entero);
             console.log("concatenacion " + concatenacion, 
             "entero " + entero, "digito " + digito);
        }
        concatenacion+= entero;

        for (var a=concatenacion.length-1; a>=0; a--){
            cadenaR += "" + concatenacion.charAt(a);
        }
        var recorrer=x;
        var ss="";
        var c;
        for(c=0; c<recorrer.length;c++){
            ss=recorrer.charAt(c);
            if(ss=="."){
                cadenaR+=".";
                var subcadena=recorrer.substring(c,recorrer.length);
                var decimal=subcadena;
                var j=0;
                while (decimal!=7 && j<5){
                    cadenaR+=Math.trunc(decimal*8);
                    decimal=decimal*8;
                    if(decimal>7){
                        decimal=decimal-7;
                    }
                    j++;
                    if((decimal%1)==0){
                        j=5;
                    }
                    else{
                        decimal=(decimal-Math.trunc(decimal));
                    }
                }
            }
        }
    pantalla.innerHTML=cadenaR;

}

function hexadecimal() {
    var digito = null;
    var entero=Math.trunc(x);
    var concatenacion ="";
    var cadenaR ="";
    
        while(entero > 15){
            if(entero%16==10){
                concatenacion+= "A";
            } else if (entero%16==11){
                concatenacion+= "B";
            } else if (entero%16==12){
                concatenacion+= "C"
            } else if (entero%16==13){
                concatenacion+= "D"
            } else if (entero%16==14){
                concatenacion+= "E";
            } else if (entero%16==15){
                concatenacion+= "F";
            } else {
                digito = entero%16;
                concatenacion+= digito;
            }
            entero=Math.trunc(entero/16);
        }
        if(entero==10){
            concatenacion+= "A";
        } else if (entero==11){
            concatenacion+= "B";
        } else if (entero==12){
            concatenacion+= "C"
        } else if (entero==13){
            concatenacion+= "D"
        } else if (entero==14){
            concatenacion+= "E";
        } else if (entero==15){
            concatenacion+= "F";
        } else {
            concatenacion+= entero;
        }
        for (var a=concatenacion.length-1; a>=0; a--){
            cadenaR += "" + concatenacion.charAt(a);
        }
        var recorrer=x;
        var ss="";
        var c;
        for(c=0; c<recorrer.length;c++){
            ss=recorrer.charAt(c);
            if(ss=="."){
                cadenaR+=".";
                var subcadena=recorrer.substring(c,recorrer.length);
                var decimal=subcadena;
                var j=0;
                while (decimal!=16 && j<5){
                    if((Math.trunc(decimal*16))==10){
                        cadenaR+= "A";
                    } else if ((Math.trunc(decimal*16))==11){
                        cadenaR+= "B";
                    } else if ((Math.trunc(decimal*16))==12){
                        cadenaR+= "C";
                    } else if ((Math.trunc(decimal*16))==13){
                        cadenaR+= "D";
                    } else if ((Math.trunc(decimal*16))==14){
                        cadenaR+= "E";
                    } else if ((Math.trunc(decimal*16))==15){
                        cadenaR+= "F";
                    } else {
                        cadenaR+=Math.trunc(decimal*16);
                    }
                    decimal = decimal * 16;
                    if(decimal > 15){
                        decimal = decimal - 15;
                    }
                    j++;
                    if((decimal%1)==0){
                        j=5;
                    } else{
                        decimal = (decimal-Math.trunc(decimal));
                    }
                }
            i= recorrer.length;
            }  
        }
    pantalla.innerHTML=cadenaR;

        
}
function raizc() {
         x=Math.sqrt(x) //resolver raíz cuadrada.
         pantalla.innerHTML=x; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla 
         }
function porcent() { 
         x=x/100 //dividir por 100 el número
         pantalla.innerHTML=x; //mostrar en pantalla
         igualar() //resolver y mostrar operaciones pendientes
         xi=1 //reiniciar la pantalla
         }
function opuest() { 
         nx=Number(x); //convertir en número
         nx=-nx; //cambiar de signo
         x=String(nx); //volver a convertir a cadena
         pantalla.innerHTML=x; //mostrar en pantalla.
         }
function inve() {
         nx=Number(x);
         nx=(1/nx);
         x=String(nx);		 
         pantalla.innerHTML=x;
         xi=1; //reiniciar pantalla al pulsar otro número.
         }

function retro(){ //Borrar sólo el último número escrito.
         cifras=x.length; //hayar número de caracteres en pantalla
         br=x.substr(cifras-1,cifras) //describir último caracter
         x=x.substr(0,cifras-1) //quitar el ultimo caracter
         if (x=="") {x="0";} //si ya no quedan caracteres, pondremos el 0
         if (br==".") {coma=0;} //Si el caracter quitado es la coma, se permite escribirla de nuevo.
         pantalla.innerHTML=x; //mostrar resultado en pantalla	 
         }
function borradoParcial() {
        pantalla.innerHTML=0; //Borrado de pantalla;
        x=0; //Borrado indicador número pantalla.
        coma=0;	//reiniciamos también la coma				
        }
function borradoTotal() {
         pantalla.innerHTML=0; //poner pantalla a 0
         x="0"; //reiniciar número en pantalla
         coma=0; //reiniciar estado coma decimal 
         ni=0 //indicador de número oculto a 0;
         op="no" //borrar operación en curso.
         }
function FactorialNumero() {
let a=1;
for(let r = x; r>0; r--){
    a = a*r;
}
x=a;
pantalla.innerHTML=x;
}
function Pi() {
x=Math.PI;
pantalla.innerHTML=x;
}
function Sin() {
x=Math.sin(x)
pantalla.innerHTML=x;
op="no";
xi=1;
}
function Cos() {
x=Math.cos(x)
pantalla.innerHTML=x;
op="no";
xi=1;
}
function Tan() {
x=Math.tan(x)
pantalla.innerHTML=x;
op="no";
xi=1;
}
function Logaritmo() {
x=Math.log10(x);
pantalla.innerHTML=x;
op="no";
xi=1;
}
function LogaritmoNatural() {
x=Math.log(x);
pantalla.innerHTML=x;
op="no";
xi=1;
}
function NumeroAlCuadrado() {
x=Math.pow(x, 2);
pantalla.innerHTML=x;
op="no";
xi=1;
}
function NumeroAlCubo() {
x=Math.pow(x, 3);
pantalla.innerHTML=x;
op="no";
xi=1;
}
function NumeroAlaPotencia() {

}
function ExponencialAlaPotencia() {
let a = Math.E;
x=Math.pow(a, x);
pantalla.innerHTML=x;
op="no";
xi=1;
}
function Neper() {
x=Math.E;
pantalla.innerHTML=x;
}