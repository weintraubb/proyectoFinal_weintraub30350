
import {agregarRazas, agregarClases, agregarPuntos, mostrarPersonaje, mostrar, ocultar, tirarDados} from './functions.js';


class Personaje
{
    constructor(nombrePersonaje, nombreUsuario, raza, clase, habilidades, puntosCaracteristica)
    {
        this.nombrePersonaje = nombrePersonaje;
        this.nombreUsuario = nombreUsuario;
        this.raza = raza;
        this.clase = clase;
        this.habilidades = habilidades;
        this.puntosCaracteristica = puntosCaracteristica;
    }
    asignarBonus()
    {
        for(let i = 0; i<6; i++)
        {
            this.puntosCaracteristica[i] += this.raza.puntosCaracteristica[i];
        }
    }
}

const personaje = new Personaje();

let nombreUsuario;
let nombrePersonaje;
let razas = ["Dracónido", "Elfo", "Enano", "Gnomo", "Humano", "Mediano", "Semielfo", "Semiorco", "Tiflin"];
let razasData = 'razas.json';
let clases = ["Bárbaro", "Bardo", "Brujo", "Clérigo", "Druida", "Explorador", "Guerrero", "Hechicero", "Mago", "Monje", "Paladín", "Pícaro"];
let clasesData = 'clases.json';

let caracteristicas = [{nombre: "Fuerza", puntos: 0}, 
                       {nombre: "Destreza", puntos: 0},
                       {nombre: "Constitución", puntos: 0},
                       {nombre: "Inteligencia", puntos: 0},
                       {nombre: "Sabiduría", puntos: 0},
                       {nombre: "Carisma", puntos: 0}];


agregarRazas(razas);
agregarClases(clases);
ocultar('formCreador');
                
caracteristicas.forEach(carac => {
    agregarPuntos(carac, tirarDados())    
});

if(!localStorage.getItem("personaje")){
    localStorage.setItem("personaje", "[]");
}

let ultimoPersonaje = JSON.parse(localStorage.getItem("personaje"));

//BOTONES
let btnContinuar = document.getElementById('idbtn');
let btnContinuar2 = document.getElementById('idbtn2');
let btnContinuar3 = document.getElementById('idbtn3');
let btnDeNuevo = document.getElementById('idbtnagain');
let btnFinalizar = document.getElementById('idbtn4');
let btnCrear = document.getElementById('idbtnCrear');
let btnVer = document.getElementById('idbtnVer');

//CREAR PERSONAJE
btnCrear.addEventListener('click', ()=> {
    ocultar('menu');
    mostrar('formCreador');
    mostrar('idNombres');
    mostrar('titulo');
})

//VER ULTIMO PERSONAJE
btnVer.addEventListener('click', ()=> {

    if(localStorage.getItem("personaje")!="[]")
    {
        ultimoPersonaje = JSON.parse(localStorage.getItem("personaje"));
        mostrarPersonaje(ultimoPersonaje);

        ocultar('menu');
        mostrar('formCreador');
        ocultar('idNombres');
        ocultar('titulo');
        mostrar('divPers');
    }
    else
    {
        ocultar('idbtnCrear');
        ocultar('idbtnVer');
        Swal.fire({
            title: 'Todavía no se ha creado ningún personaje',
            icon: 'warning',
            confirmButtonText: 'OK'
          }).then(() => {
            mostrar('idbtnCrear');
            mostrar('idbtnVer');
          })
    }
})

//INGRESO DE NOMBRES
btnContinuar.addEventListener('click', ()=>{
    nombreUsuario = document.getElementById('idNombre').value || 'Fulano';
    nombrePersonaje = document.getElementById('idPersonaje').value  || 'Mengano';

    personaje.nombreUsuario = nombreUsuario;
    personaje.nombrePersonaje = nombrePersonaje;
    ocultar('idNombres');
    mostrar('divRazas');
})


