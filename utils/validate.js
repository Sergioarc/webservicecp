/**
 * Author: Sergio A.
 * Util for validate fields
 */

const indicative = require('indicative')

// Rules for field CP
const rulesCP = {
  cp: 'required|min:5|max:5|number'
};

// Messages of error for field CP
const messageCP = {
  'cp.required': 'Por favor ingrese el código postal',
  'cp.number': 'Por favor ingrese el código postal en forma numerica Ej. 06700',
  'cp.min': 'El código debe de tener como mínimo 5 caracteres Ej. 06700',
  'cp.max': 'El código debe de tener como máximo 5 caracteres Ej. 06700',
};

// Rules for fields to save information
const rulesSave = {
  cp: 'required|min:5|max:5|number',
  estado: 'required',
  delegacion: 'required',
  colonia: 'required',
}

// Messages or errors to save information
const messageSave = {
  'cp.required': 'Por favor ingrese el código potal',
  'cp.number': 'Por favor ingrese el código postal en forma numerica Ej. 06700',
  'delegacion.required': 'Por favor ingrese la delegación',
  'estado.required': 'Por favor ingrese el estado',
  'colonia.required': 'Por favor ingrese la colonia',
  'cp.min': 'El código debe de tener como mínimo 5 caracteres Ej. 06700',
  'cp.max': 'El código debe de tener como máximo 5 caracteres Ej. 06700',
};

// Function to validate field CP
exports.validateCP = async function(data){
  return indicative.validate(data, rulesCP, messageCP)
  .then(resp => {
    return resp;
  })
  .catch(err => {
    return err;
  })
};

// Function to validate fields on save
exports.validateSave = async function(data){
  return indicative.validate(data, rulesSave, messageSave)
  .then(resp => {
    return resp;
  })
  .catch(err => {
    return err;
  })
};