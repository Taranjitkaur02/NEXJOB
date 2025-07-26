import { useEffect, useRef } from "react";

export default function JitsiVideo({ roomName, displayName }) {
  const jitsiContainer = useRef(null);
  let api = null;

  useEffect(() => {
    if (!roomName) return;

    const domain = "meet.jit.si";
    const options = {
      roomName: roomName,
      width: "100%",
      height: 500,
      parentNode: jitsiContainer.current,
      userInfo: {
        displayName: displayName || "Guest",
      },
    };

    api = new window.JitsiMeetExternalAPI(domain, options);

    // Cleanup when component unmounts
    return () => {
      if (api) {
        api.dispose();
      }
    };
  }, [roomName]);

  return <div ref={jitsiContainer} style={{ width: "100%", height: "500px" }} />;
}
