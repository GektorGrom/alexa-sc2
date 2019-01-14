import { format, addDays } from 'date-fns';
import { format as formatTZ, zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import axios from 'axios';
import Speech from 'ssml-builder';

import specifyDate from '../libs/Ask/specifyDate';
import getEventsByRange from '../libs/AWS/getEventsByRange';

const EventSearchIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'search_event'
    );
  },
  async handle(handlerInput) {
    console.log(
      'EventSearchIntentHandler',
      JSON.stringify(handlerInput.requestEnvelope),
    );
    const {
      device: { deviceId },
      apiAccessToken,
      apiEndpoint,
    } = handlerInput.requestEnvelope.context.System;
    const tz = await axios({
      method: 'get',
      baseURL: apiEndpoint,
      url: `/v2/devices/${deviceId}/settings/System.timeZone`,
      headers: {
        Authorization: `Bearer ${apiAccessToken}`,
      },
    }).then(({ data }) => data);
    const { value } = handlerInput.requestEnvelope.request.intent.slots.DATE;
    if (!value) {
      return specifyDate(handlerInput);
    }
    const starOfDay = zonedTimeToUtc(value, tz);
    const events = await getEventsByRange(
      format(starOfDay, 'T'),
      format(addDays(starOfDay, 1), 'T'),
    );
    const speech = new Speech();
    if (events.length > 0) {
      speech.say('You can watch').pauseByStrength('strong');
      events.forEach(({ title, stage, time }) => {
        speech
          .emphasis('moderate', title)
          .pause('150ms')
          .say(stage)
          .pauseByStrength('weak')
          .say(`at ${formatTZ(utcToZonedTime(time, tz), 'hh:mm a', { timeZone: tz })}`)
          .pauseByStrength('x-strong');
      });
    } else {
      speech.say('No events for this day');
    }
    const responseSpeech = speech.ssml(true);
    return handlerInput.responseBuilder.speak(responseSpeech).getResponse();
  },
};

export default EventSearchIntentHandler;
