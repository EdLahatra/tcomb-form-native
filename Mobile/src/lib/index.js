import TextBox from '../components/textbox/factory'

const t = require('tcomb-form-native');

const Nil = t.Nil;

const toNull = value => (t.String.is(value) && value.trim() === '') || Nil.is(value) ? null : value;

/**
 * Function qui permet de parser un nombre
 * @param value
 * @returns {number}
 */
const parseNumber = (value) => {
  if (value && value.replace) {
    value = value.replace(',', '.');
  }
  const n = Math.round(parseFloat(value) * 100) / 100;
  const isNumeric = ((value - n) + 1) >= 0;
  return isNumeric ? n : toNull(value);
};

/**
 * Tranformer 'tcomb-form-native' permet de mieux gérer les float
 * @type {{format: fn, parse: fn}}
 */
const FloatTransformer = {
  format: (value) => {
    if (value && value.replace) {
      value = value.replace(',', '.');
    }
    if (value == null || value === '') {
      return undefined;
    }

    if (Nil.is(value) || isNaN(value)) {
      return '';
    }
    const tmp = Math.round(parseFloat(value) * 100) / 100;
    if (tmp !== value) {
      return String(tmp);
    }
    return String(value);
  },
  parse: parseNumber
};

export default {
  _toFormFieldType(propertyValue, propertyConfig) {
    const propertyType = typeof propertyValue === 'string' ? propertyValue : propertyValue.type;

    if (propertyConfig) {
      switch (propertyType) {
        case 'string': return t.String;
        default: return t.Object;
      }
    }
  },

  _toFieldType(propertyValue, propertyConfig) {
    return this._toFormFieldType(propertyValue, propertyConfig);
  },

  /**
   * Méthode qui va retourne la bonne configuration du formulaire à partir du schema
   * @param schema
   * @param formType
   * @returns {Object}
   * @private
   */
  _getForm(schema, formType) {
    if (schema._form) {
      const _form = schema._form[formType];
      return _form || schema._form;
    }
    throw new Error('No form configured in Schema');
  },

  /**
   * Méthode qui construit un formulaire compatible 'tcomb-form-native' à partir d'un schema.
   * @param schema
   * @param formType
   * @returns {*}
   */
  toForm({ schema, formType }) {
    const _form = this._getForm(schema, formType);

    const properties = schema.properties;
    const primaryKey = schema.primaryKey;
    const form = {};

    for (const property in properties) {
      if (property === primaryKey) {
        form[property] = t.maybe(t.String);
      } else {
        const propertyConfig = _form[property];
        if (propertyConfig) {
          form[property] = this._toFieldType(properties[property], propertyConfig);
        }
      }
    }

    return t.struct(form);
  },

  /**
   * Méthodes qui construit la liste des options d'un formulaire 'tcomb-form-native'
   * en fonction d'un schema.
   * @param config
   * @param onSubmitEditing
   * @param onFocus
   * @param onCallApi
   * @returns {{}}
   */
  toFieldsOptions(config, { onSubmitEditing, onFocus, onCallApi }) {
    const schema = config.schema;
    const properties = schema.properties;
    const primaryKey = schema.primaryKey;
    const _form = this._getForm(schema, config.formType);

    const propertiesKeys = Object.keys(properties);

    const fieldsOptions = {};

    if (primaryKey === property) {
      fieldsOptions[property] = { hidden: true };
    } else {
      switch (propertyValue) {
        case 'string': fieldsOptions[property].factory = TextBox;
        // no default
      }
    }

    return fieldsOptions;
  }

}