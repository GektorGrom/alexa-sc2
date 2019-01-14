import { addDays, format } from 'date-fns';
import { format as formatTZ, utcToZonedTime } from 'date-fns-tz';
import getEventsByRange from '../../libs/AWS/getEventsByRange';

const nowEpoch = new Date().getTime();

const handler = async (event, context, callback) => {
  const tz = 'America/New_York';
  const starOfDay = new Date().getTime();
  const events = await getEventsByRange(
    starOfDay,
    format(addDays(starOfDay, 1), 'T'),
    '#eventTime, stage, title, Liquipedia, eventId',
  );
  const responseBody = events.map(
    ({
      stage, time, title, Liquipedia, eventId,
    }) => ({
      uid: eventId,
      updateDate: format(time, "yyyy-MM-dd'T'HH:mm:ss'.0Z'"),
      titleText: title,
      mainText: `${title} - ${stage} at ${formatTZ(
        utcToZonedTime(time, tz),
        'hh:mm a',
        { timeZone: tz },
      )}`,
      redirectionUrl: Liquipedia,
    }),
  );
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body:
      responseBody.length > 0
        ? JSON.stringify(responseBody)
        : JSON.stringify({
          uid: nowEpoch,
          updateDate: format(nowEpoch, "yyyy-MM-dd'T'HH:mm:ss'.0Z'"),
          titleText: 'No Events',
          mainText: 'No Starcraft 2 events for today',
          redirectionUrl: 'https://www.teamliquid.net/calendar',
        }),
  };
  callback(null, response);
};
module.exports.flashBriefing = handler;
