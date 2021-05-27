const clients = [
    { id: 1, taxNumber: '6208', name: 'Client 1'},
    { id: 2, taxNumber: '1785', name: 'Client 2'},
    { id: 3, taxNumber: '8264', name: 'Client 3'},
    { id: 4, taxNumber: '5877', name: 'Client 4'},
    { id: 5, taxNumber: '0201', name: 'Client 5'},
    { id: 6, taxNumber: '8042', name: 'Client 6' }
  ];
  const accounts = [
    { clientId: 6, bankId: 1, balance: 150000 },
    { clientId: 1, bankId: 3, balance: 180000 },
    { clientId: 5, bankId: 3, balance: 1350000 },
    { clientId: 2, bankId: 2, balance: 56000 },
    { clientId: 3, bankId: 1, balance: 230000 },
    { clientId: 5, bankId: 2, balance: 150000 },
    { clientId: 3, bankId: 3, balance: 459000 },
    { clientId: 2, bankId: 3, balance: 190000 },
    { clientId: 4, bankId: 3, balance: 510000 },
    { clientId: 5, bankId: 1, balance: 890000 },
    { clientId: 1, bankId: 2, balance: 16000 },
    { clientId: 5, bankId: 3, balance: 375000 },
    { clientId: 6, bankId: 1, balance: 192000 },
    { clientId: 2, bankId: 3, balance: 100000 },
    { clientId: 3, bankId: 2, balance: 54000 },
    { clientId: 3, bankId: 1, balance: 90000 },
    { clientId: 4, bankId: 3, balance: 135000 },
    { clientId: 2, bankId: 1, balance: 382000 },
    { clientId: 5, bankId: 2, balance: 170000 },
    { clientId: 1, bankId: 3, balance: 10000 },
    { clientId: 5, bankId: 2, balance: 6000 },
    { clientId: 6, bankId: 1, balance: 162000 },
    { clientId: 2, bankId: 2, balance: 100000 }
  ]
  const banks = [
    { id: 1, name: 'BANK1' },
    { id: 2, name: 'BANK2' },
    { id: 3, name: 'BANK3' }
  ];
  

// 0. Array with the id's of every client
function listClientsIds() {
    return clients.map((client) => client.id);
};

// 1. Array with the id's of every client sorted by rut
function listClientsIdsSortByTaxNumber() {
  ordenados = clients.sort((a , b) => (a.taxNumber < b.taxNumber) ? 1 : -1)
  lista = ordenados.map((client) => client.id)
  return lista
};

// 2. array with the name's of every client sorted (descendent) by the total amount in their accounts
function sortClientsTotalBalances(base = clients) {
    let arreglo = new Array()
    base.forEach((client) => {
        cliente = accounts.filter(accounts => accounts.clientId == client.id)
        suma = 0 
        for (var i = 0; i < cliente.length; i++){
            suma += cliente[i]['balance']
        }
        arreglo.push({nombre : client.name, suma: suma})
    }); 
    ordenados = arreglo.sort((a , b) => (a.suma < b.suma) ? 1 : -1)
    return ordenados.map(orden => orden.nombre)
}

// 3. Object in which the keys are the names of the banks and the values ​​an array with the taxnumbers of their clients ordered alphabetically by name.
function banksClientsTaxNumbers() {
    let arreglo = new Array()
    banks.forEach((bank) => {
        clientesBanco = accounts.filter(account => account.bankId == bank.id)
        clientIds = [... new Set(clientesBanco.map(cliente => cliente.clientId))]
        let clientes = new Array()
        clientIds.forEach(id => {
            nombre = clients.filter(clients => clients.id == id)[0]['name']
            rut = clients.filter(clients => clients.id == id)[0]['taxNumber']
            clientes.push({nombre:nombre , rut:rut})
        })
        ordenados = clientes.sort((a , b) => (a.nombre < b.nombre) ? 1 : -1)
        ruts = ordenados.map(orden => orden.rut)
        var obj = {}
        obj[bank.name] = ruts
        arreglo.push(obj)
    })
    return arreglo
}

