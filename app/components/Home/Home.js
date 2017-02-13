import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import { container, title, numberList, paragraph } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <Panel>
        <p className={paragraph}>{'Hey there!'}</p>
        <p className={paragraph}>{'This is Andy Mai, the guy who built this prototype.'}</p>
        <p className={paragraph}>{'I started this project looking for pain points in the real estate space, and found that underwriting commercial properties is a frustrating process for the following reasons:'}</p>
        <ol className={numberList}>
          <li>{'Argus is a black box'}</li>
          <li>{'Lack of sensitivity analysis options'}</li>
          <li>{'Large initial cost to learn Argus or set up the complex Excel models'}</li>
          <li>{'Clunky softwares in general'}</li>
        </ol>
        <p className={paragraph}>{'This prototype doesn’t actually run any calculations—every number shown here is mock data, so please don’t vet them just yet. However, the prototype  does offer:'}</p>
        <ol className={numberList}>
          <li>{'Detailed calculation steps for each operating cashflow line item'}</li>
          <li>{'Sensitivity analysis to see how varying assumptions can affect cashflows'}</li>
          <li>{'An app designed in an intuitive, linear fashion from creating the property to getting final cashflows'}</li>
          <li>{'My best attempt for a good user experience'}</li>
        </ol>
        <p className={paragraph}>{'This prototype is still a work in progress, but I’d love to have your honest feedback. Does it solve your underwriting frustrations? Do you see yourself using it? How can it be improved? At the end of the day, this tool is built for you, and I take your opinions very seriously.'}</p>
        <p className={paragraph}>{'Start your test drive by clicking on the red “New Property” button on the top right. You don’t need to type anything for it to work, but feel free to input data to get a better feel of the product. Shoot me an email at andrew.x.mai@gmail.com or text me at (202) 468-0722 anytime to send me any feedback.'}</p>
        <br />
        <p>{'Thanks,'}</p>
        <p>{'Andy'}</p>
      </Panel>
    </div>
  )
}
