/**
 * @fileoverview Interactividad Aplicación incidencias Cabildo de Lanzarote
 * @version 0.1
 * @author Juanjo Alonso Sánchez <jj.alonso@esla.com>
 * @copyright cgb@esla.com
 */

//--Variables
const body = document.querySelector("body");
const mediaQuery991 = window.matchMedia('(max-width: 991px)');
const mediaQuery596 = window.matchMedia('(max-width: 596px)');
const menuResponsive = document.querySelector(".menu-responsive");
const menuNavegacion = document.querySelector(".main-nav");
const btnSalir = document.querySelector(".close-btn");
const btnSalirSearch = document.querySelector(".close-btn-search");
const btnSalirLogin = document.querySelector(".close-btn-login");
const itemCabildoResponde = document.querySelector(".last-link");
const navMenu = document.querySelector(".nav-menu");
const submenu = document.querySelector(".submenu");
const avatar = document.querySelectorAll(".avatar-usuario");
const iconSubmenu = document.querySelectorAll(".submenu .icon-item-submenu");
const itemSubmenu = document.querySelectorAll(".submenu li");
const iconoDesplegable = document.querySelector(".responsive-desplegable-icon");
const lastItem = document.querySelector(".last-link");
const wrapperMenu = document.querySelector(".wrapper-menu");
const menuBusqueda = document.querySelectorAll(".buscar");
const paginaBusqueda = document.querySelector(".search-page");
const labelSearch = document.querySelector(".main-search label");
const inputSearch = document.querySelector("#busqueda-general");
const imageUpload = document.querySelector("#file-uploader");
const menuLogin = document.querySelectorAll(".login");
const paginaLogin = document.querySelector(".login-page");
const labelLogin = document.querySelectorAll(".etiqueta-login");
const inputLogin = document.querySelectorAll(".input-login");
const mainLogin = document.querySelector(".main-login");
const forgotLogin = document.querySelector(".forgot-login");
const forgotPassword = document.querySelector(".forgot-password");
const volverInicioSesion = document.querySelector(".volver-inicio-sesion");
const menu = document.querySelector(".menu-principal");
const iconoMenu = document.querySelector(".menu-principal i");
const sidebar = document.querySelector(".sidebar");
const escritorio = document.querySelector(".escritorio");
const year = document.querySelector(".year");
const fecha = document.querySelector(".fecha"); 
const menuPerfil = document.querySelector(".main-profile");
const verNotificaciones = document.querySelector(".ver-notificaciones");
const submenuNotificaciones = document.querySelector(".submenu-notificaciones");
const aviso = document.querySelectorAll(".aviso");
const mostrarFotos = document.querySelector(".cargar a");
const contenedorFotos = document.querySelector(".contenedor-fotos");
const textoFotosAdjuntas = document.querySelector(".texto-fotos-adjuntas");
const imagenesAdjuntas = document.querySelectorAll(".images-notificacion");
const imagenesModal = document.querySelector(".imagenes-modal");
const imagenModal = document.querySelector(".imagen-ampliada");
const imagenModalNombre = document.querySelector(".imagenes-modal-nombre");
const imagenModalDescargar = document.querySelector(".imagenes-modal-btndescargar");
const imagenModalCerrar = document.querySelector(".imagenes-modal-btncerrar");
const contenedorChat = document.querySelector(".container-chat");
const enviarContestacionChat = document.querySelector(".type-chat > button");
const formularioSoporte = document.querySelector(".soporte-contactos");
const campoEmailSoporte = document.querySelector(".soporte-contactos #email");
const campoSelectSoporte = document.querySelector(".soporte-contactos #departamento");
const today = new Date();
const yearText = today.getFullYear();
const longitudCifra = 2;   
let monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
const getDia = rellenarCeros(today.getDate(), longitudCifra);
const day = ( 'Hoy estamos a ' + getDia + ' de ' +  monthNames[today.getMonth()] + ' de ' + yearText);
let cabildoClick = false;
let responsive = false;
let responsiveAdmin = false;
let salir = false;
let contadorBusqueda = 0;
let contadorLogin = 0;
let sidebarVisible = false;

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
function validarInput(nodo) {
    const inputSearchValue = nodo.value;
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
/**
  * Devuelve el día con ceros si es necesario
  * @param  {numero, longitudCifra}
  * @return  {numero con o sin ceros}
  */
 function rellenarCeros(numero, longitudCifra) {
    let valorNumero = Math.abs(numero).toString();
    let longitudNumero = numero.toString().length;
    let cero = "0"; 
    
    if(Number(longitudNumero) < longitudCifra){
        return (cero + valorNumero);
    }else{
        return numero;
    }
}
/**
  * Devuelve el día con ceros si es necesario
  * @param  {}
  * @return  {nombre navegador}
  */
 function detectarNavegador() {
    let sBrowser, sUsrAg = navigator.userAgent;

    if(sUsrAg.indexOf("Chrome") > -1) {
        sBrowser = "Google Chrome";
    } else if (sUsrAg.indexOf("Safari") > -1) {
        sBrowser = "Apple Safari";
    } else if (sUsrAg.indexOf("Opera") > -1) {
        sBrowser = "Opera";
    } else if (sUsrAg.indexOf("Firefox") > -1) {
        sBrowser = "Mozilla Firefox";
    } else if (sUsrAg.indexOf("MSIE") > -1) {
        sBrowser = "Microsoft Internet Explorer";
    }
    return sBrowser;
}
/**
  * Devuelve la imagen comprimida
  * @param  {imagen original, calidad de la imagen, ancho máximo, formato de salida}
  * @return  {imagen comprimida}
  */
function comprimirImagen(objetoImagenEntrada, calidadImagen, maxWidth, formatoSalida){
    let mime_type = "image/jpeg";
    if(typeof formatoSalida !== "undefined" && formatoSalida=="png"){
        mime_type = "image/png";
    }

    maxWidth = maxWidth || 1000;
    let natW = objetoImagenEntrada.naturalWidth;
    let natH = objetoImagenEntrada.naturalHeight;
    let ratio = natH / natW;
    if (natW > maxWidth) {
        natW = maxWidth;
        natH = ratio * maxWidth;
    }

    let cvs = document.createElement('canvas');
    cvs.width = natW;
    cvs.height = natH;

    let ctx = cvs.getContext("2d").drawImage(objetoImagenEntrada, 0, 0, natW, natH);
    let newImageData = cvs.toDataURL(mime_type, calidadImagen/100);
    let objetoImagenSalida = new Image();
    objetoImagenSalida.src = newImageData;
    return objetoImagenSalida;
}

//--Código
//Controlar Responsive
//Si es responsive hacemos menú acordeón footer
if (window.innerWidth < 992){
    responsive = true;
    if (window.innerWidth < 596){
        responsiveAdmin = true;
    }
}
mediaQuery991.addEventListener('change', function() {
    let cambioPantalla = this.matches;  
    if(cambioPantalla){
      responsive = true;
      if (exists(iconSubmenu)){
        iconSubmenu.forEach(
            function(item) {
                item.className="fas fa-long-arrow-alt-right icon-item-submenu";
            }
          );
      }      
      añadirClase(wrapperMenu,"hide");
      añadirClase(menuPerfil,"column");
    }else{
      responsive = false;
      if (exists(iconSubmenu)){
        iconSubmenu.forEach(
            function(item) {
                item.className="icon-item-submenu";
            }
        );
      }       
      eliminarClase(menuPerfil,"column");
    }
}); 
mediaQuery596.addEventListener('change', function() {
    let cambioPantalla = this.matches;  
    let clasesSidebar;
    let encontrado = false;
    if(cambioPantalla){
      responsiveAdmin = true;
      if (exists(sidebar)){
        clasesSidebar = sidebar.className.split(" ");
        for (let i=0; i<clasesSidebar.length; i++)
        {
            if (clasesSidebar[i]=== "visible"){
                encontrado = true;
            }
        }
        if(encontrado){
            añadirClase(escritorio, "hide");
        } 
      }        
      añadirClase(menuPerfil,"column");
    }else{
      responsiveAdmin = false; 
      eliminarClase(escritorio, "hide");         
    }
}); 

//Menú Fijo
posicionarMenu(); 
$(window).scroll(function() {    
    posicionarMenu();
});
 
//Menú Responsive
if (exists(navMenu)){
    navMenu.addEventListener("mouseleave", function(event){
        if(responsive && !salir){
            if(submenu.className === 'submenu visible'){
                submenu.classList.toggle("visible");
                iconoDesplegable.classList.toggle("rotate-180");
                cabildoClick = false;            
            }
        }    
    });
}

if (exists(menuResponsive)){
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
}
if (exists(btnSalir)){
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
}

if (exists(itemCabildoResponde)){
    itemCabildoResponde.addEventListener("click", function(){
        if(responsive){
            submenu.classList.toggle("visible");
            iconoDesplegable.classList.toggle("rotate-180");
            cabildoClick = true;
        }    
    });
}
if (exists(itemSubmenu)){
    itemSubmenu.forEach(
        function(item) {
            item.addEventListener("click", function(){
                añadirClase(lastItem, "shadow");
            });
        }
    );
}

//Al hacer clic en el avatar ir al panel de administración
if (exists(avatar)){
    avatar.forEach(
        function(item) {
            item.addEventListener("click",function(){
                if (item.parentElement.className.split(" ")[0] !== "imageup"){
                    window.location.href = '/perfil.html';                    
                }                
            });        
        }
    );
}

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
if (exists(menuBusqueda)){
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
}
if (exists(btnSalirSearch)){
    btnSalirSearch.addEventListener("click", function(){
        eliminarClase(paginaBusqueda, "aparecer-busqueda");
        eliminarClase(body, "noscroll"); 
        eliminarClase(labelSearch, "desaparecer");
        eliminarClase(labelSearch, "active");
        eliminarClase(inputSearch, "colorear-borde");
        document.querySelector("#busqueda-general").placeholder = 'Escriba aquí para buscar en la web';
        document.querySelector("#busqueda-general").value = '';
        contadorBusqueda = 0;
    });
}
if (exists(inputSearch)){
    inputSearch.addEventListener("keyup", function(event){
        if( (event.keyCode === 8) && (!validarInput(inputSearch)) ){
            eliminarClase(labelSearch, "active");  
            contadorBusqueda = 0;
        }else if (contadorBusqueda === 0){        
            añadirClase(labelSearch, "active");
            contadorBusqueda += 1;     
        }
    });
    inputSearch.addEventListener("click", function(){
        eliminarClase(labelSearch, "desaparecer");    
        añadirClase(inputSearch, "colorear-borde");
        document.querySelector("#busqueda-general").placeholder = '';
    });
    //Si hacemos clic fuera del input
    document.addEventListener("click", function(event){
        let caracteresInput = String(inputSearch.value).length;
        if((event.target !== inputSearch) && (caracteresInput === 0)) {
            añadirClase(labelSearch, "desaparecer");
            eliminarClase(labelSearch, "active");
            eliminarClase(inputSearch, "colorear-borde");
            document.querySelector("#busqueda-general").placeholder = 'Escriba aquí para buscar en la web';
            contadorBusqueda = 0;
        }
    }, false);
}


//Login
if (exists(menuLogin)){
    menuLogin.forEach(
        function(item) {
            item.addEventListener("click", function(event){
                event.preventDefault();
                añadirClase(paginaLogin, "aparecer-login");
                añadirClase(body, "noscroll"); 
                labelLogin.forEach(
                    function(etiqueta) {
                        añadirClase(etiqueta, "desaparecer");
                    }
                );            
            });
        }
    );
}
if (exists(btnSalirLogin)){
    btnSalirLogin.addEventListener("click", function(){
        eliminarClase(paginaLogin, "aparecer-login");
        eliminarClase(body, "noscroll"); 
        labelLogin.forEach(
            function(etiqueta) {
                eliminarClase(etiqueta, "desaparecer");
                eliminarClase(etiqueta, "active");
            }
        ); 
        inputLogin.forEach(
            function(input) {
                eliminarClase(input, "colorear-borde");
                input.value = '';
            }
        ); 
        contadorLogin = 0;
    });
}
if (exists(inputLogin)){
    inputLogin.forEach(
        function(input) {        
            let idInput = input.getAttribute('id'); 
            input.addEventListener("keyup", function(event){
                if( (event.keyCode === 8) && (!validarInput(input)) ){
                    labelLogin.forEach(
                        function(etiqueta) {
                            let forLabel = etiqueta.getAttribute('for');
                            if (forLabel=== idInput){
                                eliminarClase(etiqueta, "active");  
                                contadorLogin = 0;
                            }                    
                        }
                    );
                }else if (contadorLogin === 0){   
                    labelLogin.forEach(
                        function(etiqueta) {
                            let forLabel = etiqueta.getAttribute('for');
                            if (forLabel=== idInput){
                                añadirClase(etiqueta, "active");
                                contadorLogin += 1; 
                            }                    
                        }
                    );        
                }
            });
    
            input.addEventListener("click", function(){           
                labelLogin.forEach(
                    function(etiqueta) {
                        let forLabel = etiqueta.getAttribute('for');
                        if (forLabel=== idInput){
                            eliminarClase(etiqueta, "desaparecer");
                        }                    
                    }
                );     
                añadirClase(input, "colorear-borde");
                input.placeholder = '';
            });
        }
    );
    //Si hacemos clic fuera del input
    document.addEventListener("click", function(event){
        if (exists(inputLogin)){
            inputLogin.forEach(
                function(input) {
                    let idInput = input.getAttribute('id');
                    let placeholderInput = input.getAttribute('aria-label');
                    let caracteresInput = String(input.value).length;
                    if((event.target !== input) && (caracteresInput === 0)) {
                        labelLogin.forEach(
                            function(etiqueta) {
                                let forLabel = etiqueta.getAttribute('for');
                                if (forLabel=== idInput){
                                    añadirClase(etiqueta, "desaparecer");
                                    eliminarClase(etiqueta, "active");
                                }                    
                            }
                        );                 
                        eliminarClase(input, "colorear-borde");
                        input.placeholder = placeholderInput;
                        contadorLogin = 0;
                    }
                }
            );
        }        
    }, false);
}

//Forgot Password
if (exists(forgotPassword) && exists(volverInicioSesion)){
    forgotPassword.addEventListener("click", function(event){
        event.preventDefault();
        eliminarClase(forgotLogin, "hide");
        añadirClase(mainLogin, "hide");  
    });
    volverInicioSesion.addEventListener("click", function(event){
        event.preventDefault();
        eliminarClase(mainLogin, "hide");
        añadirClase(forgotLogin, "hide");   
    });
}

//Panel administración
if (exists(menu)){
    if (!responsiveAdmin){
        sidebar.classList.toggle("visible"); 
        iconoMenu.classList.toggle("fa-bars"); 
        iconoMenu.classList.toggle("fa-times");
        sidebarVisible = true;        
    }else{
        escritorio.classList.toggle("margin-left-0");
        sidebarVisible = false;                
    }
    if (responsive){
        if (exists(menuPerfil)){
            añadirClase(menuPerfil,"column");
        }
    }
    menu.addEventListener("click", function(event){
        event.preventDefault();
        let clasesSidebar;
        let encontrado = false;
        sidebar.classList.toggle("visible");
        iconoMenu.classList.toggle("fa-bars"); 
        iconoMenu.classList.toggle("fa-times");         
        escritorio.classList.toggle("margin-left-0");
        if (responsiveAdmin){
            clasesSidebar = sidebar.className.split(" ");
            for (let i=0; i<clasesSidebar.length; i++)
            {
                if (clasesSidebar[i]=== "visible"){
                    encontrado = true;
                }
            }
            if(encontrado){
                añadirClase(escritorio, "hide");
            }else{
                eliminarClase(escritorio, "hide"); 
            }
        }else if (responsive){
            if (exists(menuPerfil)){
                añadirClase(menuPerfil,"column");
            }
        }        
    });
    verNotificaciones.addEventListener("click", function(event){
        event.preventDefault(); 
        eliminarClase(submenuNotificaciones,"hide"); 
        if (responsiveAdmin){
            eliminarClase(sidebar,"visible");
            añadirClase(escritorio,"margin-left-0");
            añadirClase(iconoMenu,"fa-bars");
            eliminarClase(iconoMenu,"fa-times");        
            eliminarClase(escritorio,"hide");
        }
    });
}
//Si hacemos clic fuera de las notificaciones nos salimos de ellas
document.addEventListener("click", function(event){
    if (exists(menu)){
        let focoClic = event.target.className;
        if(focoClic !== "far fa-bell admin-icon-item circle" && submenuNotificaciones.className === "submenu-notificaciones") {
            añadirClase(submenuNotificaciones,"hide");
        } 
    }       
}, false);
//Establecemos el año
if (exists(year) && exists(fecha)){
    year.innerHTML = yearText;
    fecha.innerHTML = day;
}
//Ocultamos mensaje notificaciones
if (exists(aviso)){
    aviso.forEach(
        function(item) {
            item.lastElementChild.addEventListener("click", function(event){
                event.preventDefault(); 
                añadirClase(item,"hide");  
            });
        }
      );    
}

//Fotos adjuntas
if (exists(contenedorFotos)){
    //Cargamos las fotos adjuntas
    imagenesAdjuntas.forEach(
        function(imagen) {
            let srcImagen = imagen.getAttribute("data-src");  
            let imagenComprimida;          
            imagen.setAttribute("src", srcImagen);   
            window.addEventListener("load", function(){
                if(responsiveAdmin){
                    imagenComprimida = comprimirImagen(imagen, 300, 596, 'jpg');
                    imagen.setAttribute("src", imagenComprimida.src); 
                }        
            });                
        }
    );    
    //Mostramos las fotos adjuntas
    mostrarFotos.addEventListener("click", function(event){
        event.preventDefault(); 
        contenedorFotos.classList.toggle("hide");
        if (exists(textoFotosAdjuntas)){
            if (contenedorFotos.className === "contenedor-fotos"){
                textoFotosAdjuntas.innerHTML = "Ocultar fotos adjuntas";
            }else{
                textoFotosAdjuntas.innerHTML = "Ver fotos adjuntas";
            }
        }        
     }); 
     //Ampliamos las fotos adjuntas 
     imagenesAdjuntas.forEach(
        function(imagen) {
            let srcImagen = imagen.src;
            let nombreImagen = srcImagen.split("/").pop();
            imagen.addEventListener("click", function(event){
                event.preventDefault(); 
                imagenesModal.style.display = "flex";
                imagenModal.setAttribute("src", srcImagen);
                imagenModalNombre.innerHTML = nombreImagen;
                body.style.overflow = "hidden";
            });            
        }
      );
      imagenModalCerrar.addEventListener("click", function(event){
        event.preventDefault(); 
        imagenesModal.style.display = "none";
        body.style.overflow = "auto";
      });
      imagenModalDescargar.addEventListener("click", function(event){
        event.preventDefault(); 
        let a = document.createElement('a');
        a.download = imagenModalNombre.innerHTML.split(".")[0];
        a.target = '_blank';
        a.href= imagenModal.getAttribute("src");
        a.click();
      });
}

//Mostramos scroll convesacióon chat al pasar ratón por encima y establecemos el foco al final cuando escribimos
if (exists(contenedorChat)){
    contenedorChat.addEventListener("mouseover", function(){
        if (detectarNavegador() === "Google Chrome"){
            añadirClase(contenedorChat,"overflow-y-overlay");
        }else{
            añadirClase(contenedorChat,"overflow-y-scroll");
        } 
     });  
     contenedorChat.addEventListener("mouseout", function(){
        if (detectarNavegador() === "Google Chrome"){
            eliminarClase(contenedorChat,"overflow-y-overlay");
        }else{
            eliminarClase(contenedorChat,"overflow-y-scroll");
        }
     }); 
     enviarContestacionChat.addEventListener("click", function(event){
        event.preventDefault(); 
        contenedorChat.scrollTop = contenedorChat.scrollHeight;     
     }); 
}

//Marcar email sección contactos
if (exists(formularioSoporte)){
    let emailOpcionSeleccionada = campoSelectSoporte.options[campoSelectSoporte.selectedIndex].getAttribute('data-email');
    campoEmailSoporte.value = emailOpcionSeleccionada; 
    campoSelectSoporte.addEventListener("change", function(){
        emailOpcionSeleccionada = campoSelectSoporte.options[campoSelectSoporte.selectedIndex].getAttribute('data-email');
        campoEmailSoporte.value = emailOpcionSeleccionada;      
     });    
}