import React, { Component } from 'react';
import TOC from './components/TOC'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'
import Subject from './components/Subject'
import Control from './components/Control'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // 객체의 값으로 한 이유: max_content_id는 데이터를 puch(추가)할 때 id값으로 무엇을 할 것인가 사용하는 용도일 뿐 ui에는 영향을 주지않음.
    // state 값으로 할 경우 불필요한 렌더링 발생 가능성 있음. 비합리적
    this.max_content_id = 3; 
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'world wid web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is HyperText' },
        { id: 2, title: 'CSS', desc: 'CSS is design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is interactive' },
      ]
    }
  }

  getReadContent() {
    var i = 0;

      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i = i + 1;
      }
  }

  getContent() {
    var _title, _desc, _article = null;

    // === (같다): 리액트 문법 
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
     
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        this.max_content_id = this.max_content_id + 1;
        // var _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc})
        var newContens = Array.from(this.state.contents);
        newContens.push({id:this.max_content_id, title:_title, desc:_desc})

        this.setState({
          contents: newContens,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>;
    }else if(this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i = i + 1;
        }

        this.setState({
          contents: _contents,
          mode:'read'
        });
      }.bind(this)}></UpdateContent>;
    }
    return _article;
  }

  render() {
    return (
      <div className='App'>
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({mode: 'welcome'});
          }.bind(this)}
        >
        </Subject>
        <TOC onChangePage={function (id) { //⭐// TOC.js에서 받아온 id값을 selected_content_id에 넘겨준다
          this.setState({
            mode: 'read',
            selected_content_id:Number(id)
          });
        }.bind(this)}
          data={this.state.contents}></TOC>
          <Control onChangeMode={function(_mode){
            if(_mode === 'delete'){
              if(window.confirm('really?')){
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while(i < _contents.length){
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i,1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode:'welcome',
                  contents:_contents
                });
                alert('deleted!!')
              }
            }else {
              this.setState({
                mode:_mode
              })
            }
          }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
