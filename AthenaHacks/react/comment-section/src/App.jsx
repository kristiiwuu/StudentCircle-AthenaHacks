import { useEffect, useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyDdn3jGCSIAl5u2RYV_ypyRSZPtJnrMfE8",
  authDomain: "studentcircle-bec2e.firebaseapp.com",
  projectId: "studentcircle-bec2e",
  storageBucket: "studentcircle-bec2e.appspot.com",
  messagingSenderId: "854678623873",
  appId: "1:854678623873:web:b6f318a5a7c5c5c8741f80",
  measurementId: "G-MXNH5L49B5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // getDocs(collection(db, "comments")).then((querySnapshot) => {
    //   let comments = [];

    //   querySnapshot.forEach((doc) => {
    //     comments.push(doc.data());
    //   });

    //   setComments(comments);
    // });

    const unsub = onSnapshot(collection(db, "comments"), ((querySnapshot) => {
      let comments = [];

      querySnapshot.forEach((doc) => {
        comments.push(doc.data());
      });

      setComments(comments);
    }))
      return unsub;
  }, []);

  function addComment(){
    const docRef = addDoc(collection(db, "comments"), {
      content: document.getElementById('input').value
    })
    document.getElementById('input').value = "";
  }


  return (
    <>
      <h1>Discussion Board</h1>
      {comments.map((comment) => (
        <div key={comment.content}>{comment.content}</div>
      ))}
      <div id="form"> 
        <textarea id="input" type="text" placeholder="Type Here"></textarea>
        <button onClick={addComment}>submit</button>
      </div>

    </>
  );
}

export default App;