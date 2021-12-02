/**
 * @fileoverview Interactividad Aplicación incidencias Cabildo de Lanzarote
 * @version 0.1
 * @author Juanjo Alonso Sánchez <jj.alonso@esla.com>
 * @copyright cgb@esla.com
 */

//--Variables
const body = document.querySelector("body");
const mediaQuery991 = window.matchMedia('(max-width: 991px)');
const menuResponsive = document.querySelector(".menu-responsive");
const menuNavegacion = document.querySelector(".main-nav");
const btnSalir = document.querySelector(".close-btn");
const btnSalirSearch = document.querySelector(".close-btn-search");
const itemCabildoResponde = document.querySelector(".last-link");
const submenu = document.querySelector(".submenu");
const iconSubmenu = document.querySelectorAll(".submenu .icon-item-submenu");
const itemSubmenu = document.querySelectorAll(".submenu li");
const iconoDesplegable = document.querySelector(".fa-chevron-down");
const lastItem = document.querySelector(".last-link");
const wrapperMenu = document.querySelector(".wrapper-menu");
const menuBusqueda = document.querySelectorAll(".buscar");
const paginaBusqueda = document.querySelector(".search-page");
const labelSearch = document.querySelector(".main-search label");
const inputSearch = document.querySelector("#busqueda-general");
const imageUpload = document.querySelector("#file-uploader");
let cabildoClick = false;
let responsive = false;
let salir = false;
let contadorBusqueda = 0;

//--Funciones
/**
  * Comprueba si existe el nodo solicitado
  * @param  {nodo}
  * @return  {true/false}
  */
function exists(data){
    if (data !== null && data !== undefined){
      return true;    
    }else{
        return false;
    }
}
/**
  * Comprueba si el texto solicitado es de tipo String
  * @param  {texto}
  * @return  {true/false}
  */
function isString(inputText){
    if(typeof inputText === 'string' || inputText instanceof String){
        return true;    
    }else{
        return false;
    }
}
/**
  * Añade o elimina la clase solicitada a un nodo dado
  * @param  {nodo, clase}
  * @return  {}
  */
function añadirClase(nodo, clase){
    if (isString(clase) && exists(nodo)){
        nodo.classList.add(clase);
    }    
}
function eliminarClase(nodo, clase){
    if (isString(clase) && exists(nodo)){
        nodo.classList.remove(clase);
    }    
}
/**
  * Valida si hay texto dentro del input
  * @param  {}
  * @return  {true/false}
  */
function validarInput() {
    const inputSearchValue = document.querySelector("#busqueda-general").value;
    let inputLenght = String(inputSearchValue).length;
    if ( inputLenght === 0) {
      return false;
    }
    return true;
}
/**
  * Posiciona el menú en la página
  * @param  {}
  * @return  {}
  */
function posicionarMenu() {
    var altura_del_header = $('header').outerHeight(true);
    if (($(window).scrollTop() >= altura_del_header) && (!responsive)){
        $('.wrapper-menu').removeClass('hide', 5000, 'swing');
    }
    else{
        $('.wrapper-menu').addClass('hide', 5000, 'swing');
    }
}

//--Código
//Controlar Responsive
//Si es responsive hacemos menú acordeón footer
if (window.innerWidth < 992){
    responsive = true;
  }
mediaQuery991.addEventListener('change', function() {
    let cambioPantalla = this.matches;  
    if(cambioPantalla){
      responsive = true;
      iconSubmenu.forEach(
        function(item) {
            item.className="fas fa-long-arrow-alt-right icon-item-submenu";
        }
      );
      añadirClase(wrapperMenu,"hide");
    }else{
      responsive = false;
      iconSubmenu.forEach(
        function(item) {
            item.className="icon-item-submenu";
        }
      );        
    }
  }); 

//Menú Fijo
posicionarMenu(); 
$(window).scroll(function() {    
    posicionarMenu();
});
 
