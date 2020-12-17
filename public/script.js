let vault = null
let test = null
let res = null
let returned = null


// fetch username password and valt id from node server
fetch("http://localhost:3030/vault")
  .then(response => response.text())
  .then(result => {
    vault = result
    
    ccForm(vault)

  })
  .catch(error => console.log('error', error));



function ccForm(vault) {
  const vgsForm = window.VGSCollect.create(vault, 'sandbox', () => {});

  const css = {
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI"',
  };

  vgsForm.field('#cc-holder', {
    type: 'text',
    name: 'card_holder',
    placeholder: 'Card holder',
    validations: ['required'],
    css: css,
  });

  vgsForm.field('#cc-number', {
    type: 'card-number',
    name: 'card_number',
    successColor: '#4F8A10',
    errorColor: '#D8000C',
    placeholder: 'Card number',
    showCardIcon: true,
    validations: ['required', 'validCardNumber'],
    css: css,
  });

  

  vgsForm.field('#cc-cvc', {
    type: 'card-security-code',
    name: 'card_cvc',
    successColor: '#4F8A10',
    errorColor: '#D8000C',
    placeholder: 'CVC',
    maxLength: 3,
    validations: ['required', 'validCardSecurityCode'],
    css: css,
  });

  vgsForm.field('#cc-expiration-date', {
    type: 'card-expiration-date',
    name: 'card_exp',
    successColor: '#4F8A10',
    errorColor: '#D8000C',
    placeholder: 'MM / YY',
    validations: ['required', 'validCardExpirationDate'],
    css: css,
  });

  document.getElementById("collect-form").addEventListener('submit', (e) => {
    e.preventDefault();
    vgsForm.submit('/post', {}, (status, response) => {
      if (status === 200) {
        console.log("success");
        console.log(response)
        res = response
        //return response

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(res);

        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:3030/send", requestOptions)
        .then(response =>{
          if(response.ok){
            console.log("data sent to node server")
          }
        })
        .then(result =>{
          return result
        })
      }
    }, (error) => {
      console.log(error);
    });
  });

}

document.querySelector("#reveal").addEventListener("click", () => {
  
      fetch("http://localhost:3030/get")
        .then(response => {
          return response.json()
        }).then(result => {
          console.log(result)

          let div = document.querySelector(".reveal-div")
          let paragraph = document.createElement("p")
          paragraph.innerHTML = (`Card holder: ${result["json"].card_holder}, <br> card exp:${result["json"].card_exp} <br> card number: ${result["json"].card_number},<br> CVC: ${result["json"].account_number}`)
          div.appendChild(paragraph)
        })

    
    .catch(error => console.log('error', error));
})