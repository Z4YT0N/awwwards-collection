// ------------------------------------------------------------
// GSAP PLUGINS REGISTRATION
// ------------------------------------------------------------
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Flip, ScrambleTextPlugin);

// ------------------------------------------------------------
// SCROLLSMOOTHER SETUP
// ------------------------------------------------------------
// Enables smooth scrolling
ScrollSmoother.create({
  smooth: 1,
  normalizeScroll: true,
});

// ------------------------------------------------------------
// DOM REFERENCES
// ------------------------------------------------------------
const textElements = document.querySelectorAll('.el');

const logoEl = document.querySelector('.logo > span');
const relatedEl = document.querySelector('.related');
const relatedItems = relatedEl.querySelectorAll('.grid__item');

// Cache original logo text once
const logoText = logoEl.textContent;

// Store original text content
textElements.forEach((el) => {
  el.dataset.text = el.textContent;
});
logoEl.dataset.text = logoText;

// ------------------------------------------------------------
// RESET ELEMENT STYLES (USED BEFORE FLIP SETUP)
// ------------------------------------------------------------
function resetTextElements() {
  textElements.forEach((el) => {
    gsap.set(el, {
      clearProps: 'transform,opacity,filter',
    });
  });
}

// ------------------------------------------------------------
// FLIP ANIMATION SETUP
// ------------------------------------------------------------
function initFlips() {
  resetTextElements();

  textElements.forEach((el) => {
    // Find the current positional class (e.g. "pos-1")
    const originalClass = [...el.classList].find((c) => c.startsWith('pos-'));

    // Target class stored in data-alt-pos
    const targetClass = el.dataset.altPos;

    const flipEase = el.dataset.flipEase || 'expo.inOut';

    // Temporarily switch to target class to capture end state
    el.classList.add(targetClass);
    el.classList.remove(originalClass);

    // Capture FLIP state (position + selected visual props)
    const flipState = Flip.getState(el, {
      props: 'opacity, filter, width',
    });

    // Restore original class immediately
    el.classList.add(originalClass);
    el.classList.remove(targetClass);

    Flip.to(flipState, {
      ease: flipEase,
      scrollTrigger: {
        trigger: el,
        start: 'clamp(bottom bottom-=10%)',
        end: 'clamp(center center)',
        scrub: true,
      },
    });
    Flip.from(flipState, {
      ease: flipEase,
      scrollTrigger: {
        trigger: el,
        start: 'clamp(center center)',
        end: 'clamp(top top)',
        scrub: true,
      },
    });
  });
}

// ------------------------------------------------------------
// SCRAMBLE TEXT CONFIG
// ------------------------------------------------------------
const scrambleChars = 'upperAndLowerCase';

// ------------------------------------------------------------
// SCRAMBLE FUNCTION
// ------------------------------------------------------------
function scramble(el, { duration, revealDelay = 0 } = {}) {
  const text = el.dataset.text ?? el.textContent;

  const finalDuration =
    duration ??
    (el.dataset.scrambleDuration ? parseFloat(el.dataset.scrambleDuration) : 1);

  gsap.killTweensOf(el);

  gsap.fromTo(
    el,
    { scrambleText: { text: '', chars: '' } },
    {
      scrambleText: {
        text,
        chars: scrambleChars,
        revealDelay,
      },
      duration: finalDuration,
    }
  );
}

// ------------------------------------------------------------
// SCRAMBLE SCROLLTRIGGERS SETUP
// ------------------------------------------------------------
function initScramble() {
  // Remove previously created scramble triggers
  killScrambleTriggers();

  // Create a ScrollTrigger per element
  textElements.forEach((el) => {
    ScrollTrigger.create({
      id: 'scramble', // used for targeted cleanup
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => scramble(el),
      onEnterBack: () => scramble(el),
    });
  });

  // Scramble logo once on init (not scroll-based)
  scramble(logoEl, { revealDelay: 0.5 });
}

// ------------------------------------------------------------
// SCRAMBLE TRIGGER CLEANUP
// ------------------------------------------------------------
function killScrambleTriggers() {
  ScrollTrigger.getAll().forEach((st) => {
    if (st.vars.id === 'scramble') {
      st.kill();
    }
  });
}

// ------------------------------------------------------------
// RELATED DEMOS ANIMATION CONFIGURATION
// ------------------------------------------------------------
const relatedConfig = {
  logo: {
    fadeOut: { duration: 0.7, ease: 'expo', opacity: 0 },
    fadeIn: { duration: 0.5, ease: 'power3.in', opacity: 1 },
  },
  items: {
    initial: { xPercent: 100, scale: 0, opacity: 0 },
    animate: {
      duration: 0.7,
      ease: 'expo',
      stagger: 0.1,
      xPercent: 0,
      scale: 1,
      opacity: 1,
    },
    reverse: {
      duration: 0.5,
      ease: 'power3.in',
      scale: 0,
      opacity: 0,
      xPercent: 100,
      stagger: 0.05,
    },
  },
};

// ------------------------------------------------------------
// RELATED DEMOS INITIALIZATION
// ------------------------------------------------------------
function initRelatedDemos() {
  // Set initial state for related items
  gsap.set(relatedItems, relatedConfig.items.initial);

  ScrollTrigger.create({
    trigger: relatedEl,
    start: 'top center+=25%',
    onEnter: () => animateRelatedEnter(),
    onLeaveBack: () => animateRelatedLeave(),
  });
}

// ------------------------------------------------------------
// RELATED DEMOS ANIMATION HELPERS
// ------------------------------------------------------------
function animateRelatedEnter() {
  gsap.to(logoEl, relatedConfig.logo.fadeOut);
  gsap.fromTo(
    relatedItems,
    relatedConfig.items.initial,
    relatedConfig.items.animate
  );
}

function animateRelatedLeave() {
  gsap.to(logoEl, relatedConfig.logo.fadeIn);
  gsap.to(relatedItems, relatedConfig.items.reverse);
}

// ------------------------------------------------------------
// RESIZE HANDLING
// ------------------------------------------------------------
window.addEventListener('resize', () => {
  ScrollTrigger.refresh(true);
  initFlips();
  initScramble();
});

// ------------------------------------------------------------
// INITIALIZATION
// ------------------------------------------------------------
initFlips();
initScramble();
initRelatedDemos();
