import { getCompanies, getDepartments, createNewDepartment, getUsers, getUsersOutOfWork, validateUser, hireEmployee } from "./requests.js";

async function authentication() {
  const token = localStorage.getItem('@kenzieEmpresas:token');
  if (token) {
      const isAdmin = await validateUser(JSON.parse(token));
     
      if (!isAdmin.is_admin) {
          window.location.replace('./userPage.html');
      }
    } else {
      window.location.replace('./login.html');
    }
}
authentication()


function logout() {
  const btnLogout = document.querySelector('.btn__logout');
  btnLogout.addEventListener('click', () => {
    window.location.href = './login.html';
    localStorage.clear();
  });
}
logout();

async function renderDepartments(companyId) {
  const departmentList = document.getElementById("departmentList");
  const departments = await getDepartments();
  
  departmentList.innerHTML = "";
  
  departments.forEach((department) => {
    if(companyId === null || department.companies.uuid === companyId) {
      const departmentItem = document.createElement("li");
      departmentItem.classList.add("card__departament");
  
      const departmentInfo = document.createElement("div");
      departmentInfo.classList.add("info__card--departament");
  
      const name = document.createElement("h3");
      name.classList.add("name__dept");
      name.innerText = department.name;
  
      const description = document.createElement("p");
      description.classList.add("description__dept");
      description.innerText = department.description;
  
      const company = document.createElement("p");
      company.classList.add("company__dept");
      company.innerText = department.companies.name;
  
      departmentInfo.appendChild(name);
      departmentInfo.appendChild(description);
      departmentInfo.appendChild(company);
  
      const departmentOptions = document.createElement("div");
      departmentOptions.classList.add("card__options--departament");
  
      const eyeIcon = document.createElement("img");
      eyeIcon.setAttribute("src", "../assets/icons/Eye.svg");
      eyeIcon.setAttribute("alt", "");
      eyeIcon.classList.add("eye__btn");
      eyeIcon.setAttribute("data-department-id", department.uuid); // set data-department-id attribute
      eyeIcon.addEventListener('click', () => {
        
      findDepartment(departments, department.uuid);
      
      const modal = document.querySelector('.modal__departament--see');
      const hireBtn = document.querySelector('.hire__btn');
      const departmentId = event.target.getAttribute("data-department-id");
     
      selectUser.addEventListener('change', async (event) => {
        event.preventDefault()
        const userId = selectUser.options[selectUser.selectedIndex].dataset.userId;
    
        const employeeBody = {
          "user_uuid": userId,
          "department_uuid": departmentId
        }
        console.log(employeeBody)
        
        hireBtn.addEventListener('click', async(e)=>{
          e.preventDefault()
    
          await hireEmployee(employeeBody);
          await renderEmployeesAdminPage(await getUsers(), await getDepartments());
          // modal.close();
        })
      });
      modal.showModal();
      
      closeModal()
      
      renderUsersByDepartment(department.uuid);
    });
  
      const pencilIcon = document.createElement("img");
      pencilIcon.setAttribute("src", "../assets/icons/Pencil black.svg");
      pencilIcon.setAttribute("alt", "");
      pencilIcon.setAttribute("data-department-id", department.uuid); // set data-department-id attribute
  
      const trashIcon = document.createElement("img");
      trashIcon.setAttribute("src", "../assets/icons/Trash can.svg");
      trashIcon.setAttribute("alt", "");
      trashIcon.setAttribute("data-department-id", department.uuid); // set data-department-id attribute
  
      departmentOptions.appendChild(eyeIcon);
      departmentOptions.appendChild(pencilIcon);
      departmentOptions.appendChild(trashIcon);
  
      departmentItem.appendChild(departmentInfo);
      departmentItem.appendChild(departmentOptions);
  
      departmentList.appendChild(departmentItem);

    }
    
  });
 
}


async function renderCompanies() {
  const selectCompany = document.getElementById('companys');
  const companies = await getCompanies();

  const nullOption = document.createElement("option");
  nullOption.value = "null";
  nullOption.text = "Selecionar Empresa";
  selectCompany.appendChild(nullOption);

  companies.forEach(company => {
    const option = document.createElement('option');
    option.value = company.name;
    option.text = company.name;
    option.dataset.companyId = company.uuid;
    selectCompany.appendChild(option);
  });

  selectCompany.addEventListener('change', async () => {
    const companyId = selectCompany.options[selectCompany.selectedIndex].dataset.companyId;
    if (companyId) {
      await renderDepartments(companyId);
    } else {
      renderDepartments(null); 
    }
  });

  renderDepartments(null);
}

