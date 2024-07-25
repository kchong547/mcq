//child cares about the form child takes
//child can have selected and not selected form
//child should know its own name
//child should know if it was touched

interface Props {
  name: string;
  selectStatus: boolean;
  changeSelected: (s: string) => void;
}

export const Child = ({ name, selectStatus, changeSelected }: Props) => {
  const onTouch = () => {
    console.log("SCREAM.mp3");
    changeSelected(name);
  };

  return (
    <button onClick={onTouch} background-color={selectStatus ? "blue" : "red"}>
      {name}
    </button>
  );
};
