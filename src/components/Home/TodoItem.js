import { Box } from "@mui/system";
import React from "react";
import { Delete, Edit } from "@mui/icons-material";
const TodoItem = ({ todo, handleDeleteTodoList, idDocument,handleEditTodoList }) => {
  return (
    <Box component="div" className="list-item">
      <div className="list-item__content">{todo}</div>

      <div
        className="list-item__icon"
        style={{ background: "#ffc107" }}
        onClick={() => {
          handleEditTodoList(idDocument);
        }}
      >
        <Edit className="icon" />
      </div>
      <div
        className="list-item__icon"
        style={{ background: "#dc3545" }}
        onClick={() => {
          handleDeleteTodoList(idDocument);
        }}
      >
        <Delete className="icon" />
      </div>
    </Box>
  );
};

export default TodoItem;
