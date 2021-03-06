import React, { PropTypes } from 'react'
import { TeamFeed } from 'components'
import { List } from 'office-ui-fabric-react/lib/List'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner'
import { ISOStringToDate, humanizedTime } from 'helpers/dates'
import { articleName, company, date, feed, link, section } from './styles.css'
import { centerPage } from 'sharedStyles/styles.css'

function NewsFeed ({item, onArticleClicked}) {
  return (
    <div className={`ms-Grid-row ${feed}`}>
      <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
        <div className={company}>{ item.company }</div>
        <div className={articleName}>
          <div>{ item.name }</div>
          <div className={link} id={item.id} onClick={onArticleClicked}>read more</div>
        </div>
        <div className={date}>{ humanizedTime(item.datePublished) }</div>
      </div>
    </div>
  )
}

export default function Feed (props) {
  return (
    <div>
      { props.isFetching
        ? <div className={centerPage}><Spinner type={ SpinnerSize.large } label='Loading...' /></div>
        : <div className="ms-Grid">
            { props.error !== ''
              ? <MessageBar
                messageBarType={ MessageBarType.error }>
                {props.error}</MessageBar>
              : null
            }
            <div className={section}>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                  <div className="ms-fontWeight-semibold ms-fontSize-l">{ 'Feed' }</div>
                </div>
              </div>
              <div>
                <Pivot>
                  <PivotItem linkText='Contact News'>
                    { props.newsFeed.length
                      ? <List
                          items={props.newsFeed}
                          onRenderCell={ (item, index) => (
                            <NewsFeed
                              key={index}
                              item={item}
                              onArticleClicked={props.onArticleClicked}
                            />
                          )}
                        />
                      : <div className={section}>
                          {'No contact news yet!'}
                        </div>
                    }
                  </PivotItem>
                  <PivotItem linkText='Team News'>
                    { props.teamFeed.length
                      ? <List
                          items={props.teamFeed}
                          onRenderCell={ (item, index) => (
                            <TeamFeed
                              key={index}
                              item={item}
                            />
                          )}
                        />
                      : <div className={section}>
                          {'No team news yet!'}
                        </div>
                    }
                  </PivotItem>
                </Pivot>
              </div>
            </div>
          </div>
      }
    </div>
  )
}
