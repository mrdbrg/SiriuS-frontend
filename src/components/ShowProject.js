import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Icon, Container, Divider, Button, List, Segment, Form } from 'semantic-ui-react';
import { newDocument } from '../api';
import { Link, withRouter } from 'react-router-dom';
import DocumentList from './DocumentList';
import '../resources/Project.css';

const ShowProject = props => {

  // useSelector takes in a callback that has access to the redux state as an argument
  // source: https://stackoverflow.com/questions/61580674/redux-useselector-with-conditional-statement
  const projects = useSelector(state => {
    if (props.match.path === "/project/:id") {
      return {
        data: state.project.projects
      }
    } else {
      return {
        data: state.completeProject.complete,
        message: `All activities for this project were closed on <INSERT SOME DATE HERE>`
      }
    }
  })

  const matchId = parseInt(props.match.params.id)
  const currentProject = projects.data.find(pro => pro.id === matchId)
  const [ file, setFile ] = useState(null)
  const [ fileName, setFileName ] = useState("")
  const [ statusCode, setStatusCode ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ buttonStatus, setButtonStatus ] = useState(false)
  
  // wait 2 seconds and reset loading
  const resetLoading = () => {
    setTimeout(function(){ setLoading(false) }, 1000)
  }

  // wait 3 seconds and reset buttonStatus
  const resetButtonStatus = () => {
    setTimeout(function(){ setButtonStatus(false) }, 1500)
  }

  // set file and set fileName
  const fileChange = e => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  };

  const fileUpload = (file, fileName, projectId) => {
    const formData = new FormData();
    formData.append("file", file, fileName);
    formData.append("fileName", fileName);
    formData.append("projectId", projectId);

    newDocument(formData)
    .then(r => {
      if (r.ok) {
        // set statusCode 
        console.log("STATUS CODE:", r.status)
        setStatusCode(r.status)
        return r.json()
      }
    })
    .then(data => {
      console.log("SUCCESS -> ", data)
      setFileName("")
    })
  };

  const onFormSubmit = e => {
    e.preventDefault(); 
    // upload file to database
    fileUpload(file, fileName, currentProject.id);
    // set loading to true
    setLoading(true)
    // wait 2 seconds to set buttonStatus to true and reset buttonStatus to false again
    setTimeout(function(){ 
      setButtonStatus(true) 
      resetButtonStatus()
    }, 1000)
    // reset loading to false again
    resetLoading()
  };

  return (
    <Container id="Project-Container">
      { projects.message && 
        <Segment inverted color='red' tertiary size="big" textAlign="center">
          <Icon name='warning' />
          {projects.message}
        </Segment>
      }
      {
        currentProject && 
          <>
            <Header as='h2' className="Project-Header-Align-Items">
              <span>
                <Icon name='clipboard list' size="large" className="Project-Icon-Color"/>
                <Header.Content>
                  <span className="Project-Title">Project: {currentProject.name}</span>
                </Header.Content>
              </span>
              <span>
                <Link to="/">
                  <Button className="Project-Button-Style" disabled>
                    <Icon name='add' /> 
                    Add Collaborator
                  </Button>
                </Link>
              </span>
            </Header>
            <Divider/>
            <List divided className="Project-List">
              <List.Item className="Project-Items">
                <List.Icon name='file alternate' size="large"/>
                <List.Content>Description: <span className="Project-Description-Text">{currentProject.description}</span></List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name='calendar alternate' size="large"/>
                <List.Content>Start Date: {currentProject.start_date}</List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name='calendar check' size="large"/>
                <List.Content>Due Date: {currentProject.due_date}</List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name="users" size="large"/>
                <List.Content>Collaborators: {currentProject.users.length}</List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name='linkify' size="large"/>
                <List.Content>
                  <a href='http://www.semantic-ui.com'>company-site.com</a>
                </List.Content>
              </List.Item>
            </List>
            <List.Item className="Project-Items">
              <Form onSubmit={onFormSubmit} className="Project-Document-Form">
                <Form.Field>
                  <label>File input & upload </label>
                  <Button as="label" htmlFor="file" type="button" animated="fade" className="Project-Button-Style">
                    <Button.Content visible>
                      <Icon name="file" />
                    </Button.Content>
                    <Button.Content hidden>Share New Document</Button.Content>
                  </Button>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    hidden
                    onChange={fileChange}
                  />
                  <Form.Input
                    fluid
                    label="File Chosen: "
                    placeholder="Use the above bar to browse your file system"
                    readOnly
                    value={fileName}
                  />
                    { !buttonStatus && // if buttonStatus is false display original button and hide it otherwise
                      <Button className={`Project-Button-Style Project-Spacing-Style ${loading && "loading"} ${!fileName && "disabled"}`} type="submit">
                        { !loading ? `${"Upload File"}` : `${"Loading"}` }
                      </Button>
                    }
                    {
                      statusCode && statusCode === 200 && buttonStatus ?
                        (
                          <Button className="Project-Spacing-Style" color='green'>
                            File Upload Success
                          </Button>
                        )
                      : statusCode && statusCode === 500 && buttonStatus ?
                        (
                          <Button className="Project-Spacing-Style" color='red'>
                            File Upload Failed
                          </Button>
                        ) : null
                    }
                </Form.Field>
              </Form>
            </List.Item>
            <DocumentList />
          </>
      }
    </Container>
  )
}

export default withRouter(ShowProject);