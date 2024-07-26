function Task() {
  return (
    console.log('Hello from node'),
    (
      <>
        <div>
          <h4>Title</h4>
          <textarea></textarea>
          <br />
          <button>Mark complete</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </>
    )
  );
}

export default Task;
