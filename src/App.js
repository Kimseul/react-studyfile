import React from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = { // 컴포넌트의 상태를 관리
    isEditMode: -1,
    name :'',
    phone :'',
    
     contact : [
      {
        id : 1,
        name : 'a',
        phone : '010-1234-5678'
      },
      {
        id : 2,
        name : 'b',
        phone : '010-1234-5678'
      },
      {
        id : 3,
        name : 'c',
        phone : '010-1234-5678'
      },
      {
        id : 4,
        name : 'd',
        phone : '010-1234-5678'
      },
    ]
  }
  /**
   *  수정값 반영
   */
  _handleChangeContact=(index,event)=>{
      const newContact = this.state.contact.slice(0);
      newContact[index][event.target.name] = event.target.value;
      this.setState({contact:newContact});
  }
  /**
   *  수정 모드
   */
  _handleToggleEdit=(id)=>{ // 이전 값을 가져 올 수 있다.
      this.setState(prevState =>({isEditMode: prevState.isEditMode === id ?-1:id}))
  }
  /**
   *  삭제함수
   */
 _handleRemovecontact = id =>{
  const newContact = this.state.contact.filter(c => c.id !== id)
  
     this.setState({contact: newContact})
   }
  /**
   *  동작 함수
   */
  _handleCreateContact = ()=>{
    const length = this.state.contact.length;
    const lastId = length> 0?this.state.contact[this.state.contact.length-1].id+1:1;
   
    this.setState({
      contact:[
        ...this.state.contact,
        {
          id:lastId,
          name:this.state.name,
          phone:this.state.phone
        }
      ]
    })
  }
  /**
   * 
   */
 // _handleChangeState = event =>{
    // this.setState({ [event.target.name] : event.target.name }) 
    // 배열형태로 감싸주면 동적으로 바꿔준다.

  //}
  _handleChangeState = (target,value) =>{
     this.setState({ [target] : value }) ;
    // 배열형태로 감싸주면 동적으로 바꿔준다.
  }
  /**
   *   뷰
   */
  render() {
    // 가독성이 쉽다.
    //디버깅할 때 효율적이다.
    const {contact,name,phone,isEditMode} = this.state;

    let data = contact;
    if(name){
       data = contact.filter(c=>c.name.indexOf(name) !== -1);
    }

  return (
    <div className="">
        <table border= "1">
            <thead>
              <tr>
                <th>이름</th>
                <th>연락처</th>
                <th>-</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
            <tr> 
                    <td><input value={name} name = "name" onChange={(event)=>this._handleChangeState('name',event.target.value)} placeholder="name"/></td>
                    <td><input value={phone} phone = "phone" onChange={(event)=>this._handleChangeState('phone',event.target.value)}placeholder="phone"/></td>
                     <td colSpan="2"> 
                       <button onClick={()=> this._handleCreateContact()} >New</button> 
                     </td>
                  </tr>
              {
                    data.map( (item,index) =>(
                    <tr key={index.toString()}> {/** */} 
                      { (isEditMode > -1 || isEditMode === item.id) ?(
                        <>
                        <td><input value={item.name} name = "name" onChange = {(event)=> this._handleChangeContact(index,event)}/></td>
                        <td><input value={item.phone} phone= "phone" onChange = {(event)=> this._handleChangeContact(index,event)}/></td>
                       </>
                         ):(
                          <>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                          </>
                    )}
                   
                     <td> 
                       <button onClick={()=>this._handleRemovecontact(item.id)}>Delete</button> 
                     </td>
                     <td> 
                       <button onClick={()=>this._handleToggleEdit(item.id)}>Edit</button> 
                     </td>
                  </tr>
                  ))
              }
            </tbody>
        </table>
    </div>
    );
   }
}

export default App;
