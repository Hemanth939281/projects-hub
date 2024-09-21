import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import Services from './Components/Services.jsx';
import Contact from './Components/Contact.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './Components/Error.jsx'; 
import { AuthProvider } from './Components/AuthContext.jsx';
import BranchAdminBlog from './Components/Blogs/BranchAdminBlog.jsx';


const appRouter= createBrowserRouter(
    [
        {
            path:"/",
            element:<App />,
            children:[
                {
                    path:"/",
                    element:<Home />
                },
                {
                    path:"/about",
                    element:<About />
                },
                {
                    path:"/services",
                    element:<Services />
                },
                {
                    path:"/contact",
                    element:<Contact />
                },
                {
                    path:"/branchadminblog",
                    element:<BranchAdminBlog/>
                }
            ],
            errorElement:<Error/>
        }
    ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={appRouter}>
          <App />
        </RouterProvider>
    </AuthProvider>
);
