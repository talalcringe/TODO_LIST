type CreateTaskProps = {
  toggleCreatingTask: () => void;
};

function CreateTask({ toggleCreatingTask }: CreateTaskProps) {
  return (
    <>
      <div>
        <textarea placeholder='title'></textarea>
        <br />
        <textarea placeholder='description'></textarea>
        <br />
        <button>record voice message</button>
        <br />
        <button onClick={toggleCreatingTask}>Save</button>
      </div>
    </>
  );
}

export default CreateTask;