document.addEventListener("DOMContentLoaded", renderCompanies);


function configureCreateDepartmentModal() {
  const createDepartmentButton = document.querySelector(".create__departament");
  const createDepartmentModal = document.querySelector(".modal__departament--create");
  const departmentNameInput = createDepartmentModal.querySelector(".create__name");
  const departmentDescriptionInput = createDepartmentModal.querySelector(".create__description");
  const companySelect = createDepartmentModal.querySelector("#selectCompany");

  function openCreateDepartmentModal() {
    createDepartmentModal.showModal();
  }

  function closeCreateDepartmentModal() {
    createDepartmentModal.close();
  }

  createDepartmentButton.addEventListener("click", openCreateDepartmentModal);

  createDepartmentModal.querySelector("img").addEventListener("click", closeCreateDepartmentModal);

  const form = createDepartmentModal.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const departmentName = departmentNameInput.value;
    const departmentDescription = departmentDescriptionInput.value;
    const companyId = companySelect.value === "null" ? null : companySelect.value;
    const departmentBody = {
      name: departmentName,
      description: departmentDescription,
      company_uuid: companyId,
    };

    createDepartment(departmentBody)
      .then(() => {
        closeCreateDepartmentModal();
        return renderDepartments();
      })
      .catch((error) => console.error(error));
  });

  renderCompaniesInSelect(companySelect);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerText = "Enviar";
  form.appendChild(submitButton);
}
configureCreateDepartmentModal()

async function createDepartment(departmentBody) {
  const response = await createNewDepartment(departmentBody);
  const data = await response.json();
  renderDepartment(data);
}

function renderDepartment(department) {
  let departmentElement = document.createElement("div");
  departmentElement.classList.add("department");

  let departmentNameElement = document.createElement("h2");
  departmentNameElement.textContent = department.name;
  departmentElement.appendChild(departmentNameElement);

  let employeeListElement = document.createElement("ul");
  department.employees.forEach(function (employee) {
    let employeeElement = document.createElement("li");
    employeeElement.textContent = employee.name;
    employeeListElement.appendChild(employeeElement);
  });
  departmentElement.appendChild(employeeListElement);

  return departmentElement;
}

async function renderCompaniesInSelect() {
  const selectCompany = document.getElementById("selectCompany");
  selectCompany.innerHTML = "<option value='null'>Selecionar Empresa</option>";
  const companies = await getCompanies();

  companies.forEach((company) => {
    const option = document.createElement("option");
    option.value = company.uuid;
    option.text = company.name;
    selectCompany.add(option);
  });
}

async function openModalSee(event) {
  event.preventDefault();

  const modal = document.querySelector('.modal__departament--see');
  modal.showModal();
  
  const hireBtn = document.querySelector('.hire__btn');
  const departmentId = event.target.getAttribute("data-department-id");

  closeModal();
}



function closeModal() {
  const closeButton = document.querySelector('.close__modal--btn');
  const modal = document.querySelector('.modal__departament--see');

  closeButton.addEventListener('click', function() {
    modal.close();
  });
}

async function renderUsersOutOfWork() {
  const selectUser = document.getElementById('selectUser');
  const users = await getUsersOutOfWork();

  const nullOption = document.createElement("option");
  nullOption.value = "null";
  nullOption.text = "Selecionar Usuário";
  selectUser.appendChild(nullOption);

  users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.uuid;
    option.text = user.username;
    option.dataset.userId = user.uuid;
    selectUser.appendChild(option);
  });

  // selectUser.addEventListener('change', async (event) => {
  //   event.preventDefault()
  //   const userId = selectUser.options[selectUser.selectedIndex].dataset.userId;

  //   const employeeBody = {
  //     "user_uuid": userId,
  //     "department_uuid": departmentId
  //   }
  //   console.log(employeeBody)

  //   hireBtn.addEventListener('click', async(e)=>{
  //     e.preventDefault()

  //     await hireEmployee(employeeBody);
  //     await renderEmployeesAdminPage(await getUsers(), await getDepartments());
  //     // modal.close();
  //   })
  // });
}
renderUsersOutOfWork();

