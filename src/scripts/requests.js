const baseUrl = 'http://localhost:6278';
const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token")) || "";
const requestHeadersNoToken = {
    'Content-Type': 'application/json'
}
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization : `Bearer ${token}`
}

export async function loginPage(loginBody){
    const token = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    }).then(async(response) => {
        if(response.ok){
            const tokenUser = await response.json();
            localStorage.setItem("@kenzieEmpresas:token", JSON.stringify(tokenUser.token));
            const {is_admin} = await validateUser();
            redirect(is_admin);
            return tokenUser;
        } else {
            const responseError = await response.json();
            toast('Email e/ou senha incorreto', 'Favor tentar novamente', '', 'red');
            return responseError;
        }   
    });
    return token;
}

export async function createNewUser(userBody){
    const user = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: requestHeadersNoToken,
        body: JSON.stringify(userBody)
    }) .then((response) =>{
        if(response.ok){

            // alert('Sua conta foi criada com sucesso!', 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: ', "../../index.html" )
            
            setTimeout(() => {
                window.location.href = '../pages/login.html';
              }, 3000)
            
            return response.json();

        } else{
            response.json().then((responseError) => {
                // alert(responseError.message);
            })
        }
    })
    return user;
}

export async function validateUser(){
    const userType = await fetch(`${baseUrl}/auth/validate_user`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            
            return response.json();
        } else {
            response.json().then((responseError) => {
                console.log(responseError)
            })
        }
    })
    return userType;
}

function redirect(is_admin){
    if(is_admin){
        window.location.href = './adminPage.html'
    }else{
        window.location.href = './userPage.html'
    }
}

export async function getCompanies() {
    const companies = await fetch(`${baseUrl}/companies`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            
            return response.json();
        } else {
            response.json().then((responseError) => {
        
            })
        }
    })             
    return companies;
}


export async function getCompaniesSector(sector){
    const companiesSector = await fetch(`${baseUrl}/companies/${sector}`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) => {
        if(response.ok){

            return response.json();
        } else{
            response.json().then((responseError) => {

            })
        }
    })
    return companiesSector;
}

export async function getSectors(){
    const sectors = await fetch(`${baseUrl}/sectors`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) => {
        if(response.ok){

            return response.json()
        } else{
            response.json().then((responseError) => {

            })
        }
    })
    return sectors;
}

export async function getProfileEmployee(){
    const profileEmployee = await fetch(`${baseUrl}/users/profile`, {
        method: "GET",
        headers: requestHeaders
    })
    .then((response) => {
        if(response.ok){

            return response.json()
        } else{
            response.json().then((responseError) => {

            })
        }
    })
    return profileEmployee;
}

export async function getEmployeeByDepartment (){
    const employeeDepartments = await fetch(`${baseUrl}/departments/coworkers`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            //toast?

            return response.json();
        } else {
            response.json().then((responseError) => {
                //toast?

            })
        }
    })
    return employeeDepartments;
}

export async function getCompanyDeptByEmployee (){
    const companyDeptEmployee = await fetch(`${baseUrl}/users/departments`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            //toast?

            return response.json();
        } else {
            response.json().then((responseError) => {
                //toast?

            })
        }
    })
    return companyDeptEmployee;
}
// EDITAR

export async function updateEmployee (userBody){
    const updateEmp = await fetch(`${baseUrl}/users`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(userBody)
    }).then((response) =>{
        if(response.ok){
            // toast?!

            return response.json();
        } else {
            response.json().then((responseError) => {
                //toast?
            })
        }
    })
    return updateEmp;
}

export async function createNewCompany (companyBody){
    const newCompany = await fetch(`${baseUrl}/companies`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(companyBody)
    }).then((response) =>{
        if(response.ok){
            //toast?

            return response.json();
        } else {
            response.json().then((responseError) => {
                //toast?

            })
        }
    })
    return newCompany;
}

export async function getDepartments (){
    const departments = await fetch(`${baseUrl}/departments`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
          
            return response.json();
        } else {
            response.json().then((responseError) => {
            
            })
        }
    })
    return departments;
}

