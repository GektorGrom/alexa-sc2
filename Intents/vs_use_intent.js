import specifyRace from '../libs/Ask/specifyRace';
import specifyUnit from '../libs/Ask/specifyUnit';
import getDynamoItem from '../libs/AWS/getDynamoItem';
import { capitalizeFirstLetter } from '../libs/helpers/utils';

const VsUseIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'vs_use'
    );
  },
  async handle(handlerInput) {
    console.log(
      'vsUseIntentHandler',
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
      Race.resolutions.resolutionsPerAuthority[0].status.code
      === 'ER_SUCCESS_NO_MATCH'
    ) {
      return specifyRace(handlerInput);
    }
    const unit = Unit.resolutions.resolutionsPerAuthority[0].values?.[0].value.id;
    const race = capitalizeFirstLetter(
      Race.resolutions.resolutionsPerAuthority[0].values?.[0].value.id,
    );
    const unitObject = await getDynamoItem('SC2_Units', unit, `vs${race}`);
    const speechText = unitObject.vsTerran || unitObject.vsProtoss || unitObject.vsZerg || `${unit} does not have any useful strategy versus ${race}`;
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

export default VsUseIntentHandler;
