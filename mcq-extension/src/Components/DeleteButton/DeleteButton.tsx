import React from "react";

interface Props {
  onDelete: () => void;
}

export const DeleteButton = ({ onDelete }: Props) => {
  const handleClick = () => {
    onDelete();
    // other potentially specific
  };

  return (
    <button style={{ border: "red" }} onClick={handleClick}>
      Delete
    </button>
  );
};

const EditView = () => {
  return (
    <>
      <div>Edit</div>
      <DeleteButton
        onDelete={() => {
          console.log("DELETED IN EDIT MODE");
          // call edit delete api
        }}
      />
    </>
  );
};

const ViewView = () => {
  return (
    <>
      <div>View</div>
      <DeleteButton
        onDelete={() => {
          console.log("DELETED IN View MODE");
        }}
      />
    </>
  );
};
