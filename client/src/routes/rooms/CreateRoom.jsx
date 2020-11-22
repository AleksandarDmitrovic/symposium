import { v1 as uuid } from "uuid";

export default function CreateRoom(props) {
  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }

  return (
    <button onClick={create}>Create Room</button>
  );
};