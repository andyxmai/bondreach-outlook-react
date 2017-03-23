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

function createAppointmentRequest (subject, body, start, end) {
  const result =
  '    <CreateItem xmlns="http://schemas.microsoft.com/exchange/services/2006/messages"' +
  '                xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types"' +
  '                SendMeetingInvitations="SendToAllAndSaveCopy" >' +
  '      <SavedItemFolderId>' +
  '        <t:DistinguishedFolderId Id="calendar"/>' +
  '      </SavedItemFolderId>' +
  '      <Items>' +
  '        <t:CalendarItem xmlns="http://schemas.microsoft.com/exchange/services/2006/types">' +
  '          <Subject>' + subject + '</Subject>' +
  '          <Body BodyType="Text">' + body + '</Body>' +
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

export function createAppointment (subject, body, start, end, callback) {
  const request = createAppointmentRequest(subject, body, start, end)
  const envelope = getSoapEnvelope(request)

  Office.context.mailbox.makeEwsRequestAsync(envelope, callback)
}

function createContactRequest (firstName, lastName, email, company, phone, notes) {
  const result =
  '    <CreateItem xmlns="http://schemas.microsoft.com/exchange/services/2006/messages" >' +
  '      <SavedItemFolderId>' +
  '        <t:DistinguishedFolderId Id="contacts"/>' +
  '      </SavedItemFolderId>' +
  '      <Items>' +
  '        <t:Contact>' +
  '          <t:FileAs>BondReach Contact</t:FileAs>' +
  '          <t:GivenName>' + firstName + '</t:GivenName>' +
  '          <t:CompanyName>' + company + '</t:CompanyName>' +
  '          <t:EmailAddresses>' +
  '            <t:Entry Key="EmailAddress2">' + email + '</t:Entry>' +
  '          </t:EmailAddresses>' +
  '          <t:PhysicalAddresses>' +
  '            <t:Entry Key="Business">' +
  '              <t:Street></t:Street>' +
  '              <t:City></t:City>' +
  '              <t:State></t:State>' +
  '              <t:CountryOrRegion></t:CountryOrRegion>' +
  '            </t:Entry>' +
  '          </t:PhysicalAddresses>' +
  '          <t:PhoneNumbers>' +
  '            <t:Entry Key="BusinessPhone">' + phone + '</t:Entry>' +
  '          </t:PhoneNumbers>' +
  '          <t:JobTitle></t:JobTitle>' +
  '          <t:Surname>' + lastName + '</t:Surname>' +
  '          <t:Notes>' + notes + '</t:Notes>' +
  '        </t:Contact>' +
  '      </Items>' +
  '    </CreateItem>'

  return result
}

export function createContact (firstName, lastName, email, company, phone, notes, callback) {
  const request = createContactRequest(firstName, lastName, email, company, phone, notes)
  const envelope = getSoapEnvelope(request)

  Office.context.mailbox.makeEwsRequestAsync(envelope, callback)
}


function editContactNotesRequest (contactId, notes) {
}
