import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/user'
import { Authenticate } from 'components'
import apiClient from 'common/ApiClient'

const AuthenticateContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  handleAuth () {
    // const email = 'outlook_690DC45C87308BCA@outlook.com '
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImVuaDlCSnJWUFU1aWpWMXFqWmpWLWZMMmJjbyJ9.eyJhcHBjdHhzZW5kZXIiOiIwMDAwMDAwMi0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDBAODRkZjllN2YtZTlmNi00MGFmLWI0MzUtYWFhYWFhYWFhYWFhIiwiaXNicm93c2VyaG9zdGVkYXBwIjoiVHJ1ZSIsImFwcGN0eCI6IntcIm1zZXhjaHVpZFwiOlwiY2RkZjgzZWQtODA2Yy00MzI2LTlmOWMtYTViZTc3NTI0M2RjXCIsXCJ2ZXJzaW9uXCI6XCJFeElkVG9rLlYxXCIsXCJhbXVybFwiOlwiaHR0cHM6Ly9vdXRsb29rLm9mZmljZTM2NS5jb206NDQzL2F1dG9kaXNjb3Zlci9tZXRhZGF0YS9qc29uLzFcIn0iLCJpc3MiOiIwMDAwMDAwMi0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDBAODRkZjllN2YtZTlmNi00MGFmLWI0MzUtYWFhYWFhYWFhYWFhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMC8iLCJleHAiOjE0ODkyOTYxMjgsIm5iZiI6MTQ4OTI2NzMyOH0.YF_vxBPi9wJ-Pt-lGOaUJilpGwaNct0o9GJD-25gF9n8qajUQU4JwI_mT4CwTgLNSiKTA2fpJoAM88RcJWPBTVgs_xIfH7uum0l9uCMEr5ErjgliiXsQWnU9UIjM26rhe0suDZObTXCFVsRyG6qTB986zYcFoz5_xnf_4w60IWPV4uXUQYKtI4bRh0F0cwChesFIhchNPZK1UGCfkh35EnJkBIHaj8_bXgMmMqYuxn0_HzJFkd4M7_Z8Z0qMJvJCtq_MYBiNk8QjNtpBQXtYkKIIJSkprAeg56eKvIYAXRhRJl9Q-8RErjgTa66W9ps6rXBIF_bPEPD7BLrbj35u7Q'
    // this.props.fetchAndHandleAuthedUser(token, email)
    Office.context.mailbox.getUserIdentityTokenAsync((asyncResult) => {
      const email = Office.context.mailbox.userProfile.emailAddress
      const token = asyncResult.value
      this.props.fetchAndHandleAuthedUser(token, email)
    })
  },

  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}
      />
    )
  }
})

function mapStateToProps ({user}) {
  return {
    isFetching: user.isFetching,
    error: user.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticateContainer)
