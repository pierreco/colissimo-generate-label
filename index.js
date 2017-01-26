'use strict'

//module.exports = require('./lib/generatelabelrequest');
var moment = require('moment');
var colgl  = require('./lib/generatelabelrequest')({ contractNumber: '834307', password: 'PLFLEX0117' });

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
    companyName: 'Lexce',
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
}


colgl.generateReturnRequest(data, function(err, data){
  if(err){
    console.log('voiccc',err);
  }else{
    console.log('success',data);
  }
});
