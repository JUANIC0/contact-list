// Variables
const nombreInput = document.getElementById("nombre-input");
const apellidoInput = document.getElementById("apellido-input");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const updateNombreInput = document.getElementById("update-nombre-input");
const updateApellidoInput = document.getElementById("update-apellido-input");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = null;
const validRegex = /^[a-zA-Z0-9.!#$%&*+/?^_`{|}~~]+[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)$/;

// Funciones
function renderTable() {
  tableBody.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const tr = document.createElement("tr");
    const idTd = document.createElement("td");
    const nombreTd = document.createElement("td");
    const apellidoTd = document.createElement("td");
    const actionsTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";

    idTd.innerText = user.id;
    nombreTd.innerText = user.nombre;
    apellidoTd.innerText = user.apellido;

    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";

    editBtn.addEventListener("click", () => {
      showUpdateForm(user.id);
    });

    deleteBtn.addEventListener("click", () => {
      deleteUser(user.id);
    });

    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);

    tr.appendChild(idTd);
    tr.appendChild(nombreTd);
    tr.appendChild(apellidoTd);
    tr.appendChild(actionsTd);

    tableBody.appendChild(tr);
  }
}

function addUser() {
  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();

  if (nombre && apellido !== "") {
    var id = 1;
    var val = users.map(function(x) { return x.id; }).indexOf(id);

    while (val !== -1) {
      id++;
      val = users.map(function(x) { return x.id; }).indexOf(id);
    }

    const user = {
      id: id,
      nombre: nombre,
      apellido: apellido
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    nombreInput.value = "";
    apellidoInput.value = "";

    renderTable();
  } else {
    alert("Nombre y apellido son obligatorios");
  }
}

function updateUser() {
  const nombre = updateNombreInput.value;
  const apellido = updateApellidoInput.value;

  if (nombre && apellido !== "") {
    const index = users.findIndex((user) => user.id === currentUserId);

    if (index !== -1) {
      users[index].nombre = nombre;
      users[index].apellido = apellido;

      localStorage.setItem("users", JSON.stringify(users));
      hideUpdateForm();
      renderTable();
    }
  } else {
    alert("Nombre y apellido son obligatorios");
  }
}

function showUpdateForm(userId) {
  const user = users.find((user) => user.id === userId);

  if (user) {
    updateNombreInput.value = user.nombre;
    updateApellidoInput.value = user.apellido;
    currentUserId = user.id;

    updateBtn.addEventListener("click", updateUser);
    cancelBtn.addEventListener("click", hideUpdateForm);

    updateBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    updateNombreInput.style.display = "inline-block";
    updateApellidoInput.style.display = "inline-block";
    document.getElementById("update-container").style.display = "block";
  }
}

function hideUpdateForm() {
  updateNombreInput.value = "";
  updateApellidoInput.value = "";
  currentUserId = null;

  updateBtn.removeEventListener("click", updateUser);
  cancelBtn.removeEventListener("click", hideUpdateForm);

  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  updateNombreInput.style.display = "none";
  updateApellidoInput.style.display = "none";
  document.getElementById("update-container").style.display = "none";
}

function deleteUser(userId) {
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));

  if (users.length === 0) {
    hideUpdateForm();
  }

  renderTable();
}

// Lista de Eventos
addBtn.addEventListener("click", addUser);

// Inicializar tabla
renderTable();
