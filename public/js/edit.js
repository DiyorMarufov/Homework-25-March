
const editButton = document.querySelectorAll(".edit-btn");

editButton.forEach(edit =>{
      
    edit.addEventListener("click", (e) => {
    e.preventDefault();
  
    const id = e.target.id;
    
    window.location = `http://localhost:4000/todo/${id}`;
  });
})

