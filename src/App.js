import React from 'react';
import './App.css';
import {Button, Alert, Form, Col} from 'react-bootstrap';

const before = 'Click Generate Button!';

class App extends React.Component {
  constructor() {
    super();
    this.state = {text : before}
    this.displayString = false;
    this.error = false;
    this.generateString = this.generateString.bind(this);
    this.randomString = this.randomString.bind(this);
    this.alphabets = "";
    this.numbers = "";

    for(let i=0; i<25; i++) {
      this.alphabets += String.fromCharCode(65 + i);
    }

    for(let i=0; i<25; i++) {
      this.alphabets += String.fromCharCode(97 + i);
    }

    for(let i=0; i<10; i++) {
      this.numbers += i.toString();
    }

  }

  randomString(len, str) {
    console.log("string : ", str);
    let ans = "";
    for(let i=0; i<len; i++) {
      let idx = Math.floor(Math.random() * str.length);
      ans = ans + str.charAt(idx);
    }
    return ans;
  }

  generateString() {
    this.error = false;
    console.log("Generate Button clicked!");
    console.log("Length : ", document.getElementById('length').value);
    console.log("Alpha cb : ", document.getElementById('alpha-cb').checked);
    console.log("Numeric cb : ", document.getElementById('numeric-cb').checked);
    
    var cnt = 0;
    var len = document.getElementById('length').value;
    var isAlpha = document.getElementById('alpha-cb').checked;
    var isNumeric = document.getElementById('numeric-cb').checked;
    cnt = cnt + (isAlpha === true);
    cnt = cnt + (isNumeric === true);
    
    if(len.length === 0) {
      this.error = true;
      this.setState({text : "Length must be greater than 0"});
      this.displayString = true;
      return;
    }
    if(cnt > len) {
      this.error = true;
      this.setState({text : "Length must be greater than " + (cnt-1).toString()});
      this.displayString = true;
      return;
    } 
    let cur = this.randomString(len-cnt, this.alphabets.concat(this.numbers));
    console.log("cur string : ", cur);
    if(isAlpha) {
      let val = this.alphabets.charAt(Math.floor(Math.random() * this.alphabets.length));
      let idx = Math.floor(Math.random() * len);
      cur = cur.slice(0, idx) + val + cur.slice(idx); 
    }
    if(isNumeric) {
      let val = this.numbers.charAt(Math.floor(Math.random() * this.numbers.length));
      let idx = Math.floor(Math.random() * len);
      cur = cur.slice(0, idx) + val + cur.slice(idx); 
    }

    this.setState({text : cur});
    this.displayString = true;
  }


  render() {
    return (
      <div className="container_p">
        <h1 className="container_c" className = "heading">Generate Random String</h1>
        {
          this.displayString && (!this.error) &&
          <Alert variant='success'>Generated string : <b>{this.state.text}</b></Alert>
        }
        {
          this.displayString && (this.error) &&
          <Alert variant='danger'>{this.state.text}</Alert>
        }

        <Form className="container_c">
          <Form.Row>
            <Col>
              <Form.Control type = "number" placeholder='Length' id = 'length' />
            </Col>
          </Form.Row>
          <Form.Row className="cbs">
            <Col>
              <Form.Check type='checkbox' label = 'Atleast one alphabet' id='alpha-cb' />
            </Col>
            <Col>
              <Form.Check className="cbs-item1" type='checkbox' label = 'Atleast one number' id = 'numeric-cb' />
            </Col>
          </Form.Row>
        </Form>
        <Button className="container_c" variant='primary' size='lg' onClick={this.generateString}>Generate!</Button>
      </div>
    );
  }
}

export default App;
