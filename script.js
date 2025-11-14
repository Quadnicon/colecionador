const categorias = ["Figuras", "Moedas", "Cartas"];

window.onload = () => {
  atualizarCategorias();
};

function showTab(tabId) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}

function atualizarCategorias() {
  const select = document.getElementById("itemCategoria");
  const lista = document.getElementById("listaCategorias");
  select.innerHTML = "";
  lista.innerHTML = "";
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);

    const li = document.createElement("li");
    li.textContent = cat;
    lista.appendChild(li);
  });
}

function adicionarCategoria() {
  const nova = document.getElementById("novaCategoria").value;
  if(nova && !categorias.includes(nova)) {
    categorias.push(nova);
    atualizarCategorias();
    document.getElementById("novaCategoria").value = "";
  }
}

function adicionarItem() {
  const nome = document.getElementById("itemNome").value;
  const categoria = document.getElementById("itemCategoria").value;
  const valor = document.getElementById("itemValor").value;
  const fotoInput = document.getElementById("itemFoto");

  if(nome) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${nome}</strong> (${categoria}) - R$ ${valor}`;

    if(fotoInput.files.length > 0) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(fotoInput.files[0]);
      li.appendChild(img);
    }

    document.getElementById("listaItens").appendChild(li);
    document.getElementById("itemNome").value = "";
    document.getElementById("itemValor").value = "";
    fotoInput.value = "";
  }
}

function adicionarDesejo() {
  const nome = document.getElementById("desejoNome").value;
  const valor = document.getElementById("desejoValor").value;

  if(nome) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${nome}</strong> - Valor estimado: R$ ${valor}`;
    document.getElementById("listaDesejos").appendChild(li);
    document.getElementById("desejoNome").value = "";
    document.getElementById("desejoValor").value = "";
  }
}

function adicionarItem() {
    const nome = document.getElementById("itemNome").value;
    const categoria = document.getElementById("itemCategoria").value;
    const valor = document.getElementById("itemValor").value;
    const fotoInput = document.getElementById("itemFoto");
  
    if(nome) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${nome}</strong> (${categoria}) - <em>R$ ${valor}</em>`;
  
      if(fotoInput.files.length > 0) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(fotoInput.files[0]);
        li.appendChild(img);
      }
  
      document.getElementById("listaItens").appendChild(li);
      document.getElementById("itemNome").value = "";
      document.getElementById("itemValor").value = "";
      fotoInput.value = "";
    }
  }
  
  function adicionarDesejo() {
    const nome = document.getElementById("desejoNome").value;
    const valor = document.getElementById("desejoValor").value;
  
    if(nome) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${nome}</strong> - <em>Valor estimado: R$ ${valor}</em>`;
      document.getElementById("listaDesejos").appendChild(li);
      document.getElementById("desejoNome").value = "";
      document.getElementById("desejoValor").value = "";
    }
  }
  
