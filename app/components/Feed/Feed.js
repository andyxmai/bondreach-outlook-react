import React, { PropTypes } from 'react'
import { List } from 'office-ui-fabric-react/lib/List'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner'
import { ISOStringToDate, humanizedTime } from 'helpers/dates'
import { company, date, feed, section, articleName } from './styles.css'
import { centerPage } from 'sharedStyles/styles.css'

function NewsFeed ({item, onArticleClicked}) {
  return (
    <div className={`ms-Grid-row ${feed}`}>
      <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
        <div className={company}>{ item.company }</div>
        <div className={articleName} id={item.link} onClick={onArticleClicked}>{ item.name }</div>
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
                  <div className="ms-fontWeight-semibold ms-fontSize-l">{ 'News feed' }</div>
                </div>
              </div>
            </div>
            <div>
              <List
                items={props.newsFeed}
                onRenderCell={ (item, index) => (
                  <NewsFeed
                    key={index}
                    item={item}
                    onArticleClicked={props.onArticleClicked}
                  />
                )}
              />
            </div>
          </div>
      }
    </div>
  )
}
