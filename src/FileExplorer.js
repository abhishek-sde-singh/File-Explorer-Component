import React, { useState } from "react";

const FileExplorer = ({ data, onDelete, onRename, onAdd }) => {
  const [show, setShow] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("file");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(data.name);

  const handleShow = () => {
    setShow(!show);
  };

  const handleAdd = () => {
    if (newItemName.trim()) {
      onAdd(data.id, newItemName, newItemType);
      setIsAdding(false);
      setNewItemName("");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={() => {
                onRename(data.id, name);
                setIsEditing(false);
              }}
              style={{ marginLeft: "10px" }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span onClick={handleShow}>
              {data.type === "folder" ? "📂" : "🗂️"} {data.name}
            </span>
            {data.type === "folder" ? (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => setIsAdding(!isAdding)}
              >
                Add
              </button>
            ) : (
              <></>
            )}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => onDelete(data.id)}
            >
              ❌
            </button>
          </>
        )}
      </div>

      <div>
        {isAdding && (
          <>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <select
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value)}
            >
              <option value="file">File</option>
              <option value="folder">Folder</option>
            </select>
            <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
              Add
            </button>
          </>
        )}
      </div>

      {show &&
        data?.children?.map((items) => {
          return (
            <FileExplorer
              data={items}
              key={items.id}
              onDelete={onDelete}
              onRename={onRename}
              onAdd={onAdd}
            />
          );
        })}
    </div>
  );
};

export default FileExplorer;
