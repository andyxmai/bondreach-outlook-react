function getSoapEnvelope (request) {
  // Wrap an Exchange Web Services request in a SOAP envelope.
  var result =

  '<?xml version="1.0" encoding="utf-8"?>' +
  '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
  '               xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
  '               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"' +
  '               xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types">' +
  '  <soap:Header>' +
  '  <t:RequestServerVersion Version="Exchange2013"/>' +
  '  </soap:Header>' +
  '  <soap:Body>' +

  request +

  '  </soap:Body>' +
  '</soap:Envelope>';

  return result;
}

function createAppointmentRequest (subject, start, end) {
  var result =
  '    <CreateItem xmlns="http://schemas.microsoft.com/exchange/services/2006/messages"' +
  '                xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types"' +
  '                SendMeetingInvitations="SendToAllAndSaveCopy" >' +
  '      <SavedItemFolderId>' +
  '        <t:DistinguishedFolderId Id="calendar"/>' +
  '      </SavedItemFolderId>' +
  '      <Items>' +
  '        <t:CalendarItem xmlns="http://schemas.microsoft.com/exchange/services/2006/types">' +
  '          <Subject>' + subject + '</Subject>' +
  '          <Body BodyType="Text">Added through BondReach</Body>' +
  '          <ReminderIsSet>true</ReminderIsSet>' +
  '          <ReminderMinutesBeforeStart>15</ReminderMinutesBeforeStart>' +
  '          <Start>' + start + '</Start>' +
  '          <End>' + end + '</End>' +
  '          <IsAllDayEvent>true</IsAllDayEvent>' +
  '          <LegacyFreeBusyStatus>Busy</LegacyFreeBusyStatus>' +
  '          <Location></Location>' +
  '          <RequiredAttendees>' +
  '            <Attendee>' +
  '              <Mailbox>' +
  '                <EmailAddress></EmailAddress>' +
  '              </Mailbox>' +
  '            </Attendee>' +
  '          </RequiredAttendees>' +
  '        </t:CalendarItem>' +
  '      </Items>' +
  '    </CreateItem>'

  return result
}

export function createAppointment (subject, start, end, callback) {
  const request = createAppointmentRequest(subject, start, end);
  const envelope = getSoapEnvelope(request);

  Office.context.mailbox.makeEwsRequestAsync(envelope, callback);
}
