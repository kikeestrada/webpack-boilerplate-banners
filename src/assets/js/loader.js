// esperamos a que el DOM este listo
document.addEventListener('DOMContentLoaded', function (e) {
    window.onload = function () {
        // Una vez que la página termino de cargar, comenzamos el proceso de verificar scripts
        checkInitLoadScripts();
    };
});

// checkInitLoadScripts se encarga de verificar que los componentes (GSAP, Overlay Scrollbars, etc que necesitamos para el banner esten cargados. Si ya se cargaron llama a la función init y si no, espera 50 milisegundos para llamarse a si misma y volver a verificar los componentes
function checkInitLoadScripts() {
    window.gsap && window.ScrollToPlugin && window.OverlayScrollbars
        ? init()
        : setTimeout(checkInitLoadScripts, 50);
}

// fileLoader nos sirve para agregar algun script o link que haga falta, por ejemplo los estilos del banner, al cargarlos de esta manera evitamos que las imagenes sean parte del initialLoad del banner
//esta función recibe dos parametros, ppath que es la dirección del archivo y ptype para el tipo de archivo
// ejemplo de uso: fileLoader("./style.css", "css");
function fileLoader(ppath, ptype) {
    var file;

    if (ptype === 'js') {
        // crea la etiqueta script para agregar el JS
        file = document.createElement('script');
        file.setAttribute('type', 'text/javascript');
        file.setAttribute('src', ppath);
    } else if (ptype === 'css') {
        // crea la etiqueta link para agregar el CSS
        file = document.createElement('link');
        file.setAttribute('rel', 'stylesheet');
        file.setAttribute('href', ppath);
    }

    if (typeof file != 'undefined') {
        // si se creo alguno de los archivos correctamente lo agregamos al head del HTML
        document.querySelector('head').appendChild(file);
    }
}

// clickTagLoader asocia dinamicamente los clickTags con su respectivo trigger, para lograr esto, solo debemos agregar el atributo data-exit sobre el elemento que queremos usar como trigger y en el valor agregar el nombre de la variable del clickTag que se va a usar
// ejemplo de uso: data-exit="clickTag1" para el primer clickTag
function clickTagLoader() {
    // busca a todos los elementos que le agregamos el data-exit
    var exitTriggers = document.querySelectorAll('[data-exit]');

    // clickTagHandler maneja lo que sucede cuando se dispara el click de alguno de los triggers
    function clickTagHandler(e) {
        e.preventDefault(); // detiene el efecto por defecto que tiene el click de ese elemento

        // busca y asigna en una variable el valor del data-exit para elemento que dispara el evento click
        var clickTag = this.getAttribute('data-exit');

        // obtienie del objeto window la variable clickTag que necesitamos para este trigger y abre el link
        window.open(window[clickTag]);
        console.log(clickTag);
    }

    // recorre el arreglo con los elementos que les agregamos el data-exit y les asigna el eventListener
    // para el click para que asi llamen al clickTagHandler cada vez que se les haga click
    for (var i = 0; i < exitTriggers.length; i++) {
        exitTriggers[i].addEventListener('click', clickTagHandler);
    }
}

// en init vamos a agregar los llamados a scripts que nos haga falta cargar como el CSS,
// tambien se llama a la funcion clickTagLoader para asignar los clickTags
// se pueden agregar otros llamados que sean necesarios antes de inicializar la visualización del banner
function init() {
    fileLoader('./style.css', 'css');

    clickTagLoader();

    // se agrega un timeout para evitar que comience la visualización sin terminar de cargarse los estilos
    setTimeout(initBanner, 1000);
}
