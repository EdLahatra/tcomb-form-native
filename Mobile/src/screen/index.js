import _ from 'underscore';
import FichePersonnelle from '../schemas';
import Form from '../components/form';

/**
 * Page du formulaire de fiche personnelle
 *
 * @module app/routes/FichePersonnelleForm.js
 * @override app/components/RealmForm
 */
export default class FichePersonnelleForm extends Form {
  /**
   * Initialisation de l'état du composant.
   * Initialisation de l'ensemble des services utiles pour le chargement des données.
   */
  constructor() {
    super();
  }

  getConfig() {
    return { schema: FichePersonnelle.schema, formType: 'autonome' };
  }

  getStateValue() {
    return { };
  }

  async componentDidMount() {
    super.componentDidMount();
  }

  componentWillMount() {
    
  }

  static hasMenu = () => true;

  static shouldDelete = () => false;

  static getTitle = () => 'Test Form';

  static save(props, formValues) {
    console.log('props, formValues', props, formValues)
  }
}