export async function getDepartmentById(departmentId) {
    const department = await fetch(`${baseUrl}/departments/${departmentId}`, {
      method: "GET",
      headers: requestHeaders,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        response.json().then((responseError) => {});
      }
    });
    return department;
  }
  

export async function getDepartmentsByCompany (companyId){
    const departmentsByCompany = await fetch(`${baseUrl}/departments/${companyId}`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){

            return response.json();
        } else {
            response.json().then((responseError) => {
                
            })
        }
    })
    return departmentsByCompany;
}

export async function createNewDepartment (departmentBody){
    const createDepartment = await fetch(`${baseUrl}/departments`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(departmentBody)
    }).then((response) =>{
        if(response.ok){
            alert('Departamento criado com sucesso', 'O novo departamento já consta na empresa selecionada')
            setTimeout(() => {
                window.location.reload();
              }, 1000)
            return;
        } else {
            if (response && response.json) {
                response.json().then((responseError) => {
                    console.log(responseError)
                })
            } else {
                console.error('Erro na resposta da API');
            }
        }
    })
    return createDepartment;
}

  

export async function hireEmployee (employeeBody){
    const newEmployee = await fetch(`${baseUrl}/departments/hire/`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(employeeBody)
    }).then((response) =>{
        if(response.ok){
            alert('Funcionário contratado com sucesso', 'O referido funcionário já consta em nosso sistema como ativo')
            setTimeout(() => {
                window.location.reload();
              }, 1000)

            return response.json();
        } else {
            response.json().then((responseError) => {
               alert("Não pôde-se contratar")

            })
        }
    })
    return newEmployee;
}

export async function fireEmployee (employeeId){
    const employeeFired = await fetch(`${baseUrl}/departments/dismiss/${employeeId}`, {
        method: "PATCH",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            // toast?!

            return response.json();
        } else {
            response.json().then((responseError) => {
                //toast? 

            })
        }
    })
    return employeeFired;
}

export async function updateDepartment (departmentBody, departmentId){
    const departmentUpdated = await fetch(`${baseUrl}/departments/${departmentId}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(departmentBody)
    }).then((response) =>{
        if(response.ok){
            // toast?!

            return response.json();
        } else {
            response.json().then((responseError) => {
                //toast? 

            })
        }
    })
    return departmentUpdated;
}

export async function deleteDepartment (departmentId){
    const departmentDeleted = await fetch(`${baseUrl}/departments/${departmentId}`, {
        method: "DELETE",
        headers: requestHeaders,
    }).then((response) =>{
        if(response.ok){
            // toast?!

            return;
        } else {
            response.json().then((responseError) => {
                //toast? 

            })
        }
    })
    return departmentDeleted;
}

export async function getUsers (){
    const allUsers = await fetch(`${baseUrl}/users`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
           
            return response.json();
        } else {
            response.json().then((responseError) => {
             
            })
        }
    })
    return allUsers;
}

export async function getUsersOutOfWork (){
    const usersNoWorking = await fetch(`${baseUrl}/admin/out_of_work`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            //toast?

            return response.json();
        } else {
            response.json().then((responseError) => {
                //toast?

            })
        }
    })
    return usersNoWorking;
}

export async function updateEmployeeByAdmin (employeeBody, employeeId){
    const employeeUpdated = await fetch(`${baseUrl}/admin/update_user/${employeeId}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(employeeBody)
    }).then((response) =>{
        if(response.ok){
            // toast?!

            return response.json();
        } else {
            response.json().then((responseError) => {
                //toast? 

            })
        }
    })
    return employeeUpdated;
}

export async function deleteUser (userId){
    const userDeleted = await fetch(`${baseUrl}/admin/delete_user/${userId}`, {
        method: "DELETE",
        headers: requestHeaders,
    }).then((response) =>{
        if(response.ok){
            // toast?!

            return response.json();
        } else {
            response.json().then((responseError) => {
                //toast? 

            })
        }
    })
    return userDeleted;
}