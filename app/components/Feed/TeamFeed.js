import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { teamEventCategoryContactAdded, teamEventCategoryContactUpdated,
teamEventCategoryContactFollowUpAdded } from 'config/constants'
import { humanizedTime, ISOStringToShortDate } from 'helpers/dates'
import { date, feed, hyperlink, text} from './styles.css'

export default function TeamFeed ({item}) {
  return (
    <div className={`ms-Grid-row ${feed}`}>
      <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
        { item.metadata.eventCategoryName === teamEventCategoryContactAdded
          ? <div className={text}>
              {item.metadata.creatorName} added contact
              <Link to={`/view-contact/${item.metadata.newContactId}`}>
                <span className={hyperlink}> {item.metadata.newContactFullName}</span>
                { item.metadata.newContactCompany
                  ? <span> from {item.metadata.newContactCompany}</span>
                  : null
                }
              </Link>
            </div>

          : <div>
              { item.metadata.eventCategoryName === teamEventCategoryContactUpdated
                ? <div className={text}>
                    {item.metadata.creatorName} updated contact
                    <Link to={`/view-contact/${item.metadata.contactId}`}>
                      <span className={hyperlink}> {item.metadata.contactFullName}</span>
                      { item.metadata.contactCompany
                        ? <span> from {item.metadata.contactCompany}</span>
                        : null
                      }
                    </Link>
                  </div>

                : <div>
                    { item.metadata.eventCategoryName === teamEventCategoryContactFollowUpAdded
                      ? <div className={text}>
                          {item.metadata.creatorName} is following up with
                          <Link to={`/view-contact/${item.metadata.contactId}`}>
                            <span className={hyperlink}> {item.metadata.contactFullName} </span>
                            { item.metadata.contactCompany
                              ? <span>from {item.metadata.contactCompany} </span>
                              : null
                            }
                            on {ISOStringToShortDate(item.metadata.followUpDate)}
                          </Link>
                        </div>

                      : null
                    }
                  </div>

              }
            </div>
        }
        <div className={date}>{ humanizedTime(item.createdAt) }</div>
      </div>
    </div>
  )
}
