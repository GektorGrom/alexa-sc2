import Speech from 'ssml-builder';
import specifyUnit from '../libs/Ask/specifyUnit';
import getDynamoItem from '../libs/AWS/getDynamoItem';

const GeneralUseIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'general_use'
    );
  },
  async handle(handlerInput) {
    console.log(
      'UnitUseIntentHandler',
      JSON.stringify(handlerInput.requestEnvelope),
    );
    const {
      resolutions,
    } = handlerInput.requestEnvelope.request.intent.slots.Unit;
    if (
      resolutions.resolutionsPerAuthority[0].status.code
      === 'ER_SUCCESS_NO_MATCH'
    ) {
      return specifyUnit(handlerInput);
    }
    const unit = resolutions.resolutionsPerAuthority[0].values?.[0].value.id;
    let responseSpeech = '';
    const { competitiveUsage } = await getDynamoItem(
      'SC2_Units',
      unit,
      'competitiveUsage',
    );
    if (!competitiveUsage || !competitiveUsage.trim()) {
      const { blizzardGeneralUse } = await getDynamoItem(
        'SC2_Units',
        unit,
        'blizzardGeneralUse',
      );
      const speech = new Speech();
      speech
        .say(
          `Here is useful strategies for ${
            handlerInput.requestEnvelope.request.intent.slots.Unit.value
          }`,
        )
        .pause('500ms');
      if (blizzardGeneralUse) {
        blizzardGeneralUse.values.forEach((el) => {
          speech.say(el).pause('500ms');
        });
      }
      responseSpeech = speech.ssml(true);
    } else {
      responseSpeech = competitiveUsage;
    }
    return handlerInput.responseBuilder.speak(responseSpeech).getResponse();
  },
};

export default GeneralUseIntentHandler;
