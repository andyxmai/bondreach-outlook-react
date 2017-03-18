import React, { PropTypes } from 'react'
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { blockBtn, messageBar, spacedRow } from 'sharedStyles/styles.css'

const DayPickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  shortDays: [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
  ],

  goToToday: 'Go to today',

  isRequiredErrorMessage: 'Field is required.',

  invalidInputErrorMessage: 'Invalid date format.'
}

export default function AddReminder (props) {
  return (
    <div className="ms-Grid">
      { props.error !== ''
        ? <MessageBar
          messageBarType={ MessageBarType.error }>
          {props.error}</MessageBar>
        : null
      }
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <div className={messageBar}><MessageBar
            messageBarType={ MessageBarType.success }
            isMultiline={ false }>
            <b>{'Contact Added!'}</b>
          </MessageBar></div>
        </div>
      </div>
      <div className={`ms-Grid-row ${spacedRow}`}>
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <div className="ms-fontSize-l">{`Add reminder for ${props.contactObj.firstName}`}</div>
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <DatePicker label='Next follow-up'
            firstDayOfWeek={ DayOfWeek.Sunday }
            strings={ DayPickerStrings }
            placeholder='Select a date...'
            value={props.beginDateObj}
            onSelectDate={props.onSelectBeginDate}
          />
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <Dropdown
              label='Frequency'
              options={
                [
                  { key: 'once', text: 'Just once' },
                  { key: 'weekly', text: 'Weekly' },
                  { key: 'monthly', text: 'Monthly' },
                  { key: 'quarterly', text: 'Quarterly' },
                  { key: 'annually', text: 'Annually' },
                ]
              }
              onChanged={props.onFrequencyChange}
              value={props.frequency}
            />
        </div>
      </div>

      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <PrimaryButton
            data-automation-id='add-reminders'
            onClick={props.onAddToCalendar}
            className={blockBtn}
          >{'Add to my calendar'}</PrimaryButton>
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
          <DefaultButton
            data-automation-id='skip-reminders'
            onClick={props.goToContact}
            className={blockBtn}
          >{'Skip reminder'}</DefaultButton>
        </div>
      </div>
    </div>
  )
}
