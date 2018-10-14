import Speech from 'ssml-builder';

import specifyRace from '../libs/Ask/specifyRace';
import specifyUnit from '../libs/Ask/specifyUnit';
import getDynamoItem from '../libs/AWS/getDynamoItem';
import { capitalizeFirstLetter } from '../libs/helpers/utils';

const ConterVsIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'counter_vs'
    );
  },
  async handle(handlerInput) {
    console.log(
      'conterVsIntentHandler',
      JSON.stringify(handlerInput.requestEnvelope),
    );
    const { Unit, Race } = handlerInput.requestEnvelope.request.intent.slots;
    if (
      Unit.resolutions.resolutionsPerAuthority[0].status.code
      === 'ER_SUCCESS_NO_MATCH'
    ) {
      return specifyUnit(handlerInput);
    }
    if (
      !Race.resolutions
      || Race.resolutions.resolutionsPerAuthority[0].status.code
        === 'ER_SUCCESS_NO_MATCH'
    ) {
      return specifyRace(handlerInput, true);
    }
    const unit = Unit.resolutions.resolutionsPerAuthority[0].values?.[0].value.id;
    const race = capitalizeFirstLetter(
      Race.resolutions.resolutionsPerAuthority[0].values?.[0].value.id,
    );
    const unitObject = await getDynamoItem('SC2_Units', unit, `counter${race}`);
    const arrayOfMesures = unitObject.counterTerran?.values
      || unitObject.counterProtoss?.values
      || unitObject.counterZerg?.values;
    let speechText = `${unit} is not dangerous against ${race}`;
    if (Array.isArray(arrayOfMesures) && arrayOfMesures.length > 0) {
      const speech = new Speech();
      speech.say(`Here is useful strategies against ${Unit.value}`).pause('500ms');
      arrayOfMesures.forEach((el) => {
        speech.say(el).pause('500ms');
      });
      speechText = speech.ssml(true);
    }
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

export default ConterVsIntentHandler;
