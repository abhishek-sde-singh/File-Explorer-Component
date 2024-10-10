import "./App.css";
import { useState } from "react";
import { initalData } from "./data";
import FileExplorer from "./FileExplorer";

function App() {
  const [fileData, setFile] = useState(initalData);

  const handleAdd = (id, newName, newType) => {
    const addData = (items) => {
      return items?.map((item) => {
        if (item.id === id) {
          const newItem = {
            id: Math.random() * 10,
            name: newName,
            type: newType,
            children: newType === "folder" ? [] : null,
          };
          return { ...item, children: [...item?.children, newItem] };
        } else if (item.children) {
          return { ...item, children: addData(item.children) };
        }
        return item;
      });
    };
    setFile(addData(fileData));
  };

  const handleRename = (id, newName) => {
    const updateName = (items) => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, name: newName };
        } else if (item?.children) {
          return { ...item, children: updateName(item?.children) };
        }
        return item;
      });
    };
    setFile(updateName(fileData));
  };

  const handleDelete = (id) => {
    console.log("deleted", id);
    const deleteItem = (items) => {
      return items
        ?.filter((item) => item.id !== id)
        ?.map((item) => {
          if (item?.children) {
            return { ...item, children: deleteItem(item.children) };
          }
          return item;
        });
    };
    setFile(deleteItem(fileData));
  };

  return (
    <>
      <h1>Hello world</h1>
      <div>
        {fileData?.map((file, index) => {
          return (
            <FileExplorer
              data={file}
              onDelete={handleDelete}
              key={index}
              onRename={handleRename}
              onAdd={handleAdd}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
