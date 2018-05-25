export default {
  Schema = {
    name: 'FichePersonnelle',
    primaryKey: 'id',
    properties: {
      id: { type: 'string' },
      nom: { type: 'string' },
      prenom: { type: 'string', optional: true },
    },
    _form: {
      secure: {
        nom: {},
        prenom: { optional: true },
      },
      autonome: {
        nom: {},
        prenom: { optional: true },
      }
    }
  }
}
