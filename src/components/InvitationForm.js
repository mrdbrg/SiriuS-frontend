import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Checkbox, Icon, Divider, Transition, List, Message, Header, Button } from 'semantic-ui-react';
import useFormFields from '../hooks/useFormFields'
import '../resources/InvitationForm.css';
import { ADD_INVITATION } from '../store/type';

const InvitationForm = props => {
  
  const dispatch = useDispatch()
  const keyHolder = useSelector(state => state.app.keyHolder)
  const [ toggleCheck, setToggleCheck ] = useState(false)
  const [ checkbox, setCheckbox ] = useState(false)
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ header, setHeader ] = useState("")
  const [ errorMsg, setErrorMsg ] = useState([])
  const [ sending, setSending ] = useState(false)
  const [ fields, handleFieldChange ] = useFormFields({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    customInvitation: ""
  })

  const runAlert = (header, error = []) => {
    setHeader(header)
    setErrorMsg(error)
    setAlertStatus(true)
    resetAlert()
  }

  const resetAlert = () => {
    setTimeout(() => {
      setAlertStatus(false)
    }, 5000)
  }

  const displayAlert = errors => {
    return errors.map(e => (
      <List.Item key={e.id}>{e}</List.Item>
    ))
  }

  const handleToggle = (e, { value }) => {
    setToggleCheck(!toggleCheck)
  }

  const handleInvitation = () => {
    setSending(true)
    const data = {
      email: fields.email,
      current_user_id: keyHolder.id,
      first_name: fields.firstName,
      last_name: fields.lastName,
      company: keyHolder.company,
      custom_invitation: fields.customInvitation
    }
    
    fetch('http://localhost:3000/invites/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(data => {
      if (data.error) {
        const { error, header } = data
        runAlert(header, error)
        setSending(false)
      } else {
        dispatch({ type: ADD_INVITATION, payload: data.invite })
        props.setSecondOpen(true)
        setSending(false)
      }
    })
  }

  return (
    <Form id="Invitation-Form" onSubmit={handleInvitation}>
      <Form.Group widths='3'>
        <Form.Input fluid name="email" label='Email' placeholder='Email' onChange={handleFieldChange} />
        <Form.Input fluid name="firstName" label='First name' placeholder='First name' onChange={handleFieldChange} />
        <Form.Input fluid name="lastName" label='Last name' placeholder='Last name' onChange={handleFieldChange} />
      </Form.Group>
      <Form.Group>
        <label className="Checkbox-Label">Write a custom invitation</label>
        <Checkbox toggle onChange={handleToggle} checked={toggleCheck} className="Checkbox-Item" />
      </Form.Group>
      <div>
        <Transition visible={toggleCheck} animation='fade down' duration={500}>
          <Form.TextArea 
          className={toggleCheck ? "TextArea-Field" : "Hide-Field"}
          name="customInvitation" 
          placeholder='Come join us!' 
          onChange={handleFieldChange} 
          />
        </Transition>
      </div>
      <Divider hidden />
      <Form.Checkbox onClick={() => setCheckbox(!checkbox)} label='Alert me when this user finishes signing up' />
      <Form.Group className="Invitation-Form-Submit-Btn-Wrapper">
        {
          sending ? 
          <Button className="Sending-Btn" loading>Sending</Button> :
          <Button className="Invitation-Form-Send-Btn">Send Invitation</Button>
        }
      </Form.Group>
      { 
        alertStatus &&
        <Message style={{display: "block"}} warning attached='bottom'>
          { 
            alertStatus && 
            <React.Fragment>
              <Header as='h5' dividing>
                <Icon name="dont"/>
                {header}
              </Header>
              <List bulleted style={{ textAlign: "left" }}>
                { displayAlert(errorMsg) }
              </List>
            </React.Fragment>
          }
        </Message>
      }
    </Form>
  )
}

export default InvitationForm;