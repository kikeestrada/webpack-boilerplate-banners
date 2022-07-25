var bannerAnimationTimeline, // donde guardamos el timeline para las animaciones
    mainISI; // aquí vamos a guardar el objeto del ISI

// setCTAHoverAnimation define los event listeners para el hover de los botones
// en los casos que tengamos varios CTA podría ser necesario agregar más listeners
function setCTAHoverAnimation() {
    var mainCTA = document.querySelector('#main-exit-trigger');

    mainCTA.addEventListener('mouseover', function () {
        gsap.to('#frame4_cta', 0.25, {
            scale: 1.05,

            ease: Sine.easeInOut,
        });
    });

    mainCTA.addEventListener('mouseout', function () {
        gsap.to('#frame4_cta', 0.25, {
            scale: 1,

            ease: Sine.easeInOut,
        });
    });
}

// agregamos las animaciones que necesitamos para cada frame
// SIEMPRE agregar antes de las animaciones .from('#banner-wrapper', 0, { ease: 'linear', autoAlpha: 0 }, 'F1') para que se vea el banner, por el politeload inicialmente esta oculto
function triggerBannerAnimation() {
    var transitionTime = 0.5;

    bannerAnimationTimeline
        .add('F1')
        .add('F2', 'F1+=2')
        .add('F3', 'F2+=3.5')
        .add('F4', 'F3+=6.25')
        .add('ISI', 'F1')

        .to(
            ['#frame1_copy1'],
            transitionTime,
            { autoAlpha: 0, ease: Sine.easeInOut },
            'F2-=.5'
        )

        .to(
            ['#frame1_copy2'],
            transitionTime,
            { y: -27, ease: Sine.easeInOut },
            'F2-=.25'
        )

        .to(
            ['#frame2_copy'],
            transitionTime * 2,
            {
                y: 0,
                ease: Sine.easeInOut,
            },
            'F2-=.5'
        )

        .to(
            ['#frame1_sprayer'],
            transitionTime * 1.5,
            {
                autoAlpha: 0,
                ease: Sine.easeInOut,
            },
            'F2+=.15'
        )
        .to(
            ['#frame2_sprayer', '#frame2_spray'],
            transitionTime,
            {
                autoAlpha: 1,
                ease: Sine.easeInOut,
            },
            'F2+=.15'
        )

        .to(
            ['#frame1_copy2', '#frame2_copy'],
            transitionTime,
            {
                autoAlpha: 0,
                ease: Sine.easeInOut,
            },
            'F3-=.5'
        )

        .to(
            ['#frame2_spray'],
            0,
            {
                autoAlpha: 0,
                ease: Sine.easeInOut,
            },
            'F3-=.15'
        )

        .to(
            ['#frame2_sprayer'],
            transitionTime * 1.5,
            {
                scale: 0.5,
                x: -54,
                y: 30,

                ease: Sine.easeInOut,
            },
            'F3-=.15'
        )

        .to(
            ['#frame2_sprayer'],
            transitionTime,
            {
                autoAlpha: 0,
                ease: Sine.easeInOut,
            },
            'F3+=.5'
        )

        .to(
            ['#frame3_copy1', '#frame3_sprayer'],
            transitionTime * 1,
            {
                autoAlpha: 1,
                ease: Sine.easeInOut,
            },
            'F3+=.4'
        )

        .to(
            ['#frame3_sprayer'],
            transitionTime * 1.25,
            {
                y: -5,
                ease: Sine.easeInOut,
            },
            'F3+=.75'
        )

        .to(
            ['#frame3_copy2'],
            transitionTime * 1.25,
            {
                autoAlpha: 1,
                ease: Sine.easeInOut,
            },
            'F3+=1'
        )

        .to(
            ['#frame3_copy1'],
            transitionTime,
            {
                autoAlpha: 0,
                ease: Sine.easeInOut,
            },
            'F4-=3'
        )

        .to(
            ['#frame3_sprayer'],
            transitionTime,
            {
                autoAlpha: 0,
                ease: Sine.easeInOut,
            },
            'F4-=2'
        )

        .to(
            ['#frame3_copy2'],
            transitionTime,
            {
                autoAlpha: 0,
                ease: Sine.easeInOut,
            },
            'F4-=.5'
        )

        .to(
            ['#frame4_sprayer'],
            transitionTime * 1.25,
            {
                x: 0,
                ease: Sine.easeInOut,
            },
            'F4'
        )

        .to(
            ['#frame4_copy'],
            transitionTime,
            {
                autoAlpha: 1,
                ease: Sine.easeInOut,
            },
            'F4'
        )

        .to(
            ['#frame4_cta'],
            transitionTime,
            {
                x: 0,
                ease: Sine.easeInOut,
            },
            'F4+=.25'
        )

        .to('#frame4_cta', transitionTime, { scale: 1.05 }, 'F4+=.75')
        .to(
            '#frame4_cta',
            2,
            { scale: 1, ease: Elastic.easeOut.config(0.9, 0.1) },
            'F4+=1.25'
        )

        .call(mainISI.delayedAutoScroll, null, 'ISI');

    console.log(
        'Animation duration: ' + bannerAnimationTimeline.totalDuration()
    );
}

function initBanner() {
    bannerAnimationTimeline = gsap.timeline(); // inicializa el timeline principal

    //inicializa el isi principal, se debe de definir el selector para el ISI, la velocidad (px/s) y el delay para el auto scroll en segundos
    mainISI = ISI('.isi-container', 6.66666667, 1);

    setCTAHoverAnimation();

    // SIEMPRE agregar antes de las animaciones .from('#banner-wrapper', 0, { ease: 'linear', autoAlpha: 0 }, 'F1') para que se vea el banner, por el politeload inicialmente esta oculto
    gsap.from('#banner-wrapper', 0, { ease: 'linear', autoAlpha: 0 }, 'F1');

    triggerBannerAnimation();
}
