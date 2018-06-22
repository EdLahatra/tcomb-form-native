import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  ScrollView,
  findNodeHandle,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';

import _ from 'underscore';

import utils from '../lib/utils';

const t = require('tcomb-form-native');

const Form = t.form.Form;

let currentForm;

/**
 * Composant permetant d'automatiser la création de formulaire basée sur
 * les modèles de données realm.
 * @module app/components/RealmForm.js
 * @override React.Component
 */
export default class RealmForm extends Component {
  _initForm(value) {
    this.setState({
      value,
      options: {
        auto: 'placeholders',
        i18n: {
          optional: '',
          required: '',
          add: 'Add', // add button
          remove: '✘', // remove button
          up: '↑', // move up button
          down: '↓' // move down button
        },
        // stylesheet: FormStyle,
        fields: utils.toFieldsOptions(this.getConfig(), this.getActions()),
      },
      form: utils.toForm(this.getConfig())
    });
  }

  /**
   * Initialisation de l'état du composant.
   * Initialisation de l'ensemble des services utiles pour le chargement des données.
   */
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      options: {
        auto: 'placeholders',
        i18n: {
          optional: '',
          required: '',
          add: 'Add', // add button
          remove: '✘', // remove button
          up: '↑', // move up button
          down: '↓' // move down button
        },
        // stylesheet: FormStyle,
        fields: null
      },
      form: null,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._initForm(this.getStateValue());
      currentForm = this.refs.form;
      this._getInput().refs.input.focus && this._getInput().refs.input.focus();
    });
  }

  componentWillReceiveProps(props) {
    this._initForm(this.state.value);
  }

  getConfig() {
  }

  /**
   * Méthode qui retourne la valeur de l'état du formulaire
   * @returns {Object}
   */
  getStateValue() {
  }

  _getInput(index = 0) {
    if (this.state && this.state.options.fields) {
      const fields = Object.keys(this.state.options.fields);
      const fieldId = fields[index];
      if (fieldId) {
        const input = this.refs.form.getComponent(fieldId);
        if (input && input.refs) {
          if (input.refs.input && input.refs.input.props.editable !== false) {
            return input;
          } else if (input.refs.datepicker) {
            return input;
          }
        }
        return this._getInput(index + 1);
      }
    }
    return null;
  }

  getActions() {
    return {
      onSubmitEditing: this._focusNextInput.bind(this),
      onFocus: this._scrollToInput.bind(this),
      onCallApi: this._onCallApi.bind(this)
    };
  }

  _onCallApi(inputId, apiId, param) {
  }

  _focusNextInput(inputId) {
    const fields = Object.keys(this.state.options.fields);
    const currentInput = fields.indexOf(inputId);
    if (currentInput !== -1 && fields.length >= currentInput + 1) {
      const nextInpuId = fields[currentInput + 1];
      if (nextInpuId) {
        if (this.state.options.fields[nextInpuId].editable === false) {
          return this._focusNextInput(nextInpuId);
        }
        const nextInput = this.refs.form.getComponent(nextInpuId);
        if (nextInput) {
          if (nextInput.refs.input) {
            nextInput.refs.input.focus();
          } else if (nextInput.refs.datepicker) {
            nextInput.refs.datepicker.onPressDate();
          }
        }
      }
    }
  }

  _scrollToInput(inputId) {
    if (!PlatformHelper.isAndroid()) {
      setTimeout(() => {
        if (this.refs.scrollView) {
          const scrollResponder = this.refs.scrollView.getScrollResponder();
          let input = this.refs.form.getComponent(inputId);
          if (!input) {
            input = this._getInput();
          }
          const nodle = findNodeHandle(input);
          scrollResponder.scrollResponderScrollNativeHandleToKeyboard(nodle, 110, true);
        }
      }, 50);
    }
  }

  componentDidUpdate() {
    currentForm = this.refs.form;
  }

  onChange = value => this.setState({ value });

  static _save(props) {
    const validate = currentForm.validate();

    if (validate.errors.length > 0) {
      console.log(validate.errors); // eslint-disable-line
    } else {
      let values = {};
      try {
        values = _.extend(values, currentForm.getValue());
        this.save(props, values);
      } catch (e) {
        console.log('--Erreur de saisie', values); // eslint-disable-line
        Alert.alert('Erreur de saisie', e.message,
          [
            { text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }, // eslint-disable-line
          ]
        );
      }
    }
  }

  static _delete(props) {
    try {
      this.delete(currentForm.getValue(), props);
    } catch (e) {
      console.log('error', e)
    }
  }

  static getTitle = () => 'Form...';

  static shouldDelete = () => true;

  static hasMenu = () => false;

  /**
   * Méthode éxécuté lors du rendu du composant.
   *
   * @function render
   * @return react~Component
   */
  render() {
    let result = null;
    if (this.state.form && this.state.options) {
      result = (<View>
        <ScrollView ref="scrollView" scrollEnabled={true} showsVerticalScrollIndicator={true}>
          <Form
            ref="form"
            type={this.state.form}
            options={this.state.options}
            value={this.state.value}
            onChange={this.onChange}
            style={{ backgroundColor: 'red' }}
          />
        </ScrollView>
      </View>);
    }
    return result;
  }
}
