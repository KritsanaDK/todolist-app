import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import List from './compoments/List';
import Alert from './Alert';

function App() {

  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: true, msg: '', type: '' });
  const [checkEditItem, setCheckEditItem] = useState(false);
  const [editId, setEditId] = useState('');

  const submitData = (e) => {
    e.preventDefault()
    // console.log(e);
    // console.log("Name = ", name)

    if (!name) {
      setAlert({ show: true, msg: 'Please enter data', type: 'error' });

    }
    else if (checkEditItem && name) {

      const result = list.map((item) => {
        if (item.id == editId) {
          return { ...item, title: name }
        }
        return item;
      })
      setList(result)
      setAlert({ show: true, msg: 'updated', type: 'success' });
      setCheckEditItem(false)
      setName('')
    }
    else {
      const newItem = {
        id: uuidv4(),
        title: name
      }

      setList([...list, newItem]);
      setName('')

      setAlert({ show: true, msg: 'saved', type: 'success' });
      console.log(list)
    }
  }

  const removeItem = (id) => {
    console.log(id);

    const result = list.filter((item) => item.id !== id);
    console.log(result)
    setList(result)
    setAlert({ show: true, msg: 'deleted', type: 'success' });
  }


  const editItem = (id) => {
    setCheckEditItem(true)

    const sreachItem = list.find((item) => item.id == id)

    setEditId(sreachItem.id);
    setName(sreachItem.title)

  }
  return (

    <section className='container'>
      <h1>TodoList App</h1>
      {alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}
      <form className='form-group' onSubmit={submitData}>
        <div className='form-control'>
          <input type="text" name="" id="" className='text-input'
            onChange={(e) => setName(e.target.value)}
            value={name} />
          <button type="submit" className='submit-btn'>{checkEditItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</button>
        </div>


      </form>

      <section className='list-container'>
        {/* <List /> */}
        {list.map((data, index) => {
          return <List key={index} {...data} removeItem={removeItem} editItem={editItem} />
        })}
      </section>

    </section>
  );
}

export default App;
