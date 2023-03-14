import { createNewUser } from "./requests.js";


function goToHomePage(){
    const homePageBtn = document.querySelector('.btn__home');

    homePageBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '../../index.html'
    })
}
goToHomePage()

function goToLoginPage(){
    const loginPageBtn = document.querySelector('.btn__login');

    loginPageBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = './login.html'
    })
}
goToLoginPage()


function registerUser() {

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const professionalLevel = document.getElementById('professional_level');
    const registerBtn = document.querySelector('.register__btn');
    let count = 0;

    registerBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        if(username.value == '' || email.value == '' || password.value == ''){
            count++;
        }

        const userBody = {
        username: username.value,
        email: email.value,
        password: password.value,
        // professional_level: professionalLevel.value,

      };
      console.log(userBody)
        if(count != 0){
            count = 0;
            username.value = '';
            email.value = '';
            password.value = '';
            toast('Por favor, preencha todos os campos', '', '', 'redRegister');
            return;
        } else {
            const newUser = await createNewUser(userBody);
            // username.value = '';
            // email.value = '';
            // password.value = '';
            
            // console.log(newUser)
            // return newUser;
            
        }
    
    });
   
  }
  registerUser()
