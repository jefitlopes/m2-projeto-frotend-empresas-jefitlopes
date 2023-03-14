import { getCompanies } from "./requests.js";
import { getSectors } from "./requests.js";

const baseUrl = 'http://localhost:6278';

function goToLoginPage(){
    const loginPageBtn = document.querySelector('.btn__login');

    loginPageBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace('./src/pages/login.html')
    })
}

goToLoginPage()

function goToRegisterPage(){
    const registerPageBtn = document.querySelector('.btn__register');

    registerPageBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace('./src/pages/register.html')
    })
}

goToRegisterPage()

async function renderCompanies(selectedSectorUuid = null) {
    const sectorCard = document.querySelector('.cards > ul');
    sectorCard.innerHTML = '';
  
    const companies = await getCompanies().catch(error => {
      console.error(error);
      return [];
    });
  
    const filteredCompanies = selectedSectorUuid
      ? companies.filter(company => company.sectors.uuid === selectedSectorUuid)
      : companies;
  
    filteredCompanies.forEach(company => {
      const name = company.name;
      const openingHours = company.opening_hours;
      const sectorDescription = company.sectors.description;
  
      const companyHTML = `
        <li class="sector__card">
          <h3 class="card__name">${name}</h3>
          <p class="card__info">${openingHours}</p>
          <p class="card__sector">${sectorDescription}</p>
        </li>
      `;
      sectorCard.insertAdjacentHTML('beforeend', companyHTML);
    });
  }
  
  async function renderSectorOptions() {
    const selectElement = document.getElementById('selectSector');
    const defaultOption = '<option value="null">Selecionar Setor</option>';
  
    const sectors = await getSectors().catch(error => {
      console.error(error);
      return [];
    });
  
    const optionsHtml = sectors
      .map(sector => `<option value="${sector.uuid}">${sector.description}</option>`)
      .join('');
  
    selectElement.insertAdjacentHTML('beforeend', defaultOption + optionsHtml);
  
    selectElement.addEventListener('change', event => {
      const selectedSectorUuid = event.target.value !== 'null' ? event.target.value : null;
      renderCompanies(selectedSectorUuid);
    });
  }
  
  renderSectorOptions();
  renderCompanies();
  
  
  