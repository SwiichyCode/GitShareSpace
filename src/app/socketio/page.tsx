"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const API_URL = "https://nodejs-production-eb8a.up.railway.app/";
const socket = io(API_URL, { autoConnect: false });

export default function SocketIOPage() {
  const [views, setViews] = useState(0);

  useEffect(() => {
    socket.connect();
    socket.on("count", (count: number) => {
      setViews(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>{views}</div>;
}
