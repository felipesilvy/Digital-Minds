window.addEventListener("scroll", function () {
  var navegacao = document.querySelector(".navegacao");
  var scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    navegacao.classList.add("navegacao-fixed");
  } else {
    navegacao.classList.remove("navegacao-fixed");
  }
});

/* DEIXA A BARRA D NAVEGACAO FIXA */

window.onload = function () {
  var botoesMenu = document.getElementsByClassName("botaomenu");

  for (var i = 0; i < botoesMenu.length; i++) {
    botoesMenu[i].addEventListener("click", function () {
      var elementosHovermenu = document.getElementsByClassName("hovermenu");
      for (var j = 0; j < elementosHovermenu.length; j++) {
        if (elementosHovermenu[j].style.display === "block") {
          elementosHovermenu[j].style.display = "none";
        } else {
          elementosHovermenu[j].style.display = "block";
        }
      }
    });
  }
};

/* EFEITO DE OCULTACAO DA BARRA DE NAVEGAÇAO */