function findDepartment(departments, id) {
  const department = departments.find(d => d.uuid === id);
  if (!department) {
    console.error(`Department with id ${id} not found.`);
    return;
  }
  const modal = document.querySelector('.modal__departament--see');
  const nameEl = modal.querySelector('.departament__see--title h2');
  const descriptionEl = modal.querySelector('.departament__see--description');
  const companyEl = modal.querySelector('.departament__see--company');
  nameEl.textContent = department.name;
  descriptionEl.textContent = department.description;
  companyEl.textContent = department.companies.name;
}

async function renderUsersByDepartment(departmentId) {
  console.log(departmentId)
  const selectUser = document.getElementById("selectUser");
  const userContainer = document.querySelector(".user__container-card");
  selectUser.innerHTML = "";
  userContainer.innerHTML = "";

  const users = await getUsers();
  const filteredUsers = users.filter(user => user.department_uuid === departmentId);

  const department = await getDepartments(departmentId);
  const companyName = department.company ? department.company.name : 'Company not found';


  const departmentName = department.name;
  const departmentDescription = department.description;

  const departmentTitle = document.querySelector(".departament__see--title h2");
  departmentTitle.innerText = departmentName;

  const departmentDescriptionEl = document.querySelector(".departament__see--description");
  departmentDescriptionEl.innerText = departmentDescription;

  const departmentCompanyEl = document.querySelector(".departament__see--company");
  departmentCompanyEl.innerText = companyName;

  filteredUsers.forEach(user => {
    const userItem = document.createElement("li");
    userItem.innerHTML = `
      <h3 class="li__username">${user.username}</h3>
      <p class="li__category">${user.professional_level}</p>
      <p class="li__company">${companyName}</p>
      <button class="fire__employee" type="submit">Desligar</button>
    `;
    userContainer.appendChild(userItem);
  });
}



export async function renderEmployeesAdminPage(employees, departments) {
  const ulContainer = document.querySelector('.user__cards > ul');

  ulContainer.innerHTML = '';
  employees.shift();
  employees.forEach(async employee => {
      const employeeDepartmentId = employee.department_uuid;
      const employeeDepartmentName = departments.find(department => department.uuid == employeeDepartmentId)
      let foundedCompany = '';
      if(employeeDepartmentName != undefined){
          foundedCompany = employeeDepartmentName.companies.name;
      }
      const createdEmployee = createEmployees(employee, foundedCompany);
      
      ulContainer.appendChild(createdEmployee);
  })
  // handleModalUpdateEmployee(employees);
  // handleModalDeleteEmployee();
  // handleModalNewDepartment();
} 

function createEmployees (employee, departmentName){
  if(departmentName == ''){
      departmentName = 'Funcionário ainda não contratado'
  }

  const liContainer = document.createElement('li');

  const dataContainer = document.createElement('div');
  dataContainer.classList.add('info__card--user');

  const employeeName = document.createElement('h3');
  employeeName.innerText = employee.username;
  employeeName.setAttribute('id', 'info__card--employeeName');

  const employeePosition = document.createElement('p');
  employeePosition.innerText = employee.professional_level;

  const companyName = document.createElement('p');
  companyName.innerText = departmentName;

  dataContainer.append(employeeName, employeePosition, companyName);

  const imagesContainer = document.createElement('div');
  imagesContainer.classList.add('card__options--user');

  const imagePencil = document.createElement('img');
  imagePencil.src = '../assets/icons/Pencil purple.svg';
  imagePencil.alt = 'Purple Pencil Icon';
  imagePencil.classList.add('info__card--PurplePencil');
  imagePencil.dataset.employeeId = employee.uuid;

  const imageTrash = document.createElement('img');
  imageTrash.src = '../assets/icons/Trash can.svg';
  imageTrash.alt = 'Trash Icon';
  imageTrash.classList.add('info__card--trashEmployee');
  imageTrash.dataset.employeeId = employee.uuid;
  imageTrash.dataset.employeeName = employee.username;

  imagesContainer.append(imagePencil, imageTrash);

  liContainer.append(dataContainer, imagesContainer);

  return liContainer;
}