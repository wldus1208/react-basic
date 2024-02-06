import React, { Component } from 'react';

class CreateContent extends Component {
    render() {
        return (
            <article>
                <h2>Create</h2>
                {/* post 방식: url 노출 안됨 */}
                {/* onSubmit: submit버튼 클릭 되었을때 이벤트 실행 */}
                <form action='/create_process' method='post' onSubmit={function(e){
                    e.preventDefault(); // 페이지 전환없이 
                    this.props.onSubmit(
                        e.target.title.value,
                        e.target.desc.value,
                    );
                }.bind(this)}> 
                    <p><input type='text' name='title' placeholder='title'></input></p>
                    <p><textarea name='desc' placeholder='description'></textarea></p>
                    <p><input type='submit'></input></p>
                </form>
            </article>
        );
    }
}

export default CreateContent;