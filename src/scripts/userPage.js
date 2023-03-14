import { validateUser, getProfileEmployee } from "./requests.js";

function logout() {
    
    const btnLogout = document.querySelector('.btn__logout');
    btnLogout.addEventListener('click', () => {
      window.location.href = './login.html';localStorage.clear();
    });
  
  }
  
 logout();
  
 async function authentication() {
  const token = localStorage.getItem('@kenzieEmpresas:token');
  if (token) {
      const isAdmin = await validateUser(JSON.parse(token));
     
      if (isAdmin.is_admin) {
          window.location.replace('./adminPage.html');
      } 
    } else {
      window.location.replace('./login.html');
    }
}

authentication()

 async function renderUserInfo(token) {
  const userInfoContainer = document.querySelector('.infos');
  if (!userInfoContainer) {
    console.error('Failed to find user info container element');
    return;
  }

  const profile = await getProfileEmployee(token);
  if (!profile) {
    console.error('Failed to fetch user profile');
    return;
  }

  const { username, email, professional_level, kind_of_work } = profile;

  const usernameElem = userInfoContainer.querySelector('.username');
  if (usernameElem) {
    usernameElem.textContent = username;
  }

  const emailElem = userInfoContainer.querySelector('.user__email');
  if (emailElem) {
    emailElem.textContent = email;
  }

  const levelElem = userInfoContainer.querySelector('.user__category');
  if (levelElem) {
    levelElem.textContent = professional_level;
  }

  const locationElem = userInfoContainer.querySelector('.user__location');
  if (locationElem) {
    locationElem.textContent = kind_of_work || '';
  }
}
renderUserInfo()
