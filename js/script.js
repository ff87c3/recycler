function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

let imgs = [];

function uploadFiles() {
  document.querySelector('#form_upload').style.display = "none";
  let input = document.getElementById("file-input");
  let files = input.files;
  for (let i = 0; i < files.length; i++) {
    imgs.push(URL.createObjectURL(files[i]));
  }
  displayPreview();
}

function displayPreview() {

  document.querySelector(".text_top").style.display = "none";
  document.querySelector(".text_bottom").style.display = "none"; 
  
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    var winWidth = window.innerWidth - 200;
    var winHeight = window.innerHeight - 200;
  } else {
    var winWidth = window.innerWidth - 400;
    var winHeight = window.innerHeight - 400;
  }

  

  // const audio = new Audio('zap2.mp3');

  const numbers = document.querySelector('.numbers');
  const numbersChildren = Array.from(numbers.children);
  numbersChildren.sort(() => Math.random() - 0.5);
  numbers.innerHTML = "";
  numbersChildren.forEach(child => numbers.appendChild(child));

  /* ___________________________________________________________________________ */

  function sequentialLoad(idx) {

    const numbers = document.querySelectorAll(".numbers");

    const ele = [];

    for (let i = 0; i < numbers.length; i++) {
      ele.push(numbers[i].children[idx]);
    }

    for (let i = 0; i < ele.length; i++) {
      var id = ele[i].getAttribute('id');
    }

    if (id) {
      const number = id.split('-')[1];
      const img = new Image();
      img.onload = function () {

        for (let i = 0; i < ele.length; i++) {
          ele[i].style.opacity = 1;

          ele[i].style.display = "block"; 
         
        }

        setTimeout(function () {
          sequentialLoad(idx + 1);
        }, 200);
      };
      
      img.onerror = function () {
        sequentialLoad(idx + 1);
      };

      img.setAttribute('id', 'img-' + number);
      img.src = imgs[number];

      const top = getRandomNumber(0, winHeight);
      const left = getRandomNumber(0, winWidth);
      const maxheight = Math.floor(Math.random() * 50 + 25).toString();

     /*  img.style.top = top + 'px'; 
      img.style.left = left + 'px';  */

      const pictures = document.querySelector('#pictures');
      pictures.appendChild(img);

      const picture = document.getElementById(`img-${id.split('-')[1]}`)
      picture.style.maxHeight = `${maxheight}%`;
      picture.style.top = top + 'px'; 
      picture.style.left = left + 'px'; 
    }
  }

  sequentialLoad(0);

    /* ___________________________________________________________________________ */


  document.querySelectorAll('.numbers').forEach(number => {
    number.addEventListener('mouseover', function (event) {
      const id = event.target.getAttribute('id');



      if (id) {
        // audio.play();
        const picture = document.getElementById(`img-${id.split('-')[1]}`)
       
        picture.style.opacity = 1;
        picture.style.filter = 'blur(0px) invert(1)';
      
       picture.style.display = 'block';

      }
    });
  });

  document.querySelectorAll('.numbers').forEach(number => {
    number.addEventListener('mouseout', function (event) {
      const id = event.target.getAttribute('id');

      let blurValue = document.querySelector('.blur').value;
      let blurString = `blur(${blurValue * 0.4}px)`;

      if (id) {

        const picture = document.getElementById(`img-${id.split('-')[1]}`)
        picture.style.filter = `${blurString} invert(1)`;

  /*        function fadeOutImage(img, duration) {
          let opacity = 1;
          let start = null;

          function step(timestamp) {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            opacity = 1 - progress / duration;
            img.style.opacity = opacity;
            if (progress < duration) {
               requestAnimationFrame(step);
            }
          }
           requestAnimationFrame(step);
        } 
} 
 */
         const fadeOutImage = (img, duration) => {
          let start = null;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            img.style.opacity = 1 - progress / duration;
            if (progress < duration) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        };

        fadeOutImage(picture, Math.random() * 20000);
      } 

    
    });
  });

  document.getElementById("monochrom").addEventListener("click", function () {
    let images = document.querySelectorAll("img");
    images.forEach(function (img) {
      img.classList.toggle("luminosity");

    });
    document.getElementById("monochrom").classList.toggle("text-color");
    document.getElementById("rangeValue").classList.toggle("green");
  });

  /*   $('#photography').on('click', function (e) {
      $('#photography').toggleClass('email');
      e.preventDefault();
    }); */

  let input = document.querySelector("input");
  input.addEventListener("change", function () {

    let blurValue = document.querySelector('.blur').value;
    let blurString = `blur(${blurValue}px)`;

    let images = document.querySelectorAll("img");
    images.forEach(function (img) {
      img.style.filter = `${blurString} invert(1)`;
    });
  });

};

function rangeSlide(value) {
  document.getElementById('rangeValue').innerHTML = value;
}

// scroll event incrementing the range slider

const myInput = document.querySelector('.range');
const inputValue = document.getElementById('rangeValue').innerHTML;

function blurincreased() {
  document.getElementById('rangeValue').innerHTML = myInput.value++;
}

function blurdecreased() {
  document.getElementById('rangeValue').innerHTML = myInput.value--;
}

window.addEventListener('wheel', function (e) {
  if (e.deltaY > 1) {
    blurincreased();
  } else if (e.deltaY < -1) {
    blurdecreased();
  }
});

///////////////////////////////////////

function refreshPage() {
  window.location.reload();
}

document.getElementById("file-input").addEventListener("change", function (event) {
  document.querySelector("#button_upload").style.display = "block"
  document.querySelector("label").style.display = "none"
})

///////////////////////////////////////

window.addEventListener(
  'contextmenu',
  function (e) {
    e.preventDefault();
  },
  false
);


