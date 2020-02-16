const btnEmpezar = document.getElementById("btnEmpezar");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const celeste = document.getElementById("celeste");
const verde = document.getElementById("verde");
const ULTIMO_NIVEL = 10;

class Juego
{
  constructor  ()
  {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarsecuencia();
    this.siguientenivel();
  }

  inicializar ()
  {
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.siguientenivel = this.siguientenivel.bind(this);
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    };
  }

toggleBtnEmpezar()
{
  if (btnEmpezar.classList.contains("hide"))
  {
    btnEmpezar.classList.remove("hide")
  }
  else {
      btnEmpezar.classList.add("hide")
    }
}


  generarsecuencia ()
  {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0). map( function ()
    {
        return (Math.floor(Math.random() * 4));
    })
  }
  siguientenivel()
  {
    this.ilumiminarsecuencia();
    this.agregarEventosClick();
    this.subNivel = 0;
  }

  transNumAColor(num)
  {
    switch (num) {
      case 0:
        return ("celeste");
        break;
      case 1:
        return ("violeta");
        break;
      case 2:
        return ("naranja");
        break;
      case 3:
        return ("verde");
        break;
    }
  }

  transColorANum(color)
    {
      switch (color) {
        case "celeste":
          return (0);
          break;
        case "violeta":
          return (1);
          break;
        case "naranja":
          return (2);
          break;
        case "verde":
          return (3);
          break;
      }
    }
  ilumiminarsecuencia()
  {
    for (let i = 0; i < this.nivel; i++)
    {
        const color = this.transNumAColor(this.secuencia[i]);
      setTimeout(() => this.ilumnarColor(color),1000*i);
    }
  }

  ilumnarColor(color)
  {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color),350);
  }

  apagarColor (color)
  {
    this.colores[color].classList.remove ("light");

  }

  agregarEventosClick()
  {
    this.colores.celeste.addEventListener("click",this.elegirColor);
    this.colores.verde.addEventListener("click",this.elegirColor);
    this.colores.violeta.addEventListener("click",this.elegirColor);
    this.colores.naranja.addEventListener("click",this.elegirColor);
  }

  eliminareventosClick()
{
  this.colores.celeste.removeEventListener("click",this.elegirColor);
  this.colores.verde.removeEventListener("click",this.elegirColor);
  this.colores.violeta.removeEventListener("click",this.elegirColor);
  this.colores.naranja.removeEventListener("click",this.elegirColor);
}

  elegirColor(ev)
  { 
    const nomreColor = ev.target.dataset.color;
    const numeroColor = this.transColorANum(nomreColor);
    console.log(numeroColor)
    if (numeroColor === this.secuencia[this.subNivel])
    {
      true;
      this.subNivel+=1;
      if (this.subNivel == this.nivel)
      {
        this.nivel+=1;
        this.eliminareventosClick();
        if (this.nivel === (ULTIMO_NIVEL + 1))
        {
          this.ganoElJuego();
        }
        else {
          setTimeout(this.siguientenivel, 200);
        }
      }
    }
    else {
      this.perdioElJuego();
    }
  }
  ganoElJuego ()
    {
      swal("Platzi", "Felicidades ganaste", "success")
      .then(this.inicializar)
    }

  perdioElJuego ()
      {
        swal("Platzi", "Mal ahí, vuelve a intenar", "error")
        .then( () => {
          this.eliminareventosClick()
          this.inicializar()
        })
        console.log(swal)
      }
}

function empezarJuego ()
{
  window.juego = new Juego();
}
