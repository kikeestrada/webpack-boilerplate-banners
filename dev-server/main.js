/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__);
//
// DO NOT EDIT
//


__webpack_require__(1);

__webpack_require__(2);

__webpack_require__(3);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// ISI se usa para crear un "objeto" con lo que se requiere para el ISI
// hacerlo de esta manera nos permite tener más de 1 ISI por banner y sin tener conflictos en su funcionalidad
// recibe 3 parámetros, pselector con el selector especifico del padre, cuando se usen dos ISI, se debe verificar que los selectores para los dos sean distintos
// pautoScrollDuration indica lo que va a durar el ISI en segundos en hacer scroll
// pautoScrollDelay agrega un delay antes de que inicie el scroll del ISI, esto es requerimiento para algunos clientes
function ISI(pselector, pautoScrollSpeed, pautoScrollDelay) {
  var isi = {}; // aqui vamos a guardar todos los valores y funcionalidad q necesitamos para el ISI

  isi.bannerWrapper = document.querySelector('#banner-wrapper');
  isi.isiContainer = document.querySelector(pselector); // crea el objeto de OverlayScrollbars

  isi.scrollObject = OverlayScrollbars(isi.isiContainer.querySelector('.isi-copy-wrapper .isi-copy'), {
    className: 'custom-isi',
    sizeAutoCapable: false,
    overflowBehavior: {
      x: 'hidden',
      y: 'scroll'
    }
  });
  isi.autoScrollTimeline = gsap.timeline(); // timeline que necesitamos para el autoscroll

  isi.scrollAuxiliaryTimeline = gsap.timeline();
  isi.autoScrollDistance = isi.isiContainer.querySelector(pselector + ' .isi-copy-inner-wrapper').offsetHeight; // obtiene la altura del ISI

  isi.autoScrollSpeed = pautoScrollSpeed; // calcula la velocidad a base de la distancia y el autoScrollDuration

  isi.autoScrollDuration = isi.autoScrollDistance / isi.autoScrollSpeed; // se agrega la duración que enviamos por parámetros

  isi.autoScrollDelay = pautoScrollDelay; // se agrega el scroll delay que enviamos por parámetros
  // autoScroll permite la funcionalidad del auto scroll por medio de ScrollTo de GSAP

  isi.autoScroll = function () {
    // regresamos el ISI al incio en caso de que el usuario haya scrolleado antes del auto scroll
    isi.scrollObject.scroll({
      y: '0%'
    }, 0, {
      y: 'linear'
    });
    isi.autoScrollTimeline.to(pselector + ' .os-viewport', isi.autoScrollDuration, {
      scrollTo: {
        y: isi.autoScrollDistance,
        // permite hacer scroll hasta el final del ISI
        autoKill: true // permite que se detenga el auto scroll al hacer scroll manualmente

      },
      ease: Power0.easeNone
    });
  }; // delayedAutoScroll es la función que debemos llamar cuando necesitamos ejecutar el auto scroll
  // en caso de que necesitemos el delay antes de iniciar el scroll


  isi.delayedAutoScroll = function () {
    setTimeout(isi.autoScroll, isi.autoScrollDelay * 1000);
  };

  isi.scrollStop = function () {
    isi.scrollAuxiliaryTimeline.kill();
  };

  return isi; // regresamos el objeto que acabamos de crear para guardarlo en una variable
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var bannerAnimationTimeline, // donde guardamos el timeline para las animaciones
mainISI; // aquí vamos a guardar el objeto del ISI
// setCTAHoverAnimation define los event listeners para el hover de los botones
// en los casos que tengamos varios CTA podría ser necesario agregar más listeners

function setCTAHoverAnimation() {
  var mainCTA = document.querySelector('#main-exit-trigger');
  mainCTA.addEventListener('mouseover', function () {
    gsap.to('#frame4_cta', 0.25, {
      scale: 1.05,
      ease: Sine.easeInOut
    });
  });
  mainCTA.addEventListener('mouseout', function () {
    gsap.to('#frame4_cta', 0.25, {
      scale: 1,
      ease: Sine.easeInOut
    });
  });
} // agregamos las animaciones que necesitamos para cada frame
// SIEMPRE agregar antes de las animaciones .from('#banner-wrapper', 0, { ease: 'linear', autoAlpha: 0 }, 'F1') para que se vea el banner, por el politeload inicialmente esta oculto


function triggerBannerAnimation() {
  var transitionTime = 0.5;
  bannerAnimationTimeline.add('F1').add('F2', 'F1+=2').add('F3', 'F2+=3.5').add('F4', 'F3+=6.25').add('ISI', 'F1').to(['#frame1_copy1'], transitionTime, {
    autoAlpha: 0,
    ease: Sine.easeInOut
  }, 'F2-=.5').to(['#frame1_copy2'], transitionTime, {
    y: -27,
    ease: Sine.easeInOut
  }, 'F2-=.25').to(['#frame2_copy'], transitionTime * 2, {
    y: 0,
    ease: Sine.easeInOut
  }, 'F2-=.5').to(['#frame1_sprayer'], transitionTime * 1.5, {
    autoAlpha: 0,
    ease: Sine.easeInOut
  }, 'F2+=.15').to(['#frame2_sprayer', '#frame2_spray'], transitionTime, {
    autoAlpha: 1,
    ease: Sine.easeInOut
  }, 'F2+=.15').to(['#frame1_copy2', '#frame2_copy'], transitionTime, {
    autoAlpha: 0,
    ease: Sine.easeInOut
  }, 'F3-=.5').to(['#frame2_spray'], 0, {
    autoAlpha: 0,
    ease: Sine.easeInOut
  }, 'F3-=.15').to(['#frame2_sprayer'], transitionTime * 1.5, {
    scale: 0.5,
    x: -54,
    y: 30,
    ease: Sine.easeInOut
  }, 'F3-=.15').to(['#frame2_sprayer'], transitionTime, {
    autoAlpha: 0,
    ease: Sine.easeInOut
  }, 'F3+=.5').to(['#frame3_copy1', '#frame3_sprayer'], transitionTime * 1, {
    autoAlpha: 1,
    ease: Sine.easeInOut
  }, 'F3+=.4').to(['#frame3_sprayer'], transitionTime * 1.25, {
    y: -5,
    ease: Sine.easeInOut
  }, 'F3+=.75').to(['#frame3_copy2'], transitionTime * 1.25, {
    autoAlpha: 1,
    ease: Sine.easeInOut
  }, 'F3+=1').to(['#frame3_copy1'], transitionTime, {
    autoAlpha: 0,
    ease: Sine.easeInOut
  }, 'F4-=3').to(['#frame3_sprayer'], transitionTime, {
    autoAlpha: 0,
    ease: Sine.easeInOut
  }, 'F4-=2').to(['#frame3_copy2'], transitionTime, {
    autoAlpha: 0,
    ease: Sine.easeInOut
  }, 'F4-=.5').to(['#frame4_sprayer'], transitionTime * 1.25, {
    x: 0,
    ease: Sine.easeInOut
  }, 'F4').to(['#frame4_copy'], transitionTime, {
    autoAlpha: 1,
    ease: Sine.easeInOut
  }, 'F4').to(['#frame4_cta'], transitionTime, {
    x: 0,
    ease: Sine.easeInOut
  }, 'F4+=.25').to('#frame4_cta', transitionTime, {
    scale: 1.05
  }, 'F4+=.75').to('#frame4_cta', 2, {
    scale: 1,
    ease: Elastic.easeOut.config(0.9, 0.1)
  }, 'F4+=1.25').call(mainISI.delayedAutoScroll, null, 'ISI');
  console.log('Animation duration: ' + bannerAnimationTimeline.totalDuration());
}

function initBanner() {
  bannerAnimationTimeline = gsap.timeline(); // inicializa el timeline principal
  //inicializa el isi principal, se debe de definir el selector para el ISI, la velocidad (px/s) y el delay para el auto scroll en segundos

  mainISI = ISI('.isi-container', 6.66666667, 1);
  setCTAHoverAnimation(); // SIEMPRE agregar antes de las animaciones .from('#banner-wrapper', 0, { ease: 'linear', autoAlpha: 0 }, 'F1') para que se vea el banner, por el politeload inicialmente esta oculto

  gsap.from('#banner-wrapper', 0, {
    ease: 'linear',
    autoAlpha: 0
  }, 'F1');
  triggerBannerAnimation();
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// esperamos a que el DOM este listo
document.addEventListener('DOMContentLoaded', function (e) {
  window.onload = function () {
    // Una vez que la página termino de cargar, comenzamos el proceso de verificar scripts
    checkInitLoadScripts();
  };
}); // checkInitLoadScripts se encarga de verificar que los componentes (GSAP, Overlay Scrollbars, etc que necesitamos para el banner esten cargados. Si ya se cargaron llama a la función init y si no, espera 50 milisegundos para llamarse a si misma y volver a verificar los componentes

function checkInitLoadScripts() {
  window.gsap && window.ScrollToPlugin && window.OverlayScrollbars ? init() : setTimeout(checkInitLoadScripts, 50);
} // fileLoader nos sirve para agregar algun script o link que haga falta, por ejemplo los estilos del banner, al cargarlos de esta manera evitamos que las imagenes sean parte del initialLoad del banner
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
} // clickTagLoader asocia dinamicamente los clickTags con su respectivo trigger, para lograr esto, solo debemos agregar el atributo data-exit sobre el elemento que queremos usar como trigger y en el valor agregar el nombre de la variable del clickTag que se va a usar
// ejemplo de uso: data-exit="clickTag1" para el primer clickTag


function clickTagLoader() {
  // busca a todos los elementos que le agregamos el data-exit
  var exitTriggers = document.querySelectorAll('[data-exit]'); // clickTagHandler maneja lo que sucede cuando se dispara el click de alguno de los triggers

  function clickTagHandler(e) {
    e.preventDefault(); // detiene el efecto por defecto que tiene el click de ese elemento
    // busca y asigna en una variable el valor del data-exit para elemento que dispara el evento click

    var clickTag = this.getAttribute('data-exit'); // obtienie del objeto window la variable clickTag que necesitamos para este trigger y abre el link

    window.open(window[clickTag]);
    console.log(clickTag);
  } // recorre el arreglo con los elementos que les agregamos el data-exit y les asigna el eventListener
  // para el click para que asi llamen al clickTagHandler cada vez que se les haga click


  for (var i = 0; i < exitTriggers.length; i++) {
    exitTriggers[i].addEventListener('click', clickTagHandler);
  }
} // en init vamos a agregar los llamados a scripts que nos haga falta cargar como el CSS,
// tambien se llama a la funcion clickTagLoader para asignar los clickTags
// se pueden agregar otros llamados que sean necesarios antes de inicializar la visualización del banner


function init() {
  fileLoader('./style.css', 'css');
  clickTagLoader(); // se agrega un timeout para evitar que comience la visualización sin terminar de cargarse los estilos

  setTimeout(initBanner, 1000);
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);