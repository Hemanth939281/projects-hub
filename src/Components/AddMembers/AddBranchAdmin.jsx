import { useContext, useState, useEffect } from "react";
import AuthContext from "../AuthContext";
import { db } from "../../firebase";
import { collection, query, where, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const AddBranchAdmin = () => {
  const { user, showDeleteAdminModal, closeBranchAdminModal, closeDeleteAdminModal } = useContext(AuthContext);
  const [branchAdmins, setBranchAdmins] = useState([]);
  const [newBranchAdmin, setNewBranchAdmin] = useState({ email: '', password: '', branch: '' });

  useEffect(() => {

    if (newBranchAdmin.branch) {
      const fetchBranchAdmins = async () => {
        const branchAdminCollectionRef = collection(db, "colleges", user.collegename, "Branches", newBranchAdmin.branch, "admins", "Branch admin", "branch admins");
        const dtd = await getDocs(branchAdminCollectionRef);
        setBranchAdmins(dtd.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      };
      fetchBranchAdmins();
    }
  }, [user.collegename, newBranchAdmin.branch]);

  const handleAddBranchAdmin = async () => {
    if (!newBranchAdmin.email || !newBranchAdmin.password || !newBranchAdmin.branch) {
      toast.error("User details are required");
      return;
    }

    const branchAdminCollectionRef = collection(db, "colleges", user.collegename, "Branches", newBranchAdmin.branch, "admins", "Branch admin", "branch admins");
    const q = query(branchAdminCollectionRef, where("email", "==", newBranchAdmin.email));
    const querySnapshot = await getDocs(q);

    try {
      if (showDeleteAdminModal) {
        if (querySnapshot.empty) {
          toast.error("User not found");
          return;
        }
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(doc(branchAdminCollectionRef, docToDelete.id));
        setBranchAdmins(branchAdmins.filter(admin => admin.id !== docToDelete.id));
        toast.error("User deleted successfully");
        closeDeleteAdminModal();
      } else {
        if (!querySnapshot.empty) {
          toast.error("User already exists");
          return;
        }

        const newUserDocRef = doc(branchAdminCollectionRef);
        await setDoc(newUserDocRef, {
          email: newBranchAdmin.email,
          password: newBranchAdmin.password,
        });

        setBranchAdmins([...branchAdmins, { id: newUserDocRef.id, email: newBranchAdmin.email, password: newBranchAdmin.password }]);
        setNewBranchAdmin({ email: '', password: '', branch: '' });
          toast.success("User added successfully");
        closeBranchAdminModal()
      }
      closeBranchAdminModal();
    } catch (error) {
      console.error("Error handling user: ", error);
      toast.error("Failed to handle user");
    }
  };

  return (
    <div className="mt-4 text-center text-black">
      <input
        type="email"
        placeholder="Email"
        value={newBranchAdmin.email}
        onChange={(e) => setNewBranchAdmin({ ...newBranchAdmin, email: e.target.value })}
        className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={newBranchAdmin.password}
        onChange={(e) => setNewBranchAdmin({ ...newBranchAdmin, password: e.target.value })}
        className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
      <select
        value={newBranchAdmin.branch}
        onChange={(e) => setNewBranchAdmin({ ...newBranchAdmin, branch: e.target.value })}
        className="block w-full px-4 py-2 mb-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        required
      >
        <option value="">Select Branch</option>
        <option value="CSE">CSE</option>
        <option value="AI&ML">AI&ML</option>
        <option value="AI&DS">AI&DS</option>
        <option value="IT">IT</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="CIVIL">CIVIL</option>
        <option value="CSBS">CSBS</option>
      </select>
      <button
        onClick={handleAddBranchAdmin}
        className={`mt-4 px-4 py-2 ${showDeleteAdminModal ? "bg-red-500 text-white hover:bg-red-600":"bg-green-500 hover:bg-green-600"} text-white rounded-md shadow-sm focus:outline-none`}
      >
        {showDeleteAdminModal ? "Delete Admin" : "Add Admin"}
      </button>
    </div>
  );
};

export default AddBranchAdmin;
