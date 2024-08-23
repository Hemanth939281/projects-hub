import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import { useEffect } from "react";
import { collection, getDocs,  } from "firebase/firestore";
import { db,} from "../../firebase";
const BranchAdminBlog = () => {
  const [ideas, setIdeas] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try{

      const ideasColRef = collection(db, "colleges", user.collegename,"Branches", user.branch, "ideas");
      const ideaSnapshot = await getDocs(ideasColRef);
      setIdeas(ideaSnapshot.docs.map(doc=>({id:doc.id, ...doc.data()})));
    }
    catch(error){
      console.error(error);
    }
      }

    fetchData();
  }, [user?.branch, user?.collegename]);

  const handleAcceptIdea = async () =>{
    // const teamColRef = collection(db,"colleges",user.collegename,"Branches",user.branch,"admins","Team admin", "team admins");
    // const teamAdminDoc = doc(teamColRef);
    
    console.log("idea accepted and you are promoted to team admin");
  }

  return (
    <div className="flex justify-center w-full h-full bg-[#04052E]">
        <div className="bg-white flex flex-col rounded-lg p-8 my-12">
    <div className="flex flex-col gap-6">
        <h1 className="text-center text-3xl font-bold">Ideas</h1>
          {ideas.map(idea =>{
            return (
                <div key={idea.id} className="border-2 border-black rounded p-2">
                    <h3 className="font-bold">Name: <span>{idea.name}</span></h3>
                    <h3 className="font-bold">SubmittedBy: <span>{idea.submittedBy}</span></h3>
                    <h3 className="font-bold">Skills: <span>{idea.skills}</span></h3>
                    <p className="font-bold">Idea: <span className="font-normal">{idea.idea}</span></p>
                    <div className="flex gap-6 mt-4">
                      <button className="bg-green-500 text-white p-2 rounded" onClick={()=>handleAcceptIdea(idea.id)}>Accept</button>
                      <button className="bg-red-500 text-white p-2 rounded">Reject</button>
                    </div>
                </div>
            )
        })}

    </div>
           </div>
        </div>
  )
}

export default BranchAdminBlog