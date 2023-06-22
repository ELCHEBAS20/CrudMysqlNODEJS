'use strict';

const Tbody = document.querySelector('#rstbody');
var RstInfo = [];
const socket = io();

let getWebSocket = () => {
  return io();
}

function getRowDb(isVisible) {
  socket.on('cliente:listView', (data) => {
    ListView(data, isVisible);
  })

}

function ListView(info, isVisible) {
  RstInfo.push(info);
  Tbody.innerHTML = '';
  for (let index = 0; index < info.row.length; index++) {
    Tbody.innerHTML += `<tr>
       <th scope="col">${info.row[index].idUsuario}</th>
       <td>${info.row[index].Nombre}</td>
       <td>${info.row[index].Apellido}</td>
       <td>${info.row[index].Edad}</td>
       <td>${info.row[index].Direccion}</td>
       <td>
          <button class='btn btn-outline-primary' onclick="editUser(${info.row[index].idUsuario})"><i class="fas fa-edit"></i></button>
          <button class='btn btn-outline-danger'  ><i class="fa-solid fa-trash"></i></button>
       </td>
</tr>`;
  }

  if (isVisible) {
    addElement();
  }
}

function addElement() {

  var lenKey = Object.keys(RstInfo[0].row[0]);

  const cardBx = document.getElementById('bxCard');
  let form = document.createElement('form');

  form.id = 'fxMain';
  cardBx.appendChild(form);

  const formMain = document.getElementById('fxMain');

  for (const key in lenKey) {
    let Input = document.createElement('input');
    Input.className = 'form-control';
    Input.setAttribute(`${key != 0 ? null : 'readonly'}`, `${key != 0 ? null : true}`)
    Input.name = `txt-${key}`;
    let Label = document.createElement('label');
    Label.textContent = lenKey[key];
    Label.style.fontWeight = 'bold';
    cardBx.appendChild(form);
    formMain.appendChild(Label);
    formMain.appendChild(Input);
  }
  const btnSubmit = document.createElement('button');
  btnSubmit.id = 'btn-submit';
  btnSubmit.className = 'btn btn-success btn-lg btn-block btn-sm';
  btnSubmit.type = 'submit';
  btnSubmit.style.marginTop = '2%';
  btnSubmit.textContent = 'Insertar informacion';


  formMain.appendChild(btnSubmit);


  getFormulario();

}

function editUser(itemId) {

  let getRow = RstInfo[0].row;
  let countValores = 0;
  let RsFilter = getRow.filter(item => item.idUsuario == itemId)[0];

  for (let row in RsFilter) {
    document.getElementsByName('txt-' + countValores)[0].value = RsFilter[row];
    document.getElementsByName('txt-' + countValores)[0].readOnly = countValores != 0 ? false : true;
    countValores++;
  }
  document.getElementById('btn-submit').textContent = 'Modificar informacion';
  document.getElementById('btn-submit').className = 'btn btn-primary btn-lg btn-block btn-sm';

  document.getElementsByTagName('strong')[1].textContent = 'Modificar informacion';
}

function ReiniciarElements() {

  document.getElementById('fxMain').addEventListener('submit', e => {
    e.preventDefault();
    let len = document.getElementsByTagName('input');
    for (let index = 0; index < len.length; ++index) {
      len[index].value = '';
    }
    document.getElementById('btn-submit').textContent = 'Insertar informacion';
    document.getElementById('btn-submit').className = 'btn btn-success btn-lg btn-block btn-sm';
    document.getElementsByTagName('strong')[1].textContent = 'Insertar informacion';
  })
}

function getFormulario() {


  document.getElementById('fxMain').addEventListener('submit', e => {
    e.preventDefault();

    let count = 0;

    const setText = document.getElementById('btn-submit').textContent;
    const setInput = document.getElementsByTagName('input');

    let objUser = {
      Nombre: setInput[1].value,
      Apellido: setInput[2].value,
      Edad: setInput[3].value,
      Direccion: setInput[4].value
    }

    if (setText.charAt(0) == "I") {
      // getWebSocket().emit('user:insert', objUser);
      socket.emit('server:message', { data: 'insertadooo!!!' });
    } else {
      socket.emit('server:message', { data: 'Updateeeeeee!!' });
    }

    socket.on('rstMessage', (info) => {
      count++;
      if (count == 1) {
        /**Aca dejaria el sWALL */
        return;
      }
    })

  })
}



getRowDb(true);




