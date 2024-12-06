import { useState } from 'react'
import './App.css'

function App() {
  const [bucket1, setBucket1] = useState(["Item 1","Item 2","Item 3","Item 4","Item 5","Item 6",]);
  const [bucket2, setBucket2] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  //to select one or more items
  const handleSelectedItems = (item) => {
     setSelectedItems((prev) =>
    prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
  );
  };
  //to add selected items to bucket 2
  const handleAdd = () =>{
    const newBucket2 = Array.from(new Set([...bucket2, ...selectedItems]));
    const newbucket1 = bucket1.filter((item) => !selectedItems.includes(item));
    setBucket1(newbucket1);
    setBucket2(newBucket2);
    setSelectedItems([]);
  }
  //to remove selected items from bucket 2
  const handleRemove = () => {
    const newBucket1 = Array.from(new Set([...bucket1, ...selectedItems]));
    const newBucket2 = bucket2.filter((item) => !selectedItems.includes(item));
    setBucket1(newBucket1);
    setBucket2(newBucket2);
    setSelectedItems([]);
  }
  //to add all items from bucket 1 to bucket 2
  const handleAddAll = () => {
    const newBucket = Array.from(new Set([...bucket2, ...bucket1]));
    //console.log(newBucket)
    setBucket2(newBucket);
    //console.log(bucket2)
    setSelectedItems([]);
    setBucket1([]);
  }
  //to remove all items from bucket 2 to bucket 1
  const handleRemoveAll = () => {
    setBucket1(Array.from(new Set([...bucket1,...bucket2])));
    setSelectedItems([]);
    setBucket2([]);
  }
  //to show the selected items 
  const toggleCheck = (item) =>{
    setIsChecked(!isChecked);
    handleSelectedItems(item)
    
  }
  //to show the items in buckets after adding and removing
  const renderList = (items) => {
    return(
      <div className="button">
        {items.map((item) => (
      <button key={item} 
          onClick={() => toggleCheck(item)}
          className={`btn ${selectedItems.includes(item) ? "selected" : ""}`}
      >
        {item}
      </button>
    ))}
      </div>
    )
  }


  return (
    <div className='conatiner'>
      <div className="header">
        <h3>React Task Element Transfer</h3>
      </div>
      <div className="container-main">
        <div className="bucket">
          <h3>Bucket 1</h3>
          {renderList(bucket1)}
        </div>
        <div className="controls">
          <button onClick={handleAdd} disabled={selectedItems.length === 0}>Add</button>
          <button onClick={handleRemove} disabled={selectedItems.length === 0}>Remove</button>
          <button onClick={handleAddAll} disabled={bucket1.length === 0}> Add All</button>
          <button onClick={handleRemoveAll} disabled={bucket2.length === 0}>Remove All</button>
        </div>
        <div className="bucket">
          <h3>Bucket 2</h3>
          {renderList(bucket2)}
        </div>
      </div>
    </div>
  )
}

export default App
