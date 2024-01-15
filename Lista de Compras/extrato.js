window.onload = function () {
  const btnVoltar = document.getElementById("extrato");
  let numberReal = parseInt(localStorage.getItem("NumeroExtrato"));
  let NumeroExtrato = numberReal - 1;
  const ul = document.getElementById("shoppingList");
  const ApagarBtn = document.getElementById("ApagarTudo");

  for (let i = NumeroExtrato; i >= 0; i--) {
    let produto = JSON.parse(localStorage.getItem(`Extrato${i}`));
    let newLi = document.createElement("li");

    let newDiv = document.createElement("div");
    newDiv.className = "list-item";

    let newInputData = document.createElement("input");
    newInputData.disabled = true;
    newInputData.className = "quantidade";
    newInputData.type = "button";
    newInputData.value = produto.Data;

    let newItens = document.createElement("input");
    newItens.disabled = true;
    newItens.className = "quantidade";
    newItens.type = "button";
    newItens.value = `Unidades: ${produto.Unidade}`;

    let newPreço = document.createElement("input");
    newPreço.disabled = true;
    newPreço.className = "quantidade";
    newPreço.type = "button";
    newPreço.value =
      produto.Preco == "Não informado"
        ? "Não informado"
        : `Preço: R$${produto.Preco}`;

    let newInputValor = document.createElement("input");
    newInputValor.disabled = true;
    newInputValor.className = "quantidade";
    newInputValor.type = "button";
    newInputValor.value =
      produto.Valor == "Não informado"
        ? "Não informado"
        : `Total: R$${produto.Valor}`;

    let newSpan = document.createElement("span");
    newSpan.innerText = produto.Produto;

    let newDiv2 = document.createElement("div");
    newDiv2.className = "buttonContainer";

    let newExcluir = document.createElement("input");
    newExcluir.type = "button";
    newExcluir.className = "excluir";
    newExcluir.value = "Excluir";

    newDiv2.append(newInputValor, newExcluir);
    newDiv.append(newInputData, newItens, newPreço, newSpan);
    newLi.append(newDiv, newDiv2);
    ul.append(newLi);

    newExcluir.addEventListener(
      "click",
      (function (index) {
        return function () {
          localStorage.removeItem(`Extrato${index}`);

          if (index != NumeroExtrato) {
            for (let j = index + 1; j <= NumeroExtrato; j++) {
              const Key = `Extrato${j}`;
              const currentItem = localStorage.getItem(Key);
              localStorage.removeItem(Key);
              localStorage.setItem(`Extrato${j - 1}`, currentItem);
            }
          }

          numberReal--;
          localStorage.setItem("NumeroExtrato", numberReal.toString());
          window.location.reload();
        };
      })(i)
    );
  }

  btnVoltar.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  ApagarBtn.addEventListener("click", function () {
    let confirmação = confirm("Tem certeza que deseja excluir tudo?");
    if (confirmação) {
      for (i = 0; i <= NumeroExtrato; i++) {
        localStorage.removeItem(`Extrato${i}`);
      }
      localStorage.removeItem("NumeroExtrato");
      window.location.reload();
    }
  });
};