// 4. Array ordered in descending order with the balances of clients that have more than 25,000 in each bank
function richClientsBalances(rich = 25000) {
  // CODE HERE
  let arreglo = new Array()
  clients.forEach((client) => {
      cliente = accounts.filter(accounts => accounts.clientId == client.id)
      suma = 0 
      for (var i = 0; i < cliente.length; i++){
          suma += cliente[i]['balance']
      }
      if (suma > rich){
        arreglo.push(suma)
      }
  }); 
  return arreglo.sort((a, b) => b - a)
}

// 5. Array with bank ids ordered increasing by the TOTAL amount of money they manage.
function banksRankingByTotalBalance() {
  let arreglo = new Array()
  banks.forEach((bank) => {
      cuentas = accounts.filter(account => account.bankId == bank.id)
      balances = cuentas.map(account => account.balance)
      suma = balances.reduce((a, b) => a + b)
      arreglo.push({id: bank.id, balance: suma})
  })

  sorted = arreglo.sort((a, b) =>(a.balance > b.balance) ? 1 : -1)
  ids = sorted.map(id => id.id)
  return ids
}

// 6. Object in which the keys are the names of the banks and the values ​​the number of clients who only have accounts in that bank.
function banksFidelity() {
  banco1 = 0
  banco2 = 0
  banco3 = 0
  clients.forEach((cliente) => {
    cuentas = accounts.filter(account => account.clientId == cliente.id)
    banksIds = [... new Set(cuentas.map(cliente => cliente.bankId))]
    if (banksIds.length == 1) {
      if (banksIds[0] == 1) {
        banco1 ++
      } else if (banksIds[0] == 2){
        banco2++
      } else {
        banco3 ++
      }
    }
  })
  cantidades = [banco1 , banco2 , banco3]

  arreglo = new Array()
  banks.forEach((bank) => {
    index = bank.id -1
    cantidad = cantidades[index]
    var obj = {}
    obj[bank.name] = cantidad
    arreglo.push(obj)
  })

  return arreglo
}

// 7. Object in which the keys are the names of the banks and the values ​​the id of your client with less money.
function banksPoorClients() {
  let arreglo = new Array()
  banks.forEach((bank) => {
      clientesBanco = accounts.filter(account => account.bankId == bank.id)
      clientIds = [... new Set(clientesBanco.map(cliente => cliente.clientId))]
      let clientes = new Array()
      clientIds.forEach(id => {
          cuentas = accounts.filter(clients => clients.clientId == id)
          monto = cuentas.map(account => account.balance).reduce((a, b) => a + b)
          clientes.push({id: id , balance:monto})
      })
      console.log(clientes)
      menor = clientes.sort((a , b) => (a.balance > b.balance) ? 1 : -1)[0]['id']
      var obj = {}
      obj[bank.name] = menor
      arreglo.push(obj)
  })
  return arreglo
}

// 8. Add a new client with fictitious data to "clients" and add an account in BANK 3 with a balance of 9000.
// Then return the place that this client occupies in the ranking of question 2.
// To avoid changing the result of the previous answers I create the next copy of the bases
updatableClients = clients
updatableAccounts = accounts

function newClientRanking(idBanco = 3, monto = 9000 , rut = '7363', name = 'MAXIMILIANO ALARCON') {
  nuevoid = clients.length 
  nuevoid ++
  updatableClients.push({ id: nuevoid, taxNumber: rut, name: name })
  updatableAccounts.push({clientId: nuevoid , bankId: idBanco , balace : monto})
  sorted = sortClientsTotalBalances(base = updatableClients)

  for (var i = 0; i < sorted.length; i++){
    if (sorted[i] == name){
      return i+1
    }
  }
}
console.log('Answer 0');
console.log(listClientsIds());
console.log('Answer 1');
console.log(listClientsIdsSortByTaxNumber());
console.log('Answer 2');
console.log(sortClientsTotalBalances());
console.log('Answer 3');
console.log(banksClientsTaxNumbers());
console.log('Answer 4');
console.log(richClientsBalances());
console.log('Answer 5');
console.log(banksRankingByTotalBalance());
console.log('Answer 6');
console.log(banksFidelity());
console.log('Answer 7');
console.log(banksPoorClients());
console.log('Answer 8');
console.log(newClientRanking());
