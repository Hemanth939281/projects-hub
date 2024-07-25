import { useState,  } from "react"
// import {db} from "../../firebase";
// import {doc, collection, query, where, getDocs, setDoc} from "firebase/firestore";

const AddBranchAdmin = () => {
    const [newBranchAdmin, setNewBranchAdmin] = useState({email:'', password:'', branch:''});

    const handleAddBranchAdmin = async () => {
        if (!newBranchAdmin.email || !newBranchAdmin.password || !newBranchAdmin.role) {
          alert("User details are required");
          return;
        }
      
        // const collegeDocRef = doc(db, "colleges", user.collegename, "Branches", newBranchAdmin.branch,  );
        // const q = query(usersRef, where("email", "==", newBranchAdmin.email));
        
        // try {
        //   const querySnapshot = await getDocs(q);
      
        //   if (!querySnapshot.empty) {
        //     alert("User already exists");
        //     return;
        //   }
      
        //   const newUserDocRef = doc(usersRef);
        //   await setDoc(newUserDocRef, {
        //     email: newBranchAdmin.email,
        //     password: newBranchAdmin.password,
        //     role: newBranchAdmin.role,
        //   });
      
        //   setNewBranchAdmin({ email: '', password: '', role: 'student' });
        //   alert("User added successfully");
        // } catch (error) {
        //   console.error("Error adding user: ", error);
        //   alert("Failed to add user");
        // }
      };
  return  (
            <>
                <h2 className="text-3xl font-semibold mb-4 text-white text-center">Manage Users</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-2 text-indigo-700">Add New User</h3>
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
                    value={newBranchAdmin.role}
                    onChange={(e) => setNewBranchAdmin({ ...newBranchAdmin, role: e.target.value })}
                    className="block w-full px-4 py-2 mb-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={handleAddBranchAdmin}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add User
                  </button>
                </div>              
    </>
  )
}

export default AddBranchAdmin