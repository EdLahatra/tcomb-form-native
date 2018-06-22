const environment = {

  DistanceMatrix: {
    url: 'https://maps.googleapis.com/maps/api/distancematrix/json?',
    key: 'AIzaSyDL4X0q_crHnm2_8ECdOJVyrwdGCPUpFTw'
  },

  Places: {
    // key: 'AIzaSyDL4X0q_crHnm2_8ECdOJVyrwdGCPUpFTw'
    key: 'AIzaSyD6eIzwfy2fSLPKhEBQko8fnmecjlPYuS0',
    newKey: 'AIzaSyDPlgW3AxwsuqkrgjqPS67W9UHIjLGnW5g'
  },

  Analytics: {
    trackerId: 'UA-1221917-9'
  },

  GoogleSignin: {
    iosClientId: '307360444785-tstscmkaktt7a408jk0lbv2csjh3pgf8.apps.googleusercontent.com',
    // webClientId: '521942746637-oip7hn70v4jcre370lhiejprlfn4al14.apps.googleusercontent.com'
    webClientId: '591258947190-hd8ng5dj6rgiot4uard06gh6r1nd9a7c.apps.googleusercontent.com'
  },

  Autonome: {
    oauth: {},
    api: [
      {
        url: 'https://www.www.compta.com.com/API/rest/notesDeFrais/v1',
        pathUnsecured: ['baremesKilometriques']
      }, {
        url: 'https://www.www.compta.com.com/Gestemps/rest/notesDeFrais/v1',
        pathUnsecured: ['envoiNoteDeFrais']
      }
    ]
  },

  ComptaCom: {
    oauth: {
      url: 'https://www.compta.com/API/rest/token',
      grant_type: 'password',
      client_id: 'oauth2clientid',
      client_secret: 'oauth2clientsecret'
    },
    api: [
      {
        url: 'https://www.compta.com/API/rest/notesDeFrais/v1',
        pathUnsecured: ['baremesKilometriques']
      }
    ]
  },

  Gescab: {
    oauth: {
      url: 'https://www.gescab.fr/Gestemps/rest/token',
      grant_type: 'password',
      client_id: 'oauth2clientid',
      client_secret: 'oauth2clientsecret'
    },

    api: [
      {
        url: 'https://www.www.compta.com.com/Gestemps/rest/notesDeFrais/v1',
        pathUnsecured: ['baremesKilometriques']
      }
    ]
  },

  config: {
    urlSite: 'http://www.compta.com/',
    urlCGU: 'https://www.compta.com/ComptaWeb/cg/cgs/cgs.html'
  },

  cameraConfig: {
    path: 'ComptaCom',
    maxWidth: 720,
    maxHeight: 1280,
    quality: 0.9
  }

};

export default environment;