//SELECCIÓN DE RAZA
btnContinuar2.addEventListener('click', ()=>{
    let razaRadio = document.querySelector('input[name="raza"]:checked').value;
        fetch(razasData)
            .then((resp)=>resp.json())
            .then((data)=>{
                data.forEach(obj => {
                    if(obj.nombre == razaRadio)
                    {
                        personaje.raza = obj;
                    }
                })
            })

    ocultar('divRazas');
    mostrar('divClases');
})

//SELECCIÓN DE CLASE
btnContinuar3.addEventListener('click', ()=>{
    let claseRadio = document.querySelector('input[name="clase"]:checked').value;
        fetch(clasesData)
            .then((resp)=>resp.json())
            .then((data)=>{
                data.forEach(obj => {
                    if(obj.nombre == claseRadio)
                    {
                        personaje.clase = obj;
                        personaje.habilidades = obj.habilidades;
                    }
                })
            })

    ocultar('divClases');


    Swal.fire({
            
        title: 'TIRANDO DADOS...',
        iconHtml: '<img class="img" src="https://payload141.cargocollective.com/1/10/342029/5124828/Beautiful-Icosahedron.gif">',
        showConfirmButton: false,
        timer: 1500,
        padding: '20px',
        customClass: 'swal-wide',
        background: '#191919',
        color: 'white',
    })


    setTimeout(() => {
            
        mostrar('divPuntos');

    }, 1500);
        

    personaje.puntosCaracteristica = [caracteristicas[0].puntos, caracteristicas[1].puntos, caracteristicas[2].puntos, caracteristicas[3].puntos, caracteristicas[4].puntos, caracteristicas[5].puntos];
})


//TIRAR DADOS DE NUEVO
btnDeNuevo.addEventListener('click', ()=>{

    ocultar('divPuntos');
    Swal.fire({
        title: 'TIRANDO DADOS...',
        iconHtml: '<img class="img" src="https://payload141.cargocollective.com/1/10/342029/5124828/Beautiful-Icosahedron.gif">',
        showConfirmButton: false,
        timer: 1500,
        padding: '20px',
        customClass: 'swal-wide',
        background: '#191919',
        color: 'white',
    })

    setTimeout(() => {

        mostrar('divPuntos');

        let div = document.getElementById('idDestinoP');
        let remover = document.getElementById('idCaracteristicas');
        div.removeChild(remover);
        let destino = document.getElementById('idDestinoP');
        let newDiv = document.createElement('div');
        newDiv.id = 'idCaracteristicas';
        destino.append(newDiv);
        caracteristicas.forEach(carac => {
            agregarPuntos(carac, tirarDados())    
        });

        personaje.puntosCaracteristica = [caracteristicas[0].puntos, caracteristicas[1].puntos, caracteristicas[2].puntos, caracteristicas[3].puntos, caracteristicas[4].puntos, caracteristicas[5].puntos];
        
    }, 1500);
})


//MOSTRAR PERSONAJE
btnFinalizar.addEventListener('click', ()=>{
    personaje.asignarBonus();
    ocultar('divPuntos');
    ocultar('titulo');
    mostrar('divPers');

    mostrarPersonaje(personaje);
    
    if(localStorage.getItem('dark-mode') === 'true'){
        document.body.classList.add('darkTheme');
    }

    else {
        document.body.classList.remove('darkTheme');
    }
    
    localStorage.setItem("personaje", JSON.stringify(personaje));
})

let btnOver = document.getElementById('idbtnReiniciar');

//VOLVER AL MENÚ
btnOver.addEventListener('click', ()=> {
    document.querySelector('form').reset();
    let r = document.querySelector('#divPersonaje');
    r.parentElement.removeChild(r);
    ocultar('divPers');
    ocultar('formCreador');
    mostrar('menu');
})

let btnSwitch = document.getElementById('switch');


//MODO OSCURO
btnSwitch.addEventListener('change', ()=>{
    document.body.classList.toggle('darkTheme');

    document.body.classList.contains('darkTheme') ? localStorage.setItem('dark-mode', 'true') : localStorage.setItem('dark-mode', 'false');
})


if(localStorage.getItem('dark-mode') === 'true'){

    document.body.classList.add('darkTheme');

    document.getElementById('switch').checked = true;
}