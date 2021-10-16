import { Box } from "@mui/system";
import React from "react";
import { AddBox } from "@mui/icons-material";
const InputAdd = ({ input, setInput, handleAddTodoList }) => {
  const textInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <Box component="div" className="add">
      <div className="add-input">
        <input
          type="text"
          placeholder="Nhập công việc cần thêm..."
          value={input}
          onChange={textInput}
        />
        <div
          className="bg-icon"
          onClick={() => {
            handleAddTodoList();
            setInput("");
          }}
        >
          <AddBox className="icon-add" />
        </div>
      </div>
    </Box>
  );
};

export default InputAdd;