//Menú Responsive
document.addEventListener("mouseleave", function(event){
    if(responsive && !salir){
        if((event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) && (cabildoClick)){  
            if(submenu.className === 'submenu visible'){
                submenu.classList.toggle("visible");
                iconoDesplegable.classList.toggle("rotate-180");
                cabildoClick = false;
            }            
        }
    }    
});
menuResponsive.addEventListener("click", function(){
  añadirClase(btnSalir, "visible");
  añadirClase(menuNavegacion, "aparecer-menu");
  añadirClase(body, "noscroll"); 
  iconSubmenu.forEach(
    function(item) {
        item.className="fas fa-long-arrow-alt-right icon-item-submenu";
    }
  );
  salir = false;
});
btnSalir.addEventListener("click", function(){
  eliminarClase(menuNavegacion, "aparecer-menu");
  eliminarClase(body, "noscroll");
  eliminarClase(submenu,"visible");
  eliminarClase(iconoDesplegable,"rotate-180");
  iconSubmenu.forEach(
    function(item) {
        item.className="icon-item-submenu";
    }
  );  
  salir = true;
  
});
itemCabildoResponde.addEventListener("click", function(){
    if(responsive){
        submenu.classList.toggle("visible");
        iconoDesplegable.classList.toggle("rotate-180");
        cabildoClick = true;
    }    
});

itemSubmenu.forEach(
    function(item) {
        item.addEventListener("click", function(){
            añadirClase(lastItem, "shadow");
        });
    }
);

//Subida de imagen
if (exists(imageUpload)){
    imageUpload.addEventListener("change",function(ev){
        let files = ev.target.files;
        let image = files[0];
        let type = image.type.split("/")[1];
        let imageURL = '';
        let tamPantalla = window.innerWidth;
        if (type==='jpeg' || type==='png' || type==='gif'){
            imageURL = URL.createObjectURL(image);
        }else{
            if (tamPantalla<992){
                imageURL = '../images/documento-seleccionado.jpg';
            }else{
                imageURL = '../images/app-documento-seleccionado.jpg';
            }            
        }        
  
        document.querySelector(".preview-image").style.backgroundImage = "url('"+ imageURL +"')";
        document.querySelector(".documento-seleccionado").innerHTML = (`Documento: ${String(image.name)}`);
  });
}

//Búsqueda
menuBusqueda.forEach(
    function(item) {
        item.addEventListener("click", function(event){
            event.preventDefault();
            añadirClase(paginaBusqueda, "aparecer-busqueda");
            añadirClase(body, "noscroll"); 
            añadirClase(labelSearch, "desaparecer");
        });
    }
);
btnSalirSearch.addEventListener("click", function(){
    eliminarClase(paginaBusqueda, "aparecer-busqueda");
    eliminarClase(body, "noscroll"); 
    eliminarClase(labelSearch, "desaparecer");
    eliminarClase(labelSearch, "active");
    eliminarClase(inputSearch, "borde-rojo");
    document.querySelector("#busqueda-general").placeholder = 'Escriba aquí para buscar en la web';
    document.querySelector("#busqueda-general").value = '';
    contadorBusqueda = 0;
});
inputSearch.addEventListener("keyup", function(event){
    if( (event.keyCode === 8) && (!validarInput()) ){
        eliminarClase(labelSearch, "active");  
        contadorBusqueda = 0;
    }else if (contadorBusqueda === 0){        
        añadirClase(labelSearch, "active");
        contadorBusqueda += 1;     
    }
});
inputSearch.addEventListener("click", function(){
    eliminarClase(labelSearch, "desaparecer");    
    añadirClase(inputSearch, "borde-rojo");
    document.querySelector("#busqueda-general").placeholder = '';
});

//Si hacemos clic fuera del input
document.addEventListener("click", function(event){
    let caracteresInput = String(document.querySelector("#busqueda-general").value).length;
    if((event.target !== inputSearch) && (caracteresInput === 0)) {
        añadirClase(labelSearch, "desaparecer");
        eliminarClase(labelSearch, "active");
        eliminarClase(inputSearch, "borde-rojo");
        document.querySelector("#busqueda-general").placeholder = 'Escriba aquí para buscar en la web';
        contadorBusqueda = 0;
    }
}, false);
