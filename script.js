async function buscaEndereco(cep) {
  let mensagemErro = document.querySelector("#erro");
  mensagemErro.innerHTML = "";
  try {
    let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
      throw Error("CEP não existente!");
    }
    let logradouro = document.querySelector("#endereco");
    let cidade = document.querySelector("#cidade");
    let estado = document.querySelector("#estado");
    let bairro = document.querySelector("#bairro");

    cidade.value = consultaCEPConvertida.localidade;
    estado.value = consultaCEPConvertida.uf;
    logradouro.value = consultaCEPConvertida.logradouro;
    bairro.value = consultaCEPConvertida.bairro;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
    console.log(erro);
  }
}

let cep = document.querySelector("#cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));

// Como ter varias promisses de uma vez
// let ceps = ['01001000', '01001001']
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores))
// Promise.all(conjuntoCeps).then(respostas => console.log(respostas))
