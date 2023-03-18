import React, { useState, useRef, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { auth, provider } from "./firebase";
import { collection, addDoc, collectionGroup } from "firebase/firestore";
import { db } from "./firebase";
import { setDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./index.css";
import { Data } from "./data";
const Menu = () => {
  return (
    <div>
      <div className="box">
        <div className="linkp-style">
          <Link to="/">SignIn</Link>
        </div>
        <div className="linkq-style">
          <Link to="/Signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};
const SignIn = () => {
  const [SignIn, SetSignIn] = useState({
    email: "",
    password: "",
  });

  const email = useRef(null);
  const password = useRef(null);
  const [saveddata, setsaveddata] = useState();
  const navigate = useNavigate();
  const [saveddataforsinup, setsaveddataforsinup] = useState();
  var a = [];
  const [error, seterror] = useState();
  const manually = () => {
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        navigate("/getdata");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        seterror(errorCode);
        console.log(errorCode);
      });
  };

  const login = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        // setdata({ a: [{ name: user.displayName , email: user.email }] });
        setsaveddataforsinup(
          saveddataforsinup.a.push({
            name: user.displayName,
            email: user.email,
          })
        );

        await setDoc(
          doc(db, "abhicodee", "ZO2zFQgVumvkUQhHyVOC"),
          saveddataforsinup
        );
        navigate("/getdata");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <div className="content">
        <h4 style={{ color: "red" }}>{error}</h4>
        <h4>E-mail</h4>
        <input
          type="text"
          placeholder="enter a e-mail"
          ref={email}
          name="email"
          required
        ></input>
        <h4>Password</h4>
        <input
          type="password"
          placeholder="enter a password"
          ref={password}
          required
        ></input>
        <br />
        <button onClick={manually}>Submit</button>
      </div>
    </>
  );
};
const Signup = () => {
  const email = useRef(null);
  const password = useRef(null);
  const cofirm = useRef(password);
  const [data, setdata] = useState();
  const [saveddata, setsaveddata] = useState();
  const navigate = useNavigate();
  const [saveddataforsinup, setsaveddataforsinup] = useState();
  useEffect(() => {
    const a = async () => {
      const docRef = doc(db, "abhicodee", "ZO2zFQgVumvkUQhHyVOC");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setsaveddataforsinup(docSnap.data());
        // navigate("/getdata");
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    a();
  }, []);

  const login = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        // setdata({ a: [{ name: user.displayName , email: user.email }] });
        setsaveddataforsinup(
          saveddataforsinup.a.push({
            name: user.displayName,
            email: user.email,
          })
        );

        await setDoc(
          doc(db, "abhicodee", "ZO2zFQgVumvkUQhHyVOC"),
          saveddataforsinup
        );
        navigate("/getdata");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error?.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const manuallysignup = () => {
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setsaveddataforsinup(
          saveddataforsinup.a.push({
            name: user.displayName,
            email: user.email,
          })
        );
        await setDoc(
          doc(db, "abhicodee", "ZO2zFQgVumvkUQhHyVOC"),
          saveddataforsinup
        );
        navigate("/getdata");
        // window.location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <>
      <div className="Signup">
        <h4>E-mail address</h4>
        <input
          type="text"
          placeholder="enter a email"
          ref={email}
          required
        ></input>
        <h4>Password</h4>
        <input
          type="text"
          placeholder="enter a password"
          ref={password}
          required
        ></input>
        <h4>Confirm Password</h4>
        <input
          type="password"
          placeholder="enter a confirm password"
          // value={signup.Cpass}
          // onChange={getSelection}
          name="Cpass"
          required
        ></input>
        <br />
        <button onClick={manuallysignup}>Sign up</button>
        <p>or</p>
        <div className="anctag">
          {/* <a href="">Login with Google</a> */}
          <button onClick={login}> Login with Google </button>
        </div>
      </div>
    </>
  );
};
const App = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <>
            <Menu></Menu>
            <SignIn></SignIn>
          </>
        }
      />
      <Route
        path="/Signup"
        element={
          <>
            <Menu></Menu>
            <Signup></Signup>
          </>
        }
      />
      <Route path="/getdata" element={<Data></Data>} />
    </Routes>
  );
};
export default App;
