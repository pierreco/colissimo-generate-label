colissimo-label-generate
==============

NodeJS module for generate return label PDF with colissimo webservices.

If success the webservice returns a url 

Documentation: https://www.coliposte.fr/pro/docs/docutheque/divers/socolissimo/integrationwsshipping.pdf

## Installation

`npm install colissimo-generate-label`

## How it works

You can use `contractNumber/password` what you usually use to connect to https://www.colissimo.entreprise.laposte.fr/

## Example

```javascript
var moment = require('moment');
var colgl  = require('colissimo-label-generate')({ contractNumber: 'YOUR_CONTRACT_NUMBER', password: 'YOUR_PASSWORD' });


var data = {
  orderNumber: 'LEX0010001',
  returnNumber: 'RET-123331',
  returnDate: new moment().format('YYYY-MM-DD'),
  sender: {
    lastName : 'Doe',
    firstName : 'John',
    adresse1: '1 rue de la liberté',
    adresse2: 'ss',
    countryCode: 'FR',
    city: 'Paris',
    zipCode: '75001',
    mobileNumber: '0160601212',
    email: 'john.doe@gmail.com',
  },
  receiver: {
    companyName: 'Company Name',
    lastName : 'Receiver LastName',
    firstName : 'Receiver FirstName',
    adresse1: 'Receiver addrese',
    adresse2: 'ss',
    countryCode: 'FR',
    city: 'Paris',
    zipCode: '75001',
    mobileNumber: '0160601212',
    email: 'receiver@gmail.com',
    language: 'FR'
  }
};

colgl.generateReturnRequest(data, function(err, data){
  if(err){
    console.log('err',err);
  }else{
    console.log('success url',data);
  }
});
```
