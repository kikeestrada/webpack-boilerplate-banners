// ISI se usa para crear un "objeto" con lo que se requiere para el ISI
// hacerlo de esta manera nos permite tener más de 1 ISI por banner y sin tener conflictos en su funcionalidad
// recibe 3 parámetros, pselector con el selector especifico del padre, cuando se usen dos ISI, se debe verificar que los selectores para los dos sean distintos
// pautoScrollDuration indica lo que va a durar el ISI en segundos en hacer scroll
// pautoScrollDelay agrega un delay antes de que inicie el scroll del ISI, esto es requerimiento para algunos clientes
function ISI(pselector, pautoScrollSpeed, pautoScrollDelay) {
    var isi = {}; // aqui vamos a guardar todos los valores y funcionalidad q necesitamos para el ISI

    isi.bannerWrapper = document.querySelector('#banner-wrapper');

    isi.isiContainer = document.querySelector(pselector);

    // crea el objeto de OverlayScrollbars
    isi.scrollObject = OverlayScrollbars(
        isi.isiContainer.querySelector('.isi-copy-wrapper .isi-copy'),
        {
            className: 'custom-isi',
            sizeAutoCapable: false,
            overflowBehavior: {
                x: 'hidden',
                y: 'scroll',
            },
        }
    );

    isi.autoScrollTimeline = gsap.timeline(); // timeline que necesitamos para el autoscroll

    isi.scrollAuxiliaryTimeline = gsap.timeline();

    isi.autoScrollDistance = isi.isiContainer.querySelector(
        pselector + ' .isi-copy-inner-wrapper'
    ).offsetHeight; // obtiene la altura del ISI

    isi.autoScrollSpeed = pautoScrollSpeed; // calcula la velocidad a base de la distancia y el autoScrollDuration

    isi.autoScrollDuration = isi.autoScrollDistance / isi.autoScrollSpeed; // se agrega la duración que enviamos por parámetros

    isi.autoScrollDelay = pautoScrollDelay; // se agrega el scroll delay que enviamos por parámetros

    // autoScroll permite la funcionalidad del auto scroll por medio de ScrollTo de GSAP
    isi.autoScroll = function () {
        // regresamos el ISI al incio en caso de que el usuario haya scrolleado antes del auto scroll
        isi.scrollObject.scroll({ y: '0%' }, 0, { y: 'linear' });

        isi.autoScrollTimeline.to(
            pselector + ' .os-viewport',
            isi.autoScrollDuration,
            {
                scrollTo: {
                    y: isi.autoScrollDistance, // permite hacer scroll hasta el final del ISI
                    autoKill: true, // permite que se detenga el auto scroll al hacer scroll manualmente
                },
                ease: Power0.easeNone,
            }
        );
    };

    // delayedAutoScroll es la función que debemos llamar cuando necesitamos ejecutar el auto scroll
    // en caso de que necesitemos el delay antes de iniciar el scroll
    isi.delayedAutoScroll = function () {
        setTimeout(isi.autoScroll, isi.autoScrollDelay * 1000);
    };

    isi.scrollStop = function () {
        isi.scrollAuxiliaryTimeline.kill();
    };

    return isi; // regresamos el objeto que acabamos de crear para guardarlo en una variable
}
