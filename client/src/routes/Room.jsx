import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", stream => {
      ref.current.srcObject = stream;
    })
  }, []);

  return (
    <StyledVideo playsInline autoPlay ref={ref} />
  );
}