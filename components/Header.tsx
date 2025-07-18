'use client';
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0"

import axios from "axios";

export function Header({ userId, selectedSessionId, onSelect }: any) {


  useEffect(() => {
    
  }, []);
  const { user, isLoading } = useUser();
  return (
    <div className="bg-black flex justify-between ">
      <h2 className="text-lg text-white font-bold  m-2">This is my logo</h2>
      <div className="text-lg font-bold text-white  m-2">
      {isLoading && <p>Loading...</p>}
      {user && (
        <div style={{ textAlign: "center" }}>
          <img
            src={user.picture}
            alt="Profile"
            style={{ borderRadius: "50%", width: "50px", height: "50px" }}
          />
          <h2>{user.name}</h2>
        </div>
      )} </div>

     </div>
  );
}
