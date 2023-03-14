

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
      const isAdmin = await getUserType(JSON.parse(token));
     
      if (isAdmin.is_admin) {
          window.location.replace('./adminPage.html');
      } 
    } else {
      window.location.replace('./login.html');
    }
}

authentication()