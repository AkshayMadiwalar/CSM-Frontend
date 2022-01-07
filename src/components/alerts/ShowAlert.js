import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'

const ShowAlert = props => props.alert != null && props.alert.length > 0 && (
    <Alert style={{ textAlign:"center"}}variant={props.alert[0].alertType} >
        <span class="font-weight-bold">{props.alert[0].message}</span>
    </Alert>
)

ShowAlert.propTypes = {

}

const mapStateToProps = state => ({
    alert: state.alert
})
export default connect(mapStateToProps, {})(ShowAlert)
