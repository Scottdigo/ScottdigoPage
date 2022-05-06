//----------Menu Mobile----------
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");
    
  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

// ----------Gallery----------
((d) => {

  const $btnClose = d.querySelector(".btn-close"),
  $btnNext = d.querySelector(".btn-next"),
  $btnPrevious = d.querySelector(".btn-previous"),
  $img = d.querySelectorAll(".gallery img"),
  $lightbox = d.querySelector(".gallery-lightbox"),
  $imgBig = d.querySelector(".img-big");
  let $indexx = 0; 

  
d.addEventListener ('click', (e) => {
  if (!e.target.matches(".gallery img")) return false;

   $imgBig.src = e.target.src;
   $indexx = Array.from($img).indexOf(e.target)
   $lightbox.classList.toggle("is-active");
  
})

  $btnClose.addEventListener("click", (e) => {
    $lightbox.classList.remove("is-active");
  });
  
  $btnNext.addEventListener("click", (e) => {
    if ($indexx === $img.length - 1) {
      $indexx = -1;
    }
    $imgBig.src = $img[$indexx + 1].src;
    $indexx++;
  });

  $btnPrevious.addEventListener("click", (e) => {
    if($indexx === 0) {
      $indexx = $img.length;
    }
    $imgBig.src = $img[$indexx - 1].src;
    $indexx--;
  });

})(document);

// ----------Animation(Intersection Observer)----------
((d) => {
  const $section_1 = d.getElementById('acerca'),
  $section_2 = d.querySelector('.services'),
  $section_3 = d.querySelector('.gallery'),
  $section_4 = d.querySelector('.card-container'),
  $section_5 = d.getElementById('contacto');

const loadSection = (entry, obs) => {
  entry.forEach((el) => {
    if(el.isIntersecting) {
      el.target.classList.add('a-bottom')
    }
  })
}
const obs = new IntersectionObserver (loadSection , {
  root: null,
  rootMargin: '0px 0px -300px 0px' ,
  // threshold: 0,
})

obs.observe($section_1);
obs.observe($section_2);
obs.observe($section_3);
obs.observe($section_4);
obs.observe($section_5);

})(document);

// ----------ContactForm ----------
((d) => {
  const $form = d.querySelector('.form'),
    $loader = d.querySelector('.contact-form-loader'),
    $response = d.querySelector('.contact-form-response')

    $form.addEventListener('submit', (e) => {
     e.preventDefault();
     $loader.classList.remove('none');
     fetch('https://formsubmit.co/ajax/elereico14@outlook.com', {
       method:'POST',
       body: new FormData(e.target)
     }).then((res) =>(res.ok ? res.json() : Promise.reject(res)))
     .then((json) => {
       $loader.classList.add('none')
       location.hash = '#gracias';
       $form.reset();
     })
     .catch((err) => {
      let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente"
      $response.querySelector('h3').innerHTML = `Error ${err.status}: ${message}`;
    }).finally(() => {
       $loader.classList.add('none');
      setTimeout(() => {
        location.hash = '#close'
      }, 3000);
     })
    });

})(document);
