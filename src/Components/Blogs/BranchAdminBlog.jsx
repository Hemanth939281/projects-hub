import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import Shimmer from "../Shimmer";
const BranchAdminBlog = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.branch || !user?.collegename) {
          console.log("Branch or Collegename is undefined");
          return;
        }

        const ideasColRef = collection(
          db,
          "colleges",
          user.collegename.trim(),
          "Branches",
          user.branch,
          "ideas"
        );

        console.log(ideasColRef.path);
        const ideaSnapshot = await getDocs(ideasColRef);
        console.log(
          "Fetched ideas:",
          ideaSnapshot.docs.map((doc) => doc.data())
        );

        setIdeas(
          ideaSnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((idea) => idea.status === "accepted")
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.branch, user?.collegename]);

  const handleAcceptIdea = async (id) => {
    const ideaDocRef = doc(
      db,
      "colleges",
      user?.collegename.trim(),
      "Branches",
      user?.branch,
      "ideas",
      id
    );
    const ideaData = ideas.find((idea) => idea.id === id);
    console.log(
      ideaData.submittedBy,
      ideaData.submittedBy.split("@")[0] + "password"
    );
    await updateDoc(ideaDocRef, {
      status: "accepted",
    });
    toast.success("idea accepted");

    const teamDocRef = doc(
      db,
      "colleges",
      user.collegename.trim(),
      "Branches",
      user.branch,
      "admins",
      "Team admin",
      "team admins",
      id
    );
    await setDoc(teamDocRef, {
      email: ideaData.submittedBy,
      password: ideaData.submittedBy.split("@")[0] + "password",
    });
    toast.success("team admin added");
  };

  const handleRejectIdea = async (id) => {
    const ideaDocRef = doc(
      db,
      "colleges",
      user.collegename.trim(),
      "Branches",
      user.branch,
      "ideas",
      id
    );
    await updateDoc(ideaDocRef, {
      status: "rejected",
    });
    setIdeas(ideas.filter((idea) => idea.id !== id));
  };

  return (
    <div className="flex justify-center h-full bg-[#04052E]">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 md:bg-white flex flex-col rounded-lg my-12">
        <div className="flex flex-col gap-6 m-4 md:max-w-6xl">
          <h1 className="block text-center text-3xl font-bold text-white md:text-black">Ideas</h1>
          {loading ? (
            <div>
              {[...Array(3)].map((_, index) => (
                <Shimmer key={index} />
              ))}
            </div>
          ) : user?.branch ? (
            <div>
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="bg-white block w-full shadow-md shadow-black rounded p-8 mb-2"
                >
                  <h3 className="font-bold">
                    Name: <span>{idea.name}</span>
                  </h3>
                  <h3 className="font-bold">
                    SubmittedBy: <span>{idea.submittedBy}</span>
                  </h3>
                  <h3 className="font-bold">
                    Skills: <span>{idea.skills}</span>
                  </h3>
                  <p className="font-bold block">
                    Idea: <span className="font-normal">{idea.idea}</span>
                  </p>
                  <div className="flex gap-6 mt-4">
                    <button
                      className="bg-green-500 text-white p-2 rounded font-bold"
                      onClick={() => handleAcceptIdea(idea.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded font-bold"
                      onClick={() => handleRejectIdea(idea.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[40vh] w-[20vw] mx-auto">
              <p className="text-center font-bold text-xl">No ideas found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchAdminBlog;
