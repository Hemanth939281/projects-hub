import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import { useEffect } from "react";
import { collection, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";
import { db,} from "../../firebase";
const BranchAdminBlog = () => {
  const [ideas, setIdeas] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.collegename || !user?.branch) {
          console.log("College name or branch is undefined");
          return; 
        }
        const ideasColRef = collection(db, "colleges", user.collegename.trim(), "Branches", user.branch, "ideas");
        console.log(ideasColRef.path)
        const ideaSnapshot = await getDocs(ideasColRef);
        console.log("Fetched ideas:", ideaSnapshot.docs.map(doc => doc.data()));
        setIdeas(
          ideaSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(idea => idea.status == "Pending")
            
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?.branch,user?.collegename]);


  const handleAcceptIdea = async (id) =>{
    
    const ideaDocRef = doc(db, "colleges", user?.collegename.trim(),'Branches',user?.branch, 'ideas', id);
    const ideaData = ideas.find(idea => idea.id === id);
    console.log(ideaData.submittedBy,ideaData.submittedBy.split("@")[0]+"password");
    await updateDoc(ideaDocRef,{
      status:"accepted",
    })
    alert("idea accepted")

    const teamDocRef = doc(db,"colleges",user.collegename.trim(),"Branches",user.branch,"admins","Team admin", "team admins",id);
    await setDoc(teamDocRef,{
      email: ideaData.submittedBy,
      password: ideaData.submittedBy.split("@")[0]+"password",
    })
    console.log("team admin added")
  }

  const handleRejectIdea = async (id) =>{
    const ideaDocRef = doc(db, "colleges", user.collegename.trim(),'Branches',user.branch, 'ideas', id);
    await updateDoc(ideaDocRef,{
      status:"rejected",
    })
    setIdeas(ideas.filter(idea => idea.id !== id));
  }

  return (
    <div className="flex justify-center w-full h-full bg-[#04052E]">
        <div className="bg-white flex flex-col rounded-lg p-8 my-12">
    <div className="flex flex-col gap-6">
        <h1 className="text-center text-3xl font-bold">Ideas</h1>
          {user?.collegename && user.branch ? ideas.map(idea =>{
            return (
                <div key={idea.id} className="border-2 border-black rounded p-2">
                    <h3 className="font-bold">Name: <span>{idea.name}</span></h3>
                    <h3 className="font-bold">SubmittedBy: <span>{idea.submittedBy}</span></h3>
                    <h3 className="font-bold">Skills: <span>{idea.skills}</span></h3>
                    <p className="font-bold">Idea: <span className="font-normal">{idea.idea}</span></p>
                    <div className="flex gap-6 mt-4">
                      <button className="bg-green-500 text-white p-2 rounded" onClick={()=>handleAcceptIdea(idea.id)}>Accept</button>
                      <button className="bg-red-500 text-white p-2 rounded" onClick={()=>handleRejectIdea(idea.id)}>Reject</button>
                    </div>
                </div>
            )
        }) :
        
        <p className="text-center">No ideas found</p>}
    </div>
           </div>
        </div>
  )
}

export default BranchAdminBlog