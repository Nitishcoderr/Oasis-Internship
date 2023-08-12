import React,{useState,useEffect} from 'react'
import './style.css'


// getting local storage data
const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist")

    if(lists){
        return JSON.parse(lists)
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputdata, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItem, setIsEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)


    // add the items function
    const addItem = () =>{
        if(!inputdata){
            alert("Plz fill the box")
        }
        else if(inputdata && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditItem){
                        return {...curElem, name:inputdata}
                    }
                    return curElem
                })
            )
            setInputData([])
            setIsEditItem(null)
            setToggleButton(false)
        }
        else{
            const myNewInputData = {
                id : new Date().getTime().toString(),
                name:inputdata,
            }
            setItems([...items,myNewInputData])
            setInputData("")
        }
    }
    // Status Update
    const updateStatus = (index) =>{
        setItems((prevItems)=>
        prevItems.map((item,i)=>{
            if(i ===index){
                return {
                    ...item,
                    status:item.status === "Pending" ? "Completed" : "Pending",
                };
            }
            return item;
        })
        )
    }
    // edit function addeing
    const editElem = (index) =>{
        const item_todo_edited = items.find((curElem)=>{
            return curElem.id === index;
        })
        setInputData(item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }
    // deleteing added item 
    const deleteItems = (index) =>{
        const updateItems = items.filter((curElem)=>{
            return curElem.id !== index
        })
        setItems(updateItems)
    }
    // Update status
    // removing all elements
    const removeAll = ()=>{
        setItems([])
    }

    // adding data to localstorage
    useEffect(() => {
      localStorage.setItem("mytodolist",JSON.stringify(items))
    }, [items])
    

  return (
    <div>
    <div className="main-div">
      <div className="child-div">
          <figure>
              <img src="./images/notes.png" alt="" />
              <figcaption>Add Your List Here ✌️</figcaption>
          </figure>
          <div className="addItems">
              <input value={inputdata} onChange={(event)=>{setInputData(event.target.value)}} type="text" placeholder='✍️ Add Item' className='form-control' />
              {toggleButton ? (
                <button onClick={addItem}>EDIT</button>
              ) :(  <button onClick={addItem}>ADD</button>)}
              
          </div>
          {/* Show our items */}
          <div className="showItems">
              {items.map((curElem,index)=>{
                  return (
                      <div className="eachItem" key={curElem.id}>
                  <h3> {index+1} . {curElem.name}</h3>
                  <h1> <span>Status :</span> {curElem.status}</h1>
                    <button onClick={()=>updateStatus(index)}>Update Status</button>
                  <div className="todo-btn">
                  <button onClick={()=> editElem(curElem.id)}>Edit</button>
                  <button onClick={()=>deleteItems(curElem.id)}>Remove</button>
                  </div>
              </div>
                  )
              })}
          </div>
          {/* remove all items */}
          <div className="showItems">
              <button className="btn effect04" data-sm-link-text = "Remove All" onClick={removeAll} >
                <span>Remove All</span>  
              </button>
          </div>
      </div>
    </div>
  </div>
  )
}

export default Todo
