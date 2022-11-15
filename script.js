 const slider = document.querySelector('#length');
 const range = document.querySelector('#rangeValue');
 const progressBar = document.querySelector('#bar');
 const btnGen = document.querySelector('#btn-gen');
 const btnCopy = document.querySelector('#btn-copy');
 const svgCopy = document.querySelector('#svg-copy');
 const svgColor = document.querySelector('#svg-copy > path');
 const uppercase = document.querySelector('#uppercase');
 const lowercase = document.querySelector('#lowercase');
 const numbers = document.querySelector('#numbers');
 const symbols = document.querySelector('#symbols');
 const modal = document.querySelector('#modal');
 const passCont = document.querySelector('#pass-container');
 const pass = document.querySelector('#pass');
 const bars = document.querySelectorAll('.strong-bar');
 const close = document.querySelector('#close');
 const overlay = document.querySelector('.overlay');
 const worning = document.querySelector('#worning');
 const divPassword = document.querySelector('#password');
 const pPassword = document.querySelector('#password > p');

 let password = false; // ok

slider.oninput = () => {
  progressBar.style.width = `${slider.value}%`;
  range.innerText = slider.value;
  strength(Number(slider.value));
}

const btnAnimation = function(btn, e) {
  let x = e.clientX - e.target.offsetLeft;
  let y = e.clientY - e.target.offsetTop;

  let span = document.createElement('span');
  span.style.left = `${x}px`;
  span.style.top = `${y}px`;
  span.classList.add('btn-effect');
  btn.appendChild(span);

  setTimeout(() => {
    span.remove()
  }, 1000);
}

const passGenerator = function (len) {

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const specialSymbol = '!@#$%^&*()_+}{[]?><-=';
  
  let password = '';
  
  while (password.length < len) {
    let upper = '';
    let lower = '';
    let num = '';
    let sym = '';

    if (lowercase.checked) {
      lower = letters.charAt(Math.ceil(26 * Math.random() * Math.random()));
      password += lower;
    }
    if (uppercase.checked) {
      upper = letters.charAt(Math.ceil(26 * Math.random() * Math.random())).toUpperCase();
      password += upper;
    }
    if (numbers.checked) {
      num = Math.trunc(Math.random() * 9);
      password += num;
    }
    if (symbols.checked) {  
      sym = Math.trunc(Math.random() * specialSymbol.length);
      password += specialSymbol[sym];
    }
    password = [...password].sort(() => 0.5 - Math.random()).join('');
  }

  return password.slice(0, len);
}

const showModal = function () {
  modal.style.display = 'flex';
  overlay.classList.remove('hidden');
}

const showPassModal = function () {
  showModal();
  worning.classList.add('hidden');
  divPassword.classList.remove('hidden');
}

const showWorningModal = function () {
  showModal();
  divPassword.classList.add('hidden');
  worning.classList.remove('hidden');
}

const closeModal = function () {
  modal.style.display = "none";
  overlay.classList.add('hidden');
  worning.classList.add('hidden');
  overlay.classList.add('hidden');
  divPassword.classList.add('hidden');
}

const setPassword = function () {
  pass.style.color = '#e6e5ea';
  pass.style.cursor = 'pointer';
  svgCopy.classList.add('enable-copy');
  svgCopy.classList.add('enable-pointer');
  svgColor.style.fill = '#a4ffaf';
  password = true;
}

btnGen.addEventListener('click', (e) => {
  e.preventDefault();

  if (!lowercase.checked && 
      !uppercase.checked && 
      !numbers.checked &&
      !symbols.checked 
    ) {
      showWorningModal();
    } 
    
    if (+slider.value <= 0) {
      showWorningModal();
      return;
    }

    btnAnimation(btnGen, e);
    pPassword.innerText = pass.innerText = passGenerator(Number(slider.value));
    setPassword();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

close.addEventListener('click', function () {
  closeModal();
});

overlay.addEventListener('click', function () {
  closeModal();
});

svgCopy.addEventListener('click', function () {
  if (password) {    
    passCont.classList.add('moving-up');
    passCont.style.animation = 'none';
    passCont.offsetHeight; /* trigger reflow */
    passCont.style.animation = null;
    navigator.clipboard.writeText(pPassword.innerText)
  }
});

pass.addEventListener('click', function () {
  if (password) {
    showPassModal();
  }
});

const strength = function (value) {
  switch (value) {
    case 0:
      colorRemover(bars);
      break;

    case 1:
      colorize('red', 1);
      break;

    case 7:
      colorize('red', 1);
      break;

    case 8:
      colorize('yellow', 2);
      break;

    case 15:
      colorize('yellow', 2);
      break;

    case 16:
      colorize('yellow', 3);
      break;

    case 31:
      colorize('yellow', 3);
      break;

    case 32:
      colorize('green', 4);
      break;
    
    case 63:
      colorize('green', 4);
      break;

    case 64:
      colorize('green', 5);
      break;
  }
}

const colorize = function (color, limit) {
  colorRemover(bars);
  bars.forEach((n, i) => {
    if ((i + 1) <= limit) {
      n.classList.add(`strong-bar-${color}`);
    }
  });
}

const colorRemover = function (bars) {
  bars.forEach(n => {
    n.classList.remove('strong-bar-yellow');
    n.classList.remove('strong-bar-green');
    n.classList.remove('strong-bar-red');
  });
}
