import React, { useEffect, useState} from "react";    
import { db,auth } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export const Data = () => {
    const [saveddata, setsaveddata] = useState();
    const navigate =useNavigate();
    useEffect(()=>{
  const a=async()=>{
    const docRef = doc(db, "abhicodee", "ZO2zFQgVumvkUQhHyVOC");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setsaveddata(docSnap.data());
      // navigate("/getdata");
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  a();
    },[])
  return (
    <>
     
      <div className="userdata">
        <table>
          <thead>
            <th>Name</th>
            <th>Email</th>
          </thead>

        
        {saveddata?.a?.map((e,index) => {
              return (
                <tr key={index}>
                  <td>{e.email}</td>
                  <td>{e.name}</td>
                  <br />
                  </tr>
              );
            })}

    
         
          <tbody></tbody>
        </table>
      </div>
      <div className="database-button">
      <button onClick={()=>{
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
        navigate("/");
      }}>Logout</button>
      </div>
    </>
  );
};
