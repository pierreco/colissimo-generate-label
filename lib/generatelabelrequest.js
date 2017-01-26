'use strict'

var soap          = require('soap');
var parseString   = require('xml2js').parseString;


var GenerateLabel = function (options) {
  if(!options.contractNumber){
    throw new Error('contractNumber value must be defined!'); 
  }
  if(!options.password){
     throw new Error('password value must be defined!'); 
  }
  this.contractNumber = options.contractNumber;
  this.password = options.password;

};

GenerateLabel.prototype.generateReturnRequest = function(data, callback){

  if(typeof data === 'object'){
    var ReturnRequestElement =   {
      generateLabelRequest : {
        attributes: {
          xmlns: ''
        },
        contractNumber : this.contractNumber,
        password: this.password,
        outputFormat: {
          x : 0,
          y: 0,
          outputPrintingType: 'PDF_A4_300dpi',
          returnType: ''
        },
        letter: {
          service: {
            productCode : 'CORE',
            depositDate: data.returnDate,
            mailBoxPicking: 0,
            transportationAmount: 0,
            totalAmount: 0,
            orderNumber: data.orderNumber,
            commercialName: '',
            returnTypeChoice: 2
          },
          parcel: {
            insuranceValue: 0,
            weight: 1,
            nonMachinable: 0,
            returnReceipt: 0
          },
          customsDeclarations :{
          },
          sender:{
            senderParcelRef : data.returnNumber,
            address: {
              lastName : data.sender.lastName,
              firstName : data.sender.firstName,
              line1: data.sender.adresse1,
              line2: data.sender.adresse1,
              countryCode: data.sender.countryCode,
              city: data.sender.city,
              zipCode: data.sender.zipCode,
              mobileNumber: data.sender.mobileNumber,
              email: data.sender.email,
              language: data.sender.language
            },
          },
          addressee:{
            address:{
              companyName: data.receiver.companyName,
              lastName : data.receiver.lastName,
              firstName : data.receiver.firstName,
              line1: data.receiver.adresse1,
              line2: data.receiver.adresse1,
              countryCode: data.receiver.countryCode,
              city: data.receiver.city,
              zipCode: data.receiver.zipCode,
              mobileNumber: data.receiver.mobileNumber,
              email: data.receiver.email,
              language: data.receiver.language
            }
          }
        }
      }
    };


    try{
      soap.createClient('https://ws.colissimo.fr/sls-ws/SlsServiceWS?wsdl', function(err, client){
        if(err){
          return callback(new Error(err), null);
        }

        client.addBodyAttribute({ 'xmlns': 'http://sls.ws.coliposte.fr' });
        client.generateLabel(ReturnRequestElement, function(err, result, body) {
          if(err){
            return callback(new Error(err), null);
          }

          parseString(body, function(err, result){
            var requestResult = result['soap:Envelope']['soap:Body'][0]['ns2:generateLabelResponse'][0].return[0];
            var pdf_url = '';
            if(requestResult.messages[0].id == 0){
              pdf_url = requestResult.labelResponse[0].pdfUrl[0];      
              return callback(null, pdf_url);
            }
            else{
              return callback(new Error(requestResult.messages[0].messageContent), null);
            }
          });
        });
      });
    }
    catch(err){
      return callback(new Error(err), null);
    }
  }
  else{
    return callback(new Error('Wrong param data'), null);
  }
  
}

module.exports = function (options) {
  return new GenerateLabel(options);
};
