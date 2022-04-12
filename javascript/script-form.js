const fields = document.querySelectorAll("[required]") // todos os campos q possuem required

console.log(fields)


function validateField(field) {
    function verifyErrors() {
    let foundError = false;
    // encontrar se existe outro erro no validityState \/
    for (let error in field.validity) {
        // se não for customError
        // então verifica se tem outro erro
        if (field.validity[error] && !field.validity.valid) {
            foundError = error 
        }
    }
    return foundError;
    } 
    
    

    return verifyErrors()
}


function customValidation(event) {

    // event é o evento, no caso inválido e o target no caso é o field
    const field = event.target
    // logica para verificar se existem outros erros, fora o erro customizado (customError - que seria a customização do balão de erro)

    const error = validateField(field)
    let spanError = field.parentNode.querySelector("span.error") // parentNode é o nó pai, no caso a div que engloba cada input e span de erro.
    if(error) {
        spanError.classList.add('active')
        spanError.innerHTML = "Campo Obrigatório/Inválido"
    } else {
        spanError.classList.remove("active")
        spanError.innerHTML = ""
    }
    /* A lógica abaixo não se aplica pois queremos eliminar o balão de erro padrão e fazer um customizado.   */

    // if (error) {
    //        // trocar msg de required
    //     field.setCustomValidity('Esse campo é obrigatório!')
    // } else {
    //     field.setCustomValidity('')
    // }
    verifyErrors()  // executar a função || chamar a função
}
// para cada field que estiver em fields
for (let field of fields) {
    field.addEventListener('invalid', event => {
            // preventDefault - eliminar o balao de mensagem de erro default
            event.preventDefault()
            customValidation(event)
    }) // function customValidation() foi colocada no início do código
    field.addEventListener('blur', customValidation) // blur é quando não está em focus (não está selecionado)
}
document.querySelector('form').addEventListener('submit', event => {
    console.log('Enviar o formulário')
    // Não vai enviar o formulário \/
    event.preventDefault()
})