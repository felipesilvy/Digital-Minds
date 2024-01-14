window.onload = function () {
  let NumeroDeItens = parseInt(localStorage.getItem("NumeroItens")) || 0;
  const adicionarBtn = document.getElementById("Adicionar");
  const ApagarBtn = document.getElementById("ApagarTudo");
  const ItemInput = document.getElementById("InItem");
  const QntdInput = document.getElementById("InQuantidade");
  const ul = document.getElementById("shoppingList");
  const verExtrato = document.getElementById("extrato");

  ItemInput.focus();

  for (let i = NumeroDeItens; i >= 1; i--) {
    let newLi = document.createElement("li");

    let newDiv = document.createElement("div");
    newDiv.className = "list-item";

    let newInputQntd = document.createElement("input");
    newInputQntd.disabled = true;
    newInputQntd.className = "quantidade";
    newInputQntd.type = "button";
    newInputQntd.value = `${localStorage.getItem(`Quantidade${i}`)} Unidade(s)`;

    let newSpan = document.createElement("span");
    newSpan.innerText = `${localStorage.getItem(`Item${i}`)}`;

    let newDiv2 = document.createElement("div");
    newDiv2.className = "buttonContainer";

    let newComprado = document.createElement("input");
    newComprado.type = "button";
    newComprado.className = "comprado";
    newComprado.value = "Comprado";

    let newExcluir = document.createElement("input");
    newExcluir.type = "button";
    newExcluir.className = "excluir";
    newExcluir.value = "Excluir";

    let newDiminuir = document.createElement("input");
    newDiminuir.type = "button";
    newDiminuir.className = "alterar";
    newDiminuir.value = "Diminuir";

    let newAumentar = document.createElement("input");
    newAumentar.type = "button";
    newAumentar.className = "alterar";
    newAumentar.value = "Aumentar";

    newDiv2.append(newDiminuir, newAumentar, newExcluir, newComprado);
    newDiv.append(newInputQntd, newSpan);
    newLi.append(newDiv, newDiv2);
    ul.append(newLi);

    newComprado.addEventListener("click", function () {
      excluir(i, NumeroDeItens, true);
    });

    newExcluir.addEventListener("click", function () {
      excluir(i, NumeroDeItens, false);
    });

    newAumentar.addEventListener("click", function () {
      const currentQuantidade =
        Number(localStorage.getItem(`Quantidade${i}`)) + 1;
      localStorage.setItem(`Quantidade${i}`, `${currentQuantidade}`);
      reload();
    });

    newDiminuir.addEventListener("click", function () {
      const currentQuantidade =
        Number(localStorage.getItem(`Quantidade${i}`)) - 1;
      if (currentQuantidade == 0) {
        excluir(i, NumeroDeItens, false);
      } else {
        localStorage.setItem(`Quantidade${i}`, `${currentQuantidade}`);
        reload();
      }
    });
  }

  ApagarBtn.addEventListener("click", function () {
    let confirmação = confirm("Tem certeza que deseja excluir tudo?");
    if (confirmação) {
      for (i = 1; i <= NumeroDeItens; i++) {
        localStorage.removeItem(`Item${i}`);
        localStorage.removeItem(`Quantidade${i}`);
      }
      localStorage.removeItem("NumeroItens");
      reload();
    }
  });

  adicionarBtn.addEventListener("click", function () {
    if (ItemInput.value && QntdInput.value) {
      console.log("Valor do ItemInput:", ItemInput.value);
      console.log("Valor do QntdInput:", QntdInput.value);

      // Adciona um na contagem do NumeroDeItens
      NumeroDeItens++;
      localStorage.setItem("NumeroItens", NumeroDeItens.toString());

      localStorage.setItem(`Item${NumeroDeItens}`, ItemInput.value);
      localStorage.setItem(`Quantidade${NumeroDeItens}`, QntdInput.value);

      ItemInput.value = "";
      QntdInput.value = "";

      reload();
    } else {
      alert("Preencha os campos");
    }
  });

  verExtrato.addEventListener("click", function () {
    window.location.href = "extrato.html";
  });
};

function reload() {
  window.location.reload();
}

function excluir(i, NumeroDeItens, p) {
  if (p) {
    // JOGANDO PRO EXTRATO
    let valorBruto = prompt("Informe o valor pago por unidade:");
    valorBruto = valorBruto.replace(",", ".");
    valorBruto = Number(valorBruto).toFixed(2);
    let unidade = Number(localStorage.getItem(`Quantidade${i}`));
    let valorExtrato = (Number(valorBruto) * unidade).toFixed(2);
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1; // Meses são zero-indexed, então adicionamos 1
    const dia = dataAtual.getDate();
    const dataExtrato = `${dia < 10 ? "0" : ""}${dia}/${
      mes < 10 ? "0" : ""
    }${mes}/${ano}`;
    let ProdutoExtrato = localStorage.getItem(`Item${i}`);

    if (isNaN(Number(valorBruto))) {
      valorBruto = "Não informado";
      valorExtrato = "Não informado";
    }

    let NumeroExtrato = parseInt(localStorage.getItem("NumeroExtrato")) || 0;
    localStorage.setItem("NumeroExtrato", NumeroExtrato);
    localStorage.setItem(
      `Extrato${NumeroExtrato}`,
      JSON.stringify({
        Produto: ProdutoExtrato,
        Valor: valorExtrato,
        Data: dataExtrato,
        Unidade: unidade,
        Preco: valorBruto,
      })
    );
    NumeroExtrato++;
    localStorage.setItem("NumeroExtrato", NumeroExtrato);
  }

  // EXCLUINDO O ITEM

  localStorage.removeItem(`Item${i}`);
  localStorage.removeItem(`Quantidade${i}`);

  if (i != NumeroDeItens) {
    for (let j = i + 1; j <= NumeroDeItens; j++) {
      const itemKey = `Item${j}`;
      const quantidadeKey = `Quantidade${j}`;

      // Obter os valores das chaves atuais
      const currentItem = localStorage.getItem(itemKey);
      const currentQuantidade = localStorage.getItem(quantidadeKey);

      // Remover as chaves atuais
      localStorage.removeItem(itemKey);
      localStorage.removeItem(quantidadeKey);

      // Criar novas chaves com os índices atualizados
      localStorage.setItem(`Item${j - 1}`, currentItem);
      localStorage.setItem(`Quantidade${j - 1}`, currentQuantidade);
    }
  }
  NumeroDeItens--;
  localStorage.setItem("NumeroItens", NumeroDeItens.toString());
  reload();
}
