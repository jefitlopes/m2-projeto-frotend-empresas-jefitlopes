import { loginPage } from "./requests.js"


export function handleLogin(){
    const inputEmail = document.querySelector('.login__email')
    const inputPassword = document.querySelector('.login__password')
    const submitButton = document.querySelector('.login__btn')
    let count = 0

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();

        if(inputEmail.value == '' || inputPassword.value == ''){
            count++;
        }
        const loginBody = {
            email: inputEmail.value,
            password: inputPassword.value
        };
        if(count != 0){
            count = 0;
            inputEmail.value = '';
            inputPassword.value = '';
            alert('Informe os dados', 'Por favor, forneça email e senha de login', '', 'redLogin');
            return;
        } else{
            const { token, uuid } = await loginPage(loginBody);
            inputEmail.value = '';
            inputPassword = '';
            localStorage.setItem('uuid', uuid); 
            
            console.log(localStorage.getItem('uuid')); 

            return token;
        }
    })
}

handleLogin()


function goToHomePage(){
    const homePageBtn = document.querySelector('.btn__home');

    homePageBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace('../../index.html')
    })
}
goToHomePage()

function goToRegisterPage(){
    const registerPageBtn = document.querySelector('.btn__register');

    registerPageBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace('./register.html')
    })
}
goToRegisterPage()

function goToRegister(){
    const registerPageBtn = document.querySelector('.register__btn');

    registerPageBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace('./register.html')
    })
}
goToRegister()