const delButton = document.querySelectorAll(".del-btn");
delButton.forEach(del =>{
   
  del.addEventListener("click", (e) => {
    e.preventDefault();
  
    const id = e.target.id;
  
    fetch(`http://localhost:4000/todo/${id}`, { method: "DELETE" })
      .then((data) => {
        if (!data.ok) {
          alert("not found");
          return;
        }
  
        window.location = "http://localhost:4000";
      })
      .catch((e) => {
        alert(e.message);
      });
  });
})
