import React, { PropTypes } from 'react'
import { ContactResult } from 'components'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { IconButton, ButtonType  } from 'office-ui-fabric-react/lib/Button'
import { List } from 'office-ui-fabric-react/lib/List'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { searchBtnColor, contactContainer, searchField } from './styles.css'
import { spacedRow } from 'sharedStyles/styles.css'

export default function Search (props) {
  return (
    <div className="ms-Grid">
      { props.error !== ''
        ? <MessageBar
          messageBarType={ MessageBarType.error }>
          {props.error}</MessageBar>
        : null
      }
      <div className={spacedRow} />
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
          <TextField placeholder="Search your contacts..."
            value={props.query}
            onChanged={props.onSearchQueryChanged}
            onKeyUp={props.onSearchClicked}
            className={searchField}
          />
        </div>
        <div className={`ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2 ${searchBtnColor}`}>
          <IconButton
            style={{color: 'white'}}
            icon='Search'
            title='Search'
            ariaLabel='Search'
            onClick={props.onSearchClicked}
            className={searchField}
            />
        </div>
      </div>

      <div className={spacedRow} />
      <div className={spacedRow} />

      { props.hasQueried
        ? <div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                <div className="ms-fontWeight-semibold ms-fontSize-l">{`Results (${props.results.length})`}</div>
              </div>
            </div>
            <div className={contactContainer}>
              <List
                items={props.results}
                onRenderCell={ (contact, index) => (
                  <ContactResult
                    key={contact.id}
                    contact={contact}/>
                )}
              />
            </div>
          </div>
        : null
      }
    </div>
  )
}
